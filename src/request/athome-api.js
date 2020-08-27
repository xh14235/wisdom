import { get } from './service'

// 家居
// 家用能源统计 四个echarts图 电水冷热
export const homeenergy = params => get('livelihood/api/home/findByDateType', params)
// 费用统计 电水冷热
export const homecost = params => get('livelihood/api/home/findPriceByType', params)
