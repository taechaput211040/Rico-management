<template>
  <v-flex>
    <h3 class="mb-4">พนักงาน</h3>
    <v-card class="elevation-4 mt-5 rounded-lg" width="100%">
      <div class="pa-3 font-weight-bold">
        <v-btn color="primary" small @click="dlemployee = true"
          >เพิ่มพนักงาน</v-btn
        >
      </div>
      <v-card width="100%" class="elevation-4 rounded-lg">
        <v-data-table
          :headers="employeeHeader"
          :items="employee"
          hide-default-footer
        >
          <template #[`item.no`]="{index}">
            <span class="font-weight-bold">
              {{ index + 1 }}
            </span>
          </template>
          <template #[`item.action`]="{item}">
            <div class="text-center d-flex justify-center">
              <v-btn
                color="black"
                class="mx-1"
                dark
                small
                @click="editEmployee(item)"
                ><v-icon left small>mdi-cog</v-icon>แก้ไข</v-btn
              >
              <v-btn color="error" dark small
                ><v-icon left small>mdi-delete</v-icon>ลบ</v-btn
              >
            </div>
          </template>
          <template #[`item.position`]="{item}">
            <span v-if="item.is_admin == true">ADMIN</span>
            <span v-else>STAFF</span>
          </template>
          <template #[`item.status`]="{item}">
            <v-chip
              color="success"
              small
              outlined
              dark
              v-if="item.status == true"
            >
              <v-icon left small>mdi-circle</v-icon>
              เปิดใช้งาน
            </v-chip>
            <v-chip color="error" small outlined dark v-else>
              <v-icon left small>mdi-circle</v-icon>
              ปิดใช้งาน
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-card>
    <!--createdialog -->
    <v-dialog v-model="dlemployee" max-width="800px" height="auto">
      <v-card class="pa-5 ">
        <v-card-title>
          <h4 class="font-weight-bold mx-auto  primary--text">
            เพิ่มพนักงาน
          </h4></v-card-title
        >

        <v-row class="py-3">
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">ชื่อ-นามสกุล</span>
            <v-text-field
              required
              placeholder="ชื่อ-นามสกุล"
              dense
              v-model="createAccount.name"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">เบอร์โทรศัพท์</span>
            <v-text-field
              required
              placeholder="กรอกเบอร์โทรศัพท์"
              dense
              v-model="createAccount.phone"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">Username</span>
            <v-text-field
              required
              placeholder="กรอก Username"
              v-model="createAccount.username"
              dense
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">Password</span>
            <v-text-field
              required
              placeholder="กรอก Password"
              dense
              v-model="createAccount.password"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <span class="font-weight-bold">เลือกตำแหน่ง</span>
            <v-radio-group
              class="py-2"
              hide-details="auto"
              v-model="createAccount.is_admin"
            >
              <v-radio label="ADMIN" :value="true"></v-radio>
              <v-radio label="STAFF" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="6" sm="4">
            <span class="font-weight-bold">สถานะ</span>
            <v-switch
              hide-details="auto"
              v-model="createAccount.status"
            ></v-switch>
          </v-col>
          <v-col cols="6" sm="4">
            <span class="font-weight-bold">ลิมิตการเติมเครดิต</span>
            <v-switch
              hide-details="auto"
              v-model="createAccount.limittopup"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="12" v-show="createAccount.limittopup == true">
            <span class="font-weight-bold">เครดิตที่เติมได้ต่อวัน</span>
            <v-text-field
              required
              type="number"
              dense
              v-model="createAccount.creditperday"
              outlined
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="customlist">
          <v-card class="pa-3 mt-3 ">
            <v-card-title>
              <h4 class="purple--text">ตั้งค่าการเข้าถึงเมนู</h4>
            </v-card-title>
            <v-list>
              <v-list-item-group multiple>
                <v-list dense class="red_list">
                  <div v-for="(link, i) in group" :key="i">
                    <v-list-item
                      v-if="!link.subLinks"
                      class="v-list-item font-weight-bold "
                    >
                      <v-list-item-action>
                        <v-checkbox
                          v-model="link.status"
                          color="deep-purple accent-4"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-title class="" v-text="link.title" />
                    </v-list-item>

                    <v-list-group
                      group
                      sub-group
                      active-class=" deep-purple--text"
                      v-else
                      :key="link.title"
                      :value="false"
                    >
                      <template v-slot:activator>
                        <v-list-item-action class="">
                          <v-checkbox
                            v-model="link.status"
                            color="deep-purple accent-4"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-title
                          class=" h1 d-flex"
                          style="margin-left: 31px;"
                          >{{ link.title }}<v-spacer></v-spacer>
                          <v-icon>mdi-menu-down</v-icon></v-list-item-title
                        >
                      </template>

                      <v-list-item
                        v-for="sublink in link.subLinks"
                        :key="sublink.text"
                      >
                        <v-list-item-action>
                          <v-checkbox
                            v-model="sublink.status"
                            color="deep-purple accent-4"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-title v-text="sublink.text" />
                      </v-list-item>
                    </v-list-group>
                  </div>
                </v-list>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>

        <v-card-actions>
          <div class="mx-auto">
            <v-btn color="primary">เพิ่มพนักงาน</v-btn>
            <v-btn color="error" @click="dlemployee = false">ยกเลิก</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- createdialog -->
    <!-- editdialog -->
    <v-dialog v-model="dledit" max-width="800px" height="auto">
      <v-card class="pa-3 pa-md-5 ">
        <v-card-title>
          <h4 class="font-weight-bold mx-auto  primary--text">
            แก้ไขพนักงาน
          </h4></v-card-title
        >

        <v-row class="py-3">
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">ชื่อ-นามสกุล</span>
            <v-text-field
              required
              placeholder="ชื่อ-นามสกุล"
              dense
              v-model="editAccount.name"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">เบอร์โทรศัพท์</span>
            <v-text-field
              required
              placeholder="กรอกเบอร์โทรศัพท์"
              dense
              v-model="editAccount.phone"
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">Username</span>
            <v-text-field
              required
              placeholder="กรอก Username"
              v-model="editAccount.username"
              dense
              hide-details="auto"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <span class="font-weight-bold">Password</span>
            <div v-show="changepass == false">
              <v-btn color="info" class="m-auto" @click="changepass = true"
                >เปลี่ยนรหัสผ่าน</v-btn
              >
            </div>
            <div v-show="changepass == true">
              <v-text-field
                required
                placeholder="กรอก Password"
                dense
                v-model="editAccount.password"
                hide-details="auto"
                outlined
              ></v-text-field>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <span class="font-weight-bold">เลือกตำแหน่ง</span>
            <v-radio-group
              class="py-2"
              hide-details="auto"
              v-model="editAccount.is_admin"
            >
              <v-radio label="ADMIN" :value="true"></v-radio>
              <v-radio label="STAFF" :value="false"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="6" sm="4">
            <span class="font-weight-bold">สถานะ</span>
            <v-switch
              hide-details="auto"
              v-model="editAccount.status"
            ></v-switch>
          </v-col>
          <v-col cols="6" sm="4">
            <span class="font-weight-bold">ลิมิตการเติมเครดิต</span>
            <v-switch
              hide-details="auto"
              v-model="editAccount.limittopup"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="12" v-show="editAccount.limittopup == true">
            <span class="font-weight-bold">เครดิตที่เติมได้ต่อวัน</span>
            <v-text-field
              required
              type="number"
              dense
              v-model="editAccount.creditperday"
              outlined
              hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="customlist">
          <v-card class="pa-3 mt-3 ">
            <v-card-title>
              <h4 class="purple--text">ตั้งค่าการเข้าถึงเมนู</h4>
            </v-card-title>
            <v-list>
              <v-list-item-group multiple>
                <v-list dense class="red_list">
                  <div v-for="(link, i) in group" :key="i">
                    <v-list-item
                      v-if="!link.subLinks"
                      class="v-list-item font-weight-bold "
                    >
                      <v-list-item-action>
                        <v-checkbox
                          v-model="link.status"
                          color="deep-purple accent-4"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-title class="" v-text="link.title" />
                    </v-list-item>

                    <v-list-group
                      group
                      sub-group
                      active-class=" deep-purple--text"
                      v-else
                      :key="link.title"
                      :value="false"
                    >
                      <template v-slot:activator>
                        <v-list-item-action class="">
                          <v-checkbox
                            v-model="link.status"
                            color="deep-purple accent-4"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-title
                          class=" h1 d-flex"
                          style="margin-left: 31px;"
                          >{{ link.title }}<v-spacer></v-spacer>
                          <v-icon>mdi-menu-down</v-icon></v-list-item-title
                        >
                      </template>

                      <v-list-item
                        v-for="sublink in link.subLinks"
                        :key="sublink.text"
                      >
                        <v-list-item-action>
                          <v-checkbox
                            v-model="sublink.status"
                            color="deep-purple accent-4"
                          ></v-checkbox>
                        </v-list-item-action>
                        <v-list-item-title v-text="sublink.text" />
                      </v-list-item>
                    </v-list-group>
                  </div>
                </v-list>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>

        <v-card-actions>
          <div class="mx-auto">
            <v-btn color="primary">แก้ไขพนักงาน</v-btn>
            <v-btn color="error" @click="dledit = false">ยกเลิก</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- editdialog -->
  </v-flex>
