<template>
  <div class="control-wrapper">
    <div class="control-box">
      <div class="control-line"></div>
      <div class="control-item" v-for="(item, index) of list1" :key="item.id" @click="changeTab1(index)">
        <img class="control-img" :src="item.imgUrl" alt="">
        <p class="control-icon" :class="{'active': index === tab1}"></p>
        <div class="control-title">{{item.title}}</div>
      </div>
    </div>
    <div class="control-center">动画<br/>演示</div>
    <div class="control-box">
      <div class="control-line"></div>
      <div class="control-item" v-for="(item, index) of list2" :key="item.id" @click="changeTab2(index)">
        <img class="control-img" :src="item.imgUrl" alt="">
        <p class="control-icon" :class="{'active': index === tab2}"></p>
        <div class="control-title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WeatherControl',
  data () {
    return {
      tab1: 0,
      tab2: 0,
      list1: [
        {
          id: '01',
          imgUrl: require('@/assets/img/morning.png'),
          title: '上午'
        },
        {
          id: '02',
          imgUrl: require('@/assets/img/noon.png'),
          title: '中午'
        },
        {
          id: '03',
          imgUrl: require('@/assets/img/afternoon.png'),
          title: '下午'
        },
        {
          id: '04',
          imgUrl: require('@/assets/img/evening.png'),
          title: '晚上'
        }
      ],
      list2: [
        {
          id: '01',
          imgUrl: require('@/assets/img/control-sun.png'),
          title: '晴朗'
        },
        {
          id: '02',
          imgUrl: require('@/assets/img/control-rain.png'),
          title: '下雨'
        },
        {
          id: '03',
          imgUrl: require('@/assets/img/control-snow.png'),
          title: '下雪'
        },
        {
          id: '04',
          imgUrl: require('@/assets/img/control-smog.png'),
          title: '雾霾'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      ifr: state => state.map.ifr
    })
  },
  methods: {
    changeTab1 (index) {
      this.tab1 = index
      switch (index) {
        case 0:
          this.ifr.setDayTime('9')
          break
        case 1:
          this.ifr.setDayTime('12')
          break
        case 2:
          this.ifr.setDayTime('15')
          break
        case 3:
          this.ifr.setDayTime('24')
          break
        default:
          break
      }
    },
    changeTab2 (index) {
      this.tab2 = index
      switch (index) {
        case 0:
          this.ifr.setWeather('无')
          break
        case 1:
          this.ifr.setWeather('雨')
          break
        case 2:
          this.ifr.setWeather('雪')
          break
        case 3:
          this.ifr.setWeather('雾霾')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.control-wrapper
  position: fixed
  z-index: 2
  width: 28.8vw
  height: 8.5vh
  left: 35.6vw
  bottom: 1.75vh
  display: flex
  justify-content: space-between
  align-items: center
  .control-center
    flex: 0 0 7vh
    width: 7vh
    text-align: center
    height: 7vh
    padding-top: 1.5vh
    background-image: url('~@/assets/img/control-center.png')
    background-size: 100% 100%
    cursor: pointer
  .control-box
    display: flex
    justify-content: space-between
    flex: 0 0 12.3vw
    width: 12.3vw
    position: relative
    .control-line
      position: absolute
      top: 5.3vh
      left: 7%
      width: 86%
      height: 3px
      background: #fff
      @media screen and (max-width: 1920px)
        top: 6vh
        left: 9%
        width: 82%
    .control-item
      flex: 0 0 50px
      width: 50px
      height: 100px
      display: flex
      flex-direction: column
      justify-content: space-between
      align-items: center
      cursor: pointer
      .control-img
        width: 50px
        vertical-align: bottom
        @media screen and (max-width: 1920px)
          width: 35px
      .control-icon
        width: 10px
        height: 10px
        border-radius: 50%
        background-color: #fff
        &.active
          width: 19px
          height: 18px
          background-image: url('~@/assets/img/control-icon.png')
          background-size: 100% 100%
          background-color: transparent
</style>
