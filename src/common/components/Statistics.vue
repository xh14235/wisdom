<template>
  <div class="statistics-wrapper">
    <div class="stat-title">{{statistics[0].title}}</div>
    <div class="stat-box">
      <div class="stat-info-left">
        <div class="stat-info-num"><span>{{parseFloat(statistics[0].num).toLocaleString()}}</span>{{statistics[0].unit}}</div>
        <img src="../../assets/img/statistics-left-line.png" alt="">
        <div class="stat-info-title">{{statistics[0].name}}</div>
      </div>
      <div class="stat-img">
        <img class="img-outer rotate" src="../../assets/img/statistics-rotate.png" alt="">
        <img class="img-inner" src="../../assets/img/dsc.png" alt="">
      </div>
      <div class="stat-info-right">
        <div class="stat-info-num"><span>{{parseFloat(statistics[1].num).toLocaleString()}}</span>{{statistics[1].unit}}</div>
        <img src="../../assets/img/statistics-right-line.png" alt="">
        <div class="stat-info-title">{{statistics[1].name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  props: {
    statistics: Array
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'
.statistics-wrapper
  width: 9.5vw
  height: 10vh
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
  .stat-box
    display: flex
    justify-content: space-between
    align-items: center
    height: 8vh
    .stat-img
      // display: flex
      // justify-content: space-between
      // align-items: center
      // width: 2.5vw
      // height: 2vh
      position: relative
      width: 5.75vh
      height: 5.75vh
      .img-outer
        position: absolute
        top: 0
        left: 0
        width: 5.75vh
        height: 5.75vh
      .img-inner
        position: absolute
        width: 18px
        height: 33px
        top: 50%
        left: 50%
        transform: translate(-9px, -16.5px)
  .stat-info-right, .stat-info-left
    text-align: center
    .stat-info-title
      font-size: 14px
      position: relative
      top: -1vh
    .stat-info-num
      font-size: 14px
  .stat-info-left
    .stat-info-num
      span
        color: $green
        font-weight: 600
        font-size: 24px
  .stat-info-right
    .stat-info-num
      span
        color: $yellow
        font-weight: 600
        font-size: 24px
</style>
