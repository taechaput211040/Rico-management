<template>
  <v-flex>
    <v-container>
      <v-row>
        <h2 class="mb-2">รายการสมาชิก</h2>
        <search-filter
          :filter="dateFilter"
          @search="searchdata"
        ></search-filter>
      </v-row>
      <v-row>
        <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
          <div class="ma-5 font-weight-bold">
            จำนวนสมาชิกทั้งหมดตั้งเเต่วันที่
            {{ dateFilter.startDate }} ถึงวันที่
            {{ dateFilter.endDate }} จำนวนทั้งหมด {{ itemSearch.length }} คน
          </div>

           <v-card class="elevation-4 mt-5 rounded-lg">
            <div class="tabledata">
              <v-data-table
                :headers="columnReport"
                :items="itemSearch"
                hide-default-footer
              >
                <template #[`item.bankAcc`]="{item}">
                  <div class="row py-2 detailbank justify-center">
                    <div class="ma-auto">
                      <img-bank :value="item.bankName"></img-bank>
                    </div>
                    <div class="font-weight-bold">
                      <span class="primary--text ">{{ item.bankName }}</span
                      ><br />
                      {{ item.bankAcc }}
                    </div>
                  </div>
                </template>
                <template #[`item.no`]="{index}">
                  <span class="font-weight-bold">
                    {{ index + 1 }}
                  </span>
                </template>
                <template #[`item.name`]="{item}">
                  <span> {{ item.name }} {{ item.lastname }} </span>
                </template>
                <template #[`item.log`]>
                  <div class="d-md-flex justify-end">
                    <v-btn
                      class="mx-1"
                      color="success"
                      dark
                      small
                      @click.stop="dpdialog = true"
                      >ฝาก</v-btn
                    ><v-btn
                      class="mx-1"
                      color="error"
                      dark
                      small
                      @click.stop="wddialog = true"
                      >ถอน</v-btn
                    >
                  </div>
                </template>
                <template #[`item.actions`]>
                  <div class="d-md-flex">
                    <v-tooltip bottom color="primary">
                      <template v-slot:activator="{ on, attrs }"
                        ><v-btn
                          @click="changpass"
                          v-bind="attrs"
                          v-on="on"
                          color="primary mx-1"
                          x-small
                          fab
                          ><v-icon>mdi-lastpass</v-icon></v-btn
                        ></template
                      >
                      <span>เปลี่ยนรหัสผ่าน</span>
                    </v-tooltip>

                    <v-tooltip bottom color="warning">
                      <template v-slot:activator="{ on, attrs }"
                        ><v-btn
                          v-bind="attrs"
                          v-on="on"
                          color="warning mx-1"
                          x-small
                          fab
                          ><v-icon>mdi-pencil</v-icon></v-btn
                        ></template
                      >
                      <span>แก้ไขข้อมูล</span>
                    </v-tooltip>
                    <v-tooltip bottom color="black">
                      <template v-slot:activator="{ on, attrs }"
                        ><v-btn
                          v-bind="attrs"
                          v-on="on"
                          color="black mx-1"
                          x-small
                          dark
                          fab
                          ><v-icon>mdi-lock</v-icon></v-btn
                        ></template
                      >
                      <span>LOCK USER!</span>
                    </v-tooltip>
                  </div>
                </template>
              </v-data-table>
            </div>
          </v-card>
        </v-card>
      </v-row>
      <v-dialog v-model="dpdialog" max-width="1200px">
        <v-card class="pa-5">
          <v-card-text>
            <h3>รายการฝากล่าสุด 50 รายการ</h3>
          </v-card-text>
          <v-card class="">
            <v-data-table
              :headers="headerDeposit"
              hide-default-footer
            ></v-data-table>
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1 mt-2"
              dark
              small
              @click="dpdialog = false"
            >
              ปิด
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="wddialog" max-width="1200px">
        <v-card class="pa-5">
          <v-card-text>
            <h3>รายการถอนล่าสุด 50 รายการ</h3>
          </v-card-text>
          <v-card class="">
            <v-data-table
              :headers="headerWithdraw"
              hide-default-footer
            ></v-data-table>
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1 mt-2"
              dark
              small
              @click="wddialog = false"
            >
              ปิด
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-flex>
</template>

