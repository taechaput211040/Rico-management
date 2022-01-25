<template>
  <v-flex>
    <v-container>
      <h2 class="mb-2">แก้ไขเครดิต ตัดเครดิต เติมเครดิต</h2>
      <v-expansion-panels accordion class="mb-5">
        <v-row>
          <v-col cols="12" md="4">
            <v-card width="100%">
              <v-expansion-panel>
                <v-expansion-panel-header @click="refreshform()">
                  <v-card-title
                    primary-title
                    class="font-weight-bold grey--text"
                  >
                    รายการไม่เข้าระบบ
                  </v-card-title>
                  <template v-slot:actions>
                    <v-icon color="grey" large>
                      $expand
                    </v-icon>
                  </template></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <div>
                    กรอกusername
                    <v-text-field
                      class="mb-2"
                      dense
                      outlined
                      v-model="formnoneSystem.username"
                      clearable
                      placeholder="เช่น xx1234567"
                      hide-details="auto"
                    ></v-text-field>
                    กรอกจำนวนเงิน
                    <v-text-field
                      class="mb-2"
                      v-model="formnoneSystem.amount"
                      dense
                      outlined
                      type="number"
                      placeholder="กรอกจำนวนเงิน"
                      hide-details="auto"
                    ></v-text-field>
                    เวลาในสลิปที่ลูกค้าแจ้ง (ไม่บังคับ)
                    <el-time-picker
                      class="full-width mb-2"
                      v-model="formnoneSystem.time"
                      format="HH:mm"
                      arrow-control
                      placeholder="เวลาในสลิปที่ลูกค้าแจ้ง (ไม่บังคับ)"
                      style="width: 100%;"
                    >
                    </el-time-picker>
                    หมายเหตุ (ไม่บังคับ)
                    <v-text-field
                      class="mb-2"
                      dense
                      v-model="formnoneSystem.remark"
                      outlined
                      clearable
                      placeholder="หมายเหตุ (ไม่บังคับ)"
                      hide-details="auto"
                    ></v-text-field>
                    <span class="error--text"
                      >หมายเหตุ: *** เติมเครดิตในหน้านี้
                      ใช้ในกรณียอดไม่แสดงในระบบ จะทำการ เติม
                      เครดิตให้ลูกค้าตามโปรโมชั่นที่ลูกค้ารับอยู่
                      คิดเป็นจำนวนยอดฝากจริง ***</span
                    >

                    <v-card-actions>
                      <v-btn color="primary" class="ma-auto">เติมเงิน</v-btn>
                    </v-card-actions>
                  </div></v-expansion-panel-content
                >
              </v-expansion-panel>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card width="100%">
              <v-expansion-panel>
                <v-expansion-panel-header @click="refreshform()">
                  <v-card-title
                    primary-title
                    class="font-weight-bold error--text"
                  >
                    ตัดเครดิต
                  </v-card-title>
                  <template v-slot:actions>
                    <v-icon color="error" large>
                      $expand
                    </v-icon>
                  </template></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <div>
                    กรอกusername
                    <v-text-field
                      class="mb-2"
                      dense
                      outlined
                      v-model="formCutcredit.username"
                      clearable
                      placeholder="เช่น xx1234567"
                      hide-details="auto"
                    ></v-text-field>
                    จำนวนเครดิตที่จะตัด
                    <v-text-field
                      class="mb-2"
                      dense
                      v-model="formCutcredit.amount"
                      outlined
                      type="number"
                      placeholder="กรอกจำนวนเงิน"
                      hide-details="auto"
                    ></v-text-field>
                    หมายเหตุ (ไม่บังคับ)
                    <v-text-field
                      class="mb-2"
                      dense
                      outlined
                      v-model="formCutcredit.remark"
                      clearable
                      placeholder="หมายเหตุ (ไม่บังคับ)"
                      hide-details="auto"
                    ></v-text-field>
                    <v-card-actions>
                      <v-btn color="error" class="ma-auto">ตัดเครดิต</v-btn>
                    </v-card-actions>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card width="100%">
              <v-expansion-panel>
                <v-expansion-panel-header @click="refreshform()">
                  <v-card-title
                    primary-title
                    class="font-weight-bold primary--text"
                  >
                    เติมเครดิต
                  </v-card-title>
                  <template v-slot:actions>
                    <v-icon color="primary" large>
                      $expand
                    </v-icon>
                  </template></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <div>
                    กรอกusername
                    <v-text-field
                      class="mb-2"
                      dense
                      outlined
                      clearable
                      v-model="formTopupCredit.username"
                      placeholder="เช่น xx1234567"
                      hide-details="auto"
                    ></v-text-field>
                    โบนัสเครดิต (ไม่คิดคำนวนในยอดฝาก)
                    <v-text-field
                      class="mb-2"
                      dense
                      v-model="formTopupCredit.bonusCredit"
                      outlined
                      type="number"
                      placeholder="กรอกจำเครดิต"
                      hide-details="auto"
                    ></v-text-field>
                    หมายเหตุ (ไม่บังคับ)
                    <v-text-field
                      class="mb-2"
                      v-model="formTopupCredit.remark"
                      dense
                      outlined
                      clearable
                      placeholder="หมายเหตุ (ไม่บังคับ)"
                      hide-details="auto"
                    ></v-text-field>
                    <div class="card-turnsetting pa-2 ">
                      <v-card-subtitle class="font-weight-bold text-center">
                        ตั้งค่าเทิร์น
                      </v-card-subtitle>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="formTopupCredit.tslot"
                            label="เทิร์น SLOT"
                            outlined
                            clearable
                            type="number"
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="formTopupCredit.tsportbook"
                            label="เทิร์น SPORTBOOK"
                            dense
                            outlined
                            type="number"
                            clearable
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="formTopupCredit.tesport"
                            label="เทิร์น ESPORT"
                            dense
                            outlined
                            clearable
                            type="number"
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="formTopupCredit.thorse"
                            label="เทิร์น HORSE RACING"
                            outlined
                            clearable
                            type="number"
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="formTopupCredit.tcasino"
                            label="เทิร์น CASINO"
                            outlined
                            type="number"
                            clearable
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            label="เทิร์น LOTTO"
                            outlined
                            v-model="formTopupCredit.tlotto"
                            clearable
                            type="number"
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="formTopupCredit.twidthdraw"
                            label="อั้นถอน(กรอกเป็นจำนวนเงิน)"
                            outlined
                            clearable
                            type="number"
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                    </div>
                    <span class="error--text"
                      >หมายเหตุ: *** การแก้ไขเครดิตในหน้านี้ จะทำการ เติม เครดิต
                      รวมทั้งเทิร์น โดยไม่สนใจทุกๆ โปรโมชั่นที่ลูกค้าใช้อยู่
                      โดยเทิร์นที่ใส่ในหน้านี้จะไปแทนที่เทิร์นเดิมของลูกค้า
                      ***</span
                    >
                    <v-card-actions>
                      <v-btn color="primary" class="ma-auto">เติมเครดิต</v-btn>
                    </v-card-actions>
                  </div>
                </v-expansion-panel-content></v-expansion-panel
              >
            </v-card>
          </v-col>
        </v-row></v-expansion-panels
      >
      <v-row class="pa-3">
        <h2 class="mb-2">ค้นหารายการแก้ไข</h2>
        <search-filter
          :searchinput="false"
          :filter="dateFilter"
          @search="searchdata"
        ></search-filter>
      </v-row>
      <v-card width="100%" class="elevation-4 mt-5 rounded-lg">
        <v-row class="ma-1 my-2">
          <v-btn color="black" dark class="ma-1 font-weight-bold">ทั้งหมด</v-btn
          ><v-btn color="grey" dark class="ma-1 font-weight-bold"
            >รายการไม่เข้าระบบ</v-btn
          ><v-btn color="error" outlined class="ma-1 font-weight-bold"
            >ตัดเครดิต</v-btn
          ><v-btn color="primary" outlined class="ma-1 font-weight-bold"
            >เติมเครดิต</v-btn
          ><v-spacer></v-spacer>
          <span class="font-weight-bold my-2">
            จำนวนรายการทั้งหมดตั้งแต่วันที่ {{ dateFilter.startDate }} ถึงวันที่
            {{ dateFilter.endDate }} ทั้งหมดจำนวน
            {{ itemcredit.length }} รายการ</span
          >
        </v-row>

        <v-card class="mt-5">
          <v-data-table
            show-expand
            hide-default-footer
            class="elevation-1"
            :headers="header"
            :items="itemcredit"
            single-expand
          >
            <template #[`item.data-table-expand`]="{isExpanded, expand }">
              <div class="px-2">
                <v-btn
                  @click="expand(true)"
                  v-if="!isExpanded"
                  color="black"
                  dark
                  small
                  >ดูเพิ่มเติม</v-btn
                >
                <v-btn
                  @click="expand(false)"
                  v-if="isExpanded"
                  color="black"
                  dark
                  small
                  >ปิด</v-btn
                >
              </div>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="text-center font-weight-bold purple--text">
                  {{ item.remark }}
                </div>
              </td>
            </template>
            <template #[`item.no`]="{index}">
              <span class="font-weight-bold">
                {{ index + 1 }}
              </span>
            </template>
            <template #[`item.created_at`]="{item}">
              <span class="font-weight-bold">
                {{ getthaidate(item.created_at) }}
              </span>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import moment from "moment";
