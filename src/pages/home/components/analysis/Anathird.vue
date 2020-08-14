<template>
  <div>
    <div class="title2">历史对比</div>
    <div class="controller-box">
      <div class="select1">
        分析对象<CommonSelect2 v-if="smallSelect1.length" :largeSelect="largeSelect1" :smallSelect="smallSelect1" :defaultValue="smallSelect1[0].name" @changeLarge="changeLarge1" @changeSmall="changeSmall1"></CommonSelect2>
      </div>
      <DateType @getDateType="changeDate"></DateType>
    </div>
    <div class="common-echarts-wrapper forecast">
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
    </div>
    <div class="title2">对象对比</div>
    <div class="controller-box">
      <div class="select1">
        分析对象2<CommonSelect2 v-if="smallSelect2.length" :largeSelect="largeSelect2" :smallSelect="smallSelect2" :defaultValue="smallSelect2[1].name" @changeLarge="changeLarge2" @changeSmall="changeSmall2"></CommonSelect2>
      </div>
    </div>
    <div class="common-echarts-wrapper forecast">
      <div class="common-echarts-box">
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
      </div>
    </div>
  </div>
</template>

<script>
import { buildingSelect, venueSelect } from '@/request/api'
export default {
  name: 'Anathird',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    DateType: () => import('@/common/components/DateType'),
    CommonSelect2: () => import('@/common/components/CommonSelect2')
  },
  data () {
    return {
      largeSelect1: [],
      smallSelect1: [],
      largeSelect2: [],
      smallSelect2: []
    }
  },
  props: {
    list: Object
  },
  watch: {
    largeSelect1 () {
      this.getVenueSelect1(this.largeSelect1[0].id)
    },
    largeSelect2 () {
      this.getVenueSelect2(this.largeSelect2[0].id)
    }
  },
  methods: {
    getBuildingSelect () {
      buildingSelect().then((res) => {
        let data = res.data
        this.largeSelect1 = []
        this.largeSelect2 = []
        for (let i = 0; i < data.length; i++) {
          this.largeSelect1.push({
            id: data[i].facilityId,
            name: data[i].facilityName
          })
          this.largeSelect2.push({
            id: data[i].facilityId,
            name: data[i].facilityName
          })
        }
        this.largeSelect1.splice(1, 1)
        this.largeSelect2.splice(1, 1)
      })
    },
    getVenueSelect1 (id) {
      venueSelect({
        facilityId: id
      }).then((res) => {
        let data = res.data
        this.smallSelect1 = []
        for (let i = 0; i < data.length; i++) {
          this.smallSelect1.push({
            id: data[i].id,
            name: data[i].name
          })
        }
        // this.$emit('changeSelect31', this.smallSelect1[0])
      })
    },
    getVenueSelect2 (id) {
      venueSelect({
        facilityId: id
      }).then((res) => {
        let data = res.data
        this.smallSelect2 = []
        for (let i = 0; i < data.length; i++) {
          this.smallSelect2.push({
            id: data[i].id,
            name: data[i].name
          })
        }
        // this.$emit('changeSelect32', this.smallSelect2[1])
      })
    },
    changeLarge1 (item) {
      this.getVenueSelect1(item.id)
    },
    changeSmall1 (item) {
      this.$emit('changeSelect31', item)
      console.log(item)
    },
    changeLarge2 (item) {
      this.getVenueSelect2(item.id)
    },
    changeSmall2 (item) {
      this.$emit('changeSelect32', item)
    },
    changeDate (code) {
      this.$emit('changeDate3', code)
    }
  },
  mounted () {
    this.getBuildingSelect()
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.title2
  margin-top: 2vh
  font-size: 18px
  font-weight: 600
  color: $lgreen
  @media screen and (max-width: 1920px) {
    font-size: 14px
  }
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
    height: 16vh
</style>
