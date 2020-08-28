<template>
  <div>
    <div class="controller-box">
      <div class="select1">
        分析对象<CommonSelect2 :largeSelect="largeSelect" :smallSelect="smallSelect" @changeLarge="changeLarge" @changeSmall="changeSmall"></CommonSelect2>
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
import { buildingSelect, venueSelect } from '@/request/select-api'
export default {
  name: 'Supthird',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    Ebar: () => import('@/common/echarts/Ebar'),
    DateType: () => import('@/common/components/DateType'),
    CommonSelect2: () => import('@/common/components/CommonSelect2')
  },
  data () {
    return {
      largeSelect: [],
      smallSelect: []
    }
  },
  props: {
    list: Object
  },
  watch: {
    largeSelect () {
      this.getVenueSelect(this.largeSelect[0].id)
    }
  },
  methods: {
    getBuildingSelect () {
      buildingSelect().then((res) => {
        // console.log(res.data)
        // this.largeSelect = res.data
        let data = res.data
        this.largeSelect = []
        for (let i = 0; i < data.length; i++) {
          // if (data[i]) {}
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
        // console.log(res)
        let data = res.data
        this.smallSelect = []
        for (let i = 0; i < data.length; i++) {
          this.smallSelect.push({
            id: data[i].id,
            name: data[i].name
          })
        }
        // this.$emit('changeSelect3', this.smallSelect[0])
      })
    },
    changeLarge (item) {
      this.getVenueSelect(item.id)
    },
    changeSmall (item) {
      this.$emit('changeSelect3', item)
    },
    changeDate3 (code) {
      this.$emit('changeDate3', code)
    }
  },
  mounted () {
    this.getBuildingSelect()
  }
}
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
    .select-box
      flex: auto
.common-echarts-wrapper
  .common-echarts-box
    height: 19vh
    &.last2
      flex: 0 0 100%
      width: 100%
</style>
