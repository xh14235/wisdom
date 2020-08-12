<template>
  <div class="echarts-kuang" @click="showEchartsPopup({data: pieData, type: 'pie2'})">
    <div :id="pieData.id" class="echarts-id"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Epie2',
  props: {
    pieData: Object,
    enlarge: Boolean
  },
  computed: {
    fatherData () {
      return this.pieData
    },
    ...mapState({
      green: (state) => state.color.green,
      blue: (state) => state.color.blue,
      yellow: (state) => state.color.yellow,
      bgreen: (state) => state.color.bgreen,
      red: (state) => state.color.red,
      white: (state) => state.color.white,
      lgreen: (state) => state.color.lgreen
    })
  },
  watch: {
    fatherData () {
      this.drawPie(this.fatherData)
    }
  },
  mounted () {
    if (this.pieData) {
      this.drawPie(this.pieData)
    }
  },
  methods: {
    ...mapMutations(['showEchartsPopup']),
    drawPie (pieData) {
      let bodyWidth = document.body.offsetWidth
      let fontSize1 = 14
      let fontSize2 = 16
      let titleTop = pieData.titleTop
      if (bodyWidth <= 1920) {
        fontSize1 = 10
        fontSize2 = 12
      }
      if (this.enlarge) {
        fontSize1 = 24
        fontSize2 = 28
        titleTop = '40%'
      }
      let myChart = this.$echarts.init(document.getElementById(pieData.id))
      let option = {
        title: {
          text: pieData.title, // 饼图中间数字
          textStyle: {
            rich: {
              name: {
                color: this.white,
                lineHeight: 25,
                fontSize: fontSize1
              },
              value: {
                color: this.yellow,
                fontSize: fontSize2,
                fontWeight: 600
              }
            }
          },
          textAlign: 'center',
          top: titleTop,
          left: pieData.titleLeft,
          right: pieData.titleRight,
          bottom: pieData.titleBottom
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          show: false,
          orient: 'vertical',
          left: 10,
          data: ['直接访问', '邮件营销']
        },
        series: [
          {
            name: pieData.data.name,
            type: 'pie',
            radius: pieData.radius,
            center: pieData.center,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: pieData.data.value,
                name: pieData.data.name,
                itemStyle: {
                  normal: {
                    color: {
                      colorStops: [
                        {
                          offset: 0,
                          color: 'transparent' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: pieData.color // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: pieData.allNum - pieData.data.value,
                name: pieData.data.value,
                itemStyle: {
                  normal: {
                    color: 'transparent'
                  }
                }
              }
            ]
          }
        ]
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
