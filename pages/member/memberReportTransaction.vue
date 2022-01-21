<template>
  <v-flex>
    <v-container>
      <h2 class="mb-2">รายการเล่นของสมาฃิก จากการฝากเงินล่าสุด</h2>
      <v-row>
        <v-col lg="6" sm="12" md="12" cols="12">
          <div class=" card-child elevation-5">
            <v-row class="d-flex align-baseline ma-auto"
              ><v-col
                cols="8"
                sm="8"
                md="8"
                lg="6"
                class="d-flex align-baseline"
                ><v-text-field
                  name="name"
                  dense
                  outlined
                  clearable
                  label="กรอก username เพื่อค้นหา"
                  placeholder="เช่น xx1234567"
                  hide-details="auto"
                ></v-text-field> </v-col
              ><v-col cols="4" sm="4" md="4" lg="4">
                <v-btn color="primary">
                  <v-icon left dark>
                    mdi-magnify
                  </v-icon>
                  ค้นหา</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col lg="3" sm="4" md="4" cols="12" class="pa-3">
          <card-report
            title="รายการฝากล่าสุด จำนวนเงิน"
            :value="dp.amount"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
          ></card-report>
        </v-col>
        <v-col lg="3" sm="4" md="4" cols="12" class="pa-3">
          <card-report
            title="โบนัส"
            :value="dp.bonusamount"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/bonus.png"
          ></card-report>
        </v-col>
        <v-col lg="3" sm="4" md="4" cols="12" class="pa-3">
          <card-report
            title="วันเวลาที่เติมเงิน"
            :value="dp.created_at"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/time-left.png"
          ></card-report>
        </v-col>
        <v-col lg="3" sm="4" md="4" cols="12" class="pa-3">
          <card-report
            title="เติมโดย"
            :value="dp.topupby"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/topupby.png"
          ></card-report>
        </v-col>
        <v-col lg="3" sm="4" md="4" cols="12" class="pa-3">
          <card-report
            title="ค่ายเกมที่เข้าล่าสุด"
            :value="dp.provider_active"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/game-control.png"
          ></card-report>
        </v-col>
        <v-col lg="3" sm="4" md="4" cols="12" class="pa-3">
          <card-report
            title="IP address ที่เข้าใช้งานล่าสุด"
            :value="dp.ip"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/placeholder.png"
          ></card-report>
        </v-col>
      </v-row>
      <v-card class="mt-5  pa-3">
        <report-transection
          :dbresult="stats"
          v-if="!this.$route.query.group"
        ></report-transection>
        <detail-transection v-else></detail-transection>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      dp: {
        afcredit: "1",
        amount: "0",
        bfcredit: "0",
        bonusamount: "1",
        companyBank: "checkin",
        created_at: "2022-01-20T23:53:46.000000Z",
        dp_count: 0,
        dpref: "58579427-a2b0-41e5-9501-b9350f7804ba",
        id: 595,
        member_id: 321,
        remark: "เติม 0 บาท โบนัส 1บาท  สำเร็จ โดยRICO หมายเหตุ : Checkin ",
        smsdatetime: "-",
        topupby: "RICO",
        updated_at: "2022-01-20T23:53:46.000000Z",
        ip: "103.83.188.31",
        provider_active: "JL"
      },
      header: [
        {
          text: "ประเภทเกมส์",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold"
        },
        {
          text: "TURN",
          value: "turns",
          align: "center",
          sortable: false
        },
        {
          text: "ยอด แพ้/ชนะ ที่ต้องทำ",
          value: "turnTarget",
          align: "center",
          sortable: false
        },
        {
          text: "แพ้/ชนะ",
          value: "bet",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดเล่นคงค้าง",
          value: "payout",
          align: "center",
          sortable: false
        }
      ],
      stats: [
        {
          bet: 1842.1,
          commission: 0,
          currencyname: "TH",
          grouped: "JL",
          p_share: 0,
          p_win: 0,
          payout: 1617.87,
          turnover: 1842.1,
          wagers: 0,
          winlose: 224.23
        },
        {
          bet: 0,
          commission: 0,
          currencyname: "TH",
          grouped: "UF",
          p_share: 0,
          p_win: 0,
          payout: 0,
          turnover: 0,
          wagers: 0,
          winlose: 0
        }
      ]
    };
  }
};
</script>

<style></style>
