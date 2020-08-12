<template>
  <div class="wrapper">
    <CommonSelect :select="select" @selectChange="changeSelect"></CommonSelect>
    <div class="opera-title">
      <div class="opera-name">电气拓扑图</div>
    </div>
    <div class="opera-img">
      <img :src="require('../../../../assets/img/gif/' + chosenImg)" alt="">
    </div>
    <div class="opera-echarts">
      <div class="common-echarts-title">
        <div class="sum" v-for="item of sumList" :key="item.id">
          <span class="sum-title">{{item.title}}：</span>
          <span class="sum-num">{{item.num}}</span>
          <span class="sum-unit">{{item.unit}}</span>
        </div>
      </div>
      <Eline class="echarts-with-title" v-if="echarts.id" :lineData="echarts"></Eline>
    </div>
    <div class="common-title">
      <div>信息中心</div>
    </div>
    <div class="opera-list common-table">
      <div class="table-head">
        <span>序号</span>
        <span>时间</span>
        <span>设备名称</span>
        <span>状态</span>
      </div>
      <div class="table-body scroll">
        <p v-for="(item, index) of infoList" :key="item.id">
          <span>{{index + 1}}</span>
          <span>{{item.time}}</span>
          <span>{{item.equipment}}</span>
          <span>
            <i :class="{'green': item.statue === 0, 'grey': item.statue === 1, 'red': item.statue === 2}"></i>
            <b v-if="item.statue === 0">启动</b>
            <b v-else-if="item.statue === 1">闭合</b>
            <b v-else>报警</b>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Opefirst',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    CommonSelect: () => import('@/common/components/CommonSelect')
  },
  data () {
    return {
      chosenImg: 'all-electric.gif',
      select: [
        {
          id: '11',
          info: '电'
        },
        {
          id: '12',
          info: '冷/热/热水'
        }
      ],
      sumList: []
    }
  },
  props: {
    infoList: Array,
    echarts: Object
  },
  computed: {
    echartsData () {
      return this.echarts.data
    }
  },
  watch: {
    echartsData () {
      this.sumList = []
      let len = this.echarts.data[0].length
      for (let i = 0; i < this.echarts.data.length; i++) {
        this.sumList.push({
          id: 'd0' + i,
          title: this.echarts.legendData[i],
          num: this.echarts.data[i][len - 1],
          unit: 'kW'
        })
      }
    }
  },
  methods: {
    changeSelect (code) {
      this.$emit('changeSelect1', code)
      let id = code.id
      switch (id) {
        case '11':
          this.chosenImg = 'all-electric.gif'
          break
        case '12':
          this.chosenImg = 'all-hot.gif'
          break
        default:
          break
      }
    }
  },
  mounted () {
    if (this.echarts.data) {
      this.sumList = []
      let len = this.echarts.data[0].length
      for (let i = 0; i < this.echarts.data.length; i++) {
        this.sumList.push({
          id: 'd0' + i,
          title: this.echarts.legendData[i],
          num: this.echarts.data[i][len - 1],
          unit: 'kW'
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.wrapper
  position: relative
  .select-box
    position: absolute
    top: -3.5vh
    right: 0
    width: 7.5vw
  .opera-title
    display: flex
    justify-content: space-between
    height: 2vh
    line-height: 2vh
    .opera-name
      flex: 0 0 25%
      min-width: 25%
      color: $lgreen
      overflow: hidden
      text-align: center
    &:before
      content: ""
      flex: auto
      background-image: linear-gradient(left, rgba(54, 134, 88, 0), rgba(54, 134, 88, 1))
    &:after
      content: ""
      flex: auto
      background-image: linear-gradient(right, rgba(54, 134, 88, 0), rgba(54, 134, 88, 1))
  .opera-img
    width: 100%
    margin-top: 1vh
    img
      width: 100%
      height: 25vh
  .opera-echarts
    width: 100%
    height: 25vh
    margin: 1vh 0
    .common-echarts-title
      font-size: 16px
      font-weight: normal
      display: flex
      align-items: center
      @media screen and (max-width: 1920px) {
        font-size: 14px
      }
      .sum
        margin-right: 1vw
        span
          color: $lgreen
          &.sum-num
            font-weight: 600
            color: $yellow
  .opera-list
    .table-head
      span
        display: inline-block
        text-align: center
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        &:nth-child(1)
          flex: 0 0 10%
          width: 10%
        &:nth-child(2), &:nth-child(3), &:nth-child(4)
          flex: 0 0 30%
          width: 30%
    .table-body
      height: 18vh
      p
        span
          display: inline-block
          text-align: center
          &:nth-child(1)
            flex: 0 0 10%
            width: 10%
          &:nth-child(2), &:nth-child(3), &:nth-child(4)
            flex: 0 0 30%
            width: 30%
          i
            display: inline-block
            width: 10px
            height: 10px
            // border-radius: 50%
            background-size: 100% 100%
            @media screen and (max-width: 1920px)
              width: 7px
              height: 7px
            &.green
              background-image: url('~@/assets/img/icon-green.png')
            &.red
              background-image: url('~@/assets/img/icon-red.png')
            &.grey
              background-image: url('~@/assets/img/icon-grey.png')
          b
            font-weight: normal
</style>
