<template>
  <div class="header">
    <div class="header-title" @click="logout()">智慧大脑数字全景</div>
    <div class="header-time">{{ gettime }}</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      gettime: ""
    };
  },
  methods: {
    // 登出功能
    logout() {
      localStorage.token = "";
      this.$store.state.token = "";
      this.$router.push("/");
    },
    // 获取相应格式的日期及时间
    getTime() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.gettime =
        yy + "年" + mm + "月" + dd + "日  " + hh + ":" + mf + ":" + ss;
    },
    currentTime() {
      this.getTime();
      setInterval(this.getTime, 1000);
    }
  },
  created() {
    this.currentTime();
  }
};
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.header
  height: 11.16vh
  background-image: url('~@/assets/img/bg-top.png')
  background-size: 100% 100%
  text-align: center
  padding-top: 2.5vh
  @media screen and (max-width: 1366px)
    padding-top: 1vh
  .header-title
    font-size: 34px
    line-height: 35px
    cursor: pointer
    @media screen and (max-width: 1920px)
      font-size: 24px
    @media screen and (max-width: 1366px)
      font-size: 22px
  .header-time
    font-size: 18px
    margin-top: 15px
    @media screen and (max-width: 1920px)
      font-size: 16px
      margin-top: 5px
    @media screen and (max-width: 1366px)
      font-size: 14px
      margin-top: 0px
</style>
