<template>
  <div class="container">
    <div class="title_header pt-2 pt-md-5 pb-md-4">
      <h2>รายงาน affiliate</h2>
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
    <div class="section_card">
      <div class="show_reportcard">
        <div class="card_affiliate p-2">
          <div class="row  p-2">
            <div class="col-12 col-md-6 p-1 body_card">
              <div class="p-2 card-child shadow">
                ชื่อ Link Affiliate
                <hr class="solid" />
                <div class="d-flex" style="justify-content: space-between;">
                  <div class="copy-link" @click="copylink(Affiliate.link)">
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
            <div class="col-12 col-md-3 p-1 body_card">
              <div class="p-2 card-child shadow">
                ของสมาชิกที่มีการกด
                <hr class="solid" />

                <div class="text-end text-primary">
                  {{ Affiliate.activeMember }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-3 p-1 body_card">
              <div class="p-2 card-child shadow">
                สมาชิกใหม่ผ่านลิก์วันนี้
                <hr class="solid" />
                <div class="text-end text-warning">
                  {{ Affiliate.newMember }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 p-1 body_card">
              <div class="p-2 card-child shadow">
                สมาชิกใหม่ที่มีการฝาก
                <hr class="solid" />
                <div class="text-end text-success">
                  {{ Affiliate.depositMember }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 p-1 body_card">
              <div class="p-2 card-child shadow">
                สมาชิกที่กดรับรายได้
                <hr class="solid" />
                <div class="text-end text-success">
                  {{ Affiliate.recieveMember }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 p-1 body_card">
              <div class="p-2 card-child shadow">
                รายได้สมาชิกทั้งหมดของวันนี้
                <hr class="solid" />
                <div class="text-end text-success">
                  {{ Affiliate.incomeBalance }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 p-1 body_card">
              <div class="p-2 card-child shadow">
                โบนัสยอดฝากทั้งหมด
                <hr class="solid" />
                <div class="text-end text-success">
                  {{ Affiliate.bonusDeposit }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 p-1 body_card">
              <div class="p-2 card-child shadow">
                โบนัสยอดเสียทั้งหมด
                <hr class="solid" />
                <div class="text-end text-success">
                  {{ Affiliate.bonusLoss }}
                </div>
              </div>
            </div>
            <div class="col-12 col-md-4 p-1 body_card">
              <div class="p-2 card-child shadow">
                โบนัสยอดคอมมิชชั่นทั้งหมด
                <hr class="solid" />
                <div class="text-end text-muted">
                  {{ Affiliate.bonusCommission }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section_table mt-3">
      <div class="card-show mb-4  shadow">
        <div class="section_search ">
          <div class="d-flex pb-3 date-select" style="align-items: baseline;">
            <div class="px-2">ค้นหาวันที่ :</div>
            <div class="px-2">
              <input type="date" v-model="startdate" />
            </div>
            <div class="px-2">ถึงวันที่ :</div>
            <input type="date" v-model="enddate" />
            <button class="btn btn-success btn-sm mx-2" @click="search()">
              ค้นหา
            </button>
          </div>
        </div>
        <table class="table p-3">
          <thead>
            <tr class="font-weight-bold">
              <th>No.</th>
              <th>สายงาน</th>
              <th>จำนวนสมาชิก</th>
              <th>โบนัสยอดฝาก</th>
              <th>โบนัสยอดเสีย</th>
              <th>โบนัสยอดคอมมิชั่น</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in datatable" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.line }}</td>
              <td>{{ item.member }}</td>
              <td>{{ item.bonusDeposit }} %</td>
              <td>{{ item.bonusLoss }} %</td>
              <td>{{ item.bonusCommission }}</td>
            </tr>
          </tbody>
        </table>
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
  background: #cfcfcf;
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
