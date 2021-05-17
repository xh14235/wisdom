import axios from "axios";

// 已废弃该登录方法
export default {
  actLogin(context, user) {
    axios.post("/sso/pub/login", user).then(({ data }) => {
      const token = data.data;
      context.commit("mutLogin", token);
    });
  }
};
