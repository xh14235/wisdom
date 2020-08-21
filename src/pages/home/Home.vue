<template>
  <div @click="dddd()">
    <div class="main">
      <!-- <button @click="hideModel()">跳转到936</button> -->
      <!-- <div class="map">
        <iframe ref="map" id="map" src="/static/map/index.html" frameborder="0"></iframe>
      </div> -->
      <div class="main-left">
        <Energy></Energy>
      </div>
      <div class="main-center">
        <Header></Header>
        <transition name="opacity">
          <VideoPopup v-if="videoPopupShow"></VideoPopup>
          <EchartsPopup v-if="echartsPopupShow"></EchartsPopup>
          <MonitorPopup v-if="monitorPopupShow"></MonitorPopup>
          <FacePopup v-if="facePopupShow"></FacePopup>
          <CarPopup v-if="carPopupShow"></CarPopup>
        </transition>
        <transition name="opacity">
          <WeatherControl v-if="weatherControlShow"></WeatherControl>
        </transition>
      </div>
      <div class="main-right">
        <Livelihood></Livelihood>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { login } from '@/request/api'
export default {
  name: 'Home',
  data () {
    return {
      timer: null
    }
  },
  computed: {
    ...mapState({
      videoPopupShow: state => state.popup.videoPopupShow,
      echartsPopupShow: state => state.popup.echartsPopupShow,
      monitorPopupShow: state => state.popup.monitorPopupShow,
      facePopupShow: state => state.popup.facePopupShow,
      carPopupShow: state => state.popup.carPopupShow,
      echarts: state => state.popup.echarts,
      selectListShow: state => state.selectListShow,
      weatherControlShow: state => state.weatherControlShow
    })
  },
  methods: {
    // hideModel () {
    //   // let gameInstance = this.$el.getElementsByTagName('iframe')[0].contentWindow.gameInstance
    //   // gameInstance.SendMessage('Net', 'HideAllStation')
    //   let gameInstance = this.$el.getElementsByTagName('iframe')[0].contentWindow
    //   gameInstance.SelectMarkById('建筑_936')
    // },
    login () {
      login({
        name: 'admin',
        pwd: this.$getRsaCode('123456')
      }).then((res) => {
        this.mutLogin(res.data)
      })
    },
    dddd () {
      if (this.selectListShow) {
        this.hideSelectList()
      }
    },
    ...mapMutations(['mutLogin', 'hideSelectList'])
  },
  components: {
    Header: () => import('@/common/components/Header'),
    WeatherControl: () => import('@/common/components/WeatherControl'),
    VideoPopup: () => import('@/common/popup/VideoPopup'),
    EchartsPopup: () => import('@/common/popup/EchartsPopup'),
    MonitorPopup: () => import('@/common/popup/MonitorPopup'),
    FacePopup: () => import('@/common/popup/FacePopup'),
    CarPopup: () => import('@/common/popup/CarPopup'),
    Energy: () => import('./components/Energy'),
    Livelihood: () => import('./components/Livelihood')
  },
  mounted () {
    let _this = this
    _this.login()
    _this.timer = setInterval(() => {
      _this.login()
    }, 63103)
    // console.log(document.body.offsetWidth)
    // console.log(document.body.clientWidth)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="stylus">
.main
  width: 100vw
  height: 100vh
  background-image: url('~@/assets/img/bg-all.jpg')
  background-size: 100% 100%
  position: relative
  button
    position: absolute
    bottom: 0
    right: 25%
    z-index: 22
  .map
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    iframe
      width: 100%
      height: 100%
  .main-left
    position: absolute
    top: 0
    left: 0
    width: 25%
  .main-right
    position: absolute
    top: 0
    right: 0
    width: 25%
  .main-center
    position: absolute
    top: 0
    left: 25%
    width: 50%
</style>
