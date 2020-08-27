import { get } from './service'

// 文旅
// 按照日期获取游客总数 游客峰值警报
export const culturepeak = params => get('livelihood/api/cultureTour/all/findByHour', params)
// 按照日期获取游客出入数量
export const cultureinout = params => get('livelihood/api/cultureTour/all/findByTypeAndDay', params)
// 获取一月每天游客热力图
export const culturecalendar = params => get('livelihood/api/cultureTour/all/findByTypeAndMonth', params)
// 按照日期获取游客性别年龄统计
export const culturesexage = params => get('livelihood/api/cultureTour/all/findTourInfo', params)
