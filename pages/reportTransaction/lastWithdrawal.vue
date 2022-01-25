<template>
  <v-flex>
    <v-container>
      <v-row class="pa-3">
        <h2>รายการถอนเงินของสมาชิกล่าสุด 100 รายการ</h2>
      </v-row>
      <v-row class="mb-3">
        <v-col cols="12" sm="3" md="3">
          <div class="card-child card-report elevation-5">
            <h3>เปิดการรีเฟรชอัตโนมัติ</h3>
            <v-switch
              class=" text-center"
              v-model="autorefresh"
              hide-details="auto"
              true-value="เปิด"
              false-value="ปิด"
              :label="`${autorefresh.toString()}`"
            >
            </v-switch>
          </div>
        </v-col>
      </v-row>
      <v-card width="100%" class="elevation-4 rounded-lg">
        <v-data-table
          show-expand
          class="elevation-1"
          :headers="headerCell"
          :items="itemdeposit"
          hide-default-footer
          single-expand
        >
          <template #[`item.no`]="{index}">
            <span class="font-weight-bold">
              {{ index + 1 }}
            </span>
          </template>

          <template #[`item.bankAcc`]="{item}">
            <div class="pa-2">
              <img-bank :value="item.bankName"></img-bank>
              <span class="font-weight-bold">{{ item.bankAcc }}</span>
            </div>
          </template>
          <template #[`item.status`]="{item}">
            <v-chip
              small
              v-if="item.status == 'Success'"
              outlined
              color="success"
            >
              <v-icon left>mdi-circle</v-icon> {{ item.status }}</v-chip
            >
            <v-chip small v-else color="error" outlined
              ><v-icon left>mdi-circle</v-icon> {{ item.status }}</v-chip
            >
          </template>
          <template #[`item.name`]="{item}">
            <div class="pa-2">
              <span>{{ item.name }}</span
              ><br />
              <span class="font-weight-bold primary--text">{{
                item.username
              }}</span>
            </div>
          </template>
          <template #[`item.bfafcredit`]="{item}">
            <div class="d-flex align-baseline justify-center">
              <v-chip
                class="font-weight-bold pa-2 elevation-2 mt-2 mx-2 mb-1"
                color="grey darken-1"
                label
                x-small
                dark
                ><v-icon class="mr-1">mdi-credit-card</v-icon>ก่อน :</v-chip
              >
              {{ item.bfcredit }}
            </div>

            <div class="d-flex align-baseline justify-center">
              <v-chip
                class="font-weight-bold pa-2 elevation-2 mt-2 mx-2 mb-1"
                color="grey darken-1"
                label
                x-small
                dark
                ><v-icon class="mr-1">mdi-credit-card</v-icon>หลัง :</v-chip
              >
              {{ item.afcredit }}
            </div>
          </template>
          <template #[`item.data-table-expand`]="{isExpanded, expand }">
            <div class="px-3">
              <v-btn
                @click="expand(true)"
                v-if="!isExpanded"
                color="black"
                dark
                small
              >
                ดูเพิ่มเติม <v-icon right>mdi-menu-down</v-icon></v-btn
              >
              <v-btn
                @click="expand(false)"
                v-if="isExpanded"
                color="black"
                dark
                small
                >ปิด<v-icon right>mdi-menu-up</v-icon></v-btn
              >
            </div>
          </template>
          <template #[`item.actions`]>
            <div class="d-flex">
              <v-tooltip bottom color="success">
                <template v-slot:activator="{ on, attrs }"
                  ><v-btn
                    @click="changpass"
                    v-bind="attrs"
                    v-on="on"
                    color="success mx-1"
                    x-small
                    fab
                    ><v-icon>mdi-check</v-icon></v-btn
                  ></template
                >
                <span>อนุมัติ</span>
              </v-tooltip>

              <v-tooltip bottom color="error">
                <template v-slot:activator="{ on, attrs }"
                  ><v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="error mx-1"
                    x-small
                    fab
                    ><v-icon>mdi-close</v-icon></v-btn
                  ></template
                >
                <span>ไม่อนุมัติ</span>
              </v-tooltip>
              <v-tooltip bottom color="primary">
                <template v-slot:activator="{ on, attrs }"
                  ><v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="primary mx-1"
                    x-small
                    dark
                    fab
                    ><v-icon>mdi-restore</v-icon></v-btn
                  ></template
                >
                <span>Reset</span>
              </v-tooltip>
              <v-tooltip bottom color="grey">
                <template v-slot:activator="{ on, attrs }"
                  ><v-btn
                    v-bind="attrs"
                    v-on="on"
                    color="grey mx-1"
                    x-small
                    dark
                    fab
                    ><v-icon>mdi-gesture-tap</v-icon></v-btn
                  ></template
                >
                <span>ถอนมือ</span>
              </v-tooltip>
            </div>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div class="text-center font-weight-bold purple--text">
                {{ item.remark }}
              </div>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      autorefresh: "ปิด",
      headerCell: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "ธนาคารลูกค้า",
          value: "bankAcc",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ชื่อบัญชีลูกค้า",
          value: "name",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ยอดโอน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลากดถอน",
          value: "requsettime",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },

        {
          text: "ยอดเครดิตก่อน/หลัง",
          value: "bfafcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold "
        },
        {
          text: "เวลาโอนสำเร็จ",
          value: "transferTime",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ยอดเงินบัญชีถอน",
          value: "bonusamount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "โอนโดย",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "การดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      itemdeposit: [
        {
          afAmount: null,
          afcredit: 100,
          amount: 1600,
          bankAcc: "09401631989",
          bankName: "KBZpay",
          bfAmount: null,
          bfcredit: 1700,
          id: 209,
          name: "Tint Wai Phyo",
          operator: "phoe mu kyi",
          remark: "กรุณาทำการโอนด้วยตนเอง",
          requsettime: "2022-01-25 11:38:42",
          status: "Success",
          transferTime: "โอนมือ",
          type: "common",
          username: "BE9401631989"
        },
        {
          afAmount: null,
          afcredit: 0,
          amount: 552,
          bankAcc: "9693319559",
          bankName: "WAVEPAY",
          bfAmount: null,
          bfcredit: 552,
          id: 208,
          name: "Ko Thu",
          operator: "phoe mu kyi",
          remark: "กรุณาทำการโอนด้วยตนเอง",
          requsettime: "2022-01-25 10:15:04",
          status: "Error",
          transferTime: "โอนมือ",
          type: "common",
          username: "BE9693319559"
        }
      ]
    };
  }
};
</script>

<style></style>
