<template>
  <div class="common-echarts-wrapper">
    <div class="common-echarts-box">
      <div class="common-echarts-title">本月能源消费方向</div>
      <div class="radar-wrapper">
        <transition-group name="opacity">
          <!-- <Eradar v-if="radarData.id && curRadar === 0" :radarData="radarData" key="radarData.id"></Eradar>
          <Eradar v-if="radarData.id" :radarData="radarData" key="radarData.id"></Eradar>
          <Eradar v-if="radarData.id" :radarData="radarData" key="radarData.id"></Eradar>
          <Eradar v-if="radarData.id" :radarData="radarData" key="radarData.id"></Eradar> -->
          <Eradar
            v-if="list.echarts1.id && curRadar === 0"
            :radarData="list.echarts1"
            key="list.echarts1.id"
          ></Eradar>
          <Eradar
            v-if="list.echarts2.id && curRadar === 1"
            :radarData="list.echarts2"
            key="list.echarts2.id"
          ></Eradar>
          <Eradar
            v-if="list.echarts3.id && curRadar === 2"
            :radarData="list.echarts3"
            key="list.echarts3.id"
          ></Eradar>
          <Eradar
            v-if="list.echarts4.id && curRadar === 3"
            :radarData="list.echarts4"
            key="list.echarts4.id"
          ></Eradar>
        </transition-group>
        <div class="radar-tab">
          <span
            v-for="(item, index) of radarTab"
            :key="item.id"
            :class="{ 'radar-active': curRadar === index }"
            @click="changeTab(index)"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
    <div class="common-echarts-box">
      <div class="common-echarts-title">今年用能异常统计</div>
      <div class="type-wrapper">
        <div class="type-box">
          <img
            src="../../../../assets/img/icon-dian.png"
            alt=""
            class="type-icon"
          />
          <div class="type-name">电</div>
          <div class="type-outer">
            <div
              class="type-inner"
              :style="{
                width: (list.statistics2.electric / abnormalMax) * 100 + '%'
              }"
            ></div>
            <div class="type-last"></div>
          </div>
          <div class="type-num">{{ list.statistics2.electric }}</div>
        </div>
        <div class="type-box">
          <img
            src="../../../../assets/img/icon-hotwater.png"
            alt=""
            class="type-icon"
          />
          <div class="type-name">热水</div>
          <div class="type-outer">
            <div
              class="type-inner"
              :style="{
                width: (list.statistics2.hotwater / abnormalMax) * 100 + '%'
              }"
            ></div>
            <div class="type-last"></div>
          </div>
          <div class="type-num">{{ list.statistics2.hotwater }}</div>
        </div>
        <div class="type-box">
          <img
            src="../../../../assets/img/icon-cold.png"
            alt=""
            class="type-icon"
          />
          <div class="type-name">冷</div>
          <div class="type-outer">
            <div
              class="type-inner"
              :style="{
                width: (list.statistics2.cold / abnormalMax) * 100 + '%'
              }"
            ></div>
            <div class="type-last"></div>
          </div>
          <div class="type-num">{{ list.statistics2.cold }}</div>
        </div>
        <div class="type-box">
          <img
            src="../../../../assets/img/icon-hot.png"
            alt=""
            class="type-icon"
          />
          <div class="type-name">热</div>
          <div class="type-outer">
            <div
              class="type-inner"
              :style="{
                width: (list.statistics2.hot / abnormalMax) * 100 + '%'
              }"
            ></div>
            <div class="type-last"></div>
          </div>
          <div class="type-num">{{ list.statistics2.hot }}</div>
        </div>
      </div>
      <div class="num-box">
        <div class="num-line">
          <b>{{ list.statistics1.alluser }}</b>
          <div>总用户数</div>
        </div>
        <div class="num-line">
          <b>{{ list.statistics1.allnum }}</b>
          <div>总次数</div>
        </div>
        <div class="num-line">
          <b>{{ list.statistics1.average }}</b>
          <div>平均次数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Anahead",
  components: {
    Eline: () => import("@/common/echarts/Eline"),
    Eradar: () => import("@/common/echarts/Eradar")
  },
  props: {
    list: Object
  },
  data() {
    return {
      abnormalMax: 5,
      curRadar: 0,
      radarTimer: null,
      radarTab: [
        {
          id: "01",
          name: "电"
        },
        {
          id: "02",
          name: "热水"
        },
        {
          id: "03",
          name: "冷"
        },
        {
          id: "04",
          name: "热"
        }
      ],
      radarData: {
        id: "anahead1",
        name: "",
        color: "",
        data: []
      }
    };
  },
  computed: {
    ...mapState({
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      red: state => state.color.red
    })
  },
  methods: {
    // 切换冷热水电，查看其雷达图
    changeTab(index) {
      let _this = this;
      if (_this.radarTimer) {
        clearInterval(_this.radarTimer);
      }
      _this.curRadar = index;
      _this.radarTimer = setInterval(() => {
        _this.curRadar++;
        if (_this.curRadar === 4) _this.curRadar = 0;
      }, 5000);
    }
  },
  mounted() {
    let _this = this;
    _this.radarTimer = setInterval(() => {
      _this.curRadar++;
      if (_this.curRadar === 4) _this.curRadar = 0;
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.radarTimer);
  },
  deactivated() {
    clearInterval(this.radarTimer);
    this.radarTimer = null;
  },
  activated() {
    if (this.radarTimer) clearInterval(this.radarTimer);
    this.radarTimer = setInterval(() => {
      this.curRadar++;
      if (this.curRadar === 4) this.curRadar = 0;
    }, 5000);
  }
};
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.common-echarts-box >>> .number-num
  greennum()
