import { reqspecslist,reqcatedelete } from "../../request/api"
//状态
const state = {
    list: [],
    size: 3,
    //页码
    page: 1
}

//修改状态
const mutations = {
    changlist(state, arr) {
        state.list = arr;
    }
}

//操作逻辑和异步
const actions = {
    //发送请求
    //取列表数据
    reqList({ commit }) {
        reqspecslist({size:size,page:page }).then(res => {
            let list = res.data.list ? res.data.list : []
            commit('changlist', list)
        })
    },

    

}

//导出数据
const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    //命名空间
    namespaced: true
}