const state = {
    page0: 1,
    page1: 1,
    page2: null,
    page3: null,
}
const getters  = {
    page0(state){
        return state.page0
    },
    page1(state){
        return state.page1
    },
    page2(state){
        return state.page2
    },
    page3(state){
        return state.page3
    }
}
const mutations = {
    changepage0(state, page0){
        state.page0= page0
    },
    changepage1(state, page1){
        state.page1 = page1
    },
    changepage2(state, page2){
        state.page2 = page2
    },
    changepage3(state, page3){
        state.page3 = page3
    }
}
const actions = {
    changepage0({
        commit
    }, num){
        commit('changepage0', num)
    },
    changepage1({
        commit
    }, num){
        commit('changepage1', num)
    },
    changepage2({
        commit
    }, num){
        commit('changepage2', num)
    },
    changepage3({
        commit
    }, num){
        commit('changepage3', num)
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}