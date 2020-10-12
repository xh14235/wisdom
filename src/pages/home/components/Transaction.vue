<template>
  <div class="wrapper">
    <div class="common-title">
      <div>能源交易 <span>({{subTitle}})</span></div>
    </div>
    <div class="common-pages">
      <div class="common-page" v-if="this.tab === 0">
        <transition name="fade" mode="out-in">
          <Tranfirst :list="datafirst" @changeDate1="changeDate1"></Tranfirst>
        </transition>
      </div>
      <div class="common-page" v-else-if="this.tab === 1">
        <transition name="fade" mode="out-in">
          <Transecond :list="datasecond" @changeDate2="changeDate2" @changeSelect2="changeSelect2"></Transecond>
        </transition>
      </div>
    </div>
    <div class="common-tab">
      <span :class="{'active': tab === index}" v-for="(item, index) of list" :key="item.id" @click="changeTab(index)">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { getCentrePoint } from '@/request/common-api.js'
import { tranallfirst, tranallelectric, tranallhotwater, tranallcold, tranallhot, transinglefirst, transingleelectric, transinglehotwater, transinglecold, transinglehot, tranallcost, transinglecost } from '@/request/transaction-api'
export default {
  name: 'Transaction',
  components: {
    Tranfirst: () => import('./transaction/Tranfirst'),
    Transecond: () => import('./transaction/Transecond')
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
      ifr: state => state.map.ifr,
      iconHeight: state => state.map.iconHeight,
      jumpTime: state => state.map.jumpTime,
      viewX: state => state.map.viewX,
      viewY: state => state.map.viewY,
      viewZ: state => state.map.viewZ
    })
  },
  data () {
    return {
      dateType1: 'day',
      dateType2: 'day',
      building2: '',
      tab: 0,
      trantimer: null,
      duration: 60000,
      subTitle: '',
      list: [
        {
          id: '01',
          title: '全村域'
        },
        {
          id: '02',
          title: '个体数据'
        }
      ],
      datafirst: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        statistics: [],
        profit: 0
      },
      datasecond: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        statistics: [],
        profit: 0
      }
    }
  },
  methods: {
    // 根据年月日组件传来的日期类型改变视图
    changeDate1 (date) {
      this.dateType1 = date
      this.tranallfirst()
      this.tranallthird()
    },
    changeDate2 (date) {
      this.dateType2 = date
      this.transinglefirst()
      this.transinglethird()
    },
    // 根据下拉框组件传来的数据改变视图
    changeSelect2 (chosen) {
      this.building2 = chosen.id
      this.transinglefirst()
      this.transinglethird()
      this.transinglestatistics()
    },
    // 分页切换，显示不同内容
    changeTab (index) {
      this.tab = index
      this.subTitle = this.list[index].title
      if (this.trantimer) clearInterval(this.trantimer)
      switch (index) {
        case 0:
          if (this.getBool(this.datafirst)) {
            this.tranallfirst()
            this.tranallthird()
            this.tranallstatistics()
            this.trantimer = setInterval(() => {
              this.tranallfirst()
              this.tranallthird()
              this.tranallstatistics()
            }, this.duration)
          }
          break
        case 1:
          if (this.getBool(this.datasecond)) {
            if (this.building2) {
              this.transinglefirst()
              this.transinglethird()
              this.transinglestatistics()
            }
            this.trantimer = setInterval(() => {
              this.transinglefirst()
              this.transinglethird()
              this.transinglestatistics()
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
          markData = this.ifr.markConfig['villagePower']
          positionData = this.ifr.sceneCenterConfig['villagePower']
          break
        case 1:
          markData = this.ifr.markConfig['itemData']
          positionData = this.ifr.sceneCenterConfig['itemData']
          break
        default:
          break
      }
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
    },
    // 根据下拉框组件传来的数据改变视图
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
    // 全村域 外来电 消耗及费用 折线图 数据
    tranallfirst () {
      let date
      switch (this.dateType1) {
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
      tranallfirst({
        dateType: this.dateType1
      }).then((res) => {
        let data = res.data
        let cost = []
        let arr = Object.values(data.Data).slice(0, date.length)
        for (let i = 0; i < arr.length; i++) {
          cost.push(parseInt(arr[i] * data.price))
        }
        this.datafirst.echarts1 = {
          id: 'tranfirst1',
          title: '外来电消耗',
          legendShow: false,
          legendData: ['外来电消耗'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [arr]
        }
        this.datafirst.echarts2 = {
          id: 'tranfirst2',
          title: '外来电费用',
          legendShow: false,
          legendData: ['外来电费用'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(元)',
          data: [cost]
        }
      })
    },
    // 全村域 能源供给及能源收益 柱状图 数据
    tranallthird () {
      let date
      switch (this.dateType1) {
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
      let promise1 = new Promise((resolve, reject) => {
        tranallelectric({
          dateType: this.dateType1
        }).then((res) => {
          let arr = Object.values(res.data.data).slice(0, date.length)
          let price = res.data.price
          let arr2 = []
          for (let i = 0; i < arr.length; i++) {
            arr2.push(parseInt(arr[i] * price))
          }
          resolve([arr, arr2])
        })
      })
      let promise2 = new Promise((resolve, reject) => {
        tranallhotwater({
          dateType: this.dateType1
        }).then((res) => {
          let arr = Object.values(res.data.data).slice(0, date.length)
          let price = res.data.price
          let arr2 = []
          for (let i = 0; i < arr.length; i++) {
            arr2.push(parseInt(arr[i] * price))
          }
          resolve([arr, arr2])
        })
      })
      let promise3 = new Promise((resolve, reject) => {
        tranallcold({
          dateType: this.dateType1
        }).then((res) => {
          let arr = Object.values(res.data.data).slice(0, date.length)
          let price = res.data.price
          let arr2 = []
          for (let i = 0; i < arr.length; i++) {
            arr2.push(parseInt(arr[i] * price))
          }
          resolve([arr, arr2])
        })
      })
      let promise4 = new Promise((resolve, reject) => {
        tranallhot({
          dateType: this.dateType1
        }).then((res) => {
          let arr = Object.values(res.data.data).slice(0, date.length)
          let price = res.data.price
          let arr2 = []
          for (let i = 0; i < arr.length; i++) {
            arr2.push(parseInt(arr[i] * price))
          }
          resolve([arr, arr2])
        })
      })
      Promise.all([promise1, promise2, promise3, promise4]).then((res) => {
        let arr3 = []
        let arr4 = []
        for (let i = 0; i < res.length; i++) {
          arr3.push(res[i][0])
          arr4.push(res[i][1])
        }
        this.datafirst.echarts3 = {
          id: 'tranfirst3',
          title: '能源供给',
          legendShow: true,
          itemStyle: 1,
          legendData: ['电', '热水', '冷', '热'],
          legendIcon: true,
          stack: '能源供给',
          color: [this.green, this.yellow, this.blue, this.red],
          xData: date,
          yName: '(kWh)',
          data: arr3
        }
        this.datafirst.echarts4 = {
          id: 'tranfirst4',
          title: '能源收益',
          legendShow: true,
          itemStyle: 1,
          legendData: ['电', '热水', '冷', '热'],
          legendIcon: true,
          stack: '能源收益',
          color: [this.green, this.yellow, this.blue, this.red, this.white],
          xData: date,
          yName: '(元)',
          data: arr4
        }
      })
    },
    // 全村域 收支统计数据
    tranallstatistics () {
      let time = new Date()
      let year = time.getFullYear()
      tranallcost({
        year: year
      }).then((res) => {
        this.datafirst.statistics = [
          {
            title: '收支统计',
            name: '累计收入',
            num: parseInt(res.data.income),
            unit: '元',
            imgUrl: require('../../../assets/img/income.png')
          },
          {
            title: '收支统计',
            name: '累计支出',
            num: parseInt(res.data.expend),
            unit: '元',
            imgUrl: require('../../../assets/img/expend.png')
          }
        ]
        this.datafirst.profit = parseInt(res.data.income) - parseInt(res.data.expend)
      })
    },
    // 单个单位 外来电 消耗及费用 折线图 数据
    transinglefirst () {
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
      transinglefirst({
        dateType: this.dateType2,
        supplyFacilityId: this.building2
      }).then((res) => {
        let data = res.data
        let cost = []
        let arr = Object.values(data.data).slice(0, date.length)
        for (let i = 0; i < arr.length; i++) {
          cost.push(parseInt(arr[i] * data.price))
        }
        this.datasecond.echarts1 = {
          id: 'transecond1',
          title: '外来电消耗',
          legendShow: false,
          legendData: ['外来电消耗'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kWh)',
          data: [arr]
        }
        this.datasecond.echarts2 = {
          id: 'transecond2',
          title: '外来电费用',
          legendShow: false,
          legendData: ['外来电费用'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          yName: '(元)',
          data: [cost]
        }
      })
    },
    // 单个单位 能源供给及能源收益 柱状图 数据
    transinglethird () {
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
      let promise1 = new Promise((resolve, reject) => {
        transingleelectric({
          dateType: this.dateType2,
          supplyFacilityId: this.building2
        }).then((res) => {
          let arr = Object.values(res.data.data).slice(0, date.length)
          let price = res.data.price
          let arr2 = []
          for (let i = 0; i < arr.length; i++) {
            arr2.push(parseInt(arr[i] * price))
          }
          resolve([arr, arr2])
        })
      })
      let promise2 = new Promise((resolve, reject) => {
        transinglehotwater({
          dateType: this.dateType2,
          supplyFacilityId: this.building2
        }).then((res) => {
          let arr = Object.values(res.data.data).slice(0, date.length)
          let price = res.data.price
          let arr2 = []
          for (let i = 0; i < arr.length; i++) {
            arr2.push(parseInt(arr[i] * price))
          }
          resolve([arr, arr2])
        })
      })
      let promise3 = new Promise((resolve, reject) => {
        transinglecold({
          dateType: this.dateType2,
          supplyFacilityId: this.building2
        }).then((res) => {
          let arr = Object.values(res.data.data).slice(0, date.length)
          let price = res.data.price
          let arr2 = []
          for (let i = 0; i < arr.length; i++) {
            arr2.push(parseInt(arr[i] * price))
          }
          resolve([arr, arr2])
        })
      })
      let promise4 = new Promise((resolve, reject) => {
        transinglehot({
          dateType: this.dateType2,
          supplyFacilityId: this.building2
        }).then((res) => {
          let arr = Object.values(res.data.data).slice(0, date.length)
          let price = res.data.price
          let arr2 = []
          for (let i = 0; i < arr.length; i++) {
            arr2.push(parseInt(arr[i] * price))
          }
          resolve([arr, arr2])
        })
      })
      Promise.all([promise1, promise2, promise3, promise4]).then((res) => {
        let arr3 = []
        let arr4 = []
        for (let i = 0; i < res.length; i++) {
          arr3.push(res[i][0])
          arr4.push(res[i][1])
        }
        this.datasecond.echarts3 = {
          id: 'transecond3',
          title: '能源供给',
          legendShow: true,
          itemStyle: 1,
          legendData: ['电', '热水', '冷', '热'],
          legendIcon: true,
          stack: '能源供给',
          color: [this.green, this.yellow, this.blue, this.red],
          xData: date,
          yName: '(kWh)',
          data: arr3
        }
        this.datasecond.echarts4 = {
          id: 'transecond4',
          title: '能源收益',
          legendShow: true,
          legendData: ['电', '热水', '冷', '热'],
          legendIcon: true,
          itemStyle: 1,
          stack: '能源收益',
          color: [this.green, this.yellow, this.blue, this.red],
          xData: date,
          yName: '(元)',
          data: arr4
        }
      })
    },
    // 单个单位 收支统计数据
    transinglestatistics () {
      let time = new Date()
      let year = time.getFullYear()
      transinglecost({
        year: year,
        supplyFacilityId: this.building2
        // supplyFacilityId: 1
      }).then((res) => {
        this.datasecond.statistics = [
          {
            title: '收支统计',
            name: '累计收入',
            num: parseInt(res.data.income),
            unit: '元',
            imgUrl: require('../../../assets/img/income.png')
          },
          {
            title: '收支统计',
            name: '累计支出',
            num: parseInt(res.data.expend),
            unit: '元',
            imgUrl: require('../../../assets/img/expend.png')
          }
        ]
        this.datasecond.profit = parseInt(res.data.income) - parseInt(res.data.expend)
      })
    }
  },
  watch: {
    tab () {
      this.gisMethods(this.tab)
    }
  },
  mounted () {
    this.changeTab(0)
    this.gisMethods(0)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.trantimer)
    this.trantimer = null
  },
  activated () {
    if (this.trantimer) clearInterval(this.trantimer)
    switch (this.tab) {
      case 0:
        this.gisMethods(0)
        this.trantimer = setInterval(() => {
          this.tranallfirst()
          this.tranallthird()
          this.tranallstatistics()
        }, this.duration)
        break
      case 1:
        this.gisMethods(1)
        this.trantimer = setInterval(() => {
          this.transinglefirst()
          this.transinglethird()
          this.transinglestatistics()
        }, this.duration)
        break
      default:
        break
    }
  },
  beforeDestroy () {
    clearInterval(this.trantimer)
    this.trantimer = null
  }
}
</script>

<style scoped lang="stylus">
.wrapper
  width: 100%
  height: 90vh
  overflow hidden
  position: relative
</style>
