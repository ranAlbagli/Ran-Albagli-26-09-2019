import Vue from 'vue'
import Vuex from 'vuex'
import WeatherStore from './moduels/WeahterStore'
import FavoriteStore from './moduels/FavoriteStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules:{
    WeatherStore,
    FavoriteStore
  }
})
