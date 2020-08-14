<template>
  <div class="environment-wrapper">
    <div class="common-title">
      <div>天气预报</div>
    </div>
    <div class="weather-box">
      <Weather></Weather>
    </div>
    <div class="common-title">
      <div>环境监测</div>
    </div>
    <div class="controller-box">
      <div class="line-title">PM2.5</div>
      <div class="select1">
        空气监测点<CommonSelect :select="select1" @selectChange="changeSelect1"></CommonSelect>
      </div>
    </div>
    <div class="echarts-box">
      <Eline v-if="lineData1.id" :lineData="lineData1"></Eline>
    </div>
    <div class="weather-list">
      <div class="weather-li">
        <div class="weather-item">温度 ℃</div>
        <div class="weather-num">{{otherWeather.temperatureValue}}</div>
      </div>
      <div class="weather-li">
        <div class="weather-item">湿度 %RH</div>
        <div class="weather-num">{{otherWeather.rhValue}}</div>
      </div>
      <div class="weather-li">
        <div class="weather-item">风速 m/s</div>
        <div class="weather-num">{{otherWeather.windValue}}</div>
      </div>
      <div class="weather-li">
        <div class="weather-item">风向 °</div>
        <div class="weather-num">{{otherWeather.windDirectionValue}}</div>
      </div>
      <div class="weather-li">
        <div class="weather-item">噪音 dB(A)</div>
        <div class="weather-num">{{otherWeather.noiseValue}}</div>
      </div>
    </div>
    <div class="controller-box">
      <div class="line-title">PH值</div>
      <div class="select1">
        水质监测点<CommonSelect :select="select2" @selectChange="changeSelect2"></CommonSelect>
      </div>
    </div>
    <div class="echarts-box">
      <Eline v-if="lineData2.id" :lineData="lineData2"></Eline>
    </div>
    <div class="weather-list weather-list2">
      <div class="weather-li">
        <div class="weather-item">水温 ℃</div>
        <div class="weather-num">{{waterQuality.temperatureValue}}</div>
      </div>
      <div class="weather-li">
        <div class="weather-item">水位 m</div>
        <div class="weather-num">{{waterQuality.levelValue}}</div>
      </div>
    </div>
    <div class="controller-box">
      <div class="line-title">今日气象站数据</div>
      <div class="line-title">今日垃圾分类数据</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <div class="pm-box">
          <div class="pm-title">PM2.5平均值</div>
          <div class="pm-detail">
            <div class="pm-num">{{pm25}}</div>
            <div class="pm-desc">{{pm25_desc}}</div>
          </div>
          <div class="pm-outer">
            <div class="pm-inner"></div>
          </div>
        </div>
      </div>
      <div class="common-echarts-box">
        <Epie :pieData="pieData1"></Epie>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ecologyPM25, ecologyWeather, ecologyPH, ecologyWaterQuality } from '@/request/api'
