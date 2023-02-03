<template>
  <v-flex>
    <div v-if="isLoading">
      <loading-page></loading-page>
    </div>
    <v-container
      ><h2 class="mb-2">สรุปโปรโมชั่น</h2>
      <search-filter
        :searchinput="false"
        :filter="dateFilter"
        @search="searchdata"
      ></search-filter>

      <v-row class="mt-3 justify-center">
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="ฝาก"
            titleclass="primary--text"
            :value="deposit.toFixed(2) + ' บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="ถอน"
            titleclass="red--text"
            :value="withdraw.toFixed(2) + ' บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="โบนัส"
            titleclass="purple--text"
            :value="sum_ALL_BONUS.toFixed(2) + ' บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            titleclass="purple--text"
            title="ฝาก+โบนัส"
            :condition="false"
            :value="(deposit + sum_ALL_BONUS).toFixed(2) + ' บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin-stack.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="กำไรขาดทุน"
            :titleclass="
              (profit_loss + sum_ALL_BONUS).toFixed(2) > 0
                ? 'success--text'
                : 'error--text'
            "
            :value="(profit_loss + sum_ALL_BONUS).toFixed(2) + ' บาท'"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/monitoring.png"
          ></card-report>
        </v-col> </v-row
      ><v-card class="elevation-4 mt-5 rounded-lg mx-auto size-card">
        <v-card class="elevation-3">
          <template>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>รายการโบนัส</th>
                    <th class="text-center">โบนัส</th>
                    <th class="text-center">รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- เครดิตเงินคืน -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">เครดิตเงินคืน</div>
                    </td>
                    <td class="text-center">
                      {{ sum_cashback }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- โบนัสจากการเติมมือ -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสจากการเติมมือ</div>
                    </td>
                    <td class="text-center">
                      {{ sum_bonus_deposit }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- โบนัสสมาชิกใหม่ -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสสมาชิกใหม่</div>
                    </td>
                    <td class="text-center">
                      {{ sum_new_member_bonus }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- โบนัสฝากแรกของวัน -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสฝากแรกของวัน</div>
                    </td>
                    <td class="text-center">
                      {{ sum_first_deposit_bonus }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- โบนัสฝากทั้งวัน -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสฝากทั้งวัน</div>
                    </td>
                    <td class="text-center">{{ sum_allday_bonus }}</td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- โบนัสฝากต่อเนื่อง -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสฝากต่อเนื่อง</div>
                    </td>
                    <td class="text-center">
                      {{ sum_continue_bonus }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- โบนัสกงล้อ -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสกงล้อ</div>
                    </td>
                    <td class="text-center">{{ sum_wheel_deposit }}</td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- โบนัสกงล้อ -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสเครดิตฟรี</div>
                    </td>
                    <td class="text-center">
                      {{ sum_credit_free }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- โบนัสเช็คอิน -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสเช็คอิน</div>
                    </td>
                    <td class="text-center">
                      {{ sum_checkin }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">โบนัสแนะนำเพื่อน</div>
                    </td>
                    <td class="text-center">
                      {{ sum_affiliate_deposit }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <!-- รวมโบนัส -->
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2">รวมโบนัส</div>
                    </td>
                    <td
                      colspan="1"
                      class="text-center font-weight-bold primary--text"
                    >
                      {{ sum_ALL_BONUS }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        </v-card>
      </v-card>
      <v-dialog v-model="detailDialog" max-width="1500px">
        <v-card class="pa-5">
          <v-card-text>
            <h3>รายการรับโบนัส</h3>
          </v-card-text>

          <v-card class="elevetion-3">
            <div class="table-data">
              <v-data-table
                show-expand
                single-expand
                :headers="headerDetail"
                :items="dataDetail"
                hide-default-footer
              >
                <template #[`item.no`]="{ index }">
                  <span class="font-weight-bold">
                    {{ index + 1 }}
                  </span>
                </template>
                <template #[`item.companyBank`]="{ item }">
                  <img-bank :value="item.companyBank"></img-bank>
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
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <div class="text-center font-weight-bold purple--text">
                      {{ item.remark }}
                    </div>
                  </td>
                </template>
              </v-data-table>
            </div>
          </v-card>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1 mt-2"
              dark
              small
              @click="detailDialog = false"
            >
              ปิด
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
import CardReport from "../../components/CardReport.vue";
import ImgBank from "../../components/ImgBank.vue";
export default {
  components: { CardReport, ImgBank },
  data() {
    return {
      detailDialog: false,

      headerDetail: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
        },
        {
          text: "ธนาคารเว็ป",
          value: "companyBank",
          align: "center",
          sortable: false,
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          align: "center",
          sortable: false,
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: "USERNAME",
          value: "member_id",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold primary--text",
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          align: "center",
          sortable: false,
        },
        {
          text: "เครดิตก่อนเเติม",
          value: "bfcredit",
          align: "center",
          sortable: false,
        },
        {
          text: "เครดิตหลังเเติม",
          value: "afcredit",
          align: "center",
          sortable: false,
        },
        {
          text: "เติมโดย",
          value: "topupby",
          align: "center",
          sortable: false,
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
        },
      ],
      dataDetail: [
        {
          afcredit: 15,
          amount: 0,
          bfcredit: "0",
          bonusamount: "15",
          companyBank: "cashback",
          created_at: "2022-01-27 00:41:15",
          dpref: "b8a4c3ad-c7d3-47bd-a5b3-ed61340f4986",
          id: 1399,
          member_id: "BE0668535",
          remark: "เติม 0 บาท โบนัส 15บาท  สำเร็จ โดยRICO หมายเหตุ : CASHBACK ",
          smsdatetime: "-",
          sum: null,
          topupby: "RICO",
          updated_at: "2022-01-27 00:41:15",
        },
      ],

      dateFilter: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      header: [
        {
          text: "รายการโบนัส",
          value: "namebonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-6",
        },
        {
          text: "โบนัส",
          value: "bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-2",
        },
        {
          text: "รายละเอียด",
          value: "detail",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-4",
        },
      ],
      itemPromotion: {},
      sum_cashback: 0,
      sum_bonus_deposit: 0,
      sum_new_member_bonus: 0,
      sum_first_deposit_bonus: 0,
      sum_allday_bonus: 0,
      sum_continue_bonus: 0,
      sum_wheel_deposit: 0,
      sum_credit_free: 0,
      sum_checkin: 0,
      sum_affiliate_deposit: 0,
      sum_ALL_BONUS: 0,
      deposit: 0,
      withdraw: 0,
      profit_loss: 0,
      isLoading: false,
    };
  },
  async fetch() {
    try {
      this.isLoading = true;
      await this.getDataAPIProfirReport();
      await this.getDataAPIPromotionReport();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  },

  methods: {
    ...mapActions("profit", ["getPromotionReport", "getProfitByUserReport2"]),

    getamount() {},
    async opendetail() {
      this.detailDialog = true;
      // let { response } = await api id
      // this.dataDetail == response.data;
    },
    resetBonusData() {
      this.sum_cashback = 0;
      this.sum_bonus_deposit = 0;
      this.sum_new_member_bonus = 0;
      this.sum_first_deposit_bonus = 0;
      this.sum_allday_bonus = 0;
      this.sum_continue_bonus = 0;
      this.sum_wheel_deposit = 0;
      this.sum_credit_free = 0;
      this.sum_checkin = 0;
      this.sum_affiliate_deposit = 0;
      this.sum_ALL_BONUS = 0;
    },
    getDateTimeStr(date, time) {
      let _date = date;
      let _time = time;

      let _str =
        [
          _date.getFullYear(),
          _date.getMonth() < 10
            ? "0" + (_date.getMonth() + 1)
            : _date.getMonth() + 1,
          _date.getDate() < 10 ? "0" + _date.getDate() : _date.getDate(),
        ].join("-") +
        " " +
        [
          _time.getHours() < 10 ? "0" + _time.getHours() : _time.getHours(),
          _time.getMinutes() < 10
            ? "0" + _time.getMinutes()
            : _time.getMinutes(),
          _time.getSeconds() < 10
            ? "0" + _time.getSeconds()
            : _time.getSeconds(),
        ].join(":") +
        "Z";

      return _str;
    },
    axiosParams() {
      // start Date()
      let s_d = this.dateFilter.startDate;
      let s_t = this.dateFilter.startTime;
      // end Date()
      let e_d = this.dateFilter.endDate;
      let e_t = this.dateFilter.endTime;

      let start_str = this.getDateTimeStr(s_d, s_t);
      let end_str = this.getDateTimeStr(e_d, e_t);

      // console.log(start_str);
      // console.log(end_str);

      let params = {
        start: start_str,
        end: end_str,
        company: localStorage.getItem("company"),
        agent: localStorage.getItem("agent"),
        page: 1,
        username: null,
        limit: 10000,
        column_order: "no_bonus_count",
        order: "DESC",
      };
      // console.log('-----------------');
      // console.log('this is param');
      // console.log(params)
      return params;
    },
    axiosParams2() {
      // start Date()
      let s_d = this.dateFilter.startDate;
      let s_t = this.dateFilter.startTime;
      // end Date()
      let e_d = this.dateFilter.endDate;
      let e_t = this.dateFilter.endTime;

      let start_str = this.getDateTimeStr(s_d, s_t);
      let end_str = this.getDateTimeStr(e_d, e_t);

      let params = {
        start: start_str,
        end: end_str,
        company: localStorage.getItem("company"),
        agent: localStorage.getItem("agent"),
        page: 1,
        username: null,
        limit: 10000,
        column_order: "date",
        order: "ASC",
      };
      // console.log('-----------------');
      // console.log('this is param');
      // console.log(params)
      return params;
    },
    async searchdata() {
      try {
        this.isLoading = true;
        await this.getDataAPIPromotionReport();
        await this.getDataAPIProfirReport();
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async getDataAPIPromotionReport() {
      try {
        let paramIn = this.axiosParams();
        console.log(paramIn);
        this.resetBonusData();
        // api 1
        let response = await this.getPromotionReport(paramIn);
        console.log(response);
        for (let i = 0; i < response.total; i++) {
          this.sum_cashback += response.data[i].cashback;
          this.sum_bonus_deposit += response.data[i].bonus_deposit;
          this.sum_new_member_bonus += response.data[i].new_member_bonus;
          this.sum_first_deposit_bonus += response.data[i].first_deposit_bonus;
          this.sum_allday_bonus += response.data[i].allday_bonus;
          this.sum_continue_bonus += response.data[i].continue_bonus;
          this.sum_wheel_deposit += response.data[i].wheel_deposit;
          this.sum_credit_free += response.data[i].credit_free;
          this.sum_affiliate_deposit += response.data[i].affiliate_deposit;
          this.sum_checkin += response.data[i].checkin;
        }
        this.sum_ALL_BONUS +=
          this.sum_cashback +
          this.sum_bonus_deposit +
          this.sum_new_member_bonus +
          this.sum_first_deposit_bonus +
          this.sum_allday_bonus +
          this.sum_continue_bonus +
          this.sum_wheel_deposit +
          this.sum_credit_free +
          this.sum_checkin;
        this.itemPromotion = response.data;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    async getDataAPIProfirReport() {
      // api 2
      try {
        let paramIn2 = this.axiosParams2();
        console.log(paramIn2);
        this.deposit = 0;
        this.withdraw = 0;
        this.profit_loss = 0;
        let responseAPI2 = await this.getProfitByUserReport2(paramIn2);
        console.log(responseAPI2);
        for (let i = 0; i < responseAPI2.total; i++) {
          this.withdraw += responseAPI2.data[i].withdraw;
          this.deposit += responseAPI2.data[i].deposit;
          this.profit_loss += responseAPI2.data[i].winlose;
          // console.log(response.data.length) ; or // console.log(response.total);
          // console.log(this.total_user,i);
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
thead {
  background: black !important;
}
</style>
