import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import "vuetify/dist/vuetify.min.css";
import router from './router'
import store from "./store";
import Axios from 'axios';

Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.prototype.$http = axios;
// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
