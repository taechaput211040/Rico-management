<template>
  <v-flex>
    <!-- sectioncard -->
    <!-- {{ depositlist }} -->
    <v-row>
      <div class="col-12 col-lg-4">
        <h2 class="pa-2">ยอดรวมทั้งหมด</h2>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-12 col-xl-6 col-sm-6">
            <card-view
              :value="datarander.depositbalance.toFixed(2)"
              title="รวมยอดฝากทั้งวัน"
              iconSrc="https://smart-binary.cloud/storage/Rico/savemoney.gif"
            ></card-view>
          </div>
          <div class="col-12 col-md-6 col-lg-12 col-xl-6 col-sm-6">
            <card-view
              title="รวมยอดถอนทั้งวัน"
              :value="datarander.withdrawbalance.toFixed(2)"
              iconSrc="https://smart-binary.cloud/storage/Rico/24hour.gif"
            ></card-view>
          </div>
          <div class="col-12 col-md-6 col-lg-12 col-xl-6 col-sm-6">
            <card-view
              :value="datarander.profitlossDate.toFixed(2)"
              title="กำไร/ขาดทุน(วันนี้)"
              iconSrc="https://smart-binary.cloud/storage/Rico/today.gif"
            ></card-view>
          </div>
          <div class="col-12 col-md-6 col-lg-12 col-xl-6 col-sm-6">
            <card-view
              title="กำไร/ขาดทุน(ทั้งเดือน)"
              :value="datarander.profitlossmounth.toFixed(2)"
              iconSrc="https://smart-binary.cloud/storage/Rico/chart.gif"
            ></card-view>
          </div>
        </div>
      </div>

      <!-- sectioncard -->
      <v-col cols="12" lg="4"
        ><v-card width="100%" class="elevation-5 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold">
            บัญชีฝากทั้งหมด
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle primary-title class="font-weight-bold text-center">
            <h3>เปิด-ปิด การฝากออโต้</h3>
          </v-card-subtitle>
          <div class="d-flex">
            <div class="col text-center tougle-system">
              <img-bank value="KBANK"></img-bank>
              <v-switch
                class="mx-auto text-center"
                true-value="start"
                false-value="stop"
                v-model="actionBankState.kbank"
                @click="updateStatusBank(actionBankState)"
              >
              </v-switch>
            </div>
            <div class="col text-center tougle-system">
              <img-bank value="TRUEWALLET"></img-bank>
              <v-switch
                class="mx-auto text-center"
                true-value="start"
                false-value="stop"
                v-model="actionBankState.true"
                @click="updateStatusBank(actionBankState)"
              >
              </v-switch>
            </div>
            <div class="col text-center tougle-system">
              <img-bank value="SCB"></img-bank>
              <v-switch
                class="mx-auto text-center"
                true-value="start"
                false-value="stop"
                v-model="actionBankState.scb"
                @click="updateStatusBank(actionBankState)"
              >
              </v-switch>
            </div>
          </div>

          <v-data-table
            :headers="bankDepositColumn"
            :items="dpbank"
            hide-default-footer
          >
            <template #[`item.Companybank`]="{ item }">
              <div class="pa-2">
                <img-bank :value="item.Companybank"></img-bank>
              </div>
            </template>
            <template #[`item.Companybankname`]="{ item }">
              <span class="font-weight-bold">
                {{ item.Companybankname }}<br />
                {{ item.Companybankacountnumber }}</span
              >
            </template>
            <template #[`item.actions`]="{item}">
              <div v-if="item.Companybank == 'SCB' && item.mode == 2">
                <v-btn  v-if="!checking" small rounded color="primary" @click="checkBalance(item)">เช็คยอด</v-btn>
                <v-progress-circular v-if="checking"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              
              </div>  </template>
          </v-data-table>
        </v-card></v-col
      >
      <v-col cols="12" lg="4"
        ><v-card width="100%" height="100%" class="elevation-3 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold">
            บัญชีถอนทั้งหมด
          </v-card-title>

          <v-data-table
            :headers="bankWithdrawColumn"
            :items="wdbank"
            hide-default-footer
          >
            <template #[`item.Companybank`]="{ item }">
              <div class="pa-2">
                <img-bank :value="item.Companybank"></img-bank>
              </div>
            </template>
            <template #[`item.Companybankname`]="{ item }">
              <span class="font-weight-bold">
                {{ item.Companybankname }}<br />
                {{ item.Companybankacountnumber }}</span
              >
            </template>
            <template #[`item.actions`]="{item}">
              <div v-if="item.Companybank == 'SCB' && item.mode == 2">
                <v-btn  v-if="!checking" small rounded color="primary" @click="checkBalance(item)">เช็คยอด</v-btn>
                <v-progress-circular v-if="checking"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              
              </div>
          
            </template>
          </v-data-table>
        </v-card></v-col
      >
    </v-row>
    <!-- sectiontable -->

    <!-- sectiontable -->
    <!-- secttiondeposit -->
    <v-row>
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2 mb-5">
          <v-card-title primary-title class="font-weight-bold primary--text">
            รายการฝากเงินคงค้าง (ออโต้ไม่ผ่าน)
          </v-card-title>

          <v-data-table
            :headers="logFailedColumn"
            :items="incomingSMS"
            :items-per-page="5"
          >
          <template #[`item.companyBank`]="{item}">
            <div>
              <img-bank :value="item.companyBank"></img-bank>
    
            </div>
            <div>
              {{ item.remark }}
        
            </div>
        </template>
          <template #[`item.dateSms`]="{item}">
{{ item.dateSms }}
         </template>
          <template #[`item.actions`]="{item}">
            <span >    <v-btn small rounded color="primary" @click="topupDashboard(item)">เติม</v-btn></span>
        <span>  <v-btn small rounded color="red" @click="hide(item)">ซ่อน</v-btn></span>
          
          </template>
          
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold success--text">
            รายการฝากเงินล่าสุด 20 รายการ
          </v-card-title>

          <v-data-table
            :headers="depositColumn"
            :items="dplist"
            :items-per-page="5"
          >
            <template #[`item.no`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <img-bank :value="item.companyBank"></img-bank>
                <v-chip
                  class="font-weight-bold pa-2 my-1 elevation-2"
                  color="primary"
                  small
                  ><v-avatar left> <v-icon>mdi-account-circle</v-icon></v-avatar
                  >{{ item.username }}</v-chip
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
                    {{ item.deposit_amount | dateFormat }} บาท </v-chip
                  ><br />
                  โบนัส :
                  <v-chip
                    outlined
                    small
                    class="my-1 elevation-2"
                    color="success"
                    label
                  >
                    {{ item.bonusamount ?? 0 }} บาท</v-chip
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
                    {{ item.topupby ?? item.bank_name }}</v-chip
                  >
                </div>
              </div>
            </template>
            <template #[`item.timeTransection`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <v-chip
                  class="font-weight-bold pa-2 elevation-2"
                  color="grey darken-4"
                  label
                  x-small
                  dark
                  ><v-icon class="mr-1" small>mdi-timer</v-icon>เติม</v-chip
                ><br />
                {{ item.created_at ?? item.deposit_time | dateFormat }}<br />
                <v-chip
                  class="font-weight-bold pa-2 elevation-2 mt-2"
                  color="grey darken-4"
                  dark
                  label
                  x-small
                >
                  <v-icon class="mr-1" small>mdi-message-processing</v-icon
                  >SMS</v-chip
                ><br />
                {{ item.smsdatetime ?? item.sms_time | dateFormat }}<br />
              </div>
            </template>
            <template #[`item.credit`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <div class="my-2">
                  <span class="font-weight-bold"> หลังเติม</span>
                  <br />
                  <v-icon color="success">mdi-menu-up</v-icon>
                  {{ item.afcredit ?? item.after_balance }}<br />
                </div>

                <div class="my-2">
                  <span class="font-weight-bold"> ก่อนเติม</span><br />
                  {{ item.bfcredit ?? item.before_balance }}<br />
                </div>
              </div>
            </template>
            <template #[`item.actions`]>
              <v-btn small color="primary">ตรวจสอบ</v-btn>
            </template>
          </v-data-table>
        </v-card></v-col
      >
      <v-col cols="12" md="12" lg="4">
        <v-card width="100%" class="elevation-3 rounded-lg pa-2">
          <v-card-title primary-title class="font-weight-bold error--text">
            รายการถอนเงินล่าสุด {{ withdrawlist.length }} รายการ
          </v-card-title>

          <v-data-table
            :headers="withdrawColumn"
            :items="wdlist"
            :items-per-page="5"
          >
            <template #[`item.no`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <div class="font-weight-bold">
                  โอนไป<br />
                  <img-bank :value="item.bankName"></img-bank>
                </div>

                <v-chip
                  class="font-weight-bold pa-2 my-1 elevation-2"
                  color="primary"
                  small
                  ><v-avatar left> <v-icon>mdi-account-circle</v-icon></v-avatar
                  >{{ item.name }}</v-chip
                >
                <div class="font-weight-bold my-1">
                  <v-icon small color="grey" class="mx-1">mdi-card-text-outline</v-icon
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
            <template #[`item.timeTransection`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <v-chip
                  class="font-weight-bold pa-2 elevation-2 mt-2 mb-1"
                  color="grey darken-4"
                  label
                  x-small
                  dark
                  ><v-icon class="mr-1" small>mdi-timer</v-icon>ถอน</v-chip
                ><br />
                {{ item.requsettime }}<br />
                <v-chip
                  class="font-weight-bold pa-2 elevation-2 mt-2 mb-1"
                  color="grey darken-4"
                  label
                  x-small
                  dark
                  ><v-icon class="mr-1" small>mdi-transfer</v-icon>โอน</v-chip
                ><br />
                {{ item.transferTime }}<br />
                <v-chip
                  class="font-weight-bold pa-2 elevation-2 mt-2 mb-1"
                  color="grey darken-4"
                  label
                  x-small
                  dark
                  ><v-icon class="mr-1" small>mdi-credit-card</v-icon
                  >เครดิตก่อน</v-chip
                ><br />
                {{ item.bfcredit | dateFormat }}<br />
                <v-chip
                  class="font-weight-bold pa-2 elevation-2 mt-2 mb-1"
                  color="grey darken-4"
                  label
                  x-small
                  dark
                >
                  <v-icon class="mr-1" small>mdi-credit-card</v-icon
                  >เครดิตหลัง</v-chip
                ><br />
                {{ item.afcredit | dateFormat }}
              </div>
            </template>
            <template #[`item.credit`]="{ item }">
              <div class="text-center my-3 my-md-2 showdetail">
                <span class="font-weight-bold">ยอดถอน</span> <br />
                <v-chip
                  class="ma-2 font-weight-bold"
                  color="error"
                  label
                  outlined
                  >{{ item.amount | dateFormat }} บาท</v-chip
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
                <span v-if="!item.afAmount" class="font-weight-bold"> - </span>
                <span v-else> - </span>
                <br />
                <span class="font-weight-bold">ก่อนเติม</span><br />
                <v-icon color="error"
                  >mdi-menu-down{{ item.afAmount | dateFormat }}</v-icon
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
                <v-btn color="primary" class="my-1" rounded small>Reset</v-btn>
                <v-btn color="grey" class="my-1" rounded small>ถอนมือ</v-btn>
                <v-btn color="primary" outlined rounded class="my-1" small
                  >หมายเหตุ</v-btn
                >
              </div>
            </template>
          </v-data-table>
        </v-card></v-col
      >
    </v-row>
    <!-- secttiondeposit -->

 <!-- secttion dialog -->
    <v-dialog v-model="dialogTopup" max-width="290">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการเติมเงิน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            <v-text-field
            placeholder="กรอก username : "
            hide-details="auto"
            v-model="incoming_dashboard.username"
            dense
            outlined
            :rules="rulesFrom.usernameRules"
            required
          ></v-text-field>
         
          
          </div>
          <div class="my-2">
            จำนวนเงิน : {{incoming_dashboard.amount }}
       </div>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
         
          <v-btn color="success"  small  @click="topUp()"> ยืนยัน</v-btn>
          <v-btn color="red"  small  @click="dialogTopup = false"> ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>
