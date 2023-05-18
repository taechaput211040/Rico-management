<template>
  <div>
    <loading-page v-if="isLoading"></loading-page>
    <div class="container">
      <h3>ตั้งค่ากงล้อเสี่ยงโชค</h3>
      <v-card
        class="col-md-3 col-12 elevation-2 mt-5 pa-4 rounded-lg text-center"
      >
        <span class="font-weight-bold">สถานะการใช้งาน</span>
        <v-switch
          :disabled="canwrite"
          hide-details="auto"
          class="mx-5 mt-2"
          color="success"
          :label="`สถานะ ${renderSwitch(turn.isActive)}`"
          v-model="status"
          @change="switchstatus(status)"
        ></v-switch>
      </v-card>
      <div v-if="status == true">
        <v-card class="mt-3">
          <v-data-table
            hide-default-footer
            :headers="wheelHeader"
            :items="roullet"
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">
                {{ index + 1 }}
              </span>
            </template>
            <template #[`item.action`]="{ item }">
              <v-btn
                color="purple darken-4"
                rounded
                class="btn_sty"
                dark
                small
                :disabled="canwrite"
                @click="setting(item)"
                ><v-icon left small>mdi-cog</v-icon> ตั้งค่า</v-btn
              >
            </template>
            <template #[`item.status`]="{ item }">
              <v-chip
                color="error"
                small
                outlined
                dark
                v-if="item.status == '0'"
              >
                <v-icon left small>mdi-circle</v-icon>
                ไม่อนุญาต
              </v-chip>
              <v-chip
                color="success"
                small
                outlined
                dark
                v-if="item.status == '1'"
              >
                <v-icon left small>mdi-circle</v-icon>
                อนุญาต
              </v-chip>
            </template>
          </v-data-table>
        </v-card>

        <div class="mt-3">
          <v-dialog v-model="setting_roulette" max-width="600px" height="auto">
            <v-card class="pa-5 font-weight-bold">
              <v-card-title>
                <h3 class="font-weight-bold py-3 mx-auto">
                  ตั้งค่ากงล้อเสี่ยงโชค
                </h3>
              </v-card-title>
              <v-row class="my-1">
                <v-col cols="12">
                  ชื่อรางวัล:
                  <v-text-field
                    required
                    v-model="settingitem.title"
                    dense
                    hide-details="auto"
                    outlined
                    maxLength="10"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  ยอดเงินรางวัล:
                  <v-text-field
                    required
                    v-model.number="settingitem.credit"
                    type="number"
                    dense
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  โอกาสถูก(%):
                  <v-text-field
                    v-model.number="settingitem.award_percent"
                    type="number"
                    hide-details="auto"
                    dense
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  อนุญาตออกรางวัล:
                  <v-btn
                    color="error"
                    dark
                    small
                    v-if="settingitem.status == '0'"
                    @click="Toggle(settingitem.status)"
                  >
                    ไม่อนุญาต
                  </v-btn>
                  <v-btn
                    color="success"
                    dark
                    small
                    v-if="settingitem.status == '1'"
                    @click="Toggle(settingitem.status)"
                  >
                    อนุญาต
                  </v-btn>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-card-actions class="text-center mx-auto">
                <v-btn @click="settingOk" color="primary" class="ml-auto"
                  >บันทึก</v-btn
                >
                <v-btn @click="cancel" color="grey" dark class="mr-auto"
                  >ยกเลิก</v-btn
                >
              </v-card-actions>
            </v-card></v-dialog
          >

          <h3 class="my-4">ตั้งค่าเทิร์น & อั้นถอน</h3>
          <v-card class="pa-3">
            <div class="forum-input">
              <form @submit.prevent="submitform" autocomplete="off">
                <div class="row">
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    โหมด BUY FEATURE :<br />
                    <v-switch
                      hide-details="auto"
                      class="mx-5"
                      :disabled="canwrite"
                      :true-value="true"
                      :false-value="false"
                      color="success"
                      v-model="turn.buy_feature"
                      :label="`สถานะ: ${renderSwitch(turn.buy_feature)}`"
                    ></v-switch>
                  </div>
                  <div
                    class="col-12 col-sm-6 col-md-3 p-md-4 p-3"
                    v-if="turn.buy_feature == true"
                  >
                    จำนวนเงินสำหรับการซื้อ 1 ครั้ง :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      type="number"
                      v-model.number="turn.buy_amount"
                      required
                    />
                  </div>
                  <div
                    class="col-12 p-md-4 p-3"
                    v-if="turn.buy_feature == true"
                  >
                    <v-card>
                      คำอธิบาย : <br />
                      ยอดรางวัลเครดิตที่ได้จากการซื้อสปินจะไม่ถูกคิดเป็น โบนัส
                      และไม่ติดเทิร์น และไม่ใช่ เครดิตเอเจ้น เป็น
                      เครดิตที่ได้จากเกม<br />
                      โดยทุกครั้งที่มีการซื้อสปิน จะคิดค่าธรรมเนียม ต่อการซื้อ 1
                      ครั้งที่ 2% ของมูลค่าที่ตั้งไว้ เช่น ตั้งไว้ ซื้อครั้งละ
                      100 จะต้องเสียค่าคอมมิชชั่น 2 บาท
                      โดยจะเรียกเก็บพร้อมค่าระบบ
                    </v-card>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    จำนวนยอดฝากสำหรับการหมุนฟรี 1 ครั้ง :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      type="number"
                      v-model.number="turn.amount"
                      required
                    />
                  </div>
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    อั้นถอน(เป็นจำนวนเท่า) :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      type="number"
                      v-model.number="turn.wdlimit"
                      required
                    />
                    <div
                      class="validate"
                      v-show="
                        !$v.turn.wdlimit.required & $v.turn.wdlimit.$dirty
                      "
                    >
                      กรุณาใส่จำนวนอั้นถอน
                    </div>
                    <div class="validate" v-show="!$v.turn.wdlimit.minValue">
                      จำนวนอั้นถอนเริ่มต้น 0 เท่า
                    </div>
                    <div
                      class="warning-show"
                      v-show="
                        ($v.turn.wdlimit.$model == 0) &
                        $v.turn.wdlimit.minValue &
                        $v.turn.wdlimit.required
                      "
                    >
                      **ไม่อั้นถอน**
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    เทิร์น SlOT :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      type="number"
                      v-model.number="turn.SLOT"
                      required
                    />
                    <div
                      class="validate"
                      v-show="!$v.turn.SLOT.required & $v.turn.SLOT.$dirty"
                    >
                      กรุณาใส่จำนวนเทิร์น
                    </div>
                    <div class="validate" v-show="!$v.turn.SLOT.minValue">
                      จำนวนเทิร์นเริ่มต้น 1 เทิร์น
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    เทิร์น Sportbook :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      v-model.number="turn.FOOTBALL"
                      type="number"
                      required
                    />
                    <div
                      class="validate"
                      v-show="
                        !$v.turn.FOOTBALL.required & $v.turn.FOOTBALL.$dirty
                      "
                    >
                      กรุณาใส่จำนวนเทิร์น
                    </div>
                    <div class="validate" v-show="!$v.turn.FOOTBALL.minValue">
                      จำนวนเทิร์นเริ่มต้น 1 เทิร์น
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    เทิร์น Esport :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      v-model.number="turn.ESPORT"
                      type="number"
                      required
                    />
                    <div
                      class="validate"
                      v-show="!$v.turn.ESPORT.required & $v.turn.ESPORT.$dirty"
                    >
                      กรุณาใส่จำนวนเทิร์น
                    </div>
                    <div class="validate" v-show="!$v.turn.ESPORT.minValue">
                      จำนวนเทิร์นเริ่มต้น 1 เทิร์น
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    เทิร์น HorseRacing :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      v-model.number="turn.HORSERACING"
                      type="number"
                      required
                    />
                    <div
                      class="validate"
                      v-show="
                        !$v.turn.HORSERACING.required &
                        $v.turn.HORSERACING.$dirty
                      "
                    >
                      กรุณาใส่จำนวนเทิร์น
                    </div>
                    <div
                      class="validate"
                      v-show="!$v.turn.HORSERACING.minValue"
                    >
                      จำนวนเทิร์นเริ่มต้น 1 เทิร์น
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    เทิร์น Casino :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      type="number"
                      v-model.number="turn.CASINO"
                      required
                    />
                    <div
                      class="validate"
                      v-show="!$v.turn.CASINO.required & $v.turn.CASINO.$dirty"
                    >
                      กรุณาใส่จำนวนเทิร์น
                    </div>
                    <div class="validate" v-show="!$v.turn.CASINO.minValue">
                      จำนวนเทิร์นเริ่มต้น 1 เทิร์น
                    </div>
                  </div>
                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    เทิร์น Lotto :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      type="number"
                      v-model.number="turn.LOTTO"
                      required
                    />
                    <div
                      class="validate"
                      v-show="!$v.turn.LOTTO.required & $v.turn.LOTTO.$dirty"
                    >
                      กรุณาใส่จำนวนเทิร์น
                    </div>
                    <div class="validate" v-show="!$v.turn.LOTTO.minValue">
                      จำนวนเทิร์นเริ่มต้น 1 เทิร์น
                    </div>
                  </div>

                  <div class="col-12 col-sm-6 col-md-3 p-md-4 p-3">
                    สามารถรับได้ :<br />
                    <v-select
                      v-model="turn.rate"
                      class="style-select"
                      :items="selectRate"
                      dense
                      hide-details="auto"
                      outlined
                    ></v-select>
                    <div
                      class="validate"
                      v-show="!$v.turn.rate.required & $v.turn.rate.$dirty"
                    >
                      กรุณาเลือกเรท
                    </div>
                  </div>
                </div>
                <v-btn
                  :disabled="canwrite"
                  color="primary"
                  type="submit"
                  class="py-3 mt-3 btn_sty"
                >
                  บันทึก
                </v-btn>
              </form>
            </div>
          </v-card>
        </div>
      </div>
    </div>
    <div>
      <h2 class="mb-2">สรุปรายการซื้อสปินกงล้อของสมาฃิก</h2>
      <search-filter
      :searchinput="false"
      :filter="dateFilter"
      @search="searchSummary"
      @yesterday="searchSummary"
      @today="searchSummary"
    ></search-filter>
      <v-row class="mt-3 justify-center">
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="เดิมพันทั้งหมด"
            titleclass="primary--text"
            :value="dataSummary.bet"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="จ่าย"
            titleclass="red--text"
            :value="dataSummary.payout"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
          ></card-report>
        </v-col>
     
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            titleclass="purple--text"
            title="จำนวนสมาชิกทั้งหมด"
        
            :value="dataSummary.count"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin-stack.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="ค่าบริการ"
            titleclass="purple--text"
            :value="dataSummary.commission"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="กำไรขาดทุน (เดิมพัน - จ่าย - ค่าบริการ)"
            :titleclass="
            dataSummary.winlose - dataSummary.commission > 0
                ? 'success--text'
                : 'error--text'
            "
            :value=" dataSummary.winlose - dataSummary.commission"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/monitoring.png"
          ></card-report>
        </v-col> </v-row
      >
      <h2 class="mb-2 mt-2">ค้นหารายการเดิมพัน</h2>
      <v-row class="d-flex align-baseline ma-auto">
        <v-col cols="12" sm="3" class="d-flex align-baseline">
          <v-text-field
            name="name"
            v-model="username"
            dense
            outlined
            clearable
            label="กรอก username เพื่อค้นหา"
            placeholder="เช่น xx1234567"
            hide-details="auto"
          ></v-text-field> </v-col
        ><v-col cols="12" sm="9" class="d-flex align-baseline">
          <!-- <date-filter :filter="dateFilter"></date-filter> -->
          <date-filter-transaction :filter="dateFilter"></date-filter-transaction>
        </v-col>
        <v-col cols="12" sm="3" class="d-flex align-baseline">
          <div class="pa-3">
            <v-btn color="primary" @click="searchdata()">
              <v-icon left dark> mdi-magnify </v-icon>
              ค้นหา</v-btn
            >
          </div>
        </v-col>
      </v-row>
      <v-card v-if="username"> 
        <span>username : {{ userSummary.provider_usrname  }}</span>
        <span> , เดิมพัน :{{ userSummary.bet  }}</span>

        <span> , จ่าย :{{ userSummary.payout  }}</span>

        <span> , เว็บแพ้ชนะ :{{ userSummary.winlose  }}</span>

        <span> , จำนวนครั้งในการเดิมพัน :{{ userSummary.count  }}</span>

    
    
      </v-card>
    
      <v-card class="elevation-4 mt-5 rounded-lg">
       
      
        <detail-transection-wheel
  
        :dbresult="itemDetail"
        @options="handleEmite"
      ></detail-transection-wheel>
      </v-card>
    </div>
    <!-- <div v-else>
      <label
        >สถานะ FEATURE นี้ยังไม่เปิดใช้งาน .. ติดต่อ smart-bet
        เพื่อทำการเปิดใช้งาน Feature นี้</label
      >
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { validationMixin } from "vuelidate";

