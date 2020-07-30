var g_iWndIndex = 0;
// 初始化
$(function () {
    // 检查插件是否已经安装过
    var iRet = WebVideoCtrl.I_CheckPluginInstall();
    if (-1 == iRet) {
      alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
      return;
    }
    // 初始化插件参数及插入插件
    WebVideoCtrl.I_InitPlugin(500, 300, {
      bWndFull: true,     //是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
      iPackageType: 2,    //2:PS 11:MP4
      iWndowType: 1,
      bNoPlugin: true,
      cbInitPluginComplete: function () {
        WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
        // 检查插件是否最新
        if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
          alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
          return;
        }
      }
    });
    // 窗口事件绑定
    $(window).bind({
      resize: function () {
        var $Restart = $("#restartDiv");
        if ($Restart.length > 0) {
          var oSize = getWindowSize();
          $Restart.css({
            width: oSize.width + "px",
            height: oSize.height + "px"
          });
        }
      }
    });
    // 默认登录
    clickLogin();
  });

// 窗口分割数
function changeWndNum(iType) {
  // iType = parseInt(iType, 10);
  WebVideoCtrl.I_ChangeWndNum(iType);
}

// 登录
function clickLogin() {
  var szIP = '169.254.102.32',
  szPort = '80',
  szUsername = 'admin',
  szPassword = 'abcd1234';
  var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
    success: function (xmlDoc) {            
      console.log("登录成功")
    },
    error: function (status, xmlDoc) {            
      console.log("登录失败")
    }
  });
}

// 开始预览
function clickStartRealPlay(channelId) {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
  var szDeviceIdentify = '169.254.102.32_80'
  var iRtspPort = '554'
  var iChannelID = channelId
  var bZeroChannel = false
  // if ("undefined" === typeof iStreamType) {
  //   iStreamType = 1; // 主码流
  // }
  if (null == szDeviceIdentify) {
    return
  }
  var startRealPlay = function () {
    WebVideoCtrl.I_StartRealPlay(szDeviceIdentify, {
      iRtspPort: iRtspPort,
      iStreamType: 1,
      iChannelID: iChannelID,
      bZeroChannel: bZeroChannel,
      success: function () {
        console.log("开始预览成功！")
      },
      error: function (status, xmlDoc) {
        if (403 === status) {
          console.log("设备不支持Websocket取流！")
        } else {
          console.log("开始预览失败！")
        }
      }
    });
  };

  if (oWndInfo != null) { // 已经在播放了，先停止
    WebVideoCtrl.I_Stop({
      success: function () {
        startRealPlay();
      }
    });
  } else {
    startRealPlay();
  }
}

// 停止预览
function clickStopRealPlay() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
  if (oWndInfo != null) {
    WebVideoCtrl.I_Stop({
      success: function () {
        console.log("停止预览成功！")
      },
      error: function () {
        console.log("停止预览失败！")
      }
    });
  }
}

// 抓图
function clickCapturePic() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
  if (oWndInfo != null) {
    var szCaptureFileFormat = "0";
    var szPicName = oWndInfo.szDeviceIdentify + "_test_" + new Date().getTime() + ".jpg";
    var iRet = WebVideoCtrl.I_CapturePic(szPicName, {
      bDateDir: true  //是否生成日期文件
    });
    if (0 == iRet) {
      console.log("抓图成功！")
    } else {
      console.log("抓图失败！")
    }
  }
}

// 开始回放
function clickStartPlayback() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
  var szDeviceIdentify = '169.254.102.32_80'
  var iRtspPort = '554'
  var iStreamType = '1'
  var iChannelID = '1'
  var szStartTime = '2020-06-16 00:00:00'
  var szEndTime = '2020-06-16 23:59:59'

  if (null == szDeviceIdentify) {
    return;
  }

  var startPlayback = function () {
    WebVideoCtrl.I_StartPlayback(szDeviceIdentify, {
      iRtspPort: iRtspPort,
      iStreamType: iStreamType,
      iChannelID: iChannelID,
      szStartTime: szStartTime,
      szEndTime: szEndTime,
      success: function () {
        console.log("开始回放成功！")
      },
      error: function (status, xmlDoc) {
        if (403 === status) {
          console.log("设备不支持Websocket取流！");
        } else {
          console.log("开始回放失败！");
        }
      }
    });
  };

  if (oWndInfo != null) { // 已经在播放了，先停止
    WebVideoCtrl.I_Stop({
      success: function () {
        startPlayback();
      }
    });
  } else {
    startPlayback();
  }
}

// 停止回放
function clickStopPlayback() {
  var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
  if (oWndInfo != null) {
    WebVideoCtrl.I_Stop({
      success: function () {
        console.log("停止回放成功！");
      },
      error: function () {
        console.log("停止回放失败！");
      }
    });
  }
}

// 改变窗口大小
function changeWndSize() {
  $('object').attr('width', '600')
}