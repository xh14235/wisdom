<template>
  <div>
    <div class="common-title">
      <div>用能异常-全村域</div>
    </div>
    <div class="statistics">
      <p v-for="item of list.abnormalType" :key="item.abnormalKey">
        <span>{{item.abnormalReason}}</span>
        <b>{{item.value}}</b>
      </p>
    </div>
    <div class="common-table">
      <div class="table-head">
        <span>时间</span>
        <span>事件</span>
        <span>地点</span>
        <span>状态</span>
      </div>
      <div class="table-body">
        <p v-for="item of energyList" :key="item.id">
          <span>{{getTime(item.time)}}</span>
          <span v-if="item.type === 'ELECTRICITY'">电</span>
          <span v-if="item.type === 'HOT_WATER'">热水</span>
          <span v-if="item.type === 'COLD'">冷</span>
          <span v-if="item.type === 'HOT'">热</span>
          <span>{{item.buildingSubName}}</span>
          <span>{{item.abnormalValue}}{{item.unit}}<span class="percent" :class="{'red': item.percentValue >= 0, 'green': item.percentValue < 0}">{{item.percentValue >= 0 ? '+' : '-'}}{{item.percentValue}}%</span></span>
        </p>
      </div>
    </div>
    <div class="common-title">
      <div>用能异常-消费个体</div>
    </div>
    <div class="select-add">
      分析对象<Cascader :options="options" @changeValue="changeSelect1"></Cascader>
    </div>
    <div class="single-wrapper">
      <div class="single-box" v-for="(item, index) of list.abnormalEnergy" :key='item.id'>
        <div class="single-title">{{item.title}}</div>
        <div class="single-num">
          <p class="single-time">{{item.time}}</p>
          <p>
            <span class="single-basic"><b>{{item.basic}}</b>kW</span>
            <span class="single-change">{{item.change}}</span>
          </p>
        </div>
        <div class="single-controller">
          <div class="mut" :class="{'active': item.nownum > 1}" @click="mut(index, item.nownum)"></div>
          <div class="num-detail">
            <span class="num-order">{{item.nownum}}</span>/<span class="num-all">{{item.allnum}}</span>
          </div>
          <div class="add" :class="{'active': item.nownum < item.allnum}" @click="add(index, item.nownum)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { buildingSelect, venueSelect } from '@/request/select-api'
export default {
  name: 'Anafirst',
  props: {
    list: Object
  },
  components: {
    Cascader: () => import('@/common/components/Cascader')
  },
  computed: {
    ...mapState({
      energyList: state => state.map.energyList
    })
  },
  data () {
    return {
      select: [
        {
          id: '001',
          value: '1254300251431186436',
          info: '能源管'
        },
        {
          id: '002',
          value: '1254300251431186436',
          info: '光伏'
        }
      ],
      options: []
    }
  },
  watch: {
    largeSelect () {
      this.getVenueSelect(this.largeSelect[0].id)
    }
  },
  methods: {
    mut (index, nownum) {
      this.$emit('mut', index, nownum)
    },
    add (index, nownum) {
      this.$emit('add', index, nownum)
    },
    getTime (date) {
      let month = date.substring(5, 7)
      let day = date.substring(8, 10)
      let time = date.substring(11, 19)
      let newTime = month + '月' + day + '日 ' + time
      return newTime
    },
    getBuildingSelect () {
      buildingSelect().then((res) => {
        let data = res.data
        this.options = []
        for (let i = 0; i < data.length; i++) {
          this.options.push({
            value: data[i].facilityId,
            label: data[i].facilityName,
            children: []
          })
          venueSelect({
            facilityId: data[i].facilityId
          }).then(res => {
            let data = res.data
            for (let j = 0; j < data.length; j++) {
              this.options[i].children.push({
                value: data[j].id,
                label: data[j].name
              })
            }
          })
        }
      })
    },
    changeSelect1 (item) {
      this.$emit('changeSelect1', item)
    }
  },
  mounted () {
    this.getBuildingSelect()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.statistics
  display: flex
  justify-content: flex-start
  align-items: center
  border: 1px solid #45504A
  height: 3vh
  margin: 1vh 0
  p
    margin-left: 0.5vw
    span
      color: $lgreen
    b
      color: $yellow
.select-add
  position: absolute
  right: 0
  top: 61vh
  display: flex
  align-items: center
  .cascader-wrapper
    width: 8vw
.common-table
  height: 23vh
  overflow-y: scroll
  .table-head
    span
      display: inline-block
      text-align: center
      &:nth-child(1)
        flex: 0 0 35%
        width: 35%
      &:nth-child(2)
        flex: 0 0 10%
        width: 10%
      &:nth-child(3)
        flex: 0 0 25%
        width: 25%
      &:nth-child(4)
        flex: 0 0 30%
        width: 30%
  .table-body
    p
      span
        display: inline-block
        text-align: center
        .percent
          &.red
            color: $red
          &.green
            color: $green
        &:nth-child(1)
          flex: 0 0 35%
          width: 35%
        &:nth-child(2)
          flex: 0 0 10%
          width: 10%
        &:nth-child(3)
          flex: 0 0 25%
          width: 25%
        &:nth-child(4)
          flex: 0 0 30%
          width: 30%
.single-wrapper
  display: flex
  flex-wrap: wrap
  justify-content: space-between
  width: 100%
  height: 15vh
  .single-box
    flex: 0 0 50%
    width: 50%
    height: 7.5vh
    display: flex
    justify-content: space-around
    align-items: center
    .single-num
      .single-time
        font-size: 12px
        color: $lgreen
      p
        display: flex
        justify-content: space-between
        .single-basic
          color: $lgreen
          b
            font-size: 16px
            color: $yellow
            @media screen and (max-width: 1920px)
              font-size: 14px
        .single-change
          color: $red
    .single-controller
      display: flex
      justify-content: space-between
      .mut, .add
        flex: 0 0 2vh
        width: 2vh
        height: 2vh
        cursor: pointer
        background-size: 100% 100%
      .mut
        background-image: url('~@/assets/img/prev1.png')
        &.active
          background-image: url('~@/assets/img/prev2.png')
      .add
        background-image: url('~@/assets/img/next1.png')
        &.active
          background-image: url('~@/assets/img/next2.png')
      .num-detail
        color: $lgreen
</style>
