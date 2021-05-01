import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const constantRoutes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
 
]
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

// export function resetRouter() {
//     const newRouter = createRouter()
//     router.matcher = newRouter.matcher // reset router
//   }
export default router



