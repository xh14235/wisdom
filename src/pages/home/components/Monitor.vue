<template>
  <div class="monitor-wrapper" :style="{transform: translate}">
    <div class="monitor-box" v-for="(item, index) of list" :key="item.id" :class="{'active': item.active}">
      <div class="common-title" @click="changeHeight(index)">
        <div>
          {{item.title}}
          <span v-if="subTitleShow === 0">({{subTitle1}})</span>
          <span v-if="subTitleShow === 1">({{subTitle2}})</span>
          <span v-if="subTitleShow === 2">({{subTitle3}})</span>
        </div>
        <i>{{item.active ? '返回' : '展开'}} &gt;</i>
      </div>
      <div class="monitor3">
        <div v-if="index == 0">
          <Supply :nextlevel="list" @changeTitle="changeTitle1"></Supply>
        </div>
        <div v-else-if="index == 1">
          <Consumption :nextlevel="list" @changeTitle="changeTitle2"></Consumption>
        </div>
        <div v-else>
          <Analysis :nextlevel="list" @changeTitle="changeTitle3"></Analysis>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Monitor',
  components: {
    Supply: () => import('./Supply'),
    Consumption: () => import('./Consumption'),
    Analysis: () => import('./Analysis')
  },
  data () {
    return {
      original_hei: 28,
      current_index: 0,
      subTitle1: '',
      subTitle2: '',
      subTitle3: '',
      subTitleShow: -1,
      list: [
        {
          id: '001',
          title: '能源供给',
          active: false
        },
        {
          id: '002',
          title: '能源消费',
          active: false
        },
        {
          id: '003',
          title: '能源分析',
          active: false
        }
      ]
    }
  },
  computed: {
    ...mapState({
      ifr: state => state.map.ifr
    }),
    translate () {
      return 'translate(0, -' + this.original_hei * this.current_index + 'vh)'
    }
  },
  methods: {
    // 根据不同组件切换tab高度，并且有动画
    changeHeight (index) {
      if (this.list[index].active === false) {
        this.list[index].active = true
        this.current_index = index
        this.subTitleShow = index
        localStorage.energyTab = index
        this.gisMethods(index)
      } else {
        this.list[index].active = false
        this.current_index = 0
        this.subTitleShow = -1
        localStorage.energyTab = 0
      }
    },
    // 地图方法
    gisMethods (index) {
      this.ifr.clearMarks()
      let markData = []
      let positionData = {}
      switch (index) {
        case 0:
          markData = [
            {
              'Height': '0.2',
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
            'Distance': '3.497281',
            'PosX': '121.6851',
            'PosY': '31.08658',
            'Time': 1.1574446,
            'X': '31',
            'Y': '40'
          }
          break
        case 1:
          markData = [
            {
              'Height': '0.2',
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
            'Distance': '3.497281',
            'PosX': '121.6851',
            'PosY': '31.08658',
            'Time': 1.1574446,
            'X': '31',
            'Y': '40'
          }
          break
        case 2:
          markData = [
            {
              'Height': '0.2',
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
            'Distance': '3.497281',
            'PosX': '121.6851',
            'PosY': '31.08658',
            'Time': 1.1574446,
            'X': '31',
            'Y': '40'
          }
          break
        default:
          break
      }
      this.ifr.setCameraSettingWithCoordinate(positionData)
      this.ifr.setMarkData(markData)
    },
    // 在组件title中加上当前文字
    changeTitle1 (msg) {
      this.subTitle1 = msg
    },
    changeTitle2 (msg) {
      this.subTitle2 = msg
    },
    changeTitle3 (msg) {
      this.subTitle3 = msg
    }
  },
  mounted () {
    localStorage.energyTab = 0
  }
}
</script>

<style scoped lang="stylus">
.monitor-wrapper
  overflow: hidden
  transition: all 0.5s
  .monitor-box
    height: 27vh
    margin-bottom: 1vh
    overflow: hidden
    transition: all 0.5s
    &:last-child
      height: 36vh
      margin-bottom: 0
    &.active
      height: 90vh
      z-index: 1
</style>
