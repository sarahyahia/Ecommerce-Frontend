import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import "vuetify/dist/vuetify.min.css";
import router from './router'


Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.prototype.$http = axios;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
