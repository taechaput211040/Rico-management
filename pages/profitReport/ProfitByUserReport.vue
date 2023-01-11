<template>
  <v-flex>
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
            :value="response.total + ' คน'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="ฝากรวม"
            :value="response.deposit_count + ' ครั้ง'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="รวมทั้งหมด"
            :value="response.deposit_total + ' บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/wallet.png"
          ></card-report> </v-col
        ><v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="ถอน"
            :value="response.withdraw_count + ' ครั้ง'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="รวมถอน "
            :value="response.withdraw_total + ' บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/withdrawbank.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="กำไร/ขาดทุน"
            :condition="true"
            :value="response.transaction_total"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/monitoring.png"
          ></card-report> </v-col
      ></v-row>
      <v-card width="100%" class="elevation-4 mt-5 rounded-lg">
        <v-data-table
          class="elevation-1"
          :headers="headerCell"
          :items="response.data"
          hide-default-footer
        >
          <template #[`item.no`]="{index}">
            <span class="font-weight-bold">
              {{ index + 1 }}
            </span>
          </template>
          <template #[`item.withdraw_count`]="{item}">
            <span v-if="item.withdraw_count == null">
              0
            </span>
            <span v-else>
              {{ item.withdraw_count }}
            </span>
          </template>
          <template #[`item.withdraw_total`]="{item}">
            <span v-if="item.withdraw_total == null">
              0
            </span>
            <span v-else>
              {{ item.withdraw_total }}
            </span>
          </template>
          <template #[`item.total`]="{item}">
            <span v-if="item.total > 0" class="success--text">
              +{{ item.total }}
            </span>
            <span v-else class="error--text"> {{ item.total }} </span>
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
      response: {},
      headerCell: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "จำนวนครั้งที่ฝาก",
          value: "deposit_count",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ฝากทั้งหมด",
          value: "deposit_total",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "จำนวนครั้งที่ถอน",
          value: "withdraw_count",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ถอนทั้งหมด",
          value: "withdraw_total",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: ""
        },
        {
          text: "กำไรขาดทุน",
          value: "total",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold "
        },
        {
          text: "อัพไลน์",
          value: "upline",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold "
        },
        {
          text: "เบอร์โทร",
          value: "telephone",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold "
        }
      ],
      itemreport: [],
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      },
      page: 1,
      limit: 10,
      column_order: 'deposit',
      order: 'DESC'
    };
  },
  async fetch() {
    this.getReport();
  },
  methods: {
    ...mapActions("profit", ["getProfitByUserReport"]),
    getamount() {},
    searchdata() {
      console.log(this.dateFilter);
    },
    axiosParams(){
      let params = ''
      params += 'start=' +this.dateFilter.startDate;
      params += '&end=' + this.dateFilter.endDate;
      params += '&company=' + localStorage.getItem('company');
      params += '&agent=' + localStorage.getItem('agent');
      params += '&page=' + this.page;
      params += '&limit=' + this.limit;
      params += '&column_order=' + this.column_order;
      params += '&order=' + this.order;
      console.log(params)
      return params
    },
    async getReport() {
      try {
        let params = this.axiosParams();
        console.log(process.env.ALL_PROFIT_LOSS);
        console.log(params);
        let response = await this.getProfitByUserReport(params);
        this.response = response;
        console.log(this.response)
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
