import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const constantRoutes = [
  /* {
     path: '/',
     name: 'login',
     component: () => import('@/views/login/index'),
     hidden: true
   },**/
  {
    path: '/',
    component: () => import('@/views/Main'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home/Home'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/UserManage/UserManage'),
      },
      {
        path: '/mall',
        name: 'mall',
        component: () => import('@/views/MallManage/MallManage'),
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/Other/PageOne'),
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/Other/PageTwo'),
      },
    ]
  }

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



