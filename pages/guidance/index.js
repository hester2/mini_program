var app = getApp()
const config = require('../../utils/config.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: 3,
    content: [{
      "imgUrl": "https://health-mini-1255700284.cos.ap-chengdu.myqcloud.com/common/others/guidance.png",
      "timer": 3,
      "id": 0,
      "title": "专业守护，让爱久远",
      "url": "http://pic37.nipic.com/20140113/8800276_184927469000_2.png"
    }, {
      "imgUrl": "https://health-mini-1255700284.cos.ap-chengdu.myqcloud.com/common/others/guidance.png",
      "timer": 3,
      "id": 1,
      "title": "专业守护，让爱久远",
      "url": "http://pic37.nipic.com/20140113/8800276_184927469000_2.png"
    }, {
      "imgUrl": "https://health-mini-1255700284.cos.ap-chengdu.myqcloud.com/common/others/guidance.png",
      "timer": 3,
      "id": 2,
      "title": "专业守护，让爱久远",
      "url": "http://pic37.nipic.com/20140113/8800276_184927469000_2.png"
    }, {
      "imgUrl": "https://health-mini-1255700284.cos.ap-chengdu.myqcloud.com/common/others/guidance.png",
      "timer": 3,
      "id": 3,
      "title": "专业守护，让爱久远",
      "url": "http://pic37.nipic.com/20140113/8800276_184927469000_2.png"
    }],
    winheight: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    let that = this
    //欢迎页自适应屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winheight: res.windowHeight
        });
      },
    });
    that.getPageInfo();
  },

  // 获取页面初始数据
  getPageInfo: function() {
    let that = this;
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
    app.http.postRequest(config.postGetGuidancePage, {}).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        //未实现轮播效果，暂取第一张欢迎页面图展示
        that.setData({
          content: res.data.data.contents[0]
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        });
      };
    });
  },
  //调用微信登录接口，获取登录 code
  getCode: function() {
    let that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.goNextPage(res.code)
        } else {
          wx.showToast({
            title: res.errMsg,
            icon: 'none'
          })
        };
      },
      fail(res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        });
      },
    });
  },
// 获取用户注册状态,页面跳转
  goNextPage: function(code) {
    let that = this;
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
    app.http.postRequest(config.postLogin, {
      code: code
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        app.globalData.userId = res.data.data.userId;
        app.globalData.token = res.data.data.token;
        if (res.data.data.token) {
          wx.setStorageSync('token', res.data.data.token)
        };
        app.globalData.login = true;
        wx.showToast({
          title: '登录成功',
          duration: app.globalData.duration
        });
        setTimeout(function() {
          wx.switchTab({
            url: '../home/index',
          });
        }, 500);
      } else if (res.data.code === 'GN60007') {
        app.globalData.openId = res.data.data.openId
        wx.showToast({
          title: '未登录',
          icon: 'none',
          duration: app.globalData.duration
        });
        setTimeout(function() {
          wx.switchTab({
            url: '../home/index',
          });
        }, 500);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        });
      };
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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

  },
})