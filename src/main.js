import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/Element.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
