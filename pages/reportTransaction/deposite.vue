<template>
  <v-flex>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการฝากเงินของสมาชิก</h2>
        <search-filter :filter="dateFilter" @search="searchdata"></search-filter
      ></v-row>
      <h2 class="mt-5">ยอดฝากรวม แยก ธนาคาร</h2>
      <v-row>
        <v-col cols="12" sm="3" md="3">
          <div class="card-child card-report elevation-5 text-center">
            <img
              src="~/assets/image/bank/RICO.png"
              alt=""
              class=" img-icon icon-Logo"
            />
            <div class="mb-3 ">เติมมือ</div>
            <div>
              ยอดฝากรวม :<span class="primary--text font-weight-bold"
                >{{ depositbalance }}
              </span>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
        <div class=" pa-5 font-weight-bold">
          จำนวนสมาชิกทั้งหมดตั้งเเต่วันที่
          {{ dateFilter.startDate }} ถึงวันที่
          {{ dateFilter.endDate }} จำนวนทั้งหมด {{ itemdeposit.length }} คน
        </div>
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

            <template #[`item.companyBank`]="{item}">
              <img-bank :value="item.companyBank"></img-bank>
            </template>
            <template #[`item.data-table-expand`]="{isExpanded, expand }">
              <div class="px-2">
                <v-btn
                  @click="expand(true)"
                  v-if="!isExpanded"
                  color="black"
                  dark
                  small
                  >ดูเพิ่มเติม</v-btn
                >
                <v-btn
                  @click="expand(false)"
                  v-if="isExpanded"
                  color="black"
                  dark
                  small
                  >ปิด</v-btn
                >
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
      </v-card>
    </v-container>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
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
          text: "ธนาคารเว็บ",
          value: "companyBank",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาใน SMS",
          value: "smsdatetime",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เวลาเติม",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "USERNAME",
          value: "member_id",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "จำนวนโบนัส",
          value: "bonusamount",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เครดิตก่อนเติม",
          value: "bfcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เครดิตหลังเติม",
          value: "afcredit",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เติมโดย",
          value: "topupby",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold "
        },
        {
          text: "หมายเหตุ",
          value: "data-table-expand",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      itemdeposit: [
        {
          afcredit: 75,
          amount: 75,
          bfcredit: "0",
          bonusamount: "0",
          companyBank: "RICO",
          created_at: "2022-01-25 14:58:55",
          dpref: "95c91cb9-6ccc-49dc-b56a-0c74c65d462f",
          id: 1253,
          member_id: "BE9453735759",
          remark: "เติม75 บาท โบนัส 0บาท  สำเร็จ โดยphoe mu kyi ไม่มีโปรโมชั่น",
          smsdatetime: "2022-01-25T14:28:45",
          sum: null,
          topupby: "phoe mu kyi",
          updated_at: "2022-01-25 14:58:55"
        },
        {
          afcredit: 228,
          amount: 150,
          bfcredit: "3",
          bonusamount: "75",
          companyBank: "RICO",
          created_at: "2022-01-25 14:44:46",
          dpref: "997696c4-56c1-4c2f-8638-966436bf124f",
          id: 1252,
          member_id: "BE9401631989",
          remark: "เติม150 บาท โบนัส 75บาท  สำเร็จ โดยnan mon ฝากทั้งวัน",
          smsdatetime: "2022-01-25T12:31:05",
          sum: null,
          topupby: "nan mon",
          updated_at: "2022-01-25 14:44:46"
        }
      ],
      depositbalance: "1630",
      dateFilter: {
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      }
    };
  },
  methods: {
    searchdata(textSearch) {
      console.log(this.dateFilter, "text :" + textSearch);
    }
  }
};
</script>

<style></style>
