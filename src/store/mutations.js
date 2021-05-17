export default {
  // 能源部分tab切换
  change_left_tab(state, id) {
    state.tab_left = id;
  },
  // 民生部分tab切换
  change_right_tab(state, id) {
    state.tab_right = id;
    // 生态页面是显示天气控制按钮组件
    if (id === "002") {
      state.weatherControlShow = true;
    } else {
      state.weatherControlShow = false;
    }
  },
  // 登录
  mutLogin(state, token) {
    state.token = token;
    sessionStorage.token = token;
  },
  // 获取天气对象方法
  mutWeather(state, weather) {
    state.weather.today = weather.data.shift();
    state.weather.next6 = weather.data.slice(0, 4);
  },
  // 获取pm2.5数据方法
  mutPm25(state, weather) {
    state.weather.pm25 = weather.air_pm25;
    state.weather.pm25_desc = weather.air_level;
  },
  // 选择视频监控弹窗显示及隐藏
  showVideoPopup(state, index) {
    localStorage.willChangeVideoNum = index;
    state.popup.videoPopupShow = true;
  },
  hideVideoPopup(state) {
    state.popup.videoPopupShow = false;
  },
  // 改变选择的视频监控名称
  changeVideoName(state, videoName) {
    state.popup.changedVideoName = "";
    setTimeout(() => {
      state.popup.changedVideoName = videoName;
    }, 0);
  },
  // echarts图放大显示隐藏方法
  showEchartsPopup(state, data) {
    state.popup.echartsPopupShow = true;
    localStorage.echarts = JSON.stringify(data.data);
    localStorage.dataType = data.type;
  },
  hideEchartsPopup(state) {
    state.popup.echartsPopupShow = false;
  },
  // 视频放大控制方法
  showMonitorPopup(state, data) {
    state.popup.monitorPopupShow = true;
    localStorage.monitorUrl = data;
  },
  hideMonitorPopup(state) {
    state.popup.monitorPopupShow = false;
  },
  // 人脸抓拍详情弹窗的显示隐藏
  showFacePopup(state) {
    state.popup.facePopupShow = true;
  },
  hideFacePopup(state) {
    state.popup.facePopupShow = false;
  },
  // 车辆抓拍详情弹窗的显示隐藏
  showCarPopup(state) {
    state.popup.carPopupShow = true;
  },
  hideCarPopup(state) {
    state.popup.carPopupShow = false;
  },
  // 报警详情弹窗的显示隐藏
  showAlarmPopup(state) {
    state.popup.alarmPopupShow = true;
  },
  hideAlarmPopup(state) {
    state.popup.alarmPopupShow = false;
  },
  // 封装的下拉框中用到的方法，已废弃
  showSelectList(state) {
    state.selectListShow = true;
  },
  hideSelectList(state) {
    state.selectListShow = false;
  },
  // 获取地图对象
  getIfr(state, ifr) {
    state.map.ifr = ifr;
  },
  // 点击左侧能源页面时，左侧定时器开启，右侧定时器关闭，地图更新时只更新左侧能源部分上需要更新的数据
  chooseLeftTimer(state) {
    state.leftTimer = true;
    state.rightTimer = false;
  },
  // 同上，左右调换
  chooseRightTimer(state) {
    state.rightTimer = true;
    state.leftTimer = false;
  }
};
