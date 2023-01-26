<template>
  <v-flex>
    <v-container>
      <h2 class="mb-2">ถอนเครดิตสมาฃิก (Manual)</h2>
      <v-row
        ><v-col lg="5" sm="12" md="12" cols="12">
          <div class="card-child elevation-5">
            <v-row class="d-flex align-baseline ma-auto"
              ><v-col
                cols="8"
                sm="8"
                md="8"
                lg="8"
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
                  <v-icon left dark> mdi-magnify </v-icon>
                  ค้นหา</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col lg="3" sm="6" md="6" cols="12">
          <card-report
            title="เครดิตปัจจุบัน"
            value="10"
            iconSrc="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/credit-card.png"
          ></card-report>
        </v-col>
        <v-col lg="4" sm="6" md="6" cols="12">
          <div class="card-child elevation-5">
            <v-row class="align-baseline ma-auto">
              <v-col cols="12" md="8" sm="8"
                ><v-text-field
                  name="name"
                  dense
                  outlined
                  clearable
                  type="number"
                  label="กรอกเครดิตที่ต้องการถอน"
                  placeholder="เป็นตัวเลขเท่านั้น"
                  hide-details="auto"
                ></v-text-field
              ></v-col>
              <v-col cols="12" sm="4" md="4" class="text-center">
                <v-btn color="error" :disabled="canwrite"
                  >ถอนเครดิต
                </v-btn></v-col
              >
            </v-row>
          </div>
        </v-col></v-row
      >

      <v-card class="elevation-4 mt-5 rounded-lg">
        <v-data-table :headers="header" hide-default-footer :items="response">
          <template #[`item.type`]="{ item }">
            <span class="font-weight-bold primary--text">{{ item.type }}</span>
          </template>
        </v-data-table></v-card
      >
    </v-container>
  </v-flex>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      header: [
        {
          text: "ประเภทเกมส์",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "TURN",
          value: "turn",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "ยอด แพ้/ชนะ ที่ต้องทำ",
          value: "turnTarget",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "แพ้/ชนะ",
          value: "bet",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
        {
          text: "ยอดเล่นคงค้าง",
          value: "withdrawable",
          align: "center",
          sortable: false,
          class: "font-weight-bold",
        },
      ],
      response: [
        {
          type: "SL",
          turn: "15",
          turnTarget: "6522",
          bet: "0",
          withdrawable: "0",
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["menu"]),
    canwrite() {
      if (this.menu) {
        if (!this.menu.includes("manageMember_write")) return true;
        else return false;
      }
    },
  },
};
</script>

<style></style>
