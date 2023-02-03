<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <v-row>
        <h2 class="mb-2">รายการสมาชิก</h2>

        <search-filter
          :filter="dateFilter"
          @search="getData()"
          :searchinput="false"
        ></search-filter>
      </v-row>
      <v-row>
        <v-card class="elevation-4 mt-5 rounded-lg pb-5" width="100%">
          <div class="ma-5 font-weight-bold">
            จำนวนสมาชิกทั้งหมดตั้งเเต่วันที่
            {{ getthaidate(dateFilter.startDate) }} ถึงวันที่
            {{ getthaidate(dateFilter.endDate) }} จำนวนทั้งหมด
            {{ itemSearch.meta ? itemSearch.meta.itemCount : 0 }} คน
          </div>

          <div class="tabledata">
            <!-- {{ options }} -->
            <v-data-table
              :headers="columnReport"
              :items="itemSearch.data"
              :options.sync="options"
              :footer-props="{
                showFirstLastPage: true,
                'items-per-page-text': '',
              }"
              :server-items-length="
                itemSearch.meta ? itemSearch.meta.itemCount : 0
              "
            >
              <template #[`item.bankAcc`]="{ item }">
                <div class="row px-6 detailbank justify-center">
                  <div class="ma-auto col-3 pa-0">
                    <img-bank :value="item.bankName"></img-bank>
                  </div>
                  <div class="font-weight-bold col-9 pa-0">
                    <span class="primary--text">{{ item.bankName }}</span
                    ><br />
                    {{ item.bankAcc }}
                  </div>
                </div>
              </template>
              <template #[`item.no`]="{ index }">
                {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
              </template>
              <!-- <template #[`item.created_at`]="{item}">
                <span>
                  {{ getthaidate(item.created_at) }}
                </span>
              </template>
              <template #[`item.updated_at`]="{item}">
                <span>
                  {{ getthaidate(item.updated_at) }}
                </span>
              </template> -->
              <template #[`item.name`]="{ item }">
                <span> {{ item.name }} {{ item.lastname }} </span>
              </template>
              <template #[`item.log`]="{ item }">
                <div class="">
                  <v-btn
                    class="mx-1"
                    color="success"
                    dark
                    small
                    @click.stop="CheckDeposit(item.username)"
                    >ฝาก</v-btn
                  ><v-btn
                    class="mx-1"
                    color="error"
                    dark
                    small
                    @click.stop="CheckWithdraw(item.username)"
                    >ถอน</v-btn
                  >
                </div>
              </template>
              <template #[`item.actions`]="{ item }">
                <div class="d-sm-flex justify-center">
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on, attrs }"
                      ><v-btn
                        @click="openchangePass(item)"
                        v-bind="attrs"
                        v-on="on"
                        :disabled="canwrite"
                        color="primary mx-1"
                        x-small
                        fab
                        ><v-icon>mdi-lastpass</v-icon></v-btn
                      ></template
                    >
                    <span>เปลี่ยนรหัสผ่าน</span>
                  </v-tooltip>

                  <v-tooltip bottom color="warning">
                    <template v-slot:activator="{ on, attrs }"
                      ><v-btn
                        @click="handleUpdateMember(item)"
                        v-bind="attrs"
                        :disabled="canwrite"
                        v-on="on"
                        color="warning mx-1"
                        x-small
                        fab
                        ><v-icon>mdi-pencil</v-icon></v-btn
                      ></template
                    >
                    <span>แก้ไขข้อมูล</span>
                  </v-tooltip>
                  <v-tooltip bottom color="black">
                    <template v-slot:activator="{ on, attrs }"
                      ><v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="black mx-1"
                        x-small
                        dark
                        :disabled="canwrite"
                        fab
                        @click="handleLockUser(item)"
                        ><v-icon>mdi-lock</v-icon></v-btn
                      ></template
                    >
                    <span>LOCK USER!</span>
                  </v-tooltip>
                </div>
              </template>
            </v-data-table>
          </div>
        </v-card>
      </v-row>
      <v-dialog
        v-model="dlDeposit"
        :overlay="false"
        transition="dialog-transition"
      >
        <v-card class="pa-3">
          <h3 class="pa-3">
            รายการฝากเงินล่าสุด : {{ items_deposit.length }} รายการ
          </h3>
          <v-data-table
            :options.sync="options_deposit"
            :headers="headers_deposit"
            :items="items_deposit"
            pagination.sync="pagination"
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">{{
                options_deposit.itemsPerPage * (options_deposit.page - 1) +
                (index + 1)
              }}</span>
            </template>
            <template #[`item.companyBank`]="{ item }"
              ><img-bank :value="item.companyBank"></img-bank
            ></template>
          </v-data-table>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dlWithdraw"
        :overlay="false"
        transition="dialog-transition"
      >
        <v-card class="pa-3">
          <h3 class="pa-3">
            รายการถอนเงินล่าสุด : {{ items_withdraw.length }} รายการ
          </h3>
          <v-data-table
            :options.sync="options_withdraw"
            :headers="headers_withdraw"
            :items="items_withdraw"
            pagination.sync="pagination"
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">{{
                options_withdraw.itemsPerPage * (options_withdraw.page - 1) +
                (index + 1)
              }}</span>
            </template>
            <template #[`item.companyBank`]="{ item }"
              ><img-bank :value="item.companyBank"></img-bank
            ></template>
          </v-data-table>
        </v-card>
      </v-dialog>
      <v-dialog v-model="updateMember" max-width="800px">
        <v-card class="pa-3">
          <v-card-title>ข้อมูลผู้ใช้ :{{ updateForm.username }} </v-card-title>
          <v-divider class="my-2"></v-divider>
          <v-form>
            <div class="row">
              <div class="col-12 col-sm-6">
                เบอร์โทรศัพท์
                <v-text-field
                  outlined
                  filled
                  v-model="updateForm.phone"
                  dense
                  hide-details="auto"
                  disabled
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6 d-sm-block d-none"></div>
              <div class="col-12 col-sm-6">
                ชื่อ
                <v-text-field
                  outlined
                  v-model="updateForm.name"
                  dense
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                นามสกุล
                <v-text-field
                  v-model="updateForm.lastname"
                  outlined
                  dense
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                ธนาคาร
                <v-select
                  v-model="updateForm.bankName"
                  outlined
                  :items="bank"
                  dense
                  hide-details="auto"
                ></v-select>
              </div>
              <div class="col-12 col-sm-6">
                เลขบัญชีธนาคาร
                <v-text-field
                  outlined
                  v-model="updateForm.bankAcc"
                  hide-details="auto"
                  dense
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                LINE
                <v-text-field
                  outlined
                  filled
                  v-model="updateForm.lineID"
                  dense
                  hide-details="auto"
                  disabled
                ></v-text-field>
              </div>
              <div class="col-12 col-sm-6">
                Lock User
                <v-checkbox
                  label="ห้ามเดิมพัน"
                  hide-details="auto"
                  value="0"
                ></v-checkbox>
                <v-checkbox
                  label="ห้ามฝากถอน"
                  hide-details="auto"
                  value="0"
                ></v-checkbox>
              </div>
            </div>
            <div class="text-center my-2">
              <v-btn color="success">บันทึก</v-btn>
              <v-btn color="error" @click="updateMember = false">ปิด</v-btn>
              <v-btn color="purple white--text">ลบโปรโมชัน</v-btn>
            </div>
          </v-form>
          <v-divider class="mt-5"></v-divider>
          <div class="row pa-3">
            <div class="col-12 col-sm-6">ผู้เเนะนำ: -</div>
            <div class="col-12 col-sm-6">แหล่งที่มา: -</div>
            <div class="col-12 col-sm-6">เดิมพันล่าสุด: -</div>
            <div class="col-12 col-sm-6">เครดิตค้าง: 0</div>
            <div class="col-12 col-sm-6">วันที่สมัคร: 0</div>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
    <v-dialog
      v-model="changpassdl"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card class="pa-3">
        <v-card-title class="justify-center" primary-title>
          เปลี่ยนรหัสผ่าน
        </v-card-title>
        <v-form ref="changepass">
          <v-text-field
            v-model="newPass.password"
            dense
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-form>
        <v-card-actions class="justify-center">
          <v-btn color="success" @click="handlesubmitChangePass()"
            >เปลี่ยนรหัสผ่าน</v-btn
          ><v-btn color="error" @click="closeChangepass()">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ImgBank from "../../components/ImgBank.vue";
