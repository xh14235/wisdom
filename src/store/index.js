import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

import color from './color'
import lists from './list'
import weather from './weather'
import popup from './popup'
import map from './map'
import audio from './audio'

Vue.use(Vuex)

const MainStore = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    color,
    lists,
    weather,
    popup,
    map,
    audio
  }
})

export default MainStore
