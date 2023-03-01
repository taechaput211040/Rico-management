<template>
  <div>
    <loading-page v-if="isLoading"></loading-page>
    <h2 class="mb-4">ข้อมูลการใช้งานพนักงาน</h2>
    <search-filter
      class="mb-4"
      :searchinput="false"
      :filter="dateFilter"
      @search="searchdata"
    ></search-filter>

    <v-card class="rounded-lg">
      <v-data-table
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': '',
          'items-per-page-options': [20,50],
        }"
        :server-items-length="items.meta ? items.meta.itemCount : 0"
        :options.sync="options"
        :headers="headers"
        :items="items.data"
      >
        <template #[`item.no`]="{ index }">
          {{ options.itemsPerPage * (options.page - 1) + (index + 1) }}
        </template>
        <template #[`item.created_at`]="{ item }">
          {{ item.created_at | dateFormat }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LoadingPage from "../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
  data() {
    return {
      isLoading: false,
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      options: {},
      headers: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px",
        },
        {
          text: "เวลา",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ผู้ทำการ",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "ผู้ทำการ",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "action",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "รายการ",
          value: "details",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "IP",
          value: "ip",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
      ],
      items: [],
    };
  },
  watch: {
    options: {
      async handler() {
        await this.getdata();
      },
    },
  },
  methods: {
    searchdata(item) {
      this.dateFilter.startDate = item.startDate;
      this.dateFilter.endDate = item.endDate;
      this.getdata();
    },

    async getParameter(
      params = {
        username: undefined,
        order: "ASC",
        page: undefined,
        take: undefined,
        action: "ALL",
        start: undefined,
        end: undefined,
      }
    ) {
      console.log(this.options);
      params.start = this.dateFilter.startDate;
      params.end = this.dateFilter.endDate;
      params.page = this.options.page;
      params.take = this.options.itemsPerPage;
      return params;
    },
    ...mapActions("report", ["getStaffLog"]),
    async getdata() {
      this.isLoading = true;
      let params = await this.getParameter();
      console.log(params);
      try {
        let { data } = await this.getStaffLog(params);
        this.items = data;
      } catch (error) {
        this.items = [];
        console.log(error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
