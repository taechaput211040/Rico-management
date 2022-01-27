<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="font-weight-bold" v-text="title" />
      <v-spacer />
      <v-speed-dial
        absolute
        right
        direction="bottom"
        transition="slide-y-transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon> mdi-account-circle </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="orange">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      app
      fixed
      width="300"
      ><v-toolbar-title class="font-weight-bold pa-4 text-center" align-center>
        <v-img
          max-height="150"
          max-width="150"
          contain
          class="ma-auto"
          src="https://image.smart-ai-api.com/public/Rico-main-resite/Logo_Ricoautocash-01.png"
        ></v-img>
      </v-toolbar-title>
      <v-list dense class="red_list">
        <div v-for="(link, i) in items" :key="i">
          <v-list-item
            active-class="white--text active_list deep-purple"
            v-if="!link.subLinks"
            :to="link.to"
            class="v-list-item font-weight-bold "
          >
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="" v-text="link.title" />
          </v-list-item>

          <v-list-group
            active-class=" deep-purple--text"
            v-else
            :key="link.title"
            :prepend-icon="link.icon"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-title class=" h1">{{
                link.title
              }}</v-list-item-title>
            </template>

            <v-list-item
              active-class="white--text active_list deep-purple active_list "
              style="padding-left:40px !important "
              v-for="sublink in link.subLinks"
              :to="sublink.to"
              :key="sublink.text"
            >
              <v-list-item-icon>
                <v-icon>{{ sublink.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="sublink.text" />
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <v-container>
        <v-slide-x-transition>
          <Nuxt />
        </v-slide-x-transition>
      </v-container>
    </v-main>

    <v-footer> </v-footer>
  </v-app>
</template>

<script>
export default {
  // middleware: "auth",
  data() {
    return {
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
          icon: "mdi-view-dashboard"
        },
        {
          title: "จัดการสมาชิก",
          icon: "mdi-account",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "สมัครสมาชิก",
              to: "/member/register"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานสมาชิก",
              to: "/member/reportMember"
            },
            {
              icon: "mdi-view-dashboard",
              text: "เช็คข้อมูลปัจจุบัน/จำนวนเทิร์น",
              to: "/member/memberCheck"
            },
            {
              icon: "mdi-view-dashboard",
              text: "เช็คข้อมูลการเล่น",
              to: "/member/memberReportTransaction"
            },
            {
              icon: "mdi-view-dashboard",
              text: "ถอนเครดิตสมาชิก(Manual)",
              to: "/member/withdrawManual"
            },
            {
              icon: "mdi-view-dashboard",
              text: "แก้ไขเครดิต/รายการผิดพลาด",
              to: "/member/ManualEditCredit"
            }
          ]
        },
        {
          title: "รายงานฝาก/ถอน",
          icon: "mdi-credit-card-check",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "รายการฝากสมาชิก",
              to: "/reportTransaction/deposite"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการถอนสมาชิก",
              to: "/reportTransaction/withdraw"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการถอนสมาชิกล่าสุด",
              to: "/reportTransaction/lastWithdrawal"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการฝากแรก",
              to: "/reportTransaction/firstDeposit"
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายการที่ถูกซ่อน",
              to: "/reportTransaction/hiddenReport"
            }
          ]
        },
        {
          title: "รายงานสรุป",
          icon: "mdi-credit-card-plus-outline",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "กำไร/ขาดทุน",
              to: "/profitReport/Report"
            },
            {
              icon: "mdi-view-dashboard",
              text: "กำไร/ขาดทุน รายบุคคล",
              to: "/profitReport/ProfitByUserReport"
            },
            {
              icon: "mdi-view-dashboard",
              text: "สรุปโปรโมชัน",
              to: "/profitReport/PromotionReport"
            }
          ]
        },
        {
          title: "ตั้งค่าโปรโมชั่น",
          icon: "mdi-history",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "โปรโมชันทั่วไป",
              to: "/promotion/generalPromotion"
            },
            {
              icon: "mdi-view-dashboard",
              text: "Cashback",
              to: "/promotion/cashback"
            }
          ]
        },
        {
          title: "ตั้งค่า Feature",
          to: "/downline/Senior",
          icon: "mdi-gamepad-variant-outline",
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "เครดิตฟรี",
              to: "/member/register"
            },
            {
              icon: "mdi-view-dashboard",
              text: "กงล้อนำโชค",
              to: "/account/reportmember"
            },
            {
              icon: "mdi-view-dashboard",
              text: "เปิดไพ่6ใบ",
              to: "/account/info"
            },
            {
              icon: "mdi-view-dashboard",
              text: "เปิดหีบสมบัติ",
              to: "/account/info"
            },
            {
              icon: "mdi-view-dashboard",
              text: "เช็คอินรายวัน",
              to: "/account/info"
            },
            {
              icon: "mdi-view-dashboard",
              text: "สะสมเเต้ม",
              to: "/account/info"
            },
            {
              icon: "mdi-view-dashboard",
              text: "ของพรีเมียม",
              to: "/account/info"
            }
          ]
        },
        {
          title: "ตั้งค่าระบบ",
          to: "/downline/Agent",
          icon: "mdi-cog-outline"
        },
        {
          title: "LineNotify",
          to: "/downline/Member",
          icon: "mdi-account-circle-outline"
        },
        {
          title: "รายชื่อมิจฉาชีพ",
          to: "/setting",
          icon: "mdi-gamepad-square"
        },
        {
          title: "พนักงาน",
          to: "/setting",
          icon: "mdi-gamepad-square"
        },
        {
          title: "ธนาคาร",
          to: "/setting",
          icon: "mdi-gamepad-square"
        },
        {
          title: "Version",
          to: "/setting",
          icon: "mdi-gamepad-square"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "RICO "
    };
  },
  async created() {
    // await this.checkauthen();
  },
  methods: {
    // ...mapMutations("auth", ["set_logout"]),
    // async logout() {
    //   try {
    //     let token = localStorage.getItem("key");
    //     if (token) {
    //       localStorage.clear();
    //       this.set_logout();
    //       this.$router.push("/login");
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }
};
</script>
