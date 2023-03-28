<template>
  <v-card class="elevation-3">
    <v-data-table
      disable-pagination
      :headers="header"
      hide-default-footer
      :items="dbresult"
    >
      <template #[`item.providercode`]="{item}"
        ><div class="font-weight-bold text-group" @click="showmore(item)">
          {{
            provider[item.providercode] ? provider[item.providercode] : item.providercode
          }}
      
          <v-btn class="mx-2" dark color="black" x-small
            >คลิกเพื่อดูรายละเอียด</v-btn
          >
        </div>
      </template>

      <template #[`item.payout`]="{item}"
        ><span>{{ parseInt(item.payout)  }}</span>
      </template>
      <template #[`item.turnover`]="{item}"
        ><span>{{  parseInt(item.turnover) }}</span>
      </template>
      <template #[`item.bet`]="{item}"
        ><span>{{ parseInt(item.bet)  }}</span>
      </template>
      <template #[`item.winlose`]="{item}"
        ><span
          :class="[
            { 'error--text': item.winlose < 0 },
            { 'success--text': item.winlose > 0 }
          ]"
          >{{ parseInt(item.winlose)  }}</span
        >
      </template>
    </v-data-table></v-card
  >
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    dbresult: Array
  },
  data() {
    return {
      header: [
        {
          text: "ค่ายเกม",
          value: "providercode",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        
        {
          text: "turnover",
          value: "turnover",
          align: "center",
          sortable: false
        },
        {
          text: "วางเดิมพัน",
          value: "bet",
          align: "center",
          sortable: false
        },
        {
          text: "ค่ายเกมส์จ่าย",
          value: "payout",
          align: "center",
          sortable: false
        },
        {
          text: "แพ้/ชนะ",
          value: "winlose",
          align: "center",
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapState("auth", ["provider", "gameType"]),


  
  },
  methods: {
 
    async showmore(item) {

      this.$router.push(`${this.$route.path}?group=${item.providercode}`);
    },
   

  }
};
</script>

<style></style>
