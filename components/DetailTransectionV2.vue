<template>
  <div>
    <v-card class="elevation-3">
      <v-data-table 
     item-key="dbresult.data.id + 1"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :headers="header"
        :items="dbresult.data"
        :server-items-length="dbresult.total"
        :options.sync="optionsRender"
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': '',
          'items-per-page-options': [100,500,1000]
        }"
      >
        <template #[`item.type`]="{ item }">
          <div> 
            ค่าย
            {{
              provider[item.provider] ? provider[item.provider] : item.provider
            }}
          </div>
          <div>
            ประเภท {{ gameType[item.type] ? gameType[item.type] : item.type }}
          </div>
          <div>{{ mapGameName(item)  }}</div>
          <!-- <div>{{ mapGameName(item.game_name)  }}</div> -->
          <!-- <div>{{ item.game_name  }}</div> -->
        </template>

        <template #[`item.detail_links`]="{ item }">
          <v-btn small rounded color="primary" @click="detail(item)"
            >ดูรายละเอียด</v-btn
          >
        </template>
        <template #[`item.payout`]="{ item }"
          ><span>{{ item.payout }}</span>
        </template>
        <template #[`item.turnover`]="{ item }"
          ><span>{{ item.turnover }}</span>
        </template>
        <template #[`item.bet`]="{ item }"
          ><span>{{ item.bet }}</span>
        </template>
        <template #[`item.winlose`]="{ item }"
          ><span
            :class="[
              { 'error--text': item.winlose < 0 },
              { 'success--text': item.winlose > 0 }
            ]"
            >{{ item.winlose }}</span
          >
        </template>
        <template #[`item.status`]="{ item }">
          <div v-if="item.provider == 'PGL'">
            <div class="success--text font-weight-bold">
              สำเร็จ
            </div>
       
          </div>
          <div v-else>
            <div class="success--text font-weight-bold" v-if="item.status">
              สำเร็จ
            </div>
            <div class="warning--text font-weight-bold" v-else>
              ผลยังไม่จบ
            </div>
          </div>
        </template>
        <template #[`item.start_time`]="{ item }">
          <div>{{ getDate(item.start_time).slice(0, 10) }}</div>
          <div>{{ getDate(item.start_time).slice(16) }}</div>
        </template>
        <template #[`item.bf_balance`]="{ item }">
          {{ item.bf_balance }}
        </template>
        <template #[`item.after_balance`]="{ item }">
          {{ item.after_balance }}
          <!-- {{item.after_balance + item.payout}}  -->
        </template>
      </v-data-table></v-card
    >
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
export default {
  props: {
    dbresult: [
      Object , Array
    ]
  },
  data() {
    return {

      optionsRender: {},
      sortBy: "start_time",
      sortDesc: true,
      result: [],
      header: [
        {
          text: "ประเภทเกมส์",
          value: "type",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold"
        },

        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "เวลา",
          value: "start_time",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold"
        },
        {
          text: "รายละเอียด",
          value: "detail_links",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "เดิมพัน",
          value: "bet",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold"
        },
        {
          text: "จ่าย",
          value: "payout",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold"
        },
        {
          text: "แพ้ชนะ",
          value: "winlose",
          align: "center",
          sortable: true,
          cellClass: "font-weight-bold"
        },
        {
          text: "สถานะการคิดผล",
          value: "status",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "ก่อนเดิมพัน",
          value: "bf_balance",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold"
        },
        {
          text: "หลังเดิมพัน",
          value: "after_balance",
          align: "center",
          sortable: false,
          cellClass: "font-weight-bold"
        }
      ]
    };
  },
  watch: {
    optionsRender: {
      handler() {
        this.$emit("options", this.optionsRender);
      }
    }
  },
  async fetch() {
    this.result;
    //get API By id ตรงนี้//
    console.log(this.dbresult)
    await this.getGameId()
  },
  computed: {
    ...mapState("auth", ["provider", "gameType"]),
    ...mapState("setting", ["gameid"])

  
  },
  methods: {
    ...mapActions("member", ["getDetailLink"]),
    ...mapActions("setting", ["getGameId"]),
    mapGameName(item){
      if(item.game_name.startsWith('PGL')){
        const test =  this.gameid.find(x=> x.id == `${item.game_name.toLowerCase()}`)
      if(test){
        return test.name
      } else {
        return item.game_name
      }
      } else {
        const test =  this.gameid.find(x=> x.id == `${item.provider.toLowerCase()}_${item.game_name}`)
      if(test){
        return test.name
      } else {
        return item.game_name
      }
      }
    
      // return test.name
    },
    async detail(item) {
      const link = await this.getDetailLink(item.detail_links);

      window.open(link.data, "NewWin", "toolbar=no,status=no");
    },
    getDate(date) {
      return dayjs(date).format(`YYYY-MM-DD เวลา HH:mm:ss`);
    }
  }
};
</script>

<style></style>
