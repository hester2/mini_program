var app = getApp()
const config = require('../../../../../../utils/config.js')
var RM = wx.getRecorderManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    touch_end: '',
    touch_start: '',
    showDeleteRecord: false,
    recordTime: "00:00",
    play: 1,
    items: [{
        name: 1,
        value: '周一'
      },
      {
        name: 2,
        value: '周二'
      },
      {
        name: 3,
        value: '周三'
      },
      {
        name: 4,
        value: '周四'
      },
      {
        name: 5,
        value: '周五'
      },
      {
        name: 6,
        value: '周六'
      },
      {
        name: 7,
        value: '周日'
      }
    ],
    showRegular: false,
    timer: '',
    countDownNum: 10,
    countDownNum2: '',
    buttons: false,
    title: '点击录音',
    recordStatus: false,
    record: false,
    recordFile: '',
    // imgRecord: app.globalData.imgServer + 'more/icon/recordOut.png',
    imgRecord: app.globalData.imgServer + 'more/icon/recordIn.png',
    imgRecordStart: app.globalData.imgServer + 'more/icon/recordStart.png',
    imgRecordmiddle: app.globalData.imgServer + 'more/icon/recordmiddle.png',
    imgRecordEnd: app.globalData.imgServer + 'more/icon/recordEnd.png',
    imgRecordFile: app.globalData.imgServer + 'more/icon/recordFile.png',
    imgRecordPlay: app.globalData.imgServer + 'more/icon/recordPlay.png',
    clock: [],
    imgRight: app.globalData.imgServer + 'more/icon/right.png',
    id: '',
    innerAudioContext: ''
  },
  entertitle: function(e) {
    this.setData({
      ["clock.title"]: e.detail.value
    })
  },
  enterContent: function(e) {
    this.setData({
      ["clock.content"]: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      ["clock.content"]: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      ["clock.endDatetime"]: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      ["clock.nextDatetime"]: e.detail.value
    })
  },
  showRegular: function() {
    this.setData({
      showRegular: true
    })
  },
  hideRegularModal: function() {
    this.setData({
      showRegular: false
    })
  },
  //regular 选项
  checkboxChange: function(e) {
    let tmp = e.detail.value
    let a = tmp.join('')
    let i = 0
    let nameList = []
    for (i; i < tmp.length; i++) {
      let o = parseInt(tmp[i])
      o = o - 1
      let name = this.data.items[o].value
      nameList.push(name)
    }
    let b = nameList.join(' ')
    this.setData({
      ["clock.week"]: a,
      ["clock.weekName"]: b
    })
  },
  cancelRegular: function() {
    this.setData({
      ["clock.week"]: this.data.week
    });
    this.hideRegularModal()
  },
  //录音相关
  hideModal: function() {
    this.setData({
      paly: 1,
      recordStatus: false,
      buttons: false,
      title: '点击录音',
      // imgRecord: app.globalData.imgServer + 'more/icon/recordOut.png',
    })
  },
  showRecord: function() {
    this.setData({
      recordStatus: true,
      play: 1,
      // imgRecord: app.globalData.imgServer + 'more/icon/recordIn.png',
      imgRecordFile: app.globalData.imgServer + 'more/icon/recordFile.png',
    });
    if (this.data.innerAudioContext) {
      this.data.innerAudioContext.destroy();
    }
  },
  doRecord: function() {
    let that = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          wx.showToast({
            title: '未获取到录音权限，请删除小程序后重新进入，并完成录音功能授权',
            icon: 'none',
            duration: app.globalData.duration
          })
        } else {
          let option = {
            duration: 10000,
            format: 'mp3',
          }
          RM.start(option);
          RM.onStart(() => {})
          that.setData({
            play: 2,
            title: '00:' + 10
          })
          that.countDown()
        }
      },
    });
  },
  countDown: function() {
    let that = this;
    let countDownNum = that.data.countDownNum;
    that.setData({
      timer: setInterval(function() {
        countDownNum--;
        let time = countDownNum
        let time2 = 10 - countDownNum
        if (time < 10) {
          time = '0' + time
        }
        if (time2 < 10) {
          time2 = '0' + time2
        }
        that.setData({
          recordTime: '00:' + time2,
          title: '00:' + time,
          countDownNum: countDownNum,
          countDownNum2: 10 - countDownNum
        })
        if (countDownNum === 0) {
          that.stopRecord();
          clearInterval(that.data.timer);
        }
      }, 1000)
    })
  },
  stopRecord: function() {
    let that = this
    clearInterval(that.data.timer);
    RM.stop();
    RM.onStop((res) => {
      that.setData({
        recordFile: res.tempFilePath,
      });
    })
    that.setData({
      title: that.data.recordTime,
      play: 3,
      buttons: true,
    })
  },
  completeRecord: function() {
    let that = this
    let a = that.data.innerAudioContext
    if (a) {
      a.destroy()
    }
    let innerAudioContext = wx.createInnerAudioContext();
    that.setData({
      innerAudioContext: innerAudioContext
    });
    innerAudioContext.src = that.data.recordFile
    innerAudioContext.autoplay = true;
    innerAudioContext.onPlay(() => {
      that.setData({
        play: 4,
      });
    });
    innerAudioContext.onEnded(() => {
      clearInterval(that.data.timer);
      that.setData({
        title: that.data.recordTime,
        play: 3,
      })
      innerAudioContext.destroy()
    })
    innerAudioContext.onError((res) => {
      wx.showToast({
        title: '语音播放失败，请稍后重试！',
        icon: 'none',
        duration: app.globalData.duration
      })
    });
    let countDownNum2 = that.data.countDownNum2;
    that.setData({
      timer: setInterval(function() {
        countDownNum2--;
        let time = countDownNum2
        if (time < 10) {
          time = '0' + time
        }
        that.setData({
          title: '00:' + time,
        })
        if (countDownNum2 < 0) {
          clearInterval(that.data.timer);
          that.setData({
            title: that.data.recordTime,
            play: 3,
          })
        }
      }, 1000)
    })
  },
  reStartRecord: function() {
    this.setData({
      play: 1,
      buttons: false,
      title: '点击录音',
      recordFile: '',
      countDownNum: 10
    });
    clearInterval(this.data.timer);
    if (this.data.innerAudioContext) {
      this.data.innerAudioContext.destroy();
    }
  },
  confirmRecord: function() {
    clearInterval(this.data.timer);
    if (this.data.innerAudioContext) {
      this.data.innerAudioContext.destroy();
    }
    this.uploadRecord()
  },
  //上传录音到库
  uploadRecord: function() {
    let that = this
    if (that.data.countDownNum > 9) {
      wx.showToast({
        title: '录音时间少于1s,请重试',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      wx.uploadFile({
        url: config.postUploadVoiceForAlarm,
        filePath: that.data.recordFile,
        name: 'file',
        formData: {
          'userId': app.globalData.userId,
          'imei': that.data.imei,
          'file': that.data.recordFileh,
          'actionType': 3
        },
        header: {
          'Content-Type': 'application/json',
          'clientType': 'wx',
          'token': wx.getStorageSync('token')
        },
        success(res) {
          let json = JSON.parse(res.data)
          if (json.code === 'GN00000') {
            that.setData({
              contentType: 1,
              recordStatus: false,
              buttons: false,
              title: '点击录音',
              record: true,
              // imgRecord: app.globalData.imgServer + 'more/icon/recordOut.png',
              id: json.data,
              countDownNum:10,
              countDownNum2:''
            })
          } else {
            wx.showToast({
              title: json.msg,
              icon: 'none',
              duration: app.globalData.duration
            })
          }
        },
        fail(res) {
          wx.showToast({
            title: '语音上传失败，请稍后重试！',
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    }

  },
  doRecordWay: function() {
    let that = this;
    //触摸时间距离页面打开的毫秒数
    let touchTime = that.data.touch_end - that.data.touch_start;
    if (touchTime > 350) {
      that.showDeleteRecord()
    } else {
      that.doListenRecord()
    }
  },
  //按下事件开始
  mytouchstart: function(e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //按下事件结束
  mytouchend: function(e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  },
  doListenRecord: function() {
    let that = this
    let a = that.data.innerAudioContext
    if (a) {
      a.destroy()
    }
    let innerAudioContext = wx.createInnerAudioContext();
    that.setData({
      innerAudioContext: innerAudioContext
    });
    innerAudioContext.src = that.data.recordFile
    innerAudioContext.autoplay = true;
    innerAudioContext.onPlay(() => {
      that.setData({
        imgRecordFile: app.globalData.imgServer + 'health/icon/me.gif'
      });
    });
    innerAudioContext.onEnded(() => {
      that.setData({
        imgRecordFile: app.globalData.imgServer + 'more/icon/recordFile.png',
      });
      innerAudioContext.destroy()
    })
    innerAudioContext.onError((res) => {
      wx.showToast({
        title: '语音播放失败，请稍后重试！',
        icon: 'none',
        duration: app.globalData.duration
      })
    });
  },
  showDeleteRecord: function() {
    this.setData({
      showDeleteRecord: true
    })
  },
  hideDeleteRecord: function() {
    this.setData({
      showDeleteRecord: false
    })
  },
  deleteRecord: function() {
    this.setData({
      // imgRecord: app.globalData.imgServer + 'more/icon/recordOut.png',
      contentType: '',
      showDeleteRecord: false,
      recordFile: '',
      record: false
    });
    wx.showToast({
      title: '删除录音成功！',
      duration: app.globalData.duration
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
      },
    });
    that.setData({
      imei: options.imei,
      ["clock.nextDatetime"]: '请选择时间',
      ["clock.endDatetime"]: '请选择结束日期',
      ["clock.week"]: '',
      ["clock.weekName"]: '请选择重复时间',
      ["clock.content"]: '请输入提醒内容',
    });
  },
  addTiming: function() {
    let that = this
    that.setData({
      imgRecordFile: app.globalData.imgServer + 'more/icon/recordFile.png',
    });
    if (that.data.innerAudioContext) {
      that.data.innerAudioContext.destroy()
    }
    if (that.data.id) {
      app.http.postRequest(config.postAddClock, {
        userId: app.globalData.userId,
        imei: that.data.imei,
        clockType: '1',
        title: that.data.clock.title,
        // content: that.data.clock.content,
        nextDatetime: that.data.clock.nextDatetime,
        onOff: 1,
        voiceSerial: that.data.id,
        week: that.data.clock.week,
        endDatetime: that.data.clock.endDatetime
      }).then(res => {
        if (res.data.code === 'GN00000') {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    } else {
      wx.showToast({
        title: '请输入提醒内容',
        icon: 'none',
        duration: app.globalData.duration
      })
    }

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})