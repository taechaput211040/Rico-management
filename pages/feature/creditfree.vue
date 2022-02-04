<template>
  <div>
    <h3 class="mb-4">Free Credit</h3>
    <v-card class="pa-3">
      <div class="d-flex">
        <h3 class="mb-4">รอบทั้งหมด</h3>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="create()">สร้าง</v-btn>
      </div>
      <v-card elevation="1" class="mt-3">
        <v-data-table :headers="headersfreecrdit" hide-default-footer>
        </v-data-table>
      </v-card>
    </v-card>
    <v-dialog v-model="createmodel" max-width="800px" height="auto">
      <v-card class="pa-5 font-weight-bold">
        <v-card-title>
          <h2 class="font-weight-bold py-3 mx-auto">กรอกรายละเอียด</h2>
        </v-card-title>
        <v-row>
          <v-col cols="12">
            ชื่อกิจกรรม
            <v-text-field
              outlined
              dense
              hide-details="auto"
              placeholder="กรอกชื่อกิจกรรม"
            ></v-text-field
          ></v-col>

          <v-col cols="12" sm="6">
            จำนวนเครดิตฟรีที่ได้
            <v-text-field
              outlined
              dense
              hide-details="auto"
              placeholder="จำนวนเครดิตฟรีที่ได้"
            ></v-text-field
          ></v-col>
          <v-col cols="12">
            <v-row class="px-2"
              ><v-col cols="12" sm="6" class="px-2">
                เวลาเปิด
                <v-row>
                  <v-col cols="7">
                    <el-date-picker
                      class="full-width"
                      arrow-control
                      placeholder="วันที่"
                      style="width: 100%"
                    />
                  </v-col>
                  <v-col>
                    <el-time-picker
                      class="full-width"
                      format="HH:mm"
                      arrow-control
                      placeholder="เวลา"
                      style="width: 100%"
                    >
                    </el-time-picker>
                  </v-col> </v-row></v-col
              ><v-col cols="12" sm="6" class="px-2">
                เวลาปิด
                <v-row>
                  <v-col cols="7">
                    <el-date-picker
                      class="full-width"
                      arrow-control
                      placeholder="วันที่"
                      style="width: 100%"
                    />
                  </v-col>
                  <v-col>
                    <el-time-picker
                      class="full-width"
                      format="HH:mm"
                      arrow-control
                      placeholder="เวลา"
                      style="width: 100%"
                    >
                    </el-time-picker>
                  </v-col> </v-row
              ></v-col>
            </v-row>
          </v-col>

          <v-col cols="12" sm="6">
            จำนวนสิทธิ์ที่เปิด
            <v-text-field
              outlined
              dense
              hide-details="auto"
              placeholder="กรอกจำนวนสิทธิ์ที่เปิด"
            ></v-text-field></v-col
          ><v-col cols="12" sm="6">
            จำนวนอั้นถอน
            <v-text-field
              outlined
              dense
              hide-details="auto"
              placeholder="กรอกจำนวนอั้นถอน"
            ></v-text-field
          ></v-col>
          <div class="pa-3">
            ตั้งค่าเทิร์น
            <v-row class="mt-1">
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  hide-details="auto"
                  label="SLOT"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  hide-details="auto"
                  label="Sportbook"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  hide-details="auto"
                  label="ESPORT"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  hide-details="auto"
                  label="HorseRacing"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4">
                <v-text-field
                  outlined
                  dense
                  hide-details="auto"
                  label="casino"
                ></v-text-field
              ></v-col>
              <v-col cols="6" sm="4"
                ><v-text-field
                  outlined
                  dense
                  hide-details="auto"
                  label="lotto"
                ></v-text-field
              ></v-col>
            </v-row></div
        ></v-row>
        <v-card-actions>
          <div class="mx-auto mt-3">
            <v-btn color="success" class="mx-1">ตกลง</v-btn
            ><v-btn class="mx-1" color="error" @click="createmodel=false">ปิด</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createmodel: false,
      headersfreecrdit: [
        {
          text: "ลำดับ",
          value: "mindp",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "ดูผู้สมัคร",
          value: "maxdp",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "ชื่อโปรโมชั้น",
          value: "bonusvalue",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "เวลา",
          value: "bonusvalue",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "แจกเครดิต",
          value: "bonusvalue",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "จำนวนสิทธิ์ทั้งหมด	",
          value: "bonusvalue",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "จำนวนสิทธิ์คงเหลือ",
          value: "bonusvalue",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "จำนวนผู้สมัคร",
          value: "bonusvalue",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "สถานะ",
          value: "bonusvalue",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        },
        {
          text: "ดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "grey darken-3 white--text"
        }
      ]
    };
  },
  methods: {
    async create() {
      this.createmodel = true;
    }
  }
};
</script>

<style></style>
