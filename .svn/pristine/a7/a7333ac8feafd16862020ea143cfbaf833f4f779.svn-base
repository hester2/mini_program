var app = getApp()
const config = require('../../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imei: '',
    priPhone: '',
    priName: '',
    formMemberPhone: '',
    userId: app.globalData.userId,
    relation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取页面初始数据
  onLoad: function(options) {
    wx.hideToast()
    this.setData({
      imei: options.imei,
      priPhone: options.priPhone,
      priName: options.priName
    })

  },
  // 获取用户输入的手机号
  enterFromMemberPhone: function(e) {
    this.setData({
      formMemberPhone: e.detail.value
    })
  },
  // 获取用户输入的关系
  enterRelation: function(e) {
    let length = this.data.relation
    if (length > 5) {
      wx.showToast({
        title: '最多只能输入6个字符！',
        icon: 'none',
        duration: app.globalData.duration
      })
    }else{
      this.setData({
        relation: e.detail.value
      })
    }
  },

  // 点击关注设备
  onClickToFollow: function() {
    if (this.data.formMemberPhone.length < 11) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let index = this.data.index
      let userId = app.globalData.userId
      let phone = this.data.formMemberPhone
      let relation = this.data.relation
      let imei = this.data.imei
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
      app.http.postRequest(config.postFollowUrl, {
        userId: userId,
        phone: phone,
        relation: relation,
        imei: imei
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          wx.showToast({
            title: '绑定成功！',
            duration: app.globalData.duration
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 2
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })

    }
  }

})