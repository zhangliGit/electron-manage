import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/Home').default
    },
    {
      path: '/protal',
      name: 'protal',
      component: require('@/views/Protal').default
    },
    {
      path: '/system',
      name: 'system',
      component: require('@/views/System').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
