import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'v-autocomplete/dist/v-autocomplete.css'
import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant/dist/vue-instant.common'
Vue.use(VueInstant)
import Autocomplete from 'v-autocomplete'
Vue.use(Autocomplete)
Vue.config.productionTip = false
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
Vue.use(SuiVue);
Vue.use(require('vue-moment'));
import Toasted from 'vue-toasted';
Vue.use(Toasted)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
