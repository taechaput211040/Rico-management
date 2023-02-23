<template>
  <v-flex>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการฝากเงินครั้งแรกของสมาชิก</h2>
        <search-filter
          :filter="dateFilter"
          @search="getData(dateFilter.inputfilter)"
          :searchinput="true"
          @yesterday="getYesterDay()"
          @today="getToday()"
        ></search-filter
      ></v-row>

      <v-row>
        <v-col cols="12" sm="4" md="4">
          <div class="card-child card-report elevation-5 text-center">
            <img
              src="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
              alt=""
              class="img-icon icon-Logo"
            />
            <div>
              ยอดฝากแรกของสมาชิกรวม :<span
                class="primary--text font-weight-bold"
                >{{ depositbalance }}
              </span>
              บาท
            </div>
            <div>
              ลูกค้าทั้งหมดจำนวน :
              <span class="primary--text font-weight-bold"
                >{{ itemdeposit.length }}
              </span>
              คน
            </div>
          </div>
        </v-col>
      </v-row>
      <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
        <v-card width="100%" class="elevation-4 rounded-lg">
          <v-data-table
            show-expand
            class="elevation-1"
            :headers="headerCell"
            :items="itemdeposit"
            :options.sync="options"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
              'items-per-page-options': [50, 100],
            }"
            single-expand
          >
            <template #[`item.no`]="{ index }">
              <span class="font-weight-bold">{{
                options.itemsPerPage * (options.page - 1) + (index + 1)
              }}</span>
            </template>

            <template #[`item.companyBank`]="{ item }">
              <img-bank :value="item.companyBank"></img-bank>
            </template>
            <template #[`item.data-table-expand`]="{ isExpanded, expand }">
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
            <template #[`item.smsdatetime`]="{ item }">
              <span>
                {{ item.smsdatetime }}
              </span>
            </template>
            <template #[`item.created_at`]="{ item }">
              <span>
                {{ item.created_at }}
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
import dayjs from "dayjs";
import { mapActions } from "vuex";
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
          text: "เวลาเติม",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "USERNAME",
          value: "member_id",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text",
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "เติมโดย",
          value: "topupby",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold ",
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
      ],
      itemdeposit: [],
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
    async getData() {
      try {
        let { data } = await this.getFirstdeposit();
        this.itemdeposit = data.data;
      } catch (error) {
        console.log(error);
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
        this.itemdeposit = data;
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
        this.itemdeposit = data;
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },

    ...mapActions("transaction", ["getFirstdeposit"]),
  },
};
</script>

<style></style>
