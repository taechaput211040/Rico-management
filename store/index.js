import Vue from "vue";
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/th";
// we first import the module
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import auth from "./auth";
import member from "./member";
import moment from "moment";
import transaction from "./transaction";
import profit from "./profit";
import promotion from "./promotion";
import setting from "./setting";
import account from "./account";
import GradientColorPicker from "vue-gradient-color-picker";
import report from "./report";

Vue.use(VueSweetalert2);

Vue.prototype.$moment = moment;

Vue.use(ElementUI, { locale });

Vue.use(GradientColorPicker);
export default function() {
  const Store = new Vuex.Store({
    state: {
      menu: [
        {
          title: "Dashboard",
          menu: "dashboard",
          permission: "dashboard_read",
          to: "/",
          icon: "mdi-view-dashboard",
          status: true
        },
        {
          title: "รายงานระบบ",
          menu: "reportSystem",
          permission: "reportSystem_read",
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
              to: "/reportSystem/quitMember",
              status: true
            }
          ]
        },
        {
          title: "จัดการสมาชิก",
          menu: "manageMember",
          permission: "manageMember_read",
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
          menu: "reportTransaction",
          permission: "reportTransaction_read",
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
          menu: "reportSummary",
          permission: "reportSummary_read",
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
          menu: "manageGroup",
          permission: "manageGroup_read",
          to: "/groupsetting",
          icon: "mdi-history",
          status: true
        },
        {
          title: "จัดการเกม",
          menu: "manageGame",
          permission: "manageGame_read",
          to: "/gamesetting",
          icon: "mdi-history",
          status: true
        },
        {
          title: "Landing Page",
          menu: "landingpage",
          permission: "landingpage_read",
          to: "/landingpage",
          icon: "mdi-history",
          status: true
        },
        {
          title: "Member Page",
          menu: "memberpage",
          permission: "memberpage_read",
          to: "/memberpage",
          icon: "mdi-history",
          status: true
        },

        {
          title: "ตั้งค่าโปรโมชั่น",
          menu: "promotion",
          permission: "promotion_read",
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
          menu: "affiliate",
          permission: "affiliate_read",
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
          menu: "settingFeature",
          permission: "settingFeature_read",
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
          menu: "settingSystem",
          to: "/system",
          permission: "settingSystem_read",
          icon: "mdi-cog-outline",
          status: true
        },
        {
          title: "LINE NOTIFY",
          menu: "lineNotify",
          to: "/lineNotify",
          permission: "lineNotify_read",
          icon: "mdi-history",
          status: true
        },
        {
          title: "รายชื่อมิจฉาชีพ",
          menu: "criminal",
          to: "/CriminalList",
          permission: "criminal_read",
          icon: "mdi-gamepad-square",
          status: true
        },
        {
          title: "พนักงาน",
          menu: "employee",
          permission: "employee_read",
          to: "/employee",
          icon: "mdi-gamepad-square",
          status: true
        },
        {
          title: "ธนาคาร",
          menu: "companyBank",
          permission: "companyBank_read",
          to: "/companyBank",
          icon: "mdi-gamepad-square",
          status: true
        },
        {
          title: "โยกเงิน",
          menu: "transfer",
          to: "/transaction",
          permission: "transfer_read",
          icon: "mdi-gamepad-square",
          status: true
        },
        {
          title: "รายการเดินบัญชี",
          menu: "transferReport",
          permission: "transferReport_read",
          to: "/transactionReport",
          icon: "mdi-gamepad-square",
          status: true
        }
      ],
      bank: [
        {
          value: "WAVEPAY",
          code: "WAVEPAY",
          text: "WAVEPAY"
        },
        {
          value: "KBANK",
          code: "KBANK",
          text: "ธนาคารกสิกรไทย"
        },
        {
          value: "TRUEWALLET",
          code: "TRUEWALLET",
          text: "ทรูวอลเล็ต"
        },
        {
          value: "TMB",
          code: "TMB",
          text: "ธนาคารทหารไทย"
        },
        {
          value: "BBL",
          code: "BBL",
          text: "ธนาคารกรุงเทพ"
        },
        {
          value: "KTB",
          code: "KTB",
          text: "ธนาคารกรุงไทย"
        },
        {
          value: "BAY",
          code: "BAY",
          text: "ธนาคารกรุงศรีอยุธยา"
        },
        {
          value: "KKP",
          code: "KKP",
          text: "ธนาคารเกียรตินาคินภัทร"
        },
        {
          value: "CIMB",
          code: "CIMB",
          text: "ธนาคารซีไอเอ็มบีไทย"
        },
        {
          value: "TISCO",
          code: "TISCO",
          text: "ธนาคารทิสโก้"
        },
        {
          value: "TBANK",
          code: "TBANK",
          text: "ธนาคารธนชาต"
        },
        {
          value: "UOBT",
          code: "UOBT",
          text: "ธนาคารยูโอบี"
        },
        {
          value: "TCD",
          code: "TCD",
          text: "ธนาคารไทยเครดิตเพื่อรายย่อย"
        },
        {
          value: "LHFG",
          code: "LHFG",
          text: "ธนาคารแลนด์แอนด์ เฮ้าส์"
        },
        {
          value: "BAAC",
          code: "BAAC",
          text: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร"
        },
        {
          value: "GSB",
          code: "GSB",
          text: "ธนาคารออมสิน"
        },
        {
          value: "GHB",
          code: "GHB",
          text: "ธนาคารอาคารสงเคราะห์"
        },
        {
          value: "ISBT",
          code: "ISBT",
          text: "ธนาคารอิสลามแห่งประเทศไทย"
        },
        {
          value: "SCB",
          code: "SCB",
          text: "ธนาคารไทยพานิชย์"
        }
      ],
      webPalette: {
        logo: "https://image.smart-ai-api.com/public/Rico-main-resite/logo.png",
        palette: {
          menu: {
            navberColor: {
              label: "สีพื้นหลัง navber ข้างบน",
              type: "color",
              value: "#1A1426"
            },
            sidebarColor: {
              label: "สีพื้นหลัง sidebar ด้านข้าง",
              type: "color",
              value: "#1F1D31"
            },
            bgColor: {
              label: "สีพื้นหลัง Background",
              type: "color",
              value: "#28243d"
            },
            textColor: {
              label: "สีตัวอักษร web",
              type: "color",
              value: "#ffffff"
            },
            activeMenuColor: {
              label: "สีตอนกดปุ่ม menu",
              type: "color",
              value: "#9155fd"
            }
          },
          card: {
            cardBgColor: {
              label: "สี card",
              type: "color",
              value: "#1F1D31"
            },
            cardTextColor: {
              label: "สีตัวอักษรใน card",
              type: "color",
              value: "#E9E9E9"
            }
          },

          table: {
            colorTable: {
              label: "สีหัวตาราง",
              type: "color",
              value: "#1E1E1E"
            },
            colorBodyTable: {
              label: "สีในตัวตาราง",
              type: "color",
              value: "#1E1E1E"
            },
            colorTextTable: {
              label: "สีตัวอักษรในตาราง",
              type: "color",
              value: "#FFFFFF"
            },
            bgTable: {
              label: "สีพื้นหลังตาราง",
              type: "color",
              value: "#1f1d31"
            }
          }
        }
      }
    },
    modules: {
      auth,
      member,
      promotion,
      transaction,
      profit,
      setting,
      account,
      report
    }
  });
  return Store;
}

Vue.use(Vuex);
