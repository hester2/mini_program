var app = getApp()
const config = require('../../../utils/config.js')
const util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */ 
  data: {
    scroll_height: 0,
    article: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 136
    });
    let id = options.id;
    this.getPageInfo(id);
  },
  getPageInfo: function(id) {
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
    app.http.postRequest(config.postGetSingleNews, {
      userId: app.globalData.userId,
      id: id,
      type: '1'
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      };
      if (res.data.code === 'GN00000') {
        let articles = res.data.data
        let time = articles.createTime
        time = util.formatTimeTwo(time, 'Y/M/D h:m')
        articles.createTime = time
        that.setData({
          article: res.data.data
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

  }
})