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
Vue.use(VueSweetalert2);

Vue.prototype.$moment = moment;

Vue.use(ElementUI, { locale });
export default function() {
  const Store = new Vuex.Store({
    modules: {
      auth,
      member,
      transaction
    }
  });
  return Store;
}

Vue.use(Vuex);
