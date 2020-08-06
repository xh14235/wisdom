let date = new Date()
// let year = date.getMonth() + 1
// let month = date.getDate()
// let day = date.getHours()
let NowYear = date.getFullYear()
let Nowmonth = date.getMonth() + 1
let year = 12
let month = 0
if (Nowmonth === 1 || Nowmonth === 3 || Nowmonth === 5 || Nowmonth === 7 || Nowmonth === 8 || Nowmonth === 10 || Nowmonth === 12) {
  month = 31
} else if (Nowmonth === 4 || Nowmonth === 6 || Nowmonth === 9 || Nowmonth === 11) {
  month = 30
} else {
  if ((NowYear % 4 === 0 && NowYear % 100 !== 0) || NowYear % 400 === 0) {
    month = 28
  } else {
    month = 29
  }
}
let day = 24
let yearList = []
let monthList = []
let dayList = []
let defaultDay = []
for (let i = 0; i < year; i++) {
  yearList.push(i + 1)
}
for (let i = 0; i < month; i++) {
  monthList.push(i + 1)
}
for (let i = 0; i < day; i++) {
  dayList.push(i + 1)
}
for (let i = 0; i < 24; i++) {
  defaultDay.push(i + 1)
}

const lists = {
  // 数组
  state: {
    year: yearList,
    month: monthList,
    day: dayList,
    defaultDay: defaultDay,
    // 场馆
    venue: [
      {
        id: '1254300251431186436',
        title: '能源管'
      }
    ]
  }
}

export default lists
