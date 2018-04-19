import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
