<template>
  <v-flex>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการฝากเงินของสมาชิก</h2>
        <search-filter :filter="dateFilter" @search="searchdata"></search-filter
      ></v-row>
      <h2 class="mt-5">ยอดฝากรวม แยก ธนาคาร</h2>

      <v-row>
        <v-col cols="12" sm="3" md="3" v-for="(item, i) in itembank" :key="i">
          <div class="card-child card-report elevation-5 text-center">
            <img-bank :value="item.companyBank"></img-bank>
            <div class="mb-3 ">เติมมือ</div>
            <div>
              ยอดฝากรวม :<span class="primary--text font-weight-bold"
                >{{ item.total_sum }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
        <div class=" pa-5 font-weight-bold">
          จำนวนสมาชิกทั้งหมดตั้งเเต่วันที่
          {{ date_start }} ถึงวันที่ {{ date_end }} จำนวนทั้งหมด
          {{ itemdeposit.length }} คน
        </div>
        <v-card width="100%" class="elevation-4 rounded-lg">
          <v-data-table
            show-expand
            class="elevation-1"
            :headers="headerCell"
            :items="itemdeposit"
            hide-default-footer
            single-expand
          >
            <template #[`item.no`]="{index}">
              <span class="font-weight-bold">
                {{ index + 1 }}
              </span>
            </template>

            <template #[`item.companyBank`]="{item}">
              <img-bank :value="item.companyBank"></img-bank>
            </template>
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
            <template #[`item.smsdatetime`]="{item}">
              <span>
                {{ getthaidate(item.smsdatetime) }}
              </span>
            </template>
            <template #[`item.created_at`]="{item}">
              <span>
                {{ getthaidate(item.created_at) }}
              </span>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="text-center font-weight-bold purple--text">
                  {{ item.remark }}
                </div>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      itembank: [],
      headerCell: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "ธนาคารเว็บ",
          value: "companyBank",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "USERNAME",
          value: "member_id",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เครดิตก่อนเติม",
          value: "bfcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เติมโดย",
          value: "topupby",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold "
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      itemdeposit: [],
      depositbalance: "1630",
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      }
    };
  },
  computed: {
    date_start(val) {
      if (val) {
        return this.$moment(String(this.dateFilter.startDate)).format(
          "MM/DD/YYYY"
        );
      }
    },
    date_end(val) {
      if (val) {
        return this.$moment(String(this.dateFilter.endDate)).format(
          "MM/DD/YYYY"
        );
      }
    }
  },
  async fetch() {
    try {
      let response = await this.getdpListtransaction();
      this.itemdeposit = response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  created() {
    this.getBank();
  },
  methods: {
    ...mapActions("transaction", ["getbankinfo", "getdpListtransaction"]),
    searchdata() {
      console.log(this.dateFilter);
    },
    async getBank() {
      try {
        let response = await this.getbankinfo();
        this.itembank = response.data.bankSummary;
      } catch (error) {
        console.log(error);
      }
    },
    getthaidate(timethai) {
      const time = this.$moment(timethai)
        .add(7, "hours")
        .format("YYYY-MM-DD เวลา HH:mm:ss");
      return time;
    }
  }
};
</script>

<style></style>
