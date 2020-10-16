import { get } from './service'

// 摄像头列表
export const videoList = params => get('livelihood/api/security/camera/findAll', params)

// 异常监控列表
export const abnormalList = params => get('livelihood/api/security/warn/findAll', params)
