<template>
  <div class="monitor-wrapper" :style="{ transform: translate }">
    <div
      class="monitor-box"
      v-for="(item, index) of list"
      :key="item.id"
      :class="{ active: item.active }"
    >
      <div class="common-title" @click="changeHeight(index)">
        <div>
          {{ item.title }}
          <span v-if="subTitleShow === 0">({{ subTitle1 }})</span>
          <span v-if="subTitleShow === 1">({{ subTitle2 }})</span>
          <span v-if="subTitleShow === 2">({{ subTitle3 }})</span>
        </div>
        <i>{{ item.active ? "返回" : "展开" }} &gt;</i>
      </div>
      <div class="monitor3">
        <div v-if="index == 0">
          <Supply
            :nextlevel="list"
            :isOpened="subTitleShow"
            @changeTitle="changeTitle1"
          ></Supply>
        </div>
        <div v-else-if="index == 1">
          <Consumption
            :nextlevel="list"
            :isOpened="subTitleShow"
            @changeTitle="changeTitle2"
          ></Consumption>
        </div>
        <div v-else>
          <Analysis
            :nextlevel="list"
            :isOpened="subTitleShow"
            @changeTitle="changeTitle3"
          ></Analysis>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Monitor",
  components: {
    Supply: () => import("./Supply"),
    Consumption: () => import("./Consumption"),
    Analysis: () => import("./Analysis")
  },
  data() {
    return {
      original_hei: 28,
      current_index: 0,
      subTitle1: "",
      subTitle2: "",
      subTitle3: "",
      subTitleShow: -1,
      list: [
        {
          id: "001",
          title: "能源供给",
          active: false
        },
        {
          id: "002",
          title: "能源消费",
          active: false
        },
        {
          id: "003",
          title: "能源分析",
          active: false
        }
      ]
    };
  },
  computed: {
    translate() {
      return "translate(0, -" + this.original_hei * this.current_index + "vh)";
    }
  },
  methods: {
    ...mapMutations(["chooseLeftTimer"]),
    // 根据不同组件切换tab高度，并且有动画
    changeHeight(index) {
      this.chooseLeftTimer();
      if (this.list[index].active === false) {
        this.list[index].active = true;
        this.current_index = index;
        this.subTitleShow = index;
      } else {
        this.list[index].active = false;
        this.current_index = 0;
        this.subTitleShow = -1;
      }
    },
    // 在组件title中加上当前title文字
    changeTitle1(msg) {
      this.subTitle1 = msg;
    },
    changeTitle2(msg) {
      this.subTitle2 = msg;
    },
    changeTitle3(msg) {
      this.subTitle3 = msg;
    }
  }
};
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
