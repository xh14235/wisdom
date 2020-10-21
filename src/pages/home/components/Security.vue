<template>
  <div class="monitor">
    <div class="common-title">
      <div>实时监控</div>
    </div>
    <div class="monitor-wrapper">
      <div class="monitor-box" v-for="(item, index) of AllMonitorList" :key="item.id">
        <iframe class="monitor-iframe" :src="item.url" frameborder=0 allowfullscreen allow="autoplay"></iframe>
        <div class="monitor-title" @click="showVideoPopup(index)">{{item.name}}</div>
      </div>
    </div>
    <div class="distinguish-wrapper">
      <div class="distinguish-box">
        <div class="common-title common-title2">
          <div>人脸识别</div>
        </div>
        <div class="monitor-wrapper">
          <div class="monitor-box" v-for="item of FaceMonitorList" :key="item.id">
            <iframe class="monitor-iframe" :src="item.url" frameborder=0 allowfullscreen allow="autoplay"></iframe>
            <div class="monitor-title">{{item.name}}</div>
          </div>
        </div>
        <div class="distinguish-list scroll" @click="showFacePopup()">
          <div class="distinguish-item face-item" v-for="item of facelist" :key="item.id">
            <div class="distinguish-img">
              <img :src="item.imgUrl" alt="">
            </div>
            <div class="distinguish-time">{{item.time}}</div>
          </div>
        </div>
      </div>
      <div class="distinguish-box">
        <div class="common-title common-title2">
          <div>车辆识别</div>
        </div>
        <div class="monitor-wrapper">
          <div class="monitor-box" v-for="item of CarMonitorList" :key="item.id">
            <iframe class="monitor-iframe" :src="item.url" frameborder=0 allowfullscreen allow="autoplay"></iframe>
            <div class="monitor-title">{{item.name}}</div>
          </div>
        </div>
        <div class="distinguish-list scroll" @click="showCarPopup()">
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
import { videoList, abnormalList } from '@/request/security-api'
export default {
  name: 'Security',
  data () {
    return {
      securitytimer: null,
      duration: 60000,
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
        },
        {
          id: '007',
          imgUrl: require('../../../assets/img/face.png'),
          time: '12:22'
        },
        {
          id: '008',
          imgUrl: require('../../../assets/img/face.png'),
          time: '12:22'
        },
        {
          id: '009',
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
        },
        {
          id: '005',
          imgUrl: require('../../../assets/img/car.png'),
          time: '12:22'
        }
      ],
      abnormalList: [],
      AllMonitorList: [],
      FaceMonitorList: [],
      CarMonitorList: []
    }
  },
  computed: {
    ...mapState({
      // monitorPopupShow: state => state.popup.monitorPopupShow,
      changedVideoName: state => state.popup.changedVideoName,
      ifr: state => state.map.ifr
    })
  },
  watch: {
    changedVideoName () {
      let willChangeVideoNum = localStorage.willChangeVideoNum
      this.AllMonitorList[willChangeVideoNum].name = this.changedVideoName
    }
  },
  methods: {
    // 获取异常报警数据详情列表
    getAbnormalList () {
      abnormalList().then(res => {
        // this.abnormalList = res.data
      })
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
    // 获取摄像头列表 全部摄像头、人脸抓拍及车辆抓拍
    getMonitorList () {
      videoList({
        status: 1
      }).then((res) => {
        console.log(res.data)
      })
      this.AllMonitorList = [
        {
          id: '001',
          name: '监控1',
          url: 'http://116.236.30.222:10800/play.html?channel=1&iframe=yes&aspect=1920x1080&protocol=ws-flv'
        },
        {
          id: '002',
          name: '监控2',
          url: 'http://116.236.30.222:10800/play.html?channel=2&iframe=yes&aspect=1920x1080&protocol=ws-flv'
        },
        {
          id: '003',
          name: '监控3',
          url: 'http://116.236.30.222:10800/play.html?channel=1&iframe=yes&aspect=1920x1080&protocol=ws-flv'
        },
        {
          id: '004',
          name: '监控4',
          url: 'http://116.236.30.222:10800/play.html?channel=2&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          // url: ''
        },
        {
          id: '005',
          name: '监控5',
          url: 'http://116.236.30.222:10800/play.html?channel=1&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          // url: ''
        }
      ]
      this.FaceMonitorList = [
        {
          id: '001',
          name: '监控6',
          url: 'http://116.236.30.222:10800/play.html?channel=2&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          // url: ''
        },
        {
          id: '002',
          name: '监控7',
          url: 'http://116.236.30.222:10800/play.html?channel=1&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          // url: ''
        }
      ]
      this.CarMonitorList = [
        {
          id: '001',
          name: '监控8',
          url: 'http://116.236.30.222:10800/play.html?channel=2&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          // url: ''
        },
        {
          id: '002',
          name: '监控9',
          url: 'http://116.236.30.222:10800/play.html?channel=2&iframe=yes&aspect=1920x1080&protocol=ws-flv'
          // url: ''
        }
      ]
    },
    ...mapMutations(['showVideoPopup', 'showMonitorPopup', 'showFacePopup', 'showCarPopup']),
    // 地图方法
    gisMethods () {
      this.ifr.clearMarks()
      let markData = this.ifr.markConfig['security']
      let positionData = this.ifr.sceneCenterConfig['security']
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
      this.ifr.showPeopleHeatingItem([])
      this.ifr.activePipeNetWork('false')
    }
  },
  mounted () {
    this.getAbnormalList()
    this.getMonitorList()
    // this.gisMethods()
    if (this.securitytimer) clearInterval(this.securitytimer)
    this.securitytimer = setInterval(() => {
      this.getAbnormalList()
    }, this.duration)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.securitytimer)
    this.securitytimer = null
  },
  activated () {
    // this.gisMethods()
    if (this.securitytimer) clearInterval(this.securitytimer)
    this.securitytimer = setInterval(() => {
      this.getAbnormalList()
    }, this.duration)
  },
  beforeDestroy () {
    clearInterval(this.securitytimer)
    this.securitytimer = null
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/css/common.styl"
.monitor-wrapper
  width: 100%
  margin: 3vh 0
  &:after
    content: ""
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
.distinguish-wrapper
  display: flex
  margin-top: 1vh
  .distinguish-box
    flex: 0 0 50%
    width: 50%
    margin-bottom: 3vh
    .monitor-wrapper
      margin-bottom: 0
      .monitor-box
        width: 50%
        padding-bottom: 28%
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
            // height: 57px
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
