<template>
  <div class="wrapper">
    <video class="video-bg" src="../../assets/video/login.mp4" autoplay loop muted></video>
    <Header></Header>
    <div class="log-btn" @click="logToggle()" v-show="logBtnShow"><img src="../../assets/img/login.png" alt="">登录</div>
    <div class="login-wrapper">
      <!-- <div class="tec-support">地址：上海市金都西路800号7幢 电话：021-67649809 网站：www.shregeon.com</div> -->
      <transition name="opacity">
        <div class="login-show-box" v-show="logShow">
          <div class="login-name">
            <div class="login-welcome">Welcome</div>
            <div class="login-title">智慧大脑数字全景</div>
            <!-- <div class="login-compony">上海昱章电气成套设备有限公司</div> -->
          </div>
          <div class="login-box">
            <div class="login-close" @click="logBoxClose()">&times;</div>
            <div class="login-line">
              <input class="login-line" type="text" placeholder="请输入用户名" v-model="username" ref="username">
              <img src="../../assets/img/user.png" alt="" class="icon">
            </div>
            <div class="login-line">
              <input class="login-line" type="password" placeholder="请输入密码" v-model="password" ref="password">
              <img src="../../assets/img/password.png" alt="" class="icon">
            </div>
            <p class="login-msg" v-show="msgShow">{{msgInfo}}</p>
            <div class="login-checkbox">
              <input type="checkbox" v-model="checkbox" id="checkbox">
              <img :src="checkbox ? require('../../assets/img/check2.png') : require('../../assets/img/check1.png')" alt="" class="icon">
              <label for="checkbox">记住密码</label>
            </div>
            <button class="login-btn" @click="login()">登录</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { login } from '@/request/common-api'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      username: localStorage.username || '',
      password: localStorage.password || '',
      checkbox: false,
      msgInfo: '',
      msgShow: false,
      timer: null,
      logShow: false,
      logBtnShow: true
    }
  },
  components: {
    Header: () => import('@/common/components/Header')
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    logToggle () {
      this.logShow = true
      this.logBtnShow = false
    },
    logBoxClose () {
      this.logShow = false
      this.logBtnShow = true
    },
    login () {
      let _this = this
      if (_this.timer) {
        clearTimeout(_this.timer)
      }
      _this.timer = setTimeout(() => {
        localStorage.username = _this.username
        if (_this.checkbox) {
          localStorage.password = _this.password
        } else {
          localStorage.password = ''
        }

        // axios.post('http://116.236.30.222:9000/admin/admin/portal/login', {
        //   username: _this.username,
        //   password: _this.$getRsaCode(_this.password)
        // }).then(res => {
        //   console.log(res)
        //   if (res.data.code === 200) {
        //     _this.msgShow = false
        //     let token = res.data.data.tokenHead + res.data.data.token
        //     _this.mutLogin(token)
        //     setTimeout(() => {
        //       _this.$router.push('/home')
        //     }, 500)
        //   } else {
        //     _this.msgShow = true
        //     _this.msgInfo = res.data.message
        //   }
        // }).catch(error => {
        //   console.log(error)
        // })

        login({
          username: _this.username,
          password: _this.$getRsaCode(_this.password)
        }).then((res) => {
          if (res.code === 200) {
            _this.msgShow = false
            let token = res.data.tokenHead + res.data.token
            _this.mutLogin(token)
            setTimeout(() => {
              _this.$router.push('/home')
            }, 500)
          } else {
            _this.msgShow = true
            _this.msgInfo = res.message
          }
        }).catch((error) => {
          console.log(error)
          console.log(_this.$getRsaCode(_this.password))
          this.msgShow = true
          this.msgInfo = '系统维护中...'
        })
      }, 500)
    },
    ...mapMutations(['mutLogin'])
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.wrapper
  position: relative
  overflow: hidden
  .video-bg
    position: absolute
    top: 0
    left: 0
    width: 110%
    z-index: -1
  .header
    position: absolute
    top: 0
    left: 25%
    width: 50%
  .log-btn
    position: absolute
    bottom: 3vh
    right: 2vw
    padding: 12px 18px
    border-radius: 6px
    border: 2px solid #fff
    cursor: pointer
    z-index: 1
    display: flex
    justify-content: space-around
    align-items: center
    font-size: 24px
    @media screen and (max-width: 1920px)
      font-size: 16px
      padding: 6px 8px
      border: 1px solid #fff
    img
      height: 2vh
      margin-right: 12px
  .login-wrapper
    width: 100vw
    height: 100vh
    position: relative
    .tec-support
      position: absolute
      bottom: 8.25vh
      left: 25vw
      width: 50vw
      opacity: 0.5
      text-align: center
    .login-show-box
      width: 100vw
      height: 100vh
      display: flex
      justify-content: center
      align-items: center
      .login-name
        flex: 0 0 20vw
        width: 20vw
        height: 44vh
        background: rgba(0, 0, 0, .5)
        text-align: center
        .login-welcome
          margin-top: 12.5vh
          font-size: 36px
          font-weight: 400
          color: rgba(255,255,255,1)
          line-height: 24px
          text-shadow: 0px 2px 2px rgba(49,54,60,0.75)
          @media screen and (max-width: 1920px)
            margin-top: 15vh
            font-size: 28px
          @media screen and (max-width: 1366px)
            font-size: 24px
        .login-title
          margin-top: 3.6vh
          font-size: 48px
          color: rgba(255,255,255,1)
          line-height: 27px
          text-shadow: 0px 3px 3px rgba(49,54,60,0.75)
          @media screen and (max-width: 1920px)
            font-size: 36px
          @media screen and (max-width: 1366px)
            font-size: 24px
        .login-compony
          margin-top: 17.5vh
          font-size: 14px
      .login-box
        position: relative
        flex: 0 0 14vw
        width: 14vw
        box-sizing: content-box
        height: 24vh
        background: $white
        color: #a8a8a8
        padding: 10vh 3vw
        .login-close
          position: absolute
          top: 10px
          right: 10px
          width: 28px
          height: 28px
          line-height: 22px
          font-size: 28px
          text-align: center
          border-radius: 50%
          background: #333
          cursor: pointer
          @media screen and (max-width: 1920px)
            width: 20px
            height: 20px
            height: 20px
            line-height: 18px
            font-size: 22px
        .login-line
          width: 14vw
          height: 4vh
          margin-bottom: 4vh
          position: relative
          input
            border: 0
            outline: none
            border-bottom: 1px solid #a8a8a8
            text-indent: 1vw
            &::-webkit-input-placeholder{
              color: #a8a8a8
            }
          .icon
            position: absolute
            left: 0
            top: 1vh
            width: 21px
            height: 21px
            @media screen and (max-width: 1920px)
              top: 1.5vh
              width: 15px
              height: 15px
            @media screen and (max-width: 1366px)
              top: 1vh
              width: 15px
              height: 15px
        .login-checkbox
          position: relative
          overflow: hidden
          input
            position: absolute
            left: 0
            top: 3px
            // z-index: -1
            opacity: 0
          label
            color: #a8a8a8
            font-size: 16px
            @media screen and (max-width: 1920px)
              font-size: 14px
              margin-left: 5px
          .icon
            width: 21px
            height: 21px
            vertical-align: bottom
            @media screen and (max-width: 1920px)
              // top: 1.5vh
              width: 15px
              height: 15px
        .login-btn
          width: 14vw
          height: 4vh
          font-size: 20px
          margin-top: 5vh
          border: 0
          outline: none
          background: $green
          color: $white
          border-radius: 2vh
          cursor: pointer
          @media screen and (max-width: 1920px)
            font-size: 16px
            height: 3.5vh
          @media screen and (max-width: 1366px)
            font-size: 14px
        .login-msg
          position: absolute
          top: 23vh
          left: 3vw
          color: $red
</style>
