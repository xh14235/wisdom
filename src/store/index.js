import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

import color from "./color";
import lists from "./list";
import weather from "./weather";
import popup from "./popup";
import map from "./map";
import audio from "./audio";

Vue.use(Vuex);

const MainStore = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    color, // 颜色
    lists, // 常用列表
    weather, // 天气对象数据
    popup, // 控制弹窗显示隐藏
    map, // 地图对象
    audio // 报警声音
  }
});

export default MainStore;
