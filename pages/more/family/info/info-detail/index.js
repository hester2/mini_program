var app = getApp()
const config = require('../../../../../utils/config.js')

Page({
  data: {
    toMemberId:'',
    infoType: '',
    newValue: '',
    baseInfo: [],
    healthInfo: []
  },
  // 获取信息标签id
  onClickGetId: function (e) {
    this.setData({
      infoType: e.currentTarget.dataset.id
    })
  },
  //获取修改后的信息、
  onClickGetNewInfo: function () {
    this.setData({
      newValue: e.detail.value
    })
  },
  // 修改个人信息
  doChangeInfo: function () {
    app.http.postRequest(config.postMyInfo, {
      userId: app.globalData.userId,
      infoType: this.data.infoType,
      newValue: this.data.newValue
    }).then(res => {
        if(res.data.code === 'GN00000'){
          wx.showToast({
            title: '修改成功！',
            duration:app.globalData.duration
          });
          let userId = this.data.toMemberId
          this.getPageInfo(userId)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration:app.globalData.duration
          })
        }
      })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '到底了...',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取信息明细页面内容
  onLoad: function (options) {
    this.setData({
      toMemberId: options.toMemberId
    })
    let userId = options.toMemberId
    this.getPageInfo(userId)
  },
  getPageInfo: function (userId){
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
    app.http.postRequest(config.postGetPersonalDetailData, {
      userId: userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          baseInfo: res.data.data.baseInfo,
          healthInfo: res.data.data.healthInfo
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  }
});