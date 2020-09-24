var app = getApp()
const config = require('../../../utils/config.js');
const util = require('../../../utils/util.js')
var RM = wx.getRecorderManager();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    userData: [],
    imei: '',
    toMemberId: '',
    playImg1: app.globalData.imgServer + 'health/icon/11.png',
    playImg2: app.globalData.imgServer + 'health/icon/21.png',
    playImg11: app.globalData.imgServer + 'health/icon/me.gif',
    playImg21: app.globalData.imgServer + 'health/icon/others.gif',
    receiveImg: 1,
    showModal: false,
    chat: '按住 说话',
    time: 10,
    timer: '',
    lastVoiceTime: '',
    toView: '',
    pageTimer: '',
    chatStore: '',
    doChat: true,
    imgId: '',
    type: '',
    innerAudioContext: ''

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.setNavigationBarTitle({
      title: options.nickName
    })
    let chatStore = JSON.stringify(options.imei)
    chatStore = 'imei' + chatStore
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.record']) {
          that.setData({
            doChat: false
          })
        }
      },

    })
    that.setData({
      imei: options.imei,
      userId: app.globalData.userId,
      chatStore: chatStore
    })
    wx.getSystemInfo({
      success: function(res) {
        let _o = res.windowHeight - 100
        that.setData({
          height: _o
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getPageInfo()
  },
  getPageInfo: function() {
    let that = this
    let data = wx.getStorageSync(that.data.imei);
    if (data) {
      let len = data.length - 1
      let lastVoiceTime = data[len].createTime
      for (let i = 0; i < data.length; i++) {
        let _o = data[i].createTime
        _o = util.formatTimeTwo(_o, 'Y-M-D h:m')
        data[i].createTime = _o
      }
      that.setData({
        lastVoiceTime: lastVoiceTime,
        toView: 'id' + len,
        userData: data
      })
    } else {
      app.http.postRequest(config.postQueryAllVoice, {
        imei: that.data.imei,
      }).then(res => {
        if (res.data.code === 'GN00000') {
          let _a = res.data.data
          wx.setStorageSync(that.data.imei, _a)
          if (_a.length > 0) {
            let len = _a.length - 1
            let lastVoiceTime = _a[len].createTime
            for (let i = 0; i < _a.length; i++) {
              let _o = _a[i].createTime
              _o = util.formatTimeTwo(_o, 'Y-M-D h:m')
              _a[i].createTime = _o
            }
            that.setData({
              lastVoiceTime: lastVoiceTime,
              toView: 'id' + len,
              userData: _a
            });
          } else {}

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    }

  },
  playchat: function(e) {
    let that = this
    let a = that.data.innerAudioContext
    if (a) {
      a.destroy()
    }
    let index = e.currentTarget.dataset.index
    let id = that.data.userData[index].id
    id = JSON.stringify(id)
    let type = that.data.userData[index].type
    let mark = type + id
    let data = wx.getStorageSync(that.data.chatStore)
    if (data) {
      if (data[mark]) {
        let innerAudioContext = wx.createInnerAudioContext();
        that.setData({
          innerAudioContext: innerAudioContext
        })
        innerAudioContext.autoplay = true;
        innerAudioContext.src = data[mark];
        innerAudioContext.onPlay(() => {
          that.setData({
            imgId: id,
            type: type
          });
        });
        innerAudioContext.onEnded(() => {
          that.setData({
            imgId: '',
            type: ''
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
      } else {
        that.doChat(id, index, mark, type)
      }
    } else {
      that.doChat(id, index, mark, type)
    }
  },
  doChat: function(id, index, mark, type) {
    let that = this;
    wx.downloadFile({
      url: 'https://health-mini.xmgoldnet.com/device/downloadVoice?imei=' + that.data.imei + '&voiceId=' + id + '&type=' + that.data.userData[index].type,
      header: {
        'Content-Type': 'application/json',
        'clientType': 'wx',
        'token': wx.getStorageSync('token')
      },
      success(res) {
        let obj = wx.getStorageSync(that.data.chatStore)
        if (obj) {
          obj[mark] = res.tempFilePath;
        } else {
          obj = {}
          obj[mark] = res.tempFilePath;
        }
        wx.setStorageSync(that.data.chatStore, obj)
        let innerAudioContext = wx.createInnerAudioContext();
        that.setData({
          innerAudioContext: innerAudioContext
        })
        innerAudioContext.autoplay = true;
        innerAudioContext.src = res.tempFilePath;
        innerAudioContext.onPlay(() => {
          that.setData({
            imgId: id,
            type: type
          });
        });
        innerAudioContext.onEnded(() => {
          that.setData({
            imgId: '',
            type: ''
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
      fail(res) {
        wx.showToast({
          title: '语音下载失败，请稍后重试！',
          icon: 'none',
          duration: app.globalData.duration
        })
      },
    })
  },
  //按下事件录音开始
  startChat: function(e) {
    this.setData({
      imgId: '',
      type: ''
    })
    let a = this.data.innerAudioContext
    if (a) {
      a.destroy()
    }
    if (this.data.doChat === false) {
      wx.showToast({
        title: '未获取到录音权限，请删除小程序后重新进入，并完成录音功能授权',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let that = this;
      that.setData({
        showModal: true,
        chat: '松开 结束'
      });
      let option = {
        duration: 10000,
        format: 'mp3',
      }
      RM.start(option);
      RM.onStart(() => {})
      that.countDown()
    }
  },
  countDown: function() {
    let that = this;
    let countDownNum = that.data.time;
    that.setData({
      timer: setInterval(function() {
        countDownNum--;
        let time = countDownNum
        if (time < 10) {
          time = '0' + time
        }
        that.setData({
          time: time,
        })
        if (countDownNum === 0) {
          that.endChat()
        }
      }, 1000)
    })
  },
  //按下事件录音结束
  endChat: function(e) {
    if (this.data.doChat === false) {
      wx.showToast({
        title: '未获取到录音权限，请删除小程序后重新进入，并完成录音功能授权',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let that = this;
      clearInterval(that.data.timer);
      let time = Number(that.data.time)
      if (time > 9) {
        RM.stop();
        RM.onStop((res) => {});
        wx.showToast({
          title: '录音时间少于1s,请重试',
          icon: 'none',
          duration: app.globalData.duration
        })
        that.setData({
          showModal: false,
          chat: '按住 说话',
          time: 10
        })
      } else {
        RM.stop(time);
        RM.onStop((res) => {
          wx.showToast({
            title: '语音上传中...',
            icon: 'none',
            duration: app.globalData.duration
          })
          wx.uploadFile({
            url: config.postUpload,
            filePath: res.tempFilePath,
            name: 'file',
            formData: {
              'userId': app.globalData.userId,
              'imei': that.data.imei,
              'file': res.tempFilePath,
              'actionType': 1
            },
            header: {
              'Content-Type': 'application/json',
              'clientType': 'wx',
              'token': wx.getStorageSync('token')
            },
            success(res) {
              let json = JSON.parse(res.data)
              if (json.code === 'GN00000') {
              } else {
                wx.showToast({
                  title: json.msg,
                  icon: 'none',
                  duration: app.globalData.duration
                })
              }
            }
          })
        });
        that.setData({
          showModal: false,
          chat: '按住 说话',
          time: 10
        })
      }
    }
  },
  updatePage: function() {
    //只刷新当前上传的语音到列表里面
    let that = this
    app.http.postRequest(config.postQueryAllVoice, {
      imei: that.data.imei,
      lastVoiceTime: that.data.lastVoiceTime
    }).then(res => {
      if (res.data.code === 'GN00000') {
        if (res.data.data.length > 0) {
          let data = wx.getStorageSync(that.data.imei);
          let _o = res.data.data
          let len = _o.length - 1
          let lastVoiceTime = _o[len].createTime
          for (let i = 0; i < _o.length; i++) {
            data.push(_o[i])
          }
          wx.setStorageSync(that.data.imei, data)
          let _q = that.data.userData
          for (let i = 0; i < _o.length; i++) {
            _o[i].createTime = util.formatTimeTwo(_o[i].createTime, 'Y-M-D h:m')
            _q.push(_o[i])
          }
          let len2 = _q.length - 1
          that.setData({
            lastVoiceTime: lastVoiceTime,
            toView: 'id' + len2,
            userData: _q
          })
        } else {

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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this
    let pageTimer = setInterval(function() {
      that.updatePage();
    }, 5000)
    that.setData({
      pageTimer: pageTimer
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.data.pageTimer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.pageTimer)
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