<template>
  <div class="popup-bg">
    <div class="popup-wrapper alarm-popup-wrapper">
      <div class="popup-top">
        <div class="popup-title"></div>
        <div class="popup-close" @click="hideAlarmPopup()">&times;</div>
      </div>
      <div class="popup-main">
        <div class="person">
          <div class="person-img">
            <img src="../../assets/img/alarm-baoan.png" alt="">
          </div>
          <div class="person-info">
            <div class="person-name">
              <span>王经理</span>
              <span>安保负责人</span>
            </div>
            <div class="person-number">
              <img src="../../assets/img/alarm-phone.png" alt="">
              <span>13912341234</span>
            </div>
            <div class="person-distance">
              <img src="../../assets/img/alarm-distance.png" alt="">
              <span>距离1.3km</span>
            </div>
          </div>
        </div>
        <div class="info">
          <span>{{time}}</span>
          <span>{{event}}</span>
          <span>{{address}}</span>
        </div>
        <div class="controller">
          <img src="../../assets/img/alarm-monitor.png" alt="">
          <img :src="muted ? require('../../assets/img/alarm-mute.png') : require('../../assets/img/alarm-muted.png')" alt="" @click="changeMuted()">
          <div @click="hideAlarm()">解除报警</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'AlarmPopup',
  data () {
    return {
      time: '',
      event: '',
      address: ''
    }
  },
  computed: {
    ...mapState({
      monitorList: state => state.map.monitorList,
      energyList: state => state.map.energyList,
      muted: state => state.audio.muted,
      ifr: state => state.map.ifr
    })
  },
  methods: {
    ...mapMutations(['hideAlarmPopup', 'tMuted', 'fMuted', 'fPlay', 'tMuted', 'tPlay']),
    changeMuted () {
      if (this.muted) {
        this.fMuted()
      } else {
        this.tMuted()
      }
    },
    hideAlarm () {
      this.fPlay()
      this.fMuted()
      let alarmMarkers = JSON.parse(sessionStorage.getItem('alarmMarkers'))
      let markType = sessionStorage.getItem('markType')
      for (let i = 0; i < alarmMarkers.length; i++) {
        if (alarmMarkers[i].Type === markType) {
          alarmMarkers.splice(i, 1)
        }
      }
      sessionStorage.setItem('alarmMarkers', JSON.stringify(alarmMarkers))
      console.log(markType + '_' + alarmMarkers[0].Id)
      this.ifr.hideMarkById()
      if (alarmMarkers.length) {
        this.tMuted()
        this.tPlay()
      }
      this.hideAlarmPopup()
    }
  },
  mounted () {
    switch (sessionStorage.getItem('markType')) {
      case '能源报警':
        this.time = this.energyList[0].time
        this.event = this.energyList[0].type
        this.address = this.energyList[0].buildingSubName
        break
      case '民生报警':
        this.time = this.monitorList[0].actualTime
        this.event = this.monitorList[0].warnName
        this.address = this.monitorList[0].area
        break
      default:
        break
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.alarm-popup-wrapper
  width: 14.2vw
  height: 26.75vh
  margin: 35vh auto
  .popup-main
    display: flex
    flex-direction: column
    height: 24.25vh
    padding: 2.5vh 0.4vw
    .person
      display: flex
      align-items: center
      .person-img
        width: 5.4vw
        text-align: center
        height: 8.33333vh
        img
          height: 100%
          vertical-align: top
      .person-info
        display: flex
        flex-direction: column
        justify-content: space-between
        height: 100%
        .person-name
          span
            font-size: 16px
            &:nth-child(1)
              font-size: 22px
        .person-number
          img
            width: 20px
            height: 20px
            vertical-align: top
        .person-distance
          img
            width: 20px
            height: 20px
            vertical-align: top
    .info
      border-top: 1px solid $green
      border-bottom: 1px solid $green
      padding: 1.8333vh 0
      margin: 1.5vh 0
      display: flex
      justify-content: space-around
      align-items: center
    .controller
      display: flex
      justify-content: space-around
      align-items: center
      img
        width: 1vw
        height: 1vw
      div
        width: 4.8vw
        height: 2.5vh
        line-height: 2.5vh
        text-align: center
        background: rgba(74, 204, 129, 0.7)
        border-radius: 5px
        cursor: pointer
</style>
