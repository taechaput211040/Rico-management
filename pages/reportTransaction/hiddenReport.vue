<template>
  <v-flex>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการเงินที่กดซ่อน</h2>
        <search-filter
          :searchinput="false"
          :filter="dateFilter"
          @search="searchdata"
        ></search-filter
      ></v-row>
      <v-card width="100%" class="elevation-4 mt-5 rounded-lg">
        <v-card class="mt-5">
          <v-data-table
            hide-default-footer
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
export default {
  data() {
    return {
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
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "รหัสอ้างอิง(ถ้ามี)",
          value: "ref",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ยอดเงินคงเหลือของธนาคารเว็บ",
          value: "balance",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ข้อความแนบ(ถ้ามี)",
          value: "message",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold "
        },
        {
          text: "มาจาก(ถ้ามี)",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "วันที่กดซ่อน",
          value: "hidedate",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ผู้กดซ่อน",
          value: "hideby",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "การดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      itemhidedepotsit: [],
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
  methods: {
    searchdata() {
      console.log(this.dateFilter);
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
