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
      <v-data-table :headers="header" hide-default-footer :items="result">
      </v-data-table
    ></v-card>
  </div>
</template>

<script>
export default {
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
          value: "group",
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
          value: "datetimeTransaction",
          align: "center",
          sortable: false
        },
        {
          text: "รายละเอียด",
          value: "detail",
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
          value: "gameplay",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  async fetch() {
    this.result;
  },
  methods: {
    async showmore(item) {
      this.$router.push(`${this.$route.path}?group=${item.grouped}`);
    }
  }
};
</script>

<style></style>
