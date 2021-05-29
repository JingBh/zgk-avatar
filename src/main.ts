import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'cropperjs/dist/cropper.css'

import './store'
import App from './App.vue'

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App)
}).$mount('#app')
