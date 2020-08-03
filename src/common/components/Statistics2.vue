<template>
  <div class="statistics-wrapper">
    <!-- <div class="statistics-box" v-for="(item, index) of statistics" :key="item.id">
      <div class="statistics-num">
        <img src="../../assets/img/charge_green.png" v-if="index === 0" alt="">
        <img src="../../assets/img/charge_yellow.png" v-if="index === 1" alt="">
        {{item.num}}
        <span>{{item.unit}}</span></div>
      <p>{{item.name}}</p>
    </div> -->
    <div class="stat-title">{{statistics[0].title}}</div>
    <div class="stat-box">
      <div class="stat-info-left">
        <div class="stat-info-title">{{statistics[0].name}}</div>
        <div class="stat-info-num"><b>{{parseFloat(statistics[0].num).toLocaleString()}}</b>{{statistics[0].unit}}</div>
      </div>
      <img class="stat-arrow-left" src="../../assets/img/arrow-left.png" alt="">
      <div class="stat-img">
        <img class="stat-img-left" :src="statistics[0].imgUrl" alt="">
        <div class="stat-line"></div>
        <img class="stat-img-right" :src="statistics[1].imgUrl" alt="">
      </div>
      <img class="stat-arrow-right" src="../../assets/img/arrow-right.png" alt="">
      <div class="stat-info-right">
        <div class="stat-info-title">{{statistics[1].name}}</div>
        <div class="stat-info-num"><b>{{parseFloat(statistics[1].num).toLocaleString()}}</b>{{statistics[1].unit}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics2',
  props: {
    statistics: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.statistics-wrapper
  width: 9.5vw
  height: 8vh
  border-top: 1px solid rgba(69, 80, 74, 1)
  border-bottom: 1px solid rgba(69, 80, 74, 1)
  .stat-title
    width: 5vw
    height: 2vh
    margin: 0 auto
    text-align: center
    line-height: 2vh
    background-image: url('../../assets/img/stat-title-bg.png')
    background-size: 100% 100%
    font-size: 14px
    @media screen and (max-width: 1920px) {
      font-size: 12px
    }
  .stat-box
    display: flex
    justify-content: space-between
    align-items: center
    height: 6vh
    .stat-arrow-left, .stat-arrow-right
      width: 31px
      @media screen and (max-width: 1920px) {
        width: 15px
      }
    .stat-img
      display: flex
      justify-content: space-between
      align-items: center
      width: 2.5vw
      height: 2vh
      position: relative
      top: 1vh
      .stat-img-left, .stat-img-right
        width: 29px
        @media screen and (max-width: 1920px) {
          width: 18px
        }
      .stat-line
        width: 1px
        height: 2vh
        background: rgba(69, 80, 74, 1)
  .stat-info-right, .stat-info-left
    font-weight: 600
    text-align: center
    .stat-info-title
      font-size: 14px
      @media screen and (max-width: 1920px) {
        font-size: 12px
      }
    .stat-info-num
      font-size: 14px
      @media screen and (max-width: 1920px) {
        font-size: 12px
      }
      b
        font-size: 18px
        @media screen and (max-width: 1920px) {
          font-size: 14px
        }
  .stat-info-left
    .stat-info-title
      color: $green
  .stat-info-right
    .stat-info-title
      color: $yellow
</style>
