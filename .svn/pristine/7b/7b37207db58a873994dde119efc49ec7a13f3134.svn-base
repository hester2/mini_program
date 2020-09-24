const config = require('../../../../utils/config.js')
var app = getApp()

Page({
  data: {
    lbsFilter: true,
    currentSpeed: '正常',
    speedStatus: false,
    toMemberPhone: '',
    polylinePoints: '',
    imei: '',
    showDetailModal: true,
    setInter: '',
    delay: 3000,
    makerIndex: 0,
    isPlay: false,
    imgTrackTime: app.globalData.imgServer + 'health/icon/trackTime.png',
    imgPlay: app.globalData.imgServer + 'health/icon/play.png',
    imgStop: app.globalData.imgServer + 'health/icon/stop.png',
    imgSpeed: app.globalData.imgServer + 'health/icon/speed.png',
    imgDirection: app.globalData.imgServer + 'health/icon/direction.png',
    imgClock: app.globalData.imgServer + 'health/icon/clock.png',
    imgStatus: app.globalData.imgServer + 'health/icon/status.png',
    imgAddress: app.globalData.imgServer + 'health/icon/address.png',
    imgBattery: app.globalData.imgServer + 'health/icon/high.png',
    time: {
      startTime: '',
      endTime: ''
    },
    centre: {
      longitude: '',
      latitude: ''
    },
    details: {},
    markers: [{
        iconPath: "",
        id: 0,
        longitude: '',
        latitude: '',
        width: 20,
        height: 30,
      },
      {
        iconPath: "",
        id: 1,
        longitude: '',
        latitude: '',
        width: 20,
        height: 30,
      },
      {
        iconPath: "",
        id: 2,
        longitude: '',
        latitude: '',
        width: 20,
        height: 20
      },

    ],
    polyline: [{
      points: [],
      color: "#49a0ff",
      width: 4
    }],
  },
  //切换信息详情状态
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
  //轨迹回放
  palyTrack: function() {
    if (this.data.polylinePoints) {
      let length = this.data.polylinePoints.length
      let detailsInfo = this.data.polylinePoints
      this.setData({
        isPlay: true
      })
      let that = this;
      //将计时器赋值给setInter
      if (that.data.makerIndex < length - 1) {
        that.data.setInter = setInterval(
          function() {
            let makerIndexNew = that.data.makerIndex + 1;
            if (makerIndexNew >= length - 1) {
              clearInterval(that.data.setInter)
              that.setData({
                isPlay: false
              })
            }
            let longitude = that.data.polyline[0].points[makerIndexNew].longitude
            let latitude = that.data.polyline[0].points[makerIndexNew].latitude
            that.setData({
              makerIndex: makerIndexNew,
              ["markers[2].longitude"]: longitude,
              ["markers[2].latitude"]: latitude,
              ["centre.longitude"]: longitude,
              ["centre.latitude"]: latitude,
              details: detailsInfo[makerIndexNew]
            });
            let battery = parseInt(detailsInfo[makerIndexNew].battery)
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
          }, that.data.delay);
        
      } else {
        that.setData({
          makerIndex: -1
        })
        that.data.setInter = setInterval(
          function() {
            let makerIndexNew = that.data.makerIndex + 1;
            if (makerIndexNew >= 5) {
              clearInterval(that.data.setInter)
            }
            let longitude = that.data.polyline[0].points[makerIndexNew].longitude
            let latitude = that.data.polyline[0].points[makerIndexNew].latitude
            that.setData({
              makerIndex: makerIndexNew,
              ["markers[2].longitude"]: longitude,
              ["markers[2].latitude"]: latitude,
              ["centre.longitude"]: longitude,
              ["centre.latitude"]: latitude
            });
          }, that.data.delay);
      }
    } else {
      wx.showToast({
        title: '该查询时间段无数据',
        icon: 'none',
        duration: app.globalData.duration
      });
    }
  },
  stopTrack: function() {
    //清除计时器  即清除setInter
    clearInterval(this.data.setInter)
    this.setData({
      isPlay: false
    })
  },
  //调速
  showSpeed: function() {
    this.setData({
      speedStatus: true
    })
  },
  inSlowSpeed: function() {
    this.setData({
      delay: 5000,
      currentSpeed: '慢速',
      speedStatus: false
    })
  },
  inNormalSpeed: function() {
    this.setData({
      delay: 3000,
      currentSpeed: '正常',
      speedStatus: false
    })
  },
  inFastSpeed: function() {
    this.setData({
      delay: 1000,
      currentSpeed: '快速',
      speedStatus: false
    })
  },
  //获取播放轨迹的时间段
  getTrackTime: function() {
    wx.redirectTo({
      url: '../time/index?imei=' + this.data.imei + '&toMemberPhone=' + this.data.toMemberPhone,
    })
  },
  // 获取初始数据
  onLoad: function(options) {
    this.setData({
      toMemberPhone: options.toMemberPhone,
      imei: options.imei,
      lbsFilter: options.lbsFilter,
      ["time.startTime"]: options.startTime,
      ["time.endTime"]: options.endTime
    })
    this.mapCtx = wx.createMapContext('trackMap');
  },
  onShow: function() {
    this.getPageInfo()
  },
  getPageInfo: function() {
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
    app.http.postRequest(config.postgetRangeLocation, {
      userId: app.globalData.userId,
      imei: that.data.imei,
      lbsFilter: that.data.lbsFilter,
      startTime: that.data.time.startTime,
      endTime: that.data.time.endTime,
      toMemberPhone: that.data.toMemberPhone,
      webOrMini: 2
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
          let length = res.data.data.point.length
          that.setData({
            ["polyline[0].points"]: res.data.data.track,
            polylinePoints: res.data.data.point,
            details: res.data.data.point[0],
            ["markers[0].longitude"]: res.data.data.point[0].longitude,
            ["markers[0].latitude"]: res.data.data.point[0].latitude,
            ["markers[0].iconPath"]: app.globalData.imgServer + 'health/icon/start.png',
            ["markers[1].longitude"]: res.data.data.point[length - 1].longitude,
            ["markers[1].latitude"]: res.data.data.point[length - 1].latitude,
            ["markers[1].iconPath"]: app.globalData.imgServer + 'health/icon/end.png',
            ["markers[2].longitude"]: res.data.data.point[0].longitude,
            ["markers[2].latitude"]: res.data.data.point[0].latitude,
            ["markers[2].iconPath"]: app.globalData.imgServer + 'health/icon/person.png',
            ["centre.longitude"]: res.data.data.point[0].longitude,
            ["centre.latitude"]: res.data.data.point[0].latitude,
            ["time.startTime"]: res.data.data.startTime,
            ["time.endTime"]: res.data.data.endTime
          });
        let battery = parseInt(res.data.data.point[0].battery)
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
        that.setData({
          showDetailModal:false,
          ["centre.longitude"]: res.data.data.longitude,
          ["centre.latitude"]: res.data.data.latitude,
        })
      }
    })
  }
})