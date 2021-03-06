var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    code: '',
    imgScan: app.globalData.imgServer + 'health/icon/scan.png',
  },
  // 获取用户输入的手机号
  enterCode: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  doScan: function() {
    let that = this
    wx.scanCode({
      success: (res) => {
        that.setData({
          code: res.result
        });
        wx.showToast({
          title: '扫码成功！',
          duration: app.globalData.duration
        })
      },
      fail: (err) => {
        wx.showToast({
          title: '扫码失败，请尝试手动输入',
          icon: 'none',
          duration: app.globalData.duration
        })
      },
      complete: (res) => {

      },
    });
  },
  doBing: function() {
    let that = this
    if (that.data.code === '') {
      wx.showToast({
        title: '请输入设备号',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
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
      app.http.postRequest(config.postIMEIUrl, {
        userId: app.globalData.userId,
        imei: that.data.code 
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === "GN00000") {
          let priPhone = res.data.data.priPhone;
          let priName = res.data.data.priName;
          // 设备已被绑定，跳转到关注页面
          wx.navigateTo({
            url: '../follow-device/index?priPhone=' + priPhone + "&imei=" + that.data.code + "&priName=" + priName,
          });
        } else if (res.data.code === "GN70002") {
          // 设备未绑定，跳转到绑定页面
          wx.navigateTo({
            url: '../scan/index?imei=' + that.data.code,
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          });
        };
      });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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