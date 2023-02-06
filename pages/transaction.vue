<template>
  <div>
    <loading-page v-if="loading"></loading-page>
    <h1>โยกเงิน</h1>
    <div>
      <div class="row mt-4">
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card shadow rounded">
            <h5 class="pa-2 font-weight-bold text-center">จากบัญชี</h5>

            <div class="pa-2" v-if="bank_options">
              <label for="bank">ธนาคาร</label>
              <v-select
                name="bank"
                dense
                outlined
                hide-details="auto"
                :items="bank_options"
                placeholder="เลือกธนาคาร"
                v-model="formBank"
              ></v-select>

              <label for="bankAcc" class="mt-4">หมายเลขธนาคารต้นทาง</label>
              <v-text-field
                v-model="formBank.Companybankacountnumber"
                type="text"
                name="bankAcc"
                disabled
                dense
                outlined
                hide-details="auto"
                placeholder="จากหมายเลขธนาคาร"
              />

              <label class="mt-4">ยอดเงินคงเหลือ</label>
              <v-btn
                rounded
                color="primary"
                x-small
                v-if="formBank.Companybankacountnumber"
                @click="checkBalance(formBank)"
                >เช็คยอดเงิน</v-btn
              >
              <v-text-field
                v-model="formBank.balance"
                type="number"
                name="amount"
                dense
                outlined
                hide-details="auto"
                disabled
                placeholder="จำนวนเงิน"
              />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-8">
          <div class="card shadow rounded">
            <h5 class="pa-2 font-weight-bold text-center">ไปยังบัญชี</h5>

            <div class="">
              <div class="row my-3">
                <div
                  class="col-lg-1 col-md-auto col-sm-auto pa-1 col-2 pointer d-flex align-items-center"
                  v-for="(item, i) in $store.state.bank_options_transfer.filter(
                    (bank) => bank.value
                  )"
                  :key="i"
                >
                  <div :id="item.value"></div>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div
                        v-bind="attrs"
                        v-on="on"
                        :class="{
                          active_bank: item === toBank,
                        }"
                        style="cursor: pointer"
                        @click="selectBank(item)"
                      >
                        <img-bank :value="item.value"></img-bank>
                      </div>
                      <br />
                    </template>
                    <span>{{ item.text }}</span>
                  </v-tooltip>
                </div>
              </div>
              <div v-if="toBank">
                <label for="nameBank" class="mt-4">ธนาคารที่เลือก</label>
                <v-text-field
                  type="text"
                  disabled
                  dense
                  outlined
                  hide-details="auto"
                  :value="transfer_acc.text"
                  name="bankAccTo"
                  placeholder="ธนาคาร"
                ></v-text-field>
              </div>

              <label for="bankAccTo" class="mt-4">หมายเลขบัญชีปลายทาง</label>
              <v-text-field
                v-model="transfer_acc.acc_num"
                type="number"
                dense
                outlined
                hide-details="auto"
                name="bankAccTo"
                placeholder="หมายเลขบัญชีปลายทาง"
              ></v-text-field>
            </div>
            <div>
              <label for="amount" class="mt-4">จำนวนเงินที่ต้องการโอน</label>
              <v-text-field
                v-model="transfer_acc.amount"
                type="number"
                min="0"
                dense
                outlined
                hide-details="auto"
                name="amounttransfer"
                placeholder="จำนวนเงิน"
              />
            </div>
            <div class="pt-2 mt-4">
              <v-btn color="black white--text" rounded @click="doTransfer()"
                >ทำรายการ</v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <h1>ประวัติรายการโยกเงิน</h1>
    <div class="card shadow">
      <div class="p-3 col-4">
        <!-- <v-select
                    name="bank"
                    :options="$store.state.bank_options"
                    v-model="selectBank"
                ></v-select> -->
      </div>

      <v-data-table :headers="fields" :items="email_body">
        <template #[`item.amount`]="{ item }">
          {{ item.amount | numberFormat }}
        </template>
        <template #[`item.bf_balance`]="{ item }">
          {{ item.bf_balance | numberFormat }}
        </template>
        <template #[`item.af_balance`]="{ item }">
          {{ item.af_balance | numberFormat }}
        </template>
        <template #[`item.status`]="{ item }">
          <v-chip color="success" small v-if="item.status === 'success'">{{
            item.status
          }}</v-chip>
          <v-chip small color="warning" v-else-if="item.status === 'waiting'">{{
            item.status
          }}</v-chip>
          <v-chip small color="error" v-else>{{ item.status }}</v-chip>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="confirmTransfer" max-width="800">
      <v-card>
        <v-card-title primary-title> ยืนยันการโอนเงิน </v-card-title>

        <v-form>
          <div class="container">
            <div class="pa-3">
              <v-row>
                <v-col cols="6">
                  <label for="banktype">จากบัญชี</label>
                  <div class="my-2">
                    <v-text-field
                      v-if="formBank"
                      name="bankeName"
                      v-model="formBank.Companybank"
                      type="text"
                      disabled
                      dense
                      outlined
                      hide-details="auto"
                    >
                    </v-text-field>
                  </div>
                  <div class="my-2">
                    <v-text-field
                      v-if="formBank"
                      name="bankeName"
                      v-model="formBank.Companybankacountnumber"
                      type="text"
                      disabled
                      dense
                      outlined
                      hide-details="auto"
                      pattern="[0-9]+"
                    >
                    </v-text-field>
                  </div>
                </v-col>
                <v-col cols="6">
                  <label for="bank">ไปบัญชี</label>
                  <div class="my-2">
                    <v-text-field
                      name="bankeName"
                      v-model="transfer_acc.value"
                      type="text"
                      dense
                      outlined
                      hide-details="auto"
                      disabled
                    >
                    </v-text-field>
                  </div>
                  <div class="my-2">
                    <v-text-field
                      name="bankeName"
                      v-model="transfer_acc.acc_num"
                      type="text"
                      disabled
                      dense
                      outlined
                      hide-details="auto"
                      min="0"
                      pattern="[0-9]+"
                    >
                    </v-text-field>
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <label>จำนวนเงิน</label>
                  <v-text-field
                    name="accnum"
                    v-model="transfer_acc.amount"
                    type="text"
                    disabled
                    required
                    class="mv-3"
                    dense
                    outlined
                    hide-details="auto"
                    pattern="[0-9]+"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-form>
        <v-card-actions class="justify-center">
          <v-btn
            v-if="!sendingEmail"
            small
            color="primary"
            :loading="sendingEmail"
            @click="sendConfirmEmail()"
          >
            ยืนยัน
          </v-btn>
          <v-btn small v-if="!sendingEmail" color="error" @click="reset_value">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-modal="modal_multi_2"
      no-close-on-backdrop
      no-close-on-esc
      hide-footer
      ><v-card>
        <div v-if="emailData">
          <p class="my-2">
            โปรดกรอก รหัส PIN จากอีเมลล์
            {{ emailData.email.email }} ที่ลงทะเบียนไว้
          </p>
          <p class="my-2">
            รหัสอ้างอิง : <b>{{ emailData.ref }}</b>
          </p>
          <v-text-field
            v-model="emailData.pin"
            name="otp"
            type="text"
            required
            class="mv-3"
            size="sm"
            min="0"
            pattern="[0-9]+"
          >
          </v-text-field>
        </div>
        <v-card-actions>
          <div>
            <v-btn variant="success" @click="confirmPinTransfer">ยืนยัน</v-btn>
            <v-btn variant="danger" @click="reset_value">ยกเลิก</v-btn>
          </div>
          <div v-if="emailData">
            <p>รหัส PIN จะหมดอายุภายใน {{ display_time }}</p>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog ref="remark" title="ข้อความ" ok-only>
      <div>
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
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import VueQRCodeComponent from "vue-qrcode-component";
import LoadingPage from "../components/LoadingPage.vue";
Vue.component("qr-code", VueQRCodeComponent);
export default {
  data() {
    return {
      LoadingPagemodal_multi_2: false,
      confirmTransfer: false,
      display_time: "",
      emailData: { email: { email: "" }, ref: "", expire: "", pin: "" },
      sendingEmail: false,
      formBank: { Companybankacountnumber: null, balance: 0 },
      toBank: null,
      transfer_acc: { text: "", value: "", acc_num: "", amount: 0 },
      loading: false,
      bank_options: [],
      remark_render: {
        qrcode: null,
        remarkMessage: null,
        bf_balance: null,
        af_balance: null,
      },
      remarkMessage: null,

      email_body: [],
      fields: [
        { value: "created_at", text: "เวลาบันทึกรายการ" },
        { value: "from_bank", text: "จากธนาคาร" },
        { value: "from_account", text: "จากบัฐชี" },

        {
          value: "to_bank",
          text: "เข้าธนาคาร",
        },
        { value: "to_account", text: "เข้าบัญชี" },
        { value: "amount", text: "ยอดโอน" },
        { value: "bf_balance", text: "ยอดเงินก่อนโอน" },
        { value: "af_balance", text: "ยอดเงินหลังโอน" },
        { value: "status", text: "สถานะ" },
      ],
    };
  },
  async mounted() {
    try {
      this.loading = true;
      const { data } = await this.$store.dispatch("setting/getCompanybank");
      console.log(data, "cpmpa");
      const scb_api = data
        .filter((x) => {
          return x.mode == 2;
        })
        .map((y) => {
          return {
            value: y,
            text:
              y.Companybank +
              " " +
              y.Companybankname +
              " " +
              y.Companybankacountnumber,
          };
        });
      this.bank_options = scb_api;
      this.loading = false;
    } catch (error) {
      console.log(error);
    }

    await this.getEmailBody();
  },
  methods: {
    async getEmailBody() {
      try {
        this.loading = true;
        const res = await this.$store.dispatch("setting/getEmailBody");
        this.email_body = res.data.map((x) => {
          x.created_at = new Date(x.created_at).toLocaleString("en-GB");
          return x;
        });
        //  const b = res.data[0].created_at
        let b = new Date(res.data[0].created_at);
        console.log(res.data[0].created_at);
        //         this.email_body = res.data.map(x=>{
        // const ti = new Date(x.created_at)
        //         const bi =   new Date(ti.setHours(ti.getHours() + 7))
        //           // x.created_at = new Date(x.created_at).toLocaleString("en-CA");
        // x.created_at = bi
        //           return x
        //         });

        this.loading = false;
      } catch (error) {
        this.showErrorAlert("ดึงรายการไม่สำเร็จ");
        console.log(error);
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
    remark(item) {
      const remark_string = item.remark;
      this.remark_render.qrcode = item.remark.slice(3);
      this.remark_render.bf_balance = item.bfAmount;
      this.remark_render.af_balance = item.afAmount;
      this.$refs["remark"].show();
    },
    reset_value() {
      this.transfer_acc = { text: "", value: "", acc_num: "", amount: 0 };
      this.emailData = { email: { email: "" }, ref: "", expire: "", pin: "" };
      this.modal_multi_2 = false;

      this.confirmTransfer = false;
    },
    canclePinTransfer() {
      this.reset_value();
    },
    async confirmPinTransfer() {
      if (
        this.emailData.pin.length < 6 ||
        this.emailData.pin.length > 6 ||
        this.emailData.pin.length == 0 ||
        !this.emailData.pin.length
      ) {
        this.$swal.fire("ERROR!", "รูปแบบ PIN ไม่ถูกต้อง", "error", "OK");

        return;
      }
      this.modal_multi_2 = false;
      this.confirmTransfer = false;
      this.loading = true;
      const data_send = {
        email: this.emailData.email.email,
        ref: this.emailData.ref,
        pin: this.emailData.pin,
      };

      try {
        const res = await this.$store.dispatch(
          "setting/sendEmailSCBVerify",
          data_send
        );
        if (res.data.status.code == 1000) {
          const item_remark = {
            remark: res.data.data.qr,
            bfAmount: res.data.data.bf_balance,
            afAmount: res.data.data.af_balance,
          };
          this.remark(item_remark);
        }
        this.loading = false;
        await this.getEmailBody();
        this.$store.commit("setTimer", false);
        this.showSuccessAlert("ทำรายการสำเร็จ");
      } catch (error) {
        this.loading = false;
        this.modal_multi_2 = true;
        this.confirmTransfer = true;
        this.$swal.fire("ERROR!", error.response.data.message, "error", "OK");
      }
    },
    async sendConfirmEmail() {
      this.confirmTransfer = false;
      this.loading = true;
      this.sendingEmail = true;
      const data_email = {
        from_bank: this.formBank.Companybank,
        from_account: this.formBank.Companybankacountnumber,
        to_bank: this.transfer_acc.value,
        to_account: this.transfer_acc.acc_num,
        amount: this.transfer_acc.amount,
      };
      try {
        const res = await this.$store.dispatch(
          "setting/sendEmailSCB",
          data_email
        );
        this.emailData = res.data;
        this.loading = false;
        await this.coundDown(this.emailData.expire);
        this.sendingEmail = false;
        this.modal_multi_2 = true;
        this.confirmTransfer = true;
      } catch (error) {
        console.log(error);

        this.modal_multi_2 = false;
        this.confirmTransfer = false;
        this.loading = false;
        this.sendingEmail = false;
      }
    },
    async doTransfer() {
      if (!this.formBank.Companybankacountnumber) {
        this.$swal.fire("ERROR!", "กรุณาเลือกธนาคารต้นทาง", "error", "OK");
        return;
      }
      if (!this.transfer_acc.value) {
        this.$swal.fire("ERROR!", "จำนวนเงินไม่ถูกต้อง", "error", "OK");
        return;
      }

      if (this.transfer_acc.amount <= 0) {
        this.$swal.fire("ERROR!", "จำนวนเงินไม่ถูกต้อง", "error", "OK");
        return;
      }
      if (this.transfer_acc.acc_num.length < 10) {
        this.$swal.fire(
          "ERROR!",
          "หมายเลขบัญชีไม่ถูกต้อง กรุณาตรวจสอบ",
          "error",
          "OK"
        );
        return;
      }
      if (this.transfer_acc.amount > this.formBank.balance) {
        this.$swal.fire(
          "ERROR!",
          "จำนวนเงินคงเหลือบัญชีต้นทาง ไม่เพียงพอสำหรับการโอน กรุณาตรวจสอบยอดเงินคงเหลือ",
          "error",
          "OK"
        );
        return;
      }
      console.log(this.transfer_acc);
      this.confirmTransfer = true;
    },
    async checkBalance(item) {
      this.loading = true;
      try {
        let { data } = await this.$store.dispatch(
          "setting/getBalanceSCB",
          item.Companybankacountnumber
        );
        console.log(data);
        this.formBank.balance = data.balance;

        this.loading = false;
      } catch (error) {
        this.$swal.fire("ERROR!", "เช็คยอดเงินไม่สำเร็จ", "error", "OK");

        console.log(error);
        this.loading = false;
      }
    },

    selectBank(bank) {
      this.toBank = bank;
      this.transfer_acc.text = bank.text;
      this.transfer_acc.value = bank.value;
    },
    updateDisplayTime(time) {
      this.display_time = time;
    },
    async coundDown(item) {
      var countDownDate = new Date(item).getTime();
      this.$store.commit("setTimer", true);
      // Update the count down every 1 second
      var timer1 = setInterval(() => {
        // Get today's date and time
        var now = new Date().getTime();
        this.display_time = null;
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Display the result in the element with id="demo"

        this.display_time = minutes + " นาที " + seconds + " วินาที";
        // If the count down is finished, write some text

        if (distance <= 0 || this.$store.state.timer == false) {
          clearInterval(timer1);

          time_update = "EXPIRED";
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
.form-control {
  border: 1px solid #ced4da;
  border-style: solid;
  border-radius: 3px;
}
.active_bank {
  box-shadow: 1px 1px 9px 0px #ff54b6;
}
</style>
>
