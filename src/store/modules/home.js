  const state = {
      num: 2,
      user: false,
      login: false,
      indexpath: null,
      mapstatus: true,
      form: {},
      table: false,
      formarr: []



  }
  const getters = {
      num(state) {
          return state.num
      },
      user(state) {
          return state.user
      },
      login(state) {
          return state.login
      },
      indexpath(state) {
          return state.indexpath
      },
      mapstatus(state) {
          return state.mapstatus
      },
      form(state) {
          return state.form
      },
      table(state) {
          return state.table
      },
      formarr(state) {
          return state.formarr
      }


  }
  const mutations = {
      changenum(state, num) {
          state.num = num
      },
      changeuser(state, user) {
          state.user = user
      },
      changelogin(state, login) {
          state.login = login
      },
      changeindexpath(state, indexpath) {
          state.indexpath = indexpath
      },
      changemapstatus(state, mapstatus) {
          state.mapstatus = mapstatus
      },
      changeform(state, form) {
          state.form = form
      },
      changetable(state, table) {
          state.table = table
      },
      changeformarr(state, formarr) {
          state.formarr = formarr
      }
  }
  const actions = {
      changenum({
          commit
      }, bool) {
          commit('changenum', bool)
      },
      changeuser({
          commit
      }, bool) {
          commit('changeuser', bool)
      },
      changelogin({
          commit
      }, bool) {
          commit('changelogin', bool)
      },
      changeindexpath({
          commit
      }, bool) {
          commit('changeindexpath', bool)
      },
      changemapstatus({
          commit
      }, bool) {
          commit('changemapstatus', bool)
      },
      changeform({
          commit
      }, obj) {
          commit('changeform', obj)
      },
      changetable({
          commit
      }, bool) {
          commit('changetable', bool)
      },
      changeformarr({
          commit
      }, arr) {
          commit('changeformarr', arr)
      }
  }
  export default {
      state,
      getters,
      mutations,
      actions,
      namespaced: true
  }