import Vue from 'vue'
import App from './App.vue'
import VueTour from "vue-tour";
import router from './router'
import store from './store'

// eslint-disable-next-line
require("vue-tour/dist/vue-tour.css");

Vue.config.productionTip = false;
Vue.use(VueTour);

new Vue({
  router,
  store,
  VueTour,
  render: h => h(App)
}).$mount('#app')


