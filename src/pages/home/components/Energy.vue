<template>
  <div class="left-wrapper">
    <!-- <audio muted loop ref='audio'>
      <source src="../../../assets/video/test.mp3" type="audio/mpeg">
    </audio> -->
    <div class="left-tab">
      <span
        class="left-item"
        :class="{ 'item-active': item.id === tab_left }"
        v-for="item of tabLeft"
        :key="item.id"
        @click="changeTab(item.id)"
        >{{ item.info }}</span
      >
    </div>
    <div class="left-box">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="view"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Energy",
  components: {
    Monitor: () => import("./Monitor"),
    Operation: () => import("./Operation"),
    Optimization: () => import("./Optimization"),
    Transaction: () => import("./Transaction")
  },
  data() {
    return {
      isLoaded: false,
      marker: [],
      tabLeft: [
        {
          id: "001",
          info: "运行监控",
          active: true
        },
        {
          id: "002",
          info: "设备运维",
          active: false
        },
        {
          id: "003",
          info: "用能优化",
          active: false
        },
        {
          id: "004",
          info: "能源交易",
          active: false
        }
      ]
    };
  },
  computed: {
    ...mapState({
      tab_left: state => state.tab_left,
      ifr: state => state.map.ifr,
      monitorList: state => state.map.monitorList,
      energyList: state => state.map.energyList
    }),
    monitor1() {
      if (this.monitorList.length) {
        return this.monitorList[0].id;
      } else {
        return "0";
      }
    },
    energy1() {
      if (this.energyList.length) {
        return this.energyList[0].id;
      } else {
        return "0";
      }
    },
    // 动态切换组件
    view() {
      let component = "";
      switch (this.tab_left) {
        case "001":
          component = "Monitor";
          break;
        case "002":
          component = "Operation";
          break;
        case "003":
          component = "Optimization";
          break;
        case "004":
          component = "Transaction";
          break;
        default:
          break;
      }
      return component;
    }
  },
  methods: {
    ...mapMutations([
      "change_left_tab",
      "chooseLeftTimer",
      "tPlay",
      "fPlay",
      "tMuted",
      "fMuted"
    ]),
    changeTab(id) {
      this.change_left_tab(id);
      this.chooseLeftTimer();
    },
    // 地图初始化路灯开关状态
    lampStatus() {
      let time = new Date();
      let hour = time.getHours();
      if (hour >= 18 || hour < 6) {
        this.ifr.activeLight("true");
      } else {
        this.ifr.activeLight("false");
      }
    },
    // 用能异常预警
    alarmEnergy() {
      this.fPlay();
      this.tMuted();
      this.marker = [];
      // 加判断 异常监控
      if (this.monitorList.length) {
        this.monitorList.forEach(item => {
          if (item.status === "UNPROCESSED" && !this.marker.length) {
            this.marker.push({
              Height: "0.01",
              Id: item.id,
              Latitude: "31.08739",
              Longitude: "121.685",
              Type: "民生报警",
              Value: "",
              Name: "民生报警",
              Other: []
            });
          }
        });
      }
      if (this.energyList.length) {
        this.marker.push({
          Height: "0.01",
          Id: "450000",
          Latitude: "31.08718",
          Longitude: "121.6838",
          Type: "能源报警",
          Value: "",
          Name: "能源报警",
          Other: []
        });
      }
      sessionStorage.setItem("alarmMarkers", JSON.stringify(this.marker));
      this.ifr.setMarkData(this.marker);
      // this.fMuted()
      this.tPlay();
    },
    ifrMessage(e) {
      this.isLoaded = e.data.isLoaded;
    }
  },
  watch: {
    isLoaded() {
      if (this.isLoaded) {
        this.lampStatus();
        this.alarmEnergy();
      }
    },
    monitor1() {
      if (this.isLoaded) {
        this.alarmEnergy();
      }
    },
    energy1() {
      if (this.isLoaded) {
        this.alarmEnergy();
      }
    }
  },
  mounted() {
    window.addEventListener("message", this.ifrMessage, false);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.ifrMessage, false);
  }
};
</script>

<style scoped lang='stylus'>
@import '~@/assets/css/common.styl'
.left-wrapper
  width: 100%
  height: 100vh
  padding-left: 2%
  padding-right: 15%
  overflow: hidden
  background-image: url('~@/assets/img/bg-left.png')
  background-size: 100% 100%
  .left-tab
    width: 100%
    height: 8.5vh
    margin-bottom: 1.5vh
    display: flex
    justify-content: space-between
    align-items: center
    .left-item
      flex: 0 0 24%
      width: 24%
      text-align: center
      line-height: 2.66667vh
      font-size: 18px
      background-image: url('~@/assets/img/tab0.png')
      background-size: 100% 100%
      cursor: pointer
      @media screen and (max-width: 1920px)
        font-size: 14px
      &.item-active
        background-image: url('~@/assets/img/tab1.gif')
        color: $green
        line-height: 3.33333vh
  .left-box
    height: 90vh
    overflow: hidden
</style>
