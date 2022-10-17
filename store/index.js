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

Vue.use(VueSweetalert2);

Vue.prototype.$moment = moment;

Vue.use(ElementUI, { locale });

Vue.use(GradientColorPicker);
export default function() {
  const Store = new Vuex.Store({
    state: {
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
      account
    }
  });
  return Store;
}

Vue.use(Vuex);
