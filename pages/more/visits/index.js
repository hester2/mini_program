var _self;
var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    currentIndex: 0,
    filterHeight: 600,
    currentPageIndex:0,
    doctor:[]
  },
  onLoad: function (options) {
    _self=this
    _self.setData({
      currentIndex: options.userId
    })
    app.http.postRequest(config.getOrderByType, {
      userId: app.globalData.userId,
      orderType: this.data.currentPageIndex
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res)
        this.setData({
          doctor:res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getOrderByType, {
      userId: app.globalData.userId,
      orderType: this.data.currentPageIndex
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res)
        this.setData({
          doctor: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getOrderByType, {
      userId: app.globalData.userId,
      orderType: this.data.currentPageIndex
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res)
        this.setData({
          doctor: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getOrderByType, {
      userId: app.globalData.userId,
      orderType: this.data.currentPageIndex
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res)
        this.setData({
          doctor: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getOrderByType, {
      userId: app.globalData.userId,
      orderType: this.data.currentPageIndex
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res)
        this.setData({
          doctor: res.data.data
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
  handleCancel(e){
    var orderId=e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确认取消订单',
      success: function (sm) {
        if (sm.confirm) {
          app.http.postRequest(config.postCancelOrder, {
            userId: app.globalData.userId,
            orderId: orderId,
          }).then(res => {
            if (wx.hideLoading) {
              wx.hideLoading();
            } else {
              wx.hideToast();
            }
            if (res.data.code === 'GN00000') {
              console.log(res.data)
              wx.showToast({
                title: '取消成功'
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: app.globalData.duration
              })
            }
          })
        } else if (sm.cancel) { }
      }
    })
  },
  onReady: function () {
    _self = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowHeight = res.windowHeight;
        //获取头部标题高度
        wx.createSelectorQuery().select('#grace-filter-header').fields({
          size: true,
        }, function (res) {
          //计算得出滚动区域的高度
          var sHeight = (windowHeight - res.height);
          _self.setData({
            filterHeight: sHeight + 'px'
          });
          console.log(_self.data.filterHeight)
        }).exec();
      }
    });
  },
  hanldleMy(){
   wx.navigateTo({
     url: 'my-evaluation/index',
   })
  },
  //swiper切换时会调用
  pagechange: function (e) {
    app.http.postRequest(config.getOrderByType, {
      userId: app.globalData.userId,
      orderType: e.detail.current
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res)
        this.setData({
          doctor: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    this.setData({
      currentPageIndex : e.currentTarget.dataset.idx
    })
    console.log(this.data.currentPageIndex)
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  hanldeClick(e){
    console.log(e)
    var commentState = e.currentTarget.dataset.name.commentState
    var id = e.currentTarget.dataset.name.doctorInfo.id
    var orderId = e.currentTarget.dataset.name.orderId
    if (commentState=='0'){
      wx.navigateTo({
        url: 'evaluation/index?daId=' + id + '&orderId=' + orderId,
      })
    } else if (commentState=='1'){
      wx.navigateTo({
        url: 'my-evaluation/index?daId=' + orderId,
      })
    }
  }
})