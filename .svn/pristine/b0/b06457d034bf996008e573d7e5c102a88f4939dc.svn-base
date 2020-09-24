var app = getApp()
const config = require('../../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msgCode: '',
    frontFileId: '',
    blackFileId: '',
    imgIdOne: app.globalData.imgServer + 'more/icon/idcard-one.png',
    imgIdTwo: app.globalData.imgServer + 'more/icon/idcard-two.png'
  },
  // 上传身份证正面调用相机接口
  usingCameraForOne: function(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: function(res) {
        let tempFilesSize = res.tempFiles[0].size;
        if (tempFilesSize <= 5000000) {
          let filePath = res.tempFilePaths[0];
          that.uploadImg(filePath, id)
        } else {
          wx.showToast({
            title: '上传图片大小不能大于5M！',
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      },
    })
  },
  // 上传身份证反面调用相机接口
  usingCameraForTwo: function(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: function(res) {
        let tempFilesSize = res.tempFiles[0].size;
        if (tempFilesSize <= 5000000) {
          let filePath = res.tempFilePaths[0];
          that.uploadImg(filePath, id)
        } else {
          wx.showToast({
            title: '上传图片大小不能大于5M！',
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      },
    })
  },
  //上传图片到服务器
  uploadImg: function(filePath, id) {
    let that = this
    wx.uploadFile({
      url: app.globalData.uploadHost + '/health/file/upload',
      filePath: filePath,
      name: 'file',
      success(res) {
        let json = JSON.parse(res.data)
        let img = app.globalData.uploadHost + '/health/file/download?filepath=' + json.data
        let newValue = json.data
        if (id === '2') {
          that.setData({
            blackFileId: newValue,
            imgIdTwo: img
          })
        } else if (id === '1') {
          that.setData({
            frontFileId: newValue,
            imgIdOne: img,
          })

        }
      }
    })
  },
  // 上传身份证
  doUploadCard: function() {
    app.http.postRequest(config.postCertification, {
      userId: app.globalData.userId,
      frontFileId: this.data.frontFileId,
      blackFileId: this.data.blackFileId,
      msgCode: this.data.msgCode
    }).then(res => {
      if (res.data.code == 'GN00000') {
        wx.showToast({
            title: '上传成功！',
            duration: 5000
          }),
          wx.navigateBack({
            delta: 1
          })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 5000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.msgCode) {
      this.setData({
        msgCode: options.msgCode
      })
    }
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