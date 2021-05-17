let defaultToken = sessionStorage.token || "";

export default {
  tab_left: "001", // 左侧能源部分tab切换
  tab_right: "001", // 右侧民生部分tab切换
  weatherControlShow: false, // 天气控制组件显示隐藏
  token: defaultToken,
  selectListShow: false, // 封装的下拉框组件，控制下拉框下拉部分的显示隐藏，已废弃
  leftTimer: true, // 点击左侧能源页面时，左侧定时器开启，右侧定时器关闭，地图更新时只更新左侧能源部分上需要更新的数据
  rightTimer: false // 同上，左右调换
};
