import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Dialog } from 'vant';
axios.defaults.headers.get["Content-type"] = "application/json"

Vue.use(VueAxios, axios)
Vue.use(Vant);
Vue.use(Dialog);
// Vue.use(Area);
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials=true;
Vue.config.productionTip = false
router.beforeEach((to,from,next)=>{
  if(to.meta.needLogin){
    if(window.sessionStorage.data){
      next()
   }else{
     console.log('请先登录')
     next('/login')
   }
  }else{
   next() 
  }
  
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
