import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/Home').default
    },
    {
      path: '/list',
      name: 'list',
      component: require('@/views/List').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
