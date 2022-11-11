<template>
  <div>
    <!-- <loading-page v-if="isloading"></loading-page> -->
    <loading-page v-if="isloading"></loading-page>
    <h2 class="mb-2">รายการเล่นของสมาฃิก</h2>
    <v-row class=" d-flex align-baseline ma-auto"
      ><v-col cols="12" sm="3" class="d-flex  align-baseline"
        ><v-text-field
          name="name"
          v-model="username"
          dense
          outlined
          clearable
          label="กรอก username เพื่อค้นหา"
          placeholder="เช่น xx1234567"
          hide-details="auto"
        ></v-text-field> </v-col
      ><v-col cols="12" sm="9" class="d-flex   align-baseline">
        <date-filter :filter="dateFilter"></date-filter>
      </v-col>
    </v-row>
    <div class="pa-3">
      <v-btn color="primary" @click="searchdata()">
        <v-icon left dark> mdi-magnify </v-icon>
        ค้นหา</v-btn
      >
    </div>

    <v-card class="elevation-4 mt-5 rounded-lg">
      <report-transection
        :dbresult="itemResult"
        v-if="!this.$route.query.group"
      ></report-transection>
      <detail-transection :dbresult="itemResult" v-else></detail-transection>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import DateFilter from "../../components/DateFilter.vue";
import DetailTransection from "../../components/DetailTransection.vue";
import LoadingPage from "../../components/LoadingPage.vue";
import ReportTransection from "../../components/ReportTransection.vue";
export default {
  components: { ReportTransection, DetailTransection, DateFilter, LoadingPage },
  data() {
    return {
      dateFilter: {
        startDate: new Date(),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      },
      isloading: false,
      username: null,
      dp: {
        afcredit: "1",
        amount: "0",
        bfcredit: "0",
        bonusamount: "1",
        companyBank: "checkin",
        created_at: "2022-01-20T23:53:46.000000Z",
        dp_count: 0,
        dpref: "58579427-a2b0-41e5-9501-b9350f7804ba",
        id: 595,
        member_id: 321,
        remark: "เติม 0 บาท โบนัส 1บาท  สำเร็จ โดยRICO หมายเหตุ : Checkin ",
        smsdatetime: "-",
        topupby: "RICO",
        updated_at: "2022-01-20T23:53:46.000000Z",
        ip: "103.83.188.31",
        provider_active: "JL"
      },
      header: [
        {
          text: "ประเภทเกมส์",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "TURN",
          value: "turns",
          align: "center",
          sortable: false
        },
        {
          text: "ยอด แพ้/ชนะ ที่ต้องทำ",
          value: "turnTarget",
          align: "center",
          sortable: false
        },
        {
          text: "แพ้/ชนะ",
          value: "bet",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดเล่นคงค้าง",
          value: "payout",
          align: "center",
          sortable: false
        }
      ],
      stats: [],
      itemResult: []
    };
  },
  async beforeMount() {
    this.renderData();
  },
  watch: {
    "$route.query.group"() {
      this.renderData();
    }
  },
  methods: {
    ...mapActions("member", ["getTransactionid", "getTransactionMember"]),
    searchdata() {
      this.$router.replace(`${this.$route.path}`);
      this.renderData();
    },
    getParameter() {
      let dateFill = this.getDateFilter();
      let parameter = {
        username: this.username,
        provider: undefined ? undefined : this.$route.query.group,
        roundid: undefined,
        starttime: dateFill.start,
        endtime: dateFill.end
      };
      return parameter;
    },
    //getdate
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
    //getdate
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
        start: this.$moment(start).format("YYYY-MM-DD HH:mm:ss") + "Z"
      };
    },
    //getdate
    async renderData() {
      this.isloading = true;
      if (this.username) {
        try {
          let params = this.getParameter();
          let response = await this.getTransactionMember(params);
          this.itemResult = response.data.filter(x => x.bet != 0);
          console.log(this.itemResult, "res");
          // this.itemResult = response.data.stats;
          // this.dp = response.data.dp;
        } catch (error) {
          console.log(error);
        }
      }
      this.isloading = false;
    }
  }
};
</script>

<style></style>
