<template>
  <div class="header">
    <!-- <div class="header-left">
      <span
        class="header-item"
        :class="{'item-active': item.id === tab_left}"
        v-for="item of tabLeft"
        :key="item.id"
        @click="changeTab(item.id, 'left')"
      >{{item.info}}</span>
    </div> -->
    <!-- <div class="header-center"> -->
    <div class="header-title" @click="logout()">智慧大脑数字全景</div>
    <div class="header-time">{{gettime}}</div>
      <!-- <div class="header-weather">{{`今日天气：${weather.weather}`}}</div> -->
    <!-- </div> -->
    <!-- <div class="header-right">
      <span
        class="header-item"
        :class="{'item-active': item.id === tab_right}"
        v-for="item of tabRight"
        :key="item.id"
        @click="changeTab(item.id, 'right')"
      >{{item.info}}</span>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      // tabLeft: [
      //   {
      //     id: '001',
      //     info: '运行监控',
      //     active: true
      //   },
      //   {
      //     id: '002',
      //     info: '设备运维',
      //     active: false
      //   },
      //   {
      //     id: '003',
      //     info: '用能优化',
      //     active: false
      //   },
      //   {
      //     id: '004',
      //     info: '能源交易',
      //     active: false
      //   }
      // ],
      // tabRight: [
      //   {
      //     id: '001',
      //     info: '安保',
      //     active: true
      //   },
      //   {
      //     id: '002',
      //     info: '环保',
      //     active: false
      //   },
      //   {
      //     id: '003',
      //     info: '出行',
      //     active: false
      //   },
      //   {
      //     id: '004',
      //     info: '文旅',
      //     active: false
      //   },
      //   {
      //     id: '005',
      //     info: '产业',
      //     active: false
      //   },
      //   {
      //     id: '006',
      //     info: '家居',
      //     active: false
      //   }
      // ],
      gettime: ''
    }
  },
  computed: {
    ...mapState(['tab_left', 'tab_right', 'weather'])
  },
  methods: {
    // changeTab (id, type) {
    //   if (type === 'left') {
    //     this.change_left_tab(id)
    //   } else {
    //     this.change_right_tab(id)
    //   }
    // },
    logout () {
      localStorage.token = ''
      this.$store.state.token = ''
      this.$router.push('/')
    },
    getTime () {
      var _this = this
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf =
        new Date().getMinutes() < 10
          ? '0' + new Date().getMinutes()
          : new Date().getMinutes()
      let ss =
        new Date().getSeconds() < 10
          ? '0' + new Date().getSeconds()
          : new Date().getSeconds()
      _this.gettime = yy + '年' + mm + '月' + dd + '日  ' + hh + ':' + mf + ':' + ss
    },
    currentTime () {
      this.getTime()
      setInterval(this.getTime, 1000)
    },
    ...mapMutations(['change_left_tab', 'change_right_tab'])
  },
  created () {
    this.currentTime()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.header
  height: 11.16vh
  background-image: url('~@/assets/img/bg-top.png')
  background-size: 100% 100%
  text-align center
  padding-top: 2.5vh
  .header-title
    bigtitle()
    cursor: pointer
    @media screen and (max-width: 1920px)
      font-size: 24px
  .header-time
    font-size: 18px
    margin-top: 15px
    @media screen and (max-width: 1920px)
      font-size: 16px
      margin-top: 5px
</style>