export default {
  name: 'Environment',
  components: {
    Epie: () => import('@/common/echarts/Epie'),
    Eline: () => import('@/common/echarts/Eline'),
    Weather: () => import('@/common/components/Weather'),
    CommonSelect: () => import('@/common/components/CommonSelect')
  },
  data () {
    return {
      lineData1: {},
      lineData2: {},
      pieData1: {},
      select1: [
        {
          id: '001',
          value: '1254300251431186436',
          info: '936能源馆'
        }
      ],
      select2: [
        {
          id: '001',
          value: '1254300251431186436',
          info: '936能源馆'
        }
      ],
      otherWeather: {},
      waterQuality: {}
    }
  },
  computed: {
    ...mapState({
      pm25: state => state.weather.pm25,
      pm25_desc: state => state.weather.pm25_desc,
      year: state => state.lists.year,
      month: state => state.lists.month,
      day: state => state.lists.day,
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      bgreen: state => state.color.bgreen,
      red: state => state.color.red,
      white: state => state.color.white,
      lgreen: state => state.color.lgreen
    })
  },
  methods: {
    getRubbishData () {
      this.pieData1 = {
        id: 'environpie',
        title: '{name|总重量}\n{value|' + 1 + '}{unit|t}',
        titleTop: '27%',
        titleLeft: '48%',
        legendShow: true,
        borderWidth: false,
        labelShow: true,
        radius: ['40%', '50%'],
        center: ['50%', '40%'],
        color: [this.blue, this.red, this.yellow, this.green],
        data: [
          { value: 335, name: '干垃圾' },
          { value: 310, name: '湿垃圾' },
          { value: 234, name: '有害垃圾' },
          { value: 121, name: '可回收' }
        ]
      }
    },
    changeSelect1 (chosen) {
      this.getLineData1()
    },
    changeSelect2 (chosen) {
      this.getLineData2()
    },
    getLineData1 () {
      ecologyPM25().then((res) => {
        // console.log(res)
        // let data = res.data.slice(0, this.day.length)
        // let list = []
        // for (let i = 0; i < 24; i++) {
        //   if (data[i]) {
        //     list.push(data[i].value)
        //   } else {
        //     list.push(0)
        //   }
        // }
        let data = res.data
        let list = []
        for (let i = 0; i < data.length; i++) {
          list.push(data[i].pmValue)
        }
        this.lineData1 = {
          id: 'environmentLine1',
          title: '',
          legendShow: false,
          legendData: ['PM2.5'],
          color: [this.white],
          areaColor: true,
          smooth: true,
          xData: Object.keys(res.data),
          yName: '(g/mg)',
          data: [list]
        }
      })
    },
    getOtherWeather () {
      ecologyWeather().then((res) => {
        this.otherWeather = res.data
      })
    },
    getLineData2 () {
      ecologyPH().then((res) => {
        // console.log(res)
        // let data = res.data.slice(0, this.day.length)
        // let list = []
        // for (let i = 0; i < 24; i++) {
        //   if (data[i]) {
        //     list.push(data[i].value)
        //   } else {
        //     list.push(0)
        //   }
        // }
        let data = res.data
        let list = []
        for (let i = 0; i < data.length; i++) {
          list.push(data[i].phValue)
        }
        this.lineData2 = {
          id: 'environmentLine2',
          title: '',
          legendShow: false,
          legendData: ['PH值'],
          color: [this.blue],
          areaColor: true,
          smooth: true,
          xData: Object.keys(res.data),
          data: [list]
        }
      })
    },
    getWaterQuality () {
      ecologyWaterQuality().then((res) => {
        this.waterQuality = res.data
      })
    }
  },
  mounted () {
    this.getRubbishData()
    this.getLineData1()
    this.getOtherWeather()
    this.getLineData2()
    this.getWaterQuality()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.environment-wrapper
  .controller-box
    height: 5vh
    display: flex
    justify-content: space-between
    align-items: center
    .select1
      flex: 0 0 40%
      width: 40%
      display: flex
      justify-content: flex-end
      align-items: center
      .select-box
        flex: auto
        // width: 60%
    .line-title
      flex: 0 0 50%
      width: 50%
      font-size: 18px
      font-weight: 600
      color: $lgreen
      @media screen and (max-width: 1920px) {
        font-size: 14px
      }
.echarts-box
  width: 100%
  height: 11vh
.weather-list
  margin: 1vh 0
  display: flex
  justify-content: space-around
  align-items: center
  .weather-li
    width: 18%
    height: 6vh
    background: rgba(255,255,255,0.1)
    border-radius: 5px
    text-align: center
    display: flex
    flex-direction: column
    justify-content: center
    .weather-item
      font-size: 18px
      @media screen and (max-width: 1920px) {
        font-size: 14px
      }
    .weather-num
      font-weight: 600
      font-size: 24px
      color: $yellow
      @media screen and (max-width: 1920px) {
        font-size: 16px
      }
  &.weather-list2
    justify-content: flex-start
    .weather-li
      margin-right: 2.5%
.common-echarts-wrapper
  .common-echarts-box
    height: 16vh
    flex: 0 0 50%
    width: 50%
  .pm-box
    width: 80%
    height: 11vh
    padding: 2vh 1vw
    background: rgba(255,255,255,0.1)
    border-radius: 5px
    .pm-title
      font-size: 18px
      @media screen and (max-width: 1920px) {
        font-size: 14px
      }
    .pm-detail
      display: flex
      justify-content: space-between
      align-items: center
      font-size: 22px
      @media screen and (max-width: 1920px) {
        font-size: 16px
      }
      height: 4vh
    .pm-outer
      height: 1.5vh
      background: rgba(255,255,255,.2)
      .pm-inner
        height: 1.5vh
        width: 80%
        transform: skew(-30deg)
        background-image: linear-gradient(to left, rgba(74,204,129,1),rgba(74,204,129,0))
</style>
