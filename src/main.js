import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/Element.js'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'    //引入 vuex
import '@/assets/scss/reset.scss' //全局样式
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import './mock'   // mockjs
import http from '@/api/config'  //axios
// 第三方包
//import ElementUI from 'element-ui'
//Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = http



router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit('getMenu')
  let token = store.state.user.token
  // 过滤登录页，因为去登陆页不需要token(防止死循环)
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  }else if (token){
      console.info(to)
      next()
  }else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
     //刷新路由
     store.commit('addMenu', router)
   }
}).$mount('#app')
