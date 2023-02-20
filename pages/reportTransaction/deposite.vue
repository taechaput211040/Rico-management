<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการฝากเงินของสมาชิก</h2>
        <search-filter :filter="dateFilter" @search="getData(dateFilter.inputfilter)"  :searchinput="true" @yesterday="getYesterDay()" @today="getToday()"></search-filter
      ></v-row>
      <!-- <h2 class="mt-5">ยอดฝากรวม แยก ธนาคาร</h2>

      <v-row>
        <v-col cols="12" sm="3" md="3" v-for="(item, i) in itembank" :key="i">
          <div class="card-child card-report elevation-5 text-center">
            <img-bank :value="item.companyBank"></img-bank>
            <div>
              ยอดฝากรวม :<span class="primary--text font-weight-bold"
                >{{ item.total_sum }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row> -->

      <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
        <div class=" pa-5 font-weight-bold">
          จำนวนสมาชิกทั้งหมดตั้งเเต่วันที่
          {{ date_start }} ถึงวันที่ {{ date_end }} จำนวนทั้งหมด
          {{ itemdeposit.length }} คน
        </div>
        <v-card width="100%" class="elevation-4 rounded-lg">
          <v-data-table
            show-expand
            class="elevation-1"
            :headers="headerCell"
            :items="itemdeposit.data"
            hide-default-footer
            single-expand
            :options.sync="options" :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
            }" :server-items-length="
            itemdeposit.meta ? itemdeposit.meta.itemCount : 0"
          >
            <template #[`item.no`]="{index}">
              <span class="font-weight-bold">
                {{ index + 1 }}
              </span>
            </template>

            <template #[`item.companyBank`]="{item}">
              <img-bank :value="item.companyBank"></img-bank>
            </template>
            <template #[`item.data-table-expand`]="{isExpanded, expand }">
              <div class="px-2">
                <v-btn
                  @click="expand(true)"
                  v-if="!isExpanded"
                  color="black"
                  dark
                  small
                  >ดูเพิ่มเติม</v-btn
                >
                <v-btn
                  @click="expand(false)"
                  v-if="isExpanded"
                  color="black"
                  dark
                  small
                  >ปิด</v-btn
                >
              </div>
            </template>
            <template #[`item.smsdatetime`]="{item}">
              <span>
                {{ getthaidate(item.smsdatetime) }}
              </span>
            </template>
            <template #[`item.created_at`]="{item}">
              <span>
                {{ getthaidate(item.created_at) }}
              </span>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="text-center font-weight-bold purple--text">
                  {{ item.remark }}
                </div>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import dayjs from "dayjs";
import ImgBank from "../../components/ImgBank.vue";
import LoadingPage from "../../components/LoadingPage.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isLoading:false,
      itembank: [],
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
          text: "ธนาคารเว็บ",
          value: "companyBank",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "USERNAME",
          value: "member_id",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เครดิตก่อนเติม",
          value: "bfcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เติมโดย",
          value: "topupby",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold "
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      options_deposit: {},
      options: {},
      itemdeposit: [],
      depositbalance: 0,
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().slice(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().slice(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    };
  },
  components: { ImgBank, LoadingPage },
  computed: {
    date_start(val) {
      if (val) {
        return this.$moment(String(this.dateFilter.startDate)).format(
          "MM/DD/YYYY"
        );
      }
    },
    date_end(val) {
      if (val) {
        return this.$moment(String(this.dateFilter.endDate)).format(
          "MM/DD/YYYY"
        );
      }
    }
  },
  async fetch() {
    try {
      let response = await this.getdpListtransaction();
      this.itemdeposit = response;
    } catch (error) {
      console.log(error);
    }
  },
  created() {
    this.getBank();
  },
  methods: {
    ...mapActions("transaction", ["getbankinfo", "getdpListtransaction"]),
    getDateTime(date, time) {
      let dateFormat = "YYYY-MM-DD";
      let timeFormat = "HH:mm:ss";
      return this.$moment(
        `${this.$moment(date).format(dateFormat)} ${this.$moment(time).format(
          timeFormat
        )}`,
        "YYYY-MM-DD HH:mm:ss"
      )
        .utc()
        .format(`${dateFormat} ${timeFormat}`);
    },
    getDateFilter() {
      let start = undefined;
      let end = undefined;
      if (this.dateFilter.startDate) {
        if (this.dateFilter.startTime) {
          start = this.getDateTime(
            this.dateFilter.startDate,
            this.dateFilter.startTime
          );
        } else {
          start = this.getDateTime(
            this.dateFilter.startDate,
            new Date().setHours(0, 0, 0, 0)
          );
        }
      }
      if (this.dateFilter.endDate) {
        if (this.dateFilter.endTime) {
          end = this.getDateTime(
            this.dateFilter.endDate,
            this.dateFilter.endTime
          );
        } else {
          end = this.getDateTime(
            this.dateFilter.endDate,
            new Date().setHours(23, 59, 59, 999)
          );
        }
      }
      return {
        end: this.$moment(end).format("YYYY-MM-DD HH:mm:ss") + "Z",
        start: this.$moment(start).format("YYYY-MM-DD HH:mm:ss") + "Z",
      };
    },
    getParameter() {
      let dateFill = this.getDateFilter();
      let parameter = {
        take: this.options.itemsPerPage,
        page: this.options.page,
        start: dateFill.start,
        end: dateFill.end,
        username:null
      };
      return parameter;
    },
    setYesterday() {
    
    this.dateFilter.startDate = dayjs().add(-1,'day').format('YYYY-MM-DD')
    this.dateFilter.startTime = dayjs().add(-1,'day').format('HH:mm:ss')
    this.dateFilter.endDate = dayjs().endOf(-1,'day').format('YYYY-MM-DD')
    this.dateFilter.endTime = dayjs().endOf(-1,'day').format('HH:mm:ss')
   
 
    
 },
    async getYesterDay() {
      this.isLoading = true;
      let params = this.getParameter();
      await this.setYesterday()

    
      params.start = dayjs().add(-1,'day').startOf('day').toISOString()
      params.end = dayjs().add(-1,'day').endOf('day').toISOString()
      try {
        console.log(params);
        const data = await this.getdpListtransaction(params);
        this.itemdeposit = data;
       
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async getToday() {
      this.isLoading = true;
      let params = this.getParameter();
      params.start = dayjs().startOf('day').toISOString()
      params.end = dayjs().endOf('day').toISOString()
      try {
        console.log(params);
        const data = await this.getdpListtransaction(params);
        this.itemdeposit = data;
       
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async getData(input=null) {
      this.isLoading = true;
      let params = this.getParameter();
      if(!input){
        try {
        console.log(params);
        const data = await this.getdpListtransaction(params);
        this.itemdeposit = data;
       
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
      } else {
        console.log(input)
        params.username = input
        try {
        console.log(params);
        const data = await this.getdpListtransaction(params);
        this.itemdeposit = data;
    
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
      }
     
    },
    searchdata() {
      console.log(this.dateFilter);
    },
    async getBank() {
      try {
        let response = await this.getbankinfo();
        this.itembank = response.data.bankSummary;
      } catch (error) {
        console.log(error);
      }
    },
    getthaidate(timethai) {
      const time = this.$moment(timethai)
        .add(7, "hours")
        .format("YYYY-MM-DD เวลา HH:mm:ss");
      return time;
    }
  }
};
</script>

<style></style>
