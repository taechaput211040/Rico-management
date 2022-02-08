<template>
  <v-flex>
    <h3>สมัครสมาชิกใหม่</h3>
    <v-card class="mt-2 pa-3 elevation-4 mt-5 rounded-lg">
      <v-form ref="form" v-model="valid" lazy-validation
        ><v-row class="pa-3">
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic">ชื่อ</span>
            <v-text-field
              placeholder="กรอกชื่อ"
              hide-details="auto"
              v-model="formRegister.name"
              dense
              outlined
              :rules="rulesFrom.nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >นามสกุล</span
            >
            <v-text-field
              placeholder="กรอกนามสกุล"
              hide-details="auto"
              v-model="formRegister.lastnameRules"
              :rules="rulesFrom.nameRules"
              dense
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >ชื่อ (ภาษาอังกฤษ)*ไม่บังคับ</span
            >
            <v-text-field
              placeholder="กรอกชื่อ (ภาษาอังกฤษ)"
              hide-details="auto"
              v-model="formRegister.engName"
              dense
              outlined
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >นามสกุล (ภาษาอังกฤษ)*ไม่บังคับ</span
            >
            <v-text-field
              placeholder="กรอกนามสกุล (ภาษาอังกฤษ)"
              hide-details="auto"
              dense
              v-model="formRegister.engLastname"
              outlined
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >ธนาคาร</span
            >
            <v-select
              v-model="formRegister.bank"
              :rules="rulesFrom.bankRules"
              hide-details="auto"
              dense
              outlined
              :items="bank"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >หมายเลขบัญชี / หมายเลข TRUEWALLET</span
            >
            <v-text-field
              placeholder="หมายเลขบัญชี / หมายเลข TRUEWALLET"
              hide-details="auto"
              dense
              type="number"
              @keydown="e => rangeInput(e, 13, formRegister.bankNumber)"
              :rules="rulesFrom.banknumRules"
              v-model="formRegister.bankNumber"
              outlined
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >เบอร์โทรศัพท์</span
            >
            <v-text-field
              placeholder="กรอบเบอร์โทรศัพท์"
              hide-details="auto"
              dense
              type="number"
              :rules="rulesFrom.phoneRules"
              v-model="formRegister.phone"
              @keydown="e => rangeInput(e, 11, formRegister.phone)"
              outlined
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >ไลน์ ID</span
            >
            <v-text-field
              placeholder="กรอก LINE ID"
              hide-details="auto"
              dense
              outlined
              v-model="formRegister.lindId"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >ผู้แนะนำ</span
            >
            <v-text-field
              placeholder="ถ้าไม่มีไม่ต้องกรอก"
              hide-details="auto"
              dense
              outlined
              v-model="formRegister.recomander"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >รู้จักจาก</span
            >
            <v-select
              hide-details="auto"
              v-model="formRegister.knowfrom"
              dense
              outlined
            ></v-select
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >หมายเหตุ</span
            >
            <v-text-field
              hide-details="auto"
              dense
              outlined
              v-model="formRegister.remark"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >วันเกิด</span
            >
            <el-date-picker
              class="full-width"
              v-model="formRegister.birthdate"
              arrow-control
              placeholder="วันที่"
              style="width: 100%"
            />
          </v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic">เพศ</span>
            <v-radio-group mandatory v-model="formRegister.gender">
              <v-radio label="ชาย" value="ชาย"></v-radio>
              <v-radio label="หญิง" value="หญิง"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >โบนัส</span
            >
            <v-select
              v-model="formRegister.gender"
              hide-details="auto"
              dense
              outlined
              required
            ></v-select
          ></v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >อนุมัติฝากออโต้</span
            >
            <v-switch v-model="formRegister.dpauto"></v-switch>
          </v-col>
          <v-col cols="12" sm="3"
            ><span class="purple--text font-weight-bold font-italic"
              >อนุมัติถอนออโต้</span
            >
            <v-switch v-model="formRegister.wdauto"></v-switch
          ></v-col> </v-row
      ></v-form>

      <v-card-actions class="justify-center mt-3">
        <v-btn color="success" @click="submitform">สมัครสมาชิกใหม่</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      rulesFrom: {
        nameRules: [v => !!v || "กรุณากรอกชื่อ"],
        lastnameRules: [v => !!v || "กรุณากรอกนามสกุล"],
        bankRules: [v => !!v || "กรุณาเลือกธนาคาร"],
        banknumRules: [
          v => !!v || "กรุณากรอกหมายเลขธนาคาร",
          v =>
            (v && v.length <= 13 && v.length >= 10) ||
            "กรุณากรอกหมายเลขธนาคารให้ถูกต้อง 10 ถึง 13หลัก"
        ],
        phoneRules: [
          v => !!v || "กรุณากรอกหมายเลขมือถือให้ถุกต้อง",
          v =>
            (v && v.length <= 11 && v.length >= 10) ||
            "กรณากรอกหมายเลขโทรศัพท์ 10 ถึง11หลัก"
        ]
      },
      bank: [
        { value: "SCB", text: "SCB - ธนาคารไทยพานิชย์" },
        { value: "TRUEWALLET", text: "TRUEWALLET - ทรูวอเล็ต" },
        { value: "KBANK", text: "KBANK - ธนาคารกสิกรไทย" }
      ],
      formRegister: {
        name: "",
        lastname: "",
        engName: "",
        engLastname: "",
        bank: "SCB",
        bankNumber: "",
        phone: "",
        lindId: "",
        recomander: "",
        knowfrom: "",
        remark: "",
        birthdate: "",
        gender: "ชาย",
        bonus: 0,
        dpauto: false,
        wdauto: false
      }
    };
  },
  methods: {
    submitform() {
      if (this.$refs.form.validate()) {
        console.log("submit");
      }
    },
    rangeInput(self, length, itemmodel) {
      if (/[0-9]/g.test(self.key) && itemmodel.length >= length) {
        self.preventDefault();
      }
    }
  }
};
</script>

<style></style>
