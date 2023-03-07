<template>
  <v-flex>
    <loading-page v-if="isLoading"></loading-page>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการเงินที่กดซ่อน</h2>
        <search-filter
          :filter="dateFilter"
          @search="getData()"
          :searchinput="false"
          @yesterday="getYesterDay()"
          @today="getToday()"
        ></search-filter
      ></v-row>
      <v-card width="100%" class="elevation-4 mt-5 rounded-lg">
        <v-card class="mt-5">
          <v-data-table
            :items="itemhidedepotsit.data"
            single-expand
            :options.sync="options"
            :headers="headerCell"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': '',
              'items-per-page-options': [50, 100],
            }"
            :server-items-length="
            itemhidedepotsit.meta ? itemhidedepotsit.meta.itemCount : 0
            "
          >
          <template #[`item.no`]="{ index }">
            <span class="font-weight-bold">{{
              options.itemsPerPage * (options.page - 1) + (index + 1)
            }}</span>
          </template>
          <template #[`item.no`]="{ index }">
            <span class="font-weight-bold">{{
              options.itemsPerPage * (options.page - 1) + (index + 1)
            }}</span>
          </template>
          <template #[`item.dateSms`]="{ item }">
            <span class="font-weight-bold">
              {{ item.dateSms.slice(0,10) + ' ' + item.dateSms.slice(11,19)  }}
            </span >
          </template>
       
          <template #[`item.created_at`]="{ item }">
            <span class="font-weight-bold">
             {{renderDate(item.created_at)  }} 
            </span>
          </template>

          </v-data-table>
       
        </v-card>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import dayjs from "dayjs";
import ImgBank from "../../components/ImgBank.vue";
import LoadingPage from "../../components/LoadingPage.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isLoading: false,
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
          value: "dateSms",
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
          value: "fromBankRef",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },

        {
          text: "ข้อความแนบ(ถ้ามี)",
          value: "remark",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold ",
        },
        {
          text: "มาจาก(ถ้ามี)",
          value: "name",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
        {
          text: "วันที่บันทึกรายการ",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
        },
      ],
      itemhidedepotsit: [],
      options: {},
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().slice(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().slice(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    };
  },
  components: { ImgBank, LoadingPage },
  computed: {},
  watch: {
    options: {
      async handler() {
        await this.getData();
      },
    },
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions("transaction", ["getHiddenReport"]),
    renderDate(date) {
    

      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },

    renderDateHide(item) {
    if(item.companyBank != 'SCB'){
      return  item.dateSms.slice(0,10) + ' ' + item.dateSms.slice(11,19)
    }
    if(item.companyBank == 'SCB'){
      return  dayjs(item.dateSms).format("YYYY-MM-DD HH:mm:ss");
    } else {
      return dayjs(item.dateSms).format("YYYY-MM-DD HH:mm:ss");

    }
      

  
  },
    async getData(input = null) {
      this.isLoading = true;
      console.log('xxxxxxxxxxxxxxxxxxx',this.options)
      let params = await this.getParameter();

      if (!input) {
        try {
          console.log(params);
          const data = await this.getHiddenReport(params);
          this.itemhidedepotsit = data;
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
        this.isLoading = false;
      } else {
        params.first = true;

        try {
          console.log(params);
          const data = await this.getHiddenReport(params);
          this.itemhidedepotsit = data;
        } catch (error) {
          console.log(error);
          this.isLoading = false;
        }
        this.isLoading = false;
      }
    },
   async getParameter() {
      let parameter = {
        take: this.options.itemsPerPage? this.options.itemsPerPage:50,
        page: this.options.page?this.options.page:1,
        start: dayjs(this.dateFilter.startDate).format(),
        end: dayjs(this.dateFilter.endDate).endOf("day").format(),
    
      };
      return parameter;
    },
    setYesterday() {
      this.dateFilter.startDate = dayjs().add(-1, "day").format("YYYY-MM-DD");
      this.dateFilter.startTime = dayjs().add(-1, "day").format("HH:mm:ss");
      this.dateFilter.endDate = dayjs().endOf(-1, "day").format("YYYY-MM-DD");
      this.dateFilter.endTime = dayjs().endOf(-1, "day").format("HH:mm:ss");
    },
    async getYesterDay(input = null) {
      this.isLoading = true;
      let params = await this.getParameter();

      await this.setYesterday();

      params.start = dayjs().add(-1, "day").startOf("day").toISOString();
      params.end = dayjs().add(-1, "day").endOf("day").toISOString();
      try {
        console.log(params);
        const data = await this.getHiddenReport(params);
        this.itemhidedepotsit = data;

      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
      this.isLoading = false;
    },
    async getToday(input = null) {
      this.isLoading = true;
  
      let params = await this.getParameter();

      params.start = dayjs().startOf("day").toISOString();
      params.end = dayjs().endOf("day").toISOString();

      try {
        console.log(params);
        const data = await this.getHiddenReport(params);
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
