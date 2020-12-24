<template>
  <div class="popup-bg">
    <div class="popup-wrapper car-popup-wrapper">
      <div class="popup-top">
        <div class="popup-title"></div>
        <div class="popup-close" @click="hideCarPopup()">&times;</div>
      </div>
      <div class="popup-main">
        <div class="common-table">
          <div class="table-head">
            <span>时间</span>
            <span>截图</span>
            <span>车牌号</span>
          </div>
          <div class="table-body scroll">
            <p v-for="item of carList" :key="item.id">
              <span>{{item.time}}</span>
              <span><img :src="item.imgUrl" alt=""></span>
              <span>{{item.carNum}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'CarPopup',
  data () {
    return {
      carList: [
        {
          id: '001',
          time: '12:12:12',
          imgUrl: require('@/assets/img/car.png'),
          carNum: '沪A52634'
        },
        {
          id: '002',
          time: '12:12:12',
          imgUrl: require('@/assets/img/car.png'),
          carNum: '沪A52634'
        },
        {
          id: '003',
          time: '12:12:12',
          imgUrl: require('@/assets/img/car.png'),
          carNum: '沪A52634'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['hideCarPopup'])
  }
}
</script>

<style lang="stylus" scoped>
.car-popup-wrapper
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
