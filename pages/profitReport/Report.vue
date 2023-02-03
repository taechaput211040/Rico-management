<template>
  <v-flex>
    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
    <v-container
      ><h2 class="mb-2">กำไร / ขาดทุน</h2>
      <search-filter
        :searchinput="false"
        :filter="dateFilter"
        @search="searchdata"
      ></search-filter>
      <h2 class="mt-5">สรุปยอด กำไร / ขาดทุน</h2>
      <v-row class="mt-1">
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            title="ฝาก"
            titleclass="primary--text"
            :value="total_dp_amount | numberFormat"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-view>
        </v-col>
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            title="ถอน"
            titleclass="red--text"
            :value="total_wd_amount | numberFormat"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
          ></card-view>
        </v-col>
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            title="โบนัส"
            titleclass="purple--text"
            :value="total_bonus | numberFormat"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin.png"
          ></card-view>
        </v-col>
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            titleclass="purple--text"
            title="ฝาก+โบนัส"
            :class="total_dpbonus < 0 ? 'error--text' : 'success--text'"
            :value="total_dpbonus | numberFormat"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin-stack.png"
          ></card-view>
        </v-col>
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            titleclass="teal--text"
            title="กำไรขาดทุน"
            :class="profit_loss < 0 ? 'error--text' : 'success--text'"
            :value="profit_loss | numberFormat"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/monitoring.png"
          ></card-view>
        </v-col>
        <!-- sectioncard -->
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
import CardView from "../../components/CardView.vue";
export default {
  components: { CardView },
  data() {
    return {
      response: {},
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
      total_dp_amount: 0,
      total_wd_amount: 0,
      total_bonus: 0,
      profit_loss: 0,
      total_dpbonus: 0,
    };
  },
  async fetch() {
    try {
      this.getReport();
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("profit", ["getProfitReport"]),
    getamount() {},
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
    searchdata() {
      // console.log(this.dateFilter);
      this.getReport();
    },

    axiosParams() {
      let params = {
        start: this.formatDate(
          this.dateFilter.startDate,
          this.dateFilter.startTime
        ),
        end: this.formatDate(this.dateFilter.endDate, this.dateFilter.endTime),
        company: localStorage.getItem("company"),
        agent: localStorage.getItem("agent"),
      };

      return params;
    },
    async getReport() {
      this.isLoading = true;
      try {
        let params = this.axiosParams();
        let response = await this.getProfitReport(params);
        this.total_dp_amount = response.deposit;
        this.total_wd_amount = response.withdraw;
        this.total_bonus = response.bonus;
        this.profit_loss = response.winlose;
        this.total_dpbonus = response.dp_bonus;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
