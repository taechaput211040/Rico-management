<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <v-row class="mb-2 pa-3">
        <h2>รายการถอนเงินของสมาชิก</h2>
        <search-filter
          :filter="dateFilter"
          @search="getData(dateFilter.inputfilter)"
          :searchinput="true"
          @yesterday="getYesterDay(dateFilter.inputfilter)"
          @today="getToday(dateFilter.inputfilter)"
        ></search-filter>
      </v-row>
      <h2 class="mt-5">ยอดถอนรวม</h2>
      <v-row>
        <v-col cols="12" sm="3" md="3">
          <div class="card-child card-report elevation-5 text-center">
            <img
              src="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
              alt=""
              class="img-icon icon-Logo"
            />
            <div>
              ยอดถอนรวม :<span class="primary--text font-weight-bold"
                >{{ depositbalance }}
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

            <template #[`item.bankAcc`]="{ item }">
              <div class="pa-2">
                <img-bank :value="item.bankName"></img-bank>
                <span class="font-weight-bold">{{ item.bankAcc }}</span>
              </div>
            </template>
            <template #[`item.status`]="{ item }">
              <v-chip
                small
                v-if="item.status == 'Success'"
                outlined
                color="success"
              >
                <v-icon left small>mdi-circle</v-icon> {{ item.status }}</v-chip
              >
              <v-chip small v-else color="error" outlined
                ><v-icon left small>mdi-circle</v-icon>
                {{ item.status }}</v-chip
              >
            </template>
            <template #[`item.name`]="{ item }">
              <div class="pa-2">
                <span>{{ item.name }}</span
                ><br />
                <span class="font-weight-bold primary--text">{{
                  item.username
                }}</span>
              </div>
            </template>
            <template #[`item.requsettime`]="{ item }">
              <span>
                {{ item.requsettime.slice(0,20)  }}
              </span>
            </template>
            <template #[`item.transferTime`]="{ item }">
              <span>
                {{ renderDate(item.transferTime)? renderDate(item.transferTime):'โอนมือ'  }}
              </span>
            </template>
            <template #[`item.bfafcredit`]="{ item }">
              <div class="d-flex align-baseline justify-center">
                <v-chip
                  class="font-weight-bold pa-2 elevation-2 mt-2 mx-2 mb-1"
                  color="grey darken-1"
                  label
                  x-small
                  dark
                  ><v-icon class="mr-1" small>mdi-credit-card</v-icon>ก่อน
                  :</v-chip
                >
                {{ item.bfcredit }}
              </div>

              <div class="d-flex align-baseline justify-center">
                <v-chip
                  class="font-weight-bold pa-2 elevation-2 mt-2 mx-2 mb-1"
                  color="grey darken-1"
                  label
                  x-small
                  dark
                  ><v-icon class="mr-1" small>mdi-credit-card</v-icon>หลัง
                  :</v-chip
                >
                {{ item.afcredit }}
              </div>
            </template>
            <template #[`item.data-table-expand`]="{ isExpanded, expand }">
              <div class="px-3">
                <v-btn
                  @click="expand(true)"
                  v-if="!isExpanded"
                  color="black"
                  dark
                  small
                >
                  ดูเพิ่มเติม <v-icon right>mdi-menu-down</v-icon></v-btn
                >
                <v-btn
                  @click="expand(false)"
                  v-if="isExpanded"
                  color="black"
                  dark
                  small
                  >ปิด<v-icon right>mdi-menu-up</v-icon></v-btn
                >
              </div>
            </template>
            <template #[`item.actions`]>
              <div class="d-flex">
                <v-tooltip bottom color="success">
                  <template v-slot:activator="{ on, attrs }"
                    ><v-btn
                      :disabled="canwrite"
                      v-bind="attrs"
                      v-on="on"
                      color="success mx-1"
                      x-small
                      fab
                      ><v-icon>mdi-check</v-icon></v-btn
                    ></template
                  >
                  <span>อนุมัติ</span>
                </v-tooltip>

                <v-tooltip bottom color="error">
                  <template v-slot:activator="{ on, attrs }"
                    ><v-btn
                      :disabled="canwrite"
                      v-bind="attrs"
                      v-on="on"
                      color="error mx-1"
                      x-small
                      fab
                      ><v-icon>mdi-close</v-icon></v-btn
                    ></template
                  >
                  <span>ไม่อนุมัติ</span>
                </v-tooltip>
                <v-tooltip bottom color="primary">
                  <template v-slot:activator="{ on, attrs }"
                    ><v-btn
                      :disabled="canwrite"
                      v-bind="attrs"
                      v-on="on"
                      color="primary mx-1"
                      x-small
                      dark
                      fab
                      ><v-icon>mdi-restore</v-icon></v-btn
                    ></template
                  >
                  <span>Reset</span>
                </v-tooltip>
                <v-tooltip bottom color="grey">
                  <template v-slot:activator="{ on, attrs }"
                    ><v-btn
                      :disabled="canwrite"
                      v-bind="attrs"
                      v-on="on"
                      color="grey mx-1"
                      x-small
                      dark
                      fab
                      ><v-icon>mdi-gesture-tap</v-icon></v-btn
                    ></template
                  >
                  <span>ถอนมือ</span>
                </v-tooltip>
              </div>
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
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      isLoading: false,
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
          text: "ธนาคารลูกค้า",
          value: "bankAcc",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ชื่อบัญชีลูกค้า",
          value: "name",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ยอดโอน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เวลากดถอน",
          value: "requsettime",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },

        {
          text: "ยอดเครดิตก่อน/หลัง",
          value: "bfafcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold ",
        },
        {
          text: "เวลาโอนสำเร็จ",
          value: "transferTime",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ยอดเงินบัญชีถอน",
          value: "bonusamount",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "โอนโดย",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "การดำเนินการ",
          value: "actions",
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
        options: "username",
      },
    };
  },
  components: { ImgBank, LoadingPage },
  async fetch() {
    let wdlist = await this.getData();
    this.itemdeposit = wdlist.data;
  },
  watch: {
    options: {
      async handler() {
        await this.getData();
      },
    },
  },
  computed: {
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("reportTransaction_write")) return true;
        else return false;
      }
    },
  },
  methods: {
    ...mapActions("transaction", ["getwdListtransaction"]),
    renderDate(date){
    
     if(date[0] == 'p'){
      return 'โอนมือ'
     } 
     
      return  dayjs(date).add(+7,'hours').format("YYYY-MM-DD HH:mm:ss")
    },
    getParameter() {
      let parameter = {
        take: this.options.itemsPerPage,
        page: this.options.page,
        start: this.dateFilter.startDate,
        end: this.dateFilter.endDate,
        username: null,
      };
      return parameter;
    },
    setYesterday() {
      this.dateFilter.startDate = dayjs().add(-1, "day").format("YYYY-MM-DD");
      this.dateFilter.startTime = dayjs().add(-1, "day").format("HH:mm:ss");
      this.dateFilter.endDate = dayjs().endOf(-1, "day").format("YYYY-MM-DD");
      this.dateFilter.endTime = dayjs().endOf(-1, "day").format("HH:mm:ss");
    },
    async getYesterDay(input = null) {
      this.isLoading = true;
      let params = this.getParameter();
      params.username = input;
      await this.setYesterday();

      params.start = dayjs().add(-1, "day").startOf("day").toISOString();
      params.end = dayjs().add(-1, "day").endOf("day").toISOString();
      try {
        console.log(params);
        const data = await this.getwdListtransaction(params);
        this.itemdeposit = data;
        this.depositbalance = data.sum;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async getToday(input = null) {
      this.isLoading = true;
      let params = this.getParameter();
      params.username = input;
      params.start = dayjs().startOf("day").toISOString();
      params.end = dayjs().endOf("day").toISOString();
      try {
        console.log(params);
        const data = await this.getwdListtransaction(params);
        this.itemdeposit = data;
        this.depositbalance = data.sum;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async getData(input = null) {
      this.isLoading = true;
      let params = this.getParameter();
      params.keyword = input;
      console.log("asdasdasd", params);
      if (!input) {
        try {
          console.log(params);
          const data = await this.getwdListtransaction(params);
          this.itemdeposit = data;
          this.depositbalance = data.sum;
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
          const data = await this.getwdListtransaction(params);
          this.itemdeposit = data;
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
        this.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
