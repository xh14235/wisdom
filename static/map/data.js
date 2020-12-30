//用于场景切换的各场景中心点数据
var sceneCenterConfig = {
    "security":{ //民生-安防
      "Distance": "1.953",
      "PosX": "121.6851",
      "PosY": "31.08717",
      "Time": 1,
      "X": "184.1298",
      "Y": "54.2352"
    },
    "ecology":{ //民生-生态
      "Distance": "1.334",
      "PosX": "121.685",
      "PosY": "31.087",
      "Time": 1,
      "X": "184.9076",
      "Y": "55.99997"
    },
    "realWatching":{ //民生-出行-实时监控数据
      "Distance": "2.269915",
      "PosX": "121.686",
      "PosY": "31.08741",
      "Time": 1,
      "X": "167.3296",
      "Y": "62.40002"
    },
    "deviceUse":{ //民生-出行-设备使用情况
      "Distance": "2.669461",
      "PosX": "121.6855",
      "PosY": "31.08853",
      "Time": 1,
      "X": "170.1296",
      "Y": "60.4"
    },
    "culturalTourism":{ //民生-文旅
      "Distance": "1.584133",
      "PosX": "121.685",
      "PosY": "31.08715",
      "Time": 1,
      "X": "170.9295",
      "Y": "47.59999"
    },
    "industry":{ //民生-产业
      "Distance": "3.258",
      "PosX": "121.6847",
      "PosY": "31.08871",
      "Time": 1,
      "X": "167.3296",
      "Y": "45"
    },
    "homeFurnishing":{ //民生-家居
      "Distance": "0.63",
      "PosX": "121.6849",
      "PosY": "31.08726",
      "Time": 1,
      "X": "116.5296",
      "Y": "45"
    },
    "Hours24":{ //能源-运行监控-能源供给-24小时监测
      "Distance": "0.8",
      "PosX": "121.685",
      "PosY": "31.08711",
      "Time": 1,
      "X": "35.3296",
      "Y": "41.19995"
    },
    "villagePower":{ //能源-运行监控-能源供给-全村域能源
      "Distance": "0.8",
      "PosX": "121.685",
      "PosY": "31.08711",
      "Time": 1,
      "X": "35.3296",
      "Y": "41.19995"
    },
    "PowerCenter936":{ //能源-运行监控-能源供给-936能源中心
      "Distance": "0.4",
      "PosX": "121.6851",
      "PosY": "31.0874",
      "Time": 1,
      "X": "210.9296",
      "Y": "42.8"
    },
    "PowerItem936":{ //能源-运行监控-能源供给-936能源个体
      "Distance": "1.215418",
      "PosX": "121.6851",
      "PosY": "31.08713",
      "Time": 1,
      "X": "-141.8924",
      "Y": "46.80001"
    },
    "Watching24":{ //能源-运行监控-能源消费-24小时监测
      "Distance": "1.49341",
      "PosX": "121.6849",
      "PosY": "31.08766",
      "Time": 1,
      "X": "-152.6925",
      "Y": "53.2"
    },
    "consumeItem":{ //根据前端选中的点的数据，确定中心点，以及打点的数据
      "Distance": "0.9166733",
      "PosX": "121.6908",
      "PosY": "31.09105",
      "Time": 1,
      "X": "-162.2925",
      "Y": "50.8"
    },
    "powerAnalysis":{ //根据前端选中的点的数据，确定中心点，以及打点的数据
      "Distance": "1.49341",
      "PosX": "121.6849",
      "PosY": "31.08766",
      "Time": 1,
      "X": "-152.6925",
      "Y": "53.2"
    },
    "pwoerCompare":{ //中心点位置需要实现确定，即备选的几个点需要实现确定，不能实时任意选择对比
      "Distance": "0.9166733",
      "PosX": "121.6908",
      "PosY": "31.09105",
      "Time": 1,
      "X": "-162.2925",
      "Y": "50.8"
    },
    "allVillage":{ //能源-设备运维-全村域
      "Distance": "1.599887",
      "PosX": "121.6842",
      "PosY": "31.0873",
      "Time": 1,
      "X": "-246.6704",
      "Y": "37.60001"
    },
    "distributedPower":{ //能源-设备运维-分布式能源
      "Distance": "0.4",
      "PosX": "121.6851",
      "PosY": "31.08737",
      "Time": 1,
      "X": "210.9296",
      "Y": "42.8"
    },
    "seniorAnalysis":{ //根据前端选中的点的数据，确定中心点，以及打点的数据
      "Distance": "0.9166733",
      "PosX": "121.6908",
      "PosY": "31.09105",
      "Time": 1,
      "X": "-162.2925",
      "Y": "50.8"
    },
    "powerDeal":{ //能源-能源交易-全村域
      "Distance": "0.4",
      "PosX": "121.6851",
      "PosY": "31.08737",
      "Time": 1,
      "X": "210.9296",
      "Y": "42.8"
    },
    "itemData":{ //能源-能源交易-个体数据
      "Distance": "0.4",
      "PosX": "121.6851",
      "PosY": "31.08737",
      "Time": 1,
      "X": "210.9296",
      "Y": "42.8"
    }
  }


