import { get } from './service'

// 生态
// pm2.5 折线图
export const ecologyPM25 = params => get('livelihood/api/ecology/air/currentDay/findPm', params)
// 其他天气最新信息
export const ecologyWeather = params => get('livelihood/api/ecology/air/findByType/lasted', params)
// 水质pH值 折线图
export const ecologyPH = params => get('livelihood/api/ecology/water/currentDay/findPh', params)
// 其他水质数据
export const ecologyWaterQuality = params => get('livelihood/api/ecology/water/findByType/lasted', params)
