<template>
  <v-flex>
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
            :value="response.amount"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="ถอน"
            titleclass="red--text"
            :value="response.withdraw"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            title="โบนัส"
            titleclass="purple--text"
            :value="response.totalbonus"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            titleclass="purple--text"
            title="ฝาก+โบนัส"
            :value="response.amount + response.totalbonus"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/iconprofit/coin-stack.png"
          ></card-report>
        </v-col>
        <v-col cols="12" sm="4" lg="2" class="pa-2">
          <card-report
            titleclass="teal--text"
            title="กำไรขาดทุน"
            :condition="true"
            :value="response.amount - response.withdraw"
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
                    <th>
                      รายการโบนัส
                    </th>
                    <th class="text-center">
                      โบนัส
                    </th>
                    <th class="text-center">
                      รายละเอียด
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">เครดิตเงินคืน</div>
                    </td>
                    <td class="text-center">
                      {{ itemPromotion.totalCashback }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">โบนัสจากการเติมมือ</div>
                    </td>
                    <td class="text-center">
                      {{ itemPromotion.bonusManualTopup }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">โบนัสสมาชิกใหม่</div>
                    </td>
                    <td class="text-center">
                      {{ itemPromotion.bonusNewMember }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">โบนัสฝากแรกของวัน</div>
                    </td>
                    <td class="text-center">
                      {{ itemPromotion.bonusFirstDp }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">โบนัสฝากทั้งวัน</div>
                    </td>
                    <td class="text-center">{{ itemPromotion.bonusAllDay }}</td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">โบนัสฝากต่อเนื่อง</div>
                    </td>
                    <td class="text-center">
                      {{ itemPromotion.bonusDp7Days }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">โบนัสกงล้อ</div>
                    </td>
                    <td class="text-center">{{ itemPromotion.bonusWheel }}</td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">โบนัสเครดิตฟรี</div>
                    </td>
                    <td class="text-center">
                      {{ itemPromotion.bonusCreditfree }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">โบนัสเช็คอิน</div>
                    </td>
                    <td class="text-center">
                      {{ itemPromotion.bonusCheckin }}
                    </td>
                    <td class="text-center">
                      <v-btn color="black" dark small @click="opendetail()"
                        ><v-icon left>mdi-mail</v-icon> คลิกเพื่อดู</v-btn
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">
                      <div class="pl-md-2 ">รวมโบนัส</div>
                    </td>
                    <td
                      colspan="1"
                      class="text-center font-weight-bold primary--text"
                    >
                      {{ itemPromotion.bonus }}
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
            <v-data-table
              show-expand
              single-expand
              :headers="headerDetail"
              :items="dataDetail"
              hide-default-footer
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
          sortable: false
        },
        {
          text: "ธนาคารเว็ป",
          value: "companyBank",
          align: "center",
          sortable: false
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          align: "center",
          sortable: false
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          align: "center",
          sortable: false
        },
        {
          text: "USERNAME",
          value: "member_id",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          align: "center",
          sortable: false
        },
        {
          text: "เครดิตก่อนเเติม",
          value: "bfcredit",
          align: "center",
          sortable: false
        },
        {
          text: "เครดิตหลังเเติม",
          value: "afcredit",
          align: "center",
          sortable: false
        },
        {
          text: "เติมโดย",
          value: "topupby",
          align: "center",
          sortable: false
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false
        }
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
          updated_at: "2022-01-27 00:41:15"
        }
      ],
      response: {
        amount: 1050,
        bonus: 812.5,
        bonusAllDay: 187.5,
        bonusCheckin: 178,
        bonusCreditfree: 0,
        bonusDp7Days: 0,
        bonusFirstDp: 0,
        totalbonuspromotion: 1177,
        bonusManualTopup: 150,
        bonusNewMember: 255,
        bonusWheel: 0,
        totalCashback: 42,
        totalbonus: 812.5,
        withdraw: 239
      },
      dateFilter: {
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      },
      header: [
        {
          text: "รายการโบนัส",
          value: "namebonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-6"
        },
        {
          text: "โบนัส",
          value: "bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-2"
        },
        {
          text: "รายละเอียด",
          value: "detail",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-4"
        }
      ],
      itemPromotion: {
        amount: 1875,
        bonus: 40,
        bonusAllDay: 0,
        bonusCheckin: 10,
        bonusCreditfree: 0,
        bonusDp7Days: 0,
        bonusFirstDp: 0,
        bonusManualTopup: 0,
        bonusNewMember: 0,
        bonusWheel: 0,
        totalCashback: 30,
        totalbonus: 40,
        withdraw: 1100
      }
    };
  },
  methods: {
    getamount() {},
    async opendetail() {
      this.detailDialog = true;
      // let { response } = await api id
      // this.dataDetail == response.data;
    },
    searchdata() {
      console.log(this.dateFilter);
    }
  }
};
</script>

<style></style>
