<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <h2 class="mb-2">เติมเงิน ตัดเครดิต เติมโบนัส</h2>
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
                    เติมเงิน
                  </v-card-title>
                  <template v-slot:actions>
                    <v-icon color="grey" large> $expand </v-icon>
                  </template></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <div>
                    กรอกusername
                    <v-text-field
                      class="mb-2"
                      dense
                      outlined
                      v-model="formEditCredit.username"
                      clearable
                      placeholder="เช่น xx1234567"
                      hide-details="auto"
                    ></v-text-field>
                    กรอกจำนวนเงิน
                    <v-text-field
                      class="mb-2"
                      v-model="formEditCredit.credit"
                      dense
                      outlined
                      type="number"
                      placeholder="กรอกจำนวนเงิน"
                      hide-details="auto"
                    ></v-text-field>
                    เวลาในสลิปที่ลูกค้าแจ้ง (ไม่บังคับ)
                    <el-time-picker
                      class="full-width mb-2"
                      v-model="formEditCredit.smsdatetime"
                      format="HH:mm"
                      arrow-control
                      placeholder="เวลาในสลิปที่ลูกค้าแจ้ง (ไม่บังคับ)"
                      style="width: 100%"
                    >
                    </el-time-picker>
                    หมายเหตุ (ไม่บังคับ)
                    <v-text-field
                      class="mb-2"
                      dense
                      v-model="formEditCredit.remark"
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
                      <v-btn
                        color="primary"
                        :disabled="canwrite"
                        class="ma-auto"
                        @click="editTopupCredit()"
                        >เติมเงิน</v-btn
                      >
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
                    class="font-weight-bold error--text"
                  >
                    ตัดเครดิต
                  </v-card-title>
                  <template v-slot:actions>
                    <v-icon color="error" large> $expand </v-icon>
                  </template></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <div>
                    กรอกusername
                    <v-text-field
                      class="mb-2"
                      dense
                      outlined
                      v-model="formEditCredit.username"
                      clearable
                      placeholder="เช่น xx1234567"
                      hide-details="auto"
                    ></v-text-field>
                    จำนวนเครดิตที่จะตัด
                    <v-text-field
                      class="mb-2"
                      dense
                      v-model="formEditCredit.credit"
                      outlined
                      type="number"
                      placeholder="กรอกจำนวนเงิน"
                      hide-details="auto"
                    ></v-text-field>
                    หมายเหตุ
                    <v-text-field
                      class="mb-2"
                      dense
                      outlined
                      v-model="formEditCredit.remark"
                      clearable
                      placeholder="หมายเหตุ "
                      hide-details="auto"
                      required
                    ></v-text-field>
                    <v-card-actions>
                      <v-btn
                        :disabled="canwrite"
                        color="error"
                        class="ma-auto"
                        @click="editCutCredit()"
                        >ตัดเครดิต</v-btn
                      >
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
                    เติมโบนัส
                  </v-card-title>
                  <template v-slot:actions>
                    <v-icon color="primary" large> $expand </v-icon>
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
                      v-model="formEditCredit.username"
                      placeholder="เช่น xx1234567"
                      hide-details="auto"
                    ></v-text-field>
                    โบนัสเครดิต (ไม่คิดคำนวนในยอดฝาก)
                    <v-text-field
                      class="mb-2"
                      dense
                      v-model="formEditCredit.bonus"
                      outlined
                      type="number"
                      placeholder="กรอกจำเครดิต"
                      hide-details="auto"
                    ></v-text-field>
                    หมายเหตุ (ไม่บังคับ)
                    <v-text-field
                      class="mb-2"
                      v-model="formEditCredit.remark"
                      dense
                      outlined
                      clearable
                      placeholder="หมายเหตุ (ไม่บังคับ)"
                      hide-details="auto"
                    ></v-text-field>
                    <div class="card-turnsetting pa-2">
                      <v-card-subtitle class="font-weight-bold text-center">
                        ตั้งค่าเทิร์น
                      </v-card-subtitle>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            v-model="formEditCredit.turn.tslot"
                            label="เทิร์น SLOT"
                            outlined
                            clearable
                            type="number"
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="formEditCredit.turn.tsportbook"
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
                            v-model="formEditCredit.turn.tesport"
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
                            v-model="formEditCredit.turn.tother"
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
                            v-model="formEditCredit.turn.tcasino"
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
                            v-model="formEditCredit.turn.tlotto"
                            clearable
                            type="number"
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="6">
                          <v-text-field
                            dense
                            label="เทิร์น FISHING"
                            outlined
                            v-model="formEditCredit.turn.tfishing"
                            clearable
                            type="number"
                            hide-details="auto"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12">
                          <v-text-field
                            dense
                            v-model="formEditCredit.turn.twidthdraw"
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
                      >หมายเหตุ: *** การแก้ไขเครดิตในหน้านี้ จะทำการ เติม โบนัส
                      รวมทั้งเทิร์น โดยไม่สนใจทุกๆ โปรโมชั่นที่ลูกค้าใช้อยู่
                      โดยเทิร์นที่ใส่ในหน้านี้จะไปแทนที่เทิร์นเดิมของลูกค้า
                      ***</span
                    >
                    <v-card-actions>
                      <v-btn
                        :disabled="canwrite"
                        color="primary"
                        class="ma-auto"
                        @click="editTopupBonus()"
                        >เติมโบนัส</v-btn
                      >
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
          :searchinput="true"
          :filter="dateFilter"
          @search="searchdata(dateFilter.inputfilter)"
          @yesterday="getYesterDay()"
          @today="getToday()"
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
            จำนวนรายการทั้งหมดตั้งแต่วันที่
            {{ dateFilter.startDate | dateFormat }} ถึงวันที่
            {{ dateFilter.endDate | dateFormat }} ทั้งหมดจำนวน
            {{ itemcredit?.meta?.itemCount }} รายการ</span
          >
        </v-row>

        <v-card class="mt-5">
          <v-data-table
            :headers="header"
            :items="itemcredit.data"
            :options.sync="options"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
              'items-per-page-options': [50, 100],
            }"
            :server-items-length="
              itemcredit.meta ? itemcredit.meta.itemCount : 0
            "
            :items-per-page="limit"
          >
            <template #[`item.no`]="{ index }">
              {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
            </template>
            <template #[`item.data-table-expand`]="{ isExpanded, expand }">
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
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">
                {{ index + 1 }}
              </span>
            </template>
            <template #[`item.created_at`]="{ item }">
              <span>
                {{ item.created_at | dateFormat }}
              </span>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-container>
    <v-dialog v-model="dialogEditTopup" max-width="290">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการเติมเงิน</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2" v-if="formEditCredit.username">
            <v-text-field
              placeholder="กรอก username : "
              hide-details="auto"
              v-model="formEditCredit.username"
              dense
              outlined
              required
              disabled
            ></v-text-field>
          </div>
          <div class="my-2">จำนวนเงิน : {{ formEditCredit.credit }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="editTopupCredit_confirm()">
            ยืนยัน</v-btn
          >
          <v-btn color="red" small @click="dialogEditTopup = false">
            ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogCutcredit" max-width="290">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการตัดเครดิต</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2" v-if="formEditCredit.username">
            <v-text-field
              placeholder="กรอก username : "
              hide-details="auto"
              v-model="formEditCredit.username"
              dense
              outlined
              required
              disabled
            ></v-text-field>
          </div>
          <div class="my-2">จำนวนเงิน : {{ formEditCredit.credit }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="editCutcredit_confirm()">
            ยืนยัน</v-btn
          >
          <v-btn color="red" small @click="dialogCutcredit = false">
            ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEditBonus" max-width="290">
      <v-card>
        <v-card-title>
          <h4>ยืนยันการเติมโบนัส</h4>
        </v-card-title>

        <v-card-text class="font-weight-bold">
          <div class="my-2" v-if="formEditCredit.username">
            <v-text-field
              placeholder="กรอก username : "
              hide-details="auto"
              v-model="formEditCredit.username"
              dense
              outlined
              required
              disabled
            ></v-text-field>
          </div>
          <div class="my-2">จำนวนโบนัส : {{ formEditCredit.bonus }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="success" small @click="editTopupBonus_confirm()">
            ยืนยัน</v-btn
          >
          <v-btn color="red" small @click="dialogEditBonus = false">
            ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import dayjs from "dayjs";
import LoadingPage from "../../components/LoadingPage.vue";
import moment from "moment";
import { mapActions, mapState } from "vuex";
import SearchFilter from "../../components/SearchFilter.vue";
export default {
  components: { LoadingPage, SearchFilter },

  data() {
    return {
      isLoading: false,
      dialogEditTopup: false,

      dialogCutcredit: false,

      dialogEditBonus: false,

      formEditCredit: {
        created_at: "",
        username: "",
        credit: 0,
        bonus: 0,
        type: null,
        remark: "รายการแก้ไข",
        turn: {
          tslot: "1",
          tsportbook: "1",
          tesport: "1",
          tother: "1",
          tcasino: "1",
          tlotto: "1",
          twidthdraw: "10000",
          tfishing: "1",
        },
      },

      header: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px",
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "font-weight-bold",
        },
        {
          text: "เวลา",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-2",
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "primary--text font-weight-bold",
        },
        {
          text: "จำนวนเครดิต",
          value: "credit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
        },
        {
          text: "จำนวนโบนัส",
          value: "bonus",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
        },
        {
          text: "เครกิตก่อน",
          value: "bfcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
        },

        {
          text: "เครดิตหลัง",
          value: "afcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
        },
        {
          text: "ทำโดย",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold col-1",
          cellClass: "font-weight-bold",
        },
      ],

      itemcredit: [],
      tab: null,
      time: "",

      options: {},
      opento: false,
      dateFilter: {
        inputfilter: "",
        startDate: dayjs().startOf("day").toISOString(),
        endDate: dayjs().endOf("day").toISOString(),
        options: "username",
      },
      limit: 50,
    };
  },
  computed: {
    ...mapState("auth", ["menu", "operator"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("manageMember_write")) return true;
        else return false;
      }
    },
  },
  watch: {
    options: {
      async handler() {
        await this.searchdata();
      },
    },
  },
  async fetch() {
    await this.searchdata();
  },
  methods: {
    ...mapActions("member", [
      "getManualEditCredit",
      "PostEditTopupCredit",
      "PostEditCutCredit",
      "PostEditTopupBonus",
    ]),
    async editTopupCredit() {
      this.dialogEditTopup = true;
    },
    async editTopupCredit_confirm() {
      this.isLoading = true;
      this.formEditCredit.type = "เติม";
      this.formEditCredit.remark += ` เติมเงิน ${this.formEditCredit.username}  โดย ${this.operator}`;
      const result = await this.PostEditTopupCredit(this.formEditCredit);
      if (result.data.status == "success") {
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.isLoading = false;
        this.dialogEditTopup = false;
        this.refreshform();
      } else {
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.isLoading = false;
      }
    },

    async editCutCredit() {
      this.dialogCutcredit = true;
    },
    async editCutcredit_confirm() {
      this.isLoading = true;
      this.formEditCredit.type = "ตัด";
      this.formEditCredit.remark += ` ตัดเครดิต ${this.formEditCredit.username}  โดย ${this.operator}`;
      const result = await this.PostEditCutCredit(this.formEditCredit);
      if (result.data.status == "success") {
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.isLoading = false;
        this.dialogCutcredit = false;
        this.refreshform();
      } else {
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.isLoading = false;
      }
    },

    async editTopupBonus() {
      this.dialogEditBonus = true;
    },
    async editTopupBonus_confirm() {
      this.isLoading = true;
      this.formEditCredit.type = "โบนัส";
      this.formEditCredit.remark += ` เติมโบนัส ${this.formEditCredit.username} โดย ${this.operator}`;
      const result = await this.PostEditTopupBonus(this.formEditCredit);
      if (result.data.status == "success") {
        this.$swal({
          title: `ทำรายการสำเร็จ`,
          icon: "success",
          allowOutsideClick: true,
          confirmButtonColor: "green",
          confirmButtonText: "ok",
        });
        this.isLoading = false;
        this.dialogEditBonus = false;
        this.refreshform();
      } else {
        this.$swal({
          title: `รายการไม่สำเร็จ`,
          icon: "error",
          text: result.message,
          allowOutsideClick: true,
          confirmButtonColor: "red",
          confirmButtonText: "ok",
        });
        this.isLoading = false;
      }
    },

    refreshform() {
      this.formEditCredit = {
        smsdatetime: null,
        created_at: "",
        username: "",
        credit: 0,
        bonus: 0,
        type: null,
        remark: "รายการแก้ไข",
        turn: {
          tslot: "2",
          tsportbook: "2",
          tesport: "2",
          tother: "2",
          tcasino: "2",
          tlotto: "2",
          twidthdraw: "10000",
          tfishing: "2",
        },
      };
    },

    getParameter() {
      let parameter = {
        take: this.options.itemsPerPage,
        page: this.options.page,
        start: this.dateFilter.startDate,
        end: this.dateFilter.endDate,

        keyword: this.dateFilter.inputfilter,
      };
      return parameter;
    },
    setYesterday() {
      this.dateFilter.startDate = dayjs().add(-1, "day").format("YYYY-MM-DD");
      this.dateFilter.startTime = dayjs().add(-1, "day").format("HH:mm:ss");
      this.dateFilter.endDate = dayjs().endOf(-1, "day").format("YYYY-MM-DD");
      this.dateFilter.endTime = dayjs().endOf(-1, "day").format("HH:mm:ss");
    },
    async searchdata(input = null) {
      this.isLoading = true;
      let params = this.getParameter();
      params.keyword = input;
      console.log(params);
      try {
        let data = await this.getManualEditCredit(params);
        this.itemcredit = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
    async getYesterDay() {
      this.isLoading = true;
      let params = this.getParameter();
      await this.setYesterday();

      params.start = dayjs().add(-1, "day").startOf("day").toISOString();
      params.end = dayjs().add(-1, "day").endOf("day").toISOString();
      try {
        console.log(params);
        const data = await this.getManualEditCredit(params);
        this.itemSearch = data;
        console.log(this.itemSearch, "data");
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async getToday() {
      this.isLoading = true;
      let params = this.getParameter();
      params.start = dayjs().startOf("day").toISOString();
      params.end = dayjs().endOf("day").toISOString();
      try {
        console.log(params);
        const data = await this.getManualEditCredit(params);
        this.itemSearch = data;
        console.log(this.itemSearch, "data");
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
