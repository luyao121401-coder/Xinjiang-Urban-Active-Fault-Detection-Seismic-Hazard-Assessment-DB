const state = {
    pos: 1,
    ver: null,
    account: false,
    layerStatus: false,
    layList: [],
    Layer: null,
    ind: 0,
    legend: null,
    tab: 1


}
const getters = {
    pos(state) {
        return state.pos
    },
    ver(state) {
        return state.ver
    },
    account(state) {
        return state.account
    },
    layerStatus(state) {
        return state.layerStatus
    },
    layList(state) {
        return state.layList
    },
    Layer(state) {
        return state.Layer
    },
    ind(state) {
        return state.ind
    },
    legend(state) {
        return state.legend
    },
    tab(state) {
        return state.tab
    }
}
const mutations = {
    changepos(state, pos) {
        state.pos = pos
    },
    changever(state, ver) {
        state.ver = ver
    },
    changeaccount(state, account) {
        state.account = account
    },
    changelayerStatus(state, layerStatus) {
        state.layerStatus = layerStatus
    },
    changelayList(state, layList) {
        state.layList = layList
    },
    changeLayer(state, Layer) {
        state.Layer = Layer
    },
    changeind(state, ind) {
        state.ind = ind
    },
    changelegend(state, legend) {
        state.legend = legend
    },
    changetab(state, tab){
        state.tab = tab
    }
}
const actions = {
    changepos({
        commit
    }, num) {
        commit('changepos', num)
    },
    changever({
        commit
    }, num) {
        commit('changever', num)
    },
    changeaccount({
        commit
    }, num) {
        commit('changeaccount', num)
    },
    changelayerStatus({
        commit
    }, num) {
        commit('changelayerStatus', num)
    },
    changelayList({
        commit
    }, num) {
        commit('changelayList', num)
    },
    changeLayer({
        commit
    }, num) {
        commit('changeLayer', num)
    },
    changeind({
        commit
    }, num) {
        commit('changeind', num)
    },
    changelegend({
        commit
    }, num) {
        commit('changelegend', num)
    },
    changetab({
        commit
    }, num){
        commit('changetab', num)
    }

}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}