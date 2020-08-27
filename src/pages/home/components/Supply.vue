<template>
  <div class="wrapper">
    <div class="common-pages">
      <div class="common-page" v-if="tab === 0">
        <transition name="fade" mode="out-in">
          <div>
            <Suphead :list="datahead"></Suphead>
            <Supfirst :list="datafirst" v-if="nextlevel[0].active"></Supfirst>
          </div>
        </transition>
      </div>
      <div class="common-page" v-else-if="tab === 1">
        <transition name="fade" mode="out-in">
          <Supsecond :list="datasecond" @changeDate2="changeDate2"></Supsecond>
        </transition>
      </div>
      <div class="common-page" v-else-if="tab === 2">
        <transition name="fade" mode="out-in">
          <Supthird :list="datathird" @changeDate3="changeDate3"></Supthird>
        </transition>
      </div>
      <div class="common-page" v-else-if="tab === 3">
        <transition name="fade" mode="out-in">
          <Supforth :list="dataforth" @changeDate4="changeDate4"></Supforth>
        </transition>
      </div>
    </div>
    <div class="common-tab" v-if="nextlevel[0].active">
      <span :class="{'active': tab === index}" v-for="(item, index) of list" :key="item.id" @click="changeTab(index, item.title)">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { index, getTestList, supHead1, supHead2, suphotwaterline, suphotwaterpie, supcoldline, supcoldpie, suphotline, suphotpie, supSecond1, supThird1, supThird2, supForth1 } from '@/request/api'
