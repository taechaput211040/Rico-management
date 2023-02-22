<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <h2 class="mb-2">ตั้งค่าเครดิตเงินคืน (Cashback)</h2>
      <v-card
        class="col-md-3 col-12 elevation-4 mt-5 pa-4 rounded-lg text-center"
      >
        <span class="font-weight-bold">สถานะการใช้งาน</span>
        <v-switch
          hide-details="auto"
          class="mx-5 mt-2"
          color="success"
          :true-value="true"
          :false-value="false"
          :disabled="canwrite"
          :label="`สถานะ`"
          v-model="cashback.status"
          @change="switchstatus"
        ></v-switch>
      </v-card>

      <v-card
        width="100%"
        class="elevation-4 mt-5 pa-4 rounded-lg font-weight-bold"
        v-if="cashback.status == 1"
      >
        <v-row
          ><v-col cols="12" sm="6" class="ma-auto text-center">
            <span class="font-weight-bold"
              >รูปโปรโมท(ขนาด 1040x1040 ไม่เกิน 1MB)</span
            >
            <div class="pa-4">
              <img
                :src="cashback.pictureUrl"
                alt=""
                class="img_promotion pa-md-3"
              />
              <v-file-input
                v-model="inputPicture"
                color="deep-purple accent-4"
                @change="selectFile"
                counter
                dense
                :disabled="canwrite"
                hide-details="auto"
                label="เปลี่ยนรูปโปรโมชั่น"
                placeholder="รูปโปรโมชัน"
                prepend-icon="mdi-camera"
                outlined
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
              <v-btn
                class="mx-auto btn_sty"
                color="success"
                prepend-icon="mdi-camera"
                label="upload"
                @click="uploadImage"
              >
                <v-icon>mdi-upload</v-icon> Upload
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-row class="pa-md-3 my-auto">
              <v-col sm="4" cols="12">
                เลือกการรับรายได้
                <v-select
                  :items="itemstype"
                  :item-text="itemstype.text"
                  :item-value="itemstype.value"
                  v-model="cashback.collect_type"
                  outlined
                  hide-details="auto"
                  dense
                ></v-select
              ></v-col>
              <v-col sm="4" cols="12">
                จำนวนเครดิตเงินคืน(%)
                <v-text-field
                  type="number"
                  v-model="cashback.rate"
                  dense
                  outlined
                  hide-details="auto"
                ></v-text-field
              ></v-col>
              <v-col sm="4" cols="12">
                เงินคืนสูงสุด ( 0 คือไม่จำกัด)
                <v-text-field
                  type="number"
                  v-model="cashback.max_amount"
                  dense
                  hide-details="auto"
                  outlined
                ></v-text-field
              ></v-col>
              <v-col cols="12">
                จำนวนอั้นถอน เมื่อกดรับเงินคืน (เป็นจำนวนเท่า ของเงิน cashback
                ที่กด รับ หากไม่อั้นถอนให้ใส่ 1000000 )
                <v-text-field
                  type="number"
                  v-model="cashback.wdlimit_multiply"
                  dense
                  hide-details="auto"
                  outlined
                ></v-text-field
              ></v-col>
            </v-row>
            <div class="px-md-4">
              <v-card-text class="font-weight-bold">
                ตั้งค่าเทิร์น
              </v-card-text>
              <v-row class="mb-4">
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="SLOT"
                    v-model="cashback.SL"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    v-model="cashback.SB"
                    label="Sportbook"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="ESPORT"
                    v-model="cashback.ES"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="HorseRacing"
                    v-model="cashback.OT"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4">
                  <v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    label="casino"
                    v-model="cashback.LC"
                  ></v-text-field
                ></v-col>
                <v-col cols="6" sm="4"
                  ><v-text-field
                    outlined
                    dense
                    hide-details="auto"
                    v-model="cashback.LT"
                    label="lotto"
                  ></v-text-field
                ></v-col> </v-row
              ><v-card-actions>
                <v-btn
                  class="mx-auto btn_sty"
                  :disabled="canwrite"
                  color="success"
                  @click.prevent="submitCashback"
                  >บันทึก</v-btn
                >
              </v-card-actions>
            </div></v-col
          >
        </v-row>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
      inputPicture: undefined,
      cashback: { status: false },
      typeselect: "รับได้รายวัน",
      itemstype: [
        { value: "DAY", text: "รับได้รายวัน" },
        { value: "WEEK", text: "รับได้รายสัปดาห์" },
        { value: "MOUNTH", text: "รับได้รายเดือน" },
      ],
    };
  },
  async fetch() {
    try {
      let response = await this.getCashback();
      this.cashback = response;
      this.isLoading = false;
    } catch (error) {}
  },
  computed: {
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("promotion_write")) return true;
        else return false;
      }
    },
  },
  methods: {
    ...mapActions("promotion", ["getCashback", "saveCashback"]),
    async submitCashback() {
      this.isLoading = true;
      await this.saveCashback(this.cashback);
      this.isLoading = false;
    },
    switchstatus() {
      this.submitCashback();
    },
    selectFile(value) {
      if (value) {
        this.cashback.pictureUrl = URL.createObjectURL(this.inputPicture);
      } else {
        this.url = "";
      }
    },
    async uploadImage() {
      this.loading = true;
      if (!this.inputPicture?.name) {
        this.$swal({
          icon: "warning",
          title: "กรุณาเลือกรูปที่ต้องการ",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      const data = new FormData();
      data.append("file", this.inputPicture);
      data.append("filename", this.inputPicture.name);
      try {
        let response = await this.$axios.post(
          "https://admin-static-api-ehhif4jpyq-as.a.run.app/api/Update/file/Dynamic/test/secret123",
          data
        );
        //   "https://all-member-gateway-ehhif4jpyq-as.a.run.app/api/Gateway/Provider/145c4b748540ca78664b32853e4031b5" );
        this.cashback.pictureUrl = response.data.image;
        this.$swal({
          icon: "success",
          title:
            "อัพโหลดสำเร็จ อย่าลืมกดบันทึก ด้านล่างสุดเพื่อบันทึกผลการเปลี่ยนแปลง",
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });

        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
