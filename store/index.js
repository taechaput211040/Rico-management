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
import VueQRCodeComponent from "vue-qrcode-component";

Vue.use(VueSweetalert2);

Vue.prototype.$moment = moment;

Vue.use(ElementUI, { locale });
Vue.component("qr-code", VueQRCodeComponent);
Vue.use(GradientColorPicker);
export default function () {
  const Store = new Vuex.Store({
    state: {
      bank_options_transfer: [
        { value: null, text: "เลือกธนาคาร" },

        { value: "SCB", text: "SCB - ธนาคารไทยพานิชย์" },
        { value: "KBANK", text: "KBANK - ธนาคารกสิกรไทย" },
        { value: "TMB", text: "TTB - ทีเอ็มบีธนชาต" },

        // { value: "TMB", text: "TMB - ธนาคารทหารไทย" },
        { value: "BBL", text: "BBL - ธนาคารกรุงเทพ" },
        { value: "KTB", text: "KTB - ธนาคารกรุงไทย" },
        { value: "BAY", text: "BAY - ธนาคารกรุงศรีอยุธยา" },
        { value: "KKP", text: "KKP - ธนาคารเกียรตินาคินภัทร" },
        { value: "CIMB", text: "CIMB - ธนาคารซีไอเอ็มบีไทย" },
        { value: "TISCO", text: "TISCO - ธนาคารทิสโก้" },
        // { value: "TBANK", text: "TBANK - ธนาคารธนชาต" },
        { value: "UOBT", text: "UOBT - ธนาคารยูโอบี" },
        { value: "TCD", text: "TCD - ธนาคารไทยเครดิตเพื่อรายย่อย" },
        { value: "LHFG", text: "LHFG - ธนาคารแลนด์แอนด์ เฮ้าส์" },
        {
          value: "BAAC",
          text: "BAAC - ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
        },
        { value: "GSB", text: "GSB - ธนาคารออมสิน" },
        { value: "GHB", text: "GHB - ธนาคารอาคารสงเคราะห์" },
        { value: "ISBT", text: "ISBT - ธนาคารอิสลามแห่งประเทศไทย" },

        { value: "CITI", text: "CITI - ธนาคาร CITIBANK" },
        { value: "DB", text: "DB - ธนาคาร ดอยซ์แบงก์" },
        { value: "HSBC", text: "HSBC - ธนาคาร เอชเอสบีซี" },
        { value: "ICBC", text: "ICBC - ธนาคาร ไอซีบีซี" },
      ],
      menu: [
        {
          title: "Dashboard",
          menu: "dashboard",
          permission: "dashboard_read",
          to: "/",
          icon: "mdi-view-dashboard",
          status: true,
        },
        {
          title: "รายงานระบบ",
          menu: "reportSystem",
          permission: "reportSystem_read",
          icon: "mdi-chart-bar",
          status: false,
          subLinks: [
            {
              icon: "mdi-view-dashboard",
              text: "สถิติผู้ใช้งาน",
              to: "/reportSystem/statistics",
              status: true,
            },
            {
              icon: "mdi-view-dashboard",
              text: "สถิติฝาก-ถอน",
              to: "/reportSystem/transaction",
              status: true,
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานลูกค้าใหม่",
              to: "/reportSystem/newaccount",
              status: true,
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานลูกค้าประจำ",
              to: "/reportSystem/regularReport",
              status: true,
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานรับโบนัส",
              to: "/reportSystem/bonusReport",
              status: true,
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานรับโบนัสชวนเพื่อน",
              to: "/reportSystem/affiliate",
              status: true,
            },
            {
              icon: "mdi-view-dashboard",
              text: "รายงานลูกค้าเลิกเล่น",
              to: "/reportSystem/quitMember",
              status: true,
            },
          ],
        },
        {
          title: "จัดการสมาชิก",
          menu: "manageMember",
          permission: "manageMember_read",
          icon: "mdi-account",
          status: true,
          subLinks: [
            {
              icon: "mdi-account-plus-outline",
              text: "สมัครสมาชิก",
              to: "/member/register",
              status: true,
            },
            {
              icon: "mdi-chart-box-outline",
              text: "รายงานสมาชิก",
              to: "/member/reportMember",
              status: true,
            },
            {
              icon: "mdi-timetable",
              text: "เช็คข้อมูลปัจจุบัน/จำนวนเทิร์น",
              to: "/member/memberCheck",
              status: true,
            },
            {
              icon: "mdi-ticket",
              text: "เช็คข้อมูลการเล่น",
              to: "/member/memberReportTransaction",
              status: true,
            },
            {
              icon: "mdi-hand-coin",
              text: "ถอนเครดิตสมาชิก(Manual)",
              to: "/member/withdrawManual",
              status: true,
            },
            {
              icon: "mdi-credit-card-edit",
              text: "แก้ไขเครดิต/รายการผิดพลาด",
              to: "/member/ManualEditCredit",
              status: true,
            },
          ],
        },
        {
          title: "รายงานฝาก/ถอน",
          menu: "reportTransaction",
          permission: "reportTransaction_read",
          icon: "mdi-credit-card-check",
          status: true,
          subLinks: [
            {
              icon: "mdi-account-cash",
              text: "รายการฝากสมาชิก",
              to: "/reportTransaction/deposite",
              status: true,
            },
            {
              icon: "mdi-cash-minus",
              text: "รายการถอนสมาชิก",
              to: "/reportTransaction/withdraw",
              status: true,
            },
            {
              icon: "mdi-timer",
              text: "รายการถอนสมาชิกล่าสุด",
              to: "/reportTransaction/lastWithdrawal",
              status: true,
            },
            {
              icon: "mdi-cash",
              text: "รายการฝากแรก",
              to: "/reportTransaction/firstDeposit",
              status: true,
            },
            {
              icon: "mdi-eye-off-outline",
              text: "รายการที่ถูกซ่อน",
              to: "/reportTransaction/hiddenReport",
              status: true,
            },
          ],
        },
        {
          title: "รายงานสรุป",
          menu: "reportSummary",
          permission: "reportSummary_read",
          icon: "mdi-chart-line",
          status: true,
          subLinks: [
            {
              icon: "mdi-finance",
              text: "กำไร/ขาดทุน",
              to: "/profitReport/Report",
              status: true,
            },
            {
              icon: "mdi-badge-account",
              text: "กำไร/ขาดทุน รายบุคคล",
              to: "/profitReport/ProfitByUserReport",
              status: true,
            },
            {
              icon: "mdi-gift",
              text: "สรุปโปรโมชัน",
              to: "/profitReport/PromotionReport",
              status: true,
            },
          ],
        },
        {
          title: "จัดการค่ายเกม",
          menu: "manageGroup",
          permission: "manageGroup_read",
          to: "/groupsetting",
          icon: "mdi-tablet-dashboard",
          status: true,
        },
        {
          title: "จัดการเกม",
          menu: "manageGame",
          permission: "manageGame_read",
          to: "/gamesetting",
          icon: "mdi-controller-classic",
          status: true,
        },
        {
          title: "Landing Page",
          menu: "landingpage",
          permission: "landingpage_read",
          to: "/landingpage",
          icon: "mdi-monitor-shimmer",
          status: true,
        },
        {
          title: "Member Page",
          menu: "memberpage",
          permission: "memberpage_read",
          to: "/memberpage",
          icon: "mdi-monitor-dashboard",
          status: true,
        },

        {
          title: "ตั้งค่าโปรโมชั่น",
          menu: "promotion",
          permission: "promotion_read",
          icon: "mdi-gift-open",
          status: true,
          subLinks: [
            {
              icon: "mdi-gift",
              text: "โปรโมชันทั่วไป",
              to: "/promotion/generalPromotion",
              status: true,
            },
            {
              icon: "mdi-cash-refund",
              text: "Cashback",
              to: "/promotion/cashback",
              status: true,
            },
          ],
        },
        {
          title: "ตั้งค่าลิงก์รับทรัพย์",
          menu: "affiliate",
          permission: "affiliate_read",
          icon: "mdi-treasure-chest",
          status: true,
          subLinks: [
            {
              icon: "mdi-chart-line",
              text: "รายงานลิงก์รับทรัพย์",
              to: "/Affiliate/report",
              status: true,
            },
            {
              icon: "mdi-account-search",
              text: "ข้อมูลสมาชิกลิงก์รับทรัพย์",
              to: "/Affiliate/infomember",
              status: true,
            },
            {
              icon: "mdi-cog",
              text: "ตั้งค่า",
              to: "/Affiliate/setting",
              status: true,
            },
          ],
        },
        {
          title: "ตั้งค่า Feature",
          menu: "settingFeature",
          permission: "settingFeature_read",
          icon: "mdi-apps",
          status: true,
          subLinks: [
            {
              icon: "mdi-credit-card",
              text: "เครดิตฟรี",
              to: "/feature/creditfree",
              status: true,
            },
            {
              icon: "mdi-ship-wheel",
              text: "กงล้อนำโชค",
              to: "/feature/wheel",
              status: true,
            },
            {
              icon: "mdi-poker-chip",
              text: "เปิดไพ่6ใบ",
              to: "/feature/sixcard",
              status: true,
            },
            {
              icon: "mdi-treasure-chest",
              text: "เปิดหีบสมบัติ",
              to: "/feature/chest",
              status: true,
            },
            {
              icon: "mdi-calendar-account",
              text: "เช็คอินรายวัน",
              to: "/feature/checkindaily",
              status: true,
            },
            {
              icon: "mdi-star",
              text: "สะสมเเต้ม",
              to: "/feature/point",
              status: true,
            },
            {
              icon: "mdi-seal",
              text: "ของพรีเมียม",
              to: "/feature/premiumn",
              status: true,
            },
          ],
        },
        {
          title: "ตั้งค่าระบบ",
          menu: "settingSystem",
          to: "/system",
          permission: "settingSystem_read",
          icon: "mdi-cog-outline",
          status: true,
        },
        {
          title: "LINE NOTIFY",
          menu: "lineNotify",
          to: "/lineNotify",
          permission: "lineNotify_read",
          icon: "mdi-bell-badge",
          status: true,
        },
        {
          title: "รายชื่อมิจฉาชีพ",
          menu: "criminal",
          to: "/CriminalList",
          permission: "criminal_read",
          icon: "mdi-alert-circle",
          status: true,
        },
        {
          title: "พนักงาน",
          menu: "employee",
          permission: "employee_read",
          to: "/employee",
          icon: "mdi-account-tie",
          status: true,
        },
        {
          title: "ธนาคาร",
          menu: "companyBank",
          permission: "companyBank_read",
          to: "/companyBank",
          icon: "mdi-bank",
          status: true,
        },
        {
          title: "โยกเงิน",
          menu: "transfer",
          to: "/transaction",
          permission: "transfer_read",
          icon: "mdi-transfer",
          status: true,
        },
        {
          title: "รายการเดินบัญชี",
          menu: "transferReport",
          permission: "transferReport_read",
          to: "/transactionReport",
          icon: "mdi-chart-box",
          status: true,
        },
        {
          title: "STAFF LOG",
          menu: "staffLog",
          permission: "staffLog_read",
          to: "/staffLog",
          icon: "mdi-account-lock-outline",
          status: true,
        },
      ],
      bank: [
        {
          value: "WAVEPAY",
          code: "WAVEPAY",
          text: "WAVEPAY",
        },
        {
          value: "KBANK",
          code: "KBANK",
          text: "ธนาคารกสิกรไทย",
        },
        {
          value: "TRUEWALLET",
          code: "TRUEWALLET",
          text: "ทรูวอลเล็ต",
        },
        {
          value: "TMB",
          code: "TMB",
          text: "ธนาคารทีเอ็มบีธนชาต TTB",
        },
        {
          value: "BBL",
          code: "BBL",
          text: "ธนาคารกรุงเทพ",
        },
        {
          value: "KTB",
          code: "KTB",
          text: "ธนาคารกรุงไทย",
        },
        {
          value: "BAY",
          code: "BAY",
          text: "ธนาคารกรุงศรีอยุธยา",
        },
        {
          value: "KKP",
          code: "KKP",
          text: "ธนาคารเกียรตินาคินภัทร",
        },
        {
          value: "CIMB",
          code: "CIMB",
          text: "ธนาคารซีไอเอ็มบีไทย",
        },
        {
          value: "TISCO",
          code: "TISCO",
          text: "ธนาคารทิสโก้",
        },
        {
          value: "TBANK",
          code: "TBANK",
          text: "ธนาคารธนชาต",
        },
        {
          value: "UOBT",
          code: "UOBT",
          text: "ธนาคารยูโอบี",
        },
        {
          value: "TCD",
          code: "TCD",
          text: "ธนาคารไทยเครดิตเพื่อรายย่อย",
        },
        {
          value: "LHFG",
          code: "LHFG",
          text: "ธนาคารแลนด์แอนด์ เฮ้าส์",
        },
        {
          value: "BAAC",
          code: "BAAC",
          text: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
        },
        {
          value: "GSB",
          code: "GSB",
          text: "ธนาคารออมสิน",
        },
        {
          value: "GHB",
          code: "GHB",
          text: "ธนาคารอาคารสงเคราะห์",
        },
        {
          value: "ISBT",
          code: "ISBT",
          text: "ธนาคารอิสลามแห่งประเทศไทย",
        },
        {
          value: "SCB",
          code: "SCB",
          text: "ธนาคารไทยพานิชย์",
        },
      ],
      webPalette: {
        logo: "https://image.smart-ai-api.com/public/Rico-main-resite/logo.png",
        palette: {
          card: {
            cardBgColor: {
              label: "สี card",
              type: "color",
              value: "#FFFFFF",
            },
            cardTextColor: {
              label: "สีตัวอักษรใน card",
              type: "color_text",
              value: "#000000FF",
            },
          },
          menu: {
            textColor: {
              label: "สีตัวอักษรเว้ปไซต์",
              type: "color_text",
              value: "#000000FF",
            },
            bgColor: {
              label: "สีพื้นหลัง Background ด้านนอก",
              type: "color",
              value: "#FFFFFF",
            },
            bgColorIner: {
              label: "สีพื้นหลัง Background ด้านใน",
              type: "color",
              value: "#FFFFFF",
            },
            navberColor: {
              label: "สีพื้นหลัง navber ข้างบน",
              type: "color",
              value: "#FFFFFF",
            },
            sidebarColor: {
              label: "สีพื้นหลัง sidebar ด้านข้าง",
              type: "color",
              value: "#FFFFFF",
            },
            textColor_withIcon: {
              label: "สีตัวอักษรเมนูและไอคอน",
              type: "color_text",
              value: "#000000FF",
            },
            activeMenuColor: {
              label: "สีตอนกดปุ่ม menu",
              type: "color",
              value: "#9155FD",
            },
          },
          table: {
            colorTable: {
              label: "สีหัวตาราง",
              type: "linear",
              value: "linear-gradient(#722bbb 0%, #9c64d7 100%)",
            },
            colorTextTable: {
              label: "สีตัวอักษรหัวตาราง",
              type: "color_text",
              value: "#000000FF",
            },
          },
        },
      },
    },
    modules: {
      auth,
      member,
      promotion,
      transaction,
      profit,
      setting,
      account,
      report,
    },
  });
  return Store;
}

Vue.use(Vuex);
