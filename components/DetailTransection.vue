<template>
  <div>
    <v-btn
      color="error"
      class="ma-4"
      small
      @click="$router.push(`${$route.path}`)"
      >back</v-btn
    >

    <v-card class="elevation-3">
      <v-data-table
        disable-pagination
        :headers="header"
        hide-default-footer
        :items="dbresult"
      >
        <template #[`item.detail_links`]="{item}">
          <v-btn
            small
            rounded
            color="primary"
            @click="openDetail(item.detail_links)"
            >ดูรายละเอียด</v-btn
          >
        </template>
        <template #[`item.payout`]="{item}"
          ><span>{{ item.payout.toFixed(2) }}</span>
        </template>
        <template #[`item.turnover`]="{item}"
          ><span>{{ item.turnover.toFixed(2) }}</span>
        </template>
        <template #[`item.bet`]="{item}"
          ><span>{{ item.bet.toFixed(2) }}</span>
        </template>
        <template #[`item.winlose`]="{item}"
          ><span
            :class="[
              { 'error--text': item.winlose < 0 },
              { 'success--text': item.winlose > 0 }
            ]"
            >{{ item.winlose.toFixed(2) }}</span
          >
        </template>
        <template #[`item.status`]="{item}">
          <div class="success--text font-weight-bold" v-if="item.status == true">
            สำเร็จ
          </div>
          <div class="warning--text font-weight-bold" v-if="item.status == 0">กำลังคิดผล</div>
          <div class="error--text font-weight-bold" v-if="item.status == false">ยกเลิก</div>
        </template>
        <template #[`item.start_time`]="{item}"
          ><span>{{ getDate(item.start_time) }}</span>
        </template>
      </v-data-table></v-card
    >
  </div>
</template>

<script>
export default {
  props: {
    dbresult: Array
  },
  data() {
    return {
      result: [],
      header: [
        {
          text: "ประเภทเกมส์",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "ค่ายเกมส์",
          value: "provider",
          align: "center",
          sortable: false
        },
        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false
        },
        {
          text: "เวลา",
          value: "start_time",
          align: "center",
          sortable: false
        },
        {
          text: "รายละเอียด",
          value: "detail_links",
          align: "center",
          sortable: false
        },
        {
          text: "เดิมพัน",
          value: "bet",
          align: "center",
          sortable: false
        },
        {
          text: "จ่าย",
          value: "payout",
          align: "center",
          sortable: false
        },
        {
          text: "แพ้ชนะ",
          value: "winlose",
          align: "center",
          sortable: false
        },
        {
          text: "สถานะการคิดผล",
          value: "status",
          align: "center",
          sortable: false
        },
        {
          text: "เกมส์ที่เล่น",
          value: "game_name",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  async fetch() {
    this.result;
    //get API By id ตรงนี้//
  },
  methods: {
    getDate(date) {
      return this.$moment(date)
        .utc()
        .format(`YYYY-MM-DD เวลา HH:mm:ss`);
    },
    async openDetail(item) {
      try {
        const { data } = await this.$axios.get(`${item}`);

        // this.game_detail_link = data.data.url;
        window.open(
          data.url,
          "NewWin",
          "toolbar=no,status=no,width=450,height=700"
        );
        // this.$bvModal.show("showDetail");
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async showmore(item) {
      this.$router.push(`${this.$route.path}?provider=${item.provider}`);
    }
  }
};
</script>

<style></style>
