// pages/health/scan/add/index.js
var app = getApp()
const config = require('../../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gerden: ['请选择', '男', '女',],
    gerdenIndex: 0,
    names: '',
    ages: '',
    idcard: ''
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gerdenIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  formSubmit() {
    app.http.postRequest(config.postAddFamily, {
      userId: app.globalData.userId,
      baseInfo: {
        name: this.data.names,
        sex: this.data.gerden[this.data.gerdenIndex],
        age: this.data.ages,
        idCardNum: this.data.idcard,
        avatar: '',
        phone: '',
        certificationType: '',
        maritalState: ''
      },
      healthInfo: {
        height: '',
        weight: '',
        bmi: '',
        occupation: '',
        bloodType: '',
        pastMedicalHistory: '',
        allergicHistory: '',
        fertilityStatus: ''
      }
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data)

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  handleName(e) {
    this.setData({
      names: e.detail.value
    })
  },
  handleAge(e) {
    this.setData({
      ages: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})