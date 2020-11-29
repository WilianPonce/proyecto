import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
