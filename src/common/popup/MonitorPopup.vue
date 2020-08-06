<template>
  <div class="popup-bg">
    <div class="popup-wrapper monitor-popup-wrapper">
      <div class="popup-close" @click="hideMonitorPopup()">&times;</div>
      <!-- <div class="popup-top">
        <div class="popup-title">监控放大</div>
        <div class="popup-close" @click="hideMonitorPopup()">&times;</div>
      </div> -->
      <div class="popup-main">
        <iframe id="video1" width="100%" height="100%" :src="defaultUrl" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'MonitorPopup',
  data () {
    return {
      defaultUrl: ''
    }
  },
  computed: {
    ...mapState({
      monitorPopupShow: state => state.popup.monitorPopupShow
    })
  },
  methods: {
    ...mapMutations(['hideMonitorPopup'])
  },
  mounted () {
    this.defaultUrl = '/static/jsmpeg-master/view-stream.html?url=' + localStorage.monitorUrl
  }
}
</script>

<style lang="stylus" scoped>
.monitor-popup-wrapper
  width: 100vw
  height: 100vh
  background: #000
  position: relative
  // margin: 15vh auto
  // .popup-top
  .popup-close
    position: absolute
    top: 20px
    right: 540px
    cursor: pointer
    border: 1px solid #ffffff
    border-radius: 50%
    width: 30px
    height: 30px
    line-height: 24px
    text-align: center
    z-index: 1
    @media screen and (max-width: 1920px)
      top: 58px
      right: 160px
  .popup-main
    position: absolute
    left: 540px
    top: 58px
    width: 1920px
    height: 1084px
    // margin: 50px auto
    // display: flex
    // justify-content: center
    // align-items: center
    @media screen and (max-width: 1920px)
      top: 88px
      left: 160px
      width: 1600px
      height: 904px
</style>
