import { get } from './service'

// 能源消费
// 能源消费第一个页面 折线图
export const conusedline = params => get('energy/api/consumer/getConsumerCurrentDayWithAllType', params)
// 能源消费第一个页面 饼图
export const conusedpie = params => get('energy/api/consumer/getAllTypeAndBuildingFacility', params)
// 能源消费第二个页面 消费分类柱状图
export const consecondbar = params => get('energy/api/consumer/getTypeAndBuildingType', params)
// 能源消费第二个页面 用电排行榜
export const supelectry = params => get('energy/api/consumer/getElectricityTop', params)
// 能源消费第二个页面 用热水排行榜
export const suphotwater = params => get('energy/api/consumer/getHotWaterTop', params)
// 能源消费第二个页面 用冷排行榜
export const supcold = params => get('energy/api/consumer/getColdTop', params)
// 能源消费第二个页面 用热排行榜
export const suphot = params => get('energy/api/consumer/getHotTop', params)
// 能源消费第三个页面 场馆能源消耗对比
export const concomparebuilding = params => get('energy/api/consumer/getConsumerEnergyStatistics', params)
// 能源消费第三个页面 用电组成占比
export const conelectric = params => get('energy/api/consumer/getCurrentDayDifferentElectricity', params)
