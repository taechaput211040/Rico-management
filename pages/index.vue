<template>
  <v-flex>
    <!-- sectioncard -->
    <v-row>
      <v-col lg="3" sm="6" md="6" cols="12" class="pa-3">
        <card-view
          title="รวมยอดฝากทั้งวัน"
          :value="datarander.depositbalance"
          iconSrc="https://image.smart-ai-api.com/public/thongtest/save-money.gif"
        ></card-view>
      </v-col>
      <v-col lg="3" sm="6" cols="12" class="pa-3">
        <card-view
          title="รวมยอดถอนทั้งวัน"
          :value="datarander.withdrawbalance"
          iconSrc="https://image.smart-ai-api.com/public/thongtest/24-hours.gif"
        ></card-view>
      </v-col>
      <v-col lg="3" sm="6" cols="12" class="pa-3">
        <card-view
          title="กำไร/ขาดทุน(วันนี้)"
          :value="datarander.profitlossDate"
          iconSrc="https://image.smart-ai-api.com/public/thongtest/laptop.gif"
        ></card-view>
      </v-col>
      <v-col lg="3" sm="6" cols="12" class="pa-3">
        <card-view
          title="กำไร/ขาดทุน(ทั้งเดือน)"
          :value="datarander.profitlossmounth"
          iconSrc="https://image.smart-ai-api.com/public/thongtest/presentation.gif"
        ></card-view>
      </v-col>
      <!-- sectioncard -->
    </v-row>
    <!-- sectiontable -->
    <v-row>
      <v-col cols="12" lg="6"
        ><v-card width="100%" class="elevation-3 rounded-lg pa-3">
          <v-card-title primary-title class="font-weight-bold">
            บัญชีฝากทั้งหมด
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle primary-title class="font-weight-bold text-center">
            เปิด-ปิด การฝากออโต้
          </v-card-subtitle>
          <div class="d-flex">
            <div
              v-for="(item, i) in actionBank"
              :key="i"
              class="col text-center tougle-system"
            >
              <img
                src="https://image.smart-ai-api.com/public/thongtest/bank/SCB.png"
                v-if="item.name == 'SCB'"
                alt=""
                class="icon-bank img-icon"
              />
              <img
                src="https://image.smart-ai-api.com/public/thongtest/bank/kbank.png"
                v-if="item.name == 'KBANK'"
                alt=""
                class="icon-bank img-icon"
              />
              <img
                src="https://image.smart-ai-api.com/public/thongtest/bank/TRUEWALLET.png"
                v-if="item.name == 'TRUEWALLET'"
                alt=""
                class="icon-bank img-icon"
              />
              <v-switch
                class="mx-auto text-center"
                v-model="item.status"
                true-value="on"
                false-value="off"
                :label="`${item.status.toString()}`"
              >
              </v-switch>
            </div>
          </div>

          <v-card>
            <v-data-table
              :headers="bankDepositColumn"
              :items="itemBank"
              hide-default-footer
            >
              <template #[`item.Companybank`]="{item}">
                <div class="pa-2">
                  <img
                    src="https://image.smart-ai-api.com/public/thongtest/bank/SCB.png"
                    v-if="item.Companybank == 'SCB'"
                    alt=""
                    class="icon-bank img-icon"
                  />
                  <img
                    src="https://image.smart-ai-api.com/public/thongtest/bank/kbank.png"
                    v-if="item.Companybank == 'KBANK'"
                    alt=""
                    class="icon-bank img-icon"
                  />
                  <img
                    src="https://image.smart-ai-api.com/public/thongtest/bank/TRUEWALLET.png"
                    v-if="item.Companybank == 'TRUEWALLET'"
                    alt=""
                    class="icon-bank img-icon"
                  />
                </div>
              </template>
              <template #[`item.Companybankname`]="{item}">
                <span class="font-weight-bold">
                  {{ item.Companybankname }}<br />
                  {{ item.Companybankacountnumber }}</span
                >
              </template>
              <template #[`item.actions`]>
                <v-btn small color="primary">เช็คยอด</v-btn>
              </template>
            </v-data-table>
          </v-card></v-card
        ></v-col
      >
      <v-col cols="12" lg="6"
        ><v-card width="100%" class="elevation-3 rounded-lg pa-3">
          <v-card-title primary-title class="font-weight-bold">
            บัญชีถอนทั้งหมด
          </v-card-title>

          <v-card>
            <v-data-table
              :headers="bankWithdrawColumn"
              :items="itemBank"
              hide-default-footer
            >
              <template #[`item.Companybankname`]="{item}">
                <span class="font-weight-bold">
                  {{ item.Companybankname }}<br />
                  {{ item.Companybankacountnumber }}</span
                >
              </template>
              <template #[`item.actions`]>
                <v-btn small color="primary">เช็คยอด</v-btn>
              </template>
            </v-data-table>
          </v-card></v-card
        ></v-col
      >
    </v-row>
    <!-- sectiontable -->
  </v-flex>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      datarander: {
        depositbalance: 60,
        withdrawbalance: 600,
        profitlossDate: 4000,
        profitlossmounth: -600
      },
      bankDepositColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true
        },
        {
          text: "ชื่อ",
          value: "Companybankname",
          align: "center",
          sortable: true
        },
        {
          text: "อัพเดทยอดคงเหลือ",
          value: "balanceupdatetime",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดเงินคงเหลือ",
          value: "balance",
          align: "center",
          sortable: false
        },
        {
          text: "การดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false
        }
      ],
      bankWithdrawColumn: [
        {
          text: "ธนาคาร",
          align: "center",
          value: "Companybank",
          sortable: true
        },
        {
          text: "ชื่อ",
          value: "Companybankname",
          align: "center",
          sortable: true
        },
        {
          text: "อัพเดทยอดคงเหลือ",
          value: "balanceupdatetime",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดเงินคงเหลือ",
          value: "balance",
          align: "center",
          sortable: false
        },
        {
          text: "การดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false
        }
      ],
      actionBank: [
        {
          name: "SCB",
          status: "off"
        },
        {
          name: "KBANK",
          status: "off"
        },
        {
          name: "TRUEWALLET",
          status: "off"
        }
      ],
      itemBank: [
        {
          Companybank: "SCB",
          Companybankacountnumber: "1111111111",
          Companybankname: "test",
          balanceupdatetime: "2022-01-14 17:17:26",
          balance: 0
        },
        {
          Companybank: "KBANK",
          Companybankacountnumber: "1111111111",
          Companybankname: "test",
          balanceupdatetime: "2022-01-14 17:17:26",
          balance: 0
        },
        {
          Companybank: "TRUEWALLET",
          Companybankacountnumber: "1111111111",
          Companybankname: "test",
          balanceupdatetime: "2022-01-14 17:17:26",
          balance: 0
        }
      ]
    };
  },
  methods: {
    testtodo(item) {
      console.log(item);
    }
  }
};
</script>
<style lang="scss"></style>
