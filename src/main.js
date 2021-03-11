import Vue from 'vue'
import App from './App.vue'
import router from './router'
import loading from 'vuejs-loading-screen'
 
Vue.use(loading)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
