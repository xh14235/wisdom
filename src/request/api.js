import { get, post } from "./service";
// 处理监控报警
export const handleMonitoring = params => post("livelihood/api/security/warn/handler", params);

// 模拟数据，随机产生数组
export const getTestList = (max, length) => {
  let list = [];
  for (let i = 0; i < length; i++) {
    list.push(Math.floor((Math.random() * (max - max * 0.6)) + (max * 0.6)));
  };
  return list;
};
// 登录 获取token
export const login = params => post("admin/admin/portal/login", params);
// 能源供给
// 获取当天分布式能源和外来电数据折现图数据
export const supHead1 = params => get("energy/api/supply/moment/getForeignAndDistributedEnergy", params);
// 能源供给 能源分布 饼图
export const supHead2 = params => get("energy/api/supply/moment/getDistributedEnergy", params);
// 供热趋势
export const suphotline = params => get("energy/api/supply/moment/getTotalHot", params);
// 供热类型
export const suphotpie = params => get("energy/api/supply/moment/getPartsHot", params);
// 供冷趋势
export const supcoldline = params => get("energy/api/supply/moment/getTotalCold", params);
// 供冷类型
export const supcoldpie = params => get("energy/api/supply/moment/getPartsCold", params);
// 供热水趋势
export const suphotwaterline = params => get("energy/api/supply/moment/getTotalHotWater", params);
// 供热水类型
export const suphotwaterpie = params => get("energy/api/supply/moment/getPartsHotWater", params);
// 能源供给第二个页面 全村域 四个折线图
export const supSecond1 = params => get("energy/api/supply/all/getCube", params);
// 能源供给第三个页面，各魔方数据
export const supThird1 = params => get("energy/api/supply/individual/getCube", params);
// 能源供给第三个页面，储能信息
export const supThird2 = params => get("energy/api/supplyFixed/getCategoryFixed", params);
// 能源供给第四个页面，风力、光伏发电
export const supForth1 = params => get("energy/api/supply/sub/getMicPowerCubeCategory", params);
// 能源消费
// 能源消费第一个页面 折线图
export const conusedline = params => get("energy/api/consumer/getConsumerCurrentDayWithAllType", params);
// 能源消费第一个页面 饼图
export const conusedpie = params => get("energy/api/consumer/getAllTypeAndBuildingFacility", params);
// 能源消费第二个页面 消费分类柱状图
export const consecondbar = params => get("energy/api/consumer/getTypeAndBuildingType", params);
// 能源消费第二个页面 用电排行榜
export const supelectry = params => get("energy/api/consumer/getElectricityTop", params);
// 能源消费第二个页面 用热水排行榜
export const suphotwater = params => get("energy/api/consumer/getHotWaterTop", params);
// 能源消费第二个页面 用冷排行榜
export const supcold = params => get("energy/api/consumer/getColdTop", params);
// 能源消费第二个页面 用热排行榜
export const suphot = params => get("energy/api/consumer/getHotTop", params);
// 能源消费第三个页面 场馆能源消耗对比
export const concomparebuilding = params => get("energy/api/consumer/getConsumerEnergyStatistics", params);
// 能源消费第三个页面 用电组成占比
export const conelectric = params => get("energy/api/consumer/getCurrentDayDifferentElectricity", params);
// 能源分析
// 能源分析第一个页面 雷达图4个
export const anaRadar = params => get("energy/api/consumer/getAllTypeAndBuildingFacility", params);
// 能源分析第一个页面 今年用能异常统计 总用户 总次数
export const anaAbnormalNum = params => get("energy/api/consumerAbnormal/getYearStatistics", params);
// 能源分析第一个页面 用能异常类型 业务调整
export const anaAbnormalType = params => get("energy/api/consumerAbnormal/all/getAbnormalReasonStatistics", params);
// 能源分析第一个页面 用能异常详情列表
export const anaAbnormalList = params => get("energy/api/consumerAbnormal/all/getDetail", params);
// 能源分析第二个页面 昨天今天能源消耗对比
export const anacompareday = params => get("energy/api/consumer/getConsumerEnergyCompared", params);
// 能源分析第一个页面 切换次数 默认第一次显示
export const anaNewestSeq = params => get("energy/api/consumerAbnormal/individual/getDetailByConsumerType", params);
// 能源分析第一个页面 切换次数
export const anaAbnormalSeq = params => get("energy/api/consumerAbnormal/switch", params);
// 设备运维
// 设备运维 各魔方折线图
export const operationCube = params => get("energy/api/supply/moment/individual/currentDay/getByCubeAndFacilityId", params);
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
// 用能优化 高级报告 有功变化、无功变化等
export const optwork = params => get("energy/api/power/getAllTypeBySupplyFacilityId", params);
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
// 生态
// pm2.5 折线图
export const ecologyPM25 = params => get("livelihood/api/ecology/air/currentDay/findPm", params);
// 其他天气最新信息
export const ecologyWeather = params => get("livelihood/api/ecology/air/findByType/lasted", params);
// 水质pH值 折线图
export const ecologyPH = params => get("livelihood/api/ecology/water/currentDay/findPh", params);
// 其他水质数据
export const ecologyWaterQuality = params => get("livelihood/api/ecology/water/findByType/lasted", params);
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
// 文旅
// 按照日期获取游客总数 游客峰值警报
export const culturepeak = params => get("livelihood/api/cultureTour/all/findByHour", params);
// 按照日期获取游客出入数量
export const cultureinout = params => get("livelihood/api/cultureTour/all/findByTypeAndDay", params);
// 获取一月每天游客热力图
export const culturecalendar = params => get("livelihood/api/cultureTour/all/findByTypeAndMonth", params);
// 按照日期获取游客性别年龄统计
export const culturesexage = params => get("livelihood/api/cultureTour/all/findTourInfo", params);
// 产业
// 今年产业销量统计 四个echarts图
export const industryfirst4 = params => get("livelihood/api/industry/findStatistics", params);
// 合作社列表
export const industrycooperative = params => get("livelihood/api/industry/findFacilitySubByTag", params);
// 销售额折线图
export const industrysales = params => get("livelihood/api/industry/findSalesById", params);
// 订单数折线图
export const industryorder = params => get("livelihood/api/industry/findOrderById", params);
// 家居
// 家用能源统计 四个echarts图 电水冷热
export const homeenergy = params => get("livelihood/api/home/findByDateType", params);
// 费用统计 电水冷热
export const homecost = params => get("livelihood/api/home/findPriceByType", params);
// 下拉框
// 获取楼宇类别
export const buildingSelect = params => get("energy/api/bf/findAll", params);
// 根据楼宇类别获取 所有楼宇信息 如 公建下 所有的 xxx馆
export const venueSelect = params => get("energy/api/bf/sub/findAllByFacilityId", params);
// 获取所有供能的区域列表
export const areaSelect = params => get("energy/api/supplyFacility/findAll", params);
// 根据供能区域获取所有cube 信息
export const cubeSelect = params => get("energy/api/cube/findBySupplyFacilityId", params);
// 视频配置
export const videoList = params => get("livelihood/api/security/camera/findAll", params);
