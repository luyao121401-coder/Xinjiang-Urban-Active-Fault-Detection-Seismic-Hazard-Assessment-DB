const state = {
    picker1: null,
    picker2: null,
    picker3: null,
    picker4: null,
    picker5: null,
    // 地震信息与应急产出
    picker6: null
}
const getters  = {
    picker1(state){
        return state.picker1
    },
    picker2(state){
        return state.picker2
    },
    picker3(state){
        return state.picker3
    },
    picker4(state){
        return state.picker4
    },
    picker5(state){
        return state.picker5
    },
    // 地震信息与应急产出
    picker6(state){
        return state.picker6
    },
}
const mutations = {
    changepicker1(state, picker1){
        state.picker1 = picker1
    },
    changepicker2(state, picker2){
        state.picker2 = picker2
    },
    changepicker3(state, picker3){
        state.picker3 = picker3
    },
    changepicker4(state, picker4){
        state.picker4 = picker4
    },
    changepicker5(state, picker5){
        state.picker5 = picker5
    },
    // 地震信息与应急产出
    changepicker6(state, picker6){
        state.picker6 = picker6
    },
}
const actions = {
    changepicker1({
        commit
    }, num){
        commit('changepicker1', num)
    },
    changepicker2({
        commit
    }, num){
        commit('changepicker2', num)
    },
    changepicker3({
        commit
    }, num){
        commit('changepicker3', num)
    },
    changepicker4({
        commit
    }, num){
        commit('changepicker4', num)
    },
    changepicker5({
        commit
    }, num){
        commit('changepicker5', num)
    },
    // 地震信息与应急产出
    changepicker6({
        commit
    }, num){
        commit('changepicker6', num)
    },

}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}