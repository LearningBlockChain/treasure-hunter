import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout.vue'
import GamePlaying from '@/components/Game/GamePlaying.vue'
import GameInvesting from '@/components/Game/GameInvesting.vue'
import Rankings from '@/components/Rank/Rankings.vue'
import Rules from '@/components/Rule/Rules.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Layout',
    component: Layout,
      children:[
        {
          path: 'game-playing',
          name: 'GamePlaying',
          component: GamePlaying
        },
        {
            path: 'game-investing',
            name: 'GameInvesting',
            component: GameInvesting
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
