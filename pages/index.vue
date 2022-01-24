<template>
  <v-flex>
    <!-- sectioncard -->
    <v-row>
      <v-col lg="3" sm="6" md="6" cols="12" class="pa-3">
        <card-view
          title="รวมยอดฝากทั้งวัน"
          :value="datarander.depositbalance"
          iconSrc="https://image.smart-ai-api.com/public/thongtest/save-money.gif"
        ></card-view>
      </v-col>
      <v-col lg="3" sm="6" cols="12" class="pa-3">
        <card-view
          title="รวมยอดถอนทั้งวัน"
          :value="datarander.withdrawbalance"
          iconSrc="https://image.smart-ai-api.com/public/thongtest/24-hours.gif"
        ></card-view>
      </v-col>
      <v-col lg="3" sm="6" cols="12" class="pa-3">
        <card-view
          title="กำไร/ขาดทุน(วันนี้)"
          :value="datarander.profitlossDate"
          iconSrc="https://image.smart-ai-api.com/public/thongtest/laptop.gif"
        ></card-view>
      </v-col>
      <v-col lg="3" sm="6" cols="12" class="pa-3">
        <card-view
          title="กำไร/ขาดทุน(ทั้งเดือน)"
          :value="datarander.profitlossmounth"
          iconSrc="https://image.smart-ai-api.com/public/thongtest/presentation.gif"
        ></card-view>
      </v-col>
      <!-- sectioncard -->
    </v-row>
    <!-- sectiontable -->
    <v-row>
      <v-col cols="12" lg="6"
        ><v-card width="100%" class="elevation-5 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold">
            บัญชีฝากทั้งหมด
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle primary-title class="font-weight-bold text-center">
            <h3>เปิด-ปิด การฝากออโต้</h3>
          </v-card-subtitle>
          <div class="d-flex">
            <div
              v-for="(item, i) in actionBank"
              :key="i"
              class="col text-center tougle-system"
            >
              <img-bank :value="item.name"></img-bank>
              <v-switch
                class="mx-auto text-center"
                v-model="item.status"
                true-value="on"
                false-value="off"
                :label="`${item.status.toString()}`"
              >
              </v-switch>
            </div>
          </div>

          <v-card>
            <v-data-table
              :headers="bankDepositColumn"
              :items="itemBank"
              hide-default-footer
            >
              <template #[`item.Companybank`]="{item}">
                <div class="pa-2">
                  <img-bank :value="item.Companybank"></img-bank>
                </div>
              </template>
              <template #[`item.Companybankname`]="{item}">
                <span class="font-weight-bold">
                  {{ item.Companybankname }}<br />
                  {{ item.Companybankacountnumber }}</span
                >
              </template>
              <template #[`item.actions`]>
                <v-btn small rounded color="primary">เช็คยอด</v-btn>
              </template>
            </v-data-table>
          </v-card></v-card
        ></v-col
      >
      <v-col cols="12" lg="6"
        ><v-card width="100%" height="100%" class="elevation-3 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold">
            บัญชีถอนทั้งหมด
          </v-card-title>

          <v-card>
            <v-data-table
              :headers="bankWithdrawColumn"
              :items="itemBank"
              hide-default-footer
            >
              <template #[`item.Companybank`]="{item}">
                <div class="pa-2">
                  <img-bank :value="item.Companybank"></img-bank>
                </div>
              </template>
              <template #[`item.Companybankname`]="{item}">
                <span class="font-weight-bold">
                  {{ item.Companybankname }}<br />
                  {{ item.Companybankacountnumber }}</span
                >
              </template>
              <template #[`item.actions`]>
                <v-btn small rounded color="primary">เช็คยอด</v-btn>
              </template>
            </v-data-table>
          </v-card></v-card
        ></v-col
      >
    </v-row>
    <!-- sectiontable -->
    <!-- secttiondeposit -->
    <v-row>
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2 mb-5">
          <v-card-title primary-title class="font-weight-bold">
            รายการฝากเงินคงค้าง (ออโต้ไม่ผ่าน)
          </v-card-title>

          <v-card>
            <v-data-table :headers="logFailedColumn" hide-default-footer>
              <template #[`item.actions`]>
                <v-btn small rounded color="primary">ตรวจสอบ</v-btn>
              </template>
            </v-data-table>
          </v-card></v-card
        >
      </v-col>
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold">
            รายการฝากเงินล่าสุด 20 รายการ
          </v-card-title>

          <v-card>
            <v-data-table
              :headers="depositColumn"
              :items="dplist"
              hide-default-footer
            >
              <template #[`item.no`]="{item}">
                <div class="text-center my-3 my-md-2  showdetail">
                  <img-bank :value="item.companyBank"></img-bank>
                  <v-chip
                    class="font-weight-bold pa-2 my-1 elevation-2"
                    color="primary"
                    small
                    ><v-avatar left>
                      <v-icon>mdi-account-circle</v-icon></v-avatar
                    >{{ item.member_id }}</v-chip
                  >
                  <br />
                  <div class="text-start font-weight-bold">
                    ฝาก :
                    <v-chip
                      outlined
                      small
                      class="my-1 elevation-2"
                      color="success"
                      label
                    >
                      {{ item.amount }} บาท </v-chip
                    ><br />
                    โบนัส :
                    <v-chip
                      outlined
                      small
                      class="my-1 elevation-2"
                      color="success"
                      label
                    >
                      {{ item.bonusamount }} บาท</v-chip
                    ><br />
                    โดย :
                    <v-chip
                      v-if="item.topupby === 'AUTO'"
                      x-small
                      class="my-1 white--text elevation-2"
                      color="success"
                      label
                    >
                      {{ item.topupby }}</v-chip
                    >
                    <v-chip
                      v-else
                      x-small
                      class="my-1 white--text elevation-2"
                      color="pink"
                      label
                    >
                      {{ item.topupby }}</v-chip
                    >
                  </div>
                </div>
              </template>
              <template #[`item.timeTransection`]="{item}">
                <div class="text-center my-3 my-md-2  showdetail">
                  <v-chip
                    class="font-weight-bold pa-2 elevation-2"
                    color="grey darken-4"
                    label
                    x-small
                    dark
                    ><v-icon class="mr-1">mdi-timer</v-icon>เติม</v-chip
                  ><br />
                  {{ item.created_at }}<br />
                  <v-chip
                    class="font-weight-bold pa-2 elevation-2 mt-2 "
                    color="grey darken-4"
                    dark
                    label
                    x-small
                  >
                    <v-icon class="mr-1">mdi-message-processing</v-icon
                    >SMS</v-chip
                  ><br />
                  {{ item.smsdatetime }}<br />
                </div>
              </template>
              <template #[`item.credit`]="{item}">
                <div class="text-center my-3 my-md-2  showdetail">
                  <div class="my-2">
                    <span class="font-weight-bold"> หลังเติม</span>
                    <br />
                    <v-icon color="success">mdi-menu-up</v-icon>
                    {{ item.afcredit }}<br />
                  </div>

                  <div class="my-2">
                    <span class="font-weight-bold"> ก่อนเติม</span><br />
                    {{ item.bfcredit }}<br />
                  </div>
                </div>
              </template>
              <template #[`item.actions`]>
                <v-btn small color="primary">ตรวจสอบ</v-btn>
              </template>
            </v-data-table>
          </v-card></v-card
        ></v-col
      >
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold">
            รายการถอนเงินล่าสุด 20 รายการ
          </v-card-title>

          <v-card>
            <v-data-table
              :headers="withdrawColumn"
              :items="wdlist"
              hide-default-footer
            >
              <template #[`item.no`]="{item}">
                <div class="text-center my-3 my-md-2  showdetail">
                  <div class="font-weight-bold">
                    โอนไป<br />
                    <img-bank :value="item.bankName"></img-bank>
                  </div>

                  <v-chip
                    class="font-weight-bold pa-2 my-1 elevation-2"
                    color="primary"
                    small
                    ><v-avatar left>
                      <v-icon>mdi-account-circle</v-icon></v-avatar
                    >{{ item.name }}</v-chip
                  >
                  <div class="font-weight-bold my-1">
                    <v-icon small color="grey" class="mx-1">mdi-phone</v-icon
                    >{{ item.bankAcc }}<br />
                    <v-icon small color="grey">mdi-account</v-icon>
                    {{ item.username }}
                  </div>
                  <div class="my-1 font-weight-bold">
                    โดย:
                    <v-chip
                      x-small
                      class="my-1 white--text elevation-2"
                      color="pink"
                      label
                    >
                      {{ item.operator }}</v-chip
                    >
                  </div>
                </div>
              </template>
              <template #[`item.timeTransection`]="{item}">
                <div class="text-center my-3 my-md-2  showdetail">
                  <v-chip
                    class="font-weight-bold pa-2 elevation-2 mt-2  mb-1"
                    color="grey darken-4"
                    label
                    x-small
                    dark
                    ><v-icon class="mr-1">mdi-timer</v-icon>ถอน</v-chip
                  ><br />
                  {{ item.requsettime }}<br />
                  <v-chip
                    class="font-weight-bold pa-2 elevation-2 mt-2  mb-1"
                    color="grey darken-4"
                    label
                    x-small
                    dark
                    ><v-icon class="mr-1">mdi-transfer</v-icon>โอน</v-chip
                  ><br />
                  {{ item.transferTime }}<br />
                  <v-chip
                    class="font-weight-bold pa-2 elevation-2 mt-2  mb-1"
                    color="grey darken-4"
                    label
                    x-small
                    dark
                    ><v-icon class="mr-1">mdi-credit-card</v-icon
                    >เครดิตก่อน</v-chip
                  ><br />
                  {{ item.bfcredit }}<br />
                  <v-chip
                    class="font-weight-bold pa-2 elevation-2 mt-2  mb-1"
                    color="grey darken-4"
                    label
                    x-small
                    dark
                  >
                    <v-icon class="mr-1">mdi-credit-card</v-icon
                    >เครดิตหลัง</v-chip
                  ><br />
                  {{ item.afcredit }}
                </div>
              </template>
              <template #[`item.credit`]="{item}">
                <div class="text-center my-3 my-md-2 showdetail  ">
                  <span class="font-weight-bold">ยอดถอน</span> <br />
                  <v-chip
                    class="ma-2 font-weight-bold"
                    color="error"
                    label
                    outlined
                    >{{ item.amount }} บาท</v-chip
                  ><br />
                  <div class="card_status my-2">
                    <span class="font-weight-bold">status</span><br />
                    <v-chip
                      v-if="item.status == 'Success'"
                      x-small
                      label
                      color="success"
                    >
                      {{ item.status }}</v-chip
                    >
                    <v-chip v-else color="error" label x-small>
                      {{ item.status }}</v-chip
                    >
                    <br />
                  </div>
                  <span class="font-weight-bold">หลังเติม</span><br />
                  <span v-if="!item.afAmount" class="font-weight-bold">
                    -
                  </span>
                  <span v-else> - </span>
                  <br />
                  <span class="font-weight-bold">ก่อนเติม</span><br />
                  <v-icon color="error"
                    >mdi-menu-down{{ item.afAmount }}</v-icon
                  >
                </div>
              </template>
              <template #[`item.actions`]>
                <div class="ma-2 text-center">
                  <v-btn color="success" class="my-1" rounded small
                    >อนุมัติ</v-btn
                  >
                  <v-btn color="error" class="my-1" rounded small
                    >ไม่อนุมัติ</v-btn
                  >
                  <v-btn color="primary" class="my-1" rounded small
                    >Reset</v-btn
                  >
                  <v-btn color="grey" class="my-1" rounded small>ถอนมือ</v-btn>
                  <v-btn color="primary" outlined rounded class="my-1" small
                    >หมายเหตุ</v-btn
                  >
                </div>
              </template>
            </v-data-table>
          </v-card></v-card
        ></v-col
      >
    </v-row>
    <!-- secttiondeposit -->
  </v-flex>
