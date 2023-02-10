<template>
  <div>
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
          :label="`สถานะ`"
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
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  ยอดเงินรางวัล:
                  <v-text-field
                    required
                    v-model="settingitem.credit"
                    type="number"
                    dense
                    outlined
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  โอกาสถูก(%):
                  <v-text-field
                    v-model="settingitem.award_percent"
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
                    อั้นถอน(เป็นจำนวนเท่า) :<br />
                    <v-text-field
                      dense
                      hide-details="auto"
                      outlined
                      type="number"
                      v-model="$v.turn.wdlimit.$model"
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
                      v-model="$v.turn.SLOT.$model"
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
                      v-model="$v.turn.FOOTBALL.$model"
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
                      v-model="$v.turn.ESPORT.$model"
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
                      v-model="$v.turn.HORSERACING.$model"
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
                      v-model="$v.turn.CASINO.$model"
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
                      v-model="$v.turn.LOTTO.$model"
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
                      v-model="$v.turn.rate.$model"
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  numeric,
  minValue,
} from "vuelidate/lib/validators";
export default {
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
    await this.$axios
      .$get(
        `https://luckydraw-ehhif4jpyq-as.a.run.app/api/v1/setting_list/704bd453-4b05-4e68-a8b3-a906fe6cc74d`,
        {
          auth: {
            username: "taechaput",
            password: "tong211040",
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
  },

  async mounted() {
    try {
      this.turn = await this.$axios.$get(
        "https://all-wheel-ehhif4jpyq-as.a.run.app/api/Wheel/admin/704bd453-4b05-4e68-a8b3-a906fe6cc74d"
      );
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    openSetting(item, index) {
      this.$bvModal.show("setting-roulette") == true;
      this.settingitem = item;
      this.no = index + 1;
    },
    setting(item) {
      this.settingitem = Object.assign({}, item);
      this.setting_roulette = true;
    },
    async settingOk() {
      await this.$axios
        .$put(
          `http://35.247.150.28/api/v1/setting/${this.settingitem.id}`,
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
      this.loading = true;
      this.turn.service_id = this.roullet[0].agent_id;
      try {
        await this.$axios.patch(
          `https://all-wheel-ehhif4jpyq-as.a.run.app/api/Wheel/admin/704bd453-4b05-4e68-a8b3-a906fe6cc74d`,
          this.turn
        );
        this.showSuccessAlert("บันทึกสำเร็จ");
        this.loading = false;
      } catch (error) {
        this.showErrorAlert("error");
        this.loading = false;
      }
    },
    switchstatus(status) {
      status = !status;
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
