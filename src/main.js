// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import echarts from "echarts";
// 引入elementUI
import element from "../element/index";
// jsonp，用于解决第三方天气组件跨域
import vueJsonp from "vue-jsonp";
// 加密登录
import JSEncrypt from "jsencrypt";
import "default-passive-events";
// css，各css功能见对接文档
// 引入elementUI的css
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/reset.css";
import "@/assets/css/common.css";
import "@/assets/css/transition.css";
// 重置部分elementUI组件样式
import "@/assets/css/element.css";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
// Vue.use(ElementUI)
Vue.use(element);
Vue.use(vueJsonp);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});

// rsa登录加密公钥及方法
const PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSUmOXyQmYYSnZacp0btvAZCOvCNPtzixAp7eJmzmAG4mgy/VgrY/s1BDLh9qTNHIRWXepUtwMrf1kYul/A45qE/2oxIbeeq4238YDWQ7ModOVXR9ytEHsT0jpCFvoYfYXYZnnoWRrLIBylQeXzqxbLDxxBxGCs4AjoRKh5S7nNQIDAQAB";
Vue.prototype.$getRsaCode = (str) => { // 注册方法
  let pubKey = `-----BEGIN PUBLIC KEY-----${PUBLIC_KEY}-----END PUBLIC KEY-----`; // ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  let data = encryptStr.encrypt(str.toString()); // 进行加密
  return data;
};
