let date = new Date()
let year = date.getMonth() + 1
let month = date.getDate()
let day = date.getHours()
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
