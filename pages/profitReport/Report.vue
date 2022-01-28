<template>
  <v-flex>
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
            :value="response.amount"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-view>
        </v-col>
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            title="ถอน"
            titleclass="red--text"
            :value="response.withdraw"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
          ></card-view>
        </v-col>
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            title="โบนัส"
            titleclass="purple--text"
            :value="response.totalbonus"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin.png"
          ></card-view>
        </v-col>
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            titleclass="purple--text"
            title="ฝาก+โบนัส"
            :value="response.amount + response.totalbonus"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin-stack.png"
          ></card-view>
        </v-col>
        <v-col cols="12" sm="4" lg="3" class="pa-2">
          <card-view
            titleclass="teal--text"
            title="กำไรขาดทุน"
            :condition="true"
            :value="response.amount - response.withdraw"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/monitoring.png"
          ></card-view>
        </v-col>
        <!-- sectioncard -->
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import CardView from "../../components/CardView.vue";
export default {
  components: { CardView },
  data() {
    return {
      response: {
        amount: 1050,
        bonus: 812.5,
        bonusAllDay: 187.5,
        bonusCheckin: 178,
        bonusCreditfree: 0,
        bonusDp7Days: 0,
        bonusFirstDp: 0,
        bonusManualTopup: 150,
        bonusNewMember: 255,
        bonusWheel: 0,
        totalCashback: 42,
        totalbonus: 812.5,
        withdraw: 239
      },
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      }
    };
  },
  methods: {
    getamount() {},
    searchdata() {
      console.log(this.dateFilter);
    }
  }
};
</script>

<style></style>
