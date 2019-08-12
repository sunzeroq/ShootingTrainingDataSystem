import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
//v-chart
import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
    baseURL:'http://localhost:3001/api'
  })
//增加token到请求头里
Vue.prototype.$http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(sessionStorage.token){
    config.headers.Authorization = 'Bearer ' + (sessionStorage.token || '')
  }

  return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  //错误响应拦截器
Vue.prototype.$http.interceptors.response.use(res => {
  return res
},err =>{
  if(err.response.data.message){
    Vue.prototype.$message({
      type: 'error',
      message:err.response.data.message
    })
  }
  if(err.response.status === 401){
    router.push('/login')
  }
  return Promise.reject(err)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

