<template>
  <div>
    <div class="title2">历史对比</div>
    <div class="controller-box">
      <div class="select1">
        分析对象<Cascader :options="options2" @changeValue="changeSelect1"></Cascader>
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
        分析对象2<Cascader :options="options2" :compare="22" @changeValue="changeSelect2"></Cascader>
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
import { buildingSelect, venueSelect } from '@/request/select-api'
export default {
  name: 'Anathird',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    DateType: () => import('@/common/components/DateType'),
    Cascader: () => import('@/common/components/Cascader')
  },
  data () {
    return {
      options1: [],
      options2: []
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
        this.options = []
        for (let i = 0; i < data.length; i++) {
          this.options1.push({
            value: data[i].facilityId,
            label: data[i].facilityName,
            children: []
          })
          this.options2.push({
            value: data[i].facilityId,
            label: data[i].facilityName,
            children: []
          })
          venueSelect({
            facilityId: data[i].facilityId
          }).then(res => {
            let data = res.data
            for (let j = 0; j < data.length; j++) {
              this.options1[i].children.push({
                value: data[j].id,
                label: data[j].name
              })
              this.options2[i].children.push({
                value: data[j].id,
                label: data[j].name
              })
            }
          })
        }
      })
    },
    changeSelect1 (item) {
      this.$emit('changeSelect31', item)
    },
    changeSelect2 (item) {
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
