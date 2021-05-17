<template>
  <div
    class="echarts-kuang"
    @click="showEchartsPopup({ data: pieData, type: 'pie' })"
  >
    <div :id="pieData.id" class="echarts-id"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Epie",
  props: {
    pieData: Object,
    enlarge: Boolean
  },
  computed: {
    fatherData() {
      return this.pieData;
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
    fatherData() {
      this.drawPie(this.fatherData);
    }
  },
  mounted() {
    if (this.pieData) {
      this.drawPie(this.pieData);
    }
  },
  methods: {
    ...mapMutations(["showEchartsPopup"]),
    drawPie(pieData) {
      let bodyWidth = document.body.offsetWidth;
      let imgWidth = 50;
      if (bodyWidth <= 1920) {
        imgWidth = 30;
      }
      if (this.enlarge) {
        imgWidth = 100;
      }
      let graphic = null;
      if (pieData.graphic) {
        graphic = {
          elements: [
            {
              type: "image",
              style: {
                image: pieData.graphic,
                width: imgWidth,
                height: imgWidth
              },
              left: "center",
              top: "center"
            }
          ]
        };
      }
      let labelShow = true;
      if (pieData.labelShow === false) {
        labelShow = false;
      }
      let fontTitle = bodyWidth <= 1920 ? 12 : 16;
      let fontXy = 14;
      let fontCenter = bodyWidth <= 1920 ? 12 : 14;
      let titleTop = pieData.titleTop;
      let titleLeft = pieData.titleLeft;
      let itemWidth = 10;
      let itemHeight = 5;
      if (this.enlarge) {
        fontTitle = 32;
        fontXy = 24;
        fontCenter = 28;
        titleTop = "35%";
        titleLeft = "50%";
        itemWidth = 20;
        itemHeight = 10;
      }
      let myChart = this.$echarts.init(document.getElementById(pieData.id));
      let option = {
        title: {
          text: pieData.title, // 饼图中间数字
          textStyle: {
            rich: {
              name: {
                color: this.white,
                lineHeight: 25,
                fontSize: fontCenter
              },
              value: {
                color: this.yellow,
                fontSize: fontTitle,
                fontWeight: 600
              },
              unit: {
                color: this.white,
                fontSize: fontCenter
              }
            }
          },
          textAlign: "center",
          top: titleTop,
          left: titleLeft,
          right: pieData.titleRight,
          bottom: pieData.titleBottom
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        grid: {
          top: "20%",
          left: "0",
          right: "0",
          bottom: "10%"
        },
        graphic: graphic,
        legend: {
          show: pieData.legendShow,
          textStyle: {
            color: this.lgreen,
            fontSize: fontXy
          },
          icon: "bar",
          itemWidth: itemWidth,
          itemHeight: itemHeight,
          orient: "horizontal",
          left: "center",
          bottom: "0",
          formatter(name) {
            // var data = option.series[0].data
            // var tarValue
            // for (var i = 0, l = data.length; i < l; i++) {
            //   if (data[i].name === name) {
            //     tarValue = data[i].value
            //   }
            // }
            // return `${name} ${parseInt(tarValue)}`
            return `${name}`;
          }
        },
        color: pieData.color,
        series: [
          {
            name: pieData.name || "",
            type: "pie",
            radius: pieData.radius,
            center: pieData.center,
            avoidLabelOverlap: true,
            startAngle: 135,
            label: {
              show: labelShow,
              position: "left",
              color: this.lgreen,
              // formatter: '{b}\n{d}%',
              formatter(params) {
                // let sum = 0
                // for (let i = 0; i < params) {}
                // console.log(params)
                // return params.percent + parseInt(params.percent) + '%'
                return parseInt(params.percent) + "%";
              },
              fontSize: fontXy
            },
            labelLine: {
              normal: {
                smooth: 0.2,
                length: 10,
                length2: 10
              }
            },
            itemStyle: {
              borderWidth: pieData.borderWidth,
              borderColor: "rgba(0,0,0,.5)"
            },
            data: pieData.data
          }
        ]
      };
      myChart.setOption(option);
      // 只有页面最后一个echarts图会改变尺寸
      // window.onresize = function () {
      //   myChart.resize()
      // }
      // 多个echarts图都可以改变尺寸
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.echarts-kuang
  width: 100%
  height: 100%
  .echarts-id
    width: 100%
    height: 100%
</style>
