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
      <v-row v-if="depositbalance.length > 0">
        <v-col
          cols="12"
          sm="3"
          md="3"
          v-for="(item, i) in depositbalance"
          :key="i"
        >
          <div
            class="card-child card-report elevation-5 text-center"
            @click="getDataOption(item.status)"
          >
            <img
              src="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/atm.png"
              alt=""
              class="img-icon icon-Logo"
            />
            <!-- <div>
              ยอดถอนรวม :<span class="primary--text font-weight-bold"
                >{{ depositbalance.amount }}
              </span>
            </div>
            <div>
               <span class="primary--text font-weight-bold"
                >{{ depositbalance.count }} ครั้ง
              </span>
            </div> -->
            <div>
              <img-bank :value="item.companybank"></img-bank>
              <div>
                <div v-if="item.status == 'Success'">
                  <div class="primary--text font-weight-bold">
                    ถอนสำเร็จ :{{ item.count }} รายการ
                  </div>
                  <div class="primary--text font-weight-bold">
                    จำนวน :{{ item.amount }}
                  </div>
                </div>

                <div v-if="item.status == 'rejected'">
                  <div class="primary--text font-weight-bold">
                    rejected :{{ item.count }} รายการ
                  </div>
                  <div class="primary--text font-weight-bold">
                    จำนวน :{{ item.amount }}
                  </div>
                </div>

                <div v-if="item.status == 'pending'">
                  <div class="primary--text font-weight-bold">
                    อยู่ในคิว :{{ item.count }} รายการ
                  </div>
                  <div class="primary--text font-weight-bold">
                    จำนวน :{{ item.amount }}
                  </div>
                </div>
                <div v-if="item.status == 'Error'">
                  <div class="primary--text font-weight-bold">
                    ไม่สำเร็จ :{{ item.count }} รายการ
                  </div>
                  <div class="primary--text font-weight-bold">
                    จำนวน :{{ item.amount }}
                  </div>
                </div>
                <div v-if="item.status == 'created'">
                  <div class="primary--text font-weight-bold">
                    รอดำเนินการ :{{ item.count }} รายการ
                  </div>
                  <div class="primary--text font-weight-bold">
                    จำนวน :{{ item.amount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
        <div class="pa-5 font-weight-bold">
          จำนวนสมาชิกทั้งหมด
          {{ itemwithdraw.meta ? itemwithdraw.meta.itemCount : 0 }} คน
        </div>

        <v-card width="100%" class="elevation-4 rounded-lg">
          <v-data-table
            show-expand
            class="elevation-1"
            :headers="headerCell"
            :items="itemwithdraw.data"
            single-expand
            :options.sync="options"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
              'items-per-page-options': [50, 100],
            }"
            :server-items-length="
              itemwithdraw.meta ? itemwithdraw.meta.itemCount : 0
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
              v-if="item.status == 'Pending'"
              outlined
              color="yellow"
            >
              <v-icon left small>mdi-circle</v-icon> {{ item.status }}</v-chip
            >
              <v-chip
                small
                v-if="item.status == 'Success'"
                outlined
                color="success"
              >
                <v-icon left small>mdi-circle</v-icon> {{ item.status }}</v-chip
              >
              <v-chip
                small
                v-if="item.status == 'created'"
                outlined
                color="blue"
              >
                <v-icon left small>mdi-circle</v-icon> {{ item.status }}</v-chip
              >

              <v-chip
              small
              v-if="item.status == 'Error'"
              outlined
              color="red"
            >
              <v-icon left small>mdi-circle</v-icon> {{ item.status }}</v-chip
            >
            <v-chip
            small
            v-if="item.status == 'rejected'"
            outlined
            color="red"
          >
            <v-icon left small>mdi-circle</v-icon> {{ item.status }}</v-chip
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
                {{ item.requsettime.slice(0, 20) }}
              </span>
            </template>
            <template #[`item.transferTime`]="{ item }">
              <span>
                {{
                  renderDate(item.transferTime)
                    ? renderDate(item.transferTime)
                    : "โอนมือ"
                }}
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
            <template #[`item.actions`]="{ item }">
              <div class="d-flex" >
                <v-tooltip bottom color="success">
                  <template v-slot:activator="{ on, attrs }"
                    ><v-btn
                      :disabled="canwrite"
                      v-bind="attrs"
                      v-on="on"
                      color="success mx-1"
                      x-small
                      fab
                      @click="approveWd(item)"
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
                      @click="rejectWD(item)"
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
                      @click="resetWD(item)"
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
                      @click="manualWd(item)"
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
    <v-dialog v-model="dialogRemark" max-width="1080">
      <v-card>
        <v-card-title>
          <h4>ข้อความ</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div v-if="remark_render.qrcode == null">
            <h3 class="my-4 text-center">
              {{ remark_render.remark }}
            </h3>
          </div>
          <div v-if="remark_render.qrcode != null">
            <div class="text-center">
              <div>รายการโอนสำเร็จ</div>
              <div>ยอดก่อนโอน : {{ remark_render.bf_balance }}</div>
              <div>ยอดหลังโอน : {{ remark_render.af_balance }}</div>

              <div>QR CODE สำหรับตรวจสอบรายการโอนเงิน</div>
              <div class="d-flex" style="justify-content: center">
                <qr-code :text="remark_render.qrcode"></qr-code>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="dialogRemark = false"> ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogManualWD" max-width="290">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการถอนมือ</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            เมื่อกด ถอนมือ ระบบจะเปลี่ยนสถานะของรายการนี้เป็น Success
            ทางเว็บจะต้องดำเนินการโอนเงินให้ลูกค้าเอง ผ่านช่องทางอื่นๆ
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="manualWd_confirm()">
            ยืนยัน</v-btn
          >
          <v-btn color="red" small @click="dialogManualWD = false"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogRejectWD" max-width="350">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการ Reject รายการถอน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            ปฏิเสธรายการถอน และเติมเครดิต คืนให้กับ <br />user:
            {{ withdraw_temp?.username }} พร้อมใส่เทิร์นระบบ ใช่หรือไม่ ?
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="rejectWd_confirm()">
            ยืนยัน</v-btn
          >
          <v-btn color="red" small @click="dialogRejectWD = false"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogApproveWD" max-width="350">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการ อนุมัติ รายการถอน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            ยินยันการโอนเงินให้ <br />user: {{ withdraw_temp?.username }}
            ใช่หรือไม่ ?
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="ApproveWd_confirm()">
            ยืนยัน</v-btn
          >
          <v-btn color="red" small @click="dialogApproveWD = false"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogResetWD" max-width="350">
      <v-card>
        <v-card-title>
          <h4>RESET สถานะ รายการถอน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            ยินยัน RESET สถานะ รายการถอน ใช่หรือไม่ ?

            <br />
            <br />
            หมายเหตุ: <br />
            <p>
              ก่อนการอนุมัติใหม่ หลังจาก reset ให้ตรวจสอบ ยอดเงิน
              ว่าออกไปหรือยัง ก่อนทำการอนุมัติใหม่ทุกครั้ง
              หากมีการโอนยอดซ้ำออกไป เนื่องจากการกด reset
              ทางเราจะไม่รับผิดชอบใดๆ ทั้งสิ้น
            </p>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="ResetWd_confirm()">
            ยืนยัน</v-btn
          >
          <v-btn color="red" small @click="dialogResetWD = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import dayjs from "dayjs";
import ImgBank from "../../components/ImgBank.vue";
import LoadingPage from "../../components/LoadingPage.vue";
import { mapActions, mapState, mapMutations } from "vuex";
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
      itemwithdraw: [],
      depositbalance: [],
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().slice(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().slice(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
        options: "username",
      },
      checking: false,
      dialogTopup: false,
      dialogTopup_hide: false,
      dialogRemark: false,
      dialogManualWD: false,
      dialogRejectWD: false,
      dialogApproveWD: false,
      dialogResetWD: false,
      confirming: false,
      remark: null,
      withdraw_temp: null,
      remark_render: {
        remakr: null,
        qrcode: null,
        af_balance: null,
        bf_balance: null,
      },
    };
  },
  components: { ImgBank, LoadingPage },
  async fetch() {
    await this.getData();
    // this.itemwithdraw = wdlist.data;
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
    ...mapActions("auth", [
      "manualWithdrawFromDashboard",
      "manualRejectFromDashboard",
      "manualApproveFromDashboard",
      "manualResetFromDashboard",
      "hideIncomingFromDashBoardByOperator",
      "GetInfomation",
      "Autostatus",
      "checkBalanceBank",
      "updateBalanceBank",
      "updateAutoBankStatus",
      "topupDashboardByOperator",
      "updateIncoming",
      "updateWithdrawlistAction",
      "findInWdList",
    ]),

    ...mapMutations("auth", ["update_action_bank", "updateWithdrawlist"]),
    ...mapMutations("auth", [
      "set_logout",
      "update_action_bank",
      "addIncoming",
      "addDeposit",
      "RemoveIncoming",
      "updateWithdrawlist",
      "addWithdraw",
    ]),
    approveWd(item) {
      (this.withdraw_temp = item), (this.dialogApproveWD = true);
    },
    manualWd(item) {
      (this.withdraw_temp = item), (this.dialogManualWD = true);
    },
    rejectWD(item) {
      (this.withdraw_temp = item), (this.dialogRejectWD = true);
    },
    resetWD(item) {
      (this.withdraw_temp = item), (this.dialogResetWD = true);
    },
    showRemark(item) {
      if (item.remark.startsWith("QR_")) {
        this.remark_render.qrcode = item.remark.slice(3);
        this.remark_render.bf_balance = item.bfAmount;
        this.remark_render.af_balance = item.afAmount;
      } else {
        this.remark_render.remark = item.remark;
        this.remark_render.qrcode = null;
      }

      this.dialogRemark = true;
    },
    async ResetWd_confirm() {
      this.isLoading = true;
      this.confirming = true;
      this.withdraw_temp.status = "created";
      const list = await this.updateWithdrawlistAction(this.withdraw_temp);
      await this.updateWithdrawlist(list);
      const result = await this.manualResetFromDashboard(this.withdraw_temp);
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.dialogResetWD = false;
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",

          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogResetWD = false;
        this.confirming = false;
        return;
      } else {
        this.isLoading = false;
        this.dialogResetWD = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogApproveWD = false;
        this.confirming = false;
        return;
      }
    },
    async ApproveWd_confirm() {
      this.isLoading = true;
      this.confirming = true;
      this.withdraw_temp.status = "Pending";
      const list = await this.updateWithdrawlistAction(this.withdraw_temp);
      await this.updateWithdrawlist(list);
      const result = await this.manualApproveFromDashboard(this.withdraw_temp);
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.dialogApproveWD = false;
        this.$swal({
          title: `นำรายการถอนเข้าคิวสำเร็จ`,
          icon: "success",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false;
        return;
      } else {
        this.isLoading = false;
        this.dialogApproveWD = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogApproveWD = false;
        this.confirming = false;
        return;
      }
    },
    async rejectWd_confirm() {
      this.isLoading = true;
      this.confirming = true;
      this.withdraw_temp.status = "rejected";
      const list = await this.updateWithdrawlistAction(this.withdraw_temp);
      await this.updateWithdrawlist(list);
      const result = await this.manualRejectFromDashboard(this.withdraw_temp);
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.dialogRejectWD = false;
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",

          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false;
        return;
      } else {
        this.isLoading = false;
        this.dialogRejectWD = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogRejectWD = false;
        this.confirming = false;
        return;
      }
    },
    async manualWd_confirm() {
      this.isLoading = true;
      this.confirming = true;
      this.withdraw_temp.status = "Success";
      const list = await this.updateWithdrawlistAction(this.withdraw_temp);
      await this.updateWithdrawlist(list);
      const result = await this.manualWithdrawFromDashboard(this.withdraw_temp);
      this.isLoading = false;
      if (result.status == "success") {
        this.isLoading = false;
        this.dialogManualWD = false;
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false;
        return;
      } else {
        this.isLoading = false;
        this.dialogManualWD = false;
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.dialogTopup_hide = false;
        this.confirming = false;
        return;
      }
    },
    async getDataOption(input = null) {
      this.isLoading = true;
      let params = this.getParameter();

      if (!input) {
        try {
          console.log(params);
          const data = await this.getwdListtransaction(params);
          this.itemwithdraw = data;
          this.depositbalance = data.sum;
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
        this.isLoading = false;
      } else {
        console.log(input);
        params.options = input;
        params.username = null;
        try {
          console.log(params);
          const data = await this.getwdListtransaction(params);
          this.itemwithdraw = data;
          this.depositbalance = data.sum;
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
        this.isLoading = false;
      }
    },
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
        start: dayjs(this.dateFilter.startDate)
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
        end: dayjs(this.dateFilter.endDate)
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss"),
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
        this.itemwithdraw = data;
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
        this.itemwithdraw = data;
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
          this.itemwithdraw = data;
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
          this.itemwithdraw = data;
          this.depositbalance = data.sum;
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
