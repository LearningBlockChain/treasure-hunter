import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout.vue'
import Game from '@/components/Game/Game.vue'
import Rankings from '@/components/Rank/Rankings.vue'
import Rules from '@/components/Rule/Rules.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: 'game',
      children:[
        {
          path: 'game',
          name: 'Game',
          component: Game
        },
        {
            path: 'rankings',
            name: 'Rankings',
            component: Rankings
        },
        {
            path: 'rules',
            name: 'Rules',
            component: Rules
        },
      ]
  }]
})
