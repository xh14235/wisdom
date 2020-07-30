<template>
  <div class="statistics-wrapper">
    <div class="statistics-box" v-for="(item, index) of statistics" :key="item.id">
      <div class="statistics-num">
        <img src="../../assets/img/charge_green.png" v-if="index === 0" alt="">
        <img src="../../assets/img/charge_yellow.png" v-if="index === 1" alt="">
        {{item.num}}
        <span>{{item.unit}}</span></div>
      <p>{{item.name}}</p>
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
  display: flex
  flex-direction: column
  justify-content: center
  text-align: right
  .statistics-box
    margin-bottom: 15px
    p
      border: 1px solid rgba(255, 255, 255, .5)
      padding-right: 5px
      margin: 5px 0
    .statistics-num
      height: 2vh
      line-height: 2vh
      margin-right: 5px
      font-size: 18px
      font-weight: 600
      background-size: 100% 100%
      display: flex
      justify-content: space-around
      align-items: center
      // background-image: url('../../assets/img/charge_green.png')
      color: $green
      span
        font-size: 14px
        color: $white
    &:nth-child(2)
      .statistics-num
        color: $yellow
        // background-image: url('../../assets/img/charge_yellow.png')
</style>