<script>
import ImgBank from "../../components/ImgBank.vue";
export default {
  components: { ImgBank },
  data() {
    return {
      dpdialog: false,
      wddialog: false,
      dateFilter: {
        startDate: new Date().toISOString().substr(0, 10),
        startTime: new Date(new Date().setHours(0, 0, 0, 0)),
        endDate: new Date().toISOString().substr(0, 10),
        endTime: new Date(new Date().setHours(23, 59, 59, 999))
      },
      columnReport: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          width: "20px"
        },
        {
          text: "ธนาคารลูกค้า",
          value: "bankAcc",
          align: "center",
          sortable: false
        },
        {
          text: "ชื่อ-นามสกุล",
          value: "name",
          align: "center",
          sortable: false,
          class: "col-1"
        },
        {
          text: "username",
          value: "username",
          align: "center",
          sortable: false
        },
        {
          text: "ผู้เเนะนำ",
          value: "recommender",
          align: "center",
          sortable: false
        },
        {
          text: "มาจากช่องทาง",
          value: "knowFrom",
          align: "center",
          sortable: false
        },
        {
          text: "วันที่สมัคร",
          value: "created_at",
          align: "center",
          sortable: false
        },
        {
          text: "วันที่สมัคร",
          value: "created_at",
          align: "center",
          sortable: false
        },
        {
          text: "วันที่แก้ไขข้อมูลล่าสุด",
          value: "updated_at",
          align: "center",
          sortable: false
        },
        {
          text: "ผู้แก้ไขล่าสุด",
          value: "operator",
          align: "center",
          sortable: false
        },
        {
          text: "ประวัติการฝาก/ถอน",
          value: "log",
          align: "center",
          sortable: false,
          class: "col-1"
        },

        {
          text: "ดำเนินการ",
          value: "actions",
          align: "center",
          sortable: false,
          class: "col-1"
        }
      ],
      headerWithdraw: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false
        },
        {
          text: "ธนาคารลูกค้า",
          value: "bankname",
          align: "center",
          sortable: false
        },

        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false
        },
        {
          text: "ประเภท",
          value: "type",
          align: "center",
          sortable: false
        },
        {
          text: "ยอดโอน",
          value: "amount",
          align: "center",
          sortable: false
        },
        {
          text: "เวลากดถอน",
          value: "no",
          align: "center",
          sortable: false
        },
        {
          text: "เวลาโอนสำเร็จ",
          value: "timesuccess",
          align: "center",
          sortable: false
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false
        },
        {
          text: "กดถอนโดย",
          value: "withdrawby",
          align: "center",
          sortable: false
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          align: "center",
          sortable: false
        }
      ],
      headerDeposit: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false
        },
        {
          text: "ธนาคารเว็ป",
          value: "bankname",
          align: "center",
          sortable: false
        },
        {
          text: "เวลาใน SMS",
          value: "smsTransection",
          align: "center",
          sortable: false
        },
        {
          text: "เวลาเติม",
          value: "timeTransection",
          align: "center",
          sortable: false
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false
        },
        {
          text: "จำนวนเงิน",
          value: "amount",
          align: "center",
          sortable: false
        },
        {
          text: "จำนวนโบนัส",
          value: "Bonus",
          align: "center",
          sortable: false
        },
        {
          text: "เครดิตก่อนเเติม",
          value: "bfcredit",
          align: "center",
          sortable: false
        },
        {
          text: "เครดิตหลังเเติม",
          value: "afcredit",
          align: "center",
          sortable: false
        },
        {
          text: "เติมโดย",
          value: "topupby",
          align: "center",
          sortable: false
        },
        {
          text: "หมายเหตุ",
          value: "remark",
          align: "center",
          sortable: false
        }
      ],
      itemSearch: [
        {
          bankAcc: "09772778704",
          bankAccRef: "X2778704",
          bankName: "WAVEPAY",
          birthdate: null,
          bonusid: 3,
          created_at: "2022-01-20 12:47:38",
          dpAuto: true,
          gender: "male",
          knowFrom: "สมัครจากหน้าเว็บ",
          lastname: "aayt",
          lastnameEng: null,
          lineID: "ไม่มีข้อมูล",
          name: "aayt",
          nameEng: null,
          operator: "RICO",
          phone: "09778772704",
          recommender: null,
          remark: null,
          status: true,
          updated_at: "2022-01-20 12:51:23",
          username: "BE9778772704",
          wdAuto: false
        },
        {
          bankAcc: "09687983424",
          bankAccRef: "X7983424",
          bankName: "KBZpay",
          birthdate: null,
          bonusid: 3,
          created_at: "2022-01-21 02:08:52",
          dpAuto: true,
          gender: "male",
          knowFrom: "สมัครจากหน้าเว็บ",
          lastname: "win",
          lastnameEng: null,
          lineID: "ไม่มีข้อมูล",
          name: "aye",
          nameEng: null,
          operator: "RICO",
          phone: "09459897545",
          recommender: "aye win",
          remark: null,
          status: true,
          updated_at: "2022-01-21 06:53:46",
          username: "BE9459897545",
          wdAuto: false
        }
      ]
    };
  },
  methods: {
    searchdata(textSearch) {
      console.log(this.dateFilter, "text :" + textSearch);
    },
    yesterday() {
      console.log("yesterday");
    },
    today() {
      console.log("today");
    },
    changpass() {
      console.log(this.changpass);
    }
  }
};
</script>

<style></style>