import LoadingPage from "../../components/LoadingPage.vue";
export default {
  components: { ImgBank, LoadingPage },
  data() {
    return {
      options: {},
      isLoading: false,
      updateForm: {},
      dpdialog: false,
      updateMember: false,
      changpassdl: false,
      wddialog: false,
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      columnReport: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          width: "20px",
        },
        {
          text: "ธนาคารลูกค้า",
          value: "bankAcc",
          align: "center",
          sortable: false,
        },
        {
          text: "ชื่อ-นามสกุล",
          value: "name",
          align: "center",
          sortable: false,
        },
        {
          text: "username",
          value: "username",
          align: "center",
          width: "100px",
          sortable: false,
        },
        {
          text: "ผู้เเนะนำ",
          value: "recommender",
          align: "center",
          sortable: false,
        },
        {
          text: "มาจากช่องทาง",
          value: "knowFrom",
          align: "center",
          sortable: false,
        },

        {
          text: "ผู้แก้ไขล่าสุด",
          value: "operator",
          align: "center",
          sortable: false,
        },
        {
          text: "ประวัติการฝาก/ถอน",
          value: "log",
          align: "center",
          sortable: false,
        },

        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
        },
      ],
      options_deposit: {},
      itemSearch: [],
      headers_deposit: [
        { text: "ลำดับ", align: "center", value: "no" },
        { text: "ธนาคารเว็ป", align: "center", value: "companyBank" },
        { text: "เวลาใน SMS", align: "center", value: "smsdatetime" },
        { text: "เวลาเติม", align: "center", value: "created_at" },
        { text: "username", align: "center", value: "member_id" },
        { text: "จำนวนเงิน", align: "center", value: "amount" },
        { text: "จำนวนโบนัส", align: "center", value: "bonusamount" },
        { text: "เครดิตก่อนเติม", align: "center", value: "bfcredit" },
        { text: "เครดิตหลังเติม", align: "center", value: "afcredit" },
        { text: "เติมโดย", align: "center", value: "topupby" },
        { text: "หมายเหตุ", align: "center", value: "remark" },
      ],
      options_withdraw: {},
      headers_withdraw: [
        { text: "ลำดับ", align: "center", value: "no" },
        { text: "ธนาคารลูกค้า", align: "center", value: "bankName" },
        { text: "username", align: "center", value: "username" },
        { text: "ประเภท", align: "center", value: "type" },
        { text: "ยอดโอน", align: "center", value: "amount" },
        { text: "เวลากดถอน", align: "center", value: "requsettime" },
        { text: "เวลาโอนสำเร็จ", align: "center", value: "transferTime" },
        { text: "สถานะ", align: "center", value: "status" },
        { text: "กดถอนโดย", align: "center", value: "operator" },
        { text: "หมายเหตุ", align: "center", value: "remark" },
      ],
      items_deposit: [],
      items_withdraw: [],
      dlDeposit: false,
      dlWithdraw: false,
      newPass: {
        id: "",
        password: "",
      },
    };
  },
  watch: {
    options: {
      async handler() {
        await this.getData();
      },
    },
  },
  async fetch() {
    this.bank = this.$store.state.bank;
  },
  computed: {
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("manageMember_write")) return true;
        else return false;
      }
    },
  },
  methods: {
    handleUpdateMember(item) {
      this.updateForm = Object.assign({}, item);
      this.updateMember = true;
    },
    ...mapActions("member", [
      "getReportmember",
      "getReportmemberbyid",
      "getMemberDeposit",
      "getMemberWithdraw",
      "changePasswordMember",
    ]),
    getthaidate(timethai) {
      const time = this.$moment(timethai).format("YYYY-MM-DD เวลา HH:mm:ss");

      return time;
    },
    getDateTime(date, time) {
      let dateFormat = "YYYY-MM-DD";
      let timeFormat = "HH:mm:ss";
      return this.$moment(
        `${this.$moment(date).format(dateFormat)} ${this.$moment(time).format(
          timeFormat
        )}`,
        "YYYY-MM-DD HH:mm:ss"
      )
        .utc()
        .format(`${dateFormat} ${timeFormat}`);
    },
    getDateFilter() {
      let start = undefined;
      let end = undefined;
      if (this.dateFilter.startDate) {
        if (this.dateFilter.startTime) {
          start = this.getDateTime(
            this.dateFilter.startDate,
            this.dateFilter.startTime
          );
        } else {
          start = this.getDateTime(
            this.dateFilter.startDate,
            new Date().setHours(0, 0, 0, 0)
          );
        }
      }
      if (this.dateFilter.endDate) {
        if (this.dateFilter.endTime) {
          end = this.getDateTime(
            this.dateFilter.endDate,
            this.dateFilter.endTime
          );
        } else {
          end = this.getDateTime(
            this.dateFilter.endDate,
            new Date().setHours(23, 59, 59, 999)
          );
        }
      }
      return {
        end: this.$moment(end).format("YYYY-MM-DD HH:mm:ss") + "Z",
        start: this.$moment(start).format("YYYY-MM-DD HH:mm:ss") + "Z",
      };
    },
    getParameter() {
      let dateFill = this.getDateFilter();
      let parameter = {
        take: this.options.itemsPerPage,
        page: this.options.page,
        start: dateFill.start,
        end: dateFill.end,
      };
      return parameter;
    },
    async getData() {
      this.isLoading = true;
      let params = this.getParameter();
      try {
        console.log(params);
        const data = await this.getReportmember(params);
        this.itemSearch = data;
        console.log(this.itemSearch, "data");
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async CheckDeposit(username) {
      this.isLoading = true;
      let { data } = await this.getMemberDeposit(username);
      console.log(data);
      this.items_deposit = data.info;
      this.isLoading = false;
      this.dlDeposit = true;
    },
    async CheckWithdraw(username) {
      this.isLoading = true;
      let { data } = await this.getMemberWithdraw(username);
      console.log(data);
      this.items_withdraw = data.info;
      this.isLoading = false;

      this.dlWithdraw = true;
    },
    yesterday() {
      console.log("yesterday");
    },
    today() {
      console.log("today");
    },
    openchangePass(item) {
      this.newPass.id = item.id;
      this.changpassdl = true;
    },
    async handleLockUser(item) {
      const payload = {
        id: item.id,
        status: false,
      };
      try {
        this.$swal({
          title: `แน่ใจหรือว่าไม่ต้องการ Lock User : ${item.username} นี้ ?`,
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await this.changeStatus(payload);
            this.$swal({
              icon: "success",
              title: "Lock เรียบร้อย",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              if (result) {
                this.changpassdl = false;
                await this.getData();
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async handlesubmitChangePass() {
      try {
        this.$swal({
          title: "ต้องการเปลี่ยนรหัสผ่านหรือไม่ ?",
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            let body = {
              id: this.newPass.id,
              password: this.newPass.password,
            };
            console.log(body, "body");
            await this.changePasswordMember(body);
            this.$swal({
              icon: "success",
              title: "เปลี่ยนรหัสผ่านสำเร็จ",
              allowOutsideClick: false,
              showConfirmButton: false,
              timer: 1500,
            }).then(async (result) => {
              if (result) {
                this.changpassdl = false;
                await this.getData();
              }
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    closeChangepass() {
      this.$refs.changepass.reset();
      this.changpassdl = false;
    },
  },
};
</script>

<style></style>
