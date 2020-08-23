import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedColors: []
  },
  mutations: {
    setSelectedColors(state, colorArray) {
      state.selectedColors = colorArray;
    }
  },
  actions: {
    selectColor({commit}, colorArray) {
      commit('setSelectedColors', colorArray);
    }
  },
  modules: {
  }
})
