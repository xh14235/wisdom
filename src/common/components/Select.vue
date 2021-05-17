<template>
  <div class="select-wrapper">
    <el-select v-model="value" @change="handleChange" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
// 下拉框组件
export default {
  name: "Select",
  data() {
    return {
      value: "",
      selected: {}
    };
  },
  props: {
    options: Array
  },
  methods: {
    handleChange() {
      this.selected = this.recursion(this.options, this.value);
      this.$emit("changeValue", this.selected);
    },
    recursion(arr, val) {
      let selected = {};
      arr.forEach(item => {
        if (item.value.includes(this.value)) {
          selected = item;
        }
      });
      return selected;
    }
  },
  mounted() {
    setTimeout(() => {
      this.value = this.options[0].value;
    }, 1000);
  }
};
</script>

<style lang="stylus" scoped>
.select-wrapper >>> .el-input
  height: 100%
  .el-input__inner
    height: 100%
    line-height: 2.33333vh
    background: transparent
    border: 1px solid #4acc81
    border-radius: 3px
    font-size: 16px
    color: #fff
    padding: 0
    text-indent: 5px
    @media screen and (max-width: 1920px)
      font-size: 12px
  .el-input__suffix
    right: 0px
    top: 0px
    width: 2.33333vh
    height: 2.33333vh
    background-image: url('~@/assets/img/select.png')
    background-size: 100% 100%
    .el-input__suffix-inner
      display: none
.select-wrapper
  flex: auto
  width: 4.5vw
  margin-left: 5px
  .el-select
    width: 100%
    height: 2.33333vh
    line-height: 2.33333vh
</style>
