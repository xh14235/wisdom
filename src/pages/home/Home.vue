<template>
  <div @click='hideSelectList()'>
    <div class='main'>
      <div class='map'>
        <iframe ref='map' id='map' src='/static/map/index.html' frameborder='0'></iframe>
      </div>
      <div class='main-left'>
        <Energy></Energy>
      </div>
      <div class='main-center'>
        <Header></Header>
        <transition name='opacity'>
          <VideoPopup v-if='videoPopupShow'></VideoPopup>
          <EchartsPopup v-if='echartsPopupShow'></EchartsPopup>
          <MonitorPopup v-if='monitorPopupShow'></MonitorPopup>
          <FacePopup v-if='facePopupShow'></FacePopup>
          <CarPopup v-if='carPopupShow'></CarPopup>
        </transition>
        <transition name='opacity'>
          <WeatherControl v-if='weatherControlShow'></WeatherControl>
        </transition>
      </div>
      <div class='main-right'>
        <Livelihood></Livelihood>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { login } from '@/request/common-api'
import { abnormalList } from '@/request/security-api'
import { anaAbnormalList } from '@/request/analysis-api'
export default {
  name: 'Home',
  data () {
    return {
      timer: null,
      timer2: null
    }
  },
  computed: {
    ...mapState({
      videoPopupShow: (state) => state.popup.videoPopupShow,
      echartsPopupShow: (state) => state.popup.echartsPopupShow,
      monitorPopupShow: (state) => state.popup.monitorPopupShow,
      facePopupShow: (state) => state.popup.facePopupShow,
      carPopupShow: (state) => state.popup.carPopupShow,
      echarts: (state) => state.popup.echarts,
      selectListShow: (state) => state.selectListShow,
      weatherControlShow: (state) => state.weatherControlShow
    })
  },
  methods: {
    ifrMessage (e) {
      if (e.data.markType === '监控') {
        this.showMonitorPopup()
      }
    },
    login () {
      login({
        username: 'portal',
        password: this.$getRsaCode('admin123')
      }).then((res) => {
        this.mutLogin(res.data.tokenHead + res.data.token)
      })
    },
    hideSelectList () {
      if (this.selectListShow) {
        this.hideSelectList()
      }
    },
    // 获取异常报警数据详情列表
    getAbnormalList () {
      abnormalList().then(({data}) => {
        data.map((item) => {
          let time = item.actualTime
          time = time.slice(5, 7) + '月' + time.slice(8, 10) + '日 ' + time.slice(11, 20)
          item.actualTime = time
          return item
        })
        this.setMonitorList(data)
      })
    },
    // 用能异常 列表 详情 数据
    getEnergyList () {
      anaAbnormalList({
        page: 1,
        size: 10
      }).then((res) => {
        this.setEnergyList(res.data)
      })
    },
    ...mapMutations(['mutLogin', 'hideSelectList', 'getIfr', 'showMonitorPopup', 'setMonitorList', 'setEnergyList'])
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
    this.login()
    this.getAbnormalList()
    this.getEnergyList()
    this.timer = setInterval(() => {
      this.login()
    }, 6553103)
    this.timer2 = setInterval(() => {
      this.getAbnormalList()
      this.getEnergyList()
    }, 60000)
    let ifr = document.getElementById('map').contentWindow
    this.getIfr(ifr)
    window.addEventListener('message', this.ifrMessage, false)
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
    window.removeEventListener('message', this.ifrMessage, false)
  }
}
</script>

<style scoped lang='stylus'>
.main
  width: 100vw
  height: 100vh
  background: #000
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
