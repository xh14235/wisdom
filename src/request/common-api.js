import { post } from './service'

// 模拟数据，随机产生数组
export const getTestList = (max, length) => {
  let list = []
  for (let i = 0; i < length; i++) {
    list.push(Math.floor((Math.random() * (max - max * 0.6)) + (max * 0.6)))
  }
  return list
}
// 登录 获取token
export const login = params => post('sso/pub/login', params)
// 获取地图中心点
export const getCentrePoint = params => {
  let maxA = 0
  let maxB = 0
  for (let i = 0; i < params.length; i++) {
    maxA += Number(params[i].Longitude)
    maxB += Number(params[i].Latitude)
  }
  let x = (maxA / params.length).toFixed(4)
  let y = (maxB / params.length).toFixed(5)
  return {
    x,
    y
  }
}
