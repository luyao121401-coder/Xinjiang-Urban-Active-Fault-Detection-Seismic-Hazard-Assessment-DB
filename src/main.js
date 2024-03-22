import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store/index.js'
import Vuex from 'vuex'
import OmMap from '@/components/omap'


Vue.use(OmMap)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.config.silent = true; // 关闭 Vue Router 的警告信息
Vue.use(Vuex);


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
