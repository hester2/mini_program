const config = require('../../../utils/config.js')
var app = getApp()
Page({
  data: {
    showUserList: false,
    change: false,
    myDevices: [],
    myWatches: [],
    toMemberId: '',
    toMemberPhone: '',
    imei: '',
    light: false,
    single: true,
    vista: false,
    showChangeMapStatus: false,
    showMenu: false,
    showDetailModal: false,
    mapStatus: '1',
    imgHideUser: app.globalData.imgServer + 'health/icon/hide.png',
    imgChangeUser: app.globalData.imgServer + 'health/icon/open.png',
    imgMenu: app.globalData.imgServer + 'health/icon/menu.png',
    imgLocation: app.globalData.imgServer + 'health/icon/location.png',
    imgRefresh: app.globalData.imgServer + 'health/icon/refresh.png',
    imgLightUnselected: app.globalData.imgServer + 'health/icon/light-unselected.png',
    imgLight: app.globalData.imgServer + 'health/icon/light.png',
    imgDots: app.globalData.imgServer + 'health/icon/dots.png',
    imgSingle: app.globalData.imgServer + 'health/icon/single.png',
    imgSingleUnseletced: app.globalData.imgServer + 'health/icon/single-unseletced.png',
    imgLoactionsUn: app.globalData.imgServer + 'health/icon/loactions-unselected.png',
    imgLocations: app.globalData.imgServer + 'health/icon/locations.png',
    imgVistaUn: app.globalData.imgServer + 'health/icon/vista-unseletced.png',
    imgVista: app.globalData.imgServer + 'health/icon/vista.png',
    imgSpeed: app.globalData.imgServer + 'health/icon/speed.png',
    imgDirection: app.globalData.imgServer + 'health/icon/direction.png',
    imgClock: app.globalData.imgServer + 'health/icon/clock.png',
    imgStatus: app.globalData.imgServer + 'health/icon/status.png',
    imgAddress: app.globalData.imgServer + 'health/icon/address.png',
    imgBattery: app.globalData.imgServer + 'health/icon/battery.png',
    imgChange: app.globalData.imgServer + 'health/icon/change.png',
    imgIcon1: app.globalData.imgServer + 'health/icon/icon1.png',
    imgIcon2: app.globalData.imgServer + 'health/icon/icon2.png',
    imgIcon3: app.globalData.imgServer + 'health/icon/icon3.png',
    imgIcon4: app.globalData.imgServer + 'health/icon/icon4.png',
    scale: 14,
    centre: {
      longitude: '116.4',
      latitude: '39.9'
    },
    details: {

    },
    enableSatellite: false,
    enableTraffic: false,
    enable3D: false,
    markers: [{
      iconPath: "",
      id: 0,
      longitude: '',
      latitude: '',
      width: 20,
      height: 30,
      label: {
        content: '',
        color: '#ffffff',
        fontSize: 14,
        bgColor: '#49a0ff',
        padding: 4,
        textAlign: 'center',
        borderRadius: 12,
        anchorX: -25,
        anchorY: 4
      }
    }],
    status: '',
    myWatch: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imei: options.imei,
      toMemberPhone: options.toMemberPhone,
      toMemberId: options.toMemberId,
      myWatch: options.myWatch
    });
    if (options.change) {
      this.setData({
        change: options.change,
      });
    }
    this.mapCtx = wx.createMapContext('map');
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    this.getPageInfo(this.data.imei, this.data.toMemberPhone)
  },
  getPageInfo: function(imei, toMemberPhone, refresh) {
    let that = this
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
    app.http.postRequest(config.postGetCurLocation, {
      userId: app.globalData.userId,
      imei: imei,
      toMemberPhone: toMemberPhone,
      webOrMini: 2
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        if (refresh === true) {
          wx.showToast({
            title: '刷新成功！',
            duration: app.globalData.duration
          })
        }
        that.setData({
          ["markers[0].latitude"]: res.data.data.latitude,
          ["markers[0].longitude"]: res.data.data.longitude,
          ["markers[0].label.content"]: res.data.data.name,
          ["markers[0].iconPath"]: app.globalData.imgServer + 'health/icon/centre.png',
          ["centre.latitude"]: res.data.data.latitude,
          ["centre.longitude"]: res.data.data.longitude,
          status: res.data.data.status,
          details: res.data.data,
          showDetailModal: true
        });
        let battery = parseInt(res.data.data.battery)
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
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        });
        if (res.data.data) {
          that.setData({
            ["centre.latitude"]: res.data.data.latitude,
            ["centre.longitude"]: res.data.data.longitude,
            status: res.data.data.status,
            showDetailModal: false
          })
        }

      };
    })
  },
  //切换菜单状态
  showMenu: function() {
    this.setData({
      showMenu: true
    })
  },
  //切换详情状态
  markertap: function(e) {
    if (this.data.showDetailModal === true) {
      this.setData({
        showDetailModal: false
      })
    } else {
      this.setData({
        showDetailModal: true
      })
    }
  },
  //立即定位
  getLocation: function() {
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      if (this.data.status === '在线') {
        let that = this
        app.http.postRequest(config.postLocation, {
          userId: app.globalData.userId,
          imei: that.data.imei,
          toMemberPhone: that.data.toMemberPhone
        }).then(res => {
          if (res.data.code === 'GN00000') {
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
  //刷新定位
  refreshLocation: function() {
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      this.getPageInfo(this.data.imei, this.data.toMemberPhone, true)
    }
  },
  //轨迹回放
  getPlayback: function() {
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      wx.navigateTo({
        url: 'time/index?imei=' + this.data.imei + '&toMemberPhone=' + this.data.toMemberPhone,
      })
    }
    this.setData({
      showMenu: false
    })
  },
  getDetail: function() {
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      wx.navigateTo({
        url: 'user-info/index?toMemberId=' + this.data.toMemberId + '&currentTab=' + 0 + '&toMemberPhone=' + this.data.toMemberPhone + '&imei=' + this.data.imei + '&myWatch=' + this.data.myWatch + '&toMemberName=' + this.data.details.name,
      })
    }
    this.setData({
      showMenu: false
    })
  },
  goInstruct: function() {
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      wx.navigateTo({
        url: 'instruct/index?imei=' + this.data.imei,
      })
    }
    this.setData({
      showMenu: false
    })
  },
  hideMenu: function() {
    this.setData({
      showMenu: false
    })
  },
  //切换地图状态
  showMapChoices: function() {
    this.setData({
      showChangeMapStatus: true
    })
  },
  closeMapChoices: function() {
    this.setData({
      showChangeMapStatus: false
    })
  },
  onClickHide: function() {
    this.setData({
      showChangeMapStatus: false,
      showUserList: false,
      showChangeMapStatus: false
    })
  },
  onMapStatus: function() {
    this.setData({
      enableSatellite: false,
      showChangeMapStatus: false,
      enable3D: false,
      mapStatus: '1'
    })
  },
  onSatelliteStatus: function() {
    this.setData({
      enable3D: false,
      enableSatellite: true,
      showChangeMapStatus: false,
      mapStatus: '2'
    })
  },
  onThreeDStatus: function() {
    wx.showModal({
      title: '提示！',
      content: '功能开发中，敬请期待！',
    })
    // this.setData({
    //   showChangeMapStatus: false,
    //   mapStatus: '3',
    //   enableSatellite: false,
    //   enable3D: true
    // })
  },
  //切换状态
  changeLightStatus: function() {
    if (this.data.light === true) {
      this.setData({
        light: false,
        enableTraffic: false
      })
    } else if (this.data.light === false) {
      this.setData({
        light: true,
        enableTraffic: true
      })
    }
  },
  showSingle: function() {
    this.setData({
      single: true
    })
  },
  showLocations: function() {
    wx.showModal({
      title: '提示！',
      content: '功能开发中，敬请期待！',
    })
  },
  changeVistaStatus: function() {
    wx.showModal({
      title: '提示！',
      content: '功能开发中，敬请期待！',
    })
  },
  //切换用户
  // 获取该账号我的家人列表，用于切换设备
  onclickGetMyFamily: function() {
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      app.http.postRequest(config.postGetMyAllFamily, {
        userId: app.globalData.userId
      }).then(res => {
        if (res.data.code === 'GN00000') {
          this.setData({
            myDevices: res.data.data.myDevices,
            myWatches: res.data.data.myWatches,
            showUserList: true
          });
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
  // 切换设备，获取该设备健康数据
  onClickChangeDevice: function(e) {
    let index = e.currentTarget.dataset.id
    let imei = this.data.myDevices[index].imei
    let toMemberId = this.data.myDevices[index].toMemberId
    let toMemberPhone = this.data.myDevices[index].toMemberPhone
    this.setData({
      imei: imei,
      toMemberPhone: toMemberPhone,
      toMemberId: toMemberId,
      myWatch: 1
    })
    this.getPageInfo(imei, toMemberPhone)
  },
  // 切换我关注的设备，获取该设备健康数据
  onClickChangeWatch: function(e) {
    let index = e.currentTarget.dataset.id
    let imei = this.data.myWatches[index].imei
    let toMemberId = this.data.myWatches[index].toMemberId
    let toMemberPhone = this.data.myWatches[index].toMemberPhone
    this.setData({
      imei: imei,
      toMemberPhone: toMemberPhone,
      toMemberId: toMemberId,
      myWatch: 2
    })
    this.getPageInfo(imei, toMemberPhone)
  },
})