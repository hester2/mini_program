var app = getApp()
const config = require('../../../../utils/config.js')
const util = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toMemberPhone:'',
    imei: '',
    timeStartModal: false,
    timeEndModal: false,
    imgRight: app.globalData.imgServer + 'more/icon/right.png',
    isOpen: true,
    startTime: {
      'date': '',
      'time': '00:00'
    },
    endTime: {
      'date': '',
      'time': '23:59'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let date = util.formatTime(new Date());
    this.setData({
      imei: options.imei,
      toMemberPhone: options.toMemberPhone,
      ["startTime.date"]:date,
      ["endTime.date"]:date
    })
  },
  //选定时间
  bindStartDateChange: function(e) {
    this.setData({
      ["startTime.date"]: e.detail.value
    })
  },
  bindStartTimeChange: function(e) {
    this.setData({
      ["startTime.time"]: e.detail.value
    })
  },
  bindEndDateChange: function(e) {
    this.setData({
      ["endTime.date"]: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    this.setData({
      ["endTime.time"]: e.detail.value
    })
  },
  //切换基站过滤
  changeSwitch: function() {
    if (this.data.isOpen === true) {
      this.setData({
        isOpen: false
      })
    } else if (this.data.isOpen === false) {
      this.setData({
        isOpen: true
      })
    }
  },
  //查询轨迹
  getPlayback: function() {
    let toMemberPhone = this.data.toMemberPhone
    let imei = this.data.imei
    let lbsFilter = this.data.isOpen
    let startTime = this.data.startTime.date + ' ' + this.data.startTime.time
    let endTime = this.data.endTime.date + ' ' + this.data.endTime.time
    wx.redirectTo({
      url: '../track/index?imei=' + imei + '&startTime=' + startTime + '&endTime=' + endTime + '&toMemberPhone=' + toMemberPhone + '&lbsFilter=' + lbsFilter,
    })
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