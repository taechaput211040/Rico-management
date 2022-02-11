<template>
  <v-flex>
    <v-container>
      <h3 class="mb-2">เช็คข้อมูลการเล่นของลูกค้า / จำนวนเทิร์น</h3>
      <v-row>
        <v-col lg="6" sm="12" md="12" cols="12">
          <div class=" card-child elevation-5">
            <v-row class="d-flex align-baseline ma-auto"
              ><v-col
                cols="12"
                sm="12"
                md="12"
                lg="6"
                class="d-flex align-baseline"
                ><v-text-field
                  name="name"
                  dense
                  outlined
                  clearable
                  v-model="username"
                  label="กรอก username เพื่อค้นหา"
                  placeholder="เช่น xx1234567"
                  hide-details="auto"
                ></v-text-field> </v-col
              ><v-col cols="12" sm="12" md="12" lg="6" class="text-center">
                <v-btn color="primary" @click="searchdata">
                  <v-icon left dark>
                    mdi-magnify
                  </v-icon>
                  ค้นหา</v-btn
                >
                <v-btn color="pink" dark>
                  <v-icon left dark>
                    mdi-pencil
                  </v-icon>
                  แก้ไขเทิร์น</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col lg="3" sm="4" md="4" cols="12" v-if="serchsuccess == true">
          <card-report
            title="USERNAME"
            :value="result.user"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/user.png"
          ></card-report>
        </v-col>
        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="CREDIT"
            :value="result.credit"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/credit-card.png"
          ></card-report>
        </v-col>
        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="เวลาที่เข้าใช้งานล่าสุด (อัพเดททุก 30 นาที)"
            :value="ip_data.updated_at"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/time-left.png"
          ></card-report>
        </v-col>

        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="ค่ายเกมที่เข้าเล่นล่าสุด"
            :value="result.provider_active"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/game-control.png"
          ></card-report>
        </v-col>
        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="REF."
            :value="data.lastest_dpref"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/book.png"
          ></card-report>
        </v-col>
        <v-col
          lg="3"
          sm="4"
          md="4"
          cols="12"
          class="pa-3"
          v-if="serchsuccess == true"
        >
          <card-report
            title="IP address ที่เข้าใช้งานล่าสุด"
            :value="ip_data.ip"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/placeholder.png"
          ></card-report>
        </v-col>
      </v-row>
      <v-card class="elevation-4 mt-5 rounded-lg" v-if="serchsuccess == true">
        <v-card class="elevation-3">
          <v-data-table :headers="header" hide-default-footer :items="response">
            <template #[`item.type`]="{item}">
              <span class="font-weight-bold primary--text">{{
                item.type
              }}</span>
            </template>
          </v-data-table></v-card
        >
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      serchsuccess: false,
      username: "",
      data: { lastest_dpref: "58579427-a2b0-41e5-9501-b9350f7804ba" },
      ip_data: {
        code: "",
        created_at: "",
        device: "",
        game_name: "",
        id: "",
        ip: "ip",
        provider_name: "",
        updated_at: "เวลาล่าสุด",
        username: "username"
      },
      result: {
        credit: 0,
        id: "",
        name: "",
        phone: "",
        provider_active: "ค่ายเกม",
        role: "",
        status: 1,
        user: "username"
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
      response: [
        {
          id: 4687,
          created_at: "2022-01-20T19:21:25.000000Z",
          updated_at: "2022-01-20T23:53:46.000000Z",
          turns: 15,
          turnTarget: 3380,
          type: "SL",
          withdrawable: 0,
          member_id: 321,
          editturn: null,
          limitwithdraw: 0,
          limit_withdraw_amount: null,
          bet: 81052.4
        },
        {
          id: 4688,
          created_at: "2022-01-20T19:21:25.000000Z",
          updated_at: "2022-01-20T23:53:46.000000Z",
          turns: 16,
          turnTarget: 3605,
          type: "SB",
          withdrawable: 0,
          member_id: 321,
          editturn: null,
          limitwithdraw: 0,
          limit_withdraw_amount: null,
          bet: 0
        },
        {
          id: 4689,
          created_at: "2022-01-20T19:21:25.000000Z",
          updated_at: "2022-01-20T23:53:46.000000Z",
          turns: 16,
          turnTarget: 3605,
          type: "ES",
          withdrawable: 0,
          member_id: 321,
          editturn: null,
          limitwithdraw: 0,
          limit_withdraw_amount: null,
          bet: 0
        },
        {
          id: 4690,
          created_at: "2022-01-20T19:21:25.000000Z",
          updated_at: "2022-01-20T23:53:46.000000Z",
          turns: 16,
          turnTarget: 3605,
          type: "OT",
          withdrawable: 0,
          member_id: 321,
          editturn: null,
          limitwithdraw: 0,
          limit_withdraw_amount: null,
          bet: 0
        },
        {
          id: 4691,
          created_at: "2022-01-20T19:21:25.000000Z",
          updated_at: "2022-01-20T23:53:46.000000Z",
          turns: 35,
          turnTarget: 7880,
          type: "LC",
          withdrawable: 0,
          member_id: 321,
          editturn: null,
          limitwithdraw: 0,
          limit_withdraw_amount: null,
          bet: 0
        },
        {
          id: 4692,
          created_at: "2022-01-20T19:21:25.000000Z",
          updated_at: "2022-01-20T23:53:46.000000Z",
          turns: 16,
          turnTarget: 3605,
          type: "LT",
          withdrawable: 0,
          member_id: 321,
          editturn: null,
          limitwithdraw: 0,
          limit_withdraw_amount: null,
          bet: 0
        }
      ]
    };
  },
  methods: {
    ...mapActions("member", ["getTurnByid"]),
    async searchdata() {
      try {
        this.serchsuccess = true;
        let response = await this.getTurnByid(this.username);
        this.ip_data = response.data.ip_data;
        this.result = response.data.result;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style></style>
