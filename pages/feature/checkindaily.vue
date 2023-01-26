<template>
  <v-flex>
    <h3>ตั้งค่าเช็คอินรายวัน</h3>

    <v-card class="pa-4 rounded-lg">
      <h4 class="mb-3 text-center">
        รูปภาพพื้นหลัง ขนาดไม่เกิน 500 KB 650x650 px(PNG หรือ JPG เท่านั้น)
      </h4>
      <div class="text-center">
        <img
          v-if="image"
          :src="image.default_img"
          style="width: 235px"
          alt=""
        />
      </div>
      <div v-show="changepic == true" class="col-md-4 col-12 mx-auto">
        <v-file-input
          :value="image.default_img"
          color="deep-purple accent-4"
          counter
          accept="image/png, image/jpeg, image/bmp"
          clearable
          dense
          hide-details="auto"
          label="อัพโหลดไฟล์รูปโปรโมชัน"
          placeholder="รูปโปรโมชัน"
          prepend-icon="mdi-camera"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ index, text }">
            <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
            >
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </div>
      <div class="d-md-flex justify-md-center">
        <v-btn
          :disabled="canwrite"
          class="mx-2"
          color="primary"
          @click="changepic = true"
          dark
          v-show="changepic == false"
          >เปลี่ยนรูป</v-btn
        >

        <v-btn
          color="warning"
          :disabled="canwrite"
          class="mx-2"
          dark
          @click="useDefaultImage()"
        >
          ใช่รูปเริ่มต้น</v-btn
        >
        <v-btn
          :disabled="canwrite"
          color="success"
          class="mx-2"
          dark
          @click="saveImage()"
        >
          บันทึก</v-btn
        >
      </div>
    </v-card>

    <v-card class="py-4 px-2 ounded-lg mt-4">
      <div class="row justify-end mb-4">
        <div class="col-12 col-md-6 p-0">
          <input
            :disabled="canwrite"
            class="form-check-input"
            true-value="true"
            false-value="false"
            @change="getSelectedItem()"
            type="checkbox"
            v-model="checkinActive"
          />
          <label class="form-check-label px-2">เปิดใช้งาน</label>
        </div>

        <v-spacer></v-spacer>
        <div class="col-12 col-md-3 p-0">
          <v-select
            :items="selectDay"
            filled
            hide-details="auto"
            v-on:change="getSelectedItem"
            v-model="selectedate"
            label="จำนวนวัน"
          >
          </v-select>
        </div>
      </div>
      <div class="mb-4 p-md-3">
        <div class="mx-2 row">
          <div class="calendar mt-4">
            <div class="row">
              <div
                v-for="(item, index) in datedata"
                :key="index"
                class="col-style"
              >
                <div class="p-2">
                  <span class="font-weight-bold font-italic primary--text">
                    วันที่ {{ item.day }}</span
                  >
                  <div>โบนัสที่ได้</div>

                  <v-text-field
                    type="number"
                    hide-details="auto"
                    shaped
                    class="pt-2"
                    dense
                    v-model.number="item.credit"
                  />

                  <div class="py-2">
                    <input
                      :true-value="true"
                      :false-value="false"
                      type="checkbox"
                      v-model="item.bonus"
                    />
                    <label class="">โบนัสเติมเงิน</label>
                  </div>
                  <div class="card-mod" v-if="item.bonus == '1'">
                    <span class="font-weight-bold purple--text"
                      >ยอดฝากเพื่อรับโบนัส</span
                    >
                    <v-text-field
                      v-if="item.bonus == '1'"
                      type="number"
                      hide-details="auto"
                      solo
                      outlined
                      dense
                      placeholder="ฝากเพิ่มขั้นต่ำ"
                      v-model.number="item.min_deposit"
                    />
                    <span class="font-weight-bold green--text"
                      >ได้โบนัสเพิ่ม</span
                    >
                    <v-text-field
                      v-if="item.bonus == '1'"
                      type="number"
                      hide-details="auto"
                      solo
                      outlined
                      dense
                      class="text-center"
                      placeholder="โบนัสเครดิต"
                      v-model.number="item.bonus_credit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-end mt-3">
            <div class="ma-2">
              <v-btn
                color="success"
                :disabled="canwrite"
                @click="saveCheckin"
                class="btn btn_sty"
              >
                บันทึก
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </v-card>
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
                v-show="!$v.turn.wdlimit.required & $v.turn.wdlimit.$dirty"
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
                v-show="!$v.turn.FOOTBALL.required & $v.turn.FOOTBALL.$dirty"
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
                  !$v.turn.HORSERACING.required & $v.turn.HORSERACING.$dirty
                "
              >
                กรุณาใส่จำนวนเทิร์น
              </div>
              <div class="validate" v-show="!$v.turn.HORSERACING.minValue">
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
          </div>
          <v-btn
            color="primary"
            :disabled="canwrite"
            type="submit"
            class="py-3 mt-3 btn_sty"
          >
            บันทึก
          </v-btn>
        </form>
      </div>
    </v-card>

    <h3 class="mt-4">ประวัติการเชคอินของลูกค้า</h3>
    <v-row>
      <div class="col-12 col-sm-3">
        <el-date-picker
          arrow-control
          placeholder="วันที่"
          style="width: 100%"
          v-model="date"
        />
      </div>
      <div class="col-12 col-sm-3">
        <v-text-field
          v-model="username"
          solo
          outlined
          dense
          hide-details="auto"
        ></v-text-field>
      </div>
      <div class="col-12 col-sm-3">
        <v-btn color="primary" @click="searchHistory"
          ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
        >
      </div>
    </v-row>

    <v-card class="mt-2">
      <v-data-table :headers="headerReport" hide-default-footer> </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from "vuex";
