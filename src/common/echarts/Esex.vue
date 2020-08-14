<template>
  <div class="echarts-kuang" @click="showEchartsPopup({data: sexData, type: 'sex'})">
    <div :id="sexData.id" class="echarts-id"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import man from '../../assets/img/man.png'
import woman from '../../assets/img/woman.png'
export default {
  name: 'Esex',
  props: {
    sexData: Object
  },
  computed: {
    fatherData () {
      return this.sexData
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
    if (this.sexData) {
      this.drawBar(this.sexData)
    }
  },
  methods: {
    ...mapMutations(['showEchartsPopup']),
    drawBar (sexData) {
      let myChart = this.$echarts.init(document.getElementById(sexData.id))
      let option = {
        title: {
          text: sexData.title,
          textStyle: {
            color: this.lgreen,
            fontSize: 14,
            fontWeight: 'normal'
          },
          top: 10,
          left: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          textStyle: {
            color: this.white
          },
          right: '10',
          top: '10',
          itemHeight: 15,
          itemWidth: 15,
          data: [
            {
              name: '男',
              icon: 'image://' + man
            },
            {
              name: '女',
              icon: 'image://' + woman
            }
          ]
        },
        color: sexData.color,
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#D6D9DA'
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#D6D9DA'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#33403E'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#33403E'
            }
          },
          data: sexData.xData
        },
        grid: {
          top: '25%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        series: [
          {
            name: '男',
            type: 'bar',
            stack: '人数',
            barWidth: '3',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: 'rgba(4, 174, 198, 0)'},
                  {offset: 1, color: 'rgba(4, 174, 198, 1)'}
                ]
              )
            },
            data: sexData.data[0]
          },
          {
            name: '女',
            type: 'bar',
            stack: '人数',
            barWidth: '3',
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: 'rgba(249, 105, 98, 1)'},
                  {offset: 1, color: 'rgba(249, 105, 98, 0)'}
                ]
              )
            },
            data: sexData.data[1]
          }
        ]
      }
      myChart.setOption(option)
      // 只有页面最后一个echarts图会改变尺寸
      // window.onresize = function () {
      //   myChart.resize()
      // }
      // 多个echarts图都可以改变尺寸
      window.addEventListener('resize', () => {
        myChart.resize()
      })
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
