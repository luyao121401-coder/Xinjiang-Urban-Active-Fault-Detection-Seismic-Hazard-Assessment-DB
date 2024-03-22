const state = {
    pickershow: false,
    customshow: false,
    localshow: false,
    customlayer: [],
    locallayer: []




}
const getters = {
    pickershow(state) {
        return state.pickershow
    },
    customshow(state) {
        return state.customshow
    },
    localshow(state) {
        return state.localshow
    },
    customlayer(state) {
        return state.customlayer
    },
    locallayer(state) {
        return state.locallayer
    },



}
const mutations = {
    changepickershow(state, pickershow) {
        state.pickershow = pickershow
    },
    changecustomshow(state, customshow) {
        state.customshow = customshow
    },
    changelocalshow(state, localshow) {
        state.localshow = localshow
    },
    changecustomlayer(state, customlayer) {
        state.customlayer = customlayer
    },
    changelocallayer(state, locallayer) {
        state.locallayer = locallayer
    },

}
const actions = {
    changepickershow({
        commit
    }, bool) {
        commit('changepickershow', bool)
    },
    changecustomshow({
        commit
    }, bool) {
        commit('changecustomshow', bool)
    },
    changelocalshow({
        commit
    }, bool) {
        commit('changelocalshow', bool)
    },
    changecustomlayer({
        commit
    }, bool) {
        commit('changecustomlayer', bool)
    },
    changelocallayer({
        commit
    }, bool) {
        commit('changelocallayer', bool)
    },

}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}