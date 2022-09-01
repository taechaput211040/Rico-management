<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold" v-text="title" />
      <v-spacer />
      <v-chip outlined class="font-weight-bold" color="success"
        ><v-icon left>mdi-account</v-icon>{{ memberOnline }} Online member
        <v-btn icon @click="showMember = true"
          ><v-icon>mdi-chart-box</v-icon></v-btn
        >
      </v-chip>
      <v-tooltip left color="orange">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="dialogsound = true"
            fab
            dark
            v-bind="attrs"
            v-on="on"
            small
            class="mx-3"
            color="orange"
          >
            <v-icon>mdi-volume-high</v-icon>
          </v-btn>
        </template>
        <span>ตั้งค่าเสียง</span>
      </v-tooltip>
      <v-speed-dial direction="bottom" transition="slide-y-transition">
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon> mdi-account-circle </v-icon>
          </v-btn>
        </template>

        <v-tooltip left color="red">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              fab
              dark
              v-bind="attrs"
              v-on="on"
              small
              color="red"
              @click="logout"
            >
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span>ออกจากระบบ</span>
        </v-tooltip>
      </v-speed-dial>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      app
      fixed
      width="270"
    >
      <v-toolbar-title class="font-weight-bold pa-4 text-center" align-center>
        <v-img
          max-height="150"
          max-width="200"
          contain
          class="ma-auto my-5"
          src="https://image.smart-ai-api.com/public/Rico-main-resite/logo.png"
        ></v-img>
      </v-toolbar-title>
      <v-list nav dense class="mt-5">
        <div v-for="(link, i) in items" :key="i">
          <v-list-item
            v-if="!link.subLinks"
            :disabled="link.status == 2"
            :to="link.to"
            class="pa-1 font-weight-bold"
            active-class="bg-primary-grediaun"
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="link.title" />
            <v-badge
              color="error"
              right
              style="z-index: -1"
              v-if="link.status == 2"
              :disabled="link.status == 2"
              icon="mdi-tools"
              inline
              overlap
            ></v-badge>
          </v-list-item>
          <v-list-group
            color="deep-purple lighten-2 "
            v-else
            :key="link.title"
            no-action
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </template>
            <v-list-item
              class="pa-1"
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
              :disabled="sublink.status == 2"
              active-class="bg-primary-grediaun"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="sublink.text" />
              <v-badge
                color="error"
                right
                style="z-index: -1"
                v-if="sublink.status == 2"
                :disabled="sublink.status == 2"
                icon="mdi-tools"
                inline
                overlap
              ></v-badge>
            </v-list-item>
          </v-list-group>
        </div>
        <div>
          <v-list-item @click="logout()" class="pa-1">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout </v-list-item-title>
          </v-list-item>
        </div>
      </v-list>

      <v-toolbar-title
        class="font-weight-bold mt-5 text-center"
        style="position: relative;
    height: 200px;"
      >
        <v-tooltip bottom color="red">
          <template v-slot:activator="{ on, attrs }">
            <v-img
              @click="logdownweb()"
              max-height="100"
              max-width="100"
              contain
              v-bind="attrs"
              v-on="on"
              class="ma-auto mt-5 emergency"
              src="https://image.smart-ai-api.com/public/thongtest/emergency.png"
            ></v-img
          ></template>
          <span>ปิดระบบด่วน!!!!</span>
        </v-tooltip>
      </v-toolbar-title>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-slide-x-transition>
        <v-container>
          <div class="mainshow py-sm-4 px-2 rounded-xl"><Nuxt /></div
        ></v-container>
      </v-slide-x-transition>
      <v-dialog v-model="dialogsound" max-width="290">
        <v-card>
          <v-card-title>
            <h4>ตั้งค่าการแจ้งเตือน</h4>
          </v-card-title>

          <v-card-text class="font-weight-bold">
            <div class="my-2">
              ฝากเงิน (ออโต้) :
              <v-btn
                color="primary"
                small
                v-if="soundsetting.auto == true"
                rounded
                @click="setsound('auto')"
                ><v-icon left>mdi-volume-high</v-icon> เปิด</v-btn
              >
              <v-btn
                color="grey"
                small
                v-if="soundsetting.auto == false"
                rounded
                @click="setsound('auto')"
                ><v-icon left>mdi-volume-mute</v-icon> ปิด</v-btn
              >
            </div>
            <div class="my-2">
              ฝากเงิน :
              <v-btn
                color="primary"
                v-if="soundsetting.dp == true"
                small
                rounded
                @click="setsound('dp')"
                ><v-icon left>mdi-volume-high</v-icon> เปิด</v-btn
              ><v-btn
                color="grey"
                v-if="soundsetting.dp == false"
                small
                rounded
                @click="setsound('dp')"
                ><v-icon left>mdi-volume-mute</v-icon> ปิด</v-btn
              >
            </div>
            <div class="my-2">
              ถอนเงิน :
              <v-btn
                color="primary"
                v-if="soundsetting.wd == true"
                small
                rounded
                @click="setsound('wd')"
                ><v-icon left>mdi-volume-high</v-icon> เปิด</v-btn
              >
              <v-btn
                color="grey"
                v-if="soundsetting.wd == false"
                small
                rounded
                @click="setsound('wd')"
                ><v-icon left>mdi-volume-mute</v-icon> ปิด</v-btn
              >
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogsound = false">
              ปิด
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="showMember" max-width="850px">
        <v-card class="pa-3">
          <v-card-title class="justifiy-center font-weight-bold success--text"
            >Member Online</v-card-title
          >
          <v-data-table :headers="headersMember" hide-default-footer>
          </v-data-table>
          <v-card-actions class="justify-end">
            <v-btn color="error" @click="showMember = false"> ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  middleware: "auth",
  data() {
    return {
      headersMember: [
        {
          text: "เวลาเข้าเล่นล่าสุด",
          value: "time",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "Username",
          value: "username",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "ค่ายเกม",
          value: "provider",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "Game",
          value: "game",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "Ip",
          value: "ip_address",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        },
        {
          text: "อุปกรณ์ที่ใช้เข้าเล่น",
          value: "hardware",
          align: "center",
          sortable: false,
          class: "font-weight-bold "
        }
      ],
      showMember: false,
      memberOnline: 26,
      soundsetting: {
        auto: true,
        dp: true,
        wd: true
      },
      dialogsound: false,
      fab: false,
      dialogOutside: false,
      dialogInside: false,
      clipped: false,
      drawer: true,
      fixed: false,

      items: [
        {
          title: "Dashboard",
          to: "/",
          icon: "mdi-view-dashboard",
          status: true
        },
        {
          title: "รายงานระบบ",
          icon: "mdi-chart-bar",
          status: true,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "สถิติผู้ใช้งาน",
              to: "/reportSystem/statistics",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "สถิติฝาก-ถอน",
              to: "/reportSystem/transaction",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานลูกค้าใหม่",
              to: "/reportSystem/newaccount",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานลูกค้าประจำ",
              to: "/reportSystem/regularReport",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานรับโบนัส",
              to: "/reportSystem/bonusReport",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานรับโบนัสชวนเพื่อน",
              to: "/reportSystem/affiliate",
              status: true
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานลูกค้าเลิกเล่น",
              to: "quitMember",
              status: true
            }
          ]
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
              status: true
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
          title: "จัดการค่ายเกม",
          to: "/groupsetting",
          icon: "mdi-history",
          status: true
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
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "RICO "
    };
  },
  async created() {
    try {
      await this.getUser();
      await this.getFeature();
      let menuitem = await this.$store.state.auth.group.filter(x => {
        return x.status == true;
      });

      let item = await new Promise((resolve, reject) => {
        menuitem.map(x => {
          if (x.subLinks) {
            x.subLinks = x.subLinks.filter(y => {
              return y.status == true;
            });
          }
          return x;
        });
        resolve(menuitem);
      });
      this.items = item;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions("auth", ["getUser", "getFeature"]),
    logdownweb() {
      console.log("lockdown");
      // window.location = "http://www.google.com";
      window.location = "https://www.youtube.com/watch?v=RE_pN8ZUoNE";
    },
    async setsound(type) {
      if (type === "auto") {
        this.soundsetting.auto = !this.soundsetting.auto;
      } else if (type === "dp") {
        this.soundsetting.dp = !this.soundsetting.dp;
      } else if (type === "wd") {
        this.soundsetting.wd = !this.soundsetting.wd;
      }
    },
    async logout() {
      try {
        let token = localStorage.getItem("key");
        if (token) {
          localStorage.clear();
          this.$router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style lang="scss"></style>
