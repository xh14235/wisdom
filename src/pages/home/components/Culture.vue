<template>
  <div class="culture-wrapper">
    <div class="common-title">
      <div>游客人数监测</div>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <Eline v-if="peoplePeakEcharts.id" :lineData="peoplePeakEcharts"></Eline>
      </div>
      <div class="common-echarts-box">
        <div class="today-tourist">
          <div class="today-tourist-box" v-for="(item, index) of todayTourist" :key="item.id">
            <div class="today-tourist-title">
              <img :src="item.imgUrl" alt="">{{item.title}}
            </div>
            <div class="today-tourist-detail">
              <div class="today-tourist-left">
                <b :class="{'leave': index === 1}">{{parseFloat(item.num).toLocaleString()}}</b>人
              </div>
              <div class="today-tourist-right">
                <p>2小时增长</p>
                <p class="today-percent">
                  {{item.percent}}%
                  <img v-if="item.percent >= 0" src="../../../assets/img/tourist-add.png" alt="">
                  <img v-else src="../../../assets/img/tourist-reduce.png" alt="">
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="common-title">
      <div>游客人数统计</div>
    </div>
    <div class="select-wrapper">
      <p class="chosenDate" @click.stop="ShowCalendar()">{{formatTime}}</p>
    </div>
    <div class="calendar-wrapper" v-show="calendarShow && selectListShow">
      <el-calendar v-model="calendarDate"></el-calendar>
    </div>
    <div class="common-echarts-wrapper">
      <div class="common-echarts-box">
        <div class="title2">游客信息分析</div>
        <Statistics2 v-if="sexData.length" :statistics="sexData"></Statistics2>
        <div class="age-wrapper">
          <div class="age-all">游客总数：<b>{{parseFloat(ageData.all).toLocaleString()}}</b>人</div>
          <div class="age-detail">
            <div class="age-box" v-for="(item, index) of ageData.list" :key="item.id">
              <span class="age-title" :class="{'age-green': index % 2 === 0, 'age-yellow': index % 2 === 1}">{{item.title}}：</span>
              <span class="age-num">{{item.num}}%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="common-echarts-box">
        <div class="title2">游客人数热力图</div>
        <div class="calendar-box">
          <Calendar :month="formatTime"></Calendar>
        </div>
      </div>
      <div class="common-echarts-box other-box">
        <div class="title2">游客人数分布</div>
        <div class="sort-box">
          <div class="sort-circle">
            <img class="sort-outer rotate" src="../../../assets/img/statistics-rotate.png" alt="">
            <img class="sort-inner" src="../../../assets/img/tourist-icon.png" alt="">
          </div>
          <div class="sort-right">
            <div class="sort-detail" v-for="(item, index) of buildingTourist" :key="item.id">
              <div class="sort-title">
                <p>{{item.building}}</p>
                <img :src="require('../../../assets/img/tourist-line' + (index + 1) + '.png')" alt="">
              </div>
              <div class="sort-num"><b>{{item.num}}</b>人</div>
            </div>
          </div>
        </div>
      </div>
      <div class="common-echarts-box other-box">
        <div class="title2">民宿人数TOP3 <span>(人)</span></div>
        <div class="ranking-box">
          <Ranking :list="ranking1"></Ranking>
        </div>
      </div>
      <div class="common-echarts-box other-box">
        <div class="title2">公建人数TOP3 <span>(人)</span></div>
        <div class="ranking-box">
          <Ranking :list="ranking2"></Ranking>
        </div>
      </div>
      <div class="common-echarts-box other-box">
        <div class="title2">产业人数TOP3 <span>(人)</span></div>
        <div class="ranking-box">
          <Ranking :list="ranking3"></Ranking>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import img1 from '@/assets/img/tourist-arrive.png'
