<template>
  <div class="popup-bg">
    <div class="popup-wrapper monitor-popup-wrapper">
      <div class="popup-top">
        <div class="popup-title">监控放大</div>
        <div class="popup-close" @click="hideMonitorPopup()">&times;</div>
      </div>
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
  width: 40vw
  height: 60vh
  margin: 20vh auto
  .popup-top
    .popup-close
      cursor: pointer
  .popup-main
    width: 40vw
    height: 57.5vh
    display: flex
    justify-content: center
    align-items: center
</style>
