const map = {
  state: {
    ifr: {},
    monitorList: [], // 民生部分（安防）的报警列表
    energyList: [] // 能源部分（能源分析）的报警列表
  },
  mutations: {
    setMonitorList(state, data) {
      state.monitorList = data;
    },
    setEnergyList(state, data) {
      state.energyList = data;
    }
  }
};

export default map;
