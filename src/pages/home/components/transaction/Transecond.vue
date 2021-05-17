<template>
  <div>
    <div class="controller-box">
      <div class="select">
        <!-- 分析对象：<CommonSelect v-if="select.length" :select="select" @selectChange="changeSelect"></CommonSelect> -->
        分析对象：<Select
          v-if="select.length"
          :options="select"
          @changeValue="changeSelect"
        ></Select>
      </div>
      <DateType @getDateType="changeDate"></DateType>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline v-if="list.echarts1.id" :lineData="list.echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts2.id" :lineData="list.echarts2"></Eline>
      </div>
      <div class="common-echarts-box bar">
        <Ebar v-if="list.echarts3.id" :barData="list.echarts3"></Ebar>
      </div>
      <div class="common-echarts-box bar">
        <Ebar v-if="list.echarts4.id" :barData="list.echarts4"></Ebar>
      </div>
    </div>
    <div class="common-echarts-wrapper statistics">
      <div class="common-echarts-box statistics1">
        <div class="statistics-wrap">
          <div class="statistics-left">
            <img
              class="img-outer rotate"
              src="../../../../assets/img/statistics-rotate.png"
              alt=""
            />
            <img
              class="img-inner"
              src="../../../../assets/img/statistics-profit.png"
              alt=""
            />
          </div>
          <div class="statistics-right">
            <div class="statistics-num">
              <span>{{ parseFloat(list.profit).toLocaleString() }}</span
              >元
            </div>
            <img src="../../../../assets/img/statistics-line.png" alt="" />
            <p>累计利润</p>
          </div>
        </div>
      </div>
      <div class="common-echarts-box statistics2">
        <Statistics2
          v-if="list.statistics.length"
          :statistics="list.statistics"
        ></Statistics2>
      </div>
    </div>
  </div>
</template>

<script>
import { areaSelect } from "@/request/select-api";
export default {
  name: "Transecond",
  data() {
    return {
      select: []
    };
  },
  props: {
    list: Object
  },
  components: {
    Statistics2: () => import("@/common/components/Statistics2"),
    DateType: () => import("@/common/components/DateType"),
    Select: () => import("@/common/components/Select"),
    Eline: () => import("@/common/echarts/Eline"),
    Ebar: () => import("@/common/echarts/Ebar")
  },
  methods: {
    changeDate(code) {
      this.$emit("changeDate2", code);
    },
    changeSelect(chosen) {
      this.$emit("changeSelect2", chosen);
    },
    // 获取下拉框内容
    getAreaSelect() {
      areaSelect().then(res => {
        let data = res.data;
        this.select = [];
        for (let i = 0; i < data.length; i++) {
          this.select.push({
            value: data[i].id,
            label: data[i].name
          });
        }
        this.$emit("changeSelect2", this.select[0]);
      });
    }
  },
  mounted() {
    this.getAreaSelect();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.controller-box
  height: 5vh
  display: flex
  justify-content: space-between
  align-items: center
  .select
    flex: 0 0 46%
    width: 46%
    display: flex
    align-items: center
.common-echarts-wrapper
  .common-echarts-box
    height: 18vh
    &.bar
      flex: 0 0 100%
      width: 100%
      height: 22vh
.statistics
  justify-content: space-around
  .common-echarts-box
    height: 11vh
  .statistics1
    flex: 0 0 6vw
    width: 6vw
    .statistics-wrap
      display: flex
      justify-content: space-between
      align-items: center
      width: 6vw
      height: 8vh
      border-top: 1px solid rgba(69, 79, 73, 1)
      border-bottom: 1px solid rgba(69, 79, 73, 1)
      .statistics-left
        position: relative
        width: 5.75vh
        height: 5.75vh
        flex: 0 0 5.75vh
        @media screen and (max-width: 1920px)
          width: 4vh
          height: 4vh
          flex: 0 0 4vh
        .img-outer
          position: absolute
          width: 5.75vh
          height: 5.75vh
          top: 0
          left: 0
          @media screen and (max-width: 1920px)
            width: 4vh
            height: 4vh
        .img-inner
          position: absolute
          width: 2.5vh
          height: 2.5vh
          top: 50%
          left: 50%
          transform: translate(-1.25vh, -1.25vh)
          @media screen and (max-width: 1920px)
            width: 2vh
            height: 2vh
            transform: translate(-1vh, -1vh)
      .statistics-right
        display: flex
        flex-direction: column
        justify-content: center
        font-size: 14px
        @media screen and (max-width: 1920px)
          font-size: 12px
        .statistics-num
          span
            font-size: 24px
            font-weight: 600
            color: $yellow
            @media screen and (max-width: 1920px)
              font-size: 16px
  .statistics2
    flex: 0 0 9.5vw
    width: 9.5vw
</style>
