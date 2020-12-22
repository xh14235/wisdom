<template>
  <div class="at-home">
    <div class="common-title">
      <div>智能家居</div>
    </div>
    <Select :options="select" @changeValue="changeSelect"></Select>
    <div class="home-type">
      <div class="type-box" v-for="(item, index) of homeList" :key="item.id">
        <div class="box" :class="{'active': item.active}" @click="changeHome(index)">
          <img :src="item.img" alt="">
          <div class="desc">
            <img v-if="item.active" src="../../../assets/img/home1.png" alt="">
            <img v-else src="../../../assets/img/home0.png" alt="">
            {{item.title}}
          </div>
        </div>
        <div class="list">
          <div class="list-item" v-for="li of item.list" :key="li.id">
            <img class="list-icon" :src="li.icon" alt="">
            <span class="list-num">{{li.num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="common-title">
      <div>家用能源统计</div>
    </div>
    <DateType @getDateType="changeDate"></DateType>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline v-if="lineData1.id" :lineData="lineData1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="lineData2.id" :lineData="lineData2"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="lineData3.id" :lineData="lineData3"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="lineData4.id" :lineData="lineData4"></Eline>
      </div>
      <div class="title-single">能源消费统计</div>
      <div class="statistics-wrap">
        <div class="statistics-left">
          <img class="img-outer rotate" src="../../../assets/img/statistics-rotate.png" alt="">
          <img class="img-inner" src="../../../assets/img/statistics-profit.png" alt="">
        </div>
        <div class="statistics-right">
          <div class="statistics-num">
            <span>{{parseInt(costList.UN_DIS_ELECTRICITY + costList.DIS_ELECTRICITY + costList.HOT_WATER + costList.COLD + costList.HOT).toLocaleString()}}</span>元
          </div>
          <img src="../../../assets/img/statistics-line.png" alt="">
          <p>累计消费</p>
        </div>
      </div>
      <div class="cost-list">
        <div class="cost-item">
          <img src="../../../assets/img/icon-green.png" alt="">
          <div class="cost-name">电费:</div>
          <div class="cost-num"><b>{{parseInt(costList.UN_DIS_ELECTRICITY + costList.DIS_ELECTRICITY).toLocaleString()}}</b>元</div>
        </div>
        <div class="cost-item">
          <img src="../../../assets/img/icon-yellow.png" alt="">
          <div class="cost-name">热水费:</div>
          <div class="cost-num"><b>{{parseInt(costList.HOT_WATER).toLocaleString()}}</b>元</div>
        </div>
        <div class="cost-item">
          <img src="../../../assets/img/icon-blue.png" alt="">
          <div class="cost-name">用冷费:</div>
          <div class="cost-num"><b>{{parseInt(costList.COLD).toLocaleString()}}</b>元</div>
        </div>
        <div class="cost-item">
          <img src="../../../assets/img/icon-red.png" alt="">
          <div class="cost-name">用热费:</div>
          <div class="cost-num"><b>{{parseInt(costList.HOT).toLocaleString()}}</b>元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import house1 from '../../../assets/img/house1.png'
import house2 from '../../../assets/img/house2.png'
import house3 from '../../../assets/img/house3.png'
import light from '../../../assets/img/light.png'
import conditioner from '../../../assets/img/air-conditioner.png'
import curtains from '../../../assets/img/curtains.png'
import bathtub from '../../../assets/img/bathtub.png'
import { mapState } from 'vuex'
import { homeenergy, homecost } from '@/request/athome-api'
export default {
  name: 'Athome',
  components: {
    DateType: () => import('@/common/components/DateType'),
    Eline: () => import('@/common/echarts/Eline'),
    Select: () => import('@/common/components/Select')
  },
  data () {
    return {
      homeList: [
        {
          id: '001',
          title: '节能型',
          img: house1,
          active: true,
          list: [
            {
              id: '01',
              icon: light,
              num: 3
            }
          ]
        },
        {
          id: '002',
          title: '舒适型',
          img: house2,
          active: false,
          list: [
            {
              id: '01',
              icon: light,
              num: 4
            },
            {
              id: '02',
              icon: curtains,
              num: 3
            }
          ]
        },
        {
          id: '003',
          title: '豪华型',
          img: house3,
          active: false,
          list: [
            {
              id: '01',
              icon: light,
              num: 5
            },
            {
              id: '02',
              icon: conditioner,
              num: 2
            },
            {
              id: '03',
              icon: bathtub,
              num: 1
            },
            {
              id: '04',
              icon: curtains,
              num: 3
            }
          ]
        }
      ],
      select: [
        {
          value: '1254300251431186436',
          label: '936能源馆'
        }
      ],
      lineData1: {},
      lineData2: {},
      lineData3: {},
      lineData4: {},
      dateType: 'day',
      chosenSelect: '',
      costList: {},
      hometimer: null,
      duration: 60000
    }
  },
  computed: {
    ...mapState({
      year: state => state.lists.year,
      month: state => state.lists.month,
      day: state => state.lists.day,
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      bgreen: state => state.color.bgreen,
      red: state => state.color.red,
      white: state => state.color.white,
      lgreen: state => state.color.lgreen,
      ifr: state => state.map.ifr,
      rightTimer: state => state.rightTimer
    })
  },
  methods: {
    changeSelect (chosen) {
      this.chosenSelect = chosen.value
      this.getEcharts()
      this.getCostList()
    },
    changeHome (index) {
      for (let i = 0; i < this.homeList.length; i++) {
        this.homeList[i].active = false
      }
      this.homeList[index].active = true
      switch (index) {
        case 0:
          this.ifr.setPowerBuilding('节能')
          break
        case 1:
          this.ifr.setPowerBuilding('常规')
          break
        case 2:
          this.ifr.setPowerBuilding('豪华')
          break
        default:
          break
      }
    },
    changeDate (code) {
      this.dateType = code
      this.getEcharts()
      this.getCostList()
    },
    // 获取家用能源统计 折线图 数据 冷热水电
    getEcharts () {
      let date
      switch (this.dateType) {
        case 'year':
          date = this.year
          break
        case 'month':
          date = this.month
          break
        case 'day':
          date = this.day
          break
        default:
          break
      }
      homeenergy({
        buildingFacilitySubId: this.chosenSelect,
        dateType: this.dateType
      }).then((res) => {
        let data = res.data.data
        this.lineData1 = {
          id: 'home1',
          title: '用电',
          legendShow: false,
          legendData: ['水'],
          color: [this.green],
          areaColor: false,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.ELECTRICITY).slice(0, date.length)]
        }
        this.lineData2 = {
          id: 'home2',
          title: '用热水',
          legendShow: false,
          legendData: ['水'],
          color: [this.yellow],
          areaColor: false,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.HOT_WATER).slice(0, date.length)]
        }
        this.lineData3 = {
          id: 'home3',
          title: '用冷',
          legendShow: false,
          legendData: ['冷', '热'],
          color: [this.blue],
          areaColor: false,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.COLD).slice(0, date.length)]
        }
        this.lineData4 = {
          id: 'home4',
          title: '用热',
          legendShow: false,
          legendData: ['水', '电'],
          color: [this.red],
          areaColor: false,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.HOT).slice(0, date.length)]
        }
      })
    },
    // 获取能源消费统计的数据 冷热水电费 及 累计消费
    getCostList () {
      homecost({
        buildingFacilitySubId: this.chosenSelect,
        dateType: this.dateType
      }).then((res) => {
        this.costList = res.data
      })
    },
    // 地图方法
    gisMethods () {
      this.ifr.clearMarks()
      let markData = this.ifr.markConfig['homeFurnishing']
      let positionData = this.ifr.sceneCenterConfig['homeFurnishing']
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
      // 隐藏热力图
      this.ifr.showPeopleHeatingItem([])
      // 隐藏能留图
      this.ifr.activePipeNetWork('false')
      // 清除道路状态
      let road = localStorage.road.split(',')
      road.forEach(item => {
        this.ifr.setRoadStatus(item + '_0')
      })
    }
  },
  // 页面切换时，停止或重启定时器
  activated () {
    this.chosenSelect = this.select[0].value
    this.getEcharts()
    this.getCostList()
    this.changeHome(0)
    if (this.rightTimer) {
      this.gisMethods()
    }
    if (this.hometimer) clearInterval(this.hometimer)
    this.hometimer = setInterval(() => {
      this.getEcharts()
      this.getCostList()
    }, this.duration)
  },
  deactivated () {
    clearInterval(this.hometimer)
    this.hometimer = null
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.select-wrapper, .date-type
  position: relative
  left: 16vw
  top: -3.5vh
.home-type
  display: flex
  justify-content: space-around
  margin: 1vh 0
  .type-box
    flex: 0 0 14vh
    width: 14vh
    .box
      width: 14vh
      height: 14vh
      // text-align: center
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      &.active
        background-image: url('../../../assets/img/athome.png')
        background-size: 100% 100%
      img
        width: 3vw
        // height: 7.75vh
        vertical-align: bottom
      .desc
        display: flex
        justify-content: center
        align-items: center
        margin-top: 0.5vh
        img
          width: 20px
          height: 20px
          margin-right: 5px
          @media screen and (max-width: 1920px) {
            width: 15px
            height: 15px
          }
    .list
      width: 14vh
      display: flex
      justify-content: center
      align-items: center
      .list-item
        flex: 0 0 25%
        width: 25%
        height: 3vh
        margin-bottom: 2vh
        display: flex
        align-items: center
        img
          @media screen and (max-width: 1920px) {
            width: 15px
          }
        span
          color: $green
.common-echarts-wrapper
  .common-echarts-box
    height: 18vh
    margin-bottom: 3vh
  .title-single
    flex: 0 0 100%
    width: 100%
    font-weight: 600
    color: $lgreen
    margin-bottom: 1.33333vh
  .statistics-wrap
    display: flex
    justify-content: space-between
    align-items: center
    width: 6vw
    height: 8vh
    border-top: 1px solid rgba(69, 79, 73, 1)
    border-bottom: 1px solid rgba(69, 79, 73, 1)
    .statistics-left
        position: relative
        width: 5.75vh
        height: 5.75vh
        flex: 0 0 5.75vh
        @media screen and (max-width: 1920px) {
          width: 4vh
          height: 4vh
          flex: 0 0 4vh
        }
        .img-outer
          position: absolute
          width: 5.75vh
          height: 5.75vh
          top: 0
          left: 0
          @media screen and (max-width: 1920px) {
            width: 4vh
            height: 4vh
          }
        .img-inner
          position: absolute
          width: 2.5vh
          height: 2.5vh
          top: 50%
          left: 50%
          transform: translate(-1.25vh, -1.25vh)
          @media screen and (max-width: 1920px)
            width: 2vh
            height: 2vh
            transform: translate(-1vh, -1vh)
      .statistics-right
        display: flex
        flex-direction: column
        justify-content: center
        font-size: 14px
        img
          width: 100%
        @media screen and (max-width: 1920px)
          font-size: 12px
        .statistics-num
          span
            font-size: 24px
            font-weight: 600
            color: $yellow
            @media screen and (max-width: 1920px)
              font-size: 16px
  .cost-list
    flex: 0 0 12vw
    width: 12vw
    height: 8vh
    padding: 10px 0
    border-top: 1px solid rgba(69, 79, 73, 1)
    border-bottom: 1px solid rgba(69, 79, 73, 1)
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    align-items: center
    .cost-item
      flex: 0 0 45%
      width: 45%
      height: 50%
      display: flex
      justify-content: space-between
      align-items: center
      color: $lgreen
      img
        @media screen and (max-width: 1920px){
          width: 7px
          height: 7px
        }
      .cost-num
        flex: 0 0 50%
        width: 50%
        text-align: right
        b
          color: $yellow
</style>
