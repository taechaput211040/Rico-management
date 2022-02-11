<template>
  <div>
    <div class="title_header pt-2 pt-md-5 pb-md-4">
      <h2>รายงาน affiliate</h2>
    </div>
    <div class="section_search">
      <div class="d-flex pb-3" style="align-items: baseline">
        <div>
          <v-text-field
            v-model="username"
            placeholder="กรอก Username"
            style="width: 220px"
            outlined
            dense
            solo
            class="mr-2"
            hide-details="auto"
          />
        </div>
        <v-btn color="success" @click="search">ค้นหา</v-btn>
      </div>
    </div>
    <div class="section_card">
      <div class="show_reportcard">
        <div>
          <div class="row">
            <div class="col-12 col-md-6  col-sm-6 body_card">
              <div class="card-child card-report elevation-5">
                ชื่อลิงก์รับทรัพย์
                <hr class="solid" />
                <div
                  class="d-flex pt-3"
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
                  <div class="text-end font-weight-bold ">
                    {{ Affiliate.link }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3  col-sm-3 p-1 body_card">
              <div class="card-child card-report elevation-5">
                ของสมาชิกที่มีการกด
                <hr class="solid my-2" />

                <div class="text-end font-weight-bold primary--text">
                  {{ Affiliate.activeMember }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 col-sm-3 p-1 body_card">
              <div class="card-child card-report elevation-5">
                สมาชิกใหม่ผ่านลิก์วันนี้
                <hr class="solid my-2" />
                <div class="text-end font-weight-bold purple--text">
                  {{ Affiliate.newMember }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 p-1 col-sm-4 body_card">
              <div class="card-child card-report text-center elevation-5">
                สมาชิกใหม่ที่มีการฝาก
                <hr class="solid my-2" />
                <div class="text-end font-weight-bold green--text">
                  {{ Affiliate.depositMember }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 p-1   col-sm-4  body_card">
              <div class="card-child card-report text-center elevation-5">
                สมาชิกที่กดรับรายได้
                <hr class="solid my-2" />
                <div class="text-end font-weight-bold primary--text">
                  {{ Affiliate.recieveMember }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 p-1  col-sm-4  body_card">
              <div class="card-child text-center card-report elevation-5">
                รายได้สมาชิกทั้งหมดของวันนี้
                <hr class="solid my-2" />
                <div class="text-end font-weight-bold purple--text">
                  {{ Affiliate.incomeBalance }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 p-1  col-sm-4  body_card">
              <div class="card-child text-center card-report elevation-5">
                โบนัสยอดฝากทั้งหมด
                <hr class="solid my-2" />
                <div class="text-end font-weight-bold success--text">
                  {{ Affiliate.bonusDeposit }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 p-1  col-sm-4  body_card">
              <div class="card-child text-center card-report elevation-5">
                โบนัสยอดเสียทั้งหมด
                <hr class="solid my-2" />
                <div class="text-end font-weight-bold success--text">
                  {{ Affiliate.bonusLoss }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-2 p-1  col-sm-4  body_card">
              <div class="card-child text-center card-report elevation-5">
                โบนัสยอดคอมมิชชั่นทั้งหมด
                <hr class="solid my-2" />
                <div class="text-end font-weight-bold success--text">
                  {{ Affiliate.bonusCommission }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-card class="mt-5 rounded-lg" width="100%">
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
          :items="datatable"
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
      headerReport: [
        {
          text: "รายการที่",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "สายงาน",
          value: "line",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
          cellClass: "font-weight-bold"
        },
        {
          text: "จำนวนสมาชิก",
          value: "member",
          align: "center",
          sortable: false
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
        }
      ],
      username: "",
      startdate: "",
      enddate: "",
      Affiliate: {
        link: "Linkdemo",
        activeMember: 20,
        newMember: 12,
        depositMember: 12,
        recieveMember: 10,
        incomeBalance: 10,
        bonusDeposit: 100,
        bonusLoss: 500,
        bonusCommission: 500
      },
      datatable: [
        {
          line: "A",
          member: 10,
          bonusDeposit: 10,
          bonusLoss: 20,
          bonusCommission: 200
        },
        {
          line: "B",
          member: 10,
          bonusDeposit: 10,
          bonusLoss: 20,
          bonusCommission: 300
        }
      ]
    };
  },
  methods: {
    search() {},
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

  box-shadow: 0px 5px 8px 0px rgb(179 176 176 / 75%);
}
.card_affiliate {
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%) !important;
  background: #ffffff;
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
      .text-end {
        font-weight: bold;
        font-size: large;
      }
    }
  }
}

.copy-link {
  .copy_icon {
    height: 25px;
  }
  cursor: pointer;
}

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
</style>
