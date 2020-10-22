<template>
  <div class="wrapper">
    <div class="common-pages">
      <div class="common-page" v-if="tab === 0">
        <transition name="fade" mode="out-in">
          <div>
            <Conhead :list="datahead"></Conhead>
            <Confirst :list="datafirst" v-if="nextlevel[1].active"></Confirst>
          </div>
        </transition>
      </div>
      <div class="common-page" v-else-if="tab === 1">
        <transition name="fade" mode="out-in">
          <Consecond :list="datasecond" @changeDate2="changeDate2" @changeSelect2="changeSelect2"></Consecond>
        </transition>
      </div>
      <div class="common-page" v-else>
        <transition name="fade" mode="out-in">
          <Conthird :list="datathird" @changeDate3="changeDate3" @changeSelect3="changeSelect3"></Conthird>
        </transition>
      </div>
    </div>
    <div class="common-tab" v-if="nextlevel[1].active">
      <span :class="{'active': tab === index}" v-for="(item, index) of list" :key="item.id" @click="changeTab(index, item.title)">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getTestList } from '@/request/common-api.js'
import { conusedline, conusedpie, consecondbar, supcold, suphotwater, supelectry, suphot, concomparebuilding, conelectric } from '@/request/consumption-api'
export default {
  name: 'Consumption',
  components: {
    DateType: () => import('@/common/components/DateType'),
    Conhead: () => import('./consumption/Conhead'),
    Confirst: () => import('./consumption/Confirst'),
    Consecond: () => import('./consumption/Consecond'),
    Conthird: () => import('./consumption/Conthird')
  },
  data () {
    return {
      tab: 0,
      contimer: null,
      duration: 60000,
      dateType2: 'day',
      dateType3: 'day',
      building2: '1254292656272252928',
      building3: '1254300251426992128',
      list: [
        {
          id: '01',
          title: '24小时监测'
        },
        {
          id: '02',
          title: '消费排行榜'
        },
        {
          id: '03',
          title: '消费个体'
        }
      ],
      datahead: {
        echarts1: {},
        echarts2: {}
      },
      datafirst: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {}
      },
      datasecond: {
        echarts1: [],
        echarts2: [],
        echarts3: [],
        echarts4: [],
        echarts5: {}
      },
      datathird: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {}
      }
    }
  },
  props: {
    nextlevel: Array,
    isOpened: Number
  },
  computed: {
    levelActive () {
      return this.nextlevel[1].active
    },
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
      iconHeight: state => state.map.iconHeight,
      jumpTime: state => state.map.jumpTime,
      viewX: state => state.map.viewX,
      viewY: state => state.map.viewY,
      viewZ: state => state.map.viewZ
    })
  },
  methods: {
    // 根据年月日组件传来的日期类型改变视图
    changeDate2 (date) {
      this.dateType2 = date
      this.consecondbar()
      this.supelectry()
      this.supcold()
      this.suphot()
      this.suphotwater()
    },
    changeDate3 (date) {
      this.dateType3 = date
      this.concomparebuilding()
      this.conthird2()
      this.conthird3()
    },
    // 根据下拉框组件传来的数据改变视图
    changeSelect2 (chosen) {
      this.building2 = chosen.id
      this.consecondbar()
      this.supelectry()
      this.supcold()
      this.suphot()
      this.suphotwater()
    },
    changeSelect3 (item) {
      this.building3 = item.id
      // 下拉框关联地图
      this.ifr.clearMarks()
      let markData = []
      let arr = this.ifr.markConfig.Watching24
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].Name.includes(item.name)) {
          // console.log(index)
          markData.push(arr[index])
        }
      }
      this.ifr.setMarkData(markData)
      this.ifr.setCameraSettingWithCoordinate(this.ifr.sceneCenterConfig['Watching24'])

      this.concomparebuilding()
      this.conthird2()
      this.conthird3()
    },
    // 分页切换，显示不同内容
    changeTab (index, title) {
      this.tab = index
      this.$emit('changeTitle', title)
      if (this.contimer) clearInterval(this.contimer)
      switch (index) {
        case 0:
          if (this.getBool(this.datahead) && this.getBool(this.datafirst)) {
            this.conusedline()
            this.conusedpie()
            // this.allBuildings()
            this.contimer = setInterval(() => {
              this.conusedline()
              this.conusedpie()
              this.allBuildings()
            }, this.duration)
          }
          break
        case 1:
          if (this.getBool(this.datasecond)) {
            if (this.building2) {
              this.consecondbar()
              this.supelectry()
              this.suphotwater()
              this.supcold()
              this.suphot()
            }
            this.contimer = setInterval(() => {
              this.consecondbar()
              this.supelectry()
              this.suphotwater()
              this.supcold()
              this.suphot()
            }, this.duration)
          }
          break
        case 2:
          if (this.getBool(this.datathird)) {
            if (this.building3) {
              this.concomparebuilding()
              this.conthird2()
              this.conthird3()
            }
            this.contimer = setInterval(() => {
              this.concomparebuilding()
              this.conthird2()
              this.conthird3()
            }, this.duration)
          }
          break
        default:
          break
      }
    },
    // 判断分页数据是否为空，返回boolean
    getBool (obj) {
      let boo = 0
      for (let item in obj) {
        boo += Object.keys(obj[item]).length
      }
      if (boo === obj.length) {
        return false
      } else {
        return true
      }
    },
    // 24小时监测 供电、冷、热、热水 折线图 消费数据
    conusedline () {
      conusedline().then((res) => {
        const timeType = this.day
        const cold = Object.values(res.data.COLD).slice(0, this.day.length)
        const hot = Object.values(res.data.HOT).slice(0, this.day.length)
        const hotWater = Object.values(res.data.HOT_WATER).slice(0, this.day.length)
        const electry = Object.values(res.data.ELECTRICITY).slice(0, this.day.length)
        this.datahead.echarts1 = {
          id: 'suphead1',
          title: '',
          legendShow: false,
          legendData: ['用电'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: timeType,
          yName: '(kWh)',
          data: [electry]
        }
        this.datafirst.echarts1 = {
          id: 'supfirst1',
          title: '用热水',
          legendShow: false,
          legendData: ['用热水'],
          color: [this.yellow],
          areaColor: true,
          itemStyle: true,
          xData: timeType,
          yName: '(kWh)',
          data: [hotWater]
        }
        this.datafirst.echarts3 = {
          id: 'supfirst3',
          title: '用冷',
          legendShow: false,
          legendData: ['用冷'],
          color: [this.blue],
          areaColor: true,
          itemStyle: true,
          xData: timeType,
          yName: '(kWh)',
          data: [cold]
        }
        this.datafirst.echarts5 = {
          id: 'supfirst5',
          title: '用热',
          legendShow: false,
          legendData: ['用热'],
          color: [this.red],
          areaColor: true,
          itemStyle: true,
          xData: timeType,
          yName: '(kWh)',
          data: [hot]
        }
      })
    },
    // 所有建筑供能值
    allBuildings () {
      let promise = new Promise((resolve, reject) => {
        let data = [77, 91, 57]
        resolve(data)
      })
      promise.then(res => {
        // let time = new Date()
        // let hour = time.getHours() + 1
        this.ifr.clearMarks()
        let markData = this.ifr.markConfig['Watching24']
        markData[0].Other = [
          {
            'Key': '供能值',
            'Value': res[0] + 'kWh'
          }
        ]
        markData[1].Other = [
          {
            'Key': '供能值',
            'Value': res[1] + 'kWh'
          }
        ]
        markData[2].Other = [
          {
            'Key': '供能值',
            'Value': res[2] + 'kWh'
          }
        ]
        let positionData = this.ifr.sceneCenterConfig['Watching24']
        this.ifr.setCameraSettingWithCoordinate(positionData)
        this.ifr.setMarkData(markData)
      })
    },
    // 24小时监测 供电、冷、热、热水 饼图 消费分类数据
    conusedpie () {
      let time = new Date()
      let hour = time.getHours()
      conusedpie({
        hour: hour
      }).then((res) => {
        const cold = res.data.COLD
        const hot = res.data.HOT
        const hotWater = res.data.HOT_WATER
        const electry = res.data.ELECTRICITY
        let coldSum = parseInt(cold.AGRICULTURE + cold.HOME_STAY + cold.HOUSE + cold.INDUSTRY + cold.PUBLIC_CONSTRUCTION)
        let hotSum = parseInt(hot.AGRICULTURE + hot.HOME_STAY + hot.HOUSE + hot.INDUSTRY + hot.PUBLIC_CONSTRUCTION)
        let hotWaterSum = parseInt(hotWater.AGRICULTURE + hotWater.HOME_STAY + hotWater.HOUSE + hotWater.INDUSTRY + hotWater.PUBLIC_CONSTRUCTION)
        let electrySum = parseInt(electry.AGRICULTURE + electry.HOME_STAY + electry.HOUSE + electry.INDUSTRY + electry.PUBLIC_CONSTRUCTION)
        this.datahead.echarts2 = {
          id: 'suphead2',
          title: '{name|用电}\n{value|' + electrySum + '}{unit|kWh}',
          titleTop: '27%',
          titleLeft: '48%',
          legendShow: true,
          borderWidth: false,
          labelShow: true,
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: [this.green, this.yellow, this.blue, this.red, this.bgreen],
          data: [
            { value: electry.AGRICULTURE, name: '农业' },
            { value: electry.PUBLIC_CONSTRUCTION, name: '共建' },
            { value: electry.INDUSTRY, name: '产业' },
            { value: electry.HOUSE, name: '民宅' },
            { value: electry.HOME_STAY, name: '民宿' }
          ]
        }
        this.datafirst.echarts2 = {
          id: 'supfirst2',
          title: '{name|用热水}\n{value|' + hotWaterSum + '}{unit|kWh}',
          titleTop: '27%',
          titleLeft: '48%',
          legendShow: true,
          borderWidth: false,
          labelShow: true,
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: [this.green, this.yellow, this.blue, this.red, this.bgreen],
          data: [
            { value: hotWater.AGRICULTURE, name: '农业' },
            { value: hotWater.HOME_STAY, name: '民宿' },
            { value: hotWater.INDUSTRY, name: '产业' },
            { value: hotWater.PUBLIC_CONSTRUCTION, name: '公建' },
            { value: hotWater.HOUSE, name: '民宅' }
          ]
        }
        this.datafirst.echarts4 = {
          id: 'supfirst4',
          title: '{name|用冷}\n{value|' + coldSum + '}{unit|kWh}',
          titleTop: '27%',
          titleLeft: '48%',
          legendShow: true,
          borderWidth: false,
          labelShow: true,
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: [this.green, this.yellow, this.blue, this.red, this.bgreen],
          data: [
            { value: cold.AGRICULTURE, name: '农业' },
            { value: cold.HOME_STAY, name: '民宿' },
            { value: cold.INDUSTRY, name: '产业' },
            { value: cold.PUBLIC_CONSTRUCTION, name: '公建' },
            { value: cold.HOUSE, name: '民宅' }
          ]
        }
        this.datafirst.echarts6 = {
          id: 'suphead6',
          title: '{name|用热}\n{value|' + hotSum + '}{unit|kWh}',
          titleTop: '27%',
          titleLeft: '48%',
          legendShow: true,
          borderWidth: false,
          labelShow: true,
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: [this.green, this.yellow, this.blue, this.red, this.bgreen],
          data: [
            { value: hot.AGRICULTURE, name: '农业' },
            { value: hot.HOME_STAY, name: '民宿' },
            { value: hot.INDUSTRY, name: '产业' },
            { value: hot.PUBLIC_CONSTRUCTION, name: '公建' },
            { value: hot.HOUSE, name: '民宅' }
          ]
        }
      })
    },
    // 消费排行榜 能源消费方向 数据
    consecondbar () {
      consecondbar({
        dateType: this.dateType2
      }).then((res) => {
        let data = res.data
        let AGRICULTURE = []
        let HOME_STAY = []
        let HOUSE = []
        let INDUSTRY = []
        let PUBLIC_CONSTRUCTION = []
        for (let i in data) {
          AGRICULTURE.push(data[i].AGRICULTURE)
          HOME_STAY.push(data[i].HOME_STAY)
          HOUSE.push(data[i].HOUSE)
          INDUSTRY.push(data[i].INDUSTRY)
          PUBLIC_CONSTRUCTION.push(data[i].PUBLIC_CONSTRUCTION)
        }
        this.datasecond.echarts5 = {
          id: 'consecond1',
          title: '',
          legendShow: true,
          itemStyle: 2,
          barWidth: 15,
          legendData: ['民宅', '民宿', '公建', '产业', '设施'],
          color: [this.blue, this.yellow, this.green, this.red, this.bgreen],
          xData: ['电', '热水', '冷', '热'],
          yName: '(kWh)',
          data: [HOUSE, HOME_STAY, PUBLIC_CONSTRUCTION, INDUSTRY, AGRICULTURE]
        }
      })
    },
    // 用冷 消费排行榜
    supcold () {
      supcold({
        buildingFacilityId: this.building2,
        dateType: this.dateType2,
        topNum: 20
      }).then((res) => {
        this.datasecond.echarts3 = res.data
      })
    },
    // 用电 消费排行榜
    supelectry () {
      supelectry({
        buildingFacilityId: this.building2,
        dateType: this.dateType2,
        topNum: 20
      }).then((res) => {
        this.datasecond.echarts1 = res.data
      })
    },
    // 用热水 消费排行榜
    suphotwater () {
      suphotwater({
        buildingFacilityId: this.building2,
        dateType: this.dateType2,
        topNum: 10
      }).then((res) => {
        this.datasecond.echarts2 = res.data
        // console.log(this.datasecond.echarts2)
      })
    },
    // 用热 消费排行榜
    suphot () {
      suphot({
        buildingFacilityId: this.building2,
        dateType: this.dateType2,
        topNum: 20
      }).then((res) => {
        this.datasecond.echarts4 = res.data
      })
    },
    // 消费个体 各建筑 冷热水电消费情况 折线图 数据
    concomparebuilding (num) {
      let date
      switch (this.dateType3) {
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
      concomparebuilding({
        buildingFacilitySubId: this.building3,
        dateType: this.dateType3
      }).then((res) => {
        const data = res.data
        this.datathird.echarts1 = {
          id: 'conthird1',
          title: '用电统计',
          legendShow: false,
          legendData: ['热水'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.ELECTRICITY)]
        }
        this.datathird.echarts2 = {
          id: 'conthird2',
          title: '用热水统计',
          legendShow: false,
          legendData: ['热水'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.HOT_WATER)]
        }
        this.datathird.echarts3 = {
          id: 'conthird3',
          title: '用冷统计',
          legendShow: false,
          legendData: ['热水'],
          color: [this.blue],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.COLD)]
        }
        this.datathird.echarts4 = {
          id: 'conthird4',
          title: '用热统计',
          legendShow: false,
          legendData: ['热水'],
          color: [this.red],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.HOT)]
        }
      })
    },
    // 消费个体 峰谷平 柱状图 数据
    conthird2 () {
      let date
      let length
      switch (this.dateType3) {
        case 'year':
          date = this.year
          length = 12
          break
        case 'month':
          date = this.month
          length = 30
          break
        case 'day':
          date = this.day
          length = 24
          break
        default:
          break
      }
      this.datathird.echarts5 = {
        id: 'conthird5',
        title: '峰谷平',
        legendShow: true,
        itemStyle: 1,
        legendData: ['峰电量', '谷电量', '平电量'],
        stack: '峰谷平',
        color: [this.green, this.yellow, this.blue],
        xData: date,
        yName: '(kWh)',
        data: [getTestList(20, length), getTestList(20, length), getTestList(20, length)]
      }
    },
    // 消费个体 用电组成占比折线图
    conthird3 () {
      conelectric().then((res) => {
        this.datathird.echarts6 = {
          id: 'conthird6',
          title: '用电组成占比',
          legendShow: true,
          legendData: ['外来电', '分布式能源'],
          color: [this.green, this.yellow],
          areaColor: false,
          smooth: true,
          xData: this.day,
          yName: '(kW)',
          data: [Object.values(res.data.FOREIGN_ELECTRICITY).slice(0, this.day.length), Object.values(res.data.ELECTRICITY).slice(0, this.day.length)]
        }
      })
    },
    // 地图方法
    gisMethods (index) {
      this.ifr.clearMarks()
      let markData = []
      let positionData = {}
      switch (index) {
        case 0:
          markData = this.ifr.markConfig['Watching24']
          positionData = this.ifr.sceneCenterConfig['Watching24']
          break
        case 1:
          markData = this.ifr.markConfig['Watching24']
          positionData = this.ifr.sceneCenterConfig['Watching24']
          break
        case 2:
          markData = this.ifr.markConfig['Watching24']
          positionData = this.ifr.sceneCenterConfig['Watching24']
          break
        default:
          break
      }
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
    }
  },
  watch: {
    levelActive () {
      this.tab = 0
    },
    isOpened () {
      if (this.isOpened === 1) {
        console.log(1)
        this.allBuildings()
      }
    }
  },
  mounted () {
    this.changeTab(0, this.list[0].title)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.contimer)
    this.contimer = null
  },
  activated () {
    if (this.contimer) clearInterval(this.contimer)
    switch (this.tab) {
      case 0:
        this.contimer = setInterval(() => {
          this.conusedline()
          this.conusedpie()
        }, this.duration)
        break
      case 1:
        this.contimer = setInterval(() => {
          this.consecondbar()
          this.supelectry()
          this.suphotwater()
          this.supcold()
          this.suphot()
        }, this.duration)
        break
      case 2:
        this.contimer = setInterval(() => {
          this.concomparebuilding()
          this.conthird2()
          this.conthird3()
        }, this.duration)
        break
      default:
        break
    }
  },
  beforeDestroy () {
    clearInterval(this.contimer)
    this.contimer = null
  }
}
</script>

<style scoped lang="stylus">
.wrapper
  width: 100%
  height: 86.5vh
  overflow hidden
  position: relative
</style>
