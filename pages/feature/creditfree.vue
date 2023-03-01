<template>
  <div>
    <loading-page v-if="loading"></loading-page>

    <div>
      <h2 class="my-4">Free Credit</h2>
      <v-card class="pt-3">
        <div class="d-flex">
          <h3 class="ma-2">รอบทั้งหมด</h3>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="create()">สร้าง</v-btn>
        </div>
        <v-card elevation="1" class="mt-3">
          <v-data-table
            :headers="headersfreecrdit"
            :items="tableData"
            :options.sync="options"
            disable-pagination
          >
            <template #[`item.no`]="{ index }">
              {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
            </template>
            <template #[`item.username`]="{ item }">
              <v-btn
                small
                fab
                color="primary"
                rounded
                @click="findTargetActivity(item.id)"
              >
                <v-icon>mdi-account-box-multiple</v-icon>
              </v-btn>
            </template>
            <template #[`item.user`]="{ item }">
              {{ item.user.length }}
            </template>
            <template #[`item.time`]="{ item }">
              <span class="font-weight-bold"
                >{{ item.startDate | dateFormat }} ถึง
                {{ item.endDate | dateFormat }}</span
              >
            </template>
            <template #[`item.isActive`]="{ item }">
              <span
                class="font-weight-bold"
                :class="[
                  { 'success--text': item.isActive },
                  { 'error--text': !item.isActive },
                ]"
              >
                {{ item.isActive ? "ACTIVE" : "INACTIVE" }}</span
              >
            </template>
            <template #[`item.action`]="{ item }">
              <div class="d-flex">
                <v-btn color="warning" @click="handleClickEdit(item)">
                  Edit
                </v-btn>

                <v-btn
                  class="mx-1"
                  color="error"
                  @click="handleClickDelete(item.id)"
                  >Delete</v-btn
                >
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
      <v-dialog
        v-model="createmodel"
        persistent
        max-width="800px"
        height="auto"
      >
        <v-card class="pa-5 font-weight-bold">
          <v-form ref="formCreate">
            <v-card-title>
              <h2 class="font-weight-bold py-3 mx-auto">กรอกรายละเอียด</h2>
            </v-card-title>
            <v-row>
              <v-col cols="12">
                ชื่อกิจกรรม
                <v-text-field
                  outlined
                  dense
                  v-model="form.activityName"
                  hide-details="auto"
                  placeholder="กรอกชื่อกิจกรรม"
                ></v-text-field
              ></v-col>

              <v-col cols="12" sm="6">
                จำนวนเครดิตฟรีที่ได้
                <v-text-field
                  outlined
                  v-model.number="form.credit"
                  dense
                  type="number"
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
                          v-model.trim="datetimeSelect.startDate"
                        />
                      </v-col>
                      <v-col>
                        <el-time-picker
                          class="full-width"
                          format="HH:mm"
                          v-model.trim="datetimeSelect.startTime"
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
                          v-model.trim="datetimeSelect.endDate"
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
                          v-model.trim="datetimeSelect.endTime"
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
                  v-model.number="form.maxQuota"
                  hide-details="auto"
                  type="number"
                  placeholder="กรอกจำนวนสิทธิ์ที่เปิด"
                ></v-text-field></v-col
              ><v-col cols="12" sm="6">
                อั้นถอน(เป็นจำนวนเงิน)
                <v-text-field
                  outlined
                  type="number"
                  dense
                  v-model.number="form.wdlimit"
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
                      v-model.number="form.SLOT"
                      dense
                      hide-details="auto"
                      label="SLOT"
                      type="number"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6" sm="4">
                    <v-text-field
                      outlined
                      v-model.number="form.FOOTBALL"
                      dense
                      hide-details="auto"
                      label="Sportbook"
                      type="number"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6" sm="4">
                    <v-text-field
                      outlined
                      dense
                      v-model.number="form.ESPORT"
                      hide-details="auto"
                      type="number"
                      label="ESPORT"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6" sm="4">
                    <v-text-field
                      outlined
                      v-model.number="form.HORSERACING"
                      dense
                      hide-details="auto"
                      label="HorseRacing"
                      type="number"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6" sm="4">
                    <v-text-field
                      outlined
                      dense
                      v-model.number="form.CASINO"
                      hide-details="auto"
                      type="number"
                      label="casino"
                    ></v-text-field
                  ></v-col>
                  <v-col cols="6" sm="4"
                    ><v-text-field
                      outlined
                      dense
                      hide-details="auto"
                      type="number"
                      label="lotto"
                      v-model.number="form.LOTTO"
                    ></v-text-field
                  ></v-col>
                </v-row></div
            ></v-row>
            <v-row
              class="mt-3"
              cols="12"
              v-if="form.hasOwnProperty('isActive')"
            >
              <v-col>
                <label for="phone">Active Status</label>
                <v-select
                  dense
                  outlined
                  v-model="form.isActive"
                  :items="selectOption"
                ></v-select>
              </v-col>
            </v-row>
            <v-card-actions>
              <div class="mx-auto mt-3">
                <v-btn color="success" @click="onSubmitCreate" class="mx-1"
                  >ตกลง</v-btn
                ><v-btn class="mx-1" color="error" @click="handleClickClose()"
                  >ปิด</v-btn
                >
              </div>
            </v-card-actions>
          </v-form></v-card
        >
      </v-dialog>
      <v-row v-if="selectData" class="mt-5">
        <v-col>
          <v-card>
            <v-row>
              <v-col cols="8">
                <h4 class="pa-2">รายชื่อผู้สมัคร</h4>
              </v-col>
              <v-col class="float-right" cols="3">
                <div>
                  <span>
                    <v-text-field
                      dense
                      placeholder="ใส่ username ลูกค้า"
                      outlined
                      v-model="searchValue"
                      hide-details="auto"
                    ></v-text-field
                  ></span>
                </div>
              </v-col>
              <v-col cols="1">
                <div class="m-auto">
                  <v-btn fab small @click="searchUser">
                    <v-icon color="primary">mdi-magnify</v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <div class="mt-4">
              <v-data-table
                :headers="headersUser"
                :items="selectData.user"
                :options.sync="optionsUser"
              >
                <template #[`item.no`]="{ index }">
                  {{
                    optionsUser.itemsPerPage * (optionsUser.page - 1) +
                    (index + 1)
                  }}
                </template>
                <template #[`item.created_at`]="{ item }">
                  <span class="font-weight-bold">{{
                    item.created_at | dateFormat
                  }}</span>
                </template>
                <template #[`item.action`]="{ item }">
                  <v-btn
                    v-if="!item.isActive"
                    @click="handleClickApprove(item)"
                    color="primary"
                    >เติม</v-btn
                  >
                  <v-btn v-else disabled color="secondary">เติม</v-btn>
                </template>
                <template #[`item.isActive`]="{ item }">
                  <span
                    class="font-weight-bold"
                    :class="[
                      { 'success--text': item.isActive },
                      { 'error--text': !item.isActive },
                    ]"
                  >
                    {{ item.isActive ? "ACTIVE" : "INACTIVE" }}</span
                  >
                </template></v-data-table
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import LoadingPage from "../../components/LoadingPage.vue";
import landingpage from "../landingpage.vue";
export default {
  components: { landingpage, LoadingPage },
  data() {
    return {
      feature_status: true,
      isEdit: false,
      edititem: {},
      loading: false,
      searchValue: "",
      selectOption: [
        { value: true, text: "Active" },
        { value: false, text: "InActive" },
      ],
      optionsUser: {},
      form: {
        activityName: null,
        startDate: null,
        endDate: null,
        credit: 0,
        CASINO: 2,
        ESPORT: 2,
        FOOTBALL: 2,
        SLOT: 2,
        LOTTO: 2,
        HORSERACING: 2,
        wdlimit: 100,
        createBy: this.$store.state.auth.user,
        maxQuota: 15,
        quotaRemain: 20,
        updateBy: null,
      },
      datetimeSelect: {
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      tempQuotaRemain: 0,
      options: {},
      createmodel: false,
      headersfreecrdit: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
        },
        {
          text: "ผู้สมัคร",
          value: "username",
          align: "center",
          sortable: false,
        },
        {
          text: "ชื่อโปรโมชั้น",
          value: "activityName",
          align: "center",
          sortable: false,
        },
        {
          text: "เวลา",
          value: "time",
          align: "center",
          sortable: false,
        },
        {
          text: "แจกเครดิต",
          value: "credit",
          align: "center",
          sortable: false,
        },
        {
          text: "จำนวนสิทธิ์ทั้งหมด	",
          value: "maxQuota",
          align: "center",
          sortable: false,
        },
        {
          text: "จำนวนสิทธิ์คงเหลือ",
          value: "quotaRemain",
          align: "center",
          sortable: false,
        },
        {
          text: "จำนวนผู้สมัคร",
          value: "user",
          align: "center",
          sortable: false,
        },
        {
          text: "สถานะ",
          value: "isActive",
          align: "center",
          sortable: false,
        },
        {
          text: "ดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
        },
      ],
      headersUser: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
        },
        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false,
        },

        {
          text: "เวลาสมัคร",
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: "สถานะ",
          value: "isActive",
          align: "center",
          sortable: false,
        },
        {
          text: "ACTION",
          value: "action",
          align: "center",
          sortable: false,
        },
      ],
      tableData: [],
      selectData: null,
    };
  },

  async mounted() {
    await this.onLoadActivityData();
  },
  methods: {
    async searchUser() {
      this.loading = true;
      if (this.searchValue) {
        try {
          let params = {
            id: this.selectData.id,
            username: this.searchValue,
          };
          let response = await this.$store.dispatch(
            "setting/searchUserAdmin",
            params
          );
          this.selectData = response;
          this.loading = false;
        } catch (error) {
          this.showInfoAlert2(
            "ไม่พบข้อมูล username นี้ในกิจกรรม " + this.selectData.activityName
          );
          this.loading = false;
        }
      } else {
        this.showInfoAlert2("กรุณากรอก USERNAME");
        this.loading = false;
      }
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
    getFilterParameter() {
      let start = undefined;
      let end = undefined;
      if (this.datetimeSelect.startDate) {
        if (this.datetimeSelect.startTime) {
          start = this.getDateTime(
            this.datetimeSelect.startDate,
            this.datetimeSelect.startTime
          );
        } else {
          start = this.getDateTime(
            this.datetimeSelect.startDate,
            new Date().setHours(0, 0, 0, 0)
          );
        }
      }
      if (this.datetimeSelect.endDate) {
        if (this.datetimeSelect.endTime) {
          end = this.getDateTime(
            this.datetimeSelect.endDate,
            this.datetimeSelect.endTime
          );
        } else {
          end = this.getDateTime(
            this.datetimeSelect.endDate,
            new Date().setHours(23, 59, 59, 999)
          );
        }
      }
      let params = {
        startDate: this.$moment(start).format("YYYY-MM-DD HH:mm:ss") + "Z",
        endDate: this.$moment(end).format("YYYY-MM-DD HH:mm:ss") + "Z",
      };

      return params;
    },
    async create() {
      this.isEdit = false;
      this.createmodel = true;
    },
    async onLoadActivityData() {
      this.loading = true;
      try {
        let data = await this.$store.dispatch("setting/getCreditFree");
        this.$store.commit("setting/setActivity", data);
        this.tableData = data;
        this.feature_status = true;
      } catch (error) {
        console.log(error);
        this.feature_status = false;
      }
      this.loading = false;
    },
    handleClickClose() {
      this.cancleForm();
      this.createmodel = false;
      this.$refs.formCreate.resetValidation();
    },
    async onSubmitCreate() {
      let datetime = this.getFilterParameter();
      this.form.startDate = datetime.startDate;
      this.form.endDate = datetime.endDate;
      if (!this.isEdit) {
        this.form.quotaRemain = this.form.maxQuota;
        this.form.createBy = this.$store.state.auth.user;
      } else {
        if (this.tempQuotaRemain != this.form.maxQuota) {
          const quota = this.form.maxQuota - this.tempQuotaRemain;
          if (quota > 0) {
            this.form.quotaRemain += quota;
          } else if (quota < 0) {
            this.form.quotaRemain -= quota;
            if (this.form.quotaRemain < 0) {
              this.form.quotaRemain = 0;
            }
          }
        }
        console.log("this.form", this.form);
        // console.log(this.form);
      }
      // console.log("this.form", this.form);
      if (this.$refs.formCreate.validate()) {
        this.$swal({
          title: `ยืนยันการ ${!this.isEdit ? "สร้าง" : "แก้ไข"} รอบเครดิตฟรี?`,
          icon: "question",
          showCancelButton: true,
          allowOutsideClick: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "สร้าง",
          cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              this.loading = true;
              if (!this.isEdit) {
                await this.$store.dispatch("setting/createActivity", this.form);
                console.log("create");
              } else {
                await this.$store.dispatch("setting/updateActivity", this.form);
                console.log("update");
              }

              this.$swal({
                icon: "success",
                title: `${!this.isEdit ? "สร้าง" : "แก้ไข"}สำเร็จ`,
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 1500,
              }).then(async (result) => {
                this.dlemployee = false;
                if (result) {
                  console.log("thisActive");
                  await this.onLoadActivityData();
                  await this.cancleForm();
                  this.createmodel = false;
                }
                this.loading = false;
              });
            } catch (error) {
              console.log(error);
              await this.cancleForm();
              this.loading = false;

              this.createmodel = false;
            }
          }
        });
      }
    },
    async findTargetActivity(id) {
      this.loading = true;
      let params = {
        id: id,
        username: undefined,
      };
      try {
        let result = await this.$store.dispatch("setting/searchUserAdmin", params);
        console.log(result);
        this.selectData = result;
      } catch (error) {
        console.log(error, "error");
        this.selectData = null;
      }
      this.loading = false;
    },
    cancleForm() {
      this.form = {
        activityName: null,
        startDate: null,
        endDate: null,
        credit: 0,
        CASINO: 2,
        ESPORT: 2,
        FOOTBALL: 2,
        SLOT: 2,
        LOTTO: 2,
        HORSERACING: 2,
        wdlimit: 100,
        creater: this.$store.state.auth.user,
        maxQuota: 15,
        quotaRemain: 20,
      };
    },
    async handleClickApprove(userData) {
      this.$swal({
        title: "ยืนยันการเติมเครดิตฟรี",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.loading = true;
          userData["operator"] = this.$store.state.auth.user;
          await this.$store
            .dispatch("setting/topupById", userData)
            .then((result) => {
              this.showSuccessAlert(result.data.message);
            })
            .catch((err) => {
              this.showErrorAlert(
                err.response.data.message + " code " + err.response.status
              );
              this.onLoadActivityData();
            });
          try {
            const data = {
              isActive: true,
            };
            const res = await this.$store.dispatch(
              "setting/updateUserFreecredit",
              data
            );
            console.log(res.data);
            // this.selectData.user.forEach((element) => {
            //   if (element.id == userData.id) {
            //     element.isActive = true;
            //   }
            // });
            this.loading = false;
          } catch (error) {
            this.showErrorAlert(
              error.response.data.message + " code " + err.response.status
            );
            this.loading = false;
          }
          this.loading = false;
        }
      });
    },
    showSuccessAlert(message) {
      // Use sweetalret2

      this.$swal.fire("สำเร็จ", message, "success", "OK");
    },
    showErrorAlert(message) {
      // Use sweetalret2
      this.$swal.fire("ERROR!", message, "error", "OK");
    },
    showInfoAlert(message) {
      // Use sweetalret2
      this.$swal.fire("ระวัง!", message, "warning", "OK");
    },
    showInfoAlert2(message) {
      // Use sweetalret2
      this.$swal.fire("โปรดทราบ", message, "info", "OK", "CANCLE");
    },
    settimeEdit() {
      this.datetimeSelect = {
        startDate: this.$moment(this.form.startDate).format("L"),
        startTime: this.$moment(this.form.startDate).format(),
        endDate: this.$moment(this.form.endDate).format("L"),
        endTime: this.$moment(this.form.endDate).format(),
      };
      console.log(this.datetimeSelect);
    },
    handleClickEdit(item) {
      this.isEdit = true;
      this.form = { ...item };
      this.settimeEdit();
      this.tempQuotaRemain = this.form.maxQuota;
      this.createmodel = true;
    },
    async handleClickDelete(deleteId) {
      this.loading = true;
      this.$swal({
        title: "ยืนยันการลบ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await this.$store.dispatch(
              "setting/deleteFreecredit",
              deleteId
            );
            this.showSuccessAlert(res.data.message);
            this.tableData.forEach((el, index) => {
              if (el.id == deleteId) {
                this.tableData.splice(index, 1);
              }
            });
            this.loading = false;
          } catch (error) {
            this.showErrorAlert(error.response.data.message);
            this.loading = false;
          }
          this.onLoadActivityData();
          this.loading = false;
        }
      });
      this.loading = false;
    },
  },
};
</script>

<style></style>
