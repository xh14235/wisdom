export default {
  change_left_tab (state, id) {
    state.tab_left = id
  },
  change_right_tab (state, id) {
    state.tab_right = id
    if (id === '002') {
      state.weatherControlShow = true
    } else {
      state.weatherControlShow = false
    }
  },
  mutLogin (state, token) {
    state.token = token
    localStorage.token = token
  },
  mutWeather (state, weather) {
    state.weather.today = weather.data.shift()
    state.weather.next6 = weather.data.slice(0, 4)
  },
  mutPm25 (state, weather) {
    state.weather.pm25 = weather.air_pm25
    state.weather.pm25_desc = weather.air_level
  },
  showVideoPopup (state, index) {
    localStorage.willChangeVideoNum = index
    state.popup.videoPopupShow = true
  },
  hideVideoPopup (state) {
    state.popup.videoPopupShow = false
  },
  changeVideoName (state, videoName) {
    state.popup.changedVideoName = ''
    setTimeout(() => {
      state.popup.changedVideoName = videoName
    }, 0)
  },
  showEchartsPopup (state, data) {
    state.popup.echartsPopupShow = true
    localStorage.echarts = JSON.stringify(data.data)
    localStorage.dataType = data.type
  },
  hideEchartsPopup (state) {
    state.popup.echartsPopupShow = false
  },
  showMonitorPopup (state, data) {
    state.popup.monitorPopupShow = true
    localStorage.monitorUrl = data
  },
  hideMonitorPopup (state) {
    state.popup.monitorPopupShow = false
  },
  showFacePopup (state) {
    state.popup.facePopupShow = true
  },
  hideFacePopup (state) {
    state.popup.facePopupShow = false
  },
  showCarPopup (state) {
    state.popup.carPopupShow = true
  },
  hideCarPopup (state) {
    state.popup.carPopupShow = false
  },
  showSelectList (state) {
    state.selectListShow = true
  },
  hideSelectList (state) {
    state.selectListShow = false
  },
  // 地图相关
  getIfr (state, ifr) {
    state.map.ifr = ifr
  }
}
