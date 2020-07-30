<template>
  <!-- <transition-group name="fade" tag="ul" class="ranking-ul"> -->
  <ul class="ranking-ul">
    <li class="ranking-li" v-for="(item, index) of list" :key="index">
      <div class="ranking-img">
        <img v-if="index === 0" src="../../assets/img/gold.png" alt="">
        <img v-else-if="index === 1" src="../../assets/img/silver.png" alt="">
        <img v-else-if="index === 2" src="../../assets/img/copper.png" alt="">
        <span v-else>{{index + 1}}</span>
      </div>
      <div class="ranking-title">{{item.buildingFacilitySubName}}</div>
      <div class="ranking-outer">
        <div class="ranking-inner" :style="{width: item.value / max * 100 + '%'}"></div>
      </div>
      <div class="ranking-num">{{parseInt(item.value)}}</div>
    </li>
  </ul>
  <!-- </transition-group> -->
</template>

<script>
export default {
  name: 'Ranking',
  props: {
    list: Array
  },
  computed: {
    max () {
      let max = 0
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].value > max) {
          max = this.list[i].value
        }
      }
      return parseInt(max * 1.2)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.ranking-ul
  width: 100%
  height: 100%
  overflow-y: scroll
  display: flex
  flex-direction: column
  justify-content: space-between
  .ranking-li
    display: flex
    justify-content: space-between
    align-items: center
    height: 2.5vh
    line-height: 2.5vh
    .ranking-img
      flex: 0 0 2vh
      width: 2vh
      height: 2vh
      text-align: center
      span
        color: $green
      img
        height: 2vh
        vertical-align: top
    .ranking-title
      font-size: 12px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      flex: 0 0 25%
      width: 25%
      padding: 0 5px
      color: $lgreen
    .ranking-outer
      flex: auto
      height: 0.5vh
      border-radius: 6px
      background: rgba(17, 40, 34, 1)
      .ranking-inner
        height: 0.5vh
        border-radius: 6px
        background-image: linear-gradient(to right, $green, $red, $yellow)
    .ranking-num
      flex: 0 0 20%
      width: 20%
      text-align: right
</style>
