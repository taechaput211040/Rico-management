import Vue from "vue";
import Vuex from "vuex";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/th";
// we first import the module
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import moment from "moment";
Vue.use(VueSweetalert2);
Vue.use(Vuex);
Vue.prototype.moment = moment;
Vue.use(moment);
Vue.use(ElementUI, { locale });
