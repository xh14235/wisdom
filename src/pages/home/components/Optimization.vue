<template>
  <div class="wrapper">
    <div class="common-title">
      <div>用能优化 <span>({{subTitle}})</span></div>
    </div>
    <div class="common-pages">
      <div class="common-page" v-if="this.tab === 0">
        <transition name="fade" mode="out-in">
          <Optfirst :list="datafirst" :statistics="price1" @changeSelect1="changeSelect1"></Optfirst>
        </transition>
      </div>
      <div class="common-page" v-else-if="this.tab === 1">
        <transition name="fade" mode="out-in">
          <Optsecond :list="datasecond" :statistics="price2" @changeDate2="changeDate2" @changeSelect2="changeSelect2"></Optsecond>
        </transition>
      </div>
    </div>
    <div class="common-tab">
      <span :class="{'active': tab === index}" v-for="(item, index) of list" :key="item.id" @click="changeTab(index)">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import { getTestList, optenergy, optefficiency, optsave, optwork, optprice } from '@/request/api'
import { mapState } from 'vuex'
export default {
  name: 'Optimization',
  components: {
    Optfirst: () => import('./optimization/Optfirst'),
    Optsecond: () => import('./optimization/Optsecond')
  },
  data () {
    return {
      tab: 0,
      subTitle: '',
      list: [
        {
          id: '01',
          title: '初级分析'
        },
        {
          id: '02',
          title: '高级分析'
        }
      ],
      price1: [],
      price2: [],
      datafirst: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {},
        echarts7: {},
        echarts8: {}
      },
      datasecond: {
        echarts1: {},
        echarts2: [],
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {},
        echarts7: {},
        echarts8: {},
        echarts9: {}
      },
      dateType2: 'day',
      building1: '',
      building2: ''
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
      lgreen: state => state.color.lgreen
    })
  },
  methods: {
    // 根据年月日组件传来的日期类型改变视图
    changeDate2 (date) {
      this.dateType2 = date
      this.getBoth(2)
      this.getPrice(2)
      this.optSecondOrder()
      this.getSex()
      // this.optwork()
    },
    // 根据下拉框组件传来的数据改变视图
    changeSelect1 (chosen) {
      this.building1 = chosen.id
      this.getBoth(1)
      this.getPrice(1)
      this.optsave()
    },
    changeSelect2 (chosen) {
      this.building2 = chosen.id
      this.getBoth(2)
      this.getPrice(2)
      this.getSex()
      this.optwork()
      this.optSecondOrder()
    },
    // 分页切换，显示不同内容
    changeTab (index) {
      this.tab = index
      this.subTitle = this.list[index].title
      switch (index) {
        case 0:
          if (this.getBool(this.datafirst)) {
            if (this.building1) {
              this.optsave()
              this.getBoth(1)
              this.getPrice(1)
            }
          }
          break
        case 1:
          if (this.getBool(this.datasecond)) {
            if (this.building2) {
              this.getBoth(2)
              this.getPrice(2)
              this.optSecondOrder()
              this.getSex()
              this.optwork()
            }
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
    // 男女比例
    getSex () {
      this.datasecond.echarts2 = [
        {
          title: '男女比例',
          name: '男性占比',
          num: 56,
          unit: '%',
          imgUrl: require('../../../assets/img/boy.png')
        },
        {
          title: '男女比例',
          name: '女性占比',
          num: 44,
          unit: '%',
          imgUrl: require('../../../assets/img/girl.png')
        }
      ]
    },
    // 用能优化 初级报告 产能效率echarts图
    optefficiency () {
      optefficiency({
        dateType: this.dateType1,
        buildingFacilitySubId: this.building1
      }).then((res) => {
        this.datafirst.echarts5 = {
          id: 'opt15',
          title: '产能效率',
          legendShow: true,
          legendData: ['今天', '昨天'],
          color: [this.green, this.yellow],
          areaColor: false,
          smooth: true,
          xData: Object.keys(res.data.ThisValue),
          data: [Object.values(res.data.ThisValue), Object.values(res.data.LastValue)]
        }
      })
    },
    // 用能优化 初级报告 节能减排co2，煤等4张图
    optsave () {
      optsave({
        dateType: this.dateType1,
        buildingFacilitySubId: this.building1,
        supplyFacilityId: this.building1
      }).then((res) => {
        // console.log(res)
        this.datafirst.echarts5 = {
          id: 'optfirst5',
          title: '节能减排-节约电量',
          legendShow: false,
          legendData: ['节约电量'],
          color: [this.white],
          areaColor: false,
          smooth: true,
          xData: this.day,
          yName: '(kWh)',
          data: [getTestList(150, 24)]
        }
        this.datafirst.echarts6 = {
          id: 'optfirst6',
          title: '节能减排-节约标煤',
          legendShow: false,
          legendData: ['节约标煤'],
          color: [this.white],
          areaColor: false,
          smooth: true,
          xData: this.day,
          yName: '(吨)',
          data: [getTestList(150, 24)]
        }
        this.datafirst.echarts7 = {
          id: 'optfirst7',
          title: '节能减排-节约费用',
          legendShow: false,
          legendData: ['节约费用'],
          color: [this.white],
          areaColor: false,
          smooth: true,
          xData: this.day,
          yName: '(元)',
          data: [getTestList(150, 24)]
        }
        this.datafirst.echarts8 = {
          id: 'optfirst8',
          title: '节能减排-CO2减排',
          legendShow: false,
          legendData: ['CO2减排'],
          color: [this.white],
          areaColor: false,
          smooth: true,
          xData: this.day,
          yName: '(%)',
          data: [getTestList(150, 24)]
        }
      })
    },
    // 用能优化 高级报告 有功变化、无功变化等
    optwork () {
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
      optwork({
        // supplyFacilityId: this.building2
        supplyFacilityId: 1
      }).then((res) => {
        this.datasecond.echarts7 = {
          id: 'optsecond7',
          title: '有功变化',
          legendShow: false,
          legendData: ['有功变化'],
          color: [this.white],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(kW)',
          data: [Object.values(res.data.ACTIVE_POWER).slice(0, date.length)]
        }
        this.datasecond.echarts8 = {
          id: 'optsecond8',
          title: '无功变化',
          legendShow: false,
          legendData: ['无功变化'],
          color: [this.white],
          areaColor: true,
          smooth: true,
          xData: date,
          yName: '(Kvar)',
          data: [Object.values(res.data.REACTIVE_POWER).slice(0, date.length)]
        }
        // this.datasecond.echarts9 = {
        //   id: 'optsecond9',
        //   title: '功率因素（%）',
        //   legendShow: false,
        //   legendData: ['功率因素'],
        //   color: [this.white],
        //   areaColor: true,
        //   smooth: true,
        //   xData: Object.keys(res.data.FACTOR_POWER),
        //   data: [Object.values(res.data.FACTOR_POWER)]
        // }
      })
    },
    // 能源消费情况 冷热水电数据
    getBoth (page) {
      if (page === 1) {
        optenergy({
          buildingFacilitySubId: this.building1,
          dateType: 'day'
        }).then((res) => {
          this.datafirst.echarts1 = {
            id: 'optfirst1',
            title: '能源消费-电',
            legendShow: false,
            legendData: ['能源消费-电'],
            color: [this.green],
            areaColor: false,
            smooth: true,
            xData: this.day,
            yName: '(kWh)',
            data: [Object.values(res.data.ELECTRICITY).slice(0, this.day.length)]
          }
          this.datafirst.echarts2 = {
            id: 'optfirst2',
            title: '能源消费-热水',
            legendShow: false,
            legendData: ['能源消费-热水'],
            color: [this.yellow],
            areaColor: false,
            smooth: true,
            xData: this.day,
            yName: '(kWh)',
            data: [Object.values(res.data.HOT_WATER).slice(0, this.day.length)]
          }
          this.datafirst.echarts3 = {
            id: 'optfirst3',
            title: '能源消费-冷',
            legendShow: false,
            legendData: ['能源消费-冷'],
            color: [this.blue],
            areaColor: false,
            smooth: true,
            xData: this.day,
            yName: '(kWh)',
            data: [Object.values(res.data.COLD).slice(0, this.day.length)]
          }
          this.datafirst.echarts4 = {
            id: 'optfirst4',
            title: '能源消费-热',
            legendShow: false,
            legendData: ['能源消费-热'],
            color: [this.red],
            areaColor: false,
            smooth: true,
            xData: this.day,
            yName: '(kWh)',
            data: [Object.values(res.data.HOT).slice(0, this.day.length)]
          }
        })
      } else {
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
        optenergy({
          buildingFacilitySubId: this.building2,
          dateType: this.dateType2
        }).then((res) => {
          this.datasecond.echarts3 = {
            id: 'optsecond3',
            title: '能源消费-电',
            legendShow: false,
            legendData: ['耗电'],
            color: [this.green],
            areaColor: false,
            smooth: true,
            xData: date,
            yName: '(kWh)',
            data: [Object.values(res.data.ELECTRICITY).slice(0, date.length)]
          }
          this.datasecond.echarts4 = {
            id: 'optsecond4',
            title: '能源消费-热水',
            legendShow: false,
            legendData: ['耗热水'],
            color: [this.yellow],
            areaColor: false,
            smooth: true,
            xData: date,
            yName: '(kWh)',
            data: [Object.values(res.data.HOT_WATER).slice(0, date.length)]
          }
          this.datasecond.echarts5 = {
            id: 'optsecond5',
            title: '能源消费-冷',
            legendShow: false,
            legendData: ['耗冷'],
            color: [this.blue],
            areaColor: false,
            smooth: true,
            xData: date,
            yName: '(kWh)',
            data: [Object.values(res.data.HOT).slice(0, date.length)]
          }
          this.datasecond.echarts6 = {
            id: 'optsecond6',
            title: '能源消费-热',
            legendShow: false,
            legendData: ['耗热'],
            color: [this.red],
            areaColor: false,
            smooth: true,
            yName: '(kWh)',
            xData: date,
            data: [Object.values(res.data.COLD).slice(0, date.length)]
          }
        })
      }
    },
    // 能源价格比较 数据 使用前与使用后
    getPrice (page) {
      if (page === 1) {
        optprice({
          dateType: 'day',
          buildingFacilitySubId: this.building1,
          supplyFacilityId: this.building1
        }).then((res) => {
          // console.log(res)
          this.price1 = [
            {
              title: '分布式能源',
              name: '使用前',
              num: parseInt(res.data.UnUsed),
              unit: '元'
            },
            {
              title: '分布式能源',
              name: '使用后',
              num: parseInt(res.data.Used),
              unit: '元'
            }
          ]
        })
      } else {
        optprice({
          dateType: 'day',
          buildingFacilitySubId: this.building2,
          supplyFacilityId: this.building2
        }).then((res) => {
          this.price2 = [
            {
              title: '分布式能源',
              name: '使用前',
              num: parseInt(res.data.UnUsed),
              unit: '元'
            },
            {
              title: '分布式能源',
              name: '使用后',
              num: parseInt(res.data.Used),
              unit: '元'
            }
          ]
        })
      }
    },
    // 订单数量 折线图 数据
    optSecondOrder () {
      let date
      let length
      switch (this.dateType2) {
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
      this.datasecond.echarts1 = {
        id: 'optsecond1',
        title: '订单数量',
        legendShow: false,
        legendData: ['订单数量'],
        color: [this.bgreen],
        areaColor: false,
        smooth: true,
        xData: date,
        yName: '(个)',
        data: [getTestList(150, length)]
      }
    }
  },
  mounted () {
    this.changeTab(0)
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
