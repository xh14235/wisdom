<template>
  <div class="echarts-kuang" @click="showEchartsPopup({data: lineData, type: 'line'})">
    <div :id="lineData.id" class="echarts-id"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Eline',
  props: {
    lineData: Object,
    enlarge: Boolean
  },
  computed: {
    fatherData () {
      return this.lineData.data
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
      this.drawLine(this.lineData)
    }
  },
  methods: {
    ...mapMutations(['showEchartsPopup']),
    drawLine (lineData) {
      let bodyWidth = document.body.offsetWidth
      let series = []
      let seriesLength = lineData.legendData.length
      let markLine = null
      let fontTitle = bodyWidth <= 1920 ? 14 : 16
      let fontXy = bodyWidth <= 1920 ? 9 : 12
      let lineWidth = 1.5
      let verticalAlign = 'top'
      if (this.enlarge) {
        fontTitle = 32
        fontXy = 24
        lineWidth = 4
        verticalAlign = 'bottom'
      }
      for (let i = 0; i < seriesLength; i++) {
        let areaStyle = null
        let dotted = 'solid'
        if (lineData.areaColor) {
          areaStyle = {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1,
              [{
                offset: 0, color: lineData.color[i]
              }, {
                offset: 1, color: 'transparent'
              }]
            )
          }
        } else {
          areaStyle = null
        }
        if (lineData.dotted) {
          if (lineData.data.length === 1) {
            dotted = 'dotted'
          } else {
            if (i % 2 === 1) {
              dotted = 'dotted'
              areaStyle = null
            } else {
              dotted = 'solid'
            }
          }
        } else {
          dotted = 'solid'
        }
        if (lineData.markLine) {
          markLine = {
            symbol: 'none',
            data: [{
              type: 'average',
              name: '平均值'
            }],
            label: {
              normal: {
                formatter: '预警值',
                position: 'middle',
                textStyle: {
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'rgba(249,105,98,1)'
                }
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: 'rgba(249,105,98,0.6)',
                type: 'dotted'
              },
              emphasis: {
                width: 2
              }
            }
          }
        }
        series.push({
          name: lineData.legendData[i],
          data: lineData.data[i],
          symbol: 'circle',
          symbolSize: 2,
          smooth: lineData.smooth,
          markLine: markLine,
          type: 'line',
          itemStyle: {
            normal: {
              areaStyle: areaStyle,
              lineStyle: {
                width: lineWidth,
                type: dotted,
                color: lineData.color[i]
              }
            },
            emphasis: {}
          }
        })
      }
      let myChart = this.$echarts.init(document.getElementById(lineData.id))
      let option = {
        title: {
          text: lineData.title,
          textStyle: {
            color: this.lgreen,
            fontSize: fontTitle,
            fontWeight: 600
          },
          top: lineData.titleTop,
          left: lineData.titleLeft,
          right: lineData.titleRight,
          bottom: lineData.titleBottom
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: lineData.legendShow,
          textStyle: {
            fontSize: fontXy,
            color: this.white
          },
          itemWidth: 15,
          right: '0',
          top: '0',
          icon: 'line',
          data: lineData.legendData
        },
        color: lineData.color,
        grid: {
          top: '25%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLabel: {
            show: true,
            // showMixLabel: true,
            // showMaxLabel: true,
            // interval: 0, // x轴文字显示完全
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
          data: lineData.xData
        },
        yAxis: {
          type: 'value',
          name: lineData.yName || '',
          nameLocation: 'end',
          nameTextStyle: {
            color: this.lgreen,
            fontSize: fontXy,
            align: 'right',
            verticalAlign: verticalAlign
            // padding: 10
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
        series: series
      }
      myChart.setOption(option)
    }
  },
  mounted () {
    if (this.lineData.id) {
      this.drawLine(this.lineData)
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