<script>
import { mapActions,mapState,mapMutations } from "vuex";
import ImgBank from "../components/ImgBank.vue";
import GradientInput from "../components/palette/GradientInput.vue";
export default {
  computed: {
    ...mapState("auth",["datarander","dpbank","wdbank","dplist","wdlist","incomingSMS","actionBankState"]),
  },
  components: { ImgBank, GradientInput },
  async fetch() {
    try {
      await this.getsatatusBank();
     await this.GetInfomation();
   console.log('getinfo done')
      // this.datainformation = response.data;
      this.setCardshow(this.datainformation);
  
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {},
  data() {
    return {
      depositlist:[],
      withdrawlist:[],
      dialogTopup:false,
      incoming_dashboard:{username:'',amount:0},
      rulesFrom: {
        usernameRule: [v => !!v || "กรุณากรอก username"]
       
      },


      checking:false,
      datainformation: [],
      isLoading: false,
   
     
    
      bankDepositColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true,
        },
        {
          text: "ชื่อ",
          value: "Companybankname",
          align: "center",
          sortable: true,
        },
        {
          text: "อัพเดทยอดคงเหลือ",
          value: "balanceupdatetime",
          align: "center",
          sortable: false,
        },
        {
          text: "ยอดเงินคงเหลือ",
          value: "balance",
          align: "center",
          sortable: false,
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      bankWithdrawColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true,
        },
        {
          text: "ชื่อ",
          value: "Companybankname",
          align: "center",
          sortable: true,
        },
        {
          text: "อัพเดทยอดคงเหลือ",
          value: "balanceupdatetime",
          align: "center",
          sortable: false,
        },
        {
          text: "ยอดเงินคงเหลือ",
          value: "balance",
          align: "center",
          sortable: false,
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      logFailedColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "companyBank",
          sortable: true,
        },
        {
          text: "เวลาจาก SMS",
          value: "dateSms",
          align: "center",
          sortable: true,
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      depositColumn: [
        {
          text: "รายการ",
          align: "center",
          value: "no",
          sortable: false,
        },
        {
          text: "เวลาเติมเครดิต",
          value: "timeTransection",
          align: "center",
          sortable: false,
        },
        {
          text: "เครดิต ก่อน/หลัง",
          value: "credit",
          align: "center",
          sortable: false,
        },
      ],
      withdrawColumn: [
        {
          text: "รายการ",
          align: "center",
          value: "no",
          sortable: false,
          class: "col-4",
        },
        {
          text: "เวลา ถอน/โอน",
          value: "timeTransection",
          align: "center",
          sortable: false,
          class: "col-3",
        },
        {
          text: "จำนวน",
          value: "credit",
          align: "center",
          sortable: false,
          class: "col-3",
        },
        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
          class: "col-2",
        },
      ],
   

     
    };
  },

  methods: {
    ...mapActions("auth", ["GetInfomation", "Autostatus","checkBalanceBank","updateBalanceBank","updateAutoBankStatus"]),
    ...mapMutations("auth", ["update_action_bank"]),
    topupDashboard(item){
      this.incoming_dashboard = item
      this.dialogTopup = true
    },
    hide(item){},
    async topUp(){
      
    },
    setCardshow(data) {
      if (data) {
      //   this.datarander = {
      //     depositbalance: data.dpamountoneday.amount,
      //     withdrawbalance: data.wdamountoneday.amount,
      //     profitlossDate:
      //       data.dpamountoneday.amount - data.wdamountoneday.amount,
      //     profitlossmounth: data.OneMonthProfit
      //   };
      //   this.dpbank = data.dpbank;
      //   this.wdbank = data.wdbank;
      //   this.dplist = data.dplist;
      //   this.wdlist = data.wdlist;
      //   this.incomingSMS = data.incomingSMS;
      }
    },
    async updateStatusBank(item){

      await this.updateAutoBankStatus({data:item})

      
    },
    async getsatatusBank() {
      console.log('getsatatusBank')
      try {
         await this.Autostatus();
    
         console.log('Autostatus done')
      } catch (error) {
        console.log(error);
      }
    },
    async checkBalance(item){
      this.checking = true
      try {
        await this.checkBalanceBank({bank:item})
        this.checking = false
      } catch (error) {
        this.checking = false
      }
     

      // await this.updateBalanceBank({id:item.id,balance:balance})
      this.checking = false
    }
  }
};
</script>
<style lang="scss"></style>
