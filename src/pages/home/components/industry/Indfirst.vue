<template>
  <div>
    <div class="common-title">
      <div>产业销售分析</div>
    </div>
    <div class="controller">
      <DateType @getDateType="changeDate"></DateType>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts2"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts3"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts4"></Eline>
      </div>
    </div>
    <div class="bar-box">
      <Ebar :barData="list.echarts5"></Ebar>
    </div>
    <div class="common-title">
      <div>特色农产业</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Epie :pieData="list.echarts6"></Epie>
      </div>
      <div class="common-echarts-box">
        <Epie :pieData="list.echarts7"></Epie>
      </div>
    </div>
    <div class="hot-wrapper">
      <div class="hot-box" v-for="item of list.hotList" :key="item.id">
        <div class="hot-title">{{item.title}}热门产品</div>
        <ul class="hot-list">
          <li class="hot-li" v-for="(item1, index) of item.list" :key="item1.id">
            <img v-if="index === 0" src="../../../../assets/img/gold.png" alt="">
            <img v-else-if="index === 1" src="../../../../assets/img/silver.png" alt="">
            <img v-else-if="index === 2" src="../../../../assets/img/copper.png" alt="">
            {{item1.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Indfirst',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    Epie: () => import('@/common/echarts/Epie'),
    Ebar: () => import('@/common/echarts/Ebar'),
    DateType: () => import('@/common/components/DateType')
  },
  props: {
    list: Object
  },
  data () {
    return {
      hotList1: [
        {
          id: '001',
          title: '玫瑰花'
        },
        {
          id: '002',
          title: '玫瑰花'
        },
        {
          id: '003',
          title: '玫瑰花'
        }
      ]
    }
  },
  methods: {
    changeDate (code) {
      this.$emit('changeDate1', code)
    }
  }
}
</script>

<style scoped lang="stylus">
.controller
  display: flex
  align-items: center
  height: 5vh
.common-echarts-wrapper
  .common-echarts-box
    height: 14vh
.bar-box
  width: 100%
  height: 18vh
.hot-wrapper
  display: flex
  justify-content: space-between
  .hot-box
    flex: 0 0 25%
    width: 25%
    padding: 1vh 0
    .hot-title
      font-size: 16px
      font-weight: 600
      margin-bottom: 1vh
    .hot-list
      .hot-li
        height: 3vh
        line-height: 3vh
</style>
