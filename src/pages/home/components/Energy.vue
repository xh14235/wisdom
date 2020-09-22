<template>
  <div class="left-wrapper">
    <div class="left-tab">
      <span
        class="left-item"
        :class="{'item-active': item.id === tab_left}"
        v-for="item of tabLeft"
        :key="item.id"
        @click="changeTab(item.id)"
      >{{item.info}}</span>
    </div>
    <div class="left-box">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="view"></component>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { getCentrePoint } from '@/request/common-api'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Energy',
  components: {
    Monitor: () => import('./Monitor'),
    Operation: () => import('./Operation'),
    Optimization: () => import('./Optimization'),
    Transaction: () => import('./Transaction')
  },
  data () {
    return {
      tabLeft: [
        {
          id: '001',
          info: '运行监控',
          active: true
        },
        {
          id: '002',
          info: '设备运维',
          active: false
        },
        {
          id: '003',
          info: '用能优化',
          active: false
        },
        {
          id: '004',
          info: '能源交易',
          active: false
        }
      ]
    }
  },
  computed: {
    ...mapState({
      tab_left: state => state.tab_left,
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
      switch (this.tab_left) {
        case '001':
          component = 'Monitor'
          break
        case '002':
          component = 'Operation'
          break
        case '003':
          component = 'Optimization'
          break
        case '004':
          component = 'Transaction'
          break
        default:
          break
      }
      return component
    }
  },
  methods: {
    ...mapMutations(['change_left_tab']),
    changeTab (id) {
      this.change_left_tab(id)
      this.ifr.clearMarks()
      let markData = []
      let positionData = {}
      let energyTab = localStorage.energyTab
      switch (id) {
        case '001':
          if (energyTab === '0') {
            markData = [
              {
                'Height': this.iconHeight,
                'Id': '1111',
                'Latitude': '31.08706',
                'Longitude': '121.6848',
                'Name': '监控',
                'Type': '监控',
                'Value': '36kW',
                'Other': [{'Key': '累计利润', 'Value': '53万元'}, {'Key': '电', 'Value': '77kWh'}, {'Key': '热水', 'Value': '34吨'}]
              }
            ]
            positionData = {
              'Distance': this.viewZ,
              'PosX': getCentrePoint(markData).x,
              'PosY': getCentrePoint(markData).y,
              'Time': this.jumpTime,
              'X': this.viewX,
              'Y': this.viewY
            }
          } else if (energyTab === '1') {
            markData = [
              {
                'Height': this.iconHeight,
                'Id': '1222',
                'Latitude': '31.08706',
                'Longitude': '121.6848',
                'Name': '停车位',
                'Type': '停车位',
                'Value': '36kW',
                'Other': [{'Key': '累计利润', 'Value': '53万元'}, {'Key': '电', 'Value': '77kWh'}, {'Key': '热水', 'Value': '34吨'}]
              }
            ]
            positionData = {
              'Distance': this.viewZ,
              'PosX': getCentrePoint(markData).x,
              'PosY': getCentrePoint(markData).y,
              'Time': this.jumpTime,
              'X': this.viewX,
              'Y': this.viewY
            }
          } else {
            markData = [
              {
                'Height': this.iconHeight,
                'Id': '21119',
                'Latitude': '31.08706',
                'Longitude': '121.6848',
                'Name': '936能源馆',
                'Type': '936能源馆',
                'Value': '36kW',
                'Other': [{'Key': '累计利润', 'Value': '53万元'}, {'Key': '电', 'Value': '77kWh'}, {'Key': '热水', 'Value': '34吨'}]
              }
            ]
            positionData = {
              'Distance': this.viewZ,
              'PosX': getCentrePoint(markData).x,
              'PosY': getCentrePoint(markData).y,
              'Time': this.jumpTime,
              'X': this.viewX,
              'Y': this.viewY
            }
          }
          break
        case '002':
          markData = [
            {
              'Height': this.iconHeight,
              'Id': '21119',
              'Latitude': '31.08706',
              'Longitude': '121.6848',
              'Name': '936能源馆',
              'Type': '936能源馆',
              'Value': '36kW',
              'Other': [{'Key': '累计利润', 'Value': '53万元'}, {'Key': '电', 'Value': '77kWh'}, {'Key': '热水', 'Value': '34吨'}]
            }
          ]
          positionData = {
            'Distance': this.viewZ,
            'PosX': getCentrePoint(markData).x,
            'PosY': getCentrePoint(markData).y,
            'Time': this.jumpTime,
            'X': this.viewX,
            'Y': this.viewY
          }
          break
        case '003':
          markData = [
            {
              'Height': this.iconHeight,
              'Id': '21119',
              'Latitude': '31.08706',
              'Longitude': '121.6848',
              'Name': '监控',
              'Type': '监控',
              'Value': '36kW',
              'Other': [{'Key': '累计利润', 'Value': '53万元'}, {'Key': '电', 'Value': '77kWh'}, {'Key': '热水', 'Value': '34吨'}]
            }
          ]
          positionData = {
            'Distance': this.viewZ,
            'PosX': getCentrePoint(markData).x,
            'PosY': getCentrePoint(markData).y,
            'Time': this.jumpTime,
            'X': this.viewX,
            'Y': this.viewY
          }
          break
        case '004':
          markData = [
            {
              'Height': this.iconHeight,
              'Id': '21119',
              'Latitude': '31.08706',
              'Longitude': '121.6848',
              'Name': '936能源馆',
              'Type': '936能源馆',
              'Value': '36kW',
              'Other': [{'Key': '累计利润', 'Value': '53万元'}, {'Key': '电', 'Value': '77kWh'}, {'Key': '热水', 'Value': '34吨'}]
            }
          ]
          positionData = {
            'Distance': this.viewZ,
            'PosX': getCentrePoint(markData).x,
            'PosY': getCentrePoint(markData).y,
            'Time': this.jumpTime,
            'X': this.viewX,
            'Y': this.viewY
          }
          break
        default:
          break
      }
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.left-wrapper
  width: 100%
  height: 100vh
  padding-left: 2%
  padding-right: 15%
  overflow: hidden
  background-image: url('~@/assets/img/bg-left.png')
  background-size: 100% 100%
  .left-tab
    width: 100%
    height: 8.5vh
    margin-bottom: 1.5vh
    display: flex
    justify-content: space-between
    align-items: center
    .left-item
      flex: 0 0 24%
      width: 24%
      text-align: center
      line-height: 2.66667vh
      font-size: 18px
      background-image: url('~@/assets/img/tab0.png')
      background-size: 100% 100%
      cursor: pointer
      @media screen and (max-width: 1920px)
        font-size: 14px
      &.item-active
        background-image: url('~@/assets/img/tab1.png')
        color: $green
        line-height: 3.33333vh
  .left-box
    height: 90vh
    overflow: hidden
</style>
