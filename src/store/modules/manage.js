const state = {
    pickershow: false,
    userpicker: false,
    spicker: 0,
    customlayer: [],
    locallayer: [],
    useritem: null,
    tableData: [],
    newdata: [],
    permiss: null,
    newusertotal: null,
    delver: null,
    del: 0



}
const getters = {
    pickershow(state) {
        return state.pickershow
    },
    userpicker(state) {
        return state.userpicker
    },
    spicker(state) {
        return state.spicker
    },
    customlayer(state) {
        return state.customlayer
    },
    locallayer(state) {
        return state.locallayer
    },
    useritem(state) {
        return state.useritem
    },
    tableData(state) {
        return state.tableData
    },
    newdata(state) {
        return state.newdata
    },
    permiss(state) {
        return state.permiss
    },
    newusertotal(state) {
        return state.newusertotal
    },

    delver(state) {
        return state.delver
    },
    del(state) {
        return state.del
    },

}
const mutations = {
    changepickershow(state, pickershow) {
        state.pickershow = pickershow
    },
    changeuserpicker(state, userpicker) {
        state.userpicker = userpicker
    },
    changespicker(state, spicker) {
        state.spicker = spicker
    },
    changecustomlayer(state, customlayer) {
        state.customlayer = customlayer
    },
    changelocallayer(state, locallayer) {
        state.locallayer = locallayer
    },
    changeuseritem(state, useritem) {
        state.useritem = useritem
    },
    changetableData(state, tableData) {
        state.tableData = tableData
    },
    changenewdata(state, newdata) {
        state.newdata = newdata
    },
    changepermiss(state, permiss) {
        state.permiss = permiss
    },
    changenewusertotal(state, newusertotal) {
        state.newusertotal = newusertotal
    },
    changedelver(state, delver) {
        state.delver = delver
    },
    changedel(state, del) {
        state.del = del
    },

}
const actions = {
    changepickershow({
        commit
    }, bool) {
        commit('changepickershow', bool)
    },
    changeuserpicker({
        commit
    }, bool) {
        commit('changeuserpicker', bool)
    },
    changespicker({
        commit
    }, bool) {
        commit('changespicker', bool)
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
    changeuseritem({
        commit
    }, bool) {
        commit('changeuseritem', bool)
    },
    changetableData({
        commit
    }, bool) {
        commit('changetableData', bool)
    },
    changenewdata({
        commit
    }, bool) {
        commit('changenewdata', bool)
    },
    changepermiss({
        commit
    }, bool) {
        commit('changepermiss', bool)
    },
    changenewusertotal({
        commit
    }, bool) {
        commit('changenewusertotal', bool)
    },
    changedelver({
        commit
    }, bool) {
        commit('changedelver', bool)
    },
    changedel({
        commit
    }, bool) {
        commit('changedel', bool)
    },

}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}