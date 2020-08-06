<template>
  <div class="monitor">
    <div class="common-title">
      <div>实时监控</div>
    </div>
    <div class="monitor-wrapper">
      <div class="monitor-box">
        <div class="monitor-bg">
          <!-- <iframe id="video1" width="100%" height="100%" src="/static/rtmp/video01.html" frameborder="0"></iframe> -->
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws1" frameborder="0"></iframe> -->
        </div>
        <div class="monitor-title" @click="showVideoPopup()">监控1</div>
      </div>
      <div class="monitor-box">
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video2" width="100%" height="100%" src="/static/rtmp/video02.html" frameborder="0"></iframe> -->
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控2</div>
        </div>
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控3</div>
        </div>
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控4</div>
        </div>
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控5</div>
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
            <span class="traffic-state green" v-if="item.statusName === '畅通'">{{item.statusName}}</span>
            <span class="traffic-state red" v-else>拥堵</span>
            <span class="traffic-road">{{item.name}}</span>
            <!-- <span class="traffic-road">{{item.road}}</span> -->
          </div>
        </div>
      </div>
      <div class="traffic-box">
        <div class="common-title common-title2">
          <div>在线人数排行</div>
        </div>
        <div class="podium-box">
          <div class="podium-tab">
            <span class="podium-item" :class="{'active': podiumTab === index}" v-for="(item, index) of podiumList" @click="changePodium(index)" :key="item.facilityId">{{item.facilityName}}</span>
          </div>
          <div class="podium-ranking">
            <div class="podium-detail" :class="{'ranking2': index === 1}" v-for="(item, index) of ranking" :key="item.id">
              <div class="podium-img">
                <img v-if="index === 0" src="../../../../assets/img/gold.png" alt="">
                <img v-else-if="index === 1" src="../../../../assets/img/silver.png" alt="">
                <img v-else src="../../../../assets/img/copper.png" alt="">
                第{{index+1}}名
              </div>
              <div class="podium-num">{{item.num}}</div>
              <div class="podium-title">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <svg width="100%" height="100%" style="position: absolute;z-index: -1;">
      <defs>
        <linearGradient id="blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color: rgba(74, 204, 129, 0.1);" />
          <stop offset="100%" style="stop-color: rgba(74, 204, 129, 1);" />
        </linearGradient>
      </defs>
    </svg> -->
    <div class="park">
      <div class="common-title">
        <div>停车场车位</div>
      </div>
      <div class="park-wrapper" v-if="list.echarts3.length">
        <div class="park-box" v-for="item of list.echarts3" :key="item.id">
          <!-- <el-progress type="circle" :percentage="parseInt(item.laveNumber / item.totalNum * 100)" :width="documentWidth <= 1920 ? 50 : 100" :stroke-width="documentWidth <= 1920 ? 3 : 5" color="#4ACC81"></el-progress> -->
          <Epie2 :pieData = "item.echarts"></Epie2>
          <div class="park-info">
            <p>{{item.echarts.data.name}}</p>
            <p>总共：{{item.echarts.allNum}}个</p>
            <!-- <p>已用：{{item.used}}个</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { buildingSelect, tripPerson } from '@/request/api'
export default {
  name: 'Tripfirst',
  props: {
    list: Object
  },
  components: {
    Epie2: () => import('@/common/echarts/Epie2')
  },
  data () {
    return {
      podiumTab: 0,
      podiumList: [],
      ranking: [],
      timer: null
      // defaultUrl: '/static/jsmpeg-master/view-stream.html?url=',
      // ws1: 'live1',
      // ws2: 'live2'
    }
  },
  computed: {
    documentWidth () {
      return document.body.offsetWidth
    }
  },
  methods: {
    changePodium (index) {
      clearInterval(this.timer)
      this.timer = null
      this.podiumTab = index
      this.timer = setInterval(() => {
        if (this.podiumTab > 2) {
          this.podiumTab = 0
        }
        this.podiumTab++
      }, 5000)
    },
    getRanking (id) {
      tripPerson({
        facilityId: id,
        topNum: 3
      }).then((res) => {
        // console.log(res)
        let defaultList = [
          {
            id: '001',
            title: '彩绘馆',
            num: 0
          },
          {
            id: '002',
            title: '彩釉馆',
            num: 0
          },
          {
            id: '003',
            title: '陶瓷馆',
            num: 0
          }
        ]
        let data = res.data
        this.ranking = []
        for (let i = 0; i < data.length; i++) {
          this.ranking.push({
            id: data[i].bfsId,
            title: data[i].name,
            num: data[i].onlineNumber
          })
        }
        if (this.ranking.length === 0) this.ranking = defaultList
      })
    },
    getPodiumList () {
      buildingSelect().then((res) => {
        let data = res.data
        this.podiumList = []
        for (let i = 0; i < data.length; i++) {
          if (i === 0 || i === 2 || i === 3) {
            this.podiumList.push(data[i])
          }
        }
      })
    }
  },
  watch: {
    podiumTab () {
      this.getRanking(this.podiumList[this.podiumTab].facilityId)
    }
  },
  mounted () {
    let _this = this
    _this.getPodiumList()
    setTimeout(() => {
      _this.getRanking(_this.podiumList[_this.podiumTab].facilityId)
    }, 100)
    if (_this.timer) clearInterval(_this.timer)
    _this.timer = setInterval(() => {
      _this.podiumTab++
      if (_this.podiumTab > 2) {
        _this.podiumTab = 0
      }
    }, 5000)
  },
  deactivated () {
    clearInterval(this.timer)
    this.timer = null
  },
  activated () {
    if (this.timer) clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.podiumTab++
      if (this.podiumTab > 2) {
        this.podiumTab = 0
      }
    }, 5000)
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
// .park-box >>> .el-progress__text
//   color: #fff
// .park-box >>> svg path:first-child
//   stroke: transparent
// .park-box >>> svg path:last-child
//   stroke: url(#blue)
.monitor-wrapper
  // height: 20vh
  width: 100%
  margin: 3vh 0
  display: flex
  justify-content: space-between
  .monitor-box
    flex: 0 0 50%
    width: 50%
    position: relative
    // height: 20vh
    .monitor-bg
      width: 100%
      height: 0
      padding-bottom: 56.25%
      background-image: url('~@/assets/img/novideo1.png')
      background-size: 100% 100%
      position: relative
      @media screen and (max-width: 1920px)
        padding-bottom: 71%
    .monitor-title
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      height: 3vh
      line-height: 3vh
      text-align: center
      background: rgba(0, 0, 0, 0.5)
      @media screen and (max-width: 1920px)
        height: 2.5vh
        line-height: 2.5vh
    .monitor-box2
      float: left
      width: 50%
      // height: 10vh
      overflow: hidden
      position: relative
      .monitor-bg
        width: 100%
        height: 0
        padding-bottom: 56.25%
        background-image: url('~@/assets/img/novideo2.png')
        background-size: 100% 100%
        @media screen and (max-width: 1920px)
          padding-bottom: 71%
.traffic
  display: flex
  justify-content space-between
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
            background: rgba(74, 202, 128, .2)
            color: $green
            border: 1px solid $green
          &.red
            background: rgba(249, 105, 98, .2)
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
      // align-items: center
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
    justify-content space-around
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
          @media screen and (max-width: 1920px) {
            font-size: 14px
          }
        p:nth-child(2)
          color: $lgreen
</style>
