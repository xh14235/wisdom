<template>
  <div class="monitor">
    <div class="common-title">
      <div>实时监控</div>
    </div>
    <div class="monitor-wrapper">
      <div
        class="monitor-box"
        v-for="(item, index) of AllMonitorList"
        :key="item.id"
      >
        <iframe
          class="monitor-iframe"
          :src="item.url"
          frameborder="0"
          allowfullscreen
          allow="autoplay"
        ></iframe>
        <div class="monitor-title" @click="showVideoPopup(index)">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="traffic">
      <div class="traffic-box">
        <div class="common-title common-title2">
          <div>道路拥堵状况</div>
        </div>
        <div class="traffic-list">
          <div class="traffic-li" v-for="item of list.echarts1" :key="item.id">
            <span
              class="traffic-state green"
              v-if="item.statusName === '畅通'"
              >{{ item.statusName }}</span
            >
            <span class="traffic-state red" v-else>拥堵</span>
            <span class="traffic-road">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="traffic-box">
        <div class="common-title common-title2">
          <div>在线人数排行</div>
        </div>
        <div class="podium-box">
          <div class="podium-tab">
            <span
              class="podium-item"
              :class="{ active: podiumTab === index }"
              v-for="(item, index) of list.podiumList"
              @click="changePodium(index)"
              :key="item.facilityId"
              >{{ item.facilityName }}</span
            >
          </div>
          <div class="podium-ranking">
            <div
              class="podium-detail"
              :class="{ ranking2: index === 1 }"
              v-for="(item, index) of list.ranking"
              :key="item.id"
            >
              <div class="podium-img">
                <img
                  v-if="index === 0"
                  src="../../../../assets/img/gold.png"
                  alt=""
                />
                <img
                  v-else-if="index === 1"
                  src="../../../../assets/img/silver.png"
                  alt=""
                />
                <img v-else src="../../../../assets/img/copper.png" alt="" />
                第{{ index + 1 }}名
              </div>
              <div class="podium-num">{{ item.num }}</div>
              <div class="podium-title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="park">
      <div class="common-title">
        <div>停车场车位</div>
      </div>
      <div class="park-wrapper" v-if="list.echarts3.length">
        <div class="park-box" v-for="item of list.echarts3" :key="item.id">
          <Epie2 :pieData="item.echarts"></Epie2>
          <div class="park-info">
            <p>{{ item.echarts.data.name }}</p>
            <p>总共：{{ item.echarts.allNum }}个</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { videoList } from "@/request/security-api";
export default {
  name: "Tripfirst",
  props: {
    list: Object
  },
  components: {
    Epie2: () => import("@/common/echarts/Epie2")
  },
  data() {
    return {
      podiumTab: 0,
      AllMonitorList: [],
      timer: null
    };
  },
  computed: {
    documentWidth() {
      return document.body.offsetWidth;
    }
  },
  methods: {
    // 在线人数排行数据切换
    changePodium(index) {
      clearInterval(this.timer);
      this.timer = null;
      this.podiumTab = index;
      this.timer = setInterval(() => {
        if (this.podiumTab > 2) {
          this.podiumTab = 0;
        }
        this.podiumTab++;
      }, 5000);
    },
    // 获取摄像头列表 全部摄像头、人脸抓拍及车辆抓拍
    getMonitorList() {
      videoList({
        status: 1
      }).then(res => {
        // 暂无数据
        // console.log(res.data)
      });
      this.AllMonitorList = [
        {
          id: "001",
          name: "监控1",
          url:
            "http://116.236.30.222:10800/play.html?channel=1&iframe=yes&aspect=1920x1080&protocol=ws-flv"
        },
        {
          id: "002",
          name: "监控2",
          // url: 'http://116.236.30.222:10800/play.html?channel=2&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          url: ""
        },
        {
          id: "003",
          name: "监控3",
          // url: 'http://116.236.30.222:10800/play.html?channel=1&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          url: ""
        },
        {
          id: "004",
          name: "监控4",
          // url: 'http://116.236.30.222:10800/play.html?channel=2&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          url: ""
        },
        {
          id: "005",
          name: "监控5",
          // url: 'http://116.236.30.222:10800/play.html?channel=1&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          url: ""
        }
      ];
    }
  },
  mounted() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.podiumTab++;
      if (this.podiumTab > 2) {
        this.podiumTab = 0;
      }
      this.$emit("emitTab", this.podiumTab);
    }, 5000);
    this.getMonitorList();
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  }
};
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.monitor-wrapper
  width: 100%
  margin: 3vh 0
  &:after
    content: ''
    display: block
    clear: both
  .monitor-box
    float: left
    width: 25%
    height: 0
    padding-bottom: 14%
    background: #000
    position: relative
    &:nth-child(1)
      width: 50%
      padding-bottom: 28%
    .monitor-iframe
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
    .monitor-title
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 3vh
      line-height: 3vh
      text-align: center
      background: rgba(0, 0, 0, 0.5)
.traffic
  display: flex
  justify-content: space-between
  .traffic-box
    flex: 0 0 48%
    width: 48%
    height: 25vh
    .traffic-list
      margin-top: 2vh
      display: flex
      flex-wrap: wrap
      max-height: 22vh
      overflow-y: scroll
      .traffic-li
        height: 2vh
        line-height: 2vh
        margin-bottom: 8px
        flex: 0 0 48%
        width: 48%
        display: flex
        @media screen and (max-width: 1920px)
          margin-bottom: 5px
        .traffic-road
          flex: 0 0 65%
          width: 65%
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          margin-left: 5%
          color: $lgreen
        .traffic-state
          flex: 0 0 30%
          width: 30%
          text-align: center
          &.green
            background: rgba(74, 202, 128, 0.2)
            color: $green
            border: 1px solid $green
          &.red
            background: rgba(249, 105, 98, 0.2)
            color: $red
            border: 1px solid $red
    .podium-box
      margin-top: 2vh
      .podium-tab
        margin-bottom: 1vh
        display: flex
        justify-content: space-around
        .podium-item
          flex: 0 0 2vw
          width: 2vh
          height: 2vh
          text-align: center
          line-height: 2vh
          &.active
            background-image: url('../../../../assets/img/podium-active.png')
            background-size: 100% 100%
    .podium-ranking
      width: 100%
      height: 12vh
      background-image: url('../../../../assets/img/podium.png')
      background-size: 100% 100%
      display: flex
      justify-content: space-around
      .podium-detail
        flex: 0 0 30%
        width: 30%
        text-align: center
        &.ranking2
          order: -1
        .podium-img
          margin-top: 0.5vh
          font-size: 14px
          color: $lgreen
          @media screen and (max-width: 1920px)
            font-size: 12px
          img
            vertical-align: middle
            @media screen and (max-width: 1920px)
              height: 1.5vh
        .podium-num
          font-size: 24px
          font-weight: 600
          color: $yellow
          margin-top: 1vh
          margin-bottom: 0.5vh
          @media screen and (max-width: 1920px)
            font-size: 18px
.park
  .park-wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    width: 100%
    .park-box
      flex: 0 0 33%
      width: 33%
      height: 10vh
      margin-top: 2vh
      display: flex
      justify-content: space-around
      align-items: center
      .echarts-kuang
        flex: 0 0 50%
        width: 50%
      .park-info
        flex: 0 0 50%
        width: 50%
        p:nth-child(1)
          font-size: 18px
          font-weight: 600
          color: $lgreen
          @media screen and (max-width: 1920px)
            font-size: 14px
        p:nth-child(2)
          color: $lgreen
</style>
