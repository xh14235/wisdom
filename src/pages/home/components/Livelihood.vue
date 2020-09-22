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
import { getCentrePoint } from '@/request/common-api'
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
          break
        case '002':
          markData = [
            {
              'Height': this.iconHeight,
              'Id': '2',
              'Latitude': '31.08931',
              'Longitude': '121.6833',
              'Name': '水质监测点',
              'Type': '水质监测点',
              'Value': '36kW',
              'Other': []
            },
            {
              'Height': this.iconHeight,
              'Id': '2',
              'Latitude': '31.08631',
              'Longitude': '121.6853',
              'Name': '空气监测点',
              'Type': '空气监测点',
              'Value': '36kW',
              'Other': []
            },
            {
              'Height': this.iconHeight,
              'Id': '2222',
              'Latitude': '31.08831',
              'Longitude': '121.6843',
              'Name': '垃圾回收中心',
              'Type': '垃圾回收中心',
              'Value': '36kW',
              'Other': []
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
              'Id': '1222',
              'Latitude': '31.08732',
              'Longitude': '121.6849',
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
              'Id': '1333',
              'Latitude': '31.08706',
              'Longitude': '121.6848',
              'Name': '网红打卡点',
              'Type': '网红打卡点',
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
        case '005':
          markData = [
            {
              'Height': this.iconHeight,
              'Id': '13334',
              'Latitude': '31.08706',
              'Longitude': '121.6848',
              'Name': '玫瑰工坊',
              'Type': '玫瑰工坊',
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
        case '006':
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
        background-image: url('~@/assets/img/tab3.png')
        color: $green
        line-height: 3.33333vh
  .right-box
    height: 90vh
    overflow: hidden
</style>