import SearchFilter from "../../components/SearchFilter.vue";
export default {
  components: { SearchFilter },
  data() {
    return {
      formnoneSystem: {
        username: "",
        amount: "",
        time: "",
        remark: ""
      },
      formCutcredit: {
        username: "",
        amount: "",
        remark: ""
      },
      formTopupCredit: {
        username: "",
        bonusCredit: "",
        remark: "",
        tslot: "20",
        tsportbook: "",
        tesport: "",
        thorse: "",
        tcasino: "",
        tlotto: "",
        twidthdraw: ""
      },
      header: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "font-weight-bold"
        },
        {
          text: "เวลา",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-2"
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "primary--text font-weight-bold"
        },
        {
          text: "จำนวนเครดิต",
          value: "credit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "จำนวนโบนัส",
          value: "bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "เครกิตก่อนเติม",
          value: "bfcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "เติม",
          value: "topupcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1"
        },
        {
          text: "ทำโดย",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "font-weight-bold"
        }
      ],
      itemcredit: [
        {
          afcredit: 0,
          bfcredit: 0,
          bonus: 0,
          created_at: "2022-01-24T14:41:51.000000Z",
          credit: 75,
          id: 903,
          operator: "nan mon",
          remark:
            "เติมเงินให้ BE9794691646 จำนวน 75 บาท ,รายการไม่เข้าระบบ,เติมตามเงื่อนไขโปรโมชั่น โปรดเช็ครายการฝาก,เติมโดย nan mon หมายเหตุเพิ่มเติม t",
          topupcredit: 0,
          type: "SYSTEMNODATA",
          username: "BE9794691646"
        },
        {
          afcredit: 0,
          bfcredit: 0,
          bonus: 0,
          created_at: "2022-01-24T14:41:51.000000Z",
          credit: 75,
          id: 904,
          operator: "nan mon",
          remark:
            "เติมเงินให้ BE9794691646 จำนวน 75 บาท ,รายการไม่เข้าระบบ,เติมตามเงื่อนไขโปรโมชั่น โปรดเช็ครายการฝาก,เติมโดย nan mon หมายเหตุเพิ่มเติม t",
          topupcredit: 0,
          type: "SYSTEMNODATA",
          username: "BE9794691646"
        }
      ],
      tab: null,
      time: "",
      opento: false,
      dateFilter: {
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      }
    };
  },
  computed: {},
  methods: {
    refreshform() {
      this.formnoneSystem = {};
      this.formCutcredit = {};
      this.formTopupCredit = {};
    },
    searchdata(textSearch) {
      console.log(this.dateFilter, "text :" + textSearch);
    },
    getthaidate(timethai) {
      const time = moment(timethai)
        .add(7, "hours")
        .format("YYYY-MM-DD เวลา HH:mm:ss");
      return time;
    }
  }
};
</script>

<style></style>
