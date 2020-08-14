<template>
  <div>
    <div class="controller-box">
      <div class="select1">
        分析对象<CommonSelect2 :largeSelect="largeSelect" :smallSelect="smallSelect" @changeLarge="changeLarge" @changeSmall="changeSmall"></CommonSelect2>
      </div>
      <DateType @getDateType="changeDate"></DateType>
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
      <!-- <div class="common-echarts-box">
        <Eline v-if="list.echarts5.id" :lineData="list.echarts5"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts6.id" :lineData="list.echarts6"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts7.id" :lineData="list.echarts7"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts8.id" :lineData="list.echarts8"></Eline>
      </div> -->
    </div>
    <div class="common-title">
      <div>未来24小时预测</div>
    </div>
    <div class="common-echarts-wrapper forecast">
      <div class="common-echarts-box">
        <Eline v-if="list.echarts9.id" :lineData="list.echarts9"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts10.id" :lineData="list.echarts10"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts11.id" :lineData="list.echarts11"></Eline>
      </div>
      <div class="common-echarts-box">
        <Eline v-if="list.echarts12.id" :lineData="list.echarts12"></Eline>
      </div>
    </div>
  </div>
</template>

<script>
import { buildingSelect, venueSelect } from '@/request/api'
export default {
  name: 'Anasecond',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    DateType: () => import('@/common/components/DateType'),
    CommonSelect2: () => import('@/common/components/CommonSelect2')
  },
  props: {
    list: Object
  },
  watch: {
    largeSelect () {
      this.getVenueSelect(this.largeSelect[0].id)
    }
  },
  computed: {
    levelActive () {
      return this.nextlevel[2].active
    }
  },
  data () {
    return {
      largeSelect: [],
      smallSelect: []
    }
  },
  methods: {
    getBuildingSelect () {
      buildingSelect().then((res) => {
        let data = res.data
        this.largeSelect = []
        for (let i = 0; i < data.length; i++) {
          this.largeSelect.push({
            id: data[i].facilityId,
            name: data[i].facilityName
          })
        }
        this.largeSelect.splice(1, 1)
      })
    },
    getVenueSelect (id) {
      venueSelect({
        facilityId: id
      }).then((res) => {
        let data = res.data
        this.smallSelect = []
        for (let i = 0; i < data.length; i++) {
          this.smallSelect.push({
            id: data[i].id,
            name: data[i].name
          })
        }
        // 大分类改变，默认选中小分类第一个，并请求数据，去掉该功能
        // this.$emit('changeSelect2', this.smallSelect[0])
      })
    },
    changeLarge (item) {
      this.getVenueSelect(item.id)
    },
    changeSmall (item) {
      this.$emit('changeSelect2', item)
    },
    changeDate (code) {
      this.$emit('changeDate2', code)
    }
  },
  mounted () {
    this.getBuildingSelect()
  }
}
</script>

<style scoped lang="stylus">
@import "~@/assets/css/common.styl"
.common-echarts-box >>> .number-num
  greennum()
.controller-box
  height: 4vh
  display: flex
  justify-content: space-between
  align-items: center
  .select1
    flex: 0 0 50%
    width: 50%
    display: flex
    align-items: center
    .select-box
      flex: auto
.common-echarts-wrapper
  .common-echarts-box
    height: 18vh
</style>
