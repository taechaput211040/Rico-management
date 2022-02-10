<template>
  <v-flex>
    <h3 class="mb-2">เพิ่มรายชื่อ มิจฉาชีพ</h3>
    <v-card class="pa-4 elevation-3 rounded-lg font-weight-bold">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <span class="font-weight-bold"
            >ชื่อ
            <v-text-field
              outlined
              dense
              placeholder="กรอกรายชื่อ"
              hide-details="auto"
            ></v-text-field>
          </span>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <span class="font-weight-bold">นามสกุล</span>
          <v-text-field
            outlined
            dense
            placeholder="กรอกนามสกุล"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <span class="font-weight-bold">ธนาคาร</span>
          <v-select
            outlined
            dense
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
            hide-details="auto"
          ></v-text-field
        ></v-col>
        <v-col cols="12" sm="6" md="3"
          ><br /><v-btn color="primary" dark>บันทึกรายชื่อ</v-btn></v-col
        >
      </v-row>
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
        hide-default-footer
        :items="criminalList"
        :headers="headerCriminal"
      >
        <template #[`item.no`]="{index}">
          <span class="font-weight-bold">
            {{ index + 1 }}
          </span>
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
    let response = await this.getCriminallist();
    this.criminalList = response.data;
  },
  methods: {
    ...mapActions("setting", ["getCriminallist"])
  }
};
</script>

<style></style>