const jwtPayload =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoYXNoIjoiMWMwODQwNzk3MzU0ZjczZDc4NTExMTI2YWVhYTBhMjYifQ.hNCxVRvxU8doLMuj95aTnlV0_pIMgSNZJyqDsXGVWkA";
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
        minValue: minValue(0),
      },
      ESPORT: {
        required,
        numeric,
        minValue: minValue(0),
      },
      FOOTBALL: {
        required,
        numeric,
        minValue: minValue(0),
      },
      HORSERACING: {
        required,
        numeric,
        minValue: minValue(0),
      },
      LOTTO: {
        required,
        numeric,
        minValue: minValue(0),
      },
      SLOT: {
        required,
        numeric,
        minValue: minValue(0),
      },
      wdlimit: {
        required,
        numeric,
        minValue: minValue(0),
      },
    },
  },
  data() {
    return {
      username: "",
      date: new Date().toISOString().slice(0, 10),
      headerReport: [
        {
          text: "รายการที่",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "วันที่ - เวลา",
          value: "date",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "วันเช็คอิน",
          value: "datecheckin",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "เงินเครดิตที่ได้",
          value: "creditbalance",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
      ],
      CheckinConfig: {
        image:
          "https://image.smart-ai-api.com/public/image-storage/test-1fed280f-ea72-4baf-800f-13344d2c66d3-Untitled-2.png",
        default_image:
          "https://image.smart-ai-api.com/public/image-storage/Checkin-1142506d-c6bf-4c36-8033-e348779a119a-20210916080003d438600433274fba919784da7d59c960.png",
        feature_status: true,
        checkin: {
          type: "week",
          config: [
            {
              bonus: true,
              bonus_credit: 10,
              credit: 1,
              day: 1,
              min_deposit: 100,
            },
            {
              bonus: true,
              bonus_credit: 10,
              credit: 2,
              day: 2,
              min_deposit: 100,
            },
            {
              bonus: true,
              bonus_credit: 10,
              credit: 3,
              day: 3,
              min_deposit: 100,
            },
            {
              bonus: true,
              bonus_credit: 10,
              credit: 4,
              day: 4,
              min_deposit: 100,
            },
            {
              bonus: true,
              bonus_credit: 20,
              credit: 5,
              day: 5,
              min_deposit: 100,
            },
            {
              bonus: true,
              bonus_credit: 20,
              credit: 6,
              day: 6,
              min_deposit: 100,
            },
            {
              bonus: true,
              bonus_credit: 20,
              credit: 7,
              day: 7,
              min_deposit: 100,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 8,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 9,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 10,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 11,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 12,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 13,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 14,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 15,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 16,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 17,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 18,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 19,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 20,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 21,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 22,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 23,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 24,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 25,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 26,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 27,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 28,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 29,
              min_deposit: 0,
            },
            {
              bonus: false,
              bonus_credit: 0,
              credit: 1,
              day: 30,
              min_deposit: 0,
            },
          ],
          active: true,
        },
        turn: {
          CASINO: 10,
          ESPORT: 5,
          FOOTBALL: 5,
          HORSERACING: 5,
          LOTTO: 5,
          SLOT: 5,
          wdlimit: 0,
        },
      },
      test: {
        bonus: true,
        bonus_credit: 10,
        credit: 1,
        day: 1,
        min_deposit: 100,
      },
      changepic: false,
      file: null,
      filename: null,
      filecheck: null,
      url: null,
      changepicIsClick: false,
      image: {
        url: null,
        default_img:
          "https://image.smart-ai-api.com/public/image-storage/Checkin-1142506d-c6bf-4c36-8033-e348779a119a-20210916080003d438600433274fba919784da7d59c960.png",
      },

      feature_status: true,
      today: new Date().toISOString().slice(0, 10),
      loading: false,
      checkinActive: true,
      checkinHistory: null,
      bonusstatus: "false",
      selectedate: "week",
      Renderdate: {},
      datedata: {},
      selectDay: [
        { value: "week", text: "ราย 7 วัน" },
        { value: "half", text: "ราย 15 วัน" },
        { value: "month", text: "ราย 30 วัน" },
      ],
      turn: {
        CASINO: 60,
        ESPORT: 60,
        FOOTBALL: 60,
        HORSERACING: 60,
        LOTTO: 60,
        SLOT: 5,
        wdlimit: 0,
      },
      selectRate: [
        { value: 0, text: "รายชั่วโมง" },
        { value: 1, text: "รายวัน" },
      ],
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
  async mounted() {
    this.loading = true;
  },
  async fetch() {
    await this.LoginCheckindialy();
    await this.getConfig();
  },
  methods: {
    async LoginCheckindialy() {
      try {
        let { data } = await this.$axios.post(
          `${process.env.ALL_CHECKIN}/api/auth/login`,
          {
            hash:
              localStorage.getItem("hash") ??
              this.$store.state.setting?.setting?.hash,
          }
        );
        console.log(data, "data");
        this.token = data.token;
      } catch (error) {
        console.log(error);
      }
    },
    async getConfig() {
      try {
        console.log(`Bearer ${this.token}`);
        let res = await this.$axios.get(
          `${process.env.ALL_CHECKIN}/api/config`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        //  console.log(response.data)
        let response = res.data;
        this.image.url = response.image;
        this.Renderdate = response.checkin.config.map((e) => {
          if (!e.bonus) {
            e.bonus_credit = 0;
            e.min_deposit = 0;
          }
          if (e.bonus == "1") e.bonus = true;
          if (e.bonus == "0") e.bonus = false;
          return e;
        });
        this.checkinActive = response.checkin.active;
        this.selectedate = response.checkin.type;
        this.turn = response.turn;
        this.datedata = this.Renderdate;
        this.getSelectedItem();
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.feature_status = false;
        // this.showErrorAlert(error.response.message);
        this.loading = false;
        this.Renderdate = [];
      }
    },
    useDefaultImage() {
      this.changepicIsClick = false;
      let im = this.image.default_img;
      this.image.url = im;
      this.url = im;
    },
    async saveImage() {
      if (this.file) {
        const data = new FormData();

        data.append("file", this.file);

        try {
          this.loading = true;
          let imageupdate = await this.$axios.post(
            `https://admin-static-api-ehhif4jpyq-as.a.run.app/api/Update/file/Dynamic/test/secret123`,
            data
          );
          this.image.url = imageupdate.data.image;
          console.log("img", imageupdate);
          await this.saveCheckin();

          this.loading = false;
        } catch (error) {
          this.loading = false;
          console.log(error);
        }
      } else {
        await this.saveCheckin();
      }
    },
    useDefaultImage() {
      this.changepicIsClick = false;
      let im = this.image.default_img;
      this.image.url = im;
      this.url = im;
    },
    selectFile(event) {
      console.log(event);
    },
    changPicture() {
      this.changepicIsClick = !this.changepicIsClick;
      this.image.url = null;
      this.url = null;
      this.filecheck = false;
    },
    async getSelectedItem() {
      if (this.selectedate === "week") {
        this.datedata = this.Renderdate.slice(0, 7);
      }
      if (this.selectedate === "half") {
        this.datedata = this.Renderdate.slice(0, 15);
      }
      if (this.selectedate === "month") {
        this.datedata = this.Renderdate.slice(0, 31);
      }
    },
    openSetting() {
      this.$bvModal.show("setting-checkin") == true;
    },
    async submitform() {
      if (this.$v.turn.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.$v.turn.$touch();

        try {
          await this.$axios.put(
            `${process.env.ALL_CHECKIN}/api/config/turnover`,
            this.turn,
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          this.loading = false;
          this.$swal.fire("สำเร็จ", "บันทึกข้อมูลสำเร็จ", "success", "OK");
          // this.showSuccessAlert("บันทึกข้อมูลสำเร็จ");
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
    async saveCheckin() {
      this.loading = true;

      try {
        await this.$axios.put(
          `${process.env.ALL_CHECKIN}/api/config`,
          {
            type: this.selectedate,
            active: this.checkinActive,
            reward: this.Renderdate,
            background_image: this.image.url,
          },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.$swal.fire("สำเร็จ", "บันทึกข้อมูลสำเร็จ", "success", "OK");
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async searchHistory() {
      try {
        let date = this.$moment(this.date).format("YYYY-MM-DD");

        this.loading = true;
        let res = await this.$axios.get(
          `${process.env.ALL_CHECKIN}/api/config/checkin/history/${this.username}/${date}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        this.loading = false;
        this.checkinHistory = res.data.logs;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
      return;
    },
  },
};
</script>

<style></style>
