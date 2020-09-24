var app = getApp()
const config = require('../../../utils/config.js')

Page({
  data: {
    currentTab: '0',
    warnings: [],
    notifications: [],
    imgWarning: app.globalData.imgServer + 'more/icon/warning-on.png'
  },

  // 点击报警提醒获取数据
  goWarning: function() {
    this.setData({
      currentTab: '0'
    })
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
    app.http.postRequest(config.postGetAdvice, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          warnings: res.data.data
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
  // 点击系统公告获取响应数据
  goAnnouncement: function() {
    this.setData({
      currentTab: '1'
    })
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
    app.http.postRequest(config.postMemberGetNotice, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          notifications: res.data.data
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
  showModal: function() {
    wx.showModal({
      title: '提示',
      content: '功能开发中，敬请期待！',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取报警提醒数据
  onLoad: function(options) {
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
    app.http.postRequest(config.postGetAdvice, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          warnings: res.data.data
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
});