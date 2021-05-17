<template>
  <div>
    <div class="controller-box">
      <div class="select1">
        分析对象<Cascader
          :options="options"
          @changeValue="changeSelect1"
        ></Cascader>
      </div>
    </div>
    <div class="common-echarts-wrapper echarts-margin">
      <div class="common-echarts-box">
        <div class="report-title">初级分析报告</div>
        <div class="report-info">
          <p>
            根据所采集的能源消费数据，智能分析用能趋势和变化，为用户的能源消费和设备使用提供建议，并能辅助监测用户用能设备的工作健康情况。
          </p>
        </div>
      </div>
      <div class="common-echarts-box">
        <div class="report-title">能源价格对比</div>
        <Statistics
          v-if="statistics.length"
          :statistics="statistics"
        ></Statistics>
      </div>
    </div>
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
import { buildingSelect, venueSelect } from "@/request/select-api";
export default {
  name: "Optfirst",
  components: {
    Statistics: () => import("@/common/components/Statistics"),
    Eline: () => import("@/common/echarts/Eline"),
    Cascader: () => import("@/common/components/Cascader")
  },
  data() {
    return {
      value: "",
      options: []
    };
  },
  props: {
    list: Object,
    statistics: Array
  },
  methods: {
    // 获取下拉框内容
    getBuildingSelect() {
      buildingSelect().then(res => {
        let data = res.data;
        this.options = [];
        for (let i = 0; i < data.length; i++) {
          this.options.push({
            value: data[i].facilityId,
            label: data[i].facilityName,
            children: []
          });
          venueSelect({
            facilityId: data[i].facilityId
          }).then(res => {
            let data = res.data;
            for (let j = 0; j < data.length; j++) {
              this.options[i].children.push({
                value: data[j].id,
                label: data[j].name
              });
            }
          });
        }
      });
    },
    changeSelect1(value) {
      this.$emit("changeSelect1", value);
    }
  },
  mounted() {
    this.getBuildingSelect();
  }
};
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
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
  .today-tourist
    flex: 0 0 46%
    width: 46%
    margin-left: 4%
    span
      font-size: 16px
      font-weight: 600
</style>
