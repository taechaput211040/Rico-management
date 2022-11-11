<template>
  <div class="bgpage">
    <div>
      <h2>ข้อมูลสมาชิกลิงก์รับทรัพย์</h2>
      <div class="section_search">
        <div class="px-2 d-flex align-baseline">
          <v-text-field
            v-model="username"
            outlined
            dense
            solo
            hide-details="auto"
            placeholder="กรอก Username"
            class="col-8 col-md-3 pa-2"
          /><v-btn color="primary" @click="search">ค้นหา</v-btn>
        </div>
      </div>
      <div class="show_information">
        <div class="row">
          <div class="col-12 col-md-6">
            <!-- useritemcard -->
            <div class="col-12 col-12">
              <div class="card_affiliate">
                <div class="text_card">Username : {{ userinfo.username }}</div>
                <div class="body_card pa-3">
                  <div class="row">
                    <div class="col-12 col-sm-6 col-md-6">
                      <card-report
                        title="รายได้ปัจจุบันที่ยังไม่ได้รับ"
                        :value="userinfo.notrecieveIncome"
                        iconSrc="https://image.smart-ai-api.com/public/Rico-main-resite/profit.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 ">
                      <card-report
                        title="รายสะสมได้ที่รับไปเเล้ว"
                        :value="userinfo.recieveIncome"
                        iconSrc="https://image.smart-ai-api.com/public/Rico-main-resite/hand.png"
                      ></card-report>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- useritemcard -->

            <!-- downlinecard -->
            <div class="col-12 col-md-12 ">
              <div class="card_affiliate">
                <div class="text_card_child">Downline</div>
                <div class="body_card pa-3">
                  <div class="row">
                    <div class="col-12  col-sm-4 col-md-6 p-1">
                      <card-report
                        :iconshow="false"
                        title="จำนวน downline วันนี้"
                        :value="Downline.today"
                      ></card-report>
                    </div>
                    <div class="col-12 col-sm-4 col-md-6 p-1">
                      <card-report
                        :iconshow="false"
                        title="จำนวน downline ทั้งหมด"
                        :value="Downline.allday"
                      ></card-report>
                    </div>
                    <div class="col-12 col-sm-4 col-md-6 p-1">
                      <card-report
                        :iconshow="false"
                        title="ยอดฝาก downline วันนี้"
                        titleclass="success--text"
                        :value="Downline.deposit"
                      ></card-report>
                    </div>
                    <div class="col-12 col-sm-4 col-md-6 p-1">
                      <card-report
                        :iconshow="false"
                        title="ยอดฝาก downline สะสม"
                        :value="Downline.depositbalance"
                        titleclass="success--text"
                      ></card-report>
                    </div>
                    <div class="col-12 col-sm-4 col-md-6 p-1">
                      <card-report
                        :iconshow="false"
                        title="ยอดเสีย downline วันนี้"
                        :value="`-${Downline.losstoday}`"
                        titleclass="error--text"
                      ></card-report>
                    </div>
                    <div class="col-12 col-sm-4 col-md-6 p-1">
                      <card-report
                        :iconshow="false"
                        title="ยอดเสีย downline สะสม"
                        titleclass="error--text"
                        :value="`-${Downline.lossbalance}`"
                      ></card-report>
                    </div>
                    <div class="col-12 col-sm-4 col-md-6 p-1">
                      <card-report
                        :iconshow="false"
                        title="ยอดคอมมิชชั่น downline วันนี้"
                        titleclass="primary--text"
                        :value="Downline.commissiontoday"
                      ></card-report>
                    </div>
                    <div class="col-12 col-sm-4 col-md-6 p-1">
                      <card-report
                        :iconshow="false"
                        titleclass="primary--text"
                        title="ยอดคอมมิชชั่น downline สะสม"
                        :value="Downline.commissionbalance"
                      ></card-report>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- downlinecard -->
          </div>
          <div class="col-12 col-md-6">
            <!-- linkcard -->
            <div class="col-12 col-md-12 ">
              <div class="card_affiliate">
                <div class="text_card">ลิงก์รับทรัพย์</div>
                <div class="body_card pa-2">
                  <div class="row">
                    <div class="col-12 col-sm-6 col-md-12">
                      <div class="p-2 card-child shadow">
                        ชื่อลิงก์รับทรัพย์
                        <div
                          class="d-flex mt-2"
                          style="align-items: center;justify-content: space-between;"
                        >
                          <div
                            class="copy-link d-flex font-weight-bold"
                            @click="copylink(Affiliate.link)"
                          >
                            <img
                              src="https://image.smart-ai-api.com/public/thongtest/coppybtn.png"
                              alt=""
                              class="copy_icon"
                            />
                            คัดลอก
                          </div>
                          <div class="text-end">{{ Affiliate.link }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-3 col-md-6">
                      <div class="p-2 card-child shadow">
                        จำนวนคนเปิดลิงค์วันนี้

                        <div class="text-end  mt-2">
                          {{ Affiliate.todayClick }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-3 col-md-6">
                      <div class="p-2 card-child shadow">
                        จำนวนคนเปิดลิงค์ทั้งหมด
                        <div class="text-end  mt-2">
                          {{ Affiliate.alldayClick }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- linkcard -->
            <!-- configcard -->
            <div class="col-12 col-md-12 p-2">
              <div class="card_affiliate">
                <div
                  class="d-flex text_card"
                  style="justify-content: space-between; align-items: baseline"
                >
                  <span>โหมดการตั้งค่าปัจจุบัน (Config)</span
                  ><v-btn
                    color="white"
                    small
                    class="font-weight-bold"
                    @click="setConfig()"
                  >
                    <v-icon small left>mdi-pencil</v-icon>แก้ไขConfig
                  </v-btn>
                </div>

                <div class="body_card pa-2">
                  <div class="row">
                    <div class="col-12 col-sm-6 col-md-6 ">
                      <div class="card-child shadow">
                        ชื่อ : {{ config.name }}
                      </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 ">
                      <div class="card-child shadow">
                        การรับรายได้ : {{ config.recieve_text }}
                      </div>
                    </div>
                    <div class="col-12 col-sm-4 col-md-4 ">
                      <div class="card-child shadow">
                        เปอร์เซ็นยอดฝาก
                        <div class="text-end mt-2 text-success">
                          {{ config.percentDeposit }} %
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-4 col-md-4 ">
                      <div class="card-child shadow">
                        เปอร์เซ็นยอดเสีย

                        <div class="text-end  mt-2 text-danger">
                          {{ config.percentLoss }} %
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-sm-4 col-md-4 ">
                      <div class="card-child shadow">
                        เปอร์เซ็นCommission

                        <div class="text-end  mt-2">
                          {{ config.percentCommission }} %
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- configcard -->

            <v-dialog v-model="editDialog" max-width="800px" height="auto">
              <v-card class="pa-5">
                <v-card-title>
                  <h3 class="font-weight-bold mx-auto primary--text">
                    แก้ไข Config
                  </h3>
                </v-card-title>
                <form>
                  <div class="card_config">
                    <div class="input_form">
                      <span class="px-2">ชื่อ : </span>
                      <div>{{ config.name }}</div>
                    </div>

                    <div class="input_form">
                      <span c class="px-2">เปอร์เซ็นยอดฝาก(%) : </span>
                      <div class="col-md-6 col-4 pa-0">
                        <v-text-field
                          dense
                          outlined
                          type="number"
                          hide-details="auto"
                          v-model="config.percentDeposit"
                        />
                      </div>
                    </div>
                    <div class="input_form">
                      <span class="px-2">เปอร์เซ็นยอดเสีย(%) :</span>
                      <div class="col-md-6 col-4 pa-0">
                        <v-text-field
                          dense
                          outlined
                          type="number"
                          hide-details="auto"
                          v-model="config.percentLoss"
                        />
                      </div>
                    </div>
                    <div class="input_form">
                      <span class="px-2">เปอร์เซ็นCommission(%) : </span>
                      <div class="col-md-6 col-4 pa-0">
                        <v-text-field
                          dense
                          outlined
                          type="number"
                          hide-details="auto"
                          v-model="config.percentCommission"
                        />
                      </div>
                    </div>
                    <div class="input_form">
                      <span class="px-2">การรับรายได้ : </span>
                      <div class="col-md-6 col-4 pa-0">
                        <v-select
                          dense
                          outlined
                          v-model="config.recieve"
                          placeholder="เลือกการรับรายได้"
                          :items="options"
                          hide-details="auto"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <v-btn color="primary" @click="editconfig">
                      เเก้ไข
                    </v-btn>
                    <v-btn color="error" @click="editDialog = false">
                      ยกเลิก
                    </v-btn>
                  </div>
                </form>
              </v-card>
            </v-dialog>
          </div>
          <v-card class="ma-4 rounded-lg" width="100%">
            <v-row class="pa-3 ">
              <div class="col-12 col-sm-2">
                จากวันที่
                <el-date-picker
                  arrow-control
                  placeholder="วันที่"
                  style="width: 100%"
                  dense
                />
              </div>
              <div class="col-12 col-sm-2">
                ถึงวันที่
                <el-date-picker
                  arrow-control
                  dense
                  placeholder="วันที่"
                  style="width: 100%"
                />
              </div>
              <div class="col-12 col-sm-3">
                <br class="d-none d-sm-block" />
                <v-btn color="primary" @click="search"
                  ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
                >
              </div>
            </v-row>
            <v-card class=" mt-2">
              <v-data-table
                :headers="headerReport"
                :items="dataRender"
                hide-default-footer
              >
                <template #[`item.no`]="{index}">
                  <span class="font-weight-bold">
                    {{ index + 1 }}
                  </span>
                </template>
              </v-data-table>
            </v-card></v-card
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    startdate(newValue, Oldvalue) {
      if (newValue) {
        this.startdate;
      }
    },
    enddate(newValue, Oldvalue) {
      if (newValue) {
        this.enddate;
      }
    }
  },
  data() {
    return {
      dataRender: [],
      headerReport: [
        {
          text: "รายการที่",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "ยอดฝาก",
          value: "deposit",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
          cellClass: "success--text font-weight-bold"
        },
        {
          text: "ยอดเสีย",
          value: "loss",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
          cellClass: "error--text font-weight-bold"
        },
        {
          text: "โบนัสยอดฝาก",
          value: "bonusDeposit",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "โบนัสยอดเสีย",
          value: "bonusLoss",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "โบนัสค่าCommission",
          value: "bonusCommission",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
          cellClass: "primary--text font-weight-bold"
        },
        {
          text: "สายงาน",
          value: "line",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        }
      ],
      editDialog: false,
      options: ["รายวัน", "รายสัปดาห์", "รายเดือน"],
      username: "",
      hash: "membertest",
      userinfo: {
        username: "RC422111",
        recieveIncome: 100,
        notrecieveIncome: 200
      },
      Downline: {
        today: 100,
        allday: 7200,
        deposit: 200,
        depositbalance: 16000,
        losstoday: 150,
        lossbalance: 300,
        commissiontoday: 1000,
        commissionbalance: 1000
      },
      Affiliate: {
        link: "linklinklinklinklinklink",
        todayClick: 5,
        alldayClick: 30
      },
      config: {
        name: "Config name",
        percentDeposit: 5,
        percentLoss: 6,
        percentCommission: 20,
        recieve: 1,
        recieve_text: "รายวัน"
      },
      dataRender: [
        {
          username: "RC04332",
          deposit: 3000,
          loss: 2000,
          bonusDeposit: 400,
          bonusLoss: 200,
          bonusCommission: 3000,
          line: "A"
        },
        {
          username: "RC04471",
          deposit: 3000,
          loss: 2000,
          bonusDeposit: 400,
          bonusLoss: 200,
          bonusCommission: 3000,
          line: "B"
        }
      ],
      startdate: "",
      enddate: ""
    };
  },
  mounted: async function() {
    await this.getddl();
  },
  methods: {
    setConfig() {
      this.editDialog = true;
      this.getSetting();
    },
    copylink(link) {
      var textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      this.$swal("", `คัดลอก Link : ${link} เรียบร้อยแล้ว`, "success");
    },
    async search() {
      this.getSetting();
      this.getData();
      this.getDataTable(this.startdate, this.enddate, this.hash, this.username);
    },
    async editconfig() {
      await this.$axios
        .patch(
          `http://localhost:3001/api/aff/admin/setting/${this.config.id}`,
          {
            dp_bonus: parseInt(this.config.percentDeposit),
            commission_rate: parseInt(this.config.percentCommission),
            winlos_rate: parseInt(this.config.percentLoss),
            recieve_mode: parseInt(this.config.recieve)
          }
        )
        .then(res => {
          this.config.name = res.data.configName;
          this.config.percentDeposit = res.data.dp_bonus;
          this.config.percentLoss = res.data.winlos_rate;
          this.config.percentCommission = res.data.commission_rate;
          this.config.recieve_text = res.data.recieve_mode_text;
          this.config.recieve = res.data.recieve_mode;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getddl() {
      fetch(`http://localhost:3001/api/aff/admin/setting/recieve_mode`)
        .then(stream => stream.json())
        .then(data => (this.options = data))
        .catch(error => console.error(error));
    },
    async getSetting() {
      const { settings } = await this.$axios.$get(
        `http://localhost:3001/api/aff/member/setting/membertest/${this.username}`
      );
      console.log(settings);
      this.config.id = settings.Id;
      this.config.name = settings.configName;
      this.config.percentDeposit = settings.dp_bonus;
      this.config.percentLoss = settings.winlos_rate;
      this.config.percentCommission = settings.commission_rate;
      this.config.recieve_text = settings.recieve_mode_text;
      this.config.recieve = settings.recieve_mode;
    },
    async getData() {
      const {
        username,
        Affiliate,
        Downline,
        userinfo
      } = await this.$axios.$get(
        `http://localhost:3000/api/dashboard/member/${this.hash}/${this.username}`
      );
      this.username = username;
      this.Affiliate = Affiliate;
      this.Downline = Downline;
      this.userinfo = userinfo;
    },
    async getDataTable(dateForm, dateTo, hash, username) {
      let today = new Date();
      dateForm =
        dateForm === ""
          ? new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).toISOString()
          : dateForm;
      dateTo =
        dateTo === ""
          ? new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate()
            ).toISOString()
          : dateTo;

      this.dataRender = await this.$axios
        .$get(
          `http://localhost:3000/api/dashboard/dailychildrenbyparentdaterange/${hash}/${username}/${dateForm}/${dateTo}`
        )
        .catch(er => {
          this.dataRender = [];
          console.log(er);
        });
    }
  }
};
</script>

