<template>
  <div class="popup-bg">
    <div class="popup-wrapper face-popup-wrapper">
      <div class="popup-top">
        <div class="popup-title"></div>
        <div class="popup-close" @click="hideFacePopup()">&times;</div>
      </div>
      <div class="popup-main">
        <div class="common-table">
          <div class="table-head">
            <span>时间</span>
            <span>截图</span>
            <span>姓名</span>
            <span>性别</span>
            <span>出生日期</span>
          </div>
          <div class="table-body scroll">
            <p v-for="item of faceList" :key="item.id">
              <span>{{ item.time }}</span>
              <span><img :src="item.imgUrl" alt="" /></span>
              <span>{{ item.name }}</span>
              <span>{{ item.sex }}</span>
              <span>{{ item.birthday }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 人脸抓拍组件
import { mapMutations } from "vuex";
export default {
  name: "FacePopup",
  data() {
    return {
      faceList: [
        {
          id: "001",
          time: "12:12:12",
          imgUrl: require("@/assets/img/face.png"),
          name: "奶茶妹",
          sex: "女",
          birthday: "1985年09月12号"
        },
        {
          id: "002",
          time: "12:12:12",
          imgUrl: require("@/assets/img/face.png"),
          name: "奶茶妹",
          sex: "女",
          birthday: "1985年09月12号"
        },
        {
          id: "003",
          time: "12:12:12",
          imgUrl: require("@/assets/img/face.png"),
          name: "奶茶妹",
          sex: "女",
          birthday: "1985年09月12号"
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["hideFacePopup"])
  }
};
</script>

<style lang="stylus" scoped>
.face-popup-wrapper
  width: 27vw
  height: 62.5vh
  margin: 18.75vh auto
  .popup-main
    position: relative
    width: 27vw
    height: 60vh
    .common-table
      padding: 3vh 2vw
      .table-head
        line-height: 8vh
        span
          color: #fff
          font-size: 18px
      .table-body
        height: 45vh
        p
          padding: 2vh 0
          &:nth-child(odd)
            background: transparent
          span
            color: #fff
            img
              vertical-align: bottom
</style>
