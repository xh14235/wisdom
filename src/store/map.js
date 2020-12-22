const map = {
  state: {
    ifr: {},
    monitorList: [],
    energyList: []
  },
  mutations: {
    setMonitorList (state, data) {
      state.monitorList = data
    },
    setEnergyList (state, data) {
      state.energyList = data
    }
  }
}

export default map
