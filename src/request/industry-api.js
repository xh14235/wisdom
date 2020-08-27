import { get } from './service'

// 产业
// 今年产业销量统计 四个echarts图
export const industryfirst4 = params => get('livelihood/api/industry/findStatistics', params)
// 合作社列表
export const industrycooperative = params => get('livelihood/api/industry/findFacilitySubByTag', params)
// 销售额折线图
export const industrysales = params => get('livelihood/api/industry/findSalesById', params)
// 订单数折线图
export const industryorder = params => get('livelihood/api/industry/findOrderById', params)
