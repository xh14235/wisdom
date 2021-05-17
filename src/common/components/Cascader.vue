<template>
  <div class="cascader-wrapper">
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
      separator="-"
      :props="{ expandTrigger: 'hover' }"
    ></el-cascader>
  </div>
</template>

<script>
// 级联选择器，数据由父组件传入
export default {
  name: "Cascader",
  data() {
    return {
      value: [],
      selected: {}
    };
  },
  props: {
    options: Array,
    compare: Number
  },
  methods: {
    handleChange() {
      this.selected = this.recursion(this.options, this.value);
      this.$emit("changeValue", this.selected);
    },
    recursion(arr, val) {
      let selected = {};
      arr.forEach(item => {
        if (item.value.includes(this.value[0])) {
          item.children.forEach(item => {
            if (item.value.includes(this.value[1])) {
              selected = item;
            }
          });
        }
      });
      return selected;
    }
  },
  mounted() {
    setTimeout(() => {
      this.value = [];
      if (this.compare === 22) {
        this.value.push(this.options[0].value);
        this.value.push(this.options[0].children[1].value);
        this.selected = this.options[0].children[1];
      } else {
        this.value.push(this.options[0].value);
        this.value.push(this.options[0].children[0].value);
        this.selected = this.options[0].children[0];
      }
    }, 1000);
  }
};
</script>

<style lang="stylus" scoped>
.cascader-wrapper >>> .el-input
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
.cascader-wrapper
  flex: auto
  width: 4.5vw
  margin-left: 5px
  .el-cascader
    width: 100%
    height: 2.33333vh
    line-height: 2.33333vh
</style>
