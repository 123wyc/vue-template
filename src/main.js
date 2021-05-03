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
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
