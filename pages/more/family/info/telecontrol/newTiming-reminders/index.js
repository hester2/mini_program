var app = getApp()
const config = require('../../../../../../utils/config.js')
var RM = wx.getRecorderManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: 1,
        value: '周一'
      },
      {
        name: 2,
        value: '周二'
      },
      {
        name: 3,
        value: '周三'
      },
      {
        name: 4,
        value: '周四'
      },
      {
        name: 5,
        value: '周五'
      },
      {
        name: 6,
        value: '周六'
      },
      {
        name: 7,
        value: '周日'
      }
    ],
    showRegular: false,
    array: ['一键测量', '血压测量', '心率测量', '血糖测量', '血氧测量', '体温测量', '房颤测量'],
    objectArray: [{
        id: 0,
        name: '一键测量'
      },
      {
        id: 1,
        name: '血压测量'
      },
      {
        id: 2,
        name: '心率测量'
      },
      {
        id: 3,
        name: '血糖测量'
      },
      {
        id: 4,
        name: '血氧测量'
      },
      {
        id: 5,
        name: '体温测量'
      },
      {
        id: 6,
        name: '房颤测量'
      }
    ],
    index: 0,
    imei: '',
    clock: [],
    imgRight: app.globalData.imgServer + 'more/icon/right.png'
  },
  entertitle: function(e) {
    this.setData({
      ["clock.title"]: e.detail.value
    })
  },
  enterContent: function(e) {
    this.setData({
      ["clock.content"]: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      ["clock.content"]: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      ["clock.endDatetime"]: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      ["clock.nextDatetime"]: e.detail.value
    })
  },
  showRegular: function() {
    this.setData({
      showRegular: true
    })
  },
  hideRegularModal: function() {
    this.setData({
      showRegular: false
    })
  },
  //regular 选项
  checkboxChange: function(e) {
    let tmp = e.detail.value
    let a = tmp.join('')
    let i = 0
    let nameList = []
    for (i; i < tmp.length; i++) {
      let o = parseInt(tmp[i])
      o = o - 1
      let name = this.data.items[o].value
      nameList.push(name)
    }
    let b = nameList.join(' ')
    this.setData({
      ["clock.week"]: a,
      ["clock.weekName"]: b
    })
  },
  cancelRegular: function() {
    this.setData({
      ["clock.week"]: this.data.week
    });
    this.hideRegularModal()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imei: options.imei,
      ["clock.nextDatetime"]: '请选择时间',
      ["clock.endDatetime"]: '请选择结束日期',
      ["clock.week"]: '',
      ["clock.weekName"]: '请选择重复时间',
      showMeasure: true,
      ["clock.content"]: '一键测量',
    })
  },
  addTiming: function() {
    let that = this
    let content = this.data.clock.content
    app.http.postRequest(config.postAddClock, {
      userId: app.globalData.userId,
      imei: that.data.imei,
      clockType: '2',
      title: that.data.clock.title,
      content: content,
      nextDatetime: that.data.clock.nextDatetime,
      onOff: 1,
      week: that.data.clock.week,
      endDatetime: that.data.clock.endDatetime
    }).then(res => {
      if (res.data.code === 'GN00000') {
        wx.navigateBack({
          delta: 1
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