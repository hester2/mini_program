var app = getApp()
const config = require('../../../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['1', '3', '5', '10', '15', '20', '30', '45', '60', '90', '120', '180'],
    objectArray: [{
        id: 0,
        name: '1'
      },
      {
        id: 1,
        name: '3'
      },
      {
        id: 2,
        name: '5'
      },
      {
        id: 3,
        name: '10'
      },
      {
        id: 4,
        name: '15 '
      },
      {
        id: 5,
        name: '20'
      },
      {
        id: 6,
        name: '30'
      },
      {
        id: 7,
        name: '45'
      },
      {
        id: 8,
        name: '60'
      },
      {
        id: 9,
        name: '90'
      },
      {
        id: 10,
        name: '120'
      },
      {
        id: 11,
        name: '180'
      }
    ],
    index: 0,
    imei: '',
    workPatternModal: false,
    workType: '1',
    locationFrequencyModal: false,
    isOpen1: true,
    isOpen2: false,
    isOpen3: false,
    imgRight: app.globalData.imgServer + 'more/icon/right.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imei: options.imei,
    })
  },


  //切换设置modal状态
  showModal: function(e) {
    let id = e.currentTarget.dataset.id
    if (id === '1') {
      this.setData({
        locationFrequencyModal: true
      })
    } else if (id === '2') {
      this.setData({
        workPatternModal: true
      });
      this.getWorkPattern()
    }

  },
  hideModal: function() {
    this.setData({
      locationFrequencyModal: false,
      workPatternModal: false
    })

  },
  //获取定位周期
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  //发送修改定位周期指令设置
  doLocationFrequency: function() {
    let that = this
    let imei = that.data.imei
    let userId = app.globalData.userId
    let frequency = that.data.array[this.data.index]
    app.http.postRequest(config.postSetDeviceLocationFrequency, {
      imei: imei,
      userId: userId,
      frequency: frequency
    }).then(res => {
      if (res.data.code === 'GN00000') {
        let serial = res.data.data.serial
        wx.showToast({
          title: '下发指令中...',
          icon: 'none',
          duration: app.globalData.duration
        })
        let count = 0,
          timerLocationFrequency = 0;
        (function(a, b) {
          timerLocationFrequency = setInterval(function() {
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
                  clearInterval(timerLocationFrequency)
                } else {
                  count++
                }
                if (count > 20) {
                  clearInterval(timerLocationFrequency)
                  wx.showModal({
                    title: '提示',
                    content: '指令下发失败！',
                  });
                }
              } else {
                clearInterval(timerLocationFrequency)
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: app.globalData.duration
                });
              }
            })
          }, 3000);
        })(count, timerLocationFrequency);
      } else {
        let errmsg = res.data.msg
        that.showFail(errmsg)
      }
    });

    that.hideModal()
  },
  //获取工作模式
  getWorkPattern: function() {
    let that = this
    app.http.postRequest(config.postQueryWorkPattern, {
      imei: that.data.imei
    }).then(res => {
      if (res.data.code === 'GN00000') {
        if (res.data.workType == 1) {
          that.setData({
            isOpen1: true,
            isOpen2: false,
            isOpen3: false
          })
        } else if (res.data.workType == 2) {
          that.setData({
            isOpen1: false,
            isOpen2: true,
            isOpen3: false
          })
        } else if (res.data.workType == 3) {
          that.setData({
            isOpen1: false,
            isOpen2: false,
            isOpen3: true
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
  //切换工作模式开关状态
  changeSwitch: function(e) {
    let id = e.currentTarget.dataset.id
    if (id === '1') {
      this.setData({
        isOpen1: true,
        isOpen2: false,
        isOpen3: false
      })
    } else if (id === '2') {
      this.setData({
        isOpen1: false,
        isOpen2: true,
        isOpen3: false
      })
    } else if (id === '3') {
      this.setData({
        isOpen1: false,
        isOpen2: false,
        isOpen3: true
      })
    };
    this.setData({
      workType: id
    })
  },

  //发送工作模式指令
  doWorkPattern: function() {
    let that = this
    let imei = that.data.imei
    let userId = app.globalData.userId
    let workType = this.data.workType
    app.http.postRequest(config.postSetDeviceWorkPattern, {
      imei: imei,
      userId: userId,
      workType: workType
    }).then(res => {
      if (res.data.code == 'GN00000') {
        let serial = res.data.data.serial
        wx.showToast({
          title: '下发指令中...',
          icon: 'none',
          duration: app.globalData.duration
        })
        let count = 0,
          timerWorkPattern = 0;
        (function(a, b) {
          timerWorkPattern = setInterval(function() {
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
                  clearInterval(timerWorkPattern)
                } else {
                  count++
                }
                if (count > 20) {
                  clearInterval(timerWorkPattern)
                  wx.showModal({
                    title: '提示',
                    content: '指令下发失败！',
                  });
                }
              } else {
                clearInterval(timerWorkPattern)
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: app.globalData.duration
                });
              }
            })
          }, 3000);
        })(count, timerWorkPattern);
      } else {
        let errmsg = res.data.msg
        that.showFail(errmsg)
      }
    });

    that.hideModal()
  },
  //立即定位指令发送
  showLocationModal: function() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '向设备发送立即定位指令？',
      success(res) {
        if (res.confirm) {
          that.doLocation()
        } else if (res.cancel) {}
      }
    })

  },
  doLocation: function() {
    let that = this
    let imei = that.data.imei
    let userId = app.globalData.userId
    app.http.postRequest(config.postLocation, {
      imei: imei,
      userId: userId
    }).then(res => {
      if (res.data.code == 'GN00000') {
        let serial = res.data.data.serial
        wx.showToast({
          title: '下发指令中...',
          icon: 'none',
          duration: app.globalData.duration
        })
        let count = 0,
          timerLocation = 0;
        (function(a, b) {
          timerLocation = setInterval(function() {
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
                  clearInterval(timerLocation)
                } else {
                  count++
                }
                if (count > 20) {
                  clearInterval(timerLocation)
                  wx.showModal({
                    title: '提示',
                    content: '指令下发失败！',
                  });
                }
              } else {
                clearInterval(timerLocation)
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: app.globalData.duration
                });
              }
            })
          }, 3000);
        })(count, timerLocation);

      } else {
        let errmsg = res.data.msg
        that.showFail(errmsg)
      }
    });
  },
  //远程关机指令
  showShutdownModal: function() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '向设备发送关机指令？',
      success(res) {
        if (res.confirm) {
          that.doShutdown()
        } else if (res.cancel) {}
      }
    })
  },
  doShutdown: function() {
    let that = this
    let imei = that.data.imei
    let userId = app.globalData.userId
    app.http.postRequest(config.postShutdown, {
      imei: imei,
      userId: userId
    }).then(res => {
      if (res.data.code == 'GN00000') {
        let serial = res.data.data.serial
        wx.showToast({
          title: '下发指令中...',
          icon: 'none',
          duration: app.globalData.duration
        })
        let count = 0,
          timerShutdown = 0;
        (function(a, b) {
          timerShutdown = setInterval(function() {
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
                  clearInterval(timerShutdown)
                } else {
                  count++
                }
                if (count > 20) {
                  clearInterval(timerShutdown)
                  wx.showModal({
                    title: '提示',
                    content: '指令下发失败！',
                  });
                }
              } else {
                clearInterval(timerShutdown)
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: app.globalData.duration
                });
              }
            })
          }, 3000);
        })(count, timerShutdown);
      } else {
        let errmsg = res.data.msg
        that.showFail(errmsg)
      }
    });
  },
  //远程重启指令
  showRebootModal: function() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '向设备发送重启指令？',
      success(res) {
        if (res.confirm) {
          that.doReboot()
        } else if (res.cancel) {}
      }
    })
  },
  doReboot: function() {
    let that = this
    let imei = that.data.imei
    let userId = app.globalData.userId
    app.http.postRequest(config.postReboot, {
      imei: imei,
      userId: userId
    }).then(res => {
      if (res.data.code == 'GN00000') {
        let serial = res.data.data.serial
        wx.showToast({
          title: '下发指令中...',
          icon: 'none',
          duration: app.globalData.duration
        })
        let count = 0,
          timerReboot = 0;
        (function(a, b) {
          timerReboot = setInterval(function() {
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
                  clearInterval(timerReboot)
                } else {
                  count++
                }
                if (count > 20) {
                  clearInterval(timerReboot)
                  wx.showModal({
                    title: '提示',
                    content: '指令下发失败！',
                  });
                }
              } else {
                clearInterval(timerReboot)
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: app.globalData.duration
                });
              }
            })
          }, 3000);
        })(count, timerReboot);
      } else {
        let errmsg = res.data.msg
        that.showFail(errmsg)
      }
    });

  },
  //指令下发成功显示
  showFail: function(errmsg) {
    wx.showToast({
      title: errmsg,
      icon: 'none',
      duration: app.globalData.duration
    })
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