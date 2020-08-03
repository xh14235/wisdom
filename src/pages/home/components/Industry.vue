<template>
  <div class="industry-wrapper">
    <!-- <div class="common-pages">
      <div class="common-page" v-if="this.tab === 0">
        <transition name="fadeRight" mode="out-in">
          <Indfirst :list="datafirst" @changeDate1="changeDate1"></Indfirst>
        </transition>
      </div>
      <div class="common-page" v-else>
        <transition name="fadeRight" mode="out-in">
          <Indsecond :list="datasecond" @changeDate2="changeDate2" @changeSelect="changeSelect"></Indsecond>
        </transition>
      </div>
    </div>
    <div class="common-tab">
      <span :class="{'active': tab === index}" v-for="(item, index) of list" :key="item.id" @click="changeTab(index)">{{item.title}}</span>
    </div> -->
    <div class="common-title">
      <div>今年产业销量统计</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <div class="common-echarts-title">乡村会客厅 <span>销售额总计：<b>{{parseFloat(5200).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts1.id" :lineData="echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">玫瑰工坊 <span>销售额总计：<b>{{parseFloat(5200).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts2.id" :lineData="echarts2"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">合作社 <span>销售额总计：<b>{{parseFloat(5200).toLocaleString()}}</b>元</span></div>
        <Eline class="echarts-with-title" v-if="echarts3.id" :lineData="echarts3"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">网红打卡点 <span>销售额总计：<b>{{parseFloat(5200).toLocaleString()}}</b>元</span></div>
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
import { industryfirst4, industrycooperative, industrysales, industryorder } from '@/request/api'
export default {
  name: 'Industry',
  components: {
    Eline: () => import('@/common/echarts/Eline')
    // Indfirst: () => import('./industry/Indfirst'),
    // Indsecond: () => import('./industry/Indsecond')
  },
  data () {
    return {
      echarts1: {},
      echarts2: {},
      echarts3: {},
      echarts4: {},
      echarts5: {},
      echarts6: {},
      cooperativeList: [],
      cooperativeTab: 0,
      timer: null
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
    // 顶部四个echarts图
    getSales () {
      let date = new Date()
      let year = date.getFullYear()
      industryfirst4({
        year: year
      }).then((res) => {
        let COOPERATIVE = res.data.COOPERATIVE
        let COUNTY_MEETING = res.data.COUNTY_MEETING
        let INTERNET_CELEBRITIES = res.data.INTERNET_CELEBRITIES
        let ROSE_SQUARE = res.data.ROSE_SQUARE
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
          data: [Object.values(COUNTY_MEETING).slice(0, this.year.length)]
        }
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
          data: [Object.values(ROSE_SQUARE).slice(0, this.year.length)]
        }
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
          data: [Object.values(COOPERATIVE).slice(0, this.year.length)]
        }
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
          data: [Object.values(INTERNET_CELEBRITIES).slice(0, this.year.length)]
        }
      })
    },
    // 获取合作社列表
    getCooperative () {
      industrycooperative().then((res) => {
        this.cooperativeList = res.data
      })
    },
    // 更改合作社
    changeCooperative (id, index) {
      this.cooperativeTab = index
      clearInterval(this.timer)
      this.timer = null
      // this.getLast2(this.cooperativeTab)
      this.timer = setInterval(() => {
        this.cooperativeTab++
        if (this.cooperativeTab > 11) this.cooperativeTab = 0
        // this.getLast2(this.cooperativeTab)
      }, 5000)
    },
    // 底部两个echarts图
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
    }
  },
  mounted () {
    this.getSales()
    this.getCooperative()
    setTimeout(() => {
      this.getLast2(this.cooperativeList[this.cooperativeTab].id)
    }, 100)
    this.timer = setInterval(() => {
      this.cooperativeTab++
      if (this.cooperativeTab > 11) this.cooperativeTab = 0
    }, 5000)
  },
  deactivated () {
    clearInterval(this.timer)
    this.timer = null
  },
  activated () {
    if (this.timer) clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.cooperativeTab++
      if (this.cooperativeTab > 11) this.cooperativeTab = 0
    }, 5000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
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
        // align-items: flex-end
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
      // background: rgba(74,204,129,0.2)
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
