//index.js
//获取应用实例
var app = getApp()
const config = require('../../utils/config.js')

var QQMapWX = require('../../utils/qqmap-wx-jssdk');

var qqmapsdk;
Page({
  data: {
    province: '',
    city: '',
    district:'',
    latitude: '',
    longitude: '',
    imgServer: app.globalData.imgPath,
    list: [
      'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2852083094,372235004&fm=26&gp=0.jpg',
      'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3595140452,1077552905&fm=26&gp=0.jpg',
      'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3008142408,2229729459&fm=26&gp=0.jpg'],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    starIndex4: 4,
    hiddenName: true,
    hiddenNamet:false,
    hide:true,
    hiden:false,
    hiddenHo:false,
    // 
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    answer:[],//精品推荐
    adept:'',
    doctor:[],
    sectionList:[],
    carousel:[],
    title_j:[],
    recom:[],
    areaCode:''
  },
  stopTouchMove() {
    return false;
  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'Z2GBZ-6SQ3V-BNTPZ-UYHGV-DAXPQ-ZGBFO' //这里自己的key秘钥进行填充
    });
        // console.log(app.globalData.location);
        // tengxun
    wx.request({
      url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=39.984154,116.307490&key=Z2GBZ-6SQ3V-BNTPZ-UYHGV-DAXPQ-ZGBFO',
      data: {
      },
      success: (res) => {
        var that=this
        // console.log(res)
        console.log(res.data.result.ad_info.adcode)
        that.setData({
          areaCode:res.data.result.ad_info.adcode
        })
      },
      fail: () => {
      },
      complete: () => {
      }
    })
    app.http.postRequest(config.getHotDoctor, {
      userId: app.globalData.userId,
      areaCode: this.data.areaCode
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          adept: res.data.data.adept,
          doctor: res.data.data.doctorList

        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getEightSectionList, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          sectionList: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getCarousel, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          carousel: res.data.data.imgs
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getYiHaoNotice, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          title_j: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getHotGoods, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          recom: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  handleClick(e){
    wx.navigateTo({
      url: '../chat/doctor-home/index?daId=' + e.currentTarget.dataset.id,
    })
  },
  handleCop(){
    wx.navigateTo({
      url: 'visits/index',
    })
  },
  handleScan(){
    wx.navigateTo({
      url: '../health/scan-type/index',
    })
  },
  handleCancle(){
    this.setData({
      hiddenName: true,
      hiddenNamet: false,
      hide: true,
      hiden: false,
      hiddenHo: false,
    })
  },
inputFocus(){
  this.setData({
    hiddenName: false,
    hiddenNamet: true,
    hide:false,
    hiden:true,
    hiddenHo:true,
  })
},

  searchNow(){
    this.setData({
      hiddenName: true,
      hiddenNamet: false,
      hide: true,
      hiden: false,
      hiddenHo: false,
    })
  },

  clearKey: function () {
    this.setData({
      hiddenName: true
    })
    this.setData({
      searchClose: false,
      searchKey: ""
    });
  },

  onShow: function () {
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        // console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        // console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
        vm.setData({
          province: province,
          city: city,
          district: district,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  }
})
