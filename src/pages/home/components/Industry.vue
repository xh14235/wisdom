<template>
  <div class="industry-wrapper">
    <div class="common-title">
      <div>今年产业销量统计</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <div class="common-echarts-title">乡村会客厅 <span>销售额总计：<b>{{parseFloat(totle1).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts1.id" :lineData="echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">玫瑰工坊 <span>销售额总计：<b>{{parseFloat(totle2).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts2.id" :lineData="echarts2"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">合作社 <span>销售额总计：<b>{{parseFloat(totle3).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts3.id" :lineData="echarts3"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">网红打卡点 <span>销售额总计：<b>{{parseFloat(totle4).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts4.id" :lineData="echarts4"></Eline>
      </div>
    </div>
    <div class="common-title">
      <div>今年合作社销量</div>
    </div>
    <div class="tab-wrapper">
      <div class="tab-box" :class="{'active': index === cooperativeTab}" v-for="(item, index) of cooperativeList" :key="item.id" @click="changeCooperative(item, index)">{{item.name}}</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <div class="common-echarts-title">销售额 <span>总计：<b>{{parseFloat(5200).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts5.id" :lineData="echarts5"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">订单数 <span>总计：<b>{{parseFloat(152).toLocaleString()}}</b>个</span></div>
        <Eline class="echarts-with-title" v-if="echarts6.id" :lineData="echarts6"></Eline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { industryfirst2, industrysecond2, industrycooperative, industrysales, industryorder } from '@/request/industry-api'
import { venueSelect } from '@/request/select-api'
export default {
  name: 'Industry',
  components: {
    Eline: () => import('@/common/echarts/Eline')
  },
  data () {
    return {
      echarts1: {},
      totle1: 0,
      echarts2: {},
      totle2: 0,
      echarts3: {},
      totle3: 0,
      echarts4: {},
      totle4: 0,
      echarts5: {},
      echarts6: {},
      cooperativeList: [],
      industryList: [],
      cooperativeTab: 0,
      industrytimer: null,
      duration: 60000,
      // 玫瑰工坊、乡村会客厅等
      p1: null,
      p2: null,
      p3: null,
      p4: null,
      // 合作社
      p5: null,
      p6: null,
      p7: null,
      p8: null,
      p9: null,
      p10: null,
      p11: null,
      p12: null,
      p13: null
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
    // 获取各产业建筑列表
    getIndustryList () {
      venueSelect({
        facilityId: '1254292656276447234'
      }).then((res) => {
        this.industryList = res.data
        this.meetingRoom()
        this.rose()
        this.cooperative()
        this.celebrity()
      })
    },
    // 获取合作社列表
    getCooperative () {
      industrycooperative().then((res) => {
        this.cooperativeList = res.data
        this.getSalesVolume(this.cooperativeList[this.cooperativeTab].id)
        this.getOrders(this.cooperativeList[this.cooperativeTab].id)
        // promise
        this.getPromise5(this.cooperativeList[0].id)
        this.getPromise6(this.cooperativeList[0].id)
        this.getPromise7(this.cooperativeList[0].id)
        this.getPromise8(this.cooperativeList[0].id)
        this.getPromise9(this.cooperativeList[0].id)
        this.getPromise10(this.cooperativeList[0].id)
        this.getPromise11(this.cooperativeList[0].id)
        this.getPromise12(this.cooperativeList[0].id)
        this.getPromise13(this.cooperativeList[0].id)
      })
    },
    // 乡村会客厅
    meetingRoom () {
      let date = new Date()
      let year = date.getFullYear()
      this.p1 = new Promise((resolve, reject) => {
        industryfirst2({
          bfsId: this.industryList[1].id,
          year
        }).then(res => {
          this.echarts1 = {
            id: 'indfirst1',
            title: '',
            legendShow: false,
            legendData: ['水'],
            color: [this.green],
            areaColor: true,
            smooth: true,
            yName: '(元)',
            xData: this.year,
            data: [Object.values(res.data)]
          }
          this.totle1 = 0
          for (let i in res.data) {
            this.totle1 += res.data[i]
          }
          resolve(this.totle1)
        })
      })
    },
    // 玫瑰工坊echarts图，需传参
    rose () {
      let date = new Date()
      let year = date.getFullYear()
      this.p2 = new Promise((resolve, reject) => {
        industryfirst2({
          bfsId: this.industryList[0].id,
          year
        }).then(res => {
          this.echarts2 = {
            id: 'indfirst2',
            title: '',
            legendShow: false,
            legendData: ['水'],
            color: [this.yellow],
            areaColor: true,
            smooth: true,
            yName: '(元)',
            xData: this.year,
            data: [Object.values(res.data)]
          }
          this.totle2 = 0
          for (let i in res.data) {
            this.totle2 += res.data[i]
          }
          resolve(this.totle2)
        })
      })
    },
    // 合作社echarts图，需传参
    cooperative () {
      let date = new Date()
      let year = date.getFullYear()
      this.p3 = new Promise((resolve, reject) => {
        industrysecond2({
          labelId: this.industryList[4].labelId,
          year
        }).then(res => {
          this.echarts3 = {
            id: 'indfirst3',
            title: '',
            legendShow: false,
            legendData: ['水'],
            color: [this.green],
            areaColor: true,
            smooth: true,
            yName: '(元)',
            xData: this.year,
            data: [Object.values(res.data)]
          }
          this.totle3 = 0
          for (let i in res.data) {
            this.totle3 += res.data[i]
          }
          resolve(this.totle3)
        })
      })
    },
    // 网红打卡点echarts图，需传参
    celebrity () {
      let date = new Date()
      let year = date.getFullYear()
      this.p4 = new Promise((resolve, reject) => {
        industrysecond2({
          labelId: this.industryList[11].labelId,
          year
        }).then(res => {
          this.echarts4 = {
            id: 'indfirst4',
            title: '',
            legendShow: false,
            legendData: ['水'],
            color: [this.yellow],
            areaColor: true,
            smooth: true,
            yName: '(元)',
            xData: this.year,
            data: [Object.values(res.data)]
          }
          this.totle4 = 0
          for (let i in res.data) {
            this.totle4 += res.data[i]
          }
          resolve(this.totle4)
        })
      })
    },
    // 底部两个echarts图 各合作社销售额、订单数 数据
    getSalesVolume (id) {
      let date = new Date()
      let year = date.getFullYear()
      industrysales({
        bfsId: id,
        year: year
      }).then((res) => {
        this.echarts5 = {
          id: 'indfirst5',
          title: '',
          legendShow: false,
          legendData: ['水'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          yName: '(元)',
          xData: this.year,
          data: [Object.values(res.data).slice(0, this.year.length)]
        }
      })
    },
    getOrders (id) {
      let date = new Date()
      let year = date.getFullYear()
      industryorder({
        bfsId: id,
        year: year
      }).then((res) => {
        this.echarts6 = {
          id: 'indfirst6',
          title: '',
          legendShow: false,
          legendData: ['水'],
          color: [this.yellow],
          areaColor: true,
          smooth: true,
          yName: '(个)',
          xData: this.year,
          data: [Object.values(res.data).slice(0, this.year.length)]
        }
      })
    },
    // 更改合作社
    changeCooperative (item, index) {
      this.cooperativeTab = index
      // 跳转到单个撒点
      this.ifr.clearMarks()
      let markData = []
      let arr = this.ifr.markConfig.Watching24
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].Name.includes(item.name)) {
          markData.push(arr[index])
        }
      }
      this.ifr.setMarkData(markData)
      let center = {
        'Distance': '1.953',
        'PosX': markData[0].Longitude,
        'PosY': markData[0].Latitude,
        'Time': 1,
        'X': '184.1298',
        'Y': '54.2352'
      }
      this.ifr.setCameraSettingWithCoordinate(center)
      setTimeout(() => {
        this.ifr.setMarkData(JSON.parse(sessionStorage.getItem('alarmMarkers')))
      }, 0)
    },
    // 老乔渔业
    getPromise5 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p5 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // 祥根渔业
    getPromise6 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p6 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // 道基食用菌
    getPromise7 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p7 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // 志磊食用菌
    getPromise8 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p8 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // 秀珍水产
    getPromise9 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p9 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // 春邱苗木
    getPromise10 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p10 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // 阳庆果蔬
    getPromise11 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p11 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // "绿泥瓜果蔬"
    getPromise12 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p12 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // "亿缘蔬果"
    getPromise13 (id) {
      let date = new Date()
      let year = date.getFullYear()
      this.p13 = new Promise((resolve, reject) => {
        industrysales({
          bfsId: id,
          year: year
        }).then((res) => {
          resolve(res.data[12])
        })
      })
    },
    // 地图方法
    gisMethod () {
      Promise.all([this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9, this.p10, this.p11, this.p12, this.p13]).then(res => {
        this.ifr.clearMarks()
        let markData = this.ifr.markConfig['industry']
        markData[0].Other = [
          {
            'Key': '销售额',
            'Value': res[3] + '元'
          }
        ]
        markData[1].Other = [
          {
            'Key': '销售额',
            'Value': res[1] + '元'
          }
        ]
        markData[2].Other = [
          {
            'Key': '销售额',
            'Value': res[0] + '元'
          }
        ]
        markData[3].Other = [
          {
            'Key': '销售额',
            'Value': res[2] + '元'
          }
        ]
        markData[4].Other = [
          {
            'Key': '销售额',
            'Value': res[10] + '元'
          }
        ]
        markData[5].Other = [
          {
            'Key': '销售额',
            'Value': res[11] + '元'
          }
        ]
        markData[6].Other = [
          {
            'Key': '销售额',
            'Value': res[4] + '元'
          }
        ]
        markData[7].Other = [
          {
            'Key': '销售额',
            'Value': res[5] + '元'
          }
        ]
        markData[8].Other = [
          {
            'Key': '销售额',
            'Value': res[6] + '元'
          }
        ]
        markData[9].Other = [
          {
            'Key': '销售额',
            'Value': res[7] + '元'
          }
        ]
        markData[10].Other = [
          {
            'Key': '销售额',
            'Value': res[8] + '元'
          }
        ]
        markData[11].Other = [
          {
            'Key': '销售额',
            'Value': res[9] + '元'
          }
        ]
        markData[12].Other = [
          {
            'Key': '销售额',
            'Value': res[12] + '元'
          }
        ]
        let positionData = this.ifr.sceneCenterConfig['industry']
        this.ifr.setMarkData(markData)
        this.ifr.setCameraSettingWithCoordinate(positionData)
        // 隐藏热力图
        this.ifr.showPeopleHeatingItem([])
        // 隐藏能留图
        this.ifr.activePipeNetWork('false')
        // 清除道路状态
        let road = localStorage.road.split(',')
        road.forEach(item => {
          this.ifr.setRoadStatus(item + '_0')
        })
        setTimeout(() => {
          this.ifr.setMarkData(JSON.parse(sessionStorage.getItem('alarmMarkers')))
        }, 0)
      })
    }
  },
  watch: {
    cooperativeTab () {
      this.getSalesVolume(this.cooperativeList[this.cooperativeTab].id)
      this.getOrders(this.cooperativeList[this.cooperativeTab].id)
    }
  },
  // 页面切换时，停止或重启定时器
  activated () {
    if (this.rightTimer) {
      setTimeout(() => {
        this.gisMethod()
      }, 1000)
    }
    this.getIndustryList()
    this.getCooperative()
    if (this.industrytimer) clearInterval(this.industrytimer)
    this.industrytimer = setInterval(() => {
      this.meetingRoom()
      this.rose()
      this.cooperative()
      this.celebrity()
    }, this.duration)
  },
  deactivated () {
    clearInterval(this.industrytimer)
    this.industrytimer = null
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.industry-wrapper
  .common-echarts-wrapper
    .common-echarts-box
      height: 22vh
      .common-echarts-title
        display: flex
        justify-content: space-between
        font-size: 18px
        @media screen and (max-width: 1920px)
          font-size: 12px
        span
          font-size: 16px
          font-weight: normal
          color: $lgreen
          @media screen and (max-width: 1920px)
            font-size: 12px
          b
            color: $yellow
  .tab-wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    margin: 1vh 0
    .tab-box
      flex: 0 0 32%
      width: 32%
      text-align: center
      height: 3.7vh
      line-height: 3.7vh
      border: 1px solid $green
      border-radius: 2px
      margin: 2px 0
      color: $green
      font-size: 18px
      cursor: pointer
      @media screen and (max-width: 1920px)
        font-size: 14px
        height: 2.5vh
        line-height: 2.5vh
      &.active
        background: rgba(74,204,129,0.2)
</style>
