<template>
  <div>
    <div class="controller-box">
      <div class="select1">
        分析对象<Cascader
          :options="options"
          @changeValue="changeSelect3"
        ></Cascader>
      </div>
      <DateType @getDateType="changeDate3"></DateType>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline v-if="list.echarts1.id" :lineData="list.echarts1"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts2.id" :lineData="list.echarts2"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts3.id" :lineData="list.echarts3"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts4.id" :lineData="list.echarts4"></Eline>
      </div>
      <div class="common-echarts-box last2">
        <Ebar v-if="list.echarts5.id" :barData="list.echarts5"></Ebar>
      </div>
      <div class="common-echarts-box last2">
        <Eline v-if="list.echarts6.id" :lineData="list.echarts6"></Eline>
      </div>
    </div>
  </div>
</template>

<script>
import { buildingSelect, venueSelect } from "@/request/select-api";
export default {
  name: "Supthird",
  components: {
    Eline: () => import("@/common/echarts/Eline"),
    Ebar: () => import("@/common/echarts/Ebar"),
    DateType: () => import("@/common/components/DateType"),
    Cascader: () => import("@/common/components/Cascader")
  },
  data() {
    return {
      value: "",
      options: []
    };
  },
  props: {
    list: Object
  },
  // watch: {
  //   largeSelect () {
  //     this.getVenueSelect(this.largeSelect[0].id)
  //   }
  // },
  methods: {
    // 获取下拉框内容
    getBuildingSelect() {
      buildingSelect().then(res => {
        let data = res.data;
        this.options = [];
        for (let i = 0; i < data.length; i++) {
          this.options.push({
            value: data[i].facilityId,
            label: data[i].facilityName,
            children: []
          });
          venueSelect({
            facilityId: data[i].facilityId
          }).then(res => {
            let data = res.data;
            for (let j = 0; j < data.length; j++) {
              this.options[i].children.push({
                value: data[j].id,
                label: data[j].name
              });
            }
          });
        }
      });
    },
    changeSelect3(item) {
      this.$emit("changeSelect3", item);
    },
    changeDate3(code) {
      this.$emit("changeDate3", code);
    }
  },
  mounted() {
    this.getBuildingSelect();
  }
};
</script>

<style scoped lang="stylus">
.controller-box
  display: flex
  justify-content: space-between
  align-items: center
  height: 5vh
  .select1
    flex: 0 0 50%
    width: 50%
    display: flex
    align-items: center
    .cascader-wrapper
      flex: auto
.common-echarts-wrapper
  .common-echarts-box
    height: 19vh
    &.last2
      flex: 0 0 100%
      width: 100%
</style>
