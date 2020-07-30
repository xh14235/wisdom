<template>
  <div>
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
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts5"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts6"></Eline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Confifth',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    DateType: () => import('@/common/components/DateType')
  },
  props: {
    list: Object
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
      red: state => state.color.red
    })
  },
  methods: {
    changeDate (code) {
      this.$emit('changeDate4', code)
    }
  }
}
</script>

<style scoped lang="stylus">
.common-echarts-box
  height: 22vh
</style>
