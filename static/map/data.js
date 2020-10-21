//用于场景切换的各场景中心点数据
var sceneCenterConfig = {
    "security":{ //民生-安防
      "Distance": "10",
      "PosX": "121.6854",
      "PosY": "31.08914",
      "Time": 1,
      "X": "-187.8925",
      "Y": "79.2"
    },
    "ecology":{ //民生-生态
      "Distance": "1.168851",
      "PosX": "121.6846",
      "PosY": "31.08722",
      "Time": 1,
      "X": "195.3075",
      "Y": "37.6"
    },
    "realWatching":{ //民生-出行-实时监控数据
      "Distance": "10.43779",
      "PosX": "121.6841",
      "PosY": "31.09039",
      "Time": 1,
      "X": "194.5296",
      "Y": "78.39999"
    },
    "deviceUse":{ //民生-出行-设备使用情况
      "Distance": "4.579001",
      "PosX": "121.6859",
      "PosY": "31.08945",
      "Time": 1,
      "X": "169.7296",
      "Y": "80"
    },
    "culturalTourism":{ //民生-文旅
      "Distance": "5.436648",
      "PosX": "121.6856",
      "PosY": "31.09003",
      "Time": 1,
      "X": "170.5296",
      "Y": "58.40001"
    },
    "industry":{ //民生-产业
      "Distance": "8.91486",
      "PosX": "121.6858",
      "PosY": "31.09044",
      "Time": 1,
      "X": "176.1296",
      "Y": "75.20001"
    },
    "homeFurnishing":{ //民生-家居
      "Distance": "1.2",
      "PosX": "121.6849",
      "PosY": "31.08748",
      "Time": 1,
      "X": "-167.8704",
      "Y": "26.80001"
    },
    "Hours24":{ //能源-运行监控-能源供给-24小时监测
      "Distance": "1",
      "PosX": "121.685",
      "PosY": "31.08739",
      "Time": 1,
      "X": "196.9296",
      "Y": "40.8"
    },
    "villagePower":{ //能源-运行监控-能源供给-全村域能源
      "Distance": "1",
      "PosX": "121.685",
      "PosY": "31.08739",
      "Time": 1,
      "X": "196.9296",
      "Y": "40.8"
    },
    "PowerCenter936":{ //能源-运行监控-能源供给-936能源中心
      "Distance": "0.4",
      "PosX": "121.6851",
      "PosY": "31.08737",
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
      "Distance": "5.85532",
      "PosX": "121.6847",
      "PosY": "31.08763",
      "Time": 1,
      "X": "-153.4925",
      "Y": "43.2"
    },
    // "consumeItem":{ //根据前端选中的点的数据，确定中心点，以及打点的数据
    //   "Distance": "0.8",
    //   "PosX": "121.6848",
    //   "PosY": "31.08706",
    //   "Time": 1,
    //   "X": "90",
    //   "Y": "45"
    // },
    // "pwoerAnalysis":{ //根据前端选中的点的数据，确定中心点，以及打点的数据
    //   "Distance": "0.8",
    //   "PosX": "121.6848",
    //   "PosY": "31.08706",
    //   "Time": 1,
    //   "X": "90",
    //   "Y": "45"
    // },
    // "pwoerCompare":{ //需要进一步确认场景，选中的建筑是前端多选么？选完后确定中心点位置？这个沙盘实现不了，中心点位置需要实现确定，即备选的几个点需要实现确定，不能实时任意选择对比
    //   "Distance": "0.8",
    //   "PosX": "121.6848",
    //   "PosY": "31.08706",
    //   "Time": 1,
    //   "X": "90",
    //   "Y": "45"
    // },
    "allVillage":{ //能源-设备运维-全村域
      "Distance": "1.2",
      "PosX": "121.6849",
      "PosY": "31.08748",
      "Time": 1,
      "X": "-167.8704",
      "Y": "26.80001"
    },
    "distributedPower":{ //能源-设备运维-分布式能源
      "Distance": "0.4",
      "PosX": "121.6851",
      "PosY": "31.08737",
      "Time": 1,
      "X": "210.9296",
      "Y": "42.8"
    },
    // "seniorAnalysis":{ //根据前端选中的点的数据，确定中心点，以及打点的数据
    //   "Distance": "0.8",
    //   "PosX": "121.6848",
    //   "PosY": "31.08706",
    //   "Time": 1,
    //   "X": "90",
    //   "Y": "45"
    // },
    "powerDeal":{ //能源-能源交易-全村域
      "Distance": "1.2",
      "PosX": "121.6849",
      "PosY": "31.08748",
      "Time": 1,
      "X": "-167.8704",
      "Y": "26.80001"
    },
    "itemData":{ //能源-能源交易-个体数据
      "Distance": "1.2",
      "PosX": "121.6849",
      "PosY": "31.08748",
      "Time": 1,
      "X": "-167.8704",
      "Y": "26.80001"
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
        "Latitude": "31.08722",
        "Longitude": "121.684",
        "Type": "垃圾回收中心",
        "Value": "",
        "Name": "垃圾回收中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "10",
        "Latitude": "31.08722",
        "Longitude": "121.6848",
        "Type": "水质监测点",
        "Value": "",
        "Name": "水质监测点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "11",
        "Latitude": "31.08698",
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
        "Latitude": "31.08811",
        "Longitude": "121.686",
        "Type": "停车位",
        "Value": "",
        "Name": "玫瑰工坊停车场",
        "Other": [{"Key":"总车位数","Value":"10"},{"Key":"剩余车位数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "15",
        "Latitude": "31.08973",
        "Longitude": "121.6862",
        "Type": "停车位",
        "Value": "",
        "Name": "网红打卡点停车场",
        "Other": [{"Key":"总车位数","Value":"10"},{"Key":"剩余车位数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "16",
        "Latitude": "31.0921",
        "Longitude": "121.6809",
        "Type": "停车位",
        "Value": "",
        "Name": "乡村会客厅停车场",
        "Other": [{"Key":"总车位数","Value":"10"},{"Key":"剩余车位数","Value":"8"}]
      },
      { 
        "Height": "0.01",
        "Id": "17",
        "Latitude": "31.09283",
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
        "Latitude": "31.09082",
        "Longitude": "121.6901",
        "Type": "民宿",
        "Value": "",
        "Name": "291稻香馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "23",
        "Latitude": "31.09104",
        "Longitude": "121.6908",
        "Type": "民宿",
        "Value": "",
        "Name": "烘培馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "24",
        "Latitude": "31.09141",
        "Longitude": "121.6912",
        "Type": "民宿",
        "Value": "",
        "Name": "甜蜜馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "25",
        "Latitude": "31.0933",
        "Longitude": "121.6853",
        "Type": "民宿",
        "Value": "",
        "Name": "310稻香馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "26",
        "Latitude": "31.09285",
        "Longitude": "121.6854",
        "Type": "民宿",
        "Value": "",
        "Name": "304纯真年代",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "27",
        "Latitude": "31.08831",
        "Longitude": "121.6839",
        "Type": "民宿",
        "Value": "",
        "Name": "912陶艺馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "28",
        "Latitude": "31.088",
        "Longitude": "121.6841",
        "Type": "民宿",
        "Value": "",
        "Name": "913彩釉馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "29",
        "Latitude": "31.088194",
        "Longitude": "121.68459",
        "Type": "民宿",
        "Value": "",
        "Name": "915彩绘馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "30",
        "Latitude": "31.09072",
        "Longitude": "121.68369",
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
        "Latitude": "31.08973",
        "Longitude": "121.6862",
        "Type": "网红打卡点",
        "Value": "",
        "Name": "网红打卡点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "33",
        "Latitude": "31.08811",
        "Longitude": "121.686",
        "Type": "玫瑰工坊",
        "Value": "",
        "Name": "玫瑰工坊",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "34",
        "Latitude": "31.09068",
        "Longitude": "121.6853",
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
        "Latitude": "31.08973",
        "Longitude": "121.6862",
        "Type": "网红打卡点",
        "Value": "",
        "Name": "网红打卡点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "36",
        "Latitude": "31.08811",
        "Longitude": "121.686",
        "Type": "玫瑰工坊",
        "Value": "",
        "Name": "玫瑰工坊",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "37",
        "Latitude": "31.09068",
        "Longitude": "121.6853",
        "Type": "主题活动广场",
        "Value": "",
        "Name": "主题活动广场",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "38",
        "Latitude": "31.0921",
        "Longitude": "121.6809",
        "Type": "合作社",
        "Value": "",
        "Name": "乡村会客厅",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "39",
        "Latitude": "31.08713",
        "Longitude": "121.69462",
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
        "Name": "绿妮瓜果",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "41",
        "Latitude": "31.09509",
        "Longitude": "121.69077",
        "Type": "合作社",
        "Value": "",
        "Name": "老乔渔业",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "42",
        "Latitude": "31.09507",
        "Longitude": "121.68136",
        "Type": "合作社",
        "Value": "",
        "Name": "祥根渔业",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "43",
        "Latitude": "31.0867",
        "Longitude": "121.67613",
        "Type": "合作社",
        "Value": "",
        "Name": "道基食用菌",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08655",
        "Longitude": "121.67415",
        "Type": "合作社",
        "Value": "",
        "Name": "志磊食用菌",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08814",
        "Longitude": "121.6821",
        "Type": "合作社",
        "Value": "",
        "Name": "秀珍水产",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08379",
        "Longitude": "121.679909",
        "Type": "合作社",
        "Value": "",
        "Name": "春邱苗木",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.10115",
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
        "Latitude": "31.08768",
        "Longitude": "121.68661",
        "Type": "集中风电",
        "Value": "",
        "Name": "集中风电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "46",
        "Latitude": "31.08729",
        "Longitude": "121.68518",
        "Type": "能源中心",
        "Value": "",
        "Name": "能源中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "47",
        "Latitude": "31.0873",
        "Longitude": "121.6851",
        "Type": "外来电",
        "Value": "",
        "Name": "外来电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "48",
        "Latitude": "31.0875",
        "Longitude": "121.6827",
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
        "Latitude": "31.08768",
        "Longitude": "121.68661",
        "Type": "集中风电",
        "Value": "",
        "Name": "集中风电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "46",
        "Latitude": "31.08729",
        "Longitude": "121.68518",
        "Type": "能源中心",
        "Value": "",
        "Name": "能源中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "47",
        "Latitude": "31.0873",
        "Longitude": "121.6851",
        "Type": "外来电",
        "Value": "",
        "Name": "外来电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "48",
        "Latitude": "31.0875",
        "Longitude": "121.6827",
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
        "Latitude": "31.087305",
        "Longitude": "121.68518",
        "Type": "能源中心",
        "Value": "",
        "Name": "微电网魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "57",
        "Latitude": "31.08730",
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
        "Longitude": "121.68507",
        "Type": "能源中心",
        "Value": "",
        "Name": "水储能魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "59",
        "Latitude": "31.08735",
        "Longitude": "121.68505",
        "Type": "能源中心",
        "Value": "",
        "Name": "热水源魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "60",
        "Latitude": "31.08736",
        "Longitude": "121.68510",
        "Type": "能源中心",
        "Value": "",
        "Name": "生物质魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "61",
        "Latitude": "31.08737",
        "Longitude": "121.68515",
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
        "Latitude": "31.08724",
        "Longitude": "121.68526",
        "Type": "集中光伏",
        "Value": "",
        "Name": "1号光伏",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "63",
        "Latitude": "31.08727",
        "Longitude": "121.68493",
        "Type": "集中光伏",
        "Value": "",
        "Name": "2号光伏",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "64",
        "Latitude": "31.08671",
        "Longitude": "121.68529",
        "Type": "集中风电",
        "Value": "",
        "Name": "1号风电",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "65",
        "Latitude": "31.08676",
        "Longitude": "121.68528",
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
        "Latitude": "31.08721",
        "Longitude": "121.68405",
        "Type": "民宅",
        "Value": "",
        "Name": "945项目部",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "67",
        "Latitude": "31.08739",
        "Longitude": "121.68409",
        "Type": "民宅",
        "Value": "",
        "Name": "944工程部",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "22",
        "Latitude": "31.09082",
        "Longitude": "121.6901",
        "Type": "民宿",
        "Value": "",
        "Name": "291稻香馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "23",
        "Latitude": "31.09104",
        "Longitude": "121.6908",
        "Type": "民宿",
        "Value": "",
        "Name": "烘培馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "24",
        "Latitude": "31.09141",
        "Longitude": "121.6912",
        "Type": "民宿",
        "Value": "",
        "Name": "甜蜜馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "25",
        "Latitude": "31.0933",
        "Longitude": "121.6853",
        "Type": "民宿",
        "Value": "",
        "Name": "310稻香馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "26",
        "Latitude": "31.09285",
        "Longitude": "121.6854",
        "Type": "民宿",
        "Value": "",
        "Name": "304纯真年代",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "27",
        "Latitude": "31.08831",
        "Longitude": "121.6839",
        "Type": "民宿",
        "Value": "",
        "Name": "912陶艺馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "28",
        "Latitude": "31.088",
        "Longitude": "121.6841",
        "Type": "民宿",
        "Value": "",
        "Name": "913彩釉馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "29",
        "Latitude": "31.088194",
        "Longitude": "121.68459",
        "Type": "民宿",
        "Value": "",
        "Name": "915彩绘馆",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "30",
        "Latitude": "31.09072",
        "Longitude": "121.68369",
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
        "Id": "38",
        "Latitude": "31.0921",
        "Longitude": "121.6809",
        "Type": "合作社",
        "Value": "",
        "Name": "乡村会客厅",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "39",
        "Latitude": "31.08713",
        "Longitude": "121.69462",
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
        "Name": "绿妮瓜果",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "41",
        "Latitude": "31.09509",
        "Longitude": "121.69077",
        "Type": "合作社",
        "Value": "",
        "Name": "老乔渔业",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "42",
        "Latitude": "31.09507",
        "Longitude": "121.68136",
        "Type": "合作社",
        "Value": "",
        "Name": "祥根渔业",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "43",
        "Latitude": "31.0867",
        "Longitude": "121.67613",
        "Type": "合作社",
        "Value": "",
        "Name": "道基食用菌",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08655",
        "Longitude": "121.67415",
        "Type": "合作社",
        "Value": "",
        "Name": "志磊食用菌",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08814",
        "Longitude": "121.6821",
        "Type": "合作社",
        "Value": "",
        "Name": "秀珍水产",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.08379",
        "Longitude": "121.679909",
        "Type": "合作社",
        "Value": "",
        "Name": "春邱苗木",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "44",
        "Latitude": "31.10115",
        "Longitude": "121.69580",
        "Type": "合作社",
        "Value": "",
        "Name": "亿缘蔬果",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "17",
        "Latitude": "31.09283",
        "Longitude": "121.6801",
        "Type": "村委",
        "Value": "",
        "Name": "村委",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "34",
        "Latitude": "31.09068",
        "Longitude": "121.6853",
        "Type": "主题活动广场",
        "Value": "",
        "Name": "主题活动广场",
        "Other": []
      },
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
        "Id": "18",
        "Latitude": "31.08746",
        "Longitude": "121.6849",
        "Type": "充电桩",
        "Value": "",
        "Name": "充电桩",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "9",
        "Latitude": "31.08722",
        "Longitude": "121.684",
        "Type": "垃圾回收中心",
        "Value": "",
        "Name": "垃圾回收中心",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "10",
        "Latitude": "31.08722",
        "Longitude": "121.6848",
        "Type": "水质监测点",
        "Value": "",
        "Name": "水质监测点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "11",
        "Latitude": "31.08698",
        "Longitude": "121.6852",
        "Type": "空气监测点",
        "Value": "",
        "Name": "空气监测点",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "68",
        "Latitude": "31.08743",
        "Longitude": "121.68478",
        "Type": "萤火虫",
        "Value": "",
        "Name": "萤火虫",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "68",
        "Latitude": "31.087342",
        "Longitude": "121.685111",
        "Type": "936能源中心",
        "Value": "",
        "Name": "936能源中心",
        "Other": []
      }
    ],
    "allVillage": [ //取了部分数据做样例，这部分数据必须得用后台提供，里面有具体的能源数据
      { 
        "Height": "0.01",
        "Id": "45",
        "Latitude": "31.08768",
        "Longitude": "121.68661",
        "Type": "集中风电",
        "Value": "",
        "Name": "集中风电",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      },
      { 
        "Height": "0.01",
        "Id": "46",
        "Latitude": "31.08729",
        "Longitude": "121.68518",
        "Type": "能源中心",
        "Value": "",
        "Name": "能源中心",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      },
      { 
        "Height": "0.01",
        "Id": "47",
        "Latitude": "31.0873",
        "Longitude": "121.6851",
        "Type": "外来电",
        "Value": "",
        "Name": "外来电",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      },
      { 
        "Height": "0.01",
        "Id": "48",
        "Latitude": "31.0875",
        "Longitude": "121.6827",
        "Type": "集中储能",
        "Value": "",
        "Name": "集中储能",
        "Other": [{"Key":"电","Value":"53kWh"},{"Key":"热","Value":"77kWh"},{"Key":"热水","Value":"34吨"},{"Key":"冷","Value":"kWh"}]
      },
      { 
        "Height": "0.01",
        "Id": "49",
        "Latitude": "31.08626",
        "Longitude": "121.68316",
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
        "Latitude": "31.087305",
        "Longitude": "121.68518",
        "Type": "能源中心",
        "Value": "",
        "Name": "微电网魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "57",
        "Latitude": "31.08730",
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
        "Longitude": "121.68507",
        "Type": "能源中心",
        "Value": "",
        "Name": "水储能魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "59",
        "Latitude": "31.08735",
        "Longitude": "121.68505",
        "Type": "能源中心",
        "Value": "",
        "Name": "热水源魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "60",
        "Latitude": "31.08736",
        "Longitude": "121.68510",
        "Type": "能源中心",
        "Value": "",
        "Name": "生物质魔方",
        "Other": []
      },
      { 
        "Height": "0.01",
        "Id": "61",
        "Latitude": "31.08737",
        "Longitude": "121.68515",
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
        "Latitude": "31.08768",
        "Longitude": "121.68661",
        "Type": "集中风电",
        "Value": "",
        "Name": "集中风电"
      },
      { 
        "Height": "0.01",
        "Id": "46",
        "Latitude": "31.08729",
        "Longitude": "121.68518",
        "Type": "能源中心",
        "Value": "",
        "Name": "能源中心"
      },
      { 
        "Height": "0.01",
        "Id": "47",
        "Latitude": "31.0873",
        "Longitude": "121.6851",
        "Type": "外来电",
        "Value": "",
        "Name": "外来电"
      },
      { 
        "Height": "0.01",
        "Id": "48",
        "Latitude": "31.0875",
        "Longitude": "121.6827",
        "Type": "集中储能",
        "Value": "",
        "Name": "集中储能"
      },
      { 
        "Height": "0.01",
        "Id": "49",
        "Latitude": "31.08626",
        "Longitude": "121.68316",
        "Type": "集中光伏",
        "Value": "",
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
        "Value": "",
        "Name": "936能源馆",
        "Other": []
      }
    ]
  }