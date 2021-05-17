import { get } from "./service";

// 设备运维
// 设备运维 各魔方折线图
export const operationCube = params => get("energy/api/supply/moment/individual/currentDay/getByCubeAndFacilityId", params);
