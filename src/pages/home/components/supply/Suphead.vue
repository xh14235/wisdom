<template>
  <div class="common-echarts-wrapper">
    <div class="common-echarts-box">
      <div class="common-echarts-title">供电</div>
      <Eline
        class="echarts-with-title"
        v-if="list.echarts1.id"
        :lineData="list.echarts1"
      ></Eline>
    </div>
    <div class="common-echarts-box">
      <div class="common-echarts-title"></div>
      <Epie
        class="echarts-with-title"
        v-if="list.echarts2.id"
        :pieData="list.echarts2"
      ></Epie>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Conhead",
  components: {
    Epie: () => import("@/common/echarts/Epie"),
    Eline: () => import("@/common/echarts/Eline")
  },
  props: {
    list: Object
  },
  methods: {
    ...mapMutations(["showEchartsPopup"])
  }
};
</script>

<style scoped lang="stylus">
.common-echarts-box
  height: 22vh
</style>
