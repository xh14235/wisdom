<template>
  <div>
    <!-- <div class="common-title">
      <div>能源交易</div>
    </div> -->
    <div class="controller-box">
      <div class="select">
        分析对象：<CommonSelect v-if="select.length" :select="select" @selectChange="changeSelect"></CommonSelect>
      </div>
      <DateType @getDateType="changeDate"></DateType>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline v-if="list.echarts1.id" :lineData="list.echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts2.id" :lineData="list.echarts2"></Eline>
      </div>
      <div class="common-echarts-box bar">
        <Ebar v-if="list.echarts3.id" :barData="list.echarts3"></Ebar>
      </div>
      <div class="common-echarts-box bar">
        <Ebar v-if="list.echarts4.id" :barData="list.echarts4"></Ebar>
      </div>
    </div>
    <div class="common-echarts-wrapper statistics">
      <div class="common-echarts-box statistics1">
        <div class="statistics-wrap">
          <!-- <img src="../../../../assets/img/profit.png" alt="">
          <div class="statistics-box">
            <div class="statistics-num">
              <span>{{list.profit}}</span>元
            </div>
            <p>累计利润</p>
          </div> -->
          <div class="statistics-left">
            <img class="img-outer rotate" src="../../../../assets/img/statistics-rotate.png" alt="">
            <img class="img-inner" src="../../../../assets/img/statistics-profit.png" alt="">
          </div>
          <div class="statistics-right">
            <div class="statistics-num">
              <span>{{parseFloat(list.profit).toLocaleString()}}</span>元
            </div>
            <img src="../../../../assets/img/statistics-line.png" alt="">
            <p>累计利润</p>
          </div>
        </div>
      </div>
      <div class="common-echarts-box statistics2">
        <Statistics2 v-if="list.statistics.length" :statistics="list.statistics"></Statistics2>
      </div>
    </div>
  </div>
</template>

<script>
import { areaSelect } from '@/request/api'
export default {
  name: 'Transecond',
  data () {
    return {
      select: []
    }
  },
  props: {
    list: Object
  },
  components: {
    Statistics2: () => import('@/common/components/Statistics2'),
    DateType: () => import('@/common/components/DateType'),
    CommonSelect: () => import('@/common/components/CommonSelect'),
    Eline: () => import('@/common/echarts/Eline'),
    Ebar: () => import('@/common/echarts/Ebar')
  },
  // computed: {
  //   profit () {
  //     return this.list.statistics[0].num - this.list.statistics[1].num
  //   }
  // },
  watch: {
    select () {
      this.$emit('changeSelect2', this.select[0])
    }
  },
  methods: {
    changeDate (code) {
      this.$emit('changeDate2', code)
    },
    changeSelect (chosen) {
      this.$emit('changeSelect2', chosen)
    },
    getAreaSelect () {
      areaSelect().then((res) => {
        let data = res.data
        this.select = []
        for (let i = 0; i < data.length; i++) {
          this.select.push({
            id: data[i].id,
            info: data[i].name
          })
        }
      })
    }
  },
  mounted () {
    this.getAreaSelect()
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.controller-box
  height: 5vh
  display: flex
  justify-content: space-between
  align-items: center
  .select
    flex: 0 0 46%
    width: 46%
    display: flex
    align-items: center
.common-echarts-wrapper
  .common-echarts-box
    height: 18vh
    &.bar
      flex: 0 0 100%
      width: 100%
      height: 22vh
    // &.statistics
    //   height: 14vh
    // .statistics-wrap
    //   display: flex
    //   justify-content: center
    //   align-items: flex-end
    //   height: 10vh
    //   .statistics-box
    //     flex: 0 0 40%
    //     width: 40%
    //     text-align: center
    //     .statistics-num
    //       span
    //         color: $yellow
    //         font-size: 20px
    //         font-weight: 600
.statistics
  justify-content: space-around
  .common-echarts-box
    height: 11vh
  .statistics1
    flex: 0 0 6vw
    width: 6vw
    .statistics-wrap
      display: flex
      justify-content: space-between
      align-items: center
      width: 6vw
      height: 8vh
      border-top: 1px solid rgba(69, 79, 73, 1)
      border-bottom: 1px solid rgba(69, 79, 73, 1)
      .statistics-left
        position: relative
        width: 5.75vh
        height: 5.75vh
        .img-outer
          position: absolute
          width: 5.75vh
          height: 5.75vh
          top: 0
          left: 0
        .img-inner
          position: absolute
          width: 2.5vh
          height: 2.5vh
          top: 50%
          left: 50%
          transform: translate(-1.25vh, -1.25vh)
      .statistics-right
        display: flex
        flex-direction: column
        justify-content: center
        font-size: 14px
        .statistics-num
          span
            font-size: 24px
            font-weight: 600
            color: $yellow
  .statistics2
    flex: 0 0 9.5vw
    width: 9.5vw
</style>
