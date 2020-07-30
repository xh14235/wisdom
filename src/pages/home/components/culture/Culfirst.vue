<template>
  <div>
    <div class="common-title">
      <div>人口比例趋势</div>
    </div>
    <DateType @getDateType="changeDate"></DateType>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts1"></Eline>
      </div>
      <div class="common-echarts-box num-box">
        <div class="num-title">
          <img src="../../../../assets/img/calendar.png" alt="">
          <span> {{today}} {{week}}</span>
        </div>
        <div class="num-detail">
          <div class="num-item" v-for="(item, index) of list.touristList" :key="item.id">
            <p class="num-top">
              <span class="num-left">{{index === 0 || index === 1 ? '今天' : '昨天'}}</span>
              <span class="num-right" :class="{'leave': item.enterType === '离开'}">{{item.enterType}}</span>
            </p>
            <p class="num-bottom">{{item.num}}</p>
          </div>
        </div>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts2"></Eline>
      </div>
      <div class="common-echarts-box">
        <Calendar :list="list.calendar1"></Calendar>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts3"></Eline>
      </div>
      <div class="common-echarts-box">
        <Calendar :list="list.calendar2"></Calendar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Culsecond',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    Esex: () => import('@/common/echarts/Esex'),
    DateType: () => import('@/common/components/DateType'),
    Calendar: () => import('@/common/components/Calendar')
  },
  props: {
    list: Object
  },
  data () {
    return {
      today: '',
      week: ''
    }
  },
  computed: {
    ...mapState(['green'])
  },
  methods: {
    changeDate (code) {
      this.$emit('changeDate1', code)
    },
    getDate () {
      let date = new Date()
      let weekList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      this.today = `${date.getMonth() + 1}月${date.getDate()}日`
      this.week = weekList[date.getDay()]
    }
  },
  mounted () {
    this.getDate()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.common-echarts-box
  height: 26vh
  .num-title
    img
      height: 1.5vh
      vertical-align: top
  .num-detail
    display: flex
    flex-wrap: wrap
    margin-top: 2vh
    .num-item
      flex: 0 0 50%
      width: 50%
      height: 10vh
      display: flex
      flex-direction: column
      justify-content: center
      .num-top
        .num-left
          font-size: 18px
        .num-right
          color: $green
          &.leave
            color: $red
      .num-bottom
        font-size: 16px
        font-weight: 600
        color: $green
</style>
