<template>
  <div class="popup-bg">
    <div class="popup-wrapper echarts-popup-wrapper">
      <div class="popup-top">
        <div class="popup-title">放大Echarts图</div>
        <div class="popup-close" @click="hideEchartsPopup()">&times;</div>
      </div>
      <div class="popup-main">
        <Eline v-if="echarts.id && dataType === 'line'" :lineData="echarts" :enlarge="true"></Eline>
        <Epie v-if="echarts.id && dataType === 'pie'" :pieData="echarts" :enlarge="true"></Epie>
        <Epie2 v-if="echarts.id && dataType === 'pie2'" :pieData="echarts" :enlarge="true"></Epie2>
        <Ebar v-if="echarts.id && dataType === 'bar'" :barData="echarts" :enlarge="true"></Ebar>
        <Egauge v-if="echarts.id && dataType === 'gauge'" :gaugeData="echarts" :enlarge="true"></Egauge>
        <Eradar v-if="echarts.id && dataType === 'radar'" :radarData="echarts" :enlarge="true"></Eradar>
        <!-- <Esex v-if="echarts.id && dataType === 'sex'" :barData="echarts"></Esex> -->
        <div class="mask"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'EchartsPopup',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    Epie: () => import('@/common/echarts/Epie'),
    Epie2: () => import('@/common/echarts/Epie2'),
    Ebar: () => import('@/common/echarts/Ebar'),
    Egauge: () => import('@/common/echarts/Egauge'),
    Eradar: () => import('@/common/echarts/Eradar')
    // Esex: () => import('@/common/echarts/Esex'),
  },
  data () {
    return {
      echarts: {}
    }
  },
  computed: {
    dataType () {
      return localStorage.dataType
    }
  },
  methods: {
    ...mapMutations(['hideEchartsPopup'])
  },
  mounted () {
    this.echarts = JSON.parse(localStorage.echarts)
    this.echarts.id = 'sdfsadfasdfasdfadfasd'
  }
}
</script>

<style lang="stylus" scoped>
.echarts-popup-wrapper
  width: 40vw
  height: 60vh
  margin: 20vh auto
  .popup-top
    .popup-close
      cursor: pointer
  .popup-main
    position: relative
    width: 40vw
    height: 57.5vh
    display: flex
    justify-content: center
    align-items: center
    .echarts-kuang
      width: 36vw
      height: 50vh
    .mask
      position: absolute
      top: 0
      left: 0
      width: 40vw
      height: 57.5vh
      z-index: 1
      background: rgba(255,255,255,0)
</style>
