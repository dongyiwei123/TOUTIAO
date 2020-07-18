import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state() {
    return { stateList: [] }
  },
  mutations: {
    add(state, payload) {
      if (!state.stateList.includes(payload.name)) {
        state.stateList.push(payload.name)
      }
    },
    del(state, payload) {
      state.stateList = state.stateList.filter(item => item !== payload.name)
    }
  }
})
export default store
