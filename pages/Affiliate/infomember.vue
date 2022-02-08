<template>
  <div class="bgpage">
    <div class="container">
      <div class="title_header pt-2 pt-md-5 pb-md-4">
        <h2>ข้อมูลสมาชิก affiliate</h2>
      </div>
      <div class="section_search">
        <div class="d-flex pb-3" style="align-items: baseline">
          <div class="px-2">Username:</div>
          <div class="px-2">
            <b-form-input
              v-model="username"
              placeholder="กรอก Username"
              style="width: 220px"
            ></b-form-input>
          </div>
          <button class="btn btn-success btn-sm" @click="search">ค้นหา</button>
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
                    <div class="col-12 col-md-6">
                      <card-report
                        title="รายได้ปัจจุบันที่ยังไม่ได้รับ"
                        :value="userinfo.notrecieveIncome"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-md-6 ">
                      <card-report
                        title="รายสะสมได้ที่รับไปเเล้ว"
                        :value="userinfo.recieveIncome"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
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
                    <div class="col-12 col-md-6 p-1">
                      <card-report
                        title="จำนวน downline วันนี้"
                        :value="Downline.today"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-md-6 p-1">
                      <card-report
                        title="จำนวน downline ทั้งหมด"
                        :value="Downline.allday"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-md-6 p-1">
                      <card-report
                        title="ยอดฝาก downline วันนี้"
                        :value="Downline.deposit"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-md-6 p-1">
                      <card-report
                        title="ยอดฝาก downline สะสม"
                        :value="Downline.depositbalance"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-md-6 p-1">
                      <card-report
                        title="ยอดเสีย downline วันนี้"
                        :value="Downline.losstoday"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-md-6 p-1">
                      <card-report
                        title="ยอดเสีย downline สะสม"
                        :value="Downline.lossbalance"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-md-6 p-1">
                      <card-report
                        title="ยอดคอมมิชชั่น downline วันนี้"
                        :value="Downline.commissiontoday"
                        iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
                      ></card-report>
                    </div>
                    <div class="col-12 col-md-6 p-1">
                      <card-report
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
                <div class="text_card">Link Affiliate</div>
                <div class="body_card pa-2">
                  <div class="row">
                    <div class="col-12 col-md-12">
                      <div class="p-2 card-child shadow">
                        ชื่อ Link Affiliate
                        <hr class="solid" />
                        <div
                          class="d-flex"
                          style="justify-content: space-between"
                        >
                          <div
                            class="copy-link"
                            @click="copylink(Affiliate.link)"
                          >
                            <img
                              src="https://image.smart-ai-api.com/public/thongtest/coppybtn.png"
                              alt=""
                              class="copy_icon"
                            />
                            copy
                          </div>
                          <div class="text-end">{{ Affiliate.link }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="p-2 card-child shadow">
                        จำนวนคนเปิดลิงค์วันนี้
                        <hr class="solid" />
                        <div class="text-end">{{ Affiliate.todayClick }}</div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="p-2 card-child shadow">
                        จำนวนคนเปิดลิงค์ทั้งหมด
                        <hr class="solid" />
                        <div class="text-end">{{ Affiliate.alldayClick }}</div>
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
                  ><button
                    class="btn btn-light btn-sm"
                    @click="$bvModal.show('edit-config')"
                  >
                    แก้ไขConfig
                  </button>
                </div>

                <div class="body_card pa-2">
                  <div class="row">
                    <div class="col-12 col-md-6 ">
                      <div class="card-child shadow">
                        ชื่อ : {{ config.name }}
                      </div>
                    </div>
                    <div class="col-12 col-md-6 ">
                      <div class="card-child shadow">
                        การรับรายได้ : {{ config.recieve_text }}
                      </div>
                    </div>
                    <div class="col-12 col-md-4 ">
                      <div class="card-child shadow">
                        เปอร์เซ็นยอดฝาก
                        <hr class="solid" />
                        <div class="text-end text-success">
                          {{ config.percentDeposit }} %
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 ">
                      <div class="card-child shadow">
                        เปอร์เซ็นยอดเสีย
                        <hr class="solid" />
                        <div class="text-end text-danger">
                          {{ config.percentLoss }} %
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-4 ">
                      <div class="card-child shadow">
                        เปอร์เซ็นCommission
                        <hr class="solid" />
                        <div class="text-end">
                          {{ config.percentCommission }} %
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- configcard -->
            <!-- <b-modal
              id="edit-config"
              centered
              size="md"
              hide-header-close
              title="แก้ไขการตั้งค่า Config"
              hide-footer
              ><form>
                <div class="card_config">
                  <div class="input_form">
                    <span class="px-2">ชื่อ : </span>
                    <div>{{ config.name }}</div>
                  </div>

                  <div class="input_form">
                    <span c class="px-2">เปอร์เซ็นยอดฝาก(%) : </span>
                    <div>
                      <b-input type="number" v-model="config.percentDeposit" />
                    </div>
                  </div>
                  <div class="input_form">
                    <span class="px-2">เปอร์เซ็นยอดเสีย(%) :</span>
                    <div>
                      <b-input type="number" v-model="config.percentLoss" />
                    </div>
                  </div>
                  <div class="input_form">
                    <span class="px-2">เปอร์เซ็นCommission(%) : </span>
                    <div>
                      <b-input
                        type="number"
                        v-model="config.percentCommission"
                      />
                    </div>
                  </div>
                  <div class="input_form">
                    <span class="px-2">การรับรายได้ : </span>
                    <b-form-select
                      v-model="config.recieve"
                      :options="options"
                    ></b-form-select>
                  </div>
                </div>
                <div class="text-center">
                  <button class="btn btn-primary btn-md" @click="editconfig">
                    เเก้ไข
                  </button>
                  <button
                    class="btn btn-danger btn-md"
                    @click="$bvModal.hide('edit-config')"
                  >
                    ยกเลิก
                  </button>
                </div>
              </form>
            </b-modal> -->
          </div>
          <div class="col-12 col-md-12 p-3 mt-5">
            <div class="card-child">
              <div class="section_search">
                <div
                  class="d-flex pb-3 date-select"
                  style="align-items: baseline"
                >
                  <div class="px-2">ค้นหาวันที่ :</div>
                  <div class="px-2">
                    <input type="date" v-model="startdate" />
                  </div>
                  <div class="px-2">ถึงวันที่ :</div>
                  <input type="date" v-model="enddate" />
                  <button class="btn btn-success btn-sm" @click="search">
                    ค้นหา
                  </button>
                </div>
              </div>
              <div class="card-show mb-4 p-md-3 shadow">
                <table class="table p-3">
                  <thead>
                    <tr class="font-weight-bold">
                      <th class="col-1">No.</th>
                      <th class="col">username</th>
                      <th class="col">ยอดฝาก</th>
                      <th class="col">ยอดเสีย</th>
                      <th class="col">โบนัสยอดฝาก</th>
                      <th class="col">โบนัสยอดเสีย</th>
                      <th class="col">โบนัสค่าCommission</th>
                      <th class="col text-center">สายงาน</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in dataRender" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.username }}</td>
                      <td>{{ item.deposit }}</td>
                      <td>{{ item.loss }}</td>
                      <td>{{ item.bonusDeposit }}</td>
                      <td>{{ item.bonusLoss }}</td>
                      <td>{{ item.bonusCommission }}</td>
                      <td class="text-center">{{ item.line }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
      this.$bvModal.hide("edit-config");
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

<style lang="scss">
.card-show {
  padding: 10px;
  border-radius: 10px;
  position: relative;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  font-size: 18px;
  box-shadow: 0px 5px 8px 0px rgb(179 176 176 / 75%);
}
.title_header {
  text-align: center;
  font-weight: bold;
}

.copy-link {
  .copy_icon {
    height: 25px;
  }
  cursor: pointer;
}
.card_config {
  padding: 10px;
  input,
  select {
    padding: 0;
    margin: 0px 0px;
    border: none;
    border-bottom: 1px solid #aeaeae;
    text-align: center;
    border-radius: 0;
    width: 120px;
  }
  .form-control:focus {
    color: #495057;
    background-color: #fff;
    /* border-color: #80bdff; */
    text-align: center;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(255 255 255 / 25%);
  }
}
.section_search {
  .date-select {
    font-weight: bold;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: linear-gradient(
      to bottom right,
      #111111 0%,
      #343a40 100%
    ) !important;
    padding: 15px;
    color: white;
  }
}
#edit-config___BV_modal_header_.modal-header {
  background: linear-gradient(
    to bottom right,
    #111111 0%,
    #002952 100%
  ) !important;
  color: rgb(255, 255, 255);
}
.input_form {
  display: flex;
  align-items: baseline;
  padding: 5px;
}
.card_affiliate {
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
  background: #f9f9f9;

  .text_card {
    font-weight: bold;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: linear-gradient(
      to bottom right,
      #111111 0%,
      #343a40 100%
    ) !important;
    padding: 15px;
    color: white;
  }
  .text_card_child {
    font-weight: bold;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: linear-gradient(
      to bottom right,
      rgba(126, 186, 133, 0.81) 0%,
      #0e5c20 100%
    ) !important;
    padding: 15px;
    color: white;
  }
  .body_card {
    .card-child {
      border-radius: 10px;
      background: white;
      box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%),
        0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%) !important;
      transition: 0.2s;
      .text-end {
        font-weight: bold;
        font-size: large;
      }
    }
    .card-child:hover {
      transform: scale(1.05);
      transition: 0.2s;
    }
  }
}
</style>