</template>

<script>
import { mapActions } from "vuex";
export default {
  watch: {
    dlemployee(newVal) {
      if (newVal) {
        this.createAccount = {
          creditperday: "",
          is_admin: false,
          limittopup: false,
          name: "",
          phone: "",
          status: false,
          username: "",
          password: ""
        };
      }
    },
    dledit(newVal) {
      if (newVal) {
        this.changepass = false;
        this.createAccount = {
          creditperday: "",
          is_admin: false,
          limittopup: false,
          name: "",
          phone: "",
          status: false,
          username: "",
          password: ""
        };
      }
    }
  },
  data() {
    return {
      group: [
        {
          title: "Dashboard",
          to: "/",
          icon: "mdi-view-dashboard",
          status: true
        },
        {
          title: "จัดการสมาชิก",
          icon: "mdi-account",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "สมัครสมาชิก",
              to: "/member/register",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานสมาชิก",
              to: "/member/reportMember",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "เช็คข้อมูลปัจจุบัน/จำนวนเทิร์น",
              to: "/member/memberCheck",
              status: false
            },
            {
              icon: "mdi-view-dashboard",
              text: "เช็คข้อมูลการเล่น",
              to: "/member/memberReportTransaction",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "ถอนเครดิตสมาชิก(Manual)",
              to: "/member/withdrawManual",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "แก้ไขเครดิต/รายการผิดพลาด",
              to: "/member/ManualEditCredit",
              status: true
            }
          ]
        },
        {
          title: "รายงานฝาก/ถอน",
          icon: "mdi-credit-card-check",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "รายการฝากสมาชิก",
              to: "/reportTransaction/deposite",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการถอนสมาชิก",
              to: "/reportTransaction/withdraw",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการถอนสมาชิกล่าสุด",
              to: "/reportTransaction/lastWithdrawal",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการฝากแรก",
              to: "/reportTransaction/firstDeposit",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการที่ถูกซ่อน",
              to: "/reportTransaction/hiddenReport",
              status: true
            }
          ]
        },
        {
          title: "รายงานสรุป",
          icon: "mdi-credit-card-plus-outline",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "กำไร/ขาดทุน",
              to: "/profitReport/Report",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "กำไร/ขาดทุน รายบุคคล",
              to: "/profitReport/ProfitByUserReport",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "สรุปโปรโมชัน",
              to: "/profitReport/PromotionReport",
              status: true
            }
          ]
        },

        {
          title: "ตั้งค่าโปรโมชั่น",
          icon: "mdi-history",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "โปรโมชันทั่วไป",
              to: "/promotion/generalPromotion",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "Cashback",
              to: "/promotion/cashback",
              status: true
            }
          ]
        },
        {
          title: "ตั้งค่าลิงก์รับทรัพย์",
          icon: "mdi-history",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "รายงานลิงก์รับทรัพย์",
              to: "/Affiliate/report",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "ข้อมูลสมาชิกลิงก์รับทรัพย์",
              to: "/Affiliate/infomember",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "ตั้งค่า",
              to: "/Affiliate/setting",
              status: true
            }
          ]
        },
        {
          title: "ตั้งค่า Feature",
          icon: "mdi-gamepad-variant-outline",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "เครดิตฟรี",
              to: "/feature/creditfree",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "กงล้อนำโชค",
              to: "/feature/wheel",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "เปิดไพ่6ใบ",
              to: "/feature/sixcard",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "เปิดหีบสมบัติ",
              to: "/feature/chest",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "เช็คอินรายวัน",
              to: "/feature/checkindaily",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "สะสมเเต้ม",
              to: "/feature/point",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "ของพรีเมียม",
              to: "/feature/premiumn",
              status: true
            }
          ]
        },
        {
          title: "ตั้งค่าระบบ",
          to: "/system",
          icon: "mdi-cog-outline",
          status: true
        },
        {
          title: "รายชื่อมิจฉาชีพ",
          to: "/CriminalList",
          icon: "mdi-gamepad-square",
          status: true
        },
        {
          title: "พนักงาน",
          to: "/employee",
          icon: "mdi-gamepad-square",
          status: true
        },
        {
          title: "ธนาคาร",
          to: "/companyBank",
          icon: "mdi-gamepad-square",
          status: true
        }
      ],
      modellist: [],
      seletstatus: [],
      changepass: false,
      editAccount: {},
      createAccount: {
        creditperday: "",
        is_admin: false,
        limittopup: false,
        name: "",
        phone: "",
        status: false,
        username: "",
        password: ""
      },
      dledit: false,
      dlemployee: false,
      employeeHeader: [
        {
          text: "ลำดับ",
          value: "no",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          width: "50px"
        },
        {
          text: "ชื่อ",
          value: "name",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold"
        },
        {
          text: "เบอร์โทรศัพท์",
          value: "phone",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "USERNAME",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold primary--text"
        },
        {
          text: "ระดับพนักงาน",
          value: "position",
          align: "center",
          sortable: false,
          class: "font-weight-bold ",
          cellClass: "font-weight-bold error--text"
        },
        {
          text: "สถานะ",
          value: "status",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "สร้างโดย",
          value: "operator",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "เมื่อ",
          value: "created_at",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "การดำเนินการ",
          value: "action",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      employee: []
    };
  },
  async fetch() {
    try {
      let response = await this.getEmployee();
      this.employee = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("setting", ["getEmployee"]),
    editEmployee(item) {
      this.dledit = true;
      this.editAccount = item;
    }
  }
};
</script>

<style lang="scss">
.customlist {
  .v-list-item__icon {
    display: none !important;
  }
}

.customlist .v-list-item__action {
  padding-right: 0px !important ;
}

</style>
