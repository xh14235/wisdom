<template>
  <div class="wrapper">
    <div class="common-title">
      <div>设备运维 <span>({{subTitle}})</span></div>
    </div>
    <div class="common-pages">
      <div class="common-page" v-if="this.tab === 0">
        <transition name="fade" mode="out-in">
          <Opefirst :infoList="infoList" :echarts="echarts" @changeSelect1="changeSelect1"></Opefirst>
        </transition>
      </div>
      <div class="common-page" v-else-if="this.tab === 1">
        <transition name="fade" mode="out-in">
          <Opesecond :infoList="infoList" :echarts="echarts" @changeSelect2="changeSelect2"></Opesecond>
        </transition>
      </div>
      <div class="common-page" v-else>
        <transition name="fade" mode="out-in">
          <Opethird :infoList="infoList" :echarts="echarts" @changeSelect3="changeSelect3"></Opethird>
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
import { getTestList } from '@/request/common-api.js'
import { supHead1, suphotline, supcoldline, suphotwaterline } from '@/request/supply-api'
import { operationCube } from '@/request/operation-api'
export default {
  name: 'Operation',
  components: {
    Opefirst: () => import('./operation/Opefirst'),
    Opesecond: () => import('./operation/Opesecond'),
    Opethird: () => import('./operation/Opethird')
  },
  data () {
    return {
      tab: 0,
      operationtimer: null,
      duration: 60000,
      subTitle: '',
      list: [
        {
          id: '01',
          title: '全村域'
        },
        {
          id: '02',
          title: '分布式能源'
        },
        {
          id: '03',
          title: '代运维设备'
        }
      ],
      infoList: [],
      echarts: {},
      // 全村域热水、冷、热
      list1: [],
      list2: [],
      list3: []
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
      ifr: state => state.map.ifr,
      iconHeight: state => state.map.iconHeight,
      jumpTime: state => state.map.jumpTime,
      viewX: state => state.map.viewX,
      viewY: state => state.map.viewY,
      viewZ: state => state.map.viewZ
    })
  },
  methods: {
    // 分页切换
    changeTab (index) {
      this.tab = index
      this.subTitle = this.list[index].title
      if (this.operationtimer) clearInterval(this.operationtimer)
      switch (index) {
        case 0:
          // this.gisAllElectric()
          this.ifr.activePipeNetWork('ture')
          this.getAllElectric()
          this.operationtimer = setInterval(() => {
            this.getAllElectric()
          }, this.duration)
          break
        case 1:
          // this.gis6Cubes()
          this.getCube936('1254288413020762112')
          this.operationtimer = setInterval(() => {
            this.getCube936('1254288413020762112')
          }, this.duration)
          this.ifr.activePipeNetWork('false')
          break
        case 2:
          this.ifr.clearMarks()
          this.operationLine(3)
          this.operationtimer = setInterval(() => {
            this.operationLine(3)
          }, this.duration)
          this.ifr.activePipeNetWork('false')
          break
        default:
          break
      }
    },
    // 全村域 电 地图
    gisAllElectric () {
      this.ifr.clearMarks()
      let markData = this.ifr.markConfig['powerDeal']
      let positionData = this.ifr.sceneCenterConfig['powerDeal']
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
    },
    // 全村域 冷、热、水 地图
    gisAllHot () {
      this.ifr.clearMarks()
      let markData = this.ifr.markConfig['itemData']
      let positionData = this.ifr.sceneCenterConfig['itemData']
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
    },
    // 分布式能源 六个魔方 地图
    gis6Cubes () {
      this.ifr.clearMarks()
      let markData = this.ifr.markConfig['distributedPower']
      let positionData = this.ifr.sceneCenterConfig['distributedPower']
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
    },
    // 根据下拉框组件传来的数据改变视图
    changeSelect1 (code) {
      if (code.id === '11') {
        this.getAllElectric()
        // this.gisAllElectric()
      } else {
        this.getAllHot()
        // this.gisAllHot()
      }
    },
    changeSelect2 (item) {
      if (item[1].id === '1') {
        this.getCube936(item[0].id)
      } else {
        this.operationLine(2)
      }
    },
    changeSelect3 (code) {
      this.operationLine(3)
    },
    // 获取信息中心列表信息 数据
    getInfoList () {
      this.infoList = [
        {
          id: '0001',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 0
        },
        {
          id: '0002',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 1
        },
        {
          id: '0003',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 2
        },
        {
          id: '0004',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 0
        },
        {
          id: '0005',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 1
        },
        {
          id: '0006',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 2
        },
        {
          id: '0007',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 0
        }
      ]
    },
    // 获取全村域 用电 折线图 数据
    getAllElectric () {
      supHead1().then((res) => {
        let time = new Date()
        let hour = time.getHours() + 1
        let DISTRIBUTED_ENERGY = res.data.DISTRIBUTED_ENERGY
        let ENERGY_EXTERNAL = res.data.ENERGY_EXTERNAL
        let list1 = []
        let list2 = []
        let xData = []
        let j = 0
        for (let i = 0; i < DISTRIBUTED_ENERGY.length; i++) {
          if (DISTRIBUTED_ENERGY[i].lasted) {
            list1.push(DISTRIBUTED_ENERGY[i].value)
            j++
            xData.push(j)
          }
          if (ENERGY_EXTERNAL[i].lasted) {
            list2.push(ENERGY_EXTERNAL[i].value)
          }
        }
        this.echarts = {
          id: 'line1111',
          title: '',
          legendShow: true,
          legendData: ['分布式能源', '外来电', '储能量'],
          color: [this.green, this.yellow, this.blue],
          areaColor: false,
          smooth: true,
          xData: xData,
          yName: '(kW)',
          data: [list1, list2, getTestList(300, hour)],
          y2: true,
          yName2: '(kWh)'
        }
      })
    },
    // 获取全村域 水热冷 折线图 数据
    getAllHot () {
      let date = new Date()
      let hour = date.getHours()
      let hourList = []
      for (let i = 0; i < hour; i++) {
        hourList.push(i)
      }
      let promise1 = new Promise((resolve, reject) => {
        suphotwaterline().then((res) => {
          let data = res.data
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].lasted) {
                this.list1.push(data[i].value)
              }
            }
          } else {
            this.list1 = getTestList(20, 12)
          }
          resolve(this.list1)
        })
      })
      let promise2 = new Promise((resolve, reject) => {
        supcoldline().then((res) => {
          let data = res.data
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].lasted) {
                this.list2.push(data[i].value)
              }
            }
          } else {
            this.list2 = getTestList(200, hour)
          }
          resolve(this.list2)
        })
      })
      let promise3 = new Promise((resolve, reject) => {
        suphotline().then((res) => {
          let data = res.data
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].lasted) {
                this.list3.push(data[i].value)
              }
            }
          } else {
            this.list3 = getTestList(20, 12)
          }
          resolve(this.list3)
        })
      })
      Promise.all([promise1, promise2, promise3]).then((res) => {
        this.echarts = {
          id: 'line1111',
          title: '',
          legendShow: true,
          legendData: ['供热水', '供冷', '供热'],
          color: [this.yellow, this.blue, this.red],
          areaColor: false,
          smooth: true,
          xData: hourList,
          yName: '(kW)',
          data: res
        }
      })
    },
    // 分布式能源折线图 数据
    getCube936 (cubeType) {
      operationCube({
        cubeId: cubeType
      }).then((res) => {
        let data = res.data
        let list = []
        let xData = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].lasted) {
            list.push(data[i].value)
            xData.push(data[i].hourValue)
          }
        }
        let legend = []
        let color = []
        switch (cubeType) {
          case '1254288413020762112':
            legend = ['供冷总计', '供热总计']
            color = [this.blue, this.red]
            break
          case '1254288413020762113':
            legend = ['供热水总计']
            color = [this.yellow]
            break
          case '1254288413020762114':
            legend = ['供热水总计']
            color = [this.yellow]
            break
          case '1254288413024956416':
            legend = ['供电总计']
            color = [this.green]
            break
          case '1254288413024956417':
            legend = ['供电总计']
            color = [this.green]
            break
          case '1254288413024956418':
            legend = ['供电总计']
            color = [this.green]
            break
          default:
            break
        }
        this.echarts = {
          id: 'line1111',
          title: '',
          legendShow: legend.length > 1,
          legendData: legend,
          color: color,
          areaColor: false,
          smooth: true,
          xData: xData,
          yName: '(kW)',
          data: [list]
        }
      })
    },
    // 获取随机折线图
    operationLine (num) {
      this.echarts = {
        id: 'line1111',
        title: '',
        legendShow: false,
        legendData: ['供电总计'],
        color: [this.green],
        areaColor: false,
        smooth: true,
        xData: this.day,
        yName: '(kWh)',
        data: [getTestList(150, 24)]
      }
    }
  },
  mounted () {
    this.getInfoList()
    this.getAllElectric()
    this.changeTab(0)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.operationtimer)
    this.operationtimer = null
  },
  activated () {
    if (this.operationtimer) clearInterval(this.operationtimer)
    switch (this.tab) {
      case 0:
        // this.gisAllElectric()
        this.ifr.activePipeNetWork('true')
        this.operationtimer = setInterval(() => {
          this.getAllElectric()
        }, this.duration)
        break
      case 1:
        // this.gis6Cubes()
        this.operationtimer = setInterval(() => {
          this.getCube936('1254288413020762112')
        }, this.duration)
        break
      case 2:
        this.ifr.clearMarks()
        this.operationtimer = setInterval(() => {
          this.operationLine(3)
        }, this.duration)
        break
      default:
        break
    }
  },
  beforeDestroy () {
    clearInterval(this.operationtimer)
    this.operationtimer = null
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
</style>
