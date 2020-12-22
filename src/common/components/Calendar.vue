<template>
  <div class="wrapper">
    <div class="week">
      <span v-for="item of week" :key="item.id">{{item.title}}</span>
    </div>
    <div class="calendar">
      <span v-for="item of calendarList" :key="item.id" :class="{'people1': item.num>=10 && item.num<50, 'people2': item.num>=50 && item.num<100, 'people3': item.num>=100}">{{item.date}}</span>
    </div>
  </div>
</template>

<script>
import { culturecalendar } from '@/request/api'
export default {
  name: 'Calendar',
  data () {
    return {
      week: [
        {
          id: '000',
          title: '日'
        },
        {
          id: '001',
          title: '一'
        },
        {
          id: '002',
          title: '二'
        },
        {
          id: '003',
          title: '三'
        },
        {
          id: '004',
          title: '四'
        },
        {
          id: '005',
          title: '五'
        },
        {
          id: '006',
          title: '六'
        }
      ],
      calendarList: []
    }
  },
  props: {
    month: String
  },
  watch: {
    month () {
      this.getCalendarList()
    }
  },
  methods: {
    getCalendarList () {
      culturecalendar({
        date: this.month
      }).then((res) => {
        let data = Object.values(res.data)
        this.calendarList = []
        for (let i = 0; i < data.length; i++) {
          this.calendarList.push({
            id: '00' + (i + 1),
            date: i + 1,
            num: data[i]
          })
        }
        let time = new Date()
        let year = time.getFullYear()
        let month = Number(this.month.substring(5, 7))
        let day = new Date(year, month - 1, 1).getDay()
        for (let i = 0; i < day; i++) {
          this.calendarList.unshift({
            id: 'alsdjflsjkd' + (i + 1),
            date: '',
            num: 0
          })
        }
      })
    }
  },
  mounted () {
    this.getCalendarList()
  },
  beforeDestroy () {
    this.calendarList = []
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.wrapper
  width: 100%
  height: 100%
  border: 1px solid rgba(69,80,74,1)
  padding: 0.5vh 1vh
  .week
    display: flex
    justify-content: space-around
    height: 16%
    line-height: 220%
    font-size: 14px
    @media screen and (max-width: 1920px) {
      font-size: 12px
    }
  .calendar
    display: flex
    flex-wrap: wrap
    justify-content: flex-start
    height: 84%
    font-size: 14px
    @media screen and (max-width: 1920px) {
      font-size: 12px
    }
    span
      flex: 0 0 14.285%
      width: 14.285%
      text-align: center
      height: 16%
      line-height: 240%
      border-bottom: 1px solid #45504a
      background-size: 100% 100%
      &.people1
        background-image: url('../../assets/img/people1.png')
      &.people2
        background-image: url('../../assets/img/people2.png')
      &.people3
        background-image: url('../../assets/img/people3.png')
</style>
