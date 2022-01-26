<template>
  <v-flex>
    <v-container>
      <v-row class="mb-2 pa-3"
        ><h2>รายการฝากเงินครั้งแรกของสมาชิก</h2>
        <search-filter :filter="dateFilter" @search="searchdata"></search-filter
      ></v-row>

      <v-row>
        <v-col cols="12" sm="3" md="3">
          <div class="card-child card-report elevation-5 text-center">
            <img
              src="https://image.smart-ai-api.com/public/image-storage/Ricoredesign/icon/donation.png"
              alt=""
              class=" img-icon icon-Logo"
            />
            <div>
              ยอดฝากแรกของสมาชิกรวม :<span
                class="primary--text font-weight-bold"
                >{{ depositbalance }}
              </span>
              บาท
            </div>
            <div>
              ลูกค้าทั้งหมดจำนวน :
              <span class="primary--text font-weight-bold"
                >{{ itemdeposit.length }}
              </span>
              คน
            </div>
          </div>
        </v-col>
      </v-row>
      <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
        <div class=" pa-5 font-weight-bold">
          จำนวนสมาชิกทั้งหมดตั้งเเต่วันที่
          {{ date_start }} ถึงวันที่ {{ date_end }} จำนวนทั้งหมด
          {{ itemdeposit.length }} คน
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
            <template #[`item.smsdatetime`]="{item}">
              <span>
                {{ getthaidate(item.smsdatetime) }}
              </span>
            </template>
            <template #[`item.created_at`]="{item}">
              <span>
                {{ getthaidate(item.created_at) }}
              </span>
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
          afcredit: 150,
          amount: 75,
          bfcredit: "0",
          bonusamount: "75",
          companyBank: "RICO",
          created_at: "2022-01-26 03:30:01",
          dpref: "1824150c-01c0-4f67-884e-b214509f88fe",
          id: 1319,
          member_id: "BE9983616528",
          remark: "เติม75 บาท โบนัส 75บาท  สำเร็จ โดยphue phue สมัครสมาชิกใหม่",
          smsdatetime: "2022-01-25T02:57:24",
          sum: null,
          topupby: "phue phue",
          updated_at: "2022-01-26 03:30:01"
        },
        {
          afcredit: 360,
          amount: 180,
          bfcredit: "0",
          bonusamount: "180",
          companyBank: "RICO",
          created_at: "2022-01-26 03:18:42",
          dpref: "ba4a3b1e-4cad-4aca-953f-a4d3b1f385c2",
          id: 1318,
          member_id: "BE9670812088",
          remark:
            "เติม180 บาท โบนัส 180บาท  สำเร็จ โดยphue phue สมัครสมาชิกใหม่",
          smsdatetime: "2022-01-25T02:48:15",
          sum: null,
          topupby: "phue phue",
          updated_at: "2022-01-26 03:18:42"
        }
      ],
      depositbalance: "1630",
      dateFilter: {
        inputfilter: "",
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      }
    };
  },
  computed: {
    date_start(val) {
      if (val) {
        return this.$moment(String(this.dateFilter.startDate)).format(
          "MM/DD/YYYY"
        );
      }
    },
    date_end(val) {
      if (val) {
        return this.$moment(String(this.dateFilter.endDate)).format(
          "MM/DD/YYYY"
        );
      }
    }
  },
  methods: {
    searchdata() {
      console.log(this.dateFilter);
    },
    getthaidate(timethai) {
      const time = this.$moment(timethai)
        .add(7, "hours")
        .format("YYYY-MM-DD เวลา HH:mm:ss");
      return time;
    }
  }
};
</script>

<style></style>
