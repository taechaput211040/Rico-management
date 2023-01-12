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
            :value="response.total + ' คน'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="จำนวนครั้งที่ฝาก"
            :value="total_dp_count + ' ครั้ง'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="ยอดฝากทั้งหมด"
            :value="total_dp_amount + ' บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/wallet.png"
          ></card-report> </v-col
        ><v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="จำนวนครั้งที่ถอน"
            :value="total_wd_count + ' ครั้ง'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
          ></card-report>
        </v-col>
        <v-col lg="2" sm="4" md="4" cols="12" class="pa-2">
          <card-report
            title="ยอดถอนทั้งหมด "
            :value="total_wd_amount + ' บาท'"
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
          :items-per-page="limit"
          hide-default-footer
        >
          <template #[`item.no`]="{index}">
            <span class="font-weight-bold">
              {{ index + 1 }}
            </span>
          </template>
          <template #[`item.wd_count`]="{item}">
            <span v-if="item.wd_count == null">
              0
            </span>
            <span v-else>
              {{ item.wd_count }}
            </span>
          </template>
          <template #[`item.withdraw`]="{item}">
            <span v-if="item.withdraw == null">
              0
            </span>
            <span v-else>
              {{ item.withdraw }}
            </span>
          </template>
          <template #[`item.winlose`]="{item}">
            <span v-if="item.winlose > 0" class="success--text">
              +{{ item.winlose }}
            </span>
            <span v-else class="error--text"> {{ item.winlose }} </span>
          </template>
          <template #[`item.upline`]="{item}">
            {{item.upline == null ? 'N/a' : item.upline}}
          </template>
          <template #[`item.telephone`]="{item}">
            {{item.telephone == null ? 'N/a' : item.telephone}}
          </template>
        </v-data-table>
      </v-card>
      <v-row class="mt-3">
        <v-col class="col-12 col-md-2">
          <v-select
            outlined
            dense
            hide-details="auto"
            v-model="limit"
            :items="pageSizes"
            label="รายการต่อหน้า"
            @change="onHandlePageSizeChange"
          ></v-select>
        </v-col>
        <v-col class="col-12 col-md-8">
          <v-pagination
            v-model="page"
            :total-visible="7"
            :length="total_page"
            @input="onPageChange(page)"
          ></v-pagination>
        </v-col>
        <v-col class="col-12 col-md-2"></v-col>
      </v-row>
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
          value: "dp_count",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ฝากทั้งหมด",
          value: "deposit",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "จำนวนครั้งที่ถอน",
          value: "wd_count",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ถอนทั้งหมด",
          value: "withdraw",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: ""
        },
        {
          text: "กำไรขาดทุน",
          value: "winlose",
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
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
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
      pageSizes: [5,10,15,25],
      column_order: 'date',
      order: 'ASC'
    };
  },
  async fetch() {
    this.getReport();
  },
  methods: {
    ...mapActions("profit", ["getProfitByUserReport"]),
    getamount() {},
    searchdata() {
      // console.log(this.dateFilter);
      this.page = 1;
      this.getReport();
    },
    formatDate(date,date2) {
      let result = ''
      let the_day = new Date(date),
        month = '' + (the_day.getMonth() + 1),
        day = '' + the_day.getDate(),
        year = the_day.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      let the_time = new Date(date2),
      hour = '' + (the_time.getHours()),
      min = '' + (the_time.getMinutes()),
      sec = '' + (the_time.getSeconds());
      if (hour.length < 2)
        hour = '0' + hour;
      if (min.length < 2)
        min = '0' + min;
      if (sec.length < 2)
        sec = '0' + sec;

      result = [year, month, day].join('-');
      result += ' ';
      result += [hour, min, sec].join(':');
      result += 'Z';
      return result;
    },
    onPageChange(page_number){
      console.log(page_number)
      this.getReportByPage(page_number);
    },
    onHandlePageSizeChange(){
      this.getReportByPage(1);
      this.page = 1;
      console.log('new limit', this.limit);
      this.total_page = Math.ceil(this.total_user/this.limit);
    },
    axiosParams(){
      let params = ''
      params += 'start=' + this.formatDate(this.dateFilter.startDate, this.dateFilter.startTime);
      params += '&end=' + this.formatDate(this.dateFilter.endDate, this.dateFilter.endTime);
      params += '&company=' + localStorage.getItem('company');
      params += '&agent=' + localStorage.getItem('agent');
      params += '&page=' + this.page;
      params += '&limit=10000';
      params += '&column_order=' + this.column_order;
      params += '&order=' + this.order;
      // console.log(params)
      return params
    },
    async getReport() {
      this.isLoading = true;
      try {
        let params = this.axiosParams();
        // console.log(process.env.ALL_PROFIT_LOSS);
        // console.log(params);
        let response = await this.getProfitByUserReport(params);
        this.response = response;
        this.total_user = response.total;
        this.total_wd_count = 0;
        this.total_wd_amount = 0;
        this.total_dp_count = 0;
        this.total_dp_amount = 0;
        this.profit_loss = 0;
        for(let i = 0; i < this.total_user;i++){
          this.total_wd_count += response.data[i].wd_count;
          this.total_wd_amount += response.data[i].withdraw;
          this.total_dp_count += response.data[i].dp_count;
          this.total_dp_amount += response.data[i].deposit;
          this.profit_loss += response.data[i].winlose;
          // console.log(response.data.length);
          // console.log( Math.ceil(response.data.length/this.limit) );
          // console.log(this.total_user,i);
        }
        this.total_page = Math.ceil(response.total/this.limit);
        // console.log('-----------------');
        // console.log(this.total_user, 'user');
        // console.log( Math.ceil(response.total/this.limit) );
        // console.log(this.response);
        this.isLoading = false
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    axiosParamsWithbyPage(page){
      let params = ''
      params += 'start=' + this.formatDate(this.dateFilter.startDate, this.dateFilter.startTime);
      params += '&end=' + this.formatDate(this.dateFilter.endDate, this.dateFilter.endTime);
      params += '&company=' + localStorage.getItem('company');
      params += '&agent=' + localStorage.getItem('agent');
      params += '&page=' + this.page;
      params += '&limit=' + this.limit;
      params += '&column_order=' + this.column_order;
      params += '&order=' + this.order;
      // console.log(params)
      return params
    },
    async getReportByPage(page_number) {
      await setTimeout(5000);
      try {
        this.isLoading = true;
        let params = this.axiosParamsWithbyPage(page_number);
        // console.log(process.env.ALL_PROFIT_LOSS);
        // console.log(params);
        let response = await this.getProfitByUserReport(params);
        this.response = response;
        this.isLoading = false;
        // console.log(this.response,'logs')
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    }

  }
};
</script>

<style></style>
