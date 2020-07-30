<template>
  <div>
    <div class="controller-box">
      <div class="controller-title">能源消费方向</div>
      <DateType @getDateType="changeDate"></DateType>
    </div>
    <div class="single-echarts-box">
      <Ebar :barData="list.echarts5" v-if="list.echarts5.id"></Ebar>
    </div>
    <div class="controller-box">
      <div class="controller-title">排行榜TOP10</div>
      <div class="select1">
        分析类型<CommonSelect v-if="select" :select="select" @selectChange="changeSelect"></CommonSelect>
      </div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <div class="rank-title">用电 <span>KWh</span></div>
        <Ranking :list="list.echarts1"></Ranking>
      </div>
      <div class="common-echarts-box">
        <div class="rank-title">用热水 <span>KWh</span></div>
        <Ranking :list="list.echarts2"></Ranking>
      </div>
      <div class="common-echarts-box">
        <div class="rank-title">用冷 <span>KWh</span></div>
        <Ranking :list="list.echarts3"></Ranking>
      </div>
      <div class="common-echarts-box">
        <div class="rank-title">用热 <span>KWh</span></div>
        <Ranking :list="list.echarts4"></Ranking>
      </div>
    </div>
  </div>
</template>

<script>
import { buildingSelect } from '@/request/api'
export default {
  name: 'Supsecond',
  components: {
    DateType: () => import('@/common/components/DateType'),
    CommonSelect: () => import('@/common/components/CommonSelect'),
    Ranking: () => import('@/common/components/Ranking'),
    Ebar: () => import('@/common/echarts/Ebar')
  },
  data () {
    return {
      select: []
    }
  },
  props: {
    list: Object
  },
  methods: {
    changeSelect (chosen) {
      this.$emit('changeSelect2', chosen)
    },
    changeDate (code) {
      this.$emit('changeDate2', code)
    },
    getBuildingSelect () {
      buildingSelect().then((res) => {
        let data = res.data
        this.select = []
        for (let i = 0; i < data.length; i++) {
          this.select.push({
            id: data[i].facilityId,
            info: data[i].facilityName
          })
        }
        this.$emit('changeSelect2', this.select[0])
      })
    }
  },
  mounted () {
    this.getBuildingSelect()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.select-box >>> select
  flex: 0 0 50%!important
  width: 50%!important
.single-echarts-box
  width: 100%
  height: 15vh
.controller-box
  display: flex
  justify-content: space-between
  align-items: center
  height: 5vh
  .controller-title
    font-size: 18px
    font-weight: 600
    color: $lgreen
  .select1
    flex: 0 0 50%
    width: 50%
    display: flex
    justify-content: flex-end
    align-items: center
.common-echarts-box
  height: 28vh
  .rank-title
    font-size: 18px
    font-weight: 600
    height: 3vh
    color: $lgreen
    display: flex
    align-items: center
    justify-content: space-between
    span
      float: right
      font-size: 12px
      color: $white
      font-weight: normal
  .ranking-ul
    height: 24vh
</style>