.common-echarts-box
  height: 30vh
  .radar-wrapper
    width: 100%
    height: 25vh
    overflow: hidden
    span
      display: inline-block
      width: 100%
      height: 21vh
      overflow: hidden
      .echarts-kuang
        width: 100%
        height: 21vh
    .radar-tab
      display: flex
      justify-content: space-around
      height: 3vh
      line-height: 3vh
      width: 100%
      span
        flex: 0 0 25%
        width: 25%
        height: 2vh
        line-height: 2vh
        display: block
        text-align: center
        cursor: pointer
        &.radar-active
          background-image: url('../../../../assets/img/radar-active.png')
          background-size: 100% 100%
  .num-box
    height: 12vh
    // margin-top: 1vh
    display: flex
    justify-content: space-between
    .num-line
      flex: 0 0 30%
      width: 30%
      height: 12vh
      display: flex
      flex-direction: column
      text-align: center
      background-image: url('../../../../assets/img/abnormal-bg.png')
      background-size: 100% 100%
      b
        color: $yellow
        font-size: 16px
        margin-top: 4vh
        margin-bottom: 1vh
        @media screen and (max-width: 1920px)
          margin-top: 3vh
          margin-bottom: 0vh
  .type-wrapper
    height: 12vh
    display: flex
    flex-direction: column
    justify-content: space-between
    flex-wrap: wrap
    .type-box
      width: 100%
      height: 3vh
      line-height: 3vh
      display: flex
      justify-content: space-between
      align-items: center
      .type-icon
        height: 1.2vh
        flex: 0 0 12%
        width: 12%
      .type-name
        flex: 0 0 20%
        width: 20%
        text-align: center
        color: $lgreen
      .type-outer
        flex: 0 0 50%
        width: 50%
        height: 1.5vh
        display: flex
        justify-content: flex-start
        .type-inner
          height: 1.5vh
          transform: skew(-25deg)
        .type-last
          width: 5%
          height: 1.5vh
          transform: skew(-25deg)
      .type-num
        flex: 0 0 15%
        width: 15%
        text-align: center
      &:nth-child(1)
        .type-outer
          .type-inner
            background-image: linear-gradient(to right, rgba(74, 204, 129, 0), rgba(74, 204, 129, 0.5))
          .type-last
            background: $green
      &:nth-child(2)
        .type-outer
          .type-inner
            background-image: linear-gradient(to right, rgba(255, 216, 0, 0), rgba(255, 216, 0, 0.5))
          .type-last
            background: $yellow
      &:nth-child(3)
        .type-outer
          .type-inner
            background-image: linear-gradient(to right, rgba(4, 174, 198, 0), rgba(4, 174, 198, 0.5))
          .type-last
            background: $blue
      &:nth-child(4)
        .type-outer
          .type-inner
            background-image: linear-gradient(to right, rgba(249, 105, 98, 0), rgba(249, 105, 98, 0.5))
          .type-last
            background: $red
</style>
