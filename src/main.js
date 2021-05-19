import Vue from 'vue'
import {
  ButtonPlugin,
  CardPlugin,
  CollapsePlugin,
  FormCheckboxPlugin,
  FormFilePlugin,
  FormGroupPlugin,
  FormInputPlugin,
  ImagePlugin,
  LayoutPlugin,
  LinkPlugin,
  ModalPlugin,
  OverlayPlugin,
  ToastPlugin
} from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'cropperjs/dist/cropper.css'

import App from './App.vue'

Vue.use(ButtonPlugin)
Vue.use(CardPlugin)
Vue.use(CollapsePlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormFilePlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormInputPlugin)
Vue.use(ImagePlugin)
Vue.use(LayoutPlugin)
Vue.use(LinkPlugin)
Vue.use(ModalPlugin)
Vue.use(OverlayPlugin)
Vue.use(ToastPlugin)

new Vue({
  render: h => h(App)
}).$mount('#app')
