require("./bootstrap");
require("dayjs/locale/th");
import VueRouter from "vue-router";
import router from "./routes";
import Index from "./Index";
import AgentLogin from "./AgentLogin";
import MainComponent1 from "./Dashboard/MainComponent1";
import MemberTable from "./components/MemberTable";
import ReportTable from "./components/ReportTable";
import Vue from "vue";
import ErrorComponent from "./shared/ErrorComponent";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import ToggleButton from "vue-js-toggle-button";
import Vuex from "vuex";
import storeDefinetion from "./store";
import VueFilterNumericFormat from "@vuejs-community/vue-filter-numeric-format";
import vuetify from './vuetify'
import VueQRCodeComponent from 'vue-qrcode-component'
import VueSweetalert2 from "vue-sweetalert2";

/* import axios from 'axios'; */

var dayjs = require("dayjs");
var duration = require("dayjs/plugin/duration");
var relativeTime = require("dayjs/plugin/relativeTime");
var localizedFormat = require("dayjs/plugin/localizedFormat");
var localeData = require("dayjs/plugin/localeData");
var utc = require("dayjs/plugin/utc"); // dependent on utc plugin
var timezone = require("dayjs/plugin/timezone");
dayjs.locale("th");
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);
window.Vue = require("vue");
window.dayjs = dayjs;

Vue.use(VueFilterNumericFormat, {
    decimalSeparator: ".",
    fractionDigitsMax: 2,
    fractionDigitsMin: 0,

    thousandsDigitsSeparator: ","
});

/* Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('example-2', require('./components/Example2.vue').default);
 */
/* axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.get['Accept'] = 'application/json' ;  // default header for all get request
axios.defaults.headers.post['Accept'] = 'application/json' ; // default header for all POST request
 */
// Install BootstrapVue
Vue.use(BootstrapVue);
Vue.use(Vuex);
// Optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons);
Vue.component("error-component", ErrorComponent);
Vue.use(ToggleButton);
Vue.use(VueSweetalert2);
Vue.component('qr-code', VueQRCodeComponent)
Vue.use(VueRouter);

Vue.mixin({
    data: function() {
        return {
            NoautoAlertToggle1() {
                if (this.$store.state.NoautoAlertToggle) {
                    this.$store.commit("NoautoAlertTogglestate", false);
                } else {
                    this.$store.commit("NoautoAlertTogglestate", true);
                }
            },
            dpAlertToggle1() {
                if (this.$store.state.dpAlertToggle) {
                    this.$store.commit("dpAlertTogglestate", false);
                } else {
                    this.$store.commit("dpAlertTogglestate", true);
                }
            },
            wdAlertToggle1() {
                if (this.$store.state.wdAlertToggle) {
                    this.$store.commit("wdAlertTogglestate", false);
                } else {
                    this.$store.commit("wdAlertTogglestate", true);
                }
            },
            playSoundNoauto() {
                //127.0.0.1:8000/
                console.log(this.dpAlertToggle);
                var sounddpdata = {
                    soundurl: "/medias/DoorBellmp3.mp3"
                };

                var audio = new Audio(sounddpdata.soundurl);
                if (this.$store.state.NoautoAlertToggle == true) {
                    audio.play();
                }
            },

            playSoundDP() {
                //127.0.0.1:8000/

                var sounddpdata = {
                    soundurl: "/medias/cash.mp3"
                };

                var audio = new Audio(sounddpdata.soundurl);
                if (this.$store.state.dpAlertToggle == true) {
                    audio.play();
                }
            },
            playSoundWD() {
                var soundwddata = {
                    soundurl: "/medias/whistle.mp3"
                };
                var audio = new Audio(soundwddata.soundurl);
                if (this.$store.state.wdAlertToggle == true) {
                    audio.play();
                }
            },
            showSuccessAlert(message) {
                // Use sweetalret2

                this.$swal.fire("สำเร็จ", message, "success", "OK");
            },
            showErrorAlert(message) {
                // Use sweetalret2
                this.$swal.fire("ERROR!", message, "error", "OK");
            },
            showInfoAlert(message) {
                // Use sweetalret2
                this.$swal.fire("ระวัง!", message, "warning", "OK");
            },
            showInfoAlert2(message) {
                // Use sweetalret2
                this.$swal.fire("โปรดทราบ", message, "info", "OK","CANCLE");
            }
        };
    }
});

const store = new Vuex.Store(storeDefinetion);

/* /* store.commit('increment'); */
// window.axios.interceptors.response.use(
//     response => {

//         return response;
//     },
//    async error => {
//         if (401 == error.response.status && !store.state.refresh) {
       
//             store.commit('setRefresh',true)
//             try {
//                 const ress = await axios.post('api/tfa/refresh',{withCredentials:true})
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${ress.data.token}`
//                 store.commit('setRefresh',false)
//                   return axios(error.config)
//             } catch (error) {
//                 await axios.post("/logout");
//                 store.dispatch("logout");
                
//             return error
//             }
          
           
           
//             // window.location('/login')
           
          
          
//         }
//         return Promise.reject(error);
//     }
// );

const app = new Vue({
    vuetify,
  
    el: "#app",
    router,
    store,

    components: {
        index: Index,
        AgentLogin: AgentLogin,
        MainComponent1: MainComponent1,
        MemberTable: MemberTable,
        ReportTable: ReportTable
    },
    async beforeMount() {
        try {
            const lockdown = (await axios.get("/api/Lockdown")).data;
            if (lockdown.lockdown_status) {
                window.location.href = "https://www.google.com/";
            }
            this.$store.commit('setCompany',lockdown.company) 
            sessionStorage.setItem('company',lockdown.company)
        } catch (error) {}
    },
    async beforeCreate() {
        let userStorage = localStorage.getItem("user");
const isLoggedIn =  localStorage.getItem("isLoggedIn");
        let user = JSON.parse(userStorage);
if(isLoggedIn == "true")
        await this.$store.dispatch("loadUser");
    }
});