import img2 from '@/assets/img/tourist-leave.png'
import { mapState, mapMutations } from 'vuex'
// import { culturepeak, culturesexage, culturecalendar } from '@/request/api'
import { culturepeak, cultureinout, culturecalendar, culturesexage } from '@/request/api'
export default {
  name: 'Culture',
  components: {
    Eline: () => import('@/common/echarts/Eline'),
    Ranking: () => import('@/common/components/Ranking'),
    Statistics2: () => import('@/common/components/Statistics2'),
    Calendar: () => import('@/common/components/Calendar')
  },
  data () {
    return {
      peoplePeakEcharts: {},
      todayTourist: [],
      sexData: [],
      ageData: {},
      calendar: [],
      buildingTourist: [],
      ranking1: [],
      ranking2: [],
      ranking3: [],
      yearList: [],
      monthList: [],
      dayList: [],
      calendarDate: new Date(),
      calendarShow: false,
      cultureTimer: null,
      duration: 60000
    }
  },
  computed: {
    ...mapState({
      year: state => state.lists.year,
      month: state => state.lists.month,
      day: state => state.lists.day,
      green: state => state.color.green,
      blue: state => state.color.blue,
      yellow: state => state.color.yellow,
      bgreen: state => state.color.bgreen,
      red: state => state.color.red,
      selectListShow: state => state.selectListShow
    }),
    formatTime () {
      let year = this.calendarDate.getFullYear()
      let month = this.calendarDate.getMonth() + 1
      if (month < 10) month = '0' + month
      let day = this.calendarDate.getDate()
      if (day < 10) day = '0' + day
      return year + '-' + month + '-' + day
    }
  },
  watch: {
    formatTime () {
      this.calendarShow = false
      this.getSexAgeData()
      this.getRanking()
      this.getTouristByBuilding()
      // this.getCalendar()
    },
    selectListShow () {
      if (this.selectListShow === false) {
        this.calendarShow = false
      }
    }
  },
  methods: {
    // 获取人流量峰值 数据
    getPeoplePeak () {
      // let date = new Date()
      // let year = date.getFullYear()
      // let month = date.getMonth() + 1
      // if (month < 10) month = '0' + month
      // let day = date.getDate() + 1
      // if (day < 10) day = '0' + day
      // let time = year + '-' + month + '-' + day
      culturepeak({
        date: this.formatTime
      }).then((res) => {
        this.peoplePeakEcharts = {
          id: 'culline12',
          title: '今日游客峰值警报',
          legendShow: false,
          markLine: true,
          legendData: ['储能'],
          color: [this.green],
          areaColor: true,
          smooth: true,
          yName: '(人)',
          xData: this.day,
          data: [Object.values(res.data).slice(0, this.day.length)]
        }
      })
    },
    // 当天游客人数统计 数据
    getTodayTourist () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      if (month < 10) month = '0' + month
      let day = date.getDate()
      if (day < 10) day = '0' + day
      let hour = date.getHours()
      if (hour < 10) hour = '0' + hour
      let minute = date.getMinutes()
      if (minute < 10) minute = '0' + minute
      let second = date.getSeconds()
      if (second < 10) second = '0' + second
      let dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      cultureinout({
        dateTime: dateTime
      }).then((res) => {
        let data = res.data
        let percentEnter = (data.ENTER - data.OLD_ENTER) * 100 / (data.OLD_ENTER !== 0 ? data.OLD_ENTER : 1)
        let percentOut = (data.OUT - data.OLD_OUT) * 100 / (data.OLD_OUT !== 0 ? data.OLD_OUT : 1)
        this.todayTourist = [
          {
            id: '001',
            title: '今日到达',
            imgUrl: img1,
            num: data.ENTER,
            percent: percentEnter
          },
          {
            id: '002',
            title: '今日离开',
            imgUrl: img2,
            num: data.OUT,
            percent: percentOut
          }
        ]
      })
    },
    // 获取日历数据
    getCalendar () {
      culturecalendar({
        date: this.formatTime
      }).then((res) => {
        let data = Object.values(res.data)
        this.calendar = []
        for (let i = 0; i < data.length; i++) {
          this.calendar.push({
            id: '00' + (i + 1),
            date: i + 1,
            num: data[i]
          })
        }
        // console.log(this.calendar)
      })
    },
    random (max) {
      return Math.floor(Math.random() * max)
    },
    // 获取游客人数分布 按建筑 数据
    getTouristByBuilding () {
      this.buildingTourist = [
        {
          id: '01',
          building: '民宿',
          num: 180
        },
        {
          id: '02',
          building: '共建',
          num: 120
        },
        {
          id: '03',
          building: '产业',
          num: 59
        }
      ]
    },
    // 获取排行榜 数据
    getRanking () {
      this.ranking1 = [
        {
          id: '001',
          buildingFacilitySubName: '912陶艺馆',
          value: 120
        },
        {
          id: '002',
          buildingFacilitySubName: '913彩釉馆',
          value: 100
        },
        {
          id: '003',
          buildingFacilitySubName: '914彩绘馆',
          value: 88
        }
      ]
      this.ranking2 = [
        {
          id: '001',
          buildingFacilitySubName: '936能源馆',
          value: 126
        },
        {
          id: '002',
          buildingFacilitySubName: '活动广场',
          value: 70
        },
        {
          id: '003',
          buildingFacilitySubName: '村委',
          value: 46
        }
      ]
      this.ranking3 = [
        {
          id: '001',
          buildingFacilitySubName: '玫瑰工坊',
          value: 166
        },
        {
          id: '002',
          buildingFacilitySubName: '绿泥瓜果',
          value: 120
        },
        {
          id: '003',
          buildingFacilitySubName: '果蔬',
          value: 90
        }
      ]
    },
    // 获取游客性别年龄统计 数据
    getSexAgeData () {
      // let date = new Date()
      // let year = date.getFullYear()
      // let month = date.getMonth() + 1
      // if (month < 10) month = '0' + month
      // let day = date.getDate() + 1
      // if (day < 10) day = '0' + day
      // let time = year + '-' + month + '-' + day
      culturesexage({
        date: this.formatTime
      }).then((res) => {
        let data = res.data
        let all = data.boy + data.girl
        if (all === 0) all = 1
        this.sexData = [
          {
            title: '男女比例',
            name: '男性占比',
            num: parseInt(data.boy / all),
            unit: '%',
            imgUrl: require('../../../assets/img/boy.png')
          },
          {
            title: '男女比例',
            name: '女性占比',
            num: parseInt(data.girl / all),
            unit: '%',
            imgUrl: require('../../../assets/img/girl.png')
          }
        ]
        this.ageData = {
          all: data.one + data.two + data.three + data.four,
          list: [
            {
              id: '01',
              title: '20岁以下',
              num: data.one
            },
            {
              id: '02',
              title: '21-25岁',
              num: data.two
            },
            {
              id: '03',
              title: '26-30岁',
              num: data.three
            },
            {
              id: '04',
              title: '30岁以上',
              num: data.four
            }
          ]
        }
      })
    },
    // 显示日历选择器 数据
    ShowCalendar () {
      this.calendarShow = !this.calendarShow
      this.showSelectList()
    },
    ...mapMutations(['showSelectList'])
  },
  mounted () {
    this.getPeoplePeak()
    this.getTodayTourist()
    this.getSexAgeData()
    this.getTouristByBuilding()
    this.getRanking()
    if (this.cultureTimer) clearInterval(this.cultureTimer)
    this.cultureTimer = setInterval(() => {
      this.getPeoplePeak()
      this.getTodayTourist()
      this.getSexAgeData()
      this.getTouristByBuilding()
      this.getRanking()
    }, this.duration)
  },
  // 页面切换时，停止或重启定时器
  deactivated () {
    clearInterval(this.cultureTimer)
    this.cultureTimer = null
  },
  activated () {
    if (this.cultureTimer) clearInterval(this.sucultureTimerptimer)
    this.cultureTimer = setInterval(() => {
      this.getPeoplePeak()
      this.getTodayTourist()
      this.getSexAgeData()
      this.getTouristByBuilding()
      this.getRanking()
    }, this.duration)
  },
  beforeDestroy () {
    clearInterval(this.cultureTimer)
    this.cultureTimer = null
  }
}
</script>

