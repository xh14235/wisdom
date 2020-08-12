<template>
  <div class="monitor">
    <div class="common-title">
      <div>实时监控</div>
    </div>
    <div class="monitor-wrapper">
      <div class="monitor-box">
        <div class="monitor-bg">
          <div class="enlarge" @click="showMonitorPopup(ws1)"></div>
          <iframe class="video-big" id="video1" width="100%" height="100%" :src="defaultUrl + ws1" frameborder="0"></iframe>
        </div>
        <div class="monitor-title" @click="showVideoPopup(0)">{{videoName0 || '监控1'}}</div>
      </div>
      <div class="monitor-box">
        <div class="monitor-box2">
          <div class="monitor-bg">
            <div class="enlarge" @click="showMonitorPopup(ws2)"></div>
            <iframe class="video-small" id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe>
          </div>
          <div class="monitor-title">监控2</div>
        </div>
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video2" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控3</div>
        </div>
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video2" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控4</div>
        </div>
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video2" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控5</div>
        </div>
      </div>
    </div>
    <div class="distinguish">
      <div class="common-title common-title2">
        <div>人脸识别</div>
      </div>
      <div class="common-title common-title2">
        <div>车辆识别</div>
      </div>
    </div>
    <div class="monitor-wrapper">
      <div class="monitor-box">
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控6</div>
        </div>
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控7</div>
        </div>
        <div class="distinguish-list face-list scroll" @click="showFacePopup()">
          <div class="distinguish-item face-item" v-for="item of facelist" :key="item.id">
            <div class="distinguish-img">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="distinguish-time">{{item.time}}</div>
          </div>
        </div>
      </div>
      <div class="monitor-box">
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控8</div>
        </div>
        <div class="monitor-box2">
          <div class="monitor-bg">
            <!-- <iframe id="video3" width="100%" height="100%" :src="defaultUrl + ws2" frameborder="0"></iframe> -->
          </div>
          <div class="monitor-title">监控9</div>
        </div>
        <div class="distinguish-list car-list scroll" @click="showCarPopup()">
          <div class="distinguish-item car-item" v-for="item of carlist" :key="item.id">
            <div class="distinguish-img">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="distinguish-time">{{item.time}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="common-title">
      <div>异常监控</div>
    </div>
    <div class="common-table">
      <div class="table-head">
        <span>时间</span>
        <span>事件</span>
        <span>区域</span>
        <span>状态</span>
      </div>
      <div class="table-body scroll">
        <p v-for="item of abnormalList" :key="item.id" :class="{'active': item.status === '待处理'}">
          <span>{{item.time}}</span>
          <span>{{item.event}}</span>
          <span>{{item.address}}</span>
          <span>
            <i class="status-red" v-if="item.status === '待处理'"></i>
            <i class="status-green" v-else></i>
            {{item.status}}
          </span>
        </p>
      </div>
    </div>
    <div class="number-wrapper">
      <div class="number-box">
        <div class="number-title">今年报警统计</div>
        <div class="number-detail">
          <div class="number-left">
            总报警次数
            <p>1688</p>
          </div>
          <div class="number-right">
            <p>
              <img src="../../../assets/img/police.png" alt=""><span>报警：</span><b>1000</b>
            </p>
            <p>
              <img src="../../../assets/img/fire.png" alt=""><span>火灾：</span><b>688</b>
            </p>
          </div>
        </div>
      </div>
      <div class="number-box">
        <div class="number-title">区域人数统计</div>
        <div class="number-detail">
          <div class="number-left">
            本区总人数
            <p>3563</p>
          </div>
          <div class="number-right">
            <p>
              <img src="../../../assets/img/local.png" alt=""><span>本地：</span><b>2000</b>
            </p>
            <p>
              <img src="../../../assets/img/shanghai.png" alt=""><span>来沪：</span><b>1563</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Security',
  data () {
    return {
      facelist: [
        {
          id: '001',
          imgUrl: require('../../../assets/img/face.png'),
          time: '12:22'
        },
        {
          id: '002',
          imgUrl: require('../../../assets/img/face.png'),
          time: '12:22'
        },
        {
          id: '003',
          imgUrl: require('../../../assets/img/face.png'),
          time: '12:22'
        },
        {
          id: '004',
          imgUrl: require('../../../assets/img/face.png'),
          time: '12:22'
        },
        {
          id: '005',
          imgUrl: require('../../../assets/img/face.png'),
          time: '12:22'
        },
        {
          id: '006',
          imgUrl: require('../../../assets/img/face.png'),
          time: '12:22'
        }
      ],
      carlist: [
        {
          id: '001',
          imgUrl: require('../../../assets/img/car.png'),
          time: '12:22'
        },
        {
          id: '002',
          imgUrl: require('../../../assets/img/car.png'),
          time: '12:22'
        },
        {
          id: '003',
          imgUrl: require('../../../assets/img/car.png'),
          time: '12:22'
        },
        {
          id: '004',
          imgUrl: require('../../../assets/img/car.png'),
          time: '12:22'
        }
      ],
      abnormalList: [],
      defaultUrl: '/static/jsmpeg-master/view-stream.html?url=',
      ws1: 'live1',
      ws2: 'live2'
    }
  },
  computed: {
    ...mapState({
      videoName0: state => state.popup.videoName0,
      monitorPopupShow: state => state.popup.monitorPopupShow
    })
  },
  methods: {
    getAbnormalList () {
      this.abnormalList = [
        {
          id: '001',
          time: '07月01日 12:12:12',
          event: '入侵预警',
          address: '监控1',
          status: '待处理'
        },
        {
          id: '002',
          time: '07月01日 23:12:56',
          event: '入侵预警',
          address: '监控2',
          status: '已处理'
        },
        {
          id: '003',
          time: '07月01日 20:22:17',
          event: '入侵预警',
          address: '监控5',
          status: '已处理'
        },
        {
          id: '004',
          time: '07月01日 16:23:41',
          event: '入侵预警',
          address: '监控4',
          status: '已处理'
        },
        {
          id: '005',
          time: '07月01日 08:56:33',
          event: '入侵预警',
          address: '监控2',
          status: '已处理'
        }
      ]
    },
    ccc () {
      this.ws1 = 'dddd'
    },
    ...mapMutations(['showVideoPopup', 'showMonitorPopup', 'showFacePopup', 'showCarPopup'])
  },
  mounted () {
    this.getAbnormalList()
    // let video1 = document.getElementById('video1').contentWindow
    // let video2 = document.getElementById('video3').contentWindow
    // window.onload = function () {
    //   let ws = 'ws://172.18.8.51:8082/live1'
    //   let ws2 = 'ws://172.18.8.51:8082/live2'
    //   video1.postMessage({id: '01', url: ws}, '*')
    //   video2.postMessage({id: '02', url: ws2}, '*')
    // }
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/css/common.styl"
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
      background: #000
      // background-image: url('~@/assets/img/novideo1.png')
      // background-size: 100% 100%
      position: relative
      @media screen and (max-width: 1920px)
        padding-bottom: 60%
      .enlarge
        position: absolute
        top: 0
        right: 0
        width: 24px
        height: 24px
        background-image: url('~@/assets/img/video-btn.png')
        background-size: 100% 100%
        z-index: 1
      .video-big
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
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
        background: #000
        // background-image: url('~@/assets/img/novideo2.png')
        // background-size: 100% 100%
        @media screen and (max-width: 1920px)
          padding-bottom: 60%
        .video-small
          position: absolute
          left: 0
          top: 0
          width: 100%
          height: 100%
    .distinguish-list
      flex: 0 0 100%
      width: 100%
      overflow-x: scroll
      overflow-y: hidden
      display: flex
      .distinguish-item
        position: relative
        .distinguish-img
          img
            height: 57px
            vertical-align: bottom
            @media screen and (max-width: 1920px)
              height: 36.8px
        .distinguish-time
          width: 100%
          height: 1.5vh
          line-height: 1.5vh
          text-align: center
          background: rgba(0, 0, 0, 0.5)
          font-size: 12px
.distinguish
  display: flex
  flex-wrap: wrap
  margin-top: 1vh
  .common-title
    flex: 0 0 50%
    width: 50%
.common-table
  .table-head
    span
      display: block
      text-align: center
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      &:nth-child(1), &:nth-child(2)
        flex: 0 0 30%
        width: 30%
      &:nth-child(3), &:nth-child(4)
        flex: 0 0 20%
        width: 20%
  .table-body
    height: 15vh
    p
      span
        display: block
        text-align: center
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        &:nth-child(1), &:nth-child(2)
          flex: 0 0 30%
          width: 30%
        &:nth-child(3), &:nth-child(4)
          flex: 0 0 20%
          width: 20%
        &:nth-child(4)
          i
            display: inline-block
            width: 10px
            height: 10px
            // border-radius: 50%
            background-size: 100% 100%
            @media screen and (max-width: 1920px)
              width: 7px
              height: 7px
            &.status-red
              background-image: url('~@/assets/img/icon-red.png')
            &.status-green
              background-image: url('~@/assets/img/icon-green.png')
      &.active
        span
          color: $white
.number-wrapper
  margin-top: 2vh
  display: flex
  .number-box
    flex: 0 0 50%
    width: 50%
    .number-title
      font-size: 22px
      font-weight: 600
      margin-bottom: 1vh
      @media screen and (max-width: 1920px) {
        font-size: 16px
      }
    .number-detail
      display: flex
      .number-left, .number-right
        height: 7vh
        display: flex
        flex-direction: column
        justify-content: center
        padding-left: 0.5vw
      .number-left
        flex: 0 0 4vw
        width: 4vw
        background-image: url('~@/assets/img/bg-number.png')
        background-size: 100% 100%
        p
          font-size: 24px
          font-weight: 600
          color: $yellow
          @media screen and (max-width: 1920px) {
            font-size: 18px
          }
      .number-right
        p
          display: flex
          align-items: center
          line-height: 3vh
          img
            vertical-align: bottom
            height: 2vh
            margin-right: 5px
          span
            color: $lgreen
          b
            color: $green
          &:nth-child(2)
            b
              color: $yellow
</style>
