<template>
  <div>
    <loading-page v-if="loading"></loading-page>
    <h1>รายการเดินบัญชี</h1>
    <div class="card shadow">
      <div class="p-3 row">
        <div class="p-3 col-8 col-sm-4">
          <label for="bank">ธนาคาร</label>
          <v-select
            dense
            hide-details="auto"
            outlined
            name="bank"
            placeholder="กรุณาเลือกธนาคาร"
            @change="getList"
            :items="bank_scb_options"
            v-model="selectBank"
          ></v-select>
        </div>
        <div class="m-auto col-4 d-flex align-end" v-if="selectBank">
          <v-btn color="success" @click="searchTransaction">ค้นรายการ</v-btn>
        </div>
      </div>
      <div class="mt-5">
        <div class="p-auto ma-4" v-if="items">
          <v-btn
            color="warning"
            small
            rounded
            :disabled="!selectBank"
            @click="prevPage"
            ><v-icon left>mdi-menu-left</v-icon>BACK</v-btn
          >
          <v-btn
            color="success"
            small
            rounded
            :disabled="!selectBank"
            @click="nextPage"
            >NEXT<v-icon right>mdi-menu-right</v-icon></v-btn
          >
        </div>
        <v-data-table hide-default-footer :headers="fields" :items="items">
          <template #[`item.amount`]="{ item }">
            {{ item.amount | numberFormat }}
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      loading: false,
      selectBank: null,
      bank_scb_options: null,
      items: [],

      fields: [
        { value: "type", text: "ประเภท" },
        { value: "chanel", text: "ช่องทาง" },

        { value: "deposit_time", text: "เวลาในสลิป" },
        { value: "fromBank", text: "จาก" },
        { value: "name", text: "รายการ" },
        {
          value: "accRef",
          text: "เลขอ้างอิง",
        },
        {
          value: "amount",
          text: "จำนวนเงิน",
        },
        {
          value: "remark",
          text: "หมายเหตุ",
          cellClass: "font-weight-bold purple--text",
        },
      ],
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const { data } = await this.$store.dispatch("setting/getCompanybank");
      console.log(data, "cpmpa");
      const scb_api = data
        .filter((x) => {
          return x.mode == 2;
        })
        .map((y) => {
          return {
            value: y,
            text:
              y.Companybank +
              " " +
              y.Companybankname +
              " " +
              y.Companybankacountnumber,
          };
        });

      this.bank_scb_options = scb_api;
      this.loading = false;
    } catch (error) {}
  },
  methods: {
    async getList() {
      await this.searchTransaction();
    },
    async searchTransaction() {
      if (this.items != null) {
        this.page = 1;
      }
      await this.getTransaction(this.selectBank.Companybankacountnumber);
    },
    async nextPage() {
      this.page++;
      await this.getTransaction(this.selectBank.Companybankacountnumber);
    },
    async prevPage() {
      this.page--;
      if (this.page == 0) {
        this.page = 1;
      }
      await this.getTransaction(this.selectBank.Companybankacountnumber);
    },
    async getTransaction(acc_num) {
      try {
        this.loading = true;
        const res = await this.$axios.get(
          `${process.env.API_SCB_CORE}/api/Email/Transaction/${acc_num}?page=${this.page}`
        );
        this.items = res.data.map((x) => {
          x.deposit_time = new Date(x.deposit_time).toLocaleString("th-TH");

          return x;
        });

        this.loading = false;
      } catch (error) {
        this.showInfoAlert("ไม่พบรายการ");
        console.log(error);
        this.loading = false;
      }
    },
    showSuccessAlert(message) {
      // Use sweetalret2

      this.$swal.fire("สำเร็จ", message, "success", "OK");
    },
    showErrorAlert(message) {
      // Use sweetalret2
      this.$swal.fire("ERROR!", message, "error", "OK");
    },
    showInfoAlert(message) {
      // Use sweetalret2
      this.$swal.fire("ระวัง!", message, "warning", "OK");
    },
    showInfoAlert2(message) {
      // Use sweetalret2
      this.$swal.fire("โปรดทราบ", message, "info", "OK", "CANCLE");
    },
  },
};
</script>

<style></style>
