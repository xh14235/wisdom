<template>
  <div class="wrapper">
    <div class="common-title">
      <div>设备运维 <span>({{subTitle}})</span></div>
    </div>
    <div class="common-pages">
      <div class="common-page" v-if="this.tab === 0">
        <transition name="fade" mode="out-in">
          <Opefirst :infoList="infoList" :echarts="echarts" @changeSelect1="changeSelect1"></Opefirst>
        </transition>
      </div>
      <div class="common-page" v-else-if="this.tab === 1">
        <transition name="fade" mode="out-in">
          <Opesecond :infoList="infoList" :echarts="echarts" @changeSelect2="changeSelect2"></Opesecond>
        </transition>
      </div>
      <div class="common-page" v-else>
        <transition name="fade" mode="out-in">
          <Opethird :infoList="infoList" :echarts="echarts" @changeSelect3="changeSelect3"></Opethird>
        </transition>
      </div>
    </div>
    <div class="common-tab">
      <span :class="{'active': tab === index}" v-for="(item, index) of list" :key="item.id" @click="changeTab(index)">{{item.title}}</span>
    </div>
  </div>
</template>

<script>
import { getTestList, supHead1, suphotline, supcoldline, suphotwaterline, operationCube } from '@/request/api'
import { mapState } from 'vuex'
export default {
  name: 'Operation',
  components: {
    Opefirst: () => import('./operation/Opefirst'),
    Opesecond: () => import('./operation/Opesecond'),
    Opethird: () => import('./operation/Opethird')
  },
  data () {
    return {
      tab: 0,
      subTitle: '',
      list: [
        {
          id: '01',
          title: '全村域'
        },
        {
          id: '02',
          title: '分布式能源'
        },
        {
          id: '03',
          title: '代运维设备'
        }
      ],
      infoList: [],
      echarts: {},
      // 全村域热水、冷、热
      list1: [],
      list2: [],
      list3: []
    }
  },
  computed: {
    ...mapState({
      year: state => state.lists.year,
      month: state => state.lists.month,
      day: state => state.lists.day,
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      bgreen: state => state.color.bgreen,
      red: state => state.color.red
    })
  },
  methods: {
    changeTab (index) {
      this.tab = index
      this.subTitle = this.list[index].title
      if (index === 0) {
        this.getAllElectric()
      } else if (index === 1) {
        this.getCube936('1254288413020762112')
      } else {
        this.operationLine()
      }
    },
    changeSelect1 (code) {
      if (code.id === '11') {
        this.getAllElectric()
      } else {
        this.getAllHot()
      }
    },
    changeSelect2 (item) {
      if (item[1].id === '1') {
        this.getCube936(item[0].id)
      } else {
        this.operationLine()
      }
    },
    changeSelect3 (code) {
      this.operationLine()
    },
    getInfoList () {
      this.infoList = [
        {
          id: '0001',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 0
        },
        {
          id: '0002',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 1
        },
        {
          id: '0003',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 2
        },
        {
          id: '0004',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 0
        },
        {
          id: '0005',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 1
        },
        {
          id: '0006',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 2
        },
        {
          id: '0007',
          time: '12.01 12:12:12',
          equipment: '1号闸刀',
          statue: 0
        }
      ]
    },
    getAllElectric () {
      supHead1().then((res) => {
        this.echarts = {
          id: 'line1111',
          title: '(kW)',
          legendShow: true,
          legendData: ['分布式能源', '外来电'],
          color: [this.green, this.yellow],
          areaColor: false,
          smooth: true,
          xData: this.day,
          data: [Object.values(res.data.DISTRIBUTED_ENERGY), Object.values(res.data.ENERGY_EXTERNAL)]
        }
      })
    },
    getAllHot () {
      suphotwaterline().then((res) => {
        this.list1 = res.data
      })
      supcoldline().then((res) => {
        this.list2 = res.data
      })
      suphotline().then((res) => {
        this.list3 = res.data
      })
      this.echarts = {
        id: 'line1111',
        title: '(kW)',
        legendShow: true,
        legendData: ['供热水', '供冷', '供热'],
        color: [this.green, this.yellow, this.red],
        areaColor: false,
        smooth: true,
        xData: this.day,
        data: [this.list1, this.list2, this.list3]
      }
    },
    getCube936 (cubeType) {
      operationCube({
        cubeId: cubeType
      }).then((res) => {
        this.echarts = {
          id: 'line1111',
          title: '(kWh)',
          legendShow: false,
          legendData: ['地缘热供热', '地缘热供冷'],
          color: [this.green, this.yellow, this.blue],
          areaColor: false,
          smooth: true,
          xData: this.day,
          data: [res.data]
        }
      })
    },
    operationLine () {
      this.echarts = {
        id: 'line1111',
        title: '(kWh)',
        legendShow: true,
        legendData: ['地缘热供热', '地缘热供冷'],
        color: [this.green, this.yellow, this.blue],
        areaColor: false,
        smooth: true,
        xData: this.day,
        data: [getTestList(150, 24), getTestList(150, 24)]
      }
    }
  },
  mounted () {
    this.changeTab(0)
    this.getInfoList()
    this.getAllElectric()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
</style>
