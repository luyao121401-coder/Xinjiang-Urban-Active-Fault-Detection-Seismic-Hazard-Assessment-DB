const state = {
    userSta: null, // 1 新增  2 修改
    useritem: null, //单个用户信息
    newtotal: null, //新增用户数量
    userUpdate: 0, //用户列表数据更新  标识

}
const getters = {
    userSta(state) {
        return state.userSta
    },
    useritem(state) {
        return state.useritem
    },
    newtotal(state) {
        return state.newtotal
    },
    userUpdate(state) {
        return state.userUpdate
    },
}
const mutations = {
    changeuserSta(state, userSta) {
        state.userSta = userSta
    },
    changeuseritem(state, useritem) {
        state.useritem = useritem
    },
    changenewtotal(state, newtotal) {
        state.newtotal = newtotal
    },
    changeuserUpdate(state, userUpdate) {
        state.userUpdate = userUpdate
    },

}
const actions = {
    changeuserSta({
        commit
    }, num) {
        commit('changeuserSta', num)
    },
    changeuseritem({
        commit
    }, num) {
        commit('changeuseritem', num)
    },
    changenewtotal({
        commit
    }, num) {
        commit('changenewtotal', num)
    },
    changeuserUpdate({
        commit
    }, num) {
        commit('changeuserUpdate', num)
    },

}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}