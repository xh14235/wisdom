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
      <div class="tab-box" :class="{'active': index === cooperativeTab}" v-for="(item, index) of cooperativeList" :key="item.id" @click="changeCooperative(item.id, index)">{{item.name}}</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <div class="common-echarts-title">销售额 <span>总计：<b>{{parseFloat(5200).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts5.id" :lineData="echarts5"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">订单数 <span>总计：<b>{{parseFloat(5200).toLocaleString()}}</b>元</span></div>
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
      promise1: null
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
      ifr: state => state.map.ifr
    }),
    cooLength () {
      return this.cooperativeList.length
    },
    industryLength () {
      return this.industryList.length
    }
  },
  methods: {
    // 前四个echarts图
    first4 () {
      let date = new Date()
      let year = date.getFullYear()
      // 乡村会客厅echarts图，需传参
      this.promise1 = new Promise((resolve, reject) => {
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
            // data: [Object.values(COUNTY_MEETING).slice(0, this.year.length)]
            data: [Object.values(res.data)]
          }
          this.totle1 = 0
          for (let i in res.data) {
            this.totle1 += res.data[i]
          }
          resolve(this.totle1)
        })
      })
      // 玫瑰工坊echarts图，需传参
      let promise2 = new Promise((resolve, reject) => {
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
            // data: [Object.values(ROSE_SQUARE).slice(0, this.year.length)]
            data: [Object.values(res.data)]
          }
          this.totle2 = 0
          for (let i in res.data) {
            this.totle2 += res.data[i]
          }
          resolve(this.totle2)
        })
      })
      // 合作社echarts图，需传参
      let promise3 = new Promise((resolve, reject) => {
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
            // data: [Object.values(COOPERATIVE).slice(0, this.year.length)]
            data: [Object.values(res.data)]
          }
          this.totle3 = 0
          for (let i in res.data) {
            this.totle3 += res.data[i]
          }
          resolve(this.totle3)
        })
      })
      // 网红打卡点echarts图，需传参
      let promise4 = new Promise((resolve, reject) => {
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
            // data: [Object.values(INTERNET_CELEBRITIES).slice(0, this.year.length)]
            data: [Object.values(res.data)]
          }
          this.totle4 = 0
          for (let i in res.data) {
            this.totle4 += res.data[i]
          }
          resolve(this.totle4)
        })
      })
      Promise.all([this.promise1, promise2, promise3, promise4]).then(res => {
        console.log(res)
        this.ifr.clearMarks()
        let markData = this.ifr.markConfig['industry']
        markData[0].Other = [
          {
            'Key': '销售额',
            'Value': res[3]
          }
        ]
        markData[1].Other = [
          {
            'Key': '销售额',
            'Value': res[1]
          }
        ]
        markData[2].Other = [
          {
            'Key': '销售额',
            'Value': res[0]
          }
        ]
        let positionData = this.ifr.sceneCenterConfig['industry']
        this.ifr.setMarkData(markData)
        this.ifr.setCameraSettingWithCoordinate(positionData)
      })
    },
    // 乡村会客厅echarts图，需传参
    meetingRoom () {
      let date = new Date()
      let year = date.getFullYear()
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
          // data: [Object.values(COUNTY_MEETING).slice(0, this.year.length)]
          data: [Object.values(res.data)]
        }
        this.totle1 = 0
        for (let i in res.data) {
          this.totle1 += res.data[i]
        }
      })
    },
    // 玫瑰工坊echarts图，需传参
    rose () {
      let date = new Date()
      let year = date.getFullYear()
      industryfirst2({
        bfsId: this.industryList[0].id,
        year
      }).then(res => {
        console.log(res)
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
          // data: [Object.values(ROSE_SQUARE).slice(0, this.year.length)]
          data: [Object.values(res.data)]
        }
        this.totle2 = 0
        for (let i in res.data) {
          this.totle2 += res.data[i]
        }
      })
    },
    // 合作社echarts图，需传参
    cooperative () {
      let date = new Date()
      let year = date.getFullYear()
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
          // data: [Object.values(COOPERATIVE).slice(0, this.year.length)]
          data: [Object.values(res.data)]
        }
        this.totle3 = 0
        for (let i in res.data) {
          this.totle3 += res.data[i]
        }
      })
    },
    // 网红打卡点echarts图，需传参
    celebrity () {
      let date = new Date()
      let year = date.getFullYear()
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
          // data: [Object.values(INTERNET_CELEBRITIES).slice(0, this.year.length)]
          data: [Object.values(res.data)]
        }
        this.totle4 = 0
        for (let i in res.data) {
          this.totle4 += res.data[i]
        }
      })
    },
    // 获取合作社列表
    getCooperative () {
      industrycooperative().then((res) => {
        console.log(res.data)
        this.cooperativeList = res.data
      })
    },
    // 获取各产业建筑列表
    getIndustryList () {
      venueSelect({
        facilityId: '1254292656276447234'
      }).then((res) => {
        console.log(res)
        this.industryList = res.data
      })
    },
    // 更改合作社
    changeCooperative (id, index) {
      this.cooperativeTab = index
    },
    // 底部两个echarts图 各合作社销售额、订单数 数据
    getLast2 (id) {
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
          yName: '(元)',
          xData: this.year,
          data: [Object.values(res.data).slice(0, this.year.length)]
        }
      })
    }
  },
  watch: {
    cooperativeTab () {
      this.getLast2(this.cooperativeList[this.cooperativeTab].id)
    },
    cooLength () {
      this.getLast2(this.cooperativeList[this.cooperativeTab].id)
    },
    industryLength () {
      this.first4()
      // this.meetingRoom()
      // this.rose()
      // this.cooperative()
      // this.celebrity()
    }
  },
  mounted () {
    this.getCooperative()
    this.getIndustryList()
    this.first4()
    // this.gisMethods()
    this.industrytimer = setInterval(() => {
      this.first4()
      // this.meetingRoom()
      // this.rose()
      // this.cooperative()
      // this.celebrity()
      this.getLast2(this.cooperativeList[this.cooperativeTab].id)
    }, this.duration)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.industrytimer)
    this.industrytimer = null
  },
  activated () {
    // this.gisMethods()
    if (this.industrytimer) clearInterval(this.industrytimer)
    this.first4()
    this.industrytimer = setInterval(() => {
      this.first4()
      // this.meetingRoom()
      // this.rose()
      // this.cooperative()
      // this.celebrity()
      this.getLast2(this.cooperativeList[this.cooperativeTab].id)
    }, this.duration)
  },
  beforeDestroy () {
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
      @media screen and (max-width: 1920px)
        font-size: 14px
        height: 2.5vh
        line-height: 2.5vh
      &.active
        background: rgba(74,204,129,0.2)
</style>
