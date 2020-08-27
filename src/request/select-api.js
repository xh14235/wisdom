import { get } from './service'

// 下拉框
// 获取楼宇类别
export const buildingSelect = params => get('energy/api/bf/findAll', params)
// 根据楼宇类别获取 所有楼宇信息 如 公建下 所有的 xxx馆
export const venueSelect = params => get('energy/api/bf/sub/findAllByFacilityId', params)
// 获取所有供能的区域列表
export const areaSelect = params => get('energy/api/supplyFacility/findAll', params)
// 根据供能区域获取所有cube 信息
export const cubeSelect = params => get('energy/api/cube/findBySupplyFacilityId', params)
// 视频配置
export const videoList = params => get('livelihood/api/security/camera/findAll', params)
