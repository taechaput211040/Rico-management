<template>
  <div>
    <loading-page v-if="loading"></loading-page>
    <div v-if="feature_status">
      <div class="title_header pt-2 pt-md-5 pb-md-4">
        <h2>รายงาน affiliate</h2>
      </div>

      <v-card class="mt-5 rounded-lg" width="100%">
        <v-row class="pa-3 ">
          <div class="col-12 col-sm-2">
            จากวันที่
            <el-date-picker
              placeholder="วันที่"
              style="width: 100%"
              v-model.trim="startdate"
            />
          </div>
          <div class="col-12 col-sm-2">
            ถึงวันที่
            <el-date-picker
              v-model.trim="enddate"
              placeholder="วันที่"
              style="width: 100%"
            />
          </div>
          <div class="col-12 col-sm-3">
            <br class="d-none d-sm-block" />
            <v-btn color="primary" @click="searchAffwithdrawByDate()"
              ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
            >
          </div>
        </v-row>
        <v-card class=" mt-2">
          <v-data-table
            :headers="headerReport"
            :items="datatable"
            hide-default-footer
            disable-pagination
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
    <div v-else>
      <label class="custom-control-label"
        >สถานะ FEATURE นี้ ของ AGENT
        {{ $store.state.auth.company ? $store.state.auth.company : "" }}
        ยังไม่เปิดใช้งาน .. ติดต่อ Up-line หรือผู้ดูแลระบบ เพื่อทำการเปิดใช้งาน
        Feature นี้</label
      >
    </div>
  </div>
</template>

<script>
import LoadingPage from "../../components/LoadingPage.vue";
export default {
  components: { LoadingPage },
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
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ยอดถอนรายได้",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาถอน",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      loading: false,
      feature_status: false,
      username: "",
      startdate: new Date().toISOString().slice(0, 10),
      enddate: new Date().toISOString().slice(0, 10),
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
      datatable: []
    };
  },
  async mounted() {
    await this.getFeatureStatus();
    if (this.feature_status) {
      const st = new Date().toISOString().slice(0, 10);
      const ed = new Date().toISOString().slice(0, 10);
      // this.startdate = st
      // this.enddate = ed
      await this.getDataTable(st, ed);
    }
  },
  methods: {
    async searchAffwithdrawByDate() {
      this.getDataTable(this.startdate, this.enddate);
      // this.getData();
      // this.getDataTable(this.startdate, this.enddate, this.hash, this.username);
    },
    async getDataTable(dateForm, dateTo) {
      this.loading = true;
      try {
        const res_data = await this.$axios.get(
          `${process.env.ALL_DEPOSIT}/api/Aff/Report/Withdraw/${this.$moment(
            dateForm
          ).format("YYYY-MM-DD")}T00:00:00/${this.$moment(dateTo).format(
            "YYYY-MM-DD"
          )}T23:59:59/${localStorage.getItem("agent")}`
        );
        this.datatable = res_data.data.map(x => {
          x.created_at = new Date(x.created_at).toLocaleString("th-TH");
          x.amount = x.amount.toFixed(2);
          return x;
        });
      } catch (error) {
        console.log("no");
        this.dataRender = [];
      }
       this.loading = false;
    },
    async getFeatureStatus() {
      try {
        this.loading = true;
        let { data } = await this.$axios.get(
          `${process.env.AFF_SETTING}/api/MainSetting/${this.$store.state.auth.hash}`
        );
        this.feature_status = data.feature_status;
        this.loading = false;
      } catch (error) {
        this.feature_status = false;
        this.loading = false;
      }
    },
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
