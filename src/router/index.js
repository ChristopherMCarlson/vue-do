import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Branding from '../views/Branding.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/branding',
    name: 'Branding',
    component: Branding,
    meta: { requiresAuth: true}
  }
]

const router = new VueRouter({
  routes
})

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then(data => {
      if (data && data.signInUserSession) {
        user = data;
      }
      next()
    }).catch((e) => {
      next({
        path: '/auth',
        query: {
          redirect: to.fullPath,
        }
      });
    });
  }
  next()
})

export default router