import DateFilter from "../../components/DateFilter.vue";
import { saveExcel } from "@progress/kendo-vue-excel-export";
import dayjs from "dayjs";

import DetailTransectionWheel from "../../components/DetailTransectionWheel.vue";

import LoadingPage from "../../components/LoadingPage.vue";
import DateFilterTransaction from "../../components/DateFilterTransaction.vue";
import {
  required,
  minLength,
  maxLength,
  numeric,
  minValue,
} from "vuelidate/lib/validators";
export default {
  components: {
    DateFilter,
    LoadingPage,
    DateFilterTransaction,
    DetailTransectionWheel
  },
  mixins: [validationMixin],
  validations: {
    turn: {
      CASINO: {
        required,
        numeric,
        minValue: minValue(1),
      },
      ESPORT: {
        required,
        numeric,
        minValue: minValue(1),
      },
      FOOTBALL: {
        required,
        numeric,
        minValue: minValue(1),
      },
      HORSERACING: {
        required,
        numeric,
        minValue: minValue(1),
      },
      LOTTO: {
        required,
        numeric,
        minValue: minValue(1),
      },
      SLOT: {
        required,
        numeric,
        minValue: minValue(1),
      },
      wdlimit: {
        required,
        numeric,
        minValue: minValue(0),
      },
      rate: {
        required,
      },
    },
  },
  watch: {},
  data() {
    return {
      userSummary:{bet:0,commission:0,payout:0,winlose:0,provider_usrname:'',count:0},
      dataSummary:{bet:0,commission:0,payout:0,winlose:0,provider_usrname:''},
      username:'',
      options: {},
      itemDetail: [],
      dateFilter: {
        startDate: new Date(),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
        dateLimit: 3,
      },
      status: true,
      wheelHeader: [
        {
          text: "ช่องที่",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "ชื่อรางวัล",
          value: "title",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "ยอดเงินรางวัล",
          value: "credit",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "โอกาสถูก(%)",
          value: "award_percent",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "อนุญาตออกรางวัล",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "ตั้งค่ากงล้อ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
      ],
      no: 0,
      setting_roulette: false,

      roullet: [],
      settingitem: {},
      dataSetting: {
        title: "",
        credit: "",
        award_percent: "",
        status: "",
      },
      selectRate: [
        { value: 0, text: "รายชั่วโมง" },
        { value: 1, text: "รายวัน" },
      ],

      turn: {
        CASINO: 60,
        ESPORT: 60,
        FOOTBALL: 60,
        HORSERACING: 60,
        LOTTO: 60,
        SLOT: 5,
        wdlimit: 10,
        rate: 0,
      },
      settingitem: [],
      isLoading: false,
      feature_status: false,
    };
  },
  computed: {
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("settingFeature_write")) return true;
        else return false;
      }
    },
  },
  async fetch() {
    this.isLoading = true;
    await this.getWheelSummaryFetch()
    try {
      this.turn = await this.getWheel();
      this.status = this.turn.isActive;
      this.feature_status = this.turn.feature_status;
      await this.$axios
        .$get(
          `${process.env.LUCKYDRAW}/api/v1/setting_list/${this.turn.service_id}`,
          {
            auth: {
              username: `${process.env.BASIC_AUTH_USERNAME}`,
              password: `${process.env.BASIC_AUTH_PASSWORD}`,
            },
          }
        )
        .then((response) => {
          this.roullet = response;
        })
        .catch((err) => {
          this.$nuxt.$emit("alert", err.response.data.ResponseStatus);
          this.roullet = [];
        });
    } catch (error) {
      this.status = false;
      console.log(error);
      this.feature_status = false;
    }
    this.isLoading = false;
  },

  methods: {
    ...mapActions("member", ["getWheelSummary","updateWheel", "getWheel","getWheelTransaction"]),
   async getWheelSummaryFetch(){
   const params = this.getParameter();

  const response =   await this.getWheelSummary(params)
    this.dataSummary = response.data;
   },
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
        username: this.username,
        provider: undefined ? undefined : this.$route.query.group,
        roundid: undefined,
        starttime: dayjs(dateFill.start).toISOString(),
        endtime: dayjs(dateFill.end).toISOString(),
        page: this.options.page,
        limit: this.options.itemsPerPage,
      };
      return parameter;
    },
    async searchSummary() {
      this.isLoading = true;
      console.log('ssss')
        try {
          let params;
          params = this.getParameter();
          let response;
          console.log("sadsasd option", this.options);
          console.log("sadsasd params", params);
      
            console.log("get group");
            response = await this.getWheelSummary(params);
  console.log('ssss',response.data)
            this.dataSummary = response.data;
          

   
        } catch (error) {
          console.log(error);
        }
      
      this.isLoading = false;
    },
    async searchdata() {
      this.isLoading = true;
      if (this.username) {
        try {
          let params;
          params = this.getParameter();
          let response;
          console.log("sadsasd option", this.options);
          console.log("sadsasd params", params);
      
            console.log("get group");
            response = await this.getWheelTransaction(params);
  this.userSummary = response.data.summary
            this.itemDetail = response.data;
          

   
        } catch (error) {
          console.log(error);
        }
      }
      this.isLoading = false;
    },
    handleEmite(value) {
      this.options = value;
    },
    openSetting(item, index) {
      this.$bvModal.show("setting-roulette") == true;
      this.settingitem = item;
      this.no = index + 1;
    },
    renderSwitch(value) {
      if (value) return "เปิด";
      return "ปิด";
    },
    setting(item) {
      this.settingitem = Object.assign({}, item);
      this.setting_roulette = true;
    },
    async settingOk() {
      await this.$axios
        .$put(
          `${process.env.LUCKYDRAW}/api/v1/setting/${this.settingitem.id}`,
          {
            title: this.settingitem.title,
            description: this.settingitem.description,
            award_percent: this.settingitem.award_percent,
            credit: this.settingitem.credit,
            type: this.settingitem.type,
            status: this.settingitem.status,
            default_reward: 0,
            point: this.settingitem.point,
            prize_id: this.settingitem.prize_id,
            agent_id: this.roullet[0].agent_id,
            image: "",
          },
          {
            auth: {
              username: "taechaput",
              password: "tong211040",
            },
          }
        )
        .then(() => {
          this.$swal("", "ตั้งค่าเสร็จสิ้น", "success");
          this.setting_roulette = false;
          this.$fetch();
        })
        .catch((err) => {
          this.$swal("ตั้งค่าล้มเหลว", "กรุณาตั้งค่าใหม่", "error");
          console.log(err);
        });
    },
    Toggle(Bool) {
      if (Bool == 1) {
        this.settingitem.status = 0;
      } else {
        this.settingitem.status = 1;
      }
    },
    cancel() {
      this.setting_roulette = false;
      // this.$fetch();
    },
    submitform() {
      if (this.$v.turn.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$v.turn.$touch();
        this.submitTurn();
      }
    },
    async submitTurn() {
      console.log(this.turn);
      this.loading = true;
      this.turn.service_id = this.roullet[0].agent_id;
      try {
        await this.updateWheel(this.turn);
        this.showSuccessAlert("บันทึกสำเร็จ");
        this.loading = false;
      } catch (error) {
        this.showErrorAlert("error");
        this.loading = false;
      }
    },
    async switchstatus(status) {
      this.turn.isActive = status;
      try {
        await this.updateWheel(this.turn);
        this.showSuccessAlert("บันทึกสำเร็จ");
        this.loading = false;
      } catch (error) {
        this.showErrorAlert("error");
        this.loading = false;
      }
    },
    async switchstatusBuyFeature() {
      this.turn.buy_feature = !this.turn.buy_feature;
      try {
        console.log(this.turn);
        await this.updateWheel(this.turn);
        this.showSuccessAlert("บันทึกสำเร็จ");
        this.loading = false;
      } catch (error) {
        this.showErrorAlert("error");
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
<style lang="scss">
.bgpage {
  background-size: cover;
}

#setting-roulette___BV_modal_footer_.modal-footer {
  border-top: none;
}
// #setting-roulette___BV_modal_content_.modal-content {
//   background: linear-gradient(
//     to bottom right,
//     #76cfe8 0%,
//     #ffffff 100%
//   ) !important;
// }
.active {
  background: linear-gradient(
    to bottom right,
    rgba(126, 186, 133, 0.81) 0%,
    #28a745 100%
  ) !important;
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  box-shadow: 1px 3px 4px 0px rgb(120 116 116 / 75%);
  padding: 0.375rem 0.75rem;
}
.unactive {
  background: linear-gradient(
    to bottom right,
    rgb(190 146 146 / 81%) 0%,
    hsl(2deg 75% 53%) 100%
  ) !important;
  color: white;
  border-radius: 10px;
  border: none;
  font-size: 12px;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  box-shadow: 1px 3px 4px 0px rgb(120 116 116 / 75%);
  padding: 0.375rem 0.75rem;
}
.active:hover {
  color: white;
  border-radius: 10px;
  border: none;
}

.unactive:hover {
  color: white;
  border-radius: 10px;
  border: none;
}
.forum-input {
  font-weight: bold;
  input {
    outline: 0;
    border-width: 0 0 1px;
    width: 100%;
    border-color: rgb(134, 134, 134);
    color: rgb(83, 79, 79);
  }
  input:focus {
    border-color: rgb(0, 0, 0);
    width: 100%;
  }
}
</style>