<style scoped lang="stylus">
@import '~@/assets/css/common.styl'
.culture-wrapper >>> .title2
  font-size: 18px
  font-weight: 600
  color: $lgreen
  height: 3vh
  display: flex
  justify-content: space-between
  align-items: top
  @media screen and (max-width: 1920px) {
    font-size: 14px
  }
  span
    font-size: 14px
    @media screen and (max-width: 1920px)
      font-size: 12px
.culture-wrapper >>> .el-calendar
  background: #286846
.culture-wrapper >>> .el-calendar__title
  color: #fff
.culture-wrapper >>> .el-calendar__body th
  color: #fff
.culture-wrapper >>> .el-calendar-table td.is-selected
  background-color: rgba(255,255,255,.3)
.culture-wrapper >>> .el-calendar-table .el-calendar-day
  height: 4vh
  line-height: 4vh
  text-align: center
  padding: 0
.culture-wrapper >>> .el-button
  background: #286846
  font-size: 12px
  padding: 3px 5px
.culture-wrapper >>> .el-button:focus, .el-button:hover
  background-color: rgba(255,255,255,.3)
.culture-wrapper
  position: relative
  .select-wrapper
    position: absolute
    top: 29vh
    right: 0
    display: flex
    align-items: center
    .select-box
      width: 3vw
    .chosenDate
      width: 5vw
      height: 2.33333vh
      line-height: 2vh
      border: 1px solid #4acc81
      border-radius: 3px
      text-indent: 5px
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
  .calendar-wrapper
    position: absolute
    top: 32vh
    right: 0
    width: 15vw
    // height: 25vh
    z-index: 1
  .common-echarts-wrapper
    margin-top: 2vh
    .common-echarts-box
      height: 24vh
      .age-wrapper
        .age-all
          height: 4vh
          line-height: 4vh
          text-align: center
          margin-top: 2vh
        .age-detail
          display: flex
          flex-wrap: wrap
          .age-box
            height: 3vh
            line-height: 3vh
            flex: 0 0 50%
            width: 50%
            text-align: center
            background: rgba(69,80,74,.5)
            .age-title
              font-size: 14px
              @media screen and (max-width: 1920px)
                font-size: 12px
              &.age-green
                color: $green
              &.age-yellow
                color: $yellow
      .today-tourist
        display: flex
        flex-direction: column
        justify-content: space-between
        height: 22vh
        .today-tourist-box
          border: 1px solid rgba(69,80,74,1)
          padding: 1.5vh 0.7vw
          .today-tourist-title
            font-size: 18px
            font-weight: 600
            margin-bottom: 2vh
            color: $lgreen
            @media screen and (max-width: 1920px)
              font-size: 14px
            img
              margin-right: 8px
          .today-tourist-detail
            display: flex
            justify-content: space-between
            align-items: flex-end
            .today-tourist-left
              color: $lgreen
              b
                font-size: 24px
                color: $green
                @media screen and (max-width: 1920px)
                  font-size: 18px
                &.leave
                  color: $yellow
            .today-tourist-right
              text-align: right
              p:nth-child(1)
                font-size: 12px
                color: $lgreen
      .calendar-box
        height: 20vh
      &.other-box
        height: 12vh
        margin-top: 2vh
        .sort-box
          display: flex
          justify-content: space-between
          align-items: center
          height: 9vh
          .sort-circle
            flex: 0 0 5.75vh
            width: 5.75vh
            height: 5.75vh
            position: relative
            .sort-outer
              position: absolute
              top: 0
              left: 0
              width: 5.75vh
              height: 5.75vh
            .sort-inner
              position: absolute
              top: 50%
              left: 50%
              width: 2.25vh
              height: 2.25vh
              transform: translate(-1.125vh, -1.125vh)
          .sort-right
            flex: 0 0 7vw
            width: 7vw
            height: 9vh
            display: flex
            flex-direction: column
            justify-content: space-between
            align-items: center
            .sort-detail
              width: 100%
              height: 3vh
              display: flex
              justify-content: space-between
              align-items: center
              @media screen and (max-width: 1920px)
                width: 80%
              .sort-title
                height: 2vh
                p
                  text-align: right
                  padding-right: 8px
                img
                  vertical-align: top
                  width: 76px
                  @media screen and (max-width: 1920px)
                    width: 50px
              .sort-num
                b
                  font-size: 18px
                  @media screen and (max-width: 1920px)
                    font-size: 14px
                  color: $yellow
              &:nth-child(3)
                .sort-title
                  img
                    position: relative
                    top: -10px
</style>
