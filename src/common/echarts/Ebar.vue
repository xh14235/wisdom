<template>
  <div class="echarts-kuang" @click="showEchartsPopup({data: barData, type: 'bar'})">
    <div :id="barData.id" class="echarts-id"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import green from '../../assets/img/icon-green.png'
import yellow from '../../assets/img/icon-yellow.png'
import blue from '../../assets/img/icon-blue.png'
import red from '../../assets/img/icon-red.png'
export default {
  name: 'Ebar',
  // data () {
  //   return {
  //     barData1: {
  //       id: 'bar1',
  //       title: '柱状图',
  //       legendShow: true,
  //       legendData: ['水', '电'],
  //       color: ['red', 'blue', 'green'],
  //       xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //       data: [
  //         [820, 932, 444, 934, 1290, 1330, 1320],
  //         [820, 112, 344, 534, 1690, 1130, 1320]
  //       ]
  //     }
  //   }
  // },
  props: {
    barData: Object,
    enlarge: Boolean
  },
  computed: {
    fatherData () {
      return this.barData
    },
    ...mapState({
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      bgreen: state => state.color.bgreen,
      red: state => state.color.red,
      white: state => state.color.white,
      lgreen: state => state.color.lgreen
    })
  },
  watch: {
    fatherData () {
      this.drawBar(this.fatherData)
    }
  },
  mounted () {
    if (this.barData) {
      this.drawBar(this.barData)
    }
  },
  methods: {
    ...mapMutations(['showEchartsPopup']),
    rgba (hex, opacity) {
      return `rgba(${parseInt('0x' + hex.slice(1, 3))}, ${parseInt('0x' + hex.slice(3, 5))}, ${parseInt('0x' + hex.slice(5, 7))}, ${opacity})`
    },
    drawBar (barData) {
      let _this = this
      let series = []
      let data = []
      let legendData = []
      let itemWidth = 0
      let itemHeight = 0
      if (barData.legendIcon) {
        legendData = [
          {
            name: '电',
            icon: 'image://' + green
          },
          {
            name: '热水',
            icon: 'image://' + yellow
          },
          {
            name: '冷',
            icon: 'image://' + blue
          },
          {
            name: '热',
            icon: 'image://' + red
          }
        ]
        itemWidth = 10
        itemHeight = 10
        if (this.enlarge) {
          itemWidth = 20
          itemHeight = 20
        }
      } else {
        legendData = barData.legendData
        itemWidth = 15
        itemHeight = 5
        if (this.enlarge) {
          itemWidth = 30
          itemHeight = 10
        }
      }
      let fontTitle = 16
      let fontXy = 12
      let legendTop = '8%'
      let legendLeft = '10%'
      let barWidth = 10
      let itemGap = 15
      if (this.enlarge) {
        fontTitle = 32
        fontXy = 24
        legendTop = '13%'
        legendLeft = '15%'
        barWidth = 20
        itemGap = 30
      }
      // console.log(barData.data.length)
      for (let i = 0; i < barData.data.length; i++) {
        data.push([])
      }
      if (barData.itemStyle === 1) {
        for (let i = 0; i < barData.data.length; i++) {
          for (let j = 0; j < barData.data[i].length; j++) {
            data[i].push({
              value: barData.data[i][j],
              itemStyle: {
                normal: {
                  color: this.rgba(barData.color[i], 0.5),
                  borderColor: barData.color[i],
                  borderWidth: 1
                }
              }
            })
          }
        }
      } else if (barData.itemStyle === 2) {
        for (let i = 0; i < barData.data.length; i++) {
          for (let j = 0; j < barData.data[i].length; j++) {
            data[i].push({
              value: barData.data[i][j],
              itemStyle: {
                normal: {
                  color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {offset: 0, color: this.rgba(barData.color[i], 1)},
                    {offset: 0.05, color: this.rgba(barData.color[i], 1)},
                    {offset: 0.06, color: this.rgba(barData.color[i], 0.5)},
                    {offset: 1, color: this.rgba(barData.color[i], 0)}
                  ])
                }
              }
            })
          }
        }
      } else {
        data = barData.data
      }
      let seriesLength = barData.legendData.length
      let stack = barData.stack || null
      for (let i = 0; i < seriesLength; i++) {
        series.push({
          name: barData.legendData[i],
          data: data[i],
          type: 'bar',
          stack: stack,
          barWidth: barWidth
        })
      }
      let myChart = this.$echarts.init(document.getElementById(barData.id))
      let option = {
        title: {
          text: barData.title,
          textStyle: {
            color: this.lgreen,
            fontSize: fontTitle,
            fontWeight: 600
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: barData.legendShow,
          textStyle: {
            fontSize: fontXy,
            color: this.white
          },
          icon: 'bar',
          itemWidth: itemWidth,
          itemHeight: itemHeight,
          itemGap: itemGap,
          left: legendLeft,
          top: legendTop,
          data: legendData
        },
        color: barData.color,
        // color: function (params) {
        //   // return barData.color[params.dataIndex]
        //   return ['blue', 'red', 'yellow', 'green']
        // },
        xAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: fontXy,
              color: '#c3edd7'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#33403E'
            }
          },
          data: barData.xData
        },
        yAxis: {
          type: 'value',
          name: barData.yName || '',
          nameLocation: 'end',
          nameTextStyle: {
            color: this.lgreen,
            fontSize: fontXy
            // paddingLeft: -10
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: fontXy,
              color: '#c3edd7'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#33403E'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#33403E'
            }
          }
        },
        grid: {
          top: '20%',
          left: '0',
          right: '0',
          bottom: '10%',
          containLabel: true
        },
        series: series
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="stylus">
.echarts-kuang
  width: 100%
  height: 100%
  .echarts-id
    width: 100%
    height: 100%
</style>
