<template>
  <div class='right-wrapper'>
    <div class='right-tab'>
      <span
        class='right-item'
        :class="{'item-active': item.id === tab_right}"
        v-for='item of tabRight'
        :key='item.id'
        @click='changeTab(item.id)'
      >{{item.info}}</span>
    </div>
    <div class='right-box'>
      <transition name='fadeRight' mode='out-in'>
        <keep-alive>
          <component :is='view'></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
// import { getCentrePoint } from '@/request/common-api'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Livelihood',
  components: {
    Security: () => import('./Security'),
    Environment: () => import('./Environment'),
    Trip: () => import('./Trip'),
    Culture: () => import('./Culture'),
    Industry: () => import('./Industry'),
    Athome: () => import('./Athome')
  },
  data () {
    return {
      tabRight: [
        {
          id: '001',
          info: '安防',
          active: true
        },
        {
          id: '002',
          info: '生态',
          active: false
        },
        {
          id: '003',
          info: '出行',
          active: false
        },
        {
          id: '004',
          info: '文旅',
          active: false
        },
        {
          id: '005',
          info: '产业',
          active: false
        },
        {
          id: '006',
          info: '家居',
          active: false
        }
      ]
    }
  },
  computed: {
    ...mapState({
      tab_right: state => state.tab_right,
      ifr: state => state.map.ifr,
      iconHeight: state => state.map.iconHeight,
      jumpTime: state => state.map.jumpTime,
      viewX: state => state.map.viewX,
      viewY: state => state.map.viewY,
      viewZ: state => state.map.viewZ
    }),
    view () {
      let component = ''
      // 动态切换组件
      switch (this.tab_right) {
        case '001':
          component = 'Security'
          break
        case '002':
          component = 'Environment'
          break
        case '003':
          component = 'Trip'
          break
        case '004':
          component = 'Culture'
          break
        case '005':
          component = 'Industry'
          break
        case '006':
          component = 'Athome'
          break
        default:
          break
      }
      return component
    }
  },
  methods: {
    ...mapMutations(['change_right_tab']),
    changeTab (id) {
      this.change_right_tab(id)
      this.ifr.clearMarks()
      let markData = []
      let positionData = {}
      switch (id) {
        case '001':
          markData = this.ifr.markConfig['security']
          positionData = this.ifr.sceneCenterConfig['security']
          break
        case '002':
          markData = this.ifr.markConfig['ecology']
          positionData = this.ifr.sceneCenterConfig['ecology']
          break
        case '003':
          markData = this.ifr.markConfig['realWatching']
          positionData = this.ifr.sceneCenterConfig['realWatching']
          break
        case '004':
          markData = this.ifr.markConfig['culturalTourism']
          positionData = this.ifr.sceneCenterConfig['culturalTourism']
          break
        case '005':
          markData = this.ifr.markConfig['industry']
          positionData = this.ifr.sceneCenterConfig['industry']
          break
        case '006':
          markData = this.ifr.markConfig['homeFurnishing']
          positionData = this.ifr.sceneCenterConfig['homeFurnishing']
          break
        default:
          break
      }
      this.ifr.setMarkData(markData)
      this.ifr.setCameraSettingWithCoordinate(positionData)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~@/assets/css/common.styl'
.right-wrapper
  width: 100%
  height: 100vh
  padding-right: 2%
  padding-left: 15%
  overflow: hidden
  background-image: url('~@/assets/img/bg-right.png')
  background-size: 100% 100%
  .right-tab
    width: 100%
    height: 8.5vh
    margin-bottom: 1.5vh
    display: flex
    justify-content: space-between
    align-items: center
    .right-item
      flex: 0 0 16%
      width: 16%
      text-align: center
      line-height: 2.66667vh
      font-size: 18px
      background-image: url('~@/assets/img/tab2.png')
      background-size: 100% 100%
      cursor: pointer
      @media screen and (max-width: 1920px)
        font-size: 14px
      &.item-active
        background-image: url('~@/assets/img/tab3.gif')
        color: $green
        line-height: 3.33333vh
  .right-box
    height: 90vh
    overflow: hidden
</style>
