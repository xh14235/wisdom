<template>
  <div class="select-box">
    <div class="chosen-value" @click.stop="changeShow()">{{largeChosen.name}}<span v-if="smallSelect">-{{smallChosen.name || defaultValue}}</span></div>
    <transition name="slide">
      <div class="chosen-list-wrapper" v-show="listShow && selectListShow">
        <div class="chosen-list-left">
          <div class="chosen-list-left-li" :class="{'active': item.active}" v-for="(item, index) of largeSelect" :key="index" @mouseenter="changeLarge(item, index)">{{item.name}}<span v-show="item.active">&gt;</span></div>
        </div>
        <div class="chosen-list-right">
          <div class="chosen-list-right-li" :class="{'active': item.active}" v-for="(item, index) of smallSelect" :key="index" @click="changeSmall(item, index)">{{item.name}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonSelect2',
  props: {
    largeSelect: Array,
    smallSelect: Array,
    defaultValue: String
  },
  data () {
    return {
      largeChosen: {},
      smallChosen: {},
      listShow: false
    }
  },
  computed: {
    ...mapState(['selectListShow'])
  },
  watch: {
    // 获取小分类
    smallSelect () {
      this.smallChosen = this.smallSelect[0]
      this.smallSelect[0].active = true
    },
    // 页面切换时，获取大分类
    largeSelect () {
      this.largeChosen = this.largeSelect[0]
      this.largeSelect[0].active = true
    },
    selectListShow () {
      if (this.selectListShow === false) {
        this.listShow = false
      }
    }
  },
  methods: {
    changeShow () {
      this.listShow = !this.listShow
      this.showSelectList()
    },
    // 改变大分类名称
    changeLarge (item, index) {
      this.$emit('changeLarge', item)
      this.largeChosen = item
      for (let i = 0; i < this.largeSelect.length; i++) {
        this.largeSelect[i].active = false
      }
      this.largeSelect[index].active = true
    },
    // 改变小分类名称
    changeSmall (item, index) {
      this.$emit('changeSmall', item, this.largeChosen)
      this.smallChosen = item
      for (let i = 0; i < this.smallSelect.length; i++) {
        this.smallSelect[i].active = false
      }
      this.smallSelect[index].active = true
      this.listShow = false
    },
    ...mapMutations(['showSelectList'])
  },
  mounted () {
    // 获取大分类
    if (this.largeSelect.length) {
      this.largeChosen = this.largeSelect[0]
      this.largeSelect[0].active = true
    }
    // if (this.smallSelect.length) {
    //   this.smallChosen = this.smallSelect[0]
    //   this.smallSelect[0].active = true
    // }
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.select-box
  position: relative
  width: 4.5vw
  height: 2.33333vh
  margin-left: 5px
  cursor: pointer
  z-index: 1
  .chosen-value
    position: absolute
    width: 100%
    height: 2.33333vh
    line-height: 2vh
    border: 1px solid $green
    border-radius: 3px
    text-indent: 5px
    z-index: 2
    &::after
      content: ""
      display: block
      width: 2.33333vh
      height: 2.33333vh
      background-image: url('~@/assets/img/select.png')
      background-size: 100% 100%
      position: absolute
      right: -1px
      top: -1px
  .chosen-list-wrapper
    width: 100%
    // height: 20vh
    margin-top: 2.33333vh
    background: rgba(40,104,70,1)
    display: flex
    align-items: flex-start
    .chosen-list-left
      flex: auto
      .chosen-list-left-li
        width: 100%
        overflow: hidden
        // text-overflow: ellipsis
        // white-space: nowrap
        height: 4vh
        line-height: 4vh
        padding: 0 10px
        &:hover, &.active
          background: rgba(255,255,255,.2)
    .chosen-list-right
      flex: auto
      background: rgba(17,40,34,1)
      .chosen-list-right-li
        width: 100%
        overflow: hidden
        // text-overflow: ellipsis
        // white-space: nowrap
        padding: 0 15px
        height: 3vh
        line-height: 3vh
        &:hover, &.active
          color: $green
</style>
