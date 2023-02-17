<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <h2 class="mb-2">ถอนเครดิตสมาฃิก (Manual)</h2>
      <v-row><v-col lg="5" sm="12" md="12" cols="12">
          <div class="card-child elevation-5">
            <v-row class="d-flex align-baseline ma-auto"><v-col cols="8" sm="8" md="8" lg="8"
                class="d-flex align-baseline"><v-text-field v-model="wd_form.username" name="name" dense outlined
                  clearable label="กรอก username เพื่อค้นหา" placeholder="เช่น xx1234567"
                  hide-details="auto"></v-text-field> </v-col><v-col cols="4" sm="4" md="4" lg="4">
                <v-btn color="primary" @click="searchdata">
                  <v-icon left dark> mdi-magnify </v-icon>
                  ค้นหา</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col lg="3" sm="6" md="6" cols="12">
          <card-report title="เครดิตปัจจุบัน" v-model="wd_form.credit"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/credit-card.png"></card-report>
        </v-col>
        <v-col lg="4" sm="6" md="6" cols="12" v-if="serchsuccess == true">
          <div class="card-child elevation-5">
            <v-row class="align-baseline ma-auto">
              <v-col cols="12" md="8" sm="8"><v-text-field v-model="wd_form.wdAmount" name="name" dense outlined
                  clearable type="number" label="กรอกเครดิตที่ต้องการถอน" placeholder="เป็นตัวเลขเท่านั้น"
                  hide-details="auto"></v-text-field></v-col>
              <v-col cols="12" sm="4" md="4" class="text-center"  >
                <v-btn color="error" :disabled="canwrite" @click="manualWd()">ถอนเครดิต
                </v-btn></v-col>
            </v-row>
          </div>
        </v-col></v-row>
      <v-card class="elevation-4 mt-5 rounded-lg" v-if="serchsuccess == true">
        <v-card class="elevation-3">
          <v-data-table :headers="header" hide-default-footer :items="response">

          </v-data-table></v-card>
      </v-card>
      <!-- <v-card class="elevation-4 mt-5 rounded-lg">
        <v-data-table :headers="header" hide-default-footer :items="response">
          <template #[`item.type`]="{ item }">
            <span class="font-weight-bold primary--text">{{ item.type }}</span>
          </template>
        </v-data-table></v-card
      > -->
    </v-container>
    <v-dialog v-model="dialogManualWD" max-width="500">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการถอน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2">
            ยืนยันการถอนเงินแทนสมาชิก
            <br />
            username: {{ wd_form.username }}
            <br />
            จำนวนเงิน {{ wd_form.wdAmount}} บาท ใช่หรือไม่?
            <br />
            ***การกดถอนตรงนี้จะไม่สนใจเทิร์นที่ทำ หรือ ติดอยู่***
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="manualWd_confirm()">
            ยืนยัน</v-btn>
          <v-btn color="red" small @click="dialogManualWD = false">ยกเลิก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>

import LoadingPage from "../../components/LoadingPage.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: { LoadingPage },
  data() {
    return {

      dialogManualWD: false,

      isLoading: false,

      wd_form: {
        username: '',
        wdAmount: 0,
        credit: 0,
      },

      serchsuccess: false,
      header: [
        {
          text: "ประเภทเกมส์",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "TURN",
          value: "turn",
          align: "center",
          sortable: false
        },
        {
          text: "ยอด วางเดิมพัน ที่ต้องทำ",
          value: "turnTarget",
          align: "center",
          sortable: false
        },
        {
          text: "วางเดิมพัน",
          value: "winlose",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดวางเดิมพันคงค้าง",
          value: "outstanding",
          align: "center",
          sortable: false
        },
        {
          text: "อั้นถอนจากการเติม",
          value: "limitwithdraw",
          align: "center",
          sortable: false
        },
        {
          text: "อั้นถอนของระบบ",
          value: "sys_limit_amount",
          align: "center",
          sortable: false
        }
      ],
      response: [
        {
          id: 4687,
          created_at: "2022-01-20T19:21:25.000000Z",
          updated_at: "2022-01-20T23:53:46.000000Z",
          turns: 15,
          turnTarget: 3380,
          type: "SL",
          withdrawable: 0,
          member_id: 321,
          editturn: null,
          limitwithdraw: 0,
          limit_withdraw_amount: null,
          bet: 81052.4
        }
      ]
    };
  },
  computed: {
 
    ...mapState("auth", ["menu", "provider",
      "gameType"
    ]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("manageMember_write")) return true;
        else return false;
      }
    },
  },
  methods: {
    ...mapActions("member", ["getTurnByid"]),
    ...mapActions("auth", ["memberManualWithdrawByOperator"]),

    async manualWd() {
      this.dialogManualWD = true
    },
    async manualWd_confirm() {
      if(this.wd_form.wdAmount == 0 || this.wd_form.wdAmount > this.wd_form.credit){
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: 'จำนวนเงินที่ต้องการถอนไม่ถูกต้อง โปรดตรวจสอบ',
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
       return
      }
      this.isLoading = true
      const result = await this.memberManualWithdrawByOperator(this.wd_form);
      this.isLoading = false;
      console.log(result)
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

        return;
      }
    },
    async searchdata() {
      this.isLoading = true
      try {
        this.serchsuccess = true;
        console.log(this.wd_form.username)
        let response = await this.getTurnByid(this.wd_form.username);


        const display_turn = await this.mapTurn(response.data)

        console.log(display_turn)
        this.response = display_turn
        this.wd_form.credit = response.data.result.balance;
        this.isLoading = false
      } catch (error) {
        this.serchsuccess = false;
        this.isLoading = false
        console.log(error);
      }
    },

    async mapTurn(data) {

      const convert_turn = JSON.parse(data.turn.turn)
      const turn_array = data.winlose.validAmount.map(x => {

        return {
          turn: convert_turn[x.gameType],
          turnTarget: data.turn[x.gameType],
          type: this.gameType[x.gameType],
          type_code: x.gameType,
          limitwithdraw: data.turn.limitwithdraw,
          sys_limit_amount: data.turn.sys_limit_amount,
          winlose: x.bet,
          outstanding: data.winlose.outstanding.find(y => y.gameType == x.gameType).bet

        }

      })

      return turn_array
    },

  }
};
</script>

<style>

</style>
