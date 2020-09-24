var wxCharts = require('../../utils/wxcharts.js');
var ringChart1 = null;
var ringChart2 = null;
var ringChart3 = null;
const config = require('../../utils/config.js')
var app = getApp()
var echartsRoundOption1 = require('../../data/echarts-round1.js')
var echartsRoundOption2 = require('../../data/echarts-round2.js')
var echartsRoundOption3 = require('../../data/echarts-round3.js')
import * as echarts from '../../ec-canvas/echarts.js';
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    //校准选择数据
    multiArray: [
      ["低压：40", "低压：41", "低压：42", "低压：43", "低压：44", "低压：45", "低压：46", "低压： 47", "低压：48", "低压：49", "低压：50", "低压：51", "低压：52", "低压：53", "低压：54", "低压：55", "低压：56", "低压：57", "低压：58", "低压：59", "低压：60", "低压：61", "低压：62", "低压：63", "低压：64", "低压：65", "低压：66", "低压：67", "低压：68", "低压：69", "低压：70", "低压：71", "低压：72", "低压：73", "低压：74", "低压：75", "低压：76", "低压：77", "低压：78", "低压：79", "低压：80", "低压：81", "低压：82", "低压：83", "低压：84", "低压：85", "低压：86", "低压：87", "低压：88", "低压：89", "低压：90", "低压：91", "低压：92", "低压：93", "低压：94", "低压：95", "低压：96", "低压：97", "低压：98", "低压：99", "低压：100", "低压：101", "低压：102", "低压：103", "低压：104", "低压：105", "低压：106", "低压：107", "低压：108", "低压：109", "低压：110", "低压：111", "低压：112", "低压：113", "低压：114", "低压：115", "低压：116", "低压：117", "低压：118", "低压：119", "低压：120", "低压：121", "低压：122", "低压：123", "低压：124", "低压：125", "低压：126", "低压：127", "低压：128", "低压：129", "低压：130", "低压：131", "低压：132", "低压：133", "低压：134", "低压：135", "低压：136", "低压：137", "低压：138", "低压：139", "低压：140", "低压：141", "低压：142", "低压：143", "低压：144", "低压：145", "低压：146", "低压：147", "低压：148", "低压：149", "低压：150", "低压：151", "低压：152", "低压：153", "低压：154", "低压：155", "低压：156", "低压：157", "低压：158", "低压：159", "低压：160"],
      ["高压：40", "高压：41", "高压：42", "高压：43", "高压：44", "高压：45", "高压：46", "高压： 47", "高压：48", "高压：49", "高压：50", "高压：51", "高压：52", "高压：53", "高压：54", "高压：55", "高压：56", "高压：57", "高压：58", "高压：59", "高压：60", "高压：61", "高压：62", "高压：63", "高压：64", "高压：65", "高压：66", "高压：67", "高压：68", "高压：69", "高压：70", "高压：71", "高压：72", "高压：73", "高压：74", "高压：75", "高压：76", "高压：77", "高压：78", "高压：79", "高压：80", "高压：81", "高压：82", "高压：83", "高压：84", "高压：85", "高压：86", "高压：87", "高压：88", "高压：89", "高压：90", "高压：91", "高压：92", "高压：93", "高压：94", "高压：95", "高压：96", "高压：97", "高压：98", "高压：99", "高压：100", "高压：101", "高压：102", "高压：103", "高压：104", "高压：105", "高压：106", "高压：107", "高压：108", "高压：109", "高压：110", "高压：111", "高压：112", "高压：113", "高压：114", "高压：115", "高压：116", "高压：117", "高压：118", "高压：119", "高压：120", "高压：121", "高压：122", "高压：123", "高压：124", "高压：125", "高压：126", "高压：127", "高压：128", "高压：129", "高压：130", "高压：131", "高压：132", "高压：133", "高压：134", "高压：135", "高压：136", "高压：137", "高压：138", "高压：139", "高压：140", "高压：141", "高压：142", "高压：143", "高压：144", "高压：145", "高压：146", "高压：147", "高压：148", "高压：149", "高压：150", "高压：151", "高压：152", "高压：153", "高压：154", "高压：155", "高压：156", "高压：157", "高压：158", "高压：159", "高压：160"]
    ],
    objectMultiArray: [
      [{
        id: 0,
        name: "低压：40"
      }, {
        id: 1,
        name: "低压：41"
      }, {
        id: 2,
        name: "低压：42"
      }, {
        id: 3,
        name: "低压：43"
      }, {
        id: 4,
        name: "低压：44"
      }, {
        id: 5,
        name: "低压：45"
      }, {
        id: 6,
        name: "低压：46"
      }, {
        id: 7,
        name: "低压：47"
      }, {
        id: 8,
        name: "低压：48"
      }, {
        id: 9,
        name: "低压：49"
      }, {
        id: 10,
        name: "低压：50"
      }, {
        id: 11,
        name: "低压：51"
      }, {
        id: 12,
        name: "低压：52"
      }, {
        id: 13,
        name: "低压：53"
      }, {
        id: 14,
        name: "低压：54"
      }, {
        id: 15,
        name: "低压：55"
      }, {
        id: 16,
        name: "低压：56"
      }, {
        id: 17,
        name: "低压：57"
      }, {
        id: 18,
        name: "低压：58"
      }, {
        id: 19,
        name: "低压：59"
      }, {
        id: 20,
        name: "低压：60"
      }, {
        id: 21,
        name: "低压：61"
      }, {
        id: 22,
        name: "低压：62"
      }, {
        id: 23,
        name: "低压：63"
      }, {
        id: 24,
        name: "低压：64"
      }, {
        id: 25,
        name: "低压：65"
      }, {
        id: 26,
        name: "低压：66"
      }, {
        id: 27,
        name: "低压：67"
      }, {
        id: 28,
        name: "低压：68"
      }, {
        id: 29,
        name: "低压：69"
      }, {
        id: 30,
        name: "低压：70"
      }, {
        id: 31,
        name: "低压：71"
      }, {
        id: 32,
        name: "低压：72"
      }, {
        id: 33,
        name: "低压：73"
      }, {
        id: 34,
        name: "低压：74"
      }, {
        id: 35,
        name: "低压：75"
      }, {
        id: 36,
        name: "低压：76"
      }, {
        id: 37,
        name: "低压：77"
      }, {
        id: 38,
        name: "低压：78"
      }, {
        id: 39,
        name: "低压：79"
      }, {
        id: 40,
        name: "低压：80"
      }, {
        id: 41,
        name: "低压：81"
      }, {
        id: 42,
        name: "低压：82"
      }, {
        id: 43,
        name: "低压：83"
      }, {
        id: 44,
        name: "低压：84"
      }, {
        id: 45,
        name: "低压：85"
      }, {
        id: 46,
        name: "低压：86"
      }, {
        id: 47,
        name: "低压：87"
      }, {
        id: 48,
        name: "低压：88"
      }, {
        id: 49,
        name: "低压：89"
      }, {
        id: 50,
        name: "低压：90"
      }, {
        id: 51,
        name: "低压：91"
      }, {
        id: 52,
        name: "低压：92"
      }, {
        id: 53,
        name: "低压：93"
      }, {
        id: 54,
        name: "低压：94"
      }, {
        id: 55,
        name: "低压：95"
      }, {
        id: 56,
        name: "低压：96"
      }, {
        id: 57,
        name: "低压：97"
      }, {
        id: 58,
        name: "低压：98"
      }, {
        id: 59,
        name: "低压：99"
      }, {
        id: 60,
        name: "低压：100"
      }, {
        id: 61,
        name: "低压：101"
      }, {
        id: 62,
        name: "低压：102"
      }, {
        id: 63,
        name: "低压：103"
      }, {
        id: 64,
        name: "低压：104"
      }, {
        id: 65,
        name: "低压：105"
      }, {
        id: 66,
        name: "低压：106"
      }, {
        id: 67,
        name: "低压：107"
      }, {
        id: 68,
        name: "低压：108"
      }, {
        id: 69,
        name: "低压：109"
      }, {
        id: 70,
        name: "低压：110"
      }, {
        id: 71,
        name: "低压：111"
      }, {
        id: 72,
        name: "低压：112"
      }, {
        id: 73,
        name: "低压：113"
      }, {
        id: 74,
        name: "低压：114"
      }, {
        id: 75,
        name: "低压：115"
      }, {
        id: 76,
        name: "低压：116"
      }, {
        id: 77,
        name: "低压：117"
      }, {
        id: 78,
        name: "低压：118"
      }, {
        id: 79,
        name: "低压：119"
      }, {
        id: 80,
        name: "低压：120"
      }, {
        id: 81,
        name: "低压：121"
      }, {
        id: 82,
        name: "低压：122"
      }, {
        id: 83,
        name: "低压：123"
      }, {
        id: 84,
        name: "低压：124"
      }, {
        id: 85,
        name: "低压：125"
      }, {
        id: 86,
        name: "低压：126"
      }, {
        id: 87,
        name: "低压：127"
      }, {
        id: 88,
        name: "低压：128"
      }, {
        id: 89,
        name: "低压：129"
      }, {
        id: 90,
        name: "低压：130"
      }, {
        id: 91,
        name: "低压：131"
      }, {
        id: 92,
        name: "低压：132"
      }, {
        id: 93,
        name: "低压：133"
      }, {
        id: 94,
        name: "低压：134"
      }, {
        id: 95,
        name: "低压：135"
      }, {
        id: 96,
        name: "低压：136"
      }, {
        id: 97,
        name: "低压：137"
      }, {
        id: 98,
        name: "低压：138"
      }, {
        id: 99,
        name: "低压：139"
      }, {
        id: 100,
        name: "低压：140"
      }, {
        id: 101,
        name: "低压：141"
      }, {
        id: 102,
        name: "低压：142"
      }, {
        id: 103,
        name: "低压：143"
      }, {
        id: 104,
        name: "低压：144"
      }, {
        id: 105,
        name: "低压：145"
      }, {
        id: 106,
        name: "低压：146"
      }, {
        id: 107,
        name: "低压：147"
      }, {
        id: 108,
        name: "低压：148"
      }, {
        id: 109,
        name: "低压：149"
      }, {
        id: 110,
        name: "低压：150"
      }, {
        id: 111,
        name: "低压：151"
      }, {
        id: 112,
        name: "低压：152"
      }, {
        id: 113,
        name: "低压：153"
      }, {
        id: 114,
        name: "低压：154"
      }, {
        id: 115,
        name: "低压：155"
      }, {
        id: 116,
        name: "低压：156"
      }, {
        id: 117,
        name: "低压：157"
      }, {
        id: 118,
        name: "低压：158"
      }, {
        id: 119,
        name: "低压：159"
      }, {
        id: 120,
        name: "低压：160"
      }],

      [{
        id: 0,
        name: "高压：40"
      }, {
        id: 1,
        name: "高压：41"
      }, {
        id: 2,
        name: "高压：42"
      }, {
        id: 3,
        name: "高压：43"
      }, {
        id: 4,
        name: "高压：44"
      }, {
        id: 5,
        name: "高压：45"
      }, {
        id: 6,
        name: "高压：46"
      }, {
        id: 7,
        name: "高压：47"
      }, {
        id: 8,
        name: "高压：48"
      }, {
        id: 9,
        name: "高压：49"
      }, {
        id: 10,
        name: "高压：50"
      }, {
        id: 11,
        name: "高压：51"
      }, {
        id: 12,
        name: "高压：52"
      }, {
        id: 13,
        name: "高压：53"
      }, {
        id: 14,
        name: "高压：54"
      }, {
        id: 15,
        name: "高压：55"
      }, {
        id: 16,
        name: "高压：56"
      }, {
        id: 17,
        name: "高压：57"
      }, {
        id: 18,
        name: "高压：58"
      }, {
        id: 19,
        name: "高压：59"
      }, {
        id: 20,
        name: "高压：60"
      }, {
        id: 21,
        name: "高压：61"
      }, {
        id: 22,
        name: "高压：62"
      }, {
        id: 23,
        name: "高压：63"
      }, {
        id: 24,
        name: "高压：64"
      }, {
        id: 25,
        name: "高压：65"
      }, {
        id: 26,
        name: "高压：66"
      }, {
        id: 27,
        name: "高压：67"
      }, {
        id: 28,
        name: "高压：68"
      }, {
        id: 29,
        name: "高压：69"
      }, {
        id: 30,
        name: "高压：70"
      }, {
        id: 31,
        name: "高压：71"
      }, {
        id: 32,
        name: "高压：72"
      }, {
        id: 33,
        name: "高压：73"
      }, {
        id: 34,
        name: "高压：74"
      }, {
        id: 35,
        name: "高压：75"
      }, {
        id: 36,
        name: "高压：76"
      }, {
        id: 37,
        name: "高压：77"
      }, {
        id: 38,
        name: "高压：78"
      }, {
        id: 39,
        name: "高压：79"
      }, {
        id: 40,
        name: "高压：80"
      }, {
        id: 41,
        name: "高压：81"
      }, {
        id: 42,
        name: "高压：82"
      }, {
        id: 43,
        name: "高压：83"
      }, {
        id: 44,
        name: "高压：84"
      }, {
        id: 45,
        name: "高压：85"
      }, {
        id: 46,
        name: "高压：86"
      }, {
        id: 47,
        name: "高压：87"
      }, {
        id: 48,
        name: "高压：88"
      }, {
        id: 49,
        name: "高压：89"
      }, {
        id: 50,
        name: "高压：90"
      }, {
        id: 51,
        name: "高压：91"
      }, {
        id: 52,
        name: "高压：92"
      }, {
        id: 53,
        name: "高压：93"
      }, {
        id: 54,
        name: "高压：94"
      }, {
        id: 55,
        name: "高压：95"
      }, {
        id: 56,
        name: "高压：96"
      }, {
        id: 57,
        name: "高压：97"
      }, {
        id: 58,
        name: "高压：98"
      }, {
        id: 59,
        name: "高压：99"
      }, {
        id: 60,
        name: "高压：100"
      }, {
        id: 61,
        name: "高压：101"
      }, {
        id: 62,
        name: "高压：102"
      }, {
        id: 63,
        name: "高压：103"
      }, {
        id: 64,
        name: "高压：104"
      }, {
        id: 65,
        name: "高压：105"
      }, {
        id: 66,
        name: "高压：106"
      }, {
        id: 67,
        name: "高压：107"
      }, {
        id: 68,
        name: "高压：108"
      }, {
        id: 69,
        name: "高压：109"
      }, {
        id: 70,
        name: "高压：110"
      }, {
        id: 71,
        name: "高压：111"
      }, {
        id: 72,
        name: "高压：112"
      }, {
        id: 73,
        name: "高压：113"
      }, {
        id: 74,
        name: "高压：114"
      }, {
        id: 75,
        name: "高压：115"
      }, {
        id: 76,
        name: "高压：116"
      }, {
        id: 77,
        name: "高压：117"
      }, {
        id: 78,
        name: "高压：118"
      }, {
        id: 79,
        name: "高压：119"
      }, {
        id: 80,
        name: "高压：120"
      }, {
        id: 81,
        name: "高压：121"
      }, {
        id: 82,
        name: "高压：122"
      }, {
        id: 83,
        name: "高压：123"
      }, {
        id: 84,
        name: "高压：124"
      }, {
        id: 85,
        name: "高压：125"
      }, {
        id: 86,
        name: "高压：126"
      }, {
        id: 87,
        name: "高压：127"
      }, {
        id: 88,
        name: "高压：128"
      }, {
        id: 89,
        name: "高压：129"
      }, {
        id: 90,
        name: "高压：130"
      }, {
        id: 91,
        name: "高压：131"
      }, {
        id: 92,
        name: "高压：132"
      }, {
        id: 93,
        name: "高压：133"
      }, {
        id: 94,
        name: "高压：134"
      }, {
        id: 95,
        name: "高压：135"
      }, {
        id: 96,
        name: "高压：136"
      }, {
        id: 97,
        name: "高压：137"
      }, {
        id: 98,
        name: "高压：138"
      }, {
        id: 99,
        name: "高压：139"
      }, {
        id: 100,
        name: "高压：140"
      }, {
        id: 101,
        name: "高压：141"
      }, {
        id: 102,
        name: "高压：142"
      }, {
        id: 103,
        name: "高压：143"
      }, {
        id: 104,
        name: "高压：144"
      }, {
        id: 105,
        name: "高压：145"
      }, {
        id: 106,
        name: "高压：146"
      }, {
        id: 107,
        name: "高压：147"
      }, {
        id: 108,
        name: "高压：148"
      }, {
        id: 109,
        name: "高压：149"
      }, {
        id: 110,
        name: "高压：150"
      }, {
        id: 111,
        name: "高压：151"
      }, {
        id: 112,
        name: "高压：152"
      }, {
        id: 113,
        name: "高压：153"
      }, {
        id: 114,
        name: "高压：154"
      }, {
        id: 115,
        name: "高压：155"
      }, {
        id: 116,
        name: "高压：156"
      }, {
        id: 117,
        name: "高压：157"
      }, {
        id: 118,
        name: "高压：158"
      }, {
        id: 119,
        name: "高压：159"
      }, {
        id: 120,
        name: "高压：160"
      }]
    ],
    multiIndex: [45, 80],
    toMemberPhone: '',
    toMemberId: '',
    userInfo: {
      "avatarUrl": "https://health-mini-1255700284.cos.ap-chengdu.myqcloud.com/common/icon/commonAvatar.png",
      "imei": "-1",
      "nickName": "--",
      "phone": "-1",
      "toMemberId": -1
    },
    deviceInfo: {
      "companyAddress": "福建省厦门市软件园2期观日路30号 105单元",
      "deviceName": "健康手表",
      "dueAlert": "正常使用",
      "electric": "--%",
      "flushTime": "2019-01-01 00:00:00",
      "imei": "",
      "lastConnectTime": "2019-01-01 00:00:00",
      "latitude": "0",
      "localAddr": "未获取到定位信息",
      "longitude": "0",
      "maintenanceDue": "",
      "officialWeb": "www.xmgoldnet.com",
      "servePhone": "0592-5621111",
      "serviceDue": "",
      "sim": "***********",
      "status": "--",
      "supplier": "厦门金网科技有限公司"
    },
    healthData: {
      "bloodOxygen": "--",
      "bloodPressure": "--/--",
      "heartRate": "--",
      "high": "160",
      "low": "40",
      "score": "--",
      "updateTime": "2019-01-01 00:00:00"
    },
    stepData: {
      "calorie": "0",
      "goalNumber": "5000",
      "kilometres": "0",
      "percent": "--%",
      "realNumber": "0",
      "updateTime": "2019-01-01 00:00:00"
    },
    sleepData: {
      "deepHour": "0",
      "deepMin": "0",
      "desc": "0时0分",
      "evaluation": "--",
      "lightHour": "0",
      "lightMin": "0",
      "soberHour": "0",
      "soberMin": "0",
      "updateTime": "2019-01-01 00:00:00"
    },
    myDevices: [],
    myWatches: [],
    imgMsg: app.globalData.imgServer + 'health/icon/msg.png',
    imgMap: app.globalData.imgServer + 'health/icon/map.png',
    imgNotification: app.globalData.imgServer + 'health/icon/notification.png',
    imgClock: app.globalData.imgServer + 'health/icon/clock.png',
    imgStatus: app.globalData.imgServer + 'health/icon/link.png',
    imgBattery: app.globalData.imgServer + 'health/icon/battery.png',
    imgHide: app.globalData.imgServer + 'health/icon/hide.png',
    imgScan: app.globalData.imgServer + 'health/icon/scan.png',
    imgOpen: app.globalData.imgServer + 'health/icon/open.png',
    showUserList: false,
    refresh: '',
    show: false,
    imei: '',
    myWatch: '',
    secCorrect1: 19,
    secMeasure1: 19
  },
  goUserDeatil: function() {
    if (app.globalData.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      wx.navigateTo({
        url: '../more/user-info/index?toMemberId=' + this.data.toMemberId,
      })
    }

  },
  goToMap: function() {
    wx.navigateTo({
      url: 'map/index?imei=' + this.data.imei + '&toMemberPhone=' + this.data.toMemberPhone + '&toMemberId=' + this.data.toMemberId + '&myWatch=' + this.data.myWatch,
    })
  },
  //进入语音聊天，获取用户录音权限
  goTochats: function() {
    let that = this
    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        wx.navigateTo({
          url: 'chats/index?imei=' + that.data.imei + '&nickName=' + that.data.userInfo.nickName,
        })
      },
      fail() {
        wx.navigateTo({
          url: 'chats/index?imei=' + that.data.imei + '&nickName=' + that.data.userInfo.nickName,
        })
      }
    })
  },
  goToNotification: function() {
    wx.navigateTo({
      url: '../more/notification/index',
    })
  },

  //校准血压数据
  bindMultiPickerChange: function(e) {
    let that = this
    let lowIndex = e.detail.value[0]
    let highIndex = e.detail.value[1]
    let high = that.data.multiArray[1][highIndex].split("：")[1]
    let low = that.data.multiArray[0][lowIndex].split("：")[1]
    that.doCorrect(low, high)
  },
  doCorrect: function(low, high) {
    let that = this
    if (that.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      if (that.data.deviceInfo.status === '在线') {
        app.http.postRequest(config.postCalibrationBP, {
          userId: app.globalData.userId,
          imei: that.data.imei,
          high: high,
          low: low,
        }).then(res => {
          if (res.data.code === 'GN00000') {
            let serial = res.data.data.serial
            wx.showToast({
              title: '下发指令中...',
              icon: 'none',
              duration: app.globalData.duration
            })
            let count = 0,
              timerCorrect = 0;
            (function(a, b) {
              timerCorrect = setInterval(function() {
                app.http.postRequest(config.postSerial, {
                  userId: app.globalData.userId,
                  imei: that.data.imei,
                  serial: serial
                }).then(res => {
                  if (res.data.code === 'GN00000') {
                    if (res.data.data === true) {
                      wx.showModal({
                        title: '提示',
                        content: '指令下发成功！',
                      });
                      clearInterval(timerCorrect)
                    } else {
                      count++
                    }
                    if (count > 20) {
                      clearInterval(timerCorrect)
                      wx.showModal({
                        title: '提示',
                        content: '指令下发失败！',
                      });
                    }
                  } else {
                    clearInterval(timerCorrect)
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: app.globalData.duration
                    });
                  }
                })
              }, 3000);
            })(count, timerCorrect);
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: app.globalData.duration
            });
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '设备已离线，无法下发指令',
        })
      }
    }
  },
  onClickMeasureHealthData: function() {
    let that = this
    if (that.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      if (that.data.deviceInfo.status === '在线') {
        app.http.postRequest(config.postPostMeasure, {
          userId: app.globalData.userId,
          imei: that.data.imei,
          measureType: 1
        }).then(res => {
          if (res.data.code === 'GN00000') {
            let serial = res.data.data.serial
            wx.showToast({
              title: '下发指令中...',
              icon: 'none',
              duration: app.globalData.duration
            })
            let count = 0,
              timerMeasure = 0;
            (function(a, b) {
              timerMeasure = setInterval(function() {
                app.http.postRequest(config.postSerial, {
                  userId: app.globalData.userId,
                  imei: that.data.imei,
                  serial: serial
                }).then(res => {
                  if (res.data.code === 'GN00000') {
                    if (res.data.data === true) {
                      wx.showModal({
                        title: '提示',
                        content: '指令下发成功！',
                      });
                      clearInterval(timerMeasure)
                    } else {
                      count++
                    }
                    if (count > 20) {
                      clearInterval(timerMeasure)
                      wx.showModal({
                        title: '提示',
                        content: '指令下发失败！',
                      });
                    }
                  } else {
                    clearInterval(timerMeasure)
                    wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: app.globalData.duration
                    });
                  }
                })

              }, 3000);
            })(count, timerMeasure);
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: app.globalData.duration
            });
          }
        })

      } else {
        wx.showModal({
          title: '提示',
          content: '设备已离线，无法下发指令',
        })
      }
    }

  },
  doSerial: function(serial, timer, type) {
    let that = this
    app.http.postRequest(config.postSerial, {
      userId: app.globalData.userId,
      imei: that.data.imei,
      serial: serial
    }).then(res => {
      if (res.data.code === 'GN00000') {
        if (res.data.data === true) {
          wx.showModal({
            title: '提示',
            content: '指令下发成功！',
          });
          clearInterval(timer)
          if (type === 1) {
            that.setData({
              secCorrect1: 19
            })
          } else {
            that.setData({
              secMeasure1: 19
            })
          }

        } else {}
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        });
      }
    })

  },
  // 获取该账号我的家人列表，用于切换设备
  getMyFamily: function() {
    let that = this
    app.http.postRequest(config.postGetMyAllFamily, {
      userId: app.globalData.userId
    }).then(res => {
      if (res.data.code === 'GN00000') {
        if (res.data.data.myDevices.length === 0) {
          if (res.data.data.myWatches.length === 0) {
            wx.showToast({
              title: '暂无绑定/关注的设备',
              icon: 'none',
              duration: app.globalData.duration
            });
            that.setData({
              showUserList: false
            });
          } else {
            that.setData({
              myDevices: res.data.data.myDevices,
              myWatches: res.data.data.myWatches,
            })
            that.setData({
              showUserList: true
            });
          }
        } else {
          that.setData({
            myDevices: res.data.data.myDevices,
            myWatches: res.data.data.myWatches,
            showUserList: true
          })
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  // 切换绑定的设备，获取该设备健康数据
  onClickChangeDevice: function(e) {
    let that = this
    let index = e.currentTarget.dataset.id
    let imei = that.data.myDevices[index].imei
    app.globalData.imei = that.data.myDevices[index].imei
    let toMemberPhone = that.data.myDevices[index].toMemberPhone
    let toMemberId = that.data.myDevices[index].toMemberId
    that.setData({
      imei: imei,
      toMemberPhone: toMemberPhone,
      toMemberId: toMemberId,
      myWatch: 1
    })
    that.getPageInfo(imei, toMemberPhone, toMemberId, that.data.refresh)
    that.onClickHide()
  },
  // 切换我关注的设备，获取该设备健康数据
  onClickChangeWatch: function(e) {
    let that = this
    let index = e.currentTarget.dataset.id
    let imei = that.data.myWatches[index].imei
    app.globalData.imei = that.data.myWatches[index].imei
    let toMemberPhone = that.data.myWatches[index].toMemberPhone
    let toMemberId = that.data.myWatches[index].toMemberId
    that.setData({
      imei: imei,
      toMemberPhone: toMemberPhone,
      toMemberId: toMemberId,
      myWatch: 2
    })
    that.getPageInfo(imei, toMemberPhone, toMemberId, that.data.refresh)
    that.onClickHide()
  },
  goToHealthData(e) {
    let healthType = e.currentTarget.id
    let imei = this.data.imei
    let toMemberPhone = this.data.toMemberPhone
    wx.navigateTo({
      url: 'health-data/index?imei=' + imei + '&healthType=' + healthType + '&toMemberPhone=' + toMemberPhone
    })
  },

  // 隐藏列表
  onClickHide: function() {
    this.setData({
      showUserList: false
    })
  },
  scanDeviceCode: function() {
    if (app.globalData.login === false) {
      wx.showModal({
        title: '提示',
        content: '您还未登陆，请先进行登陆以获得更好的服务体验。',
        success(res) {
          if (res.confirm) {
            that.goNextPage()
          } else if (res.cancel) {}
        }
      })
    } else {
      wx.navigateTo({
        url: 'scan-type/index',
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取健康页面数据
  onLoad: function() {
    //环形图加载
    this.doEcharts(1, 'myHealthChart')
    this.doEcharts(2, 'mySetpChart')
    this.doEcharts(3, 'mySleepChart')
  },
  onShow: function() {
    //无设备时请求获取设备
      if (app.globalData.imei === '') {
        this.onclickGetMyFamily()
      } else {
         //有设备时获取设备信息
        this.getPageInfo(this.data.imei, this.data.toMemberPhone, this.data.toMemberId, this.data.refresh)
      }
  },
  onclickGetMyFamily: function() {
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    } else {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        mask: true,
        duration: 10000
      });
    };
    let that = this
    app.http.postRequest(config.postGetMyAllFamily, {
      userId: app.globalData.userId
    }).then(res => {
      if (res.data.code === 'GN00000') {
        that.setData({
          myDevices: res.data.data.myDevices,
          myWatches: res.data.data.myWatches,
        })
        if (res.data.data.myDevices[0]) {
          app.globalData.imei = res.data.data.myDevices[0].imei
          that.setData({
            imei: res.data.data.myDevices[0].imei,
            toMemberPhone: res.data.data.myDevices[0].toMemberPhone,
            toMemberId: res.data.data.myDevices[0].toMemberId,
            myWatch: 1
          })
          that.getPageInfo(res.data.data.myDevices[0].imei, res.data.data.myDevices[0].toMemberPhone, res.data.data.myDevices[0].toMemberId, 2)
        } else {
          if (res.data.data.myWatches[0]) {
            app.globalData.imei = res.data.data.myWatches[0].imei
            that.setData({
              imei: res.data.data.myWatches[0].imei,
              toMemberPhone: res.data.data.myWatches[0].toMemberPhone,
              toMemberId: res.data.data.myWatches[0].toMemberId,
              myWatch: 2
            })
            that.getPageInfo(res.data.data.myWatches[0].imei, res.data.data.myWatches[0].toMemberPhone, res.data.data.myWatches[0].toMemberId, 2)
          } else {
            app.globalData.imei = ''
            that.getPageInfo('', '', '', 2)
          }
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }

    })
  },
  getPageInfo: function(imei, toMemberPhone, toMemberId, refresh) {
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    } else {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        mask: true,
        duration: 10000
      });
    };
    let that = this
    app.http.postRequest(config.postGetHealthData, {
      userId: app.globalData.userId,
      imei: imei,
      toMemberPhone: toMemberPhone,
      toMemberId: toMemberId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === "GN00000") {
        let low = res.data.data.basic.rows.health.low
        low = low - 40
        let high = res.data.data.basic.rows.health.high
        high = high - 40
        app.globalData.show = true
        that.setData({
          userInfo: res.data.data.userInfo,
          deviceInfo: res.data.data.basic.deviceInfo,
          healthData: res.data.data.basic.rows.health,
          stepData: res.data.data.basic.rows.step,
          sleepData: res.data.data.basic.rows.sleep,
          ["multiIndex[0]"]: low,
          ["multiIndex[1]"]: high
        })
        let o1 = res.data.data.basic.rows.health.score
        let a1 = parseInt(o1)
        if (!a1) {
          a1 = 0
        }
        let b1 = 100 - a1
        let health = {
          'high': a1,
          'low': b1
        }
        let o2 = res.data.data.basic.rows.step.percent
        o2 = o2.replace(/%/, "");
        let a2 = parseInt(o2)
        if (!a2) {
          a2 = 0
        }
        let b2 = 100 - a2
        let c = res.data.data.basic.rows.step.goalNumber
        let step = {
          'high': a2,
          'low': b2,
          'step': c
        }
        let sleep = {
          'name': res.data.data.basic.rows.sleep.evaluation,
          'time': res.data.data.basic.rows.sleep.desc
        }
        that.updateEcharts(1, health)
        that.updateEcharts(2, step)
        that.updateEcharts(3, sleep)
        let battery = parseInt(res.data.data.basic.deviceInfo.electric)
        if (battery >= 50) {
          that.setData({
            imgBattery: app.globalData.imgServer + 'health/icon/high.png'
          })
        } else if (battery < 50 && battery >= 20) {
          that.setData({
            imgBattery: app.globalData.imgServer + 'health/icon/middle.png'
          })

        } else if (battery < 20) {
          that.setData({
            imgBattery: app.globalData.imgServer + 'health/icon/low.png'
          })
        };
        let status = res.data.data.basic.deviceInfo.status
        if (status === '在线') {
          that.setData({
            imgStatus: app.globalData.imgServer + 'health/icon/link.png',
          })

        } else if (status === '离线') {
          that.setData({
            imgStatus: app.globalData.imgServer + 'health/icon/off-line.png',
          })
        }
        if (refresh === 1) {
          wx.stopPullDownRefresh({
            complete(res) {
              wx.showToast({
                title: '刷新成功！',
              });
              that.setData({
                refresh: ''
              })
            }
          })
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }

    })
  },

  doEcharts: function(type, canvasId) {
    let that = this
    if (type === 1) {
      ringChart1 = new wxCharts({
        canvasId: canvasId,
        type: 'ring',
        extra: {
          ringWidth: 5,
          pie: {
            offsetAngle: -90
          }
        },
        title: {
          name: '健康评估',
          color: '#808080',
          fontSize: 12
        },
        subtitle: {
          name: '100%',
          color: '#4D4D4D',
          fontSize: 28
        },
        series: [{
          data: 100,
          color: '#bf64ff',
        }, {
          data: 0,
          color: '#e0c0fc',
        }],
        disablePieStroke: true,
        width: 160,
        height: 160,
        dataLabel: false,
        legend: false
      });
    } else if (type === 2) {
      ringChart2 = new wxCharts({
        canvasId: canvasId,
        type: 'ring',
        extra: {
          ringWidth: 5,
          pie: {
            offsetAngle: -90
          }
        },
        title: {
          name: '步数',
          color: '#808080',
          fontSize: 12
        },
        subtitle: {
          name: '100%',
          color: '#4D4D4D',
          fontSize: 28
        },
        series: [{
          data: 100,
          color: '#49a0ff',
        }, {
          data: 0,
          color: '#a6d6fc',
        }],
        disablePieStroke: true,
        width: 160,
        height: 160,
        dataLabel: false,
        legend: false
      });
    } else if (type === 3) {
      ringChart3 = new wxCharts({
        canvasId: canvasId,
        type: 'ring',
        extra: {
          ringWidth: 5,
          pie: {
            offsetAngle: -225
          }
        },
        title: {
          name: '良好',
          color: '#4d4d4d',
          fontSize: 24
        },
        subtitle: {
          name: '睡眠',
          color: '#4d4d4d',
          fontSize: 24
        },
        series: [{
          data: 75,
          color: '#bf64ff',
        }, {
          data: 25,
          color: '#ffffff',
        }],
        disablePieStroke: true,
        width: 160,
        height: 160,
        dataLabel: false,
        legend: false
      });
    }
    setTimeout(() => {
      ringChart1.stopAnimation();
      ringChart2.stopAnimation();
      ringChart3.stopAnimation();
    }, 500);
  },
  updateEcharts: function(type, value) {
    if (type === 1) {
      ringChart1.updateData({
        subtitle: {
          name: value.high + '分',
          color: '#4D4D4D',
          fontSize: 28
        },
        series: [{
          data: value.high,
          color: '#bf64ff',
        }, {
          data: value.low,
          color: '#e0c0fc',
        }],
      });
    } else if (type === 2) {
      ringChart2.updateData({
        subtitle: {
          name: value.high + '%',
          color: '#4D4D4D',
          fontSize: 28
        },
        series: [{
          data: value.high,
          color: '#49a0ff',
        }, {
          data: value.low,
          color: '#a6d6fc',
        }],
      })
    } else if (type === 3) {
      ringChart3.updateData({
        title: {
          name: value.name,
          color: '#808080',
          fontSize: 24
        },
        // subtitle: {
        //   name: '睡眠' + value.name,
        //   color: '#4d4d4d',
        //   fontSize: 24
        // },
      })
    }

  },
  //点击环形图进入健康详情页面
  touchHandler: function(e) {
    let healthType = e.target.id
    let imei = this.data.imei
    let toMemberPhone = this.data.toMemberPhone
    wx.navigateTo({
      url: 'health-data/index?imei=' + imei + '&healthType=' + healthType + '&toMemberPhone=' + toMemberPhone
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this
    if (that.data.imei === '') {
      wx.showToast({
        title: '请先绑定设备',
        icon: 'none',
        duration: app.globalData.duration
      });
      wx.stopPullDownRefresh({
        complete(res) {
          that.setData({
            refresh: ''
          })
        }
      })
    } else {
      let refresh = 1
      that.getPageInfo(that.data.imei, that.data.toMemberPhone, that.data.toMemberId, refresh);
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showToast({
      title: '到底了...',
      icon: 'success',
      duration: 2000
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})