<template>
  <div class="popup-bg">
    <div class="popup-wrapper video-popup-wrapper">
      <div class="popup-top">
        <div class="popup-title">监控配置</div>
        <div class="popup-close" @click="hideVideoPopup()">&times;</div>
      </div>
      <div class="popup-main">
        <div class="select-wrapper">
          分析类型 <CommonSelect v-if="videoList.length" :select="videoList"  @selectChange="changeSelect"></CommonSelect>
        </div>
        <div class="btn-wrapper">
          <div class="btn-item btn-confirm" @click="confirm()">确定</div>
          <div class="btn-item btn-cancle" @click="hideVideoPopup()">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { videoList } from '@/request/api'
export default {
  name: 'VideoPopup',
  data () {
    return {
      videoList: [],
      videoName: ''
    }
  },
  computed: {
    ...mapState({
      videoName0: state => state.popup.videoName0,
      wiiChangeVideo: state => state.popup.wiiChangeVideo
    })
  },
  components: {
    CommonSelect: () => import('@/common/components/CommonSelect')
  },
  methods: {
    ...mapMutations(['hideVideoPopup', 'changeVideoName']),
    getVideoList () {
      videoList().then((res) => {
        let data = res.data
        this.videoList = []
        for (let i = 0; i < data.length; i++) {
          this.videoList.push({
            id: data[i].id,
            info: data[i].area
          })
        }
      })
    },
    confirm () {
      this.hideVideoPopup()
      this.changeVideoName(this.videoName)
    },
    changeSelect (item) {
      this.videoName = item.info
    }
  },
  mounted () {
    this.getVideoList()
  }
}
</script>

<style lang="stylus" scoped>
.video-popup-wrapper
  width: 18.5vw
  height: 28vh
  margin: 34vh auto
  .popup-main
    .select-wrapper
      display: flex
      justify-content: center
      align-items: center
      margin-top: 4.5vh
    .btn-wrapper
      display: flex
      justify-content: space-between
      align-items: center
      width: 14vw
      margin: 0 auto
      margin-top: 12vh
      .btn-item
        width: 5.5vw
        height: 3vh
        line-height: 3vh
        border-radius: 2px
        text-align: center
        &.btn-confirm
          background: rgba(54,134,88,1)
        &.btn-cancle
          background: rgba(74,204,129,0)
          border: 1px solid rgba(74,204,129,1)
</style>
