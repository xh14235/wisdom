<template>
  <div class="select-box">
    <div class="chosen-value" @click.stop="changeShow()">{{defaultValue || chosen.info}}</div>
    <transition name="slide">
      <div class="chosen-list" v-show="listShow && selectListShow">
        <div class="chosen-li"  v-for="item of select" :key="item.id" @click="changeChosen(item)">{{item.info}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonSelect',
  props: {
    select: Array,
    defaultValue: String
  },
  data () {
    return {
      chosen: {},
      listShow: false
    }
  },
  computed: {
    ...mapState(['selectListShow'])
  },
  watch: {
    select () {
      this.chosen = this.select[0]
    }
  },
  methods: {
    changeShow () {
      this.listShow = !this.listShow
      this.showSelectList()
    },
    changeChosen (item) {
      this.chosen = item
      this.$emit('selectChange', this.chosen)
      this.listShow = false
    },
    ...mapMutations(['showSelectList'])
  },
  mounted () {
    if (this.select[0]) {
      this.chosen = this.select[0]
    }
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
  .chosen-list
    position: absolute
    top: 2.5vh
    right: 0
    width: 100%
    background: rgba(17,40,34,0.8)
    z-index: 1
    .chosen-li
      height: 3vh
      line-height: 3vh
      text-indent: 5px
      &:hover
        background: rgba(74,204,129,0.5)
</style>