</template>
<script>
import ImgBank from "../components/ImgBank.vue";
export default {
  components: { ImgBank },
  data() {
    return {
      isLoading: false,
      datarander: {
        depositbalance: 60,
        withdrawbalance: 600,
        profitlossDate: 4000,
        profitlossmounth: -600
      },
      bankDepositColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true
        },
        {
          text: "ชื่อ",
          value: "Companybankname",
          align: "center",
          sortable: true
        },
        {
          text: "อัพเดทยอดคงเหลือ",
          value: "balanceupdatetime",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดเงินคงเหลือ",
          value: "balance",
          align: "center",
          sortable: false
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false
        }
      ],
      bankWithdrawColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true
        },
        {
          text: "ชื่อ",
          value: "Companybankname",
          align: "center",
          sortable: true
        },
        {
          text: "อัพเดทยอดคงเหลือ",
          value: "balanceupdatetime",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดเงินคงเหลือ",
          value: "balance",
          align: "center",
          sortable: false
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false
        }
      ],
      logFailedColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true
        },
        {
          text: "เวลาจาก SMS",
          value: "smsdatetime",
          align: "center",
          sortable: true
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false
        }
      ],
      depositColumn: [
        {
          text: "รายการ",
          align: "center",
          value: "no",
          sortable: false
        },
        {
          text: "เวลาเติมเครดิต",
          value: "timeTransection",
          align: "center",
          sortable: false
        },
        {
          text: "เครดิต ก่อน/หลัง",
          value: "credit",
          align: "center",
          sortable: false
        }
      ],
      withdrawColumn: [
        {
          text: "รายการ",
          align: "center",
          value: "no",
          sortable: false,
          class: "col-4"
        },
        {
          text: "เวลา ถอน/โอน",
          value: "timeTransection",
          align: "center",
          sortable: false,
          class: "col-3"
        },
        {
          text: "จำนวน",
          value: "credit",
          align: "center",
          sortable: false,
          class: "col-3"
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
          class: "col-2"
        }
      ],
      actionBank: [
        {
          name: "SCB",
          status: "off"
        },
        {
          name: "KBANK",
          status: "off"
        },
        {
          name: "TRUEWALLET",
          status: "off"
        }
      ],
      itemBank: [
        {
          Companybank: "SCB",
          Companybankacountnumber: "1111111111",
          Companybankname: "test",
          balanceupdatetime: "2022-01-14 17:17:26",
          balance: 0
        },
        {
          Companybank: "KBANK",
          Companybankacountnumber: "1111111111",
          Companybankname: "test",
          balanceupdatetime: "2022-01-14 17:17:26",
          balance: 0
        },
        {
          Companybank: "TRUEWALLET",
          Companybankacountnumber: "1111111111",
          Companybankname: "test",
          balanceupdatetime: "2022-01-14 17:17:26",
          balance: 0
        }
      ],
      dplist: [
        {
          afcredit: 337,
          amount: 225,
          bfcredit: "0",
          bonusamount: "112.5",
          companyBank: "RICO",
          created_at: "2022-01-19 09:58:55",
          dpref: "be5c3470-1af9-46b4-83fa-b017b05d5e85",
          id: 354,
          member_id: "BE8778856",
          remark:
            "เติม225 บาท โบนัส 112.5บาท  สำเร็จ โดยphoe mu kyi ฝากทั้งวัน",
          smsdatetime: "2022-01-19T09:27:00",
          sum: null,
          topupby: "phoe mu kyi",
          updated_at: "2022-01-19 09:58:55"
        },
        {
          afcredit: 337,
          amount: 225,
          bfcredit: "0",
          bonusamount: "112.5",
          companyBank: "checkin",
          created_at: "2022-01-19 09:58:55",
          dpref: "be5c3470-1af9-46b4-83fa-b017b05d5e85",
          id: 355,
          member_id: "BE8778856",
          remark:
            "เติม225 บาท โบนัส 112.5บาท  สำเร็จ โดยphoe mu kyi ฝากทั้งวัน",
          smsdatetime: "2022-01-19T09:27:00",
          sum: null,
          topupby: "AUTO",
          updated_at: "2022-01-19 09:58:55"
        }
      ],
      wdlist: [
        {
          afAmount: null,
          afcredit: 0,
          amount: 49,
          bankAcc: "09970678690",
          bankName: "WAVEPAY",
          bfAmount: null,
          bfcredit: 49,
          created_at: "2022-01-19 01:30:22",
          id: 86,
          name: "htetzaw myo",
          operator: "Ah Lar Hmwe",
          remark: "กรุณาทำการโอนด้วยตนเอง",
          requsettime: "2022-01-19 01:30:18",
          status: "Success",
          transferTime: "โอนมือ",
          type: "common",
          username: "BE9970678690"
        },
        {
          afAmount: null,
          afcredit: 0,
          amount: 50,
          bankAcc: "09970678690",
          bankName: "SCB",
          bfAmount: null,
          bfcredit: 50,
          created_at: "2022-01-19 01:30:22",
          id: 87,
          name: "htetzaw myo",
          operator: "Ah Lar Hmwe",
          remark: "กรุณาทำการโอนด้วยตนเอง",
          requsettime: "2022-01-19 01:30:18",
          status: "Error",
          transferTime: "โอนมือ",
          type: "common",
          username: "BE9970678690"
        }
      ]
    };
  },
  methods: {
    testtodo(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="scss"></style>
