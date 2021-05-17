import { get } from "./service";

// 能源交易
// 能源交易 全村域 外来电消耗
export const tranallfirst = params => get("energy/api/business/All/getForeignElectricity", params);
// 能源交易 全村域 能源供给 电
export const tranallelectric = params => get("energy/api/business/All/getElectricity", params);
// 能源交易 全村域 能源供给 热水
export const tranallhotwater = params => get("energy/api/business/All/getHotWater", params);
// 能源交易 全村域 能源供给 冷
export const tranallcold = params => get("energy/api/business/All/getCold", params);
// 能源交易 全村域 能源供给 热
export const tranallhot = params => get("energy/api/business/All/getHot", params);
// 能源交易 全村域 收入支出统计
export const tranallcost = params => get("energy/api/business/all/getGrandTotalPrice", params);
// 能源交易 个体数据 外来电消耗
export const transinglefirst = params => get("energy/api/business/individual/getForeignElectricity", params);
// 能源交易 个体数据 能源供给 电
export const transingleelectric = params => get("energy/api/business/individual/getElectricity", params);
// 能源交易 个体数据 能源供给 热水
export const transinglehotwater = params => get("energy/api/business/individual/getHotWater", params);
// 能源交易 个体数据 能源供给 冷
export const transinglecold = params => get("energy/api/business/individual/getCold", params);
// 能源交易 个体数据 能源供给 热
export const transinglehot = params => get("energy/api/business/individual/getHot", params);
// 能源交易 个体数据 收入支出统计
export const transinglecost = params => get("energy/api/business/individual/getGrandTotalPrice", params);
