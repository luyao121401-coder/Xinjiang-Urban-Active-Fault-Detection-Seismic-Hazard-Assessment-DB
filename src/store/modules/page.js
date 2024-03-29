const state = {
    page0: 1,      // map
    page1: 1,
    page2: null,
    page3: null,
    // 危险性评价
    page4: 1,
    page5: null,
    page6: null,
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
    },
    page5(state){
        return state.page5
    },
    page6(state){
        return state.page6
    },
    page4(state){
        return state.page4
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
    },
    changepage4(state, page4){
        state.page4 = page4
    },
    changepage5(state, page5){
        state.page5 = page5
    },
    changepage6(state, page6){
        state.page6 = page6
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
    },
    changepage4({
        commit
    }, num){
        commit('changepage4', num)
    },
    changepage5({
        commit
    }, num){
        commit('changepage5', num)
    },
    changepage6({
        commit
    }, num){
        commit('changepage6', num)
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}