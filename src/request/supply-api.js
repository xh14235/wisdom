import { get } from './service'

// 能源供给
// 获取当天分布式能源和外来电数据折现图数据
export const supHead1 = params => get('energy/api/supply/moment/getForeignAndDistributedEnergy', params)
// 能源供给 能源分布 饼图
export const supHead2 = params => get('energy/api/supply/moment/getDistributedEnergy', params)
// 供热趋势
export const suphotline = params => get('energy/api/supply/moment/getTotalHot', params)
// 供热类型
export const suphotpie = params => get('energy/api/supply/moment/getPartsHot', params)
// 供冷趋势
export const supcoldline = params => get('energy/api/supply/moment/getTotalCold', params)
// 供冷类型
export const supcoldpie = params => get('energy/api/supply/moment/getPartsCold', params)
// 供热水趋势
export const suphotwaterline = params => get('energy/api/supply/moment/getTotalHotWater', params)
// 供热水类型
export const suphotwaterpie = params => get('energy/api/supply/moment/getPartsHotWater', params)
// 能源供给第二个页面 全村域 四个折线图
export const supSecond1 = params => get('energy/api/supply/all/getCube', params)
// 能源供给第三个页面，各魔方数据
export const supThird1 = params => get('energy/api/supply/individual/getCube', params)
// 能源供给第三个页面，储能信息
export const supThird2 = params => get('energy/api/supplyFixed/getCategoryFixed', params)
// 能源供给第四个页面，风力、光伏发电
export const supForth1 = params => get('energy/api/supply/sub/getMicPowerCubeCategory', params)
