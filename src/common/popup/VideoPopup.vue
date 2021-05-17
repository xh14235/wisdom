<template>
  <div class="popup-bg">
    <div class="popup-wrapper video-popup-wrapper">
      <div class="popup-top">
        <div class="popup-title">监控配置</div>
        <div class="popup-close" @click="hideVideoPopup()">&times;</div>
      </div>
      <div class="popup-main">
        <div class="select-box">
          分析类型
          <Select
            v-if="videoList.length"
            :options="videoList"
            @changeValue="changeSelect"
          ></Select>
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
// 选择摄像头组件
import { mapMutations } from "vuex";
import { videoList } from "@/request/api";
export default {
  name: "VideoPopup",
  data() {
    return {
      videoList: [],
      videoName: ""
    };
  },
  components: {
    Select: () => import("@/common/components/Select")
  },
  methods: {
    ...mapMutations(["hideVideoPopup", "changeVideoName"]),
    getVideoList() {
      videoList().then(res => {
        let data = res.data;
        this.videoList = [];
        for (let i = 0; i < data.length; i++) {
          this.videoList.push({
            value: data[i].id,
            label: data[i].area
          });
        }
      });
    },
    confirm() {
      this.changeVideoName(this.videoName);
      this.hideVideoPopup();
    },
    changeSelect(item) {
      this.videoName = item.label;
    }
  },
  mounted() {
    this.getVideoList();
    setTimeout(() => {
      this.videoName = this.videoList[0].info;
    }, 1000);
  }
};
</script>

<style lang="stylus" scoped>
.video-popup-wrapper
  width: 18.5vw
  height: 28vh
  margin: 34vh auto
  .popup-main
    .select-box
      display: flex
      justify-content: center
      align-items: center
      width: 60%
      margin: 0 auto
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
          background: rgba(54, 134, 88, 1)
        &.btn-cancle
          background: rgba(74, 204, 129, 0)
          border: 1px solid rgba(74, 204, 129, 1)
</style>
