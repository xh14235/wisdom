<template>
  <div class="wrapper">
    <div class="common-pages">
      <div class="common-page" v-if="this.tab === 0">
        <transition name="fadeRight" mode="out-in">
          <Tripfirst :list="datafirst" @emitTab="changeEmitTab"></Tripfirst>
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
import { tripRoad, tripParking, tripElectric, tripPower, tripPerson } from '@/request/trip-api'
import { buildingSelect } from '@/request/select-api'
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
        echarts3: [],
        podiumList: [],
        ranking: []
      },
      datasecond: {
        echarts1: {},
        echarts2: {},
        echarts3: {},
        echarts4: {},
        echarts5: {},
        echarts6: {},
        statistics: []
      },
      promiseRoad: null,
      promisePark: null,
      promiseFrequency: null
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
      rightTimer: state => state.rightTimer
    })
  },
  methods: {
    changeTab (index) {
      this.tab = index
      if (this.triptimer) clearInterval(this.triptimer)
      switch (index) {
        case 0:
          if (this.getBool(this.datafirst)) {
            this.getRoad()
            this.getParking()
            this.getPodiumList()
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
      if (this.rightTimer) {
        this.gisMethods()
      }
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
    // 道路拥堵状况
    getRoad () {
      this.promiseRoad = new Promise((resolve, reject) => {
        tripRoad().then((res) => {
          if (res.data) {
            res.data[0].statusName = '拥堵'
            res.data[0].status = 'BLOCKED'
            res.data[1].statusName = '拥堵'
            res.data[1].status = 'BLOCKED'
            this.datafirst.echarts1 = res.data
            resolve(this.datafirst.echarts1)
          }
        })
      })
    },
    // 在线人数排行分类 民宿 共建 产业等
    getPodiumList () {
      buildingSelect().then((res) => {
        let data = res.data
        this.datafirst.podiumList = []
        for (let i = 0; i < data.length; i++) {
          if (i === 0 || i === 2 || i === 3) {
            this.datafirst.podiumList.push(data[i])
          }
        }
        this.getRanking(this.datafirst.podiumList[0].facilityId)
      })
    },
    // 在线人数排行
    getRanking (id) {
      tripPerson({
        facilityId: id,
        topNum: 3
      }).then((res) => {
        let defaultList = [
          {
            id: '001',
            title: '彩绘馆',
            num: 0
          },
          {
            id: '002',
            title: '彩釉馆',
            num: 0
          },
          {
            id: '003',
            title: '陶瓷馆',
            num: 0
          }
        ]
        let data = res.data
        this.datafirst.ranking = []
        for (let i = 0; i < data.length; i++) {
          this.datafirst.ranking.push({
            id: data[i].bfsId,
            title: data[i].name,
            num: data[i].onlineNumber
          })
        }
        if (this.datafirst.ranking.length === 0) this.datafirst.ranking = defaultList
      })
    },
    // 车位剩余情况
    getParking () {
      this.promisePark = new Promise((resolve, reject) => {
        tripParking().then((res) => {
          this.datafirst.echarts3 = []
          let data = res.data
          if (data) {
            for (let i = 0; i < data.length; i++) {
              this.datafirst.echarts3.push({
                echarts: {
                  id: data[i].id,
                  title: '{name|剩余车位}\n{value|' + data[i].laveNumber + '}',
                  color: this.green,
                  radius: ['75%', '85%'],
                  center: ['50%', '50%'],
                  titleTop: '30%',
                  titleLeft: '50%',
                  data: {
                    name: data[i].name,
                    value: data[i].laveNumber
                  },
                  allNum: data[i].totalNum
                }
              })
            }
            resolve(data)
          }
        })
      })
    },
    // 子组件传值
    changeEmitTab (podiumTab) {
      this.getRanking(this.datafirst.podiumList[podiumTab].facilityId)
    },
    // 获取电动车船使用次数及智能路灯数量
    getFrequency () {
      this.promiseFrequency = new Promise((resolve, reject) => {
        tripElectric().then((res) => {
          let data = res.data
          console.log(data)
          data = {
            CHARGE_PILE: {lave: 1, maintenance: 0, total: 2, usingCount: 1},
            ELECTRIC_BICYCLE: {lave: 0, maintenance: 0, total: 12, usingCount: 3},
            ELECTRIC_BOAT: {lave: 0, maintenance: 0, total: 6, usingCount: 1},
            ELECTRIC_CAR: {lave: 0, maintenance: 0, total: 10, usingCount: 2},
            SMART_STREET_LIGHT: {lave: 0, maintenance: 3, total: 300, usingCount: 0}
          }
          if (data) {
            let CHARGE_PILE = data.CHARGE_PILE
            let ELECTRIC_CAR = data.ELECTRIC_CAR
            let ELECTRIC_BOAT = data.ELECTRIC_BOAT
            let ELECTRIC_BICYCLE = data.ELECTRIC_BICYCLE
            let SMART_STREET_LIGHT = data.SMART_STREET_LIGHT
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
                { value: CHARGE_PILE.usingCount, name: '使用中' },
                { value: CHARGE_PILE.maintenance, name: '维护中' },
                { value: CHARGE_PILE.total - CHARGE_PILE.usingCount, name: '空闲中' }
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
                { value: ELECTRIC_CAR.usingCount, name: '使用中' },
                { value: ELECTRIC_CAR.maintenance, name: '维护中' },
                { value: ELECTRIC_CAR.total - ELECTRIC_CAR.usingCount, name: '空闲中' }
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
                { value: ELECTRIC_BOAT.usingCount, name: '使用中' },
                { value: ELECTRIC_BOAT.maintenance, name: '维护中' },
                { value: ELECTRIC_BOAT.total - ELECTRIC_BOAT.usingCount, name: '空闲中' }
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
                { value: ELECTRIC_BICYCLE.usingCount, name: '使用中' },
                { value: ELECTRIC_BICYCLE.maintenance, name: '维护中' },
                { value: ELECTRIC_BICYCLE.total - ELECTRIC_BICYCLE.usingCount, name: '空闲中' }
              ],
              usingCount: ELECTRIC_BICYCLE.usingCount
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
            resolve(data)
          }
        })
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
        let data = res.data
        let arr1 = []
        let arr2 = []
        if (data) {
          arr1 = Object.values(data.CHARGING_PILE).slice(0, this.year.length)
          arr2 = Object.values(data.SMART_LIGHT).slice(0, this.year.length)
        } else {
          arr1 = [122, 532, 164, 265, 145, 236, 336, 462, 245, 436, 256, 411]
          arr2 = [236, 289, 371, 245, 436, 122, 532, 164, 265, 145, 256, 411]
        }
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
          data: [arr1]
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
          data: [arr2]
        }
      })
    },
    // 地图方法
    gisMethods () {
      this.ifr.clearMarks()
      let positionData
      switch (this.tab) {
        case 0:
          positionData = this.ifr.sceneCenterConfig['realWatching']
          let markers = this.ifr.markConfig['realWatching']
          this.promisePark.then(data => {
            let markData = markers.map((item, index) => {
              for (let i = 0; i < data.length; i++) {
                if (item.Name.includes(data[i].name)) {
                  item.Other = [
                    {
                      'Key': '总车位数',
                      'Value': '' + data[i].totalNum
                    },
                    {
                      'Key': '剩余车位数',
                      'Value': '' + data[i].laveNumber
                    }
                  ]
                }
              }
              return item
            })
            this.ifr.setMarkData(markData)
          })
          break
        case 1:
          positionData = this.ifr.sceneCenterConfig['deviceUse']
          this.promiseFrequency.then(data => {
            let markData = this.ifr.markConfig['deviceUse']
            markData[0].Other = [
              {
                'Key': '总数',
                'Value': data.CHARGE_PILE.total
              },
              {
                'Key': '剩余数',
                'Value': data.CHARGE_PILE.lave
              }
            ]
            markData[1].Other = [
              {
                'Key': '总数',
                'Value': data.ELECTRIC_BOAT.total
              },
              {
                'Key': '剩余数',
                'Value': data.ELECTRIC_BOAT.lave
              }
            ]
            markData[2].Other = [
              {
                'Key': '总数',
                'Value': data.ELECTRIC_CAR.total
              },
              {
                'Key': '剩余数',
                'Value': data.ELECTRIC_CAR.lave
              }
            ]
            markData[3].Other = [
              {
                'Key': '总数',
                'Value': data.SMART_STREET_LIGHT.total
              },
              {
                'Key': '剩余数',
                'Value': data.SMART_STREET_LIGHT.lave
              }
            ]
            this.ifr.setMarkData(markData)
          })
          break
        default:
          break
      }
      this.ifr.setCameraSettingWithCoordinate(positionData)
      // 隐藏热力图
      this.ifr.showPeopleHeatingItem([])
      // 隐藏能留图
      this.ifr.activePipeNetWork('false')
      // 设置道路状态---------------------------------------
      this.promiseRoad.then(res => {
        let road = []
        res.forEach(item => {
          if (item.status === 'BLOCKED') {
            this.ifr.setRoadStatus(item.name + '_3')
            road.push(item.name)
          }
        })
        localStorage.road = road
      })
      setTimeout(() => {
        this.ifr.setMarkData(JSON.parse(sessionStorage.getItem('alarmMarkers')))
      }, 0)
    }
  },
  // 页面切换时，停止或重启定时器
  activated () {
    if (this.triptimer) clearInterval(this.triptimer)
    this.changeTab(this.tab)
    this.ifr.activePipeNetWork('false')
  },
  deactivated () {
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
