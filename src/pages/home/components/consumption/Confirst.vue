<template>
  <div class="common-echarts-wrapper">
    <div class="common-echarts-box">
      <Eline v-if="list.echarts1.id" :lineData="list.echarts1"></Eline>
    </div>
    <div class="common-echarts-box">
      <Epie v-if="list.echarts2.id" :pieData="list.echarts2"></Epie>
    </div>
    <div class="common-echarts-box">
      <Eline v-if="list.echarts3.id" :lineData="list.echarts3"></Eline>
    </div>
    <div class="common-echarts-box">
      <Epie v-if="list.echarts4.id" :pieData="list.echarts4"></Epie>
    </div>
    <div class="common-echarts-box">
      <Eline v-if="list.echarts5.id" :lineData="list.echarts5"></Eline>
    </div>
    <div class="common-echarts-box">
      <Epie v-if="list.echarts6.id" :pieData="list.echarts6"></Epie>
    </div>
  </div>
</template>

<script>
export default {
  name: "Supfirst",
  components: {
    Epie: () => import("@/common/echarts/Epie"),
    Eline: () => import("@/common/echarts/Eline")
  },
  props: {
    list: Object
  }
};
</script>

<style scoped lang="stylus">
.common-echarts-box
  height: 19vh
</style>
