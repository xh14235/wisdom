<template>
  <div class="wrapper">
    <div class="common-pages">
      <div class="common-page" v-if="tab === 0">
        <transition name="fade" mode="out-in">
          <div>
            <Anahead :list="datahead"></Anahead>
            <Anafirst :list="datafirst" @add="add" @mut="mut" v-if="nextlevel[2].active" @changeSelect1="changeSelect1"></Anafirst>
          </div>
        </transition>
      </div>
      <div class="common-page" v-else-if="tab === 1">
        <transition name="fade" mode="out-in">
          <Anasecond :list="datasecond" @changeDate2="changeDate2" @changeSelect2="changeSelect2"></Anasecond>
        </transition>
      </div>
      <div class="cmmmon-page" v-else>
        <transition name="fade" mode="out-in">
          <Anathird :list="datathird" @changeDate3="changeDate3" @changeSelect31="changeSelect31" @changeSelect32="changeSelect32"></Anathird>
        </transition>
      </div>
    </div>
    <div class="common-tab" v-if="nextlevel[2].active">
      <span :class="{'active': tab === index}" v-for="(item, index) of list" :key="item.id" @click="changeTab(index, item.title)">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getTestList } from '@/request/common-api.js'
import { concomparebuilding } from '@/request/consumption-api.js'
import { anaRadar, anaAbnormalNum, anaAbnormalType, anaAbnormalList, anaNewestSeq, anaAbnormalSeq, anacompareday } from '@/request/analysis-api'
export default {
  name: 'Analysis',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    DateType: () => import('@/common/components/DateType'),
    Anahead: () => import('./analysis/Anahead'),
    Anafirst: () => import('./analysis/Anafirst'),
    Anasecond: () => import('./analysis/Anasecond'),
    Anathird: () => import('./analysis/Anathird')
  },
  data () {
    return {
      tab: 0,
      analysistimer: null,
      duration: 60000,
      dateType2: 'day',
      dateType3: 'day',
      building1: '1254300251426992128',
      building2: '1254300251426992128',
      building31: '1254300251426992128',
      building32: '1254300251426992129',
      list: [
        {
          id: '01',
          title: '用能异常'
        },
        {
          id: '02',
          title: '用能分析'
        },
        {
          id: '03',
          title: '用能对比'
        }
      ],
      datahead: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        statistics1: {},
        statistics2: {}
      },
      datafirst: {
        abnormalType: [],
        abnormalDetail: [],
        abnormalEnergy: []
      },
      datasecond: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts9: {},
        echarts10: {},
        echarts11: {},
        echarts12: {}
      },
      datathird: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {},
        echarts7: {},
        echarts8: {}
      },
      compare1: {},
      compare2: {},
      legend1: '今天',
      legend2: '昨天',
      compareBuilding1: '936能源馆',
      compareBuilding2: '915彩绘馆',
      seq: ''
    }
  },
  props: {
    nextlevel: Array
  },
  computed: {
    levelActive () {
      return this.nextlevel[2].active
    },
    ...mapState({
      year: state => state.lists.year,
      month: state => state.lists.month,
      day: state => state.lists.day,
      defaultDay: state => state.lists.defaultDay,
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
    changeDate2 (code) {
      this.dateType2 = code
      this.anasecond1()
    },
    changeDate3 (code) {
      this.dateType3 = code
      switch (this.dateType3) {
        case 'day':
          this.legend1 = '今天'
          this.legend2 = '昨天'
          break
        case 'month':
          this.legend1 = '本月'
          this.legend2 = '上月'
          break
        case 'year':
          this.legend1 = '今年'
          this.legend2 = '去年'
          break
        default:
          break
      }
      this.anathird1()
      this.getcompare2()
    },
    // 根据下拉框组件传来的数据改变视图
    changeSelect1 (code) {
      this.building1 = code.id
      // 下拉框关联地图
      this.ifr.clearMarks()
      let markData = []
      let arr = this.ifr.markConfig.Watching24
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].Name.includes(code.name)) {
          // console.log(index)
          markData.push(arr[index])
        }
      }
      this.ifr.setMarkData(markData)
      this.ifr.setCameraSettingWithCoordinate(this.ifr.sceneCenterConfig['Watching24'])

      this.anafirst3()
    },
    changeSelect2 (code) {
      this.building2 = code.id
      // 下拉框关联地图
      this.ifr.clearMarks()
      let markData = []
      let arr = this.ifr.markConfig.Watching24
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].Name.includes(code.name)) {
          // console.log(index)
          markData.push(arr[index])
        }
      }
      this.ifr.setMarkData(markData)
      this.ifr.setCameraSettingWithCoordinate(this.ifr.sceneCenterConfig['Watching24'])

      this.anasecond1()
    },
    changeSelect31 (code) {
      this.building31 = code.id
      this.compareBuilding1 = code.name
      // 下拉框关联地图
      this.ifr.clearMarks()
      let markData = []
      let arr = this.ifr.markConfig.Watching24
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].Name.includes(code.name)) {
          // console.log(index)
          markData.push(arr[index])
        }
      }
      this.ifr.setMarkData(markData)
      this.ifr.setCameraSettingWithCoordinate(this.ifr.sceneCenterConfig['Watching24'])

      this.anathird1()
    },
    changeSelect32 (code) {
      this.building32 = code.id
      this.compareBuilding2 = code.name
      // 下拉框关联地图
      this.ifr.clearMarks()
      let markData = []
      let arr = this.ifr.markConfig.Watching24
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].Name.includes(code.name)) {
          // console.log(index)
          markData.push(arr[index])
        }
      }
      this.ifr.setMarkData(markData)
      this.ifr.setCameraSettingWithCoordinate(this.ifr.sceneCenterConfig['Watching24'])

      this.getcompare2()
    },
    // 消费个体 用能异常 查看上一个异常信息
    mut (index, nownum) {
      if (this.datafirst.abnormalEnergy[index].nownum > 1) {
        this.datafirst.abnormalEnergy[index].nownum--
        this.getNewDetailBySeq(index, nownum)
      }
    },
    // 消费个体 用能异常 查看下一个异常信息
    add (index, nownum) {
      if (this.datafirst.abnormalEnergy[index].nownum < this.datafirst.abnormalEnergy[index].allnum) {
        this.datafirst.abnormalEnergy[index].nownum++
        this.getNewDetailBySeq(index, nownum)
      }
    },
    // 消费个体 用能异常 列表获取
    getNewDetailBySeq (index, nownum) {
      let energyType
      switch (index) {
        case 0:
          energyType = 'ELECTRIC'
          break
        case 1:
          energyType = 'HOT_WATER'
          break
        case 2:
          energyType = 'COLD'
          break
        case 3:
          energyType = 'HOT'
          break
        default:
          break
      }
      anaAbnormalSeq({
        buildingFacilitySubId: '1254300251431186436',
        consumerType: energyType,
        seq: nownum
      }).then((res) => {
        console.log(res)
      })
    },
    // 分页切换，显示不同内容
    changeTab (index, title) {
      this.tab = index
      this.$emit('changeTitle', title)
      if (this.analysistimer) clearInterval(this.analysistimer)
      switch (index) {
        case 0:
          if (this.getBool(this.datahead) && this.getBool(this.datafirst)) {
            this.anahead1()
            this.anahead2()
            this.anafirst1()
            this.anafirst2()
            if (this.building1) {
              this.anafirst3()
            }
            this.analysistimer = setInterval(() => {
              this.anahead1()
              this.anahead2()
              this.anafirst1()
              this.anafirst2()
              this.anafirst3()
            }, this.duration)
          }
          break
        case 1:
          if (this.getBool(this.datasecond)) {
            if (this.building2) {
              this.anasecond1()
            }
            this.anasecond3()
            this.analysistimer = setInterval(() => {
              this.anasecond1()
              this.anasecond3()
            }, this.duration)
          }
          break
        case 2:
          if (this.getBool(this.datasecond)) {
            if (this.building31) {
              this.anathird1()
              this.getcompare2()
            }
            this.analysistimer = setInterval(() => {
              this.anathird1()
              this.getcompare2()
            }, this.duration)
          }
          break
        default:
          break
      }
      // this.gisMethods(index)
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
    // 获取用能异常 四个雷达图 数据
    anahead1 () {
      let time = new Date()
      let hour = time.getHours()
      anaRadar({
        hour: hour
      }).then((res) => {
        this.datahead.echarts1 = {
          id: 'anahead1',
          name: '电',
          color: this.green,
          data: [{
            value: Object.values(res.data.ELECTRICITY),
            name: '电'
          }]
        }
        this.datahead.echarts2 = {
          id: 'anahead2',
          name: '热水',
          color: this.yellow,
          data: [{
            value: Object.values(res.data.HOT_WATER),
            name: '热水'
          }]
        }
        this.datahead.echarts3 = {
          id: 'anahead3',
          name: '冷',
          color: this.blue,
          data: [{
            value: Object.values(res.data.COLD),
            name: '冷'
          }]
        }
        this.datahead.echarts4 = {
          id: 'anahead4',
          name: '热',
          color: this.red,
          data: [{
            value: Object.values(res.data.HOT),
            name: '热'
          }]
        }
      })
    },
    // 获取用能异常 统计数据 冷热水单异常次数
    anahead2 () {
      let date = new Date()
      let year = date.getFullYear()
      anaAbnormalNum({
        year: year
      }).then((res) => {
        // console.log(res)
        this.datahead.statistics1 = {
          alluser: res.data.totalUser,
          allnum: res.data.timeValue,
          average: res.data.timeValue / res.data.totalUser
        }
        this.datahead.statistics2 = {
          electric: res.data.ELECTRICITY,
          hotwater: res.data.HOT_WATER,
          cold: res.data.COLD,
          hot: res.data.HOT
        }
      })
    },
    // 用能异常类型 类型统计 业务调整等类型
    anafirst1 () {
      anaAbnormalType().then((res) => {
        this.datafirst.abnormalType = res.data
      })
    },
    // 用能异常 列表 详情 数据
    anafirst2 () {
      anaAbnormalList({
        page: 1,
        size: 10
      }).then((res) => {
        this.datafirst.abnormalDetail = res.data
      })
    },
    // 获取用能异常 统计数据 冷热水单异常及上次下次查看
    anafirst3 () {
      anaNewestSeq({
        buildingFacilitySubId: this.building1
      }).then((res) => {
        // console.log(res)
      })
      this.datafirst.abnormalEnergy = [
        {
          id: '001',
          title: '电',
          time: '2020/02/02 12:12',
          basic: '100',
          change: '20%',
          allnum: 5,
          nownum: 1
        },
        {
          id: '002',
          title: '热水',
          time: '2020/02/02 12:12',
          basic: '100',
          change: '20%',
          allnum: 5,
          nownum: 2
        },
        {
          id: '003',
          title: '冷',
          time: '2020/02/02 12:12',
          basic: '100',
          change: '20%',
          allnum: 5,
          nownum: 1
        },
        {
          id: '004',
          title: '热',
          time: '2020/02/02 12:12',
          basic: '100',
          change: '20%',
          allnum: 5,
          nownum: 1
        }
      ]
    },
    // 能源分析 用电统计、用热水统计、用冷统计、用热统计 折线图 数据
    anasecond1 () {
      let date
      switch (this.dateType2) {
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
        buildingFacilitySubId: this.building2,
        dateType: this.dateType2
      }).then((res) => {
        const data = res.data
        this.datasecond.echarts1 = {
          id: 'anasecond1',
          title: '用电统计',
          legendShow: false,
          legendData: ['热水'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(data.ELECTRICITY).slice(0, date.length)]
        }
        this.datasecond.echarts2 = {
          id: 'anasecond2',
          title: '用热水统计',
          legendShow: false,
          legendData: ['热水'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(data.HOT_WATER).slice(0, date.length)]
        }
        this.datasecond.echarts3 = {
          id: 'anasecond3',
          title: '用冷统计',
          legendShow: false,
          legendData: ['热水'],
          color: [this.blue],
          areaColor: true,
          smooth: true,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(data.COLD).slice(0, date.length)]
        }
        this.datasecond.echarts4 = {
          id: 'anasecond4',
          title: '用热统计',
          legendShow: false,
          legendData: ['热水'],
          color: [this.red],
          areaColor: true,
          smooth: true,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(data.HOT).slice(0, date.length)]
        }
      })
    },
    // 能源分析 用电统计、用热水统计、用冷统计、用热统计 折线图 未来24小时预测数据
    anasecond3 () {
      this.datasecond.echarts9 = {
        id: 'anasecond9',
        title: '用电',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.green],
        areaColor: false,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datasecond.echarts10 = {
        id: 'anasecond10',
        title: '用热水',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.green],
        areaColor: false,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datasecond.echarts11 = {
        id: 'anasecond11',
        title: '用冷',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.yellow],
        areaColor: false,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datasecond.echarts12 = {
        id: 'anasecond12',
        title: '用热',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.yellow],
        areaColor: false,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
    },
    // 用能对比 历史对比 冷热水电 数据对比
    anathird1 () {
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
      anacompareday({
        buildingFacilitySubId: this.building31,
        dateType: this.dateType3
      }).then((res) => {
        let LastValue = res.data.LastValue
        let ThisValue = res.data.ThisValue
        this.datathird.echarts1 = {
          id: 'anathird1',
          title: '用电',
          legendShow: true,
          legendData: [this.legend1, this.legend2],
          smooth: true,
          color: [this.green, this.white],
          areaColor: false,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(ThisValue.ELECTRICITY).slice(0, date.length), Object.values(LastValue.ELECTRICITY).slice(0, date.length)]
        }
        this.datathird.echarts2 = {
          id: 'anathird2',
          title: '用热水',
          legendShow: true,
          legendData: [this.legend1, this.legend2],
          smooth: true,
          color: [this.yellow, this.white],
          areaColor: false,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(ThisValue.HOT_WATER).slice(0, date.length), Object.values(LastValue.HOT_WATER).slice(0, date.length)]
        }
        this.datathird.echarts3 = {
          id: 'anathird3',
          title: '用冷',
          legendShow: true,
          legendData: [this.legend1, this.legend2],
          smooth: true,
          color: [this.blue, this.white],
          areaColor: false,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(ThisValue.COLD).slice(0, date.length), Object.values(LastValue.COLD).slice(0, date.length)]
        }
        this.datathird.echarts4 = {
          id: 'anathird4',
          title: '用热',
          legendShow: true,
          legendData: [this.legend1, this.legend2],
          smooth: true,
          color: [this.red, this.white],
          areaColor: false,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(ThisValue.HOT).slice(0, date.length), Object.values(LastValue.HOT).slice(0, date.length)]
        }
        this.compare1 = ThisValue
      })
    },
    // 用能对比 各建筑之间的对比 冷热水电 数据对比
    anathird2 () {
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
      if (this.compare1.ELECTRICITY && this.compare2.ELECTRICITY) {
        this.datathird.echarts5 = {
          id: 'anathird5',
          title: '用电',
          legendShow: true,
          legendData: [this.compareBuilding1, this.compareBuilding2],
          smooth: true,
          color: [this.green, this.bgreen],
          areaColor: false,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(this.compare1.ELECTRICITY).slice(0, date.length), Object.values(this.compare2.ELECTRICITY).slice(0, date.length)]
        }
      }
      if (this.compare1.HOT_WATER && this.compare2.HOT_WATER) {
        this.datathird.echarts6 = {
          id: 'anathird6',
          title: '用热水',
          legendShow: true,
          legendData: [this.compareBuilding1, this.compareBuilding2],
          smooth: true,
          color: [this.yellow, this.bgreen],
          areaColor: false,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(this.compare1.HOT_WATER).slice(0, date.length), Object.values(this.compare2.HOT_WATER).slice(0, date.length)]
        }
      }
      if (this.compare1.COLD && this.compare2.COLD) {
        this.datathird.echarts7 = {
          id: 'anathird7',
          title: '用冷',
          legendShow: true,
          legendData: [this.compareBuilding1, this.compareBuilding2],
          smooth: true,
          color: [this.blue, this.bgreen],
          areaColor: false,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(this.compare1.COLD).slice(0, date.length), Object.values(this.compare2.COLD).slice(0, date.length)]
        }
      }
      if (this.compare1.HOT && this.compare2.HOT) {
        this.datathird.echarts8 = {
          id: 'anathird8',
          title: '用热',
          legendShow: true,
          legendData: [this.compareBuilding1, this.compareBuilding2],
          smooth: true,
          color: [this.red, this.bgreen],
          areaColor: false,
          yName: '(kWh)',
          xData: date,
          data: [Object.values(this.compare1.HOT).slice(0, date.length), Object.values(this.compare2.HOT).slice(0, date.length)]
        }
      }
    },
    getcompare2 () {
      concomparebuilding({
        buildingFacilitySubId: this.building32,
        dateType: this.dateType3
      }).then((res) => {
        let data = res.data
        this.compare2 = data
      })
    }
  },
  watch: {
    levelActive () {
      this.tab = 0
    },
    compare1 () {
      if (this.compare2 !== {}) {
        this.anathird2()
      }
    },
    compare2 () {
      if (this.compare1 !== {}) {
        this.anathird2()
      }
    },
    tab () {
      this.gisMethods(this.tab)
    }
  },
  mounted () {
    this.changeTab(0, this.list[0].title)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.analysistimer)
    this.analysistimer = null
  },
  activated () {
    if (this.analysistimer) clearInterval(this.analysistimer)
    switch (this.tab) {
      case 0:
        this.analysistimer = setInterval(() => {
          this.anahead1()
          this.anahead2()
          this.anafirst1()
          this.anafirst2()
          this.anafirst3()
        }, this.duration)
        break
      case 1:
        this.analysistimer = setInterval(() => {
          this.anasecond1()
          this.anasecond3()
        }, this.duration)
        break
      case 2:
        this.analysistimer = setInterval(() => {
          this.anathird1()
          this.getcompare2()
        }, this.duration)
        break
      default:
        break
    }
  },
  beforeDestroy () {
    clearInterval(this.analysistimer)
    this.analysistimer = null
  }
}
</script>

<style scoped lang="stylus">
.wrapper
  width: 100%
  height: 86.5vh
  overflow: hidden
  position: relative
</style>
