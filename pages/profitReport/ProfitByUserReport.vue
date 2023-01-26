<template>
  <v-flex>
    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
    <v-container
      ><h2 class="mb-2">รายงานฝาก /ถอน ตามบุคคล</h2>
      <search-filter
        :searchinput="false"
        :filter="dateFilter"
        @search="searchdata"
      ></search-filter>
      <v-row class="mt-3">
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="จำนวน user ทั้งหมด "
            :value="response.total + 'คน'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="จำนวนครั้งที่ฝาก"
            :value="total_dp_count + 'ครั้ง'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="ยอดฝากทั้งหมด"
            :value="total_dp_amount + 'บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/wallet.png"
          ></card-report> </v-col
        ><v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="จำนวนครั้งที่ถอน"
            :value="total_wd_count + 'ครั้ง'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="ยอดถอนทั้งหมด "
            :value="total_wd_amount + 'บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/withdrawbank.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="กำไร/ขาดทุน"
            :condition="true"
            :value="profit_loss"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/monitoring.png"
          ></card-report> </v-col
      ></v-row>
      <v-card width="100%" class="elevation-4 mt-5 rounded-lg">
        <v-data-table
          class="elevation-1"
          :headers="headerCell"
          :items="response.data"
          :server-items-length="response.total ?? 0"
          :items-per-page="limit"
          :options.sync="options"
        >
          <template #[`item.no`]="{ index }">
            <span class="font-weight-bold">{{
              options.itemsPerPage * (options.page - 1) + (index + 1)
            }}</span>
          </template>
          <template #[`item.wd_count`]="{ item }">
            <span v-if="item.wd_count == null"> 0 </span>
            <span v-else>
              {{ item.wd_count }}
            </span>
          </template>
          <template #[`item.withdraw`]="{ item }">
            <span v-if="item.withdraw == null"> 0 </span>
            <span v-else>
              {{ item.withdraw }}
            </span>
          </template>
          <template #[`item.winlose`]="{ item }">
            <span v-if="item.winlose > 0" class="success--text">
              +{{ item.winlose }}
            </span>
            <span v-else class="error--text"> {{ item.winlose }} </span>
          </template>
          <template #[`item.upline`]="{ item }">
            {{ item.upline == null ? "N/a" : item.upline }}
          </template>
          <template #[`item.telephone`]="{ item }">
            {{ item.telephone == null ? "N/a" : item.telephone }}
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      options: {},
      response: {},
      headerCell: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px",
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text",
        },
        {
          text: "จำนวนครั้งที่ฝาก",
          value: "dp_count",
          align: "center",
          class: "font-weight-bold ",
        },
        {
          text: "ฝากทั้งหมด",
          value: "deposit",
          align: "center",
          class: "font-weight-bold ",
        },
        {
          text: "จำนวนครั้งที่ถอน",
          value: "wd_count",
          align: "center",
          class: "font-weight-bold ",
        },
        {
          text: "ถอนทั้งหมด",
          value: "withdraw",
          align: "center",
          class: "font-weight-bold ",
          cellClass: "",
        },
        {
          text: "กำไรขาดทุน",
          value: "winlose",
          align: "center",
          class: "font-weight-bold ",
          cellClass: "font-weight-bold ",
        },
        {
          text: "อัพไลน์",
          value: "upline",
          align: "center",
          class: "font-weight-bold ",
          cellClass: "font-weight-bold ",
        },
        {
          text: "เบอร์โทร",
          value: "telephone",
          align: "center",
          class: "font-weight-bold ",
          cellClass: "font-weight-bold ",
        },
      ],
      itemreport: [],
      dateFilter: {
        inputfilter: "",
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      isLoading: false,
      total_user: 0,
      total_dp_count: 0,
      total_dp_amount: 0,
      total_wd_count: 0,
      total_wd_amount: 0,
      profit_loss: 0,
      page: 1,
      total_page: 0,
      limit: 10,
      pageSizes: [5, 10, 15, 25],
      column_order: "date",
      order: "ASC",
    };
  },
  async fetch() {
    this.getReport();
  },
  watch: {
    options: {
      async handler() {
        await this.getReport();
      },
    },
  },
  methods: {
    ...mapActions("profit", ["getProfitByUserReport"]),
    getamount() {},
    searchdata() {
      // console.log(this.dateFilter);
      this.page = 1;
      this.getReport();
    },
    formatDate(date, date2) {
      let result = "";
      let the_day = new Date(date),
        month = "" + (the_day.getMonth() + 1),
        day = "" + the_day.getDate(),
        year = the_day.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      let the_time = new Date(date2),
        hour = "" + the_time.getHours(),
        min = "" + the_time.getMinutes(),
        sec = "" + the_time.getSeconds();
      if (hour.length < 2) hour = "0" + hour;
      if (min.length < 2) min = "0" + min;
      if (sec.length < 2) sec = "0" + sec;

      result = [year, month, day].join("-");
      result += " ";
      result += [hour, min, sec].join(":");
      result += "Z";
      return result;
    },

    axiosParams() {
      let order = this.getOptionalOrder();
      let parameter = {
        start: this.formatDate(
          this.dateFilter.startDate,
          this.dateFilter.startTime
        ),
        end: this.formatDate(this.dateFilter.endDate, this.dateFilter.endTime),
        company: localStorage.getItem("company"),
        agent: localStorage.getItem("agent"),
        limit: this.options.itemsPerPage,
        page: this.options.page,
        order: order == undefined ? undefined : order.sortDesc,
        column_order: order == undefined ? undefined : order.sortBy,
      };
      return parameter;
    },
    getOptionalOrder() {
      let order = {};
      if (this.options.sortBy[0]) {
        order.sortBy = this.options.sortBy[0];
        if (this.options.sortDesc[0] === false) {
          order.sortDesc = "ASC";
        } else {
          order.sortDesc = "DESC";
        }
      } else {
        order = undefined;
      }
      return order;
    },
    async getReport() {
      this.isLoading = true;
      try {
        let params = this.axiosParams();
        let response = await this.getProfitByUserReport(params);
        this.response = response;
        this.total_user = response.total;
        this.total_wd_count = response.total_sum.wd_count;
        this.total_wd_amount = response.total_sum.withdraw;
        this.total_dp_count = response.total_sum.dp_count;
        this.total_dp_amount = response.total_sum.deposit;
        this.profit_loss = response.total_sum.winlose;
        this.total_page = Math.ceil(response.total / this.limit);
      } catch (error) {
        this.isLoading = false;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