//各场景下的打点数据
  var markConfig = {
    "security":[
      { 
        "Height": "0.01",
        "Id": "0",
        "Latitude": "31.08923",
        "Longitude": "121.6832",
        "Type": "监控",
        "Value": "",
        "Name": "监控2",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "1",
        "Latitude": "31.08718",
        "Longitude": "121.6838",
        "Type": "监控",
        "Value": "",
        "Name": "监控3",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "2",
        "Latitude": "31.09093",
        "Longitude": "121.6848",
        "Type": "监控",
        "Value": "",
        "Name": "监控6",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "3",
        "Latitude": "31.08739",
        "Longitude": "121.685",
        "Type": "监控",
        "Value": "",
        "Name": "监控1",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "4",
        "Latitude": "31.08551",
        "Longitude": "121.6843",
        "Type": "监控",
        "Value": "",
        "Name": "监控4",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "5",
        "Latitude": "31.0927",
        "Longitude": "121.6802",
        "Type": "监控",
        "Value": "",
        "Name": "监控8",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "6",
        "Latitude": "31.08952",
        "Longitude": "121.6865",
        "Type": "监控",
        "Value": "",
        "Name": "监控5",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "7",
        "Latitude": "31.09089",
        "Longitude": "121.6909",
        "Type": "监控",
        "Value": "",
        "Name": "监控7",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "8",
        "Latitude": "31.08941",
        "Longitude": "121.6953",
        "Type": "监控",
        "Value": "",
        "Name": "监控9",
        "Other": []
      }
    ],
    "ecology": [
      { 
        "Height": "0.01",
        "Id": "9",
        "Latitude": "31.08665",
        "Longitude": "121.685",
        "Type": "垃圾回收中心",
        "Value": "",
        "Name": "垃圾回收中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "10",
        "Latitude": "31.08714",
        "Longitude": "121.6848",
        "Type": "水质监测点",
        "Value": "",
        "Name": "水质检测点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "11",
        "Latitude": "31.08712",
        "Longitude": "121.6852",
        "Type": "空气监测点",
        "Value": "",
        "Name": "空气监测点",
        "Other": []
      }
    ],
    "realWatching": [
      { 
        "Height": "0.01",
        "Id": "12",
        "Latitude": "31.08665",
        "Longitude": "121.6866",
        "Type": "停车位",
        "Value": "",
        "Name": "绿妮水果停车场",
        "Other": [{"Key":"总车位数","Value":"20"},{"Key":"剩余车位数","Value":"18"}]
      },
      { 
        "Height": "0.01",
        "Id": "13",
        "Latitude": "31.08739",
        "Longitude": "121.6848",
        "Type": "停车位",
        "Value": "",
        "Name": "936能源馆停车场",
        "Other": [{"Key":"总车位数","Value":"10"},{"Key":"剩余车位数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "14",
        "Latitude": "31.08815",
        "Longitude": "121.686",
        "Type": "停车位",
        "Value": "",
        "Name": "玫瑰工坊停车场",
        "Other": [{"Key":"总车位数","Value":"10"},{"Key":"剩余车位数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "15",
        "Latitude": "31.08972",
        "Longitude": "121.6862",
        "Type": "停车位",
        "Value": "",
        "Name": "网红打卡点停车场",
        "Other": [{"Key":"总车位数","Value":"10"},{"Key":"剩余车位数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "16",
        "Latitude": "31.09031",
        "Longitude": "121.69",
        "Type": "停车位",
        "Value": "",
        "Name": "乡村会客厅停车场",
        "Other": [{"Key":"总车位数","Value":"10"},{"Key":"剩余车位数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "17",
        "Latitude": "31.09291",
        "Longitude": "121.6801",
        "Type": "停车位",
        "Value": "",
        "Name": "村委停车场",
        "Other": [{"Key":"总车位数","Value":"10"},{"Key":"剩余车位数","Value":"8"}]
      }
    ],
    "deviceUse":[
      { 
        "Height": "0.01",
        "Id": "18",
        "Latitude": "31.08746",
        "Longitude": "121.6849",
        "Type": "充电桩",
        "Value": "",
        "Name": "充电桩",
        "Other": [{"Key":"总数","Value":"10"},{"Key":"剩余数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "19",
        "Latitude": "31.0906",
        "Longitude": "121.6856",
        "Type": "电动旅游船",
        "Value": "",
        "Name": "电动旅游船",
        "Other": [{"Key":"总数","Value":"10"},{"Key":"剩余数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "20",
        "Latitude": "31.08775",
        "Longitude": "121.6865",
        "Type": "电动汽车",
        "Value": "",
        "Name": "电动汽车",
        "Other": [{"Key":"总数","Value":"10"},{"Key":"剩余数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "21",
        "Latitude": "31.08929",
        "Longitude": "121.6858",
        "Type": "电动自行车",
        "Value": "",
        "Name": "电动自行车",
        "Other": [{"Key":"总数","Value":"10"},{"Key":"剩余数","Value":"8"}]
      }
    ],
    "culturalTourism": [
      { 
        "Height": "0.01",
        "Id": "22",
        "Latitude": "31.09636",
        "Longitude": "121.6947",
        "Type": "民宿",
        "Value": "130人",
        "Name": "291稻香馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "23",
        "Latitude": "31.09108",
        "Longitude": "121.6907",
        "Type": "民宿",
        "Value": "130人",
        "Name": "烘培馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "24",
        "Latitude": "31.09139",
        "Longitude": "121.6912",
        "Type": "民宿",
        "Value": "130人",
        "Name": "甜蜜馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "25",
        "Latitude": "31.09636",
        "Longitude": "121.6947",
        "Type": "民宿",
        "Value": "130人",
        "Name": "310稻香馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "26",
        "Latitude": "31.09575",
        "Longitude": "121.6949",
        "Type": "民宿",
        "Value": "130人",
        "Name": "304纯真年代",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "27",
        "Latitude": "31.0883",
        "Longitude": "121.6838",
        "Type": "民宿",
        "Value": "130人",
        "Name": "912陶艺馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "28",
        "Latitude": "31.08834",
        "Longitude": "121.6841",
        "Type": "民宿",
        "Value": "130人",
        "Name": "913彩釉馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "29",
        "Latitude": "31.08836",
        "Longitude": "121.6846",
        "Type": "民宿",
        "Value": "130人",
        "Name": "915彩绘馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "30",
        "Latitude": "31.09097",
        "Longitude": "121.6836",
        "Type": "民宿",
        "Value": "130人",
        "Name": "443养心馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "31",
        "Latitude": "31.092755",
        "Longitude": "121.68252",
        "Type": "民宿",
        "Value": "130人",
        "Name": "428日式和风馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "32",
        "Latitude": "31.09092",
        "Longitude": "121.6900",
        "Type": "民宿",
        "Value": "",
        "Name": "纺织馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "32",
        "Latitude": "31.08972",
        "Longitude": "121.6862",
        "Type": "网红打卡点",
        "Value": "",
        "Name": "网红打卡点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "33",
        "Latitude": "31.08815",
        "Longitude": "121.686",
        "Type": "玫瑰工坊",
        "Value": "",
        "Name": "玫瑰工坊",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "34",
        "Latitude": "31.09094",
        "Longitude": "121.6854",
        "Type": "主题活动广场",
        "Value": "",
        "Name": "主题活动广场",
        "Other": []
      }
    ],
    "industry":[
    { 
        "Height": "0.01",
        "Id": "35",
        "Latitude": "31.08972",
        "Longitude": "121.6862",
        "Type": "网红打卡点",
        "Value": "",
        "Name": "网红打卡点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "36",
        "Latitude": "31.08815",
        "Longitude": "121.686",
        "Type": "玫瑰工坊",
        "Value": "",
        "Name": "玫瑰工坊",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "37",
        "Latitude": "31.09094",
        "Longitude": "121.6854",
        "Type": "主题活动广场",
        "Value": "",
        "Name": "主题活动广场",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "38",
        "Latitude": "31.09031",
        "Longitude": "121.69",
        "Type": "合作社",
        "Value": "",
        "Name": "乡村会客厅",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "39",
        "Latitude": "31.08683",
        "Longitude": "121.6947",
        "Type": "合作社",
        "Value": "",
        "Name": "阳庆果蔬",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "40",
        "Latitude": "31.08665",
        "Longitude": "121.68662",
        "Type": "合作社",
        "Value": "",
        "Name": "绿妮瓜果蔬",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "41",
        "Latitude": "31.09552",
        "Longitude": "121.6909",
        "Type": "合作社",
        "Value": "",
        "Name": "老乔渔业",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "42",
        "Latitude": "31.09541",
        "Longitude": "121.6814",
        "Type": "合作社",
        "Value": "",
        "Name": "祥根渔业",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "43",
        "Latitude": "31.08648",
        "Longitude": "121.6763",
        "Type": "合作社",
        "Value": "",
        "Name": "道基食用菌",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08645",
        "Longitude": "121.6739",
        "Type": "合作社",
        "Value": "",
        "Name": "志磊食用菌",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08824",
        "Longitude": "121.6822",
        "Type": "合作社",
        "Value": "",
        "Name": "秀珍水产",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08395",
        "Longitude": "121.6793",
        "Type": "合作社",
        "Value": "",
        "Name": "春邱苗木",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.10114",
        "Longitude": "121.69580",
        "Type": "合作社",
        "Value": "",
        "Name": "亿缘蔬果",
        "Other": []
      }
    ],
    "homeFurnishing":[
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08735",
        "Longitude": "121.6849",
        "Type": "936能源馆",
        "Value": "",
        "Name": "936能源馆",
        "Other": []
      }
    ],
    "Hours24": [
      { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08799",
        "Longitude": "121.6862",
        "Type": "集中风电",
        "Value": "",
        "Name": "集中风电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "46",
        "Latitude": "31.0874",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "能源中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "47",
        "Latitude": "31.08737",
        "Longitude": "121.6852",
        "Type": "外来电",
        "Value": "",
        "Name": "外来电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "48",
        "Latitude": "31.08747",
        "Longitude": "121.6826",
        "Type": "集中储能",
        "Value": "",
        "Name": "集中储能",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "49",
        "Latitude": "31.08623",
        "Longitude": "121.6831",
        "Type": "集中光伏",
        "Value": "",
        "Name": "集中光伏",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "50",
        "Latitude": "31.08730",
        "Longitude": "121.68512",
        "Type": "冷水机组",
        "Value": "",
        "Name": "冷水机组",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "51",
        "Latitude": "31.08735",
        "Longitude": "121.6850",
        "Type": "太阳能",
        "Value": "",
        "Name": "太阳能",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "52",
        "Latitude": "31.08737",
        "Longitude": "121.6851",
        "Type": "生物质锅炉",
        "Value": "",
        "Name": "生物质锅炉",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "53",
        "Latitude": "31.08736",
        "Longitude": "121.6850",
        "Type": "空气源热泵",
        "Value": "",
        "Name": "空气源热泵",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "54",
        "Latitude": "31.087144",
        "Longitude": "121.68517",
        "Type": "地埋管",
        "Value": "",
        "Name": "地埋管",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "55",
        "Latitude": "31.08696",
        "Longitude": "121.68487",
        "Type": "河道抛管",
        "Value": "",
        "Name": "河道抛管",
        "Other": []
      }
    ],
    "villagePower":[
    { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08799",
        "Longitude": "121.6862",
        "Type": "集中风电",
        "Value": "",
        "Name": "集中风电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "46",
        "Latitude": "31.0874",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "能源中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "47",
        "Latitude": "31.08737",
        "Longitude": "121.6852",
        "Type": "外来电",
        "Value": "",
        "Name": "外来电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "48",
        "Latitude": "31.08747",
        "Longitude": "121.6826",
        "Type": "集中储能",
        "Value": "",
        "Name": "集中储能",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "49",
        "Latitude": "31.08626",
        "Longitude": "121.68316",
        "Type": "集中光伏",
        "Value": "",
        "Name": "集中光伏",
        "Other": []
      }
    ],
    "PowerCenter936":[
      { 
        "Height": "0.01",
        "Id": "56",
        "Latitude": "31.0873",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "微电网魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "57",
        "Latitude": "31.08729",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "地源热魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "58",
        "Latitude": "31.08728",
        "Longitude": "121.685",
        "Type": "能源中心",
        "Value": "",
        "Name": "水储能魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "59",
        "Latitude": "31.08735",
        "Longitude": "121.685",
        "Type": "能源中心",
        "Value": "",
        "Name": "热水源魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "60",
        "Latitude": "31.08736",
        "Longitude": "121.685",
        "Type": "能源中心",
        "Value": "",
        "Name": "生物质魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "61",
        "Latitude": "31.08737",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "电源变魔方",
        "Other": []
      }
    ],
    "PowerItem936":[
      { 
        "Height": "0.01",
        "Id": "62",
        "Latitude": "31.08623",
        "Longitude": "121.6831",
        "Type": "集中光伏",
        "Value": "",
        "Name": "1号光伏",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "63",
        "Latitude": "31.08623",
        "Longitude": "121.6831",
        "Type": "集中光伏",
        "Value": "",
        "Name": "2号光伏",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "64",
        "Latitude": "31.08799",
        "Longitude": "121.6862",
        "Type": "集中风电",
        "Value": "",
        "Name": "1号风电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "65",
        "Latitude": "31.08776",
        "Longitude": "121.6852",
        "Type": "集中风电",
        "Value": "",
        "Name": "2号风电",
        "Other": []
      }
    ],
    "Watching24":[
      { 
        "Height": "0.01",
        "Id": "66",
        "Latitude": "31.08738",
        "Longitude": "121.684",
        "Type": "民宅",
        "Value": "",
        "Name": "945项目部",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "67",
        "Latitude": "31.08744",
        "Longitude": "121.6842",
        "Type": "民宅",
        "Value": "",
        "Name": "944工程部",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "22",
        "Latitude": "31.09636",
        "Longitude": "121.6947",
        "Type": "民宿",
        "Value": "130人",
        "Name": "291稻香馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "23",
        "Latitude": "31.09108",
        "Longitude": "121.6907",
        "Type": "民宿",
        "Value": "",
        "Name": "烘培馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "24",
        "Latitude": "31.09139",
        "Longitude": "121.6912",
        "Type": "民宿",
        "Value": "",
        "Name": "甜蜜馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "25",
        "Latitude": "31.09636",
        "Longitude": "121.6947",
        "Type": "民宿",
        "Value": "",
        "Name": "310稻香馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "26",
        "Latitude": "31.09575",
        "Longitude": "121.6949",
        "Type": "民宿",
        "Value": "",
        "Name": "304纯真年代",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "27",
        "Latitude": "31.0883",
        "Longitude": "121.6838",
        "Type": "民宿",
        "Value": "",
        "Name": "912陶艺馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "28",
        "Latitude": "31.08834",
        "Longitude": "121.6841",
        "Type": "民宿",
        "Value": "",
        "Name": "913彩釉馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "29",
        "Latitude": "31.08836",
        "Longitude": "121.6846",
        "Type": "民宿",
        "Value": "",
        "Name": "915彩绘馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "30",
        "Latitude": "31.09097",
        "Longitude": "121.6836",
        "Type": "民宿",
        "Value": "",
        "Name": "443养心馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "31",
        "Latitude": "31.092755",
        "Longitude": "121.68252",
        "Type": "民宿",
        "Value": "",
        "Name": "428日式和风馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "32",
        "Latitude": "31.09092",
        "Longitude": "121.6900",
        "Type": "民宿",
        "Value": "",
        "Name": "纺织馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "37",
        "Latitude": "31.08815",
        "Longitude": "121.686",
        "Type": "玫瑰工坊",
        "Value": "",
        "Name": "玫瑰工坊",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "38",
        "Latitude": "31.09031",
        "Longitude": "121.69",
        "Type": "合作社",
        "Value": "",
        "Name": "乡村会客厅",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "36",
        "Latitude": "31.08972",
        "Longitude": "121.6862",
        "Type": "网红打卡点",
        "Value": "",
        "Name": "网红打卡点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "39",
        "Latitude": "31.08683",
        "Longitude": "121.6947",
        "Type": "合作社",
        "Value": "",
        "Name": "阳庆果蔬",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "40",
        "Latitude": "31.08671",
        "Longitude": "121.6865",
        "Type": "合作社",
        "Value": "",
        "Name": "绿妮瓜果蔬",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "41",
        "Latitude": "31.09552",
        "Longitude": "121.6909",
        "Type": "合作社",
        "Value": "",
        "Name": "老乔渔业",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "42",
        "Latitude": "31.09541",
        "Longitude": "121.6814",
        "Type": "合作社",
        "Value": "",
        "Name": "祥根渔业",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "43",
        "Latitude": "31.08648",
        "Longitude": "121.6763",
        "Type": "合作社",
        "Value": "",
        "Name": "道基食用菌",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08645",
        "Longitude": "121.6739",
        "Type": "合作社",
        "Value": "",
        "Name": "志磊食用菌",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08824",
        "Longitude": "121.6822",
        "Type": "合作社",
        "Value": "",
        "Name": "秀珍水产",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08395",
        "Longitude": "121.6793",
        "Type": "合作社",
        "Value": "",
        "Name": "春邱苗木",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.10114",
        "Longitude": "121.69580",
        "Type": "合作社",
        "Value": "",
        "Name": "亿缘蔬果",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "17",
        "Latitude": "31.09291",
        "Longitude": "121.6801",
        "Type": "村委",
        "Value": "",
        "Name": "村委",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "34",
        "Latitude": "31.09094",
        "Longitude": "121.6854",
        "Type": "主题活动广场",
        "Value": "",
        "Name": "主题活动广场",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08742",
        "Longitude": "121.6849",
        "Type": "936能源展示馆",
        "Value": "",
        "Name": "936能源展示馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "18",
        "Latitude": "31.08742",
        "Longitude": "121.6849",
        "Type": "充电桩",
        "Value": "",
        "Name": "充电桩1",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "20",
        "Latitude": "31.08741",
        "Longitude": "121.6849",
        "Type": "充电桩",
        "Value": "",
        "Name": "充电桩2",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "9",
        "Latitude": "31.08665",
        "Longitude": "121.685",
        "Type": "垃圾回收中心",
        "Value": "",
        "Name": "垃圾回收中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "10",
        "Latitude": "31.08714",
        "Longitude": "121.6848",
        "Type": "水质监测点",
        "Value": "",
        "Name": "水质检测点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "11",
        "Latitude": "31.08712",
        "Longitude": "121.6852",
        "Type": "空气监测点",
        "Value": "",
        "Name": "空气监测点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "68",
        "Latitude": "31.08746",
        "Longitude": "121.6848",
        "Type": "萤火虫",
        "Value": "",
        "Name": "萤火虫",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "68",
        "Latitude": "31.0874",
        "Longitude": "121.6851",
        "Type": "936能源中心",
        "Value": "",
        "Name": "936能源中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "69",
        "Latitude": "31.08996",
        "Longitude": "121.6849",
        "Type": "智能路灯",
        "Value": "",
        "Name": "智能路灯1",
        "Other": []
      }
    ],
    "allVillage": [ //取了部分数据做样例，这部分数据必须得用后台提供，里面有具体的能源数据
      { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08799",
        "Longitude": "121.6862",
        "Type": "集中风电",
        "Value": "",
        "Name": "集中风电",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      },
      { 
        "Height": "0.01",
        "Id": "46",
        "Latitude": "31.0874",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "能源中心",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      },
      { 
        "Height": "0.01",
        "Id": "47",
        "Latitude": "31.08737",
        "Longitude": "121.6852",
        "Type": "外来电",
        "Value": "",
        "Name": "外来电",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      },
      { 
        "Height": "0.01",
        "Id": "48",
        "Latitude": "31.08747",
        "Longitude": "121.6826",
        "Type": "集中储能",
        "Value": "",
        "Name": "集中储能",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      },
      { 
        "Height": "0.01",
        "Id": "49",
        "Latitude": "31.08623",
        "Longitude": "121.6831",
        "Type": "集中光伏",
        "Value": "",
        "Name": "集中光伏",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      }
    ],
    "distributedPower": [
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08735",
        "Longitude": "121.6849",
        "Type": "936能源馆",
        "Value": "",
        "Name": "936能源馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "56",
        "Latitude": "31.0873",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "微电网魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "57",
        "Latitude": "31.08729",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "地源热魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "58",
        "Latitude": "31.08728",
        "Longitude": "121.685",
        "Type": "能源中心",
        "Value": "",
        "Name": "水储能魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "59",
        "Latitude": "31.08735",
        "Longitude": "121.685",
        "Type": "能源中心",
        "Value": "",
        "Name": "热水源魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "60",
        "Latitude": "31.08736",
        "Longitude": "121.685",
        "Type": "能源中心",
        "Value": "",
        "Name": "生物质魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "61",
        "Latitude": "31.08737",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "",
        "Name": "电源变魔方",
        "Other": []
      }
    ],
    "powerDeal" : [ //取了部分数据做样例，这部分数据必须得用后台提供，里面有具体的交易数据
      { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08799",
        "Longitude": "121.6862",
        "Type": "集中风电",
        "Value": "56万元",
        "Name": "集中风电"
      },
      { 
        "Height": "0.01",
        "Id": "46",
        "Latitude": "31.0874",
        "Longitude": "121.6851",
        "Type": "能源中心",
        "Value": "56万元",
        "Name": "能源中心"
      },
      { 
        "Height": "0.01",
        "Id": "47",
        "Latitude": "31.08737",
        "Longitude": "121.6852",
        "Type": "外来电",
        "Value": "56万元",
        "Name": "外来电"
      },
      { 
        "Height": "0.01",
        "Id": "48",
        "Latitude": "31.08747",
        "Longitude": "121.6826",
        "Type": "集中储能",
        "Value": "56万元",
        "Name": "集中储能"
      },
      { 
        "Height": "0.01",
        "Id": "49",
        "Latitude": "31.08623",
        "Longitude": "121.6831",
        "Type": "集中光伏",
        "Value": "56万元",
        "Name": "集中光伏"
      }
    ],
    "itemData":[
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08735",
        "Longitude": "121.6849",
        "Type": "936能源馆",
        "Value": "965万元",
        "Name": "936能源馆",
        "Other": []
      }
    ]
  }