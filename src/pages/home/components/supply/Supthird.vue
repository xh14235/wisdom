<template>
  <div>
    <div class="controller">
      <div class="forecast-tab">
        <div
          class="tab-item"
          :class="{ active: index === currentTab }"
          v-for="(item, index) of tab"
          :key="item.id"
          @click="changeTab(index)"
        >
          {{ item.title }}
        </div>
      </div>
      <DateType
        @getDateType="changeDate"
        v-show="this.currentTab === 0"
      ></DateType>
    </div>
    <div class="common-echarts-wrapper" v-show="currentTab === 0">
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts2" v-if="currentTab === 0"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts3" v-if="currentTab === 0"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts4" v-if="currentTab === 0"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts5" v-if="currentTab === 0"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts6" v-if="currentTab === 0"></Eline>
      </div>
    </div>
    <div class="common-echarts-wrapper" v-show="currentTab === 1">
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts11" v-if="currentTab === 1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts12" v-if="currentTab === 1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts13" v-if="currentTab === 1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts14" v-if="currentTab === 1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts15" v-if="currentTab === 1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline :lineData="list.echarts16" v-if="currentTab === 1"></Eline>
      </div>
    </div>
    <div class="common-title">
      <div>储能信息</div>
    </div>
    <div class="common-echarts-wrapper padding-top">
      <div class="common-echarts-box gauge">
        <Egauge :gaugeData="list.echarts7"></Egauge>
        <Egauge :gaugeData="list.echarts8"></Egauge>
      </div>
      <Statistics :statistics="list.other.statistics"></Statistics>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Supthird",
  components: {
    Eline: () => import("@/common/echarts/Eline"),
    Statistics: () => import("@/common/components/Statistics"),
    Egauge: () => import("@/common/echarts/Egauge"),
    DateType: () => import("@/common/components/DateType")
  },
  props: {
    list: Object
  },
  data() {
    return {
      tab: [
        {
          id: "01",
          title: "实时监测",
          active: true
        },
        {
          id: "02",
          title: "未来24h预测",
          active: false
        }
      ],
      currentTab: 0
    };
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
    changeDate(code) {
      this.$emit("changeDate3", code);
    },
    changeTab(index) {
      this.currentTab = index;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.controller
  display: flex
  justify-content: space-between
  align-items: center
  height: 5vh
  .forecast-tab
    border: 1px solid $green
    display: flex
    .tab-item
      flex: 0 0 4.5vw
      width: 4.5vw
      height: 2.33333vh
      line-height: 2.33333vh
      text-align: center
      // font-size: 14px
      color: $green
      &.active
        background: rgba(74, 204, 129, 0.2)
.common-echarts-box
  height: 19vh
.gauge
  display: flex
  justify-content: space-between
  align-items: center
  height: 10vh
.statistics-wrapper
  flex: 0 0 46%
  width: 46%
  height: 12vh
.padding-top
  padding-top: 2vh
</style>