export default {
  name: 'Supply',
  components: {
    Epie: () => import('@/common/echarts/Epie'),
    Eline: () => import('@/common/echarts/Eline'),
    Ebar: () => import('@/common/echarts/Ebar'),
    Suphead: () => import('./supply/Suphead'),
    Supfirst: () => import('./supply/Supfirst'),
    Supsecond: () => import('./supply/Supsecond'),
    Supthird: () => import('./supply/Supthird'),
    Supforth: () => import('./supply/Supforth')
  },
  data () {
    return {
      tab: 0,
      suptimer: null,
      duration: 60000,
      dateType2: 'day',
      dateType3: 'day',
      dateType4: 'day',
      list: [
        {
          id: '01',
          title: '24小时监测'
        },
        {
          id: '02',
          title: '全村域能源'
        },
        {
          id: '03',
          title: '936能源中心'
        },
        {
          id: '04',
          title: '936能源个体'
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
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {},
        echarts7: {},
        echarts8: {}
      },
      datathird: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {},
        echarts7: {},
        echarts8: {},
        other: {},
        echarts11: {},
        echarts12: {},
        echarts13: {},
        echarts14: {},
        echarts15: {},
        echarts16: {}
      },
      dataforth: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {},
        echarts7: {},
        echarts8: {}
      }
    }
  },
  props: {
    nextlevel: Array
  },
  computed: {
    levelActive () {
      return this.nextlevel[0].active
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
      red: state => state.color.red
    })
  },
  methods: {
    // 根据年月日组件传来的日期类型改变视图
    changeDate2 (date) {
      this.dateType2 = date
      this.supSecond1()
    },
    changeDate3 (date) {
      this.dateType3 = date
      this.supThird1()
      // this.supThird3()
    },
    changeDate4 (date) {
      this.dateType4 = date
      this.supForth1()
    },
    // 分页切换，显示不同内容
    changeTab (index, title) {
      this.tab = index
      this.$emit('changeTitle', title)
      if (this.suptimer) clearInterval(this.suptimer)
      switch (index) {
        case 0:
          if (this.getBool(this.datahead) && this.getBool(this.datafirst)) {
            this.supHead2()
            this.supHead1()
            this.suphotwaterline()
            this.suphotwaterpie()
            this.supcoldline()
            this.supcoldpie()
            this.suphotline()
            this.suphotpie()
            this.suptimer = setInterval(() => {
              this.supHead2()
              this.supHead1()
              this.suphotwaterline()
              this.suphotwaterpie()
              this.supcoldline()
              this.supcoldpie()
              this.suphotline()
              this.suphotpie()
            }, this.duration)
          }
          break
        case 1:
          if (this.getBool(this.datasecond)) {
            this.supSecond1()
            this.conSecond2()
            this.suptimer = setInterval(() => {
              this.supSecond1()
              this.conSecond2()
            }, this.duration)
          }
          break
        case 2:
          if (this.getBool(this.datathird)) {
            this.supThird1()
            this.supThird2()
            this.supThird3()
            this.suptimer = setInterval(() => {
              this.supThird1()
              this.supThird2()
              this.supThird3()
            }, this.duration)
          }
          break
        case 3:
          if (this.getBool(this.dataforth)) {
            this.supForth1()
            this.supForth2()
            this.suptimer = setInterval(() => {
              this.supForth1()
              this.supForth2()
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
    // 24小时监测 供电 折线图 数据
    supHead1 () {
      supHead1().then((res) => {
        let xData = []
        let list1 = []
        let list2 = []
        let DISTRIBUTED_ENERGY = res.data.DISTRIBUTED_ENERGY
        let ENERGY_EXTERNAL = res.data.ENERGY_EXTERNAL
        for (let i = 0; i < DISTRIBUTED_ENERGY.length; i++) {
          if (DISTRIBUTED_ENERGY[i].lasted) {
            xData.push(DISTRIBUTED_ENERGY[i].hourValue)
            list1.push(DISTRIBUTED_ENERGY[i].value)
            list2.push(ENERGY_EXTERNAL[i].value)
          }
        }
        let len = list1.length - 1
        this.datahead.echarts1 = {
          id: 'consumption_head1',
          title: '',
          legendShow: true,
          legendData: ['外来电' + (list1[len] || 0) + 'kW', '分布式能源' + (list2[len] || 0) + 'kW'],
          color: [this.green, this.yellow],
          areaColor: false,
          smooth: true,
          xData: xData,
          yName: '(kW) ',
          data: [list1, list2]
        }
      })
    },
    // 24小时监测 供电 饼图 数据
    supHead2 () {
      let date = new Date()
      let hour = date.getHours() + 1
      supHead2({
        hour: hour
      }).then((res) => {
        const data = res.data
        let value = parseInt(data.CONCENTRATED_ENERGY_STORAGE + data.CONCENTRATED_WIND_POWER + data.CONCENTRATED_PHOTOVOLTAIC + data.ENERGY_CENTER)
        this.datahead.echarts2 = {
          id: 'consumption_head2',
          name: '分布式能源',
          title: '{name|分布式能源}\n{value|' + value + '}{unit|kW}',
          titleTop: '27%',
          titleLeft: '48%',
          legendShow: true,
          borderWidth: false,
          labelShow: true,
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: [this.green, this.yellow, this.blue, this.bgreen],
          data: [
            { value: data.CONCENTRATED_ENERGY_STORAGE, name: '集中储能' },
            { value: data.ENERGY_CENTER, name: '能源中心' },
            { value: data.CONCENTRATED_PHOTOVOLTAIC, name: '集中光伏' },
            { value: data.CONCENTRATED_WIND_POWER, name: '集中风电' }
          ]
        }
      })
    },
    // 24小时监测 热水 折线图 数据
    suphotwaterline () {
      suphotwaterline().then((res) => {
        let xData = []
        let list = []
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].lasted) {
            xData.push(data[i].hourValue)
            list.push(data[i].value)
          }
        }
        this.datafirst.echarts1 = {
          id: 'consumption_first2',
          title: '供热水',
          legendShow: false,
          legendData: ['供热水'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          xData: xData,
          yName: '(kW)',
          data: [list]
        }
      })
    },
    // 24小时监测 热水 饼图 数据
    suphotwaterpie () {
      let time = new Date()
      let hour = time.getHours()
      suphotwaterpie({
        hour: hour
      }).then((res) => {
        const data = res.data
        let value = parseInt(data.SOLAR_ENERGY + data.BIOMASS_CUBE + data.AIR_HEAT_PUMP)
        this.datafirst.echarts2 = {
          id: 'consumption_first1',
          title: '{name|热水供应}\n{value|' + value + '}{unit|kW}',
          titleTop: '27%',
          titleLeft: '48%',
          legendShow: true,
          borderWidth: false,
          labelShow: true,
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: [this.green, this.yellow, this.blue, this.bgreen],
          data: [
            { value: data.SOLAR_ENERGY, name: '太阳能' },
            { value: data.BIOMASS_CUBE, name: '生物质锅炉' },
            { value: data.AIR_HEAT_PUMP, name: '空气源热泵' }
          ]
        }
      })
    },
    // 24小时监测 供冷 折线图 数据
    supcoldline () {
      supcoldline().then((res) => {
        let xData = []
        let list = []
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].lasted) {
            xData.push(data[i].hourValue)
            list.push(data[i].value)
          }
        }
        this.datafirst.echarts3 = {
          id: 'consumption_first4',
          title: '供冷',
          legendShow: false,
          legendData: ['供冷'],
          color: [this.blue],
          areaColor: true,
          smooth: true,
          xData: this.year,
          yName: '(kW)',
          data: [getTestList(150, 12)]
        }
      })
    },
    // 24小时监测 供冷 饼图 数据
    supcoldpie () {
      let time = new Date()
      let hour = time.getHours()
      supcoldpie({
        hour: hour
      }).then((res) => {
        const data = res.data
        // console.log(data)
        let value = parseInt(data.BURIED_PIPE + data.CHANNEL_THROWING + data.COOL_WATER_UNIT)
        this.datafirst.echarts4 = {
          id: 'consumption_first3',
          title: '{name|供冷}\n{value|' + value + '}{unit|kW}',
          titleTop: '27%',
          titleLeft: '48%',
          legendShow: true,
          borderWidth: false,
          labelShow: true,
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: [this.green, this.yellow, this.blue, this.bgreen],
          data: [
            { value: data.BURIED_PIPE, name: '地埋管' },
            { value: data.COOL_WATER_UNIT, name: '冷水机组' },
            { value: data.CHANNEL_THROWING, name: '河道抛馆' }
          ]
        }
      })
    },
    // 24小时监测 供热 折线图 数据
    suphotline () {
      suphotline().then((res) => {
        let xData = []
        let list = []
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          if (data[i].lasted) {
            xData.push(data[i].hourValue)
            list.push(data[i].value)
          }
        }
        this.datafirst.echarts5 = {
          id: 'consumption_first6',
          title: '供热',
          legendShow: false,
          legendData: ['供热'],
          color: [this.red],
          areaColor: true,
          smooth: true,
          xData: xData,
          yName: '(kW)',
          data: [list]
        }
      })
    },
    // 24小时监测 供热 饼图 数据
    suphotpie () {
      let time = new Date()
      let hour = time.getHours()
      suphotpie({
        hour: hour
      }).then((res) => {
        const data = res.data
        let value = parseInt(data.BURIED_PIPE + data.CHANNEL_THROWING)
        this.datafirst.echarts6 = {
          id: 'consumption_first5',
          title: '{name|供热}\n{value|' + value + '}{unit|kW}',
          titleTop: '27%',
          titleLeft: '48%',
          legendShow: true,
          borderWidth: false,
          labelShow: true,
          radius: ['40%', '50%'],
          center: ['50%', '40%'],
          color: [this.blue, this.yellow, this.green, this.bgreen],
          data: [
            { value: data.BURIED_PIPE, name: '地埋管' },
            { value: data.CHANNEL_THROWING, name: '河道抛管' }
          ]
        }
      })
    },
    // 全村域能源 能源中心供电量、集中风电供电量、集中光伏供电量、集中储能供电量 数据
    supSecond1 () {
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
      supSecond1({
        type: this.dateType2
      }).then((res) => {
        const data = res.data
        this.datasecond.echarts1 = {
          id: 'consecond1',
          title: '能源中心供电量',
          legendShow: false,
          legendData: ['供电'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.MIC_POWER_GRID_CUBE).slice(0, date.length)]
        }
        this.datasecond.echarts2 = {
          id: 'consecond2',
          title: '集中风电供电量',
          legendShow: false,
          legendData: ['储能'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.CONCENTRATED_WIND_POWER).slice(0, date.length)]
        }
        this.datasecond.echarts3 = {
          id: 'consecond3',
          title: '集中光伏供电量',
          legendShow: false,
          legendData: ['水'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.CONCENTRATED_PHOTOVOLTAIC).slice(0, date.length)]
        }
        this.datasecond.echarts4 = {
          id: 'consecond4',
          title: '集中储能供电量',
          legendShow: false,
          legendData: ['水'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.CONCENTRATED_ENERGY_STORAGE).slice(0, date.length)]
        }
      })
    },
    // 全村域能源 能源中心供电量、集中风电供电量、集中光伏供电量、集中储能供电量 未来24小时预测数据
    conSecond2 () {
      this.datasecond.echarts5 = {
        id: 'consecond5',
        title: '能源中心供电量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.green],
        areaColor: false,
        xData: this.day,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datasecond.echarts6 = {
        id: 'consecond6',
        title: '集中风电供电量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.green],
        areaColor: false,
        xData: this.day,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datasecond.echarts7 = {
        id: 'consecond7',
        title: '集中光伏供电量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.yellow],
        areaColor: false,
        xData: this.day,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datasecond.echarts8 = {
        id: 'consecond8',
        title: '集中储能供电量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.yellow],
        areaColor: false,
        xData: this.day,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
    },
    // 936能源中心 实时监测 地源热魔方供能量、生物质魔方供能量、热水源魔方供能量、电源变魔方供能量、微电网魔方供能量、微电网魔方供能量 数据
    supThird1 () {
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
      supThird1({
        supplyFacilityId: 1,
        type: this.dateType3
      }).then((res) => {
        const data = res.data
        this.datathird.echarts1 = {
          id: 'supthird1',
          title: '地源热魔方供能量',
          legendShow: false,
          legendData: ['水'],
          smooth: true,
          areaColor: true,
          color: [this.green],
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.GEOTHERMAL_CUBE).slice(0, date.length)]
        }
        this.datathird.echarts2 = {
          id: 'supthird2',
          title: '生物质魔方供能量',
          legendShow: false,
          legendData: ['水'],
          smooth: true,
          areaColor: true,
          color: [this.green],
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.BIOMASS_CUBE).slice(0, date.length)]
        }
        this.datathird.echarts3 = {
          id: 'supthird3',
          title: '热水源魔方供能量',
          legendShow: false,
          legendData: ['水'],
          smooth: true,
          areaColor: true,
          color: [this.yellow],
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.HOT_WATER_CUBE).slice(0, date.length)]
        }
        this.datathird.echarts4 = {
          id: 'supthird4',
          title: '电源变魔方供能量',
          legendShow: false,
          legendData: ['水'],
          smooth: true,
          areaColor: true,
          color: [this.yellow],
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.POWER_SUPPLY_CUBE).slice(0, date.length)]
        }
        this.datathird.echarts5 = {
          id: 'supthird5',
          title: '微电网魔方供能量',
          legendShow: false,
          legendData: ['水'],
          smooth: true,
          areaColor: true,
          color: [this.blue],
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.MIC_POWER_GRID_CUBE).slice(0, date.length)]
        }
        this.datathird.echarts6 = {
          id: 'supthird6',
          title: '氢能源魔方供能量',
          legendShow: false,
          legendData: ['水'],
          smooth: true,
          areaColor: true,
          color: [this.blue],
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.HYDROGEN_CUBE).slice(0, date.length)]
        }
      })
    },
    // 储能信息数据 储能量、循环效率、次数统计等
    supThird2 () {
      supThird2().then((res) => {
        // console.log(res)
      })
      this.datathird.other = {
        statistics: [
          {
            title: '次数统计',
            name: '充电次数',
            num: 20,
            unit: '次'
          },
          {
            title: '次数统计',
            name: '放电次数',
            num: 10,
            unit: '次'
          }
        ],
        ringList: [
          {
            id: '001',
            title: '储能量',
            color: this.green,
            num: 60
          },
          {
            id: '002',
            title: '健康监视',
            color: this.green,
            num: 60
          }
        ]
      }
      this.datathird.echarts7 = {
        id: 'gauge1',
        unit: 'kWh',
        max: 20,
        data: [{
          name: '储能量',
          value: 10
        }]
      }
      this.datathird.echarts8 = {
        id: 'gauge2',
        unit: '%',
        max: 100,
        data: [{
          name: '循环效率',
          value: 70
        }]
      }
    },
    // 936能源中心 未来24小时预测 地源热魔方供能量、生物质魔方供能量、热水源魔方供能量、电源变魔方供能量、微电网魔方供能量、微电网魔方供能量 数据
    supThird3 () {
      this.datathird.echarts11 = {
        id: 'conforth1',
        title: '地源热魔方供能量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        color: [this.green],
        dotted: true,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datathird.echarts12 = {
        id: 'conforth2',
        title: '生物质魔方供能量预测',
        legendShow: false,
        legendData: ['生物质魔方供能量预测'],
        smooth: true,
        color: [this.green],
        dotted: true,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datathird.echarts13 = {
        id: 'conforth3',
        title: '热水源魔方供能量预测',
        legendShow: false,
        legendData: ['水'],
        color: [this.yellow],
        dotted: true,
        smooth: true,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datathird.echarts14 = {
        id: 'conforth4',
        title: '电源变魔方供能量预测',
        legendShow: false,
        legendData: ['水'],
        color: [this.yellow],
        dotted: true,
        smooth: true,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datathird.echarts15 = {
        id: 'conforth5',
        title: '微电网魔方供能量预测',
        legendShow: false,
        legendData: ['水'],
        color: [this.blue],
        dotted: true,
        smooth: true,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.datathird.echarts16 = {
        id: 'conforth6',
        title: '氢能源魔方供能量预测',
        legendShow: false,
        legendData: ['水'],
        color: [this.blue],
        dotted: true,
        smooth: true,
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
    },
    // 936能源个体 1号风电供电量、1号光伏供电量、2号风电供电量、2号光伏供电量 数据
    supForth1 () {
      let date
      switch (this.dateType4) {
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
      supForth1({
        type: this.dateType4
      }).then((res) => {
        let data = res.data
        this.dataforth.echarts1 = {
          id: 'supforth1',
          title: '1号风电供电量',
          legendShow: false,
          legendData: ['供电'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.WIND_POWER).slice(0, date.length)]
        }
        this.dataforth.echarts2 = {
          id: 'supforth2',
          title: '1号光伏供电量',
          legendShow: false,
          legendData: ['储能'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [Object.values(data.PHOTOVOLTAIC).slice(0, date.length)]
        }
      })
      this.dataforth.echarts3 = {
        id: 'supforth3',
        title: '2号风电供电量',
        legendShow: false,
        legendData: ['水'],
        color: [this.yellow],
        areaColor: true,
        smooth: true,
        xData: date,
        yName: '(kWh)',
        data: [getTestList(150, date.length)]
      }
      this.dataforth.echarts4 = {
        id: 'supforth4',
        title: '2号光伏供电量',
        legendShow: false,
        legendData: ['水'],
        color: [this.yellow],
        areaColor: true,
        smooth: true,
        xData: date,
        yName: '(kWh)',
        data: [getTestList(150, date.length)]
      }
    },
    // 936能源个体 1号风电供电量、1号光伏供电量、2号风电供电量、2号光伏供电量 未来24小时预测数据
    supForth2 () {
      this.dataforth.echarts5 = {
        id: 'supforth5',
        title: '1号风电供电量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.green],
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.dataforth.echarts6 = {
        id: 'supforth6',
        title: '1号光伏供电量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.green],
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.dataforth.echarts7 = {
        id: 'supforth7',
        title: '2号风电供电量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.yellow],
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
      this.dataforth.echarts8 = {
        id: 'supforth8',
        title: '2号光伏供电量预测',
        legendShow: false,
        legendData: ['水'],
        smooth: true,
        dotted: true,
        color: [this.yellow],
        xData: this.defaultDay,
        yName: '(kW)',
        data: [getTestList(150, 24)]
      }
    }
  },
  watch: {
    levelActive () {
      this.tab = 0
    }
  },
  mounted () {
    this.changeTab(0, this.list[0].title)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.suptimer)
    this.suptimer = null
  },
  activated () {
    if (this.suptimer) clearInterval(this.suptimer)
    switch (this.tab) {
      case 0:
        this.suptimer = setInterval(() => {
          this.supHead2()
          this.supHead1()
          this.suphotwaterline()
          this.suphotwaterpie()
          this.supcoldline()
          this.supcoldpie()
          this.suphotline()
          this.suphotpie()
        }, this.duration)
        break
      case 1:
        this.suptimer = setInterval(() => {
          this.supSecond1()
          this.conSecond2()
        }, this.duration)
        break
      case 2:
        this.suptimer = setInterval(() => {
          this.supThird1()
          this.supThird2()
          this.supThird3()
        }, this.duration)
        break
      case 3:
        this.suptimer = setInterval(() => {
          this.supForth1()
          this.supForth2()
        }, this.duration)
        break
      default:
        break
    }
  },
  beforeDestroy () {
    clearInterval(this.suptimer)
    this.suptimer = null
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
