<template>
  <v-flex>
    <v-container>
      <v-row>
        <h2 class="mb-2">รายงานรับโบนัสชวนเพื่อน</h2>
        <search-filter :filter="dateFilter"></search-filter>
      </v-row>
      <v-row>
        <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
          <div class="ma-5 font-weight-bold">
            จำนวนสมาชิกทั้งหมดตั้งเเต่วันที่
            {{ dateFilter.startDate }} ถึงวันที่
            {{ dateFilter.endDate }} จำนวนทั้งหมด 50 คน
          </div>

          <v-card class="elevation-4 mt-5 rounded-lg">
            <div class="tabledata">
              <v-data-table
                :headers="columnReport"
                :items="item"
                hide-default-footer
              >
              </v-data-table>
            </div>
          </v-card>
        </v-card>
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
import ImgBank from "../../components/ImgBank.vue";
export default {
  components: { ImgBank },
  data() {
    return {
      dpdialog: false,
      wddialog: false,
      columnReport: [
        {
          text: "ผู้ใช้งาน",
          value: "username",
          align: "center",
          sortable: false
        },
        {
          text: "จำนวนครั้ง",
          value: "amount",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดรวมโบนัส",
          value: "amountAmount",
          align: "center",
          sortable: false
        },
        {
          text: "วันที่สมัคร",
          value: "datetime",
          align: "center",
          sortable: false
        },
        {
          text: "ฝากล่าสุด",
          value: "lasttime",
          align: "center",
          sortable: false
        }
      ],
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      },

      item: []
    };
  },
  async fetch() {},
  methods: {}
};
</script>

<style></style>
