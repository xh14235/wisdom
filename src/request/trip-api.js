import { get } from "./service";

// 出行
// 获取道路信息 暂无
export const tripRoad = params => get("livelihood/api/travel/traffic/findAll", params);
// 获取停车位信息
export const tripParking = params => get("livelihood/api/travel/parke/findAll", params);
// 获取充电桩、电动汽车、电动自行车、电动船数量信息 以及智能路灯情况
export const tripElectric = params => get("livelihood/api/travel/device/findCountByType", params);
// 根据场馆获取人数流量排行榜
export const tripPerson = params => get("livelihood/api/travel/flow/findOnlineTop", params);
// 充电桩耗电及智能路灯耗电
export const tripPower = params => get("livelihood/api/travel/device/findSupplyConsumer", params);
