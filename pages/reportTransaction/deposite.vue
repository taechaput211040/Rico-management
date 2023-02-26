<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการฝากเงินของสมาชิก</h2>
        <search-filter
          :filter="dateFilter"
          @search="getData(dateFilter.inputfilter)"
          :searchinput="true"
          @yesterday="getYesterDay(dateFilter.inputfilter)"
          @today="getToday(dateFilter.inputfilter)"
        ></search-filter
      ></v-row>
      <h2 class="mt-5">ยอดฝากรวม แยก ธนาคาร</h2>

      <v-row v-if="itembank.length > 0">
        <v-col cols="12" sm="3" md="3" v-for="(item, i) in itembank" :key="i" >
          <div class="card-child card-report elevation-5 text-center" @click="getDataOption(item.companybank)">
            <img-bank :value="item.companybank"></img-bank>
            <div>
              <span class="primary--text font-weight-bold" v-if="item.companybank == 'AUTO'"
                >เติมมิอ
              </span>
              <span class="primary--text font-weight-bold" v-if="item.companybank == 'XXXXXX'"
              >เติมโบนัส
            </span>
              <span class="primary--text font-weight-bold"  v-if="item.companybank == 'SCB'"
              >SCB
            </span>
            <span class="primary--text font-weight-bold" v-if="item.companybank == 'KBANK'"
            >KBANK
          </span>
          <span class="primary--text font-weight-bold"  v-if="item.companybank == 'TRUEWALLET'"
          >TRUEWALLET
        </span>
            </div>
            <div>
              ฝากรวม :<span class="primary--text font-weight-bold"
                >{{ item.total_sum }}
              </span>
            </div>
            <div>
              โบนัสรวม :<span class="primary--text font-weight-bold"
                >{{ item.total_bonus }}
              </span>
            </div>
            <div>
              ครั้ง :<span class="primary--text font-weight-bold"
                >{{ item.count }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
        <div class="pa-5 font-weight-bold">
          จำนวนสมาชิกทั้งหมด
          {{ itemdeposit.meta ? itemdeposit.meta.itemCount : 0 }} คน
        </div>
        <v-card width="100%" class="elevation-4 rounded-lg">
          <v-data-table
            show-expand
            class="elevation-1"
            :headers="headerCell"
            :items="itemdeposit.data"
            single-expand
            :options.sync="options"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
              'items-per-page-options': [50, 100],
            }"
            :server-items-length="
              itemdeposit.meta ? itemdeposit.meta.itemCount : 0
            "
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">{{
                options.itemsPerPage * (options.page - 1) + (index + 1)
              }}</span>
            </template>

            <template #[`item.companyBank`]="{ item }">
              <img-bank :value="item.companyBank"></img-bank>
            </template>
            <template #[`item.data-table-expand`]="{ isExpanded, expand }">
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
            <template #[`item.smsdatetime`]="{ item }">
              <span>
                {{ renderDate(item.smsdatetime) | dateFormat }}
              </span>
            </template>
            <template #[`item.created_at`]="{ item }">
              <span>
                {{ item.created_at | dateFormat }}
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
      isLoading: false,
      itembank: [],
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
          text: "ธนาคารเว็บ",
          value: "companyBank",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text",
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เครดิตก่อนเติม",
          value: "bfcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เติมโดย",
          value: "topupby",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold ",
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
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
  computed: {},

  created() {
    this.getBank();
  },
  watch: {
    options: {
      async handler() {
        await this.getData();
      },
    },
  },
  methods: {
    ...mapActions("transaction", ["getbankinfoSum", "getdpListtransaction"]),
    renderDate(date) {
      if (date[0] == "p") {
        return "โอนมือ";
      }

      return dayjs(date).add(+7, "hours").format("YYYY-MM-DD HH:mm:ss");
    },
    getParameter() {
      let parameter = {
        take: this.options.itemsPerPage,
        page: this.options.page,
        start: dayjs(this.dateFilter.startDate).format(),
        end: dayjs(this.dateFilter.endDate).endOf('day').format(),
        username: this.dateFilter.inputfilter,
      };
      return parameter;
    },
    async getDataOption(input = null){
      this.isLoading = true;
      let params = this.getParameter();

      if (!input) {
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
        console.log(input);
        params.companyBank = input;
        params.username = null
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
    async getData(input = null) {
      this.isLoading = true;
      let params = this.getParameter();
      if (!input) {
        try {
          console.log(params);
          const data = await this.getdpListtransaction(params);
          this.itemdeposit = data;
          await this.getBank()
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
        this.isLoading = false;
      } else {
        console.log(input);
        params.username = input;
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
   
    async getBank() {
      let params = this.getParameter();
      try {
        let response = await this.getbankinfoSum(params);
     
        this.itembank = response.bankSummary;
      } catch (error) {
        console.log(error);
      }
    },
    setYesterday() {
    
    this.dateFilter.startDate = dayjs().add(-1,'day').format('YYYY-MM-DD')
    this.dateFilter.startTime = dayjs().add(-1,'day').format('HH:mm:ss')
    this.dateFilter.endDate = dayjs().endOf(-1,'day').format('YYYY-MM-DD')
    this.dateFilter.endTime = dayjs().endOf(-1,'day').format('HH:mm:ss')
   
 
    
 },
   async getYesterDay(input=null) {
     this.isLoading = true;
     let params = this.getParameter();
     params.username = input
     await this.setYesterday()

   
     params.start = dayjs().add(-1,'day').startOf('day').toISOString()
     params.end = dayjs().add(-1,'day').endOf('day').toISOString()
     try {
       console.log(params);
       const data = await this.getdpListtransaction(params);
       this.itemdeposit = data;
       await this.getBank()
     } catch (error) {
       console.log(error);
       this.isLoading = false;
     }
     this.isLoading = false;
   },
   async getToday(input=null) {
      this.isLoading = true;
      let params = this.getParameter();
      params.start = dayjs().startOf('day').toISOString()
      params.end = dayjs().endOf('day').toISOString()
      params.username = input
      try {
        console.log(params);
        const data = await this.getdpListtransaction(params);
        this.itemdeposit = data;
        await this.getBank()
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
