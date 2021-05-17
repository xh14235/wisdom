<template>
  <div class="date-type">
    <span
      class="date-box"
      :class="{ active: checked === item.code }"
      v-for="item of list"
      :key="item.id"
      @click="changeDateType(item.code)"
      >{{ item.title }}</span
    >
  </div>
</template>

<script>
// 日期切换组件
export default {
  name: "DateType",
  data() {
    return {
      list: [
        {
          id: "001",
          title: "天",
          code: "day"
        },
        {
          id: "002",
          title: "月",
          code: "month"
        },
        {
          id: "003",
          title: "年",
          code: "year"
        }
      ],
      checked: "day"
    };
  },
  methods: {
    changeDateType(code) {
      this.checked = code;
      this.$emit("getDateType", code);
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.date-type
  display: flex
  align-items: center
  width: 4.5vw
  height: 2.33333vh
  border: 1px solid $green
  border-radius: 3px
  .date-box
    flex: 0 0 1.5vw
    width: 1.5vw
    text-align: center
    height: 2.33333vh
    line-height: 2.33333vh
    color: $green
    cursor: pointer
    @media screen and (max-width: 1920px)
      font-size: 12px
    &.active
      background: rgba(74, 204, 129, 0.2)
</style>
