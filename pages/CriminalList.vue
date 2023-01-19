<template>
  <v-flex>
    <h3 class="mb-2">เพิ่มรายชื่อ มิจฉาชีพ</h3>
    <v-card class="pa-4 elevation-3 rounded-lg font-weight-bold">
      <v-form ref="formcreate">
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <span class="font-weight-bold"
              >ชื่อ
              <v-text-field
                outlined
                dense
                v-model="formCreate.name"
                placeholder="กรอกรายชื่อ"
                 :rules="[v => !!v || 'กรุณากรอกชื่อ']"
                hide-details="auto"
              ></v-text-field>
            </span>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span class="font-weight-bold">นามสกุล</span>
            <v-text-field
              outlined
              v-model="formCreate.lastname"
              dense
              placeholder="กรอกนามสกุล"
              hide-details="auto"
               :rules="[v => !!v || 'กรุณากกรอกนามสกุล']"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span class="font-weight-bold">ธนาคาร</span>
            <v-select
              outlined
              v-model="formCreate.bankName"
              dense
              :items="bank_options"
              placeholder="เลือกธนาคาร"
              hide-details="auto"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <span class="font-weight-bold"
              >เลขบัญชีธนาคาร
              <v-text-field
                outlined
                dense
                v-model="formCreate.bankAcc"
                placeholder="กรอกหมายเลขธนาคาร"
                hide-details="auto"
              ></v-text-field>
            </span>
          </v-col>
          <v-col cols="12" sm="6" md="3"
            ><span class="font-weight-bold">เบอร์โทรศัพท์</span>
            <v-text-field
              placeholder="กรอกเบอร์โทรศัพท์"
              outlined
              dense
              v-model="formCreate.phone"
              hide-details="auto"
            ></v-text-field
          ></v-col>
          <v-col cols="12" sm="6" md="3"
            ><br /><v-btn @click="createCriminal" color="primary" dark
              >บันทึกรายชื่อ</v-btn
            ></v-col
          >
        </v-row>
      </v-form>
    </v-card>
    <h3 class="mt-4 mb-2">เพิ่มรายชื่อ มิจฉาชีพ</h3>
    <v-card class="pa-4 elevation-3 rounded-lg font-weight-bold">
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn color="primary">แสดงข้อมูลล่าสุด 100 รายการ</v-btn></v-col
        >
        <v-col cols="9" sm="3">
          <v-text-field
            label="กรอกคำที่ต้องการค้นหา"
            outlined
            dense
            required
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="3" sm="3"> <v-btn color="success">ค้นหา</v-btn></v-col>
      </v-row>
    </v-card>
    <v-card class="mt-3  elevation-3 rounded-lg">
      <v-data-table
        :options.sync="options"
        :items="criminalList"
        :headers="headerCriminal"
      >
        <template #[`item.no`]="{index}">
          {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
        </template>
        <template #[`item.bankName`]="{item}">
          <div class="pt-2">
            <img-bank :value="item.bankName"></img-bank>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
import ImgBank from "../components/ImgBank.vue";
export default {
  components: { ImgBank },
  data() {
    return {
      formCreate: {
        name: "",
        lastname: "",
        bankName: null,
        bankAcc: "",
        phoneNumber: ""
      },
      bank_options: [
        { value: null, text: "โปรดเลือกธนาคาร" },
        { value: "TRUEWALLET", text: "TRUEWALLET - ทรูมันนี่วอลเลท" },
        { value: "SCB", text: "SCB - ธนาคารไทยพานิชย์" },
        { value: "KBANK", text: "KBANK - ธนาคารกสิกรไทย" },
        { value: "TMB", text: "TMB - ธนาคารทหารไทย" },
        { value: "BBL", text: "BBL - ธนาคารกรุงเทพ" },
        { value: "KTB", text: "KTB - ธนาคารกรุงไทย" },
        { value: "BAY", text: "BAY - ธนาคารกรุงศรีอยุธยา" },
        { value: "KKP", text: "KKP - ธนาคารเกียรตินาคินภัทร" },
        { value: "CIMB", text: "CIMB - ธนาคารซีไอเอ็มบีไทย" },
        { value: "TISCO", text: "TISCO - ธนาคารทิสโก้" },
        { value: "TBANK", text: "TBANK - ธนาคารธนชาต" },
        { value: "UOBT", text: "UOBT - ธนาคารยูโอบี" },
        { value: "TCD", text: "TCD - ธนาคารไทยเครดิตเพื่อรายย่อย" },
        { value: "LHFG", text: "LHFG - ธนาคารแลนด์แอนด์ เฮ้าส์" },
        { value: "BAAC", text: "BAAC - ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร" },
        { value: "GSB", text: "GSB - ธนาคารออมสิน" },
        { value: "GHB", text: "GHB - ธนาคารอาคารสงเคราะห์" },
        { value: "ISBT", text: "ISBT - ธนาคารอิสลามแห่งประเทศไทย" }
      ],
      options: {},
      headerCriminal: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
          width: "50px"
        },
        {
          text: "ชื่อ",
          value: "name",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "นามสกุล",
          value: "lastname",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "ธนาคาร",
          value: "bankName",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "เลขบัญชีธนาคาร",
          value: "bankAcc",
          align: "center",
          sortable: false
        },
        {
          text: "เบอร์โทรศัพท์",
          value: "phone",
          align: "center",
          sortable: false
        },
        {
          text: "เพิ่มเมื่อ",
          value: "created_at",
          align: "center",
          sortable: false
        },
        {
          text: "โดย",
          value: "operator",
          align: "center",
          sortable: false
        }
      ],
      criminalList: []
    };
  },
  async fetch() {
    let { data } = await this.getCriminallist();
    this.criminalList = data.data;
  },
  methods: {
    ...mapActions("setting", ["getCriminallist", "createCriminallist"]),
    async createCriminal() {
      if(this.$refs.formcreate.validate()){
      let payload = {
        ...this.formCreate,
        operator: this.$store.state.auth.agent.toUpperCase()
      };
      // console.log(payload, "payload");
      await this.createCriminallist(payload);
      await this.$swal({
        icon: "success",
        title: `เพิ่มรายชื่อ มิจฉาชีพเรียบร้อย`,
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      }).then(async result => {
        if (result) {
          this.$refs.formcreate.reset();
          await this.$fetch();
        }
      });
      }
     
    }
  }
};
</script>

<style></style>
