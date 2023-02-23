<template>
  <v-flex>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการเงินที่กดซ่อน</h2>
        <search-filter
          :filter="dateFilter"
          @search="getData(dateFilter.inputfilter)"
          :searchinput="true"
          @yesterday="getYesterDay()"
          @today="getToday()"
        ></search-filter
      ></v-row>
      <v-card width="100%" class="elevation-4 mt-5 rounded-lg">
        <v-card class="mt-5">
          <v-data-table
            :options.sync="options"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
              'items-per-page-options': [50, 100],
            }"
            class="elevation-1"
            :items="itemhidedepotsit"
            :headers="headerCell"
          >
          </v-data-table>
        </v-card>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import dayjs from "dayjs";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      options: {},
      headerCell: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px",
        },
        {
          text: "ธนาคารเว็บ",
          value: "companyBank",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },

        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "รหัสอ้างอิง(ถ้ามี)",
          value: "ref",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ยอดเงินคงเหลือของธนาคารเว็บ",
          value: "balance",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ข้อความแนบ(ถ้ามี)",
          value: "message",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold ",
        },
        {
          text: "มาจาก(ถ้ามี)",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "วันที่กดซ่อน",
          value: "hidedate",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ผู้กดซ่อน",
          value: "hideby",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "การดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
      ],
      itemhidedepotsit: [],
      depositbalance: "1630",
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    };
  },
  computed: {},
  watch: {
    options: {
      async handler() {
        await this.getData();
      },
    },
  },
  methods: {
    ...mapActions("transaction", ["getHiddenReport"]),
    async getData() {
      try {
        let { data } = await this.getHiddenReport();
        // this.itemhidedepotsit = data;
        this.itemhidedepotsit = [];
      } catch (error) {
        console.log(error);
        this.itemhidedepotsit = [];
      }
    },
    getParameter() {
      let parameter = {
        take: this.options.itemsPerPage,
        page: this.options.page,
        start: this.dateFilter.startDate,
        end: this.dateFilter.endDate,
        username: null,
      };
      return parameter;
    },
    setYesterday() {
      this.dateFilter.startDate = dayjs().add(-1, "day").format("YYYY-MM-DD");
      this.dateFilter.startTime = dayjs().add(-1, "day").format("HH:mm:ss");
      this.dateFilter.endDate = dayjs().endOf(-1, "day").format("YYYY-MM-DD");
      this.dateFilter.endTime = dayjs().endOf(-1, "day").format("HH:mm:ss");
    },
    async getYesterDay() {
      this.isLoading = true;
      let params = this.getParameter();
      await this.setYesterday();
      params.start = dayjs().add(-1, "day").startOf("day").toISOString();
      params.end = dayjs().add(-1, "day").endOf("day").toISOString();
      try {
        console.log(params);
        const data = await this.getFirstdeposit(params);
        this.itemhidedepotsit = data;
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
        const data = await this.getFirstdeposit(params);
        this.itemhidedepotsit = data;
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
