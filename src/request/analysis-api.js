import { get } from './service'

// 能源分析
// 能源分析第一个页面 雷达图4个
export const anaRadar = params => get('energy/api/consumer/getAllTypeAndBuildingFacility', params)
// 能源分析第一个页面 今年用能异常统计 总用户 总次数
export const anaAbnormalNum = params => get('energy/api/consumerAbnormal/getYearStatistics', params)
// 能源分析第一个页面 用能异常类型 业务调整
export const anaAbnormalType = params => get('energy/api/consumerAbnormal/all/getAbnormalReasonStatistics', params)
// 能源分析第一个页面 用能异常详情列表
export const anaAbnormalList = params => get('energy/api/consumerAbnormal/all/getDetail', params)
// 能源分析第二个页面 昨天今天能源消耗对比
export const anacompareday = params => get('energy/api/consumer/getConsumerEnergyCompared', params)
// 能源分析第一个页面 切换次数 默认第一次显示
export const anaNewestSeq = params => get('energy/api/consumerAbnormal/individual/getDetailByConsumerType', params)
// 能源分析第一个页面 切换次数
export const anaAbnormalSeq = params => get('energy/api/consumerAbnormal/switch', params)
