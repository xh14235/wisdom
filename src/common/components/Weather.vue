<template>
  <div class="weather-wrapper">
    <div class="today">
      <div class="today-box">
        <p class="tem">{{today.tem}}</p>
        <p class="weather">{{today.wea}}</p>
        <p class="wendu">温度：{{today.tem2}}~{{today.tem1}}</p>
      </div>
    </div>
    <div class="next" v-for="(item, index) of next6" :key="item.date">
      <div class="next-box">
        <p class="date">{{index === 0 ? '明天' : item.date.substring(5, 10)}}</p>
        <p class="img">
          <img :src="require('@/assets/img/' + item.wea_img + '.png')" alt="">
        </p>
        <p class="weather">{{item.wea}}</p>
        <p class="wendu">{{item.tem2}}~{{item.tem1}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Weather',
  computed: {
    ...mapState({
      today: state => state.weather.today,
      next6: state => state.weather.next6
    })
  },
  methods: {
    getWeather () {
      this.$jsonp('https://tianqiapi.com/api?version=v1&appid=95555958&appsecret=uBN3Pyn2&city=上海').then((res) => {
        this.mutWeather(res)
      })
      this.$jsonp('https://tianqiapi.com/api?version=v6&appid=95555958&appsecret=uBN3Pyn2&city=上海').then((res) => {
        this.mutPm25(res)
      })
    },
    ...mapMutations(['mutWeather', 'mutPm25'])
  },
  mounted () {
    this.getWeather()
  }
}
</script>

<style lang="stylus" scoped>
.weather-wrapper
  display: flex
  justify-content: space-between
  margin: 1vh 0
  width: 100%
  height: 10vh
  overflow: hidden
  .today
    flex: 0 0 20%
    width: 20%
    overflow: hidden
    position: relative
    .today-box
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      border-radius: 10px
      padding: 0 1vh
      background: rgba(255,255,255,0.1)
      display: flex
      flex-direction: column
      justify-content: center
      z-index: 1
      .tem
        font-size: 36px
      .weather
        font-size: 14px
  .next
    flex: 0 0 12%
    width: 12%
    position: relative
    .next-box
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      text-align: center
      border-radius: 10px
      background: rgba(255,255,255,0.1)
      display: flex
      flex-direction: column
      justify-content: center
      z-index: 1
      .date
        font-size: 12px
      .img
        img
          width: 2.9vh
          height: 2.9vh
      .weather
        font-size: 12px
      .wendu
        font-size: 14px
</style>
