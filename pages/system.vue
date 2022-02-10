<template>
  <v-flex>
    <h3 class="mb-4">ตั้งค่าระบบ</h3>
    <v-card class="pa-3 elevation-3 rounded-lg font-weight-bold">
      <v-row>
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
            v-model="datasetting.turnNobonus"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          ถอนเงินขั้นต่ำ ( 0 = ไม่มีขั้นต่ำ)
          <v-text-field
            outlined
            dense
            hide-details="auto"
            v-model="datasetting.wdlimitTime"
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
            v-model="datasetting.wd_auto_amount"
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
            v-model="datasetting.wdlimitcredit"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          อั้นถอนจำนวนครั้งต่อวัน
          <v-switch
            hide-details="auto"
            v-model="datasetting.wdwhenoutstanding"
          ></v-switch>
        </v-col>
        <v-col cols="12" sm="6">
          อั้นจำนวนครั้งในการถอนต่อวัน
          <v-text-field
            :disabled="datasetting.wdwhenoutstanding == false"
            :filled="datasetting.wdwhenoutstanding == false"
            :outlined="datasetting.wdwhenoutstanding"
            v-model="datasetting.least_wd_credits"
            dense
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-card-actions>
        <v-btn color="primary" class="mx-auto">บันทึก</v-btn>
      </v-card-actions>
    </v-card>
    <h3 class="my-4">ตั้งค่าข้อความต้อนรับ</h3>
    <v-card class="pa-3 elevation-3 rounded-lg ">
      <v-switch
        hide-details="auto"
        class="my-4 font-weight-bold"
        label="สถานะ"
        :true-value="1"
        :false-value="0"
        v-model="message.status"
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
            <div class="font-weight-bold ">
              รูปภาพ ขนาดไม่เกิน 1 MB 500x500 px(ถ้ามี)
            </div>
            <img
              class="img_promotion"
              :src="message.img"
              alt=""
              style="width: 330px !important;"
            />
            <div>
              <v-file-input
                v-model="message.img"
                color="deep-purple accent-4"
                counter
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
          <v-btn color="primary" class="mx-auto">บันทึก</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      datasetting: {},
      message: {}
    };
  },
  async fetch() {
    try {
      let response = await this.getSetting();
      this.datasetting = response.data.datasetting;
      this.message = response.data.message;
    } catch (error) {}
  },
  methods: {
    ...mapActions("setting", ["getSetting"])
  }
};
</script>

<style></style>
