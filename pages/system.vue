<template>
  <v-flex>
    <loading-page v-if="loading"></loading-page>
    <h3 class="mb-4">ตั้งค่าระบบ</h3>
    <v-card class="pa-3 elevation-3 rounded-lg font-weight-bold">
      <v-row v-if="datasetting">
        <v-col cols="12" sm="6">
          ชื่อเว็ปไซต์
          <v-text-field
            filled
            disabled
            v-model="datasetting.member_site_name"
            dense
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          COMPANY KEY
          <v-text-field
            filled
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.companykey"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          รหัสเอเย่น
          <v-text-field
            filled
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.companyname"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          Line@
          <v-text-field
            outlined
            dense
            hide-details="auto"
            v-model="datasetting.companynlineurl"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ลิ้งลงทะเบียน
          <v-text-field
            filled
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.register_link"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ลิ้งค์เข้าสู่ระบบ
          <v-text-field
            filled
            disabled
            dense
            hide-details="auto"
            v-model="datasetting.login_link"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          เทิร์นเมื่อไม่รับโบนัส
          <v-text-field
            outlined
            dense
            hide-details="auto"
            placeholder="BEGXT"
            v-model.number="datasetting.turnNobonus"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ถอนเงินขั้นต่ำ ( 0 = ไม่มีขั้นต่ำ)
          <v-text-field
            outlined
            dense
            hide-details="auto"
            v-model.number="datasetting.least_wd_credits"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ถอนออโต้ทั้งระบบ
          <v-switch
            hide-details="auto"
            v-model="datasetting.wdautoAll"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6">
          จำนวนเงินที่อนุญาติให้ถอนออโต้
          <v-text-field
            :disabled="datasetting.wdautoAll == false"
            :filled="datasetting.wdautoAll == false"
            :outlined="datasetting.wdautoAll"
            dense
            hide-details="auto"
            v-model.number="datasetting.wd_auto_amount"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          อั้นถอนต่อวัน
          <v-switch
            hide-details="auto"
            v-model="datasetting.wdlimit"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6">
          จำนวนเงินที่อั้นถอนต่อวันต่อคน
          <v-text-field
            :disabled="datasetting.wdlimit == false"
            :filled="datasetting.wdlimit == false"
            :outlined="datasetting.wdlimit"
            dense
            hide-details="auto"
            v-model.number="datasetting.wdlimitcredit"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          อั้นถอนจำนวนครั้งต่อวัน
          <v-switch
            hide-details="auto"
            v-model="datasetting.wdlimit_time_status"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6">
          อั้นจำนวนครั้งในการถอนต่อวัน
          <v-text-field
            :disabled="datasetting.wdlimit_time_status == false"
            :filled="datasetting.wdlimit_time_status == false"
            :outlined="datasetting.wdlimit_time_status"
            v-model.number="datasetting.wdlimitTime"
            dense
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-card-actions>
        <v-btn
          color="primary"
          @click="update"
          class="mx-auto btn_sty"
          :disabled="canwrite"
          >บันทึก</v-btn
        >
      </v-card-actions>
    </v-card>
    <h3 class="my-4">ตั้งค่าข้อความต้อนรับ</h3>
    <v-card class="pa-3 elevation-3 rounded-lg">
      <v-switch
        hide-details="auto"
        class="my-4 font-weight-bold"
        label="สถานะ"
        v-model.number="message.status"
        @change="changeStatusMessage"
      ></v-switch>
      <div v-if="message.status == 1">
        <v-row>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">ส่วนบนสุด (HEADER)</span>
            <v-text-field
              outlined
              dense
              v-model="message.header"
              hide-details="auto"
              placeholder="กรอกชื่อ HEADER"
              class="mb-2"
            ></v-text-field>
            <span class="font-weight-bold"> หัวข้อเรื่องที่จะประกาศ</span>
            <v-text-field
              outlined
              dense
              v-model="message.topic"
              hide-details="auto"
              placeholder="กรอกหัวข้อเรื่องที่จะประกาศ"
              class="mb-2"
            ></v-text-field>
            <span class="font-weight-bold">รายละเอียด (ถ้ามี)</span>
            <v-textarea
              name="input-7-1"
              filled
              auto-grow
              placeholder="กรอกรายละเอียด"
              v-model="message.description"
            ></v-textarea>
          </v-col>
          <v-col cols="12" sm="6" class="text-center pa-5">
            <div class="font-weight-bold">
              รูปภาพ ขนาดไม่เกิน 1 MB 500x500 px(ถ้ามี)
            </div>
            <img
              class="img_promotion"
              :src="message.img"
              alt=""
              style="width: 330px !important"
            />
            <div>
              <v-file-input
                color="deep-purple accent-4"
                counter
                @change="selectFile"
                accept="image/png, image/jpeg, image/bmp"
                clearable
                dense
                hide-details="auto"
                label="เปลี่ยนรูปข้อความต้อนรับ"
                placeholder="เปลี่ยนรูปข้อความต้อนรับ"
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
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn
            :disabled="canwrite"
            color="primary"
            @click="handleUpdateMessage"
            class="mx-auto btn_sty"
            >บันทึก</v-btn
          >
        </v-card-actions>
      </div>
    </v-card>
    <div v-if="notificate.web_status">
      <h3 class="my-4">การตั้งค่าอื่นๆ</h3>
      <v-card class="pa-3 elevation-3 rounded-lg">
        <span class="font-weight-bold">รายการ bet</span>
        <div class="d-flex">
          <v-switch
            hide-details
            v-model="notificate.fillter_bet_status"
            class="my-4 font-weight-bold"
          ></v-switch>
          <div class="col-10 col-sm-4">
            <v-text-field
              dense
              outlined
              :disabled="!notificate.fillter_bet_status"
              v-model="notificate.fillter_bet_amount"
            ></v-text-field>
          </div>
        </div>
        <span class="font-weight-bold"> รายการแตก</span>
        <div class="d-flex">
          <v-switch
            v-model="notificate.fillter_payout_status"
            hide-details
            class="my-4 font-weight-bold"
          ></v-switch>
          <div class="col-10 col-sm-4">
            <v-text-field
              :disabled="!notificate.fillter_payout_status"
              v-model="notificate.fillter_payout_amount"
              dense
              outlined
            ></v-text-field>
          </div>
        </div>
        <v-card-actions class="justify-center">
          <v-btn
            :disabled="canwrite"
            color="primary"
            @click="handleUpdateIncomeNotificate"
            class="mx-auto btn_sty"
            >บันทึก</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </v-flex>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import LoadingPage from "../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      file: null,
      filename: null,
      filecheck: null,
      datasetting: {},
      message: {},
      loading: false,
      notificate: {},
    };
  },
  async fetch() {
    this.loading = true;
    try {
      let response = await this.getSetting();
      this.datasetting = response;
      let message = await this.getMessage();
      this.message = message;
      // this.notificate = await this.$store.dispatch("setting/getIncome");
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
    // this.message = response.message;
  },
  computed: {
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("settingSystem_write")) return true;
        else return false;
      }
    },
  },
  methods: {
    ...mapActions("setting", [
      "getSetting",
      "getMessage",
      "createUser",
      "updateSetting",
      "updateMessage",
    ]),
    selectFile(event) {
      if (event) {
        this.file = event;
        this.message.img = URL.createObjectURL(this.file);
      }
    },
    async saveImage() {
      if (this.file) {
        const data = new FormData();

        data.append("file", this.file);

        try {
          this.loading = true;
          let imageupdate = await this.$axios.post(
            `https://admin-static-api-qlws7pv5wa-as.a.run.app/api/Update/file/Dynamic/test/secret123`,
            data
          );
          this.message.img = imageupdate.data.image;
          console.log("img", imageupdate);

          this.loading = false;
        } catch (error) {
          this.loading = false;
          console.log(error);
        }
      }
    },
    ...mapMutations("setting", ["setAllsetting", "setAllmessage"]),
    async handleUpdateIncomeNotificate() {
      this.$swal({
        title: "บันทึกการตั้งค่า notification ?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.$store.dispatch(
              "setting/setNotification",
              this.notificate
            );
          } catch (error) {
            console.log(error);
          }

          this.$swal({
            icon: "success",
            title: "บันทึกสำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          }).then(async (result) => {
            if (result) {
              await this.$fetch();
            }
          });
        }
      });
    },
    async handleUpdateMessage() {
      this.message.operator = this.$store.state.auth.name;
      this.$swal({
        title: "บันทึกการตั้งค่า Message ?",
        icon: "question",
        showCancelButton: true,
        allowOutsideClick: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.saveImage();
          // console.log(this.formCreate)
          await this.updateMessage(this.message);
          this.$swal({
            icon: "success",
            title: "บันทึกสำเร็จ",
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 1500,
          }).then(async (result) => {
            if (result) {
              await this.$fetch();
            }
          });
        }
      });
    },
    async changeStatusMessage(status) {
      try {
        this.message.status = status;
        await this.updateMessage(this.message);
        this.$swal({
          icon: "success",
          title: `${status ? "เปิด" : "ปิด"}ข้อความต้อนรับสำเร็จ`,
          allowOutsideClick: false,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async update() {
      try {
        this.$swal({
          title: "ต้องการบันทึกการตั้งค่าหรือไม่ ?",
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // console.log(this.formCreate)
            await this.updateSetting(this.datasetting);
            this.$swal({
              icon: "success",
              title: "บันทึกสำเร็จ",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              if (result) {
                await this.$fetch();
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async createduser() {
      try {
        await this.datasetting(this.datasetting);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
