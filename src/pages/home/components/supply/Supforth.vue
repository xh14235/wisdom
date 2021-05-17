<template>
  <div>
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
    <div class="common-title">
      <div>未来24小时预测</div>
    </div>
    <div class="common-echarts-wrapper">
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
  name: "Supforth",
  components: {
    Eline: () => import("@/common/echarts/Eline"),
    DateType: () => import("@/common/components/DateType")
  },
  props: {
    list: Object
  },
  methods: {
    changeDate(code) {
      this.$emit("changeDate4", code);
    }
  }
};
</script>

<style scoped lang="stylus">
.controller
  display: flex
  justify-content: flex-end
  align-items: center
  height: 5vh
.common-echarts-box
  height: 18vh
</style>
