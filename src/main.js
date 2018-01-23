import Vue from 'vue'
import App from './App.vue'
import vajax from '../src/lib/index.js'
Vue.use(vajax)
new Vue({
  el: '#app',
  render: h => h(App)
})
