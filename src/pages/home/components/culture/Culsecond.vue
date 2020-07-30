<template>
  <div>
    <div class="common-title">
      <div>人口比例趋势</div>
    </div>
    <DateType @getDateType="changeDate"></DateType>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Esex :barData="list.echarts1"></Esex>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts2"></Eline>
      </div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Esex :barData="list.echarts3"></Esex>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts4"></Eline>
      </div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Esex :barData="list.echarts5"></Esex>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts6"></Eline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Culfirst',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    Esex: () => import('@/common/echarts/Esex'),
    DateType: () => import('@/common/components/DateType')
  },
  props: {
    list: Object
  },
  methods: {
    changeDate (code) {
      this.$emit('changeDate2', code)
    }
  }
}
</script>

<style scoped lang="stylus">
.common-echarts-box
  height: 26vh
</style>
