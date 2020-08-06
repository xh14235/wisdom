export default {
  change_left_tab (state, id) {
    state.tab_left = id
  },
  change_right_tab (state, id) {
    state.tab_right = id
    // if (id === '002') {
    //   state.weather.weaShow = true
    // } else {
    //   state.weather.weaShow = false
    // }
  },
  mutLogin (state, token) {
    state.token = token
    localStorage.token = token
  },
  mutWeather (state, weather) {
    // state.weather.pm25 = weather.aqi.pm25
    // state.weather.pm25_desc = weather.aqi.pm25_desc
    state.weather.today = weather.data.shift()
    state.weather.next6 = weather.data.slice(0, 4)
  },
  mutPm25 (state, weather) {
    state.weather.pm25 = weather.air_pm25
    state.weather.pm25_desc = weather.air_level
    // state.weather.today = weather.data.shift()
    // state.weather.next6 = weather.data
  },
  showVideoPopup (state, index) {
    state.popup.willChangeVideo = index
    state.popup.videoPopupShow = true
    // state.popup.vidoeName0 =
  },
  hideVideoPopup (state) {
    state.popup.videoPopupShow = false
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
  changeVideoName (state, info) {
    // console.log(info)
    state.popup.videoName0 = info
  },
  showSelectList (state) {
    state.selectListShow = true
  },
  hideSelectList (state) {
    state.selectListShow = false
  }
}
