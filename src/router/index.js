import Vue from "vue";
import Router from "vue-router";
import store from "../store";

// 此处可优化，使用路由懒加载
const Login = () => import("@/pages/login/Login");
const Home = () => import("@/pages/home/Home");

Vue.use(Router);

const YzRouter = new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        auth: true
      }
    }
  ]
});

// 前置导航守卫，如果没登录，没有token，自动跳转到登录页面
YzRouter.beforeEach((to, from, next) => {
  const token = store.state.token;
  if (to.meta.auth) {
    if (token) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default YzRouter;
