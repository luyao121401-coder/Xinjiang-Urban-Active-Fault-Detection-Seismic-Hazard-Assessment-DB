import Vue from 'vue'
import Vuex from 'vuex'

import home from "./modules/home"
import map from "./modules/map"
import custom from "./modules/custom"
import manage from "./modules/manage"
import user from "./modules/user"
import picker from "./modules/picker"
import page from "./modules/page"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    home,
    map,
    custom,
    manage,
    user,
    picker,
    page
  }
})

