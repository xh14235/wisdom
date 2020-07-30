<template>
  <div>
    <!-- <div class="common-title">
      <div>用能优化</div>
    </div> -->
    <div class="controller-box">
      <div class="select1">
        分析对象<CommonSelect2 :largeSelect="largeSelect" :smallSelect="smallSelect" @changeLarge="changeLarge" @changeSmall="changeSmall"></CommonSelect2>
      </div>
      <!-- <div class="today-tourist">今日访客数量：<span>200</span>人</div> -->
    </div>
    <div class="common-echarts-wrapper echarts-margin">
      <div class="common-echarts-box">
        <div class="report-title">初级分析报告</div>
        <div class="report-info">
          <p>1、耗电量和热水需求量均在下午开始急剧上升，说明下午游客量增多，且现为春季，气温还较为寒冷，因此可以延缓热水源的使用时长。<br/>2、 耗电量在10-16点之间使用明显，应观察现场耗电情况，合理安排用能。</p>
        </div>
      </div>
      <div class="common-echarts-box">
        <div class="report-title">能源价格对比</div>
        <Statistics v-if="statistics.length" :statistics="statistics"></Statistics>
      </div>
    </div>
    <!-- <div class="title2">能源消耗分析</div> -->
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline v-if="list.echarts1.id" :lineData="list.echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts2.id" :lineData="list.echarts2"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts3.id" :lineData="list.echarts3"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts4.id" :lineData="list.echarts4"></Eline>
      </div>
    <!-- </div> -->
    <!-- <div class="title2">节能减排记录</div> -->
    <!-- <div class="common-echarts-wrapper"> -->
      <div class="common-echarts-box">
        <Eline v-if="list.echarts5.id" :lineData="list.echarts5"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts6.id" :lineData="list.echarts6"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts7.id" :lineData="list.echarts7"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts8.id" :lineData="list.echarts8"></Eline>
      </div>
    </div>
  </div>
</template>

<script>
import { buildingSelect, venueSelect } from '@/request/api'
export default {
  name: 'Optfirst',
  components: {
    Statistics: () => import('@/common/components/Statistics'),
    Eline: () => import('@/common/echarts/Eline'),
    CommonSelect2: () => import('@/common/components/CommonSelect2')
  },
  data () {
    return {
      largeSelect: [],
      smallSelect: []
    }
  },
  props: {
    list: Object,
    statistics: Array
  },
  watch: {
    largeSelect () {
      this.getVenueSelect(this.largeSelect[0].id)
    }
  },
  methods: {
    getBuildingSelect () {
      buildingSelect().then((res) => {
        let data = res.data
        this.largeSelect = []
        for (let i = 0; i < data.length; i++) {
          this.largeSelect.push({
            id: data[i].facilityId,
            name: data[i].facilityName
          })
        }
        this.largeSelect.splice(1, 1)
      })
    },
    getVenueSelect (id) {
      venueSelect({
        facilityId: id
      }).then((res) => {
        let data = res.data
        this.smallSelect = []
        for (let i = 0; i < data.length; i++) {
          this.smallSelect.push({
            id: data[i].id,
            name: data[i].name
          })
        }
        this.$emit('changeSelect1', this.smallSelect[0])
      })
    },
    changeLarge (item) {
      this.getVenueSelect(item.id)
    },
    changeSmall (item) {
      this.$emit('changeSelect1', item)
    }
  },
  mounted () {
    this.getBuildingSelect()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.echarts-margin
  margin: 1vh 0
.title2
  font-weight: 600
  color: $lgreen
.common-echarts-wrapper
  .common-echarts-box
    height: 14.5vh
    .report-title
      height: 3vh
      color: $lgreen
      font-weight: 600
    .report-info
      height: 11.5vh
      border: 1px solid #45504a
      overflow-y: scroll
.controller-box
  height: 5vh
  display: flex
  justify-content: flex-start
  align-items: center
  .select1
    flex: 0 0 46%
    width: 46%
    display: flex
    align-items: center
    .select-box
      flex: auto
  .today-tourist
    flex: 0 0 46%
    width: 46%
    margin-left: 4%
    span
      font-size: 16px
      font-weight: 600
</style>
