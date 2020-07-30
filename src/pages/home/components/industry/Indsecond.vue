<template>
  <div>
    <div class="common-title">
      <div>产业销售分析</div>
    </div>
    <div class="controller-box">
      <CommonSelect :select="select" @selectChange="changeSelect"></CommonSelect>
      <DateType @getDateType="changeDate"></DateType>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Esex :barData="list.echarts2"></Esex>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts3"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts4"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts5"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts6"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts7"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts8"></Eline>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Indthird',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    Esex: () => import('@/common/echarts/Esex'),
    DateType: () => import('@/common/components/DateType'),
    CommonSelect: () => import('@/common/components/CommonSelect')
  },
  data () {
    return {
      select: [
        {
          id: '001',
          value: '1254292656276447233',
          info: '微电网'
        },
        {
          id: '002',
          value: '1254292656276447233',
          info: '氢能源馆'
        }
      ]
    }
  },
  props: {
    list: Object
  },
  methods: {
    changeSelect (chosen) {
      this.$emit('changeSelect', chosen)
    },
    changeDate (code) {
      this.$emit('changeDate2', code)
    }
  }
}
</script>

<style scoped lang="stylus">
.controller-box
  display: flex
  justify-content: space-between
  align-items: center
  height: 5vh
.common-echarts-wrapper
  .common-echarts-box
    height: 19vh
</style>
