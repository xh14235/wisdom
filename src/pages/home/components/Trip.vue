<template>
  <div class="wrapper">
    <div class="common-pages">
      <div class="common-page" v-if="this.tab === 0">
        <transition name="fadeRight" mode="out-in">
          <Tripfirst :list="datafirst"></Tripfirst>
        </transition>
      </div>
      <div class="common-page" v-else-if="this.tab === 1">
        <transition name="fadeRight" mode="out-in">
          <Tripsecond :list="datasecond"></Tripsecond>
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
import { tripRoad, tripParking, tripElectric, tripPower } from '@/request/trip-api'
import img1 from '@/assets/img/charging.png'
import img2 from '@/assets/img/electric-car.png'
import img4 from '@/assets/img/electric-bicycle.png'
import img3 from '@/assets/img/electric-boat.png'
export default {
  name: 'Trip',
  components: {
    Tripfirst: () => import('./trip/Tripfirst'),
    Tripsecond: () => import('./trip/Tripsecond')
  },
  data () {
    return {
      tab: 0,
      triptimer: null,
      duration: 60000,
      list: [
        {
          id: '01',
          title: '实时监控数据'
        },
        {
          id: '02',
          title: '设备使用情况'
        }
      ],
      datafirst: {
        echarts1: [],
        echarts2: [],
        echarts3: []
      },
      datasecond: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {},
        statistics: []
      }
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
    changeTab (index) {
      this.tab = index
      if (this.triptimer) clearInterval(this.triptimer)
      switch (index) {
        case 0:
          if (this.getBool(this.datafirst)) {
            // this.getPeopleNum()
            this.getRoad()
            this.getParking()
            this.triptimer = setInterval(() => {
              this.getRoad()
              this.getParking()
            }, this.duration)
          }
          break
        case 1:
          if (this.getBool(this.datasecond)) {
            this.getFrequency()
            this.getConsumePower()
            this.triptimer = setInterval(() => {
              this.getFrequency()
              this.getConsumePower()
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
          markData = this.ifr.markConfig['realWatching']
          positionData = this.ifr.sceneCenterConfig['realWatching']
          break
        case 1:
          markData = this.ifr.markConfig['deviceUse']
          positionData = this.ifr.sceneCenterConfig['deviceUse']
          break
        default:
          break
      }
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
    },
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
    // 人流量排行榜 数据
    getPeopleNum () {
      this.datafirst.echarts2 = [
        {
          id: '001',
          buildingFacilitySubName: '能源馆',
          value: 2343
        },
        {
          id: '002',
          buildingFacilitySubName: '展览馆',
          value: 2135
        },
        {
          id: '003',
          buildingFacilitySubName: '玫瑰供方',
          value: 1785
        },
        {
          id: '004',
          buildingFacilitySubName: '陶艺馆',
          value: 1401
        },
        {
          id: '005',
          buildingFacilitySubName: '烘焙馆',
          value: 1389
        },
        {
          id: '006',
          buildingFacilitySubName: '中医馆',
          value: 1321
        },
        {
          id: '007',
          buildingFacilitySubName: '养生馆',
          value: 1196
        },
        {
          id: '008',
          buildingFacilitySubName: '彩绘馆',
          value: 982
        },
        {
          id: '009',
          buildingFacilitySubName: '稻香馆',
          value: 663
        }
      ]
    },
    // 道路拥堵状况
    getRoad () {
      tripRoad().then((res) => {
        this.datafirst.echarts1 = res.data
      })
    },
    // 车位剩余情况
    getParking () {
      tripParking().then((res) => {
        this.datafirst.echarts3 = []
        for (let i = 0; i < res.data.length; i++) {
          this.datafirst.echarts3.push({
            echarts: {
              id: res.data[i].id,
              title: '{name|剩余车位}\n{value|' + res.data[i].laveNumber + '}',
              color: this.green,
              radius: ['75%', '85%'],
              center: ['50%', '50%'],
              titleTop: '30%',
              titleLeft: '50%',
              data: {
                name: res.data[i].name,
                value: res.data[i].laveNumber
              },
              allNum: res.data[i].totalNum
            }
          })
        }
      })
    },
    // 获取电动车船使用次数及智能路灯数量
    getFrequency () {
      tripElectric().then((res) => {
        let CHARGE_PILE = res.data.CHARGE_PILE
        let ELECTRIC_CAR = res.data.ELECTRIC_CAR
        let ELECTRIC_BOAT = res.data.ELECTRIC_BOAT
        let SMART_STREET_LIGHT = res.data.SMART_STREET_LIGHT
        this.datasecond.echarts1 = {
          id: 'trip_second1',
          title: '',
          legendShow: true,
          borderWidth: false,
          labelShow: false,
          graphic: img1,
          radius: ['40%', '50%'],
          center: ['50%', '50%'],
          color: [this.blue, this.green, this.yellow],
          data: [
            { value: CHARGE_PILE.total - CHARGE_PILE.maintenance - CHARGE_PILE.lave, name: '使用中' },
            { value: CHARGE_PILE.maintenance, name: '维护中' },
            { value: CHARGE_PILE.lave, name: '空闲中' }
          ],
          usingCount: CHARGE_PILE.usingCount
        }
        this.datasecond.echarts2 = {
          id: 'trip_second3',
          title: '',
          legendShow: true,
          borderWidth: false,
          labelShow: false,
          graphic: img2,
          radius: ['40%', '50%'],
          center: ['50%', '50%'],
          color: [this.blue, this.green, this.yellow],
          data: [
            { value: ELECTRIC_CAR.total - ELECTRIC_CAR.maintenance - ELECTRIC_CAR.lave, name: '使用中' },
            { value: ELECTRIC_CAR.maintenance, name: '维护中' },
            { value: ELECTRIC_CAR.lave, name: '空闲中' }
          ],
          usingCount: ELECTRIC_CAR.usingCount
        }
        this.datasecond.echarts3 = {
          id: 'trip_second5',
          title: '',
          legendShow: true,
          borderWidth: false,
          labelShow: false,
          graphic: img3,
          radius: ['40%', '50%'],
          center: ['50%', '50%'],
          color: [this.blue, this.green, this.yellow],
          data: [
            { value: ELECTRIC_BOAT.total - ELECTRIC_BOAT.maintenance - ELECTRIC_BOAT.lave, name: '使用中' },
            { value: ELECTRIC_BOAT.maintenance, name: '维护中' },
            { value: ELECTRIC_BOAT.lave, name: '空闲中' }
          ],
          usingCount: ELECTRIC_BOAT.usingCount
        }
        this.datasecond.echarts4 = {
          id: 'trip_second7',
          title: '',
          legendShow: true,
          borderWidth: false,
          labelShow: false,
          graphic: img4,
          radius: ['40%', '50%'],
          center: ['50%', '50%'],
          color: [this.blue, this.green, this.yellow],
          data: [
            { value: SMART_STREET_LIGHT.total - SMART_STREET_LIGHT.maintenance - SMART_STREET_LIGHT.lave, name: '使用中' },
            { value: SMART_STREET_LIGHT.maintenance, name: '维护中' },
            { value: SMART_STREET_LIGHT.lave, name: '空闲中' }
          ],
          usingCount: SMART_STREET_LIGHT.usingCount
        }
        this.datasecond.statistics = [
          {
            title: '路灯状态',
            name: '正常路灯',
            num: SMART_STREET_LIGHT.total - SMART_STREET_LIGHT.maintenance,
            unit: '个',
            imgUrl: require('../../../assets/img/lamp1.png')
          },
          {
            title: '路灯状态',
            name: '维护路灯',
            num: SMART_STREET_LIGHT.maintenance,
            unit: '个',
            imgUrl: require('../../../assets/img/lamp2.png')
          }
        ]
      })
    },
    // 获取耗电统计
    getConsumePower () {
      let time = new Date()
      let year = time.getFullYear()
      tripPower({
        labelId: '',
        year: year
      }).then((res) => {
        console.log(res)
        let data = res.data.data || []
        this.datasecond.echarts5 = {
          id: 'trip1',
          title: '',
          titleTop: 0,
          titleLeft: 0,
          legendShow: false,
          legendData: ['水'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          xData: this.year,
          yName: '(kWh)',
          data: [Object.values(data.CHARGING_PILE).slice(0, this.year.length)]
        }
        this.datasecond.echarts6 = {
          id: 'trip2',
          title: '',
          titleTop: 0,
          titleLeft: 0,
          legendShow: false,
          legendData: ['水'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          xData: this.year,
          yName: '(kWh)',
          data: [Object.values(data.SMART_LIGHT).slice(0, this.year.length)]
        }
      })
    },
    // 获取路灯状态
    getLampState () {
      this.datasecond.statistics = [
        {
          title: '路灯状态',
          name: '正常路灯',
          num: 1532,
          unit: '个',
          imgUrl: require('../../../assets/img/lamp1.png')
        },
        {
          title: '路灯状态',
          name: '维护路灯',
          num: 23,
          unit: '个',
          imgUrl: require('../../../assets/img/lamp2.png')
        }
      ]
    }
  },
  watch: {
    tab () {
      this.gisMethods(this.tab)
    }
  },
  mounted () {
    this.changeTab(0)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.triptimer)
    this.triptimer = null
  },
  activated () {
    if (this.triptimer) clearInterval(this.triptimer)
    switch (this.tab) {
      case 0:
        this.triptimer = setInterval(() => {
          this.getRoad()
          this.getParking()
        }, this.duration)
        break
      case 1:
        this.triptimer = setInterval(() => {
          this.getFrequency()
          this.getConsumePower()
        }, this.duration)
        break
      default:
        break
    }
  },
  beforeDestroy () {
    clearInterval(this.triptimer)
    this.triptimer = null
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
