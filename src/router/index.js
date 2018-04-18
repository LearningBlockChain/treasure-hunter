import Vue from 'vue'
import Router from 'vue-router'
import TreasureDapp from '@/components/treasure-component'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'main',
    component: TreasureDapp
  }]
})
