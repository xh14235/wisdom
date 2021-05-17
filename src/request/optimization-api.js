import { get } from "./service";

// 用能优化
// 用能优化 能源消耗分析 初级报告&高级报告
export const optenergy = params => get("energy/api/consumer/getConsumerEnergyStatistics", params);
// 用能优化 初级报告&高级报告 能源水电冷儿统计图
export const optechartsenergy = params => get("energy/consumer/detail/dateType/getEnergyAllTypeByBuilding", params);
// 用能优化 初级报告 产能效率echarts图
export const optefficiency = params => get("energy/api/produceEff/getComparedByDateType", params);
// 用能优化 初级报告 节能减排记录
export const optsave = params => get("energy/api/optimization/getConservation", params);
// 用能优化 初级报告&高级报告 能源价格
export const optprice = params => get("energy/api/optimization/getPrice", params);
// 用能优化 高级报告 有功变化、无功变化等;
export const optwork = params => get("energy/api/power/getAllTypeBySupplyFacilityId", params);
