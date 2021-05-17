<template>
  <div>
    <div class="common-title">
      <div>绿色出行</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <div class="common-echarts-title">
          <b>充电桩数量</b
          ><span
            >共计：<b>{{ num1 }}</b
            >个</span
          >
        </div>
        <Epie class="echarts-with-title" :pieData="list.echarts1"></Epie>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">
          <b>电动汽车数量</b
          ><span
            >共计：<b>{{ num2 }}</b
            >个</span
          >
        </div>
        <Epie class="echarts-with-title" :pieData="list.echarts2"></Epie>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">
          <b>电动旅游船数量</b
          ><span
            >共计：<b>{{ num3 }}</b
            >个</span
          >
        </div>
        <Epie class="echarts-with-title" :pieData="list.echarts3"></Epie>
      </div>
      <div class="common-echarts-box">
        <div class="common-echarts-title">
          <b>电动自行车数量</b
          ><span
            >共计：<b>{{ num4 }}</b
            >个</span
          >
        </div>
        <Epie class="echarts-with-title" :pieData="list.echarts4"></Epie>
      </div>
    </div>
    <div class="common-title">
      <div>耗电统计</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box echarts2">
        <div class="common-echarts-title">
          <b>今年充电桩耗电</b
          ><span
            >共计：<b>{{ num1 }}</b
            >kWh</span
          >
        </div>
        <Eline
          class="echarts-with-title"
          v-if="list.echarts5.id"
          :lineData="list.echarts5"
        ></Eline>
      </div>
      <div class="common-echarts-box echarts2">
        <div class="common-echarts-title">
          <b>今年智能路灯耗电</b
          ><span
            >共计：<b>{{ num1 }}</b
            >kWh</span
          >
        </div>
        <Eline
          class="echarts-with-title"
          v-if="list.echarts6.id"
          :lineData="list.echarts6"
        ></Eline>
      </div>
    </div>
    <div class="common-title">
      <div>智能路灯</div>
    </div>
    <div class="statistics-wrapper1">
      <div class="statistics-box1">
        <div class="statistics-wrap">
          <div class="statistics-left">
            <img
              class="img-outer rotate"
              src="../../../../assets/img/statistics-rotate.png"
              alt=""
            />
            <img
              class="img-inner"
              src="../../../../assets/img/lamp.png"
              alt=""
            />
          </div>
          <div class="statistics-right">
            <div class="statistics-num">
              <span>{{ lampNum }}</span
              >个
            </div>
            <img src="../../../../assets/img/statistics-line.png" alt="" />
            <p>总路灯数</p>
          </div>
        </div>
      </div>
      <div class="statistics-box2">
        <Statistics2
          v-if="list.statistics[0].title"
          :statistics="list.statistics"
        ></Statistics2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tripsecond",
  components: {
    Epie: () => import("@/common/echarts/Epie"),
    Eline: () => import("@/common/echarts/Eline"),
    Statistics2: () => import("@/common/components/Statistics2")
  },
  props: {
    list: Object
  },
  computed: {
    // 绿色出行各交通工具总数统计
    num1() {
      let arr = this.list.echarts1.data;
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
        num += arr[i].value;
      }
      return num;
    },
    num2() {
      let arr = this.list.echarts2.data;
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
        num += arr[i].value;
      }
      return num;
    },
    num3() {
      let arr = this.list.echarts3.data;
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
        num += arr[i].value;
      }
      return num;
    },
    num4() {
      let arr = this.list.echarts4.data;
      let num = 0;
      for (let i = 0; i < arr.length; i++) {
        num += arr[i].value;
      }
      return num;
    },
    // 智能路灯总数
    lampNum() {
      let num = this.list.statistics[0].num + this.list.statistics[1].num;
      return num;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.common-echarts-wrapper
  .common-echarts-box
    height: 17vh
    margin-bottom: 1vh
    &.echarts2
      height: 23vh
      margin-bottom: 2vh
    .common-echarts-title
      line-height: 5vh
      display: flex
      justify-content: space-between
      font-size: 14px
      @media screen and (max-width: 1920px)
        font-size: 12px
      b
        color: $lgreen
      span
        font-weight: normal
        color: $lgreen
        b
          color: $yellow
    .lamp-title
      color: $lgreen
      margin-bottom: 2vh
    .lamp-box
      display: flex
      .lamp-all, .lamp-num
        flex: 0 0 48%
        width: 48%
        height: 8vh
        display: flex
        flex-direction: column
        justify-content: center
        padding-left: 0.5vw
      .lamp-all
        background-image: url('~@/assets/img/bg-number.png')
        background-size: 100% 100%
        p
          font-size: 18px
          font-weight: 600
          color: $green
      .lamp-num
        p
          margin-bottom: 1vh
          img
            vertical-align: bottom
            height: 2vh
          b
            color: $green
.statistics-wrapper1
  display: flex
  justify-content: space-around
  align-items: center
  margin-top: 2vh
  .statistics-box1
    flex: 0 0 6vw
    width: 6vw
    height: 8vh
    border-top: 1px solid rgba(69, 79, 73, 1)
    border-bottom: 1px solid rgba(69, 79, 73, 1)
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
        img
          width: 100%
        .statistics-num
          span
            font-size: 24px
            font-weight: 600
            color: $yellow
            @media screen and (max-width: 1920px)
              font-size: 16px
  .statistics-box2
    flex: 0 0 9.5vw
    width: 9.5vw
</style>
