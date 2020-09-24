var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    touch_end:'',
    touch_start:'',
    imgs:[],
    inputValue: '',
    fileIds: [],
    contacts: '请输入联系手机/微信',
    content: '请详细表述在使用中遇到的问题及截图',
    imgCamera: app.globalData.imgServer + 'more/icon/camera.png',
  },
  // 获取用户输入的手机号
  enterFeedbackPhone: function(e) {
    this.setData({
      contacts: e.detail.value
    })
  },
  // 获取用户输入内容
  enterFeedbackContent: function(e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 获取用户传的图片
  usingAlbum: function() {
    if (this.data.imgs.length === 5) {
      wx.showToast({
        title: '最多上传5张图片！',
        icon: 'none',
        duration:app.globalData.duration
      })
    } else {
      let that = this
      wx.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: function(res) {
          let tempFilesSize = res.tempFiles[0].size;
          if (tempFilesSize <= 5000000) {
            let filePath = res.tempFilePaths[0];
            that.uploadImg(filePath)
          } else {
            wx.showToast({
              title: '上传图片大小不能大于5M！',
              icon: 'none',
              duration: app.globalData.duration
            })
          }
        },
      })
    }

  },
  //上传图片到服务器
  uploadImg: function (filePath) {
    let that = this
    wx.uploadFile({
      url: app.globalData.uploadHost + '/health/file/upload',
      filePath: filePath,
      name: 'file',
      success(res) {
        let json = JSON.parse(res.data)
        let img = app.globalData.uploadHost + '/health/file/download?filepath=' + json.data
        let filePath = json.data
        let newfileIds = that.data.fileIds
        let newImgs = that.data.imgs
        newfileIds.push(filePath)
        newImgs.push(img)
        that.setData({
          fileIds: newfileIds,
          imgs: newImgs
        });
      },
      fail(res) {
        wx.showToast({
          title: '图片上传失败，请稍后重试！',
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  doImgWay: function () {
    let that = this;
    //触摸时间距离页面打开的毫秒数
    let touchTime = that.data.touch_end - that.data.touch_start;
    if (touchTime > 350) {
      that.deleteImg()
    } else {
      that.showImgs()
    }
  },
  //按下事件开始
  mytouchstart: function (e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp,
      currentImg: e.target.dataset.imgsrc,
      index: e.target.dataset.id
    })
  },
  //按下事件结束
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  },
  showImgs: function() {
    wx.previewImage({
      current: this.data.currentImg, // 当前显示图片的http链接
      urls: this.data.imgs // 需要预览的图片http链接列表
    })
  },
  //删除图片
  deleteImg: function() {
    let that = this
    let index = this.data.index
    let currentImg = this.data.currentImg
    let imgs = that.data.imgs
    let fileIds = that.data.fileIds
    wx.showModal({
      title: '提示',
      content: '是否删除该图片？',
      success(res) {
        if (res.confirm) {
          imgs.splice(index, 1);
          fileIds.splice(index, 1);
          that.setData({
            fileIds: fileIds,
            imgs:imgs
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  doUpLoadFeedback: function() {
    if (this.data.contacts === '请输入联系手机/微信') {
      wx.showToast({
        title: '请输入联系方式！',
        icon: 'none',
        duration:app.globalData.duration
      })
    } else if (this.data.contacts.length < 11) {
      wx.showToast({
        title: '格式错误！',
        icon: 'none',
        duration: app.globalData.duration
      })
    }else if (this.data.content === '请详细表述在使用中遇到的问题及截图') {
      wx.showToast({
        title: '请输入反馈内容！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else if (this.data.fileIds.length === 0) {
      wx.showToast({
        title: '请上传反馈图片！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let userId = app.globalData.userId
      let contacts = this.data.contacts
      let content = this.data.content
      let imgs = this.data.fileIds
      if (wx.showLoading) {
        wx.showLoading({
          title: '上传中...',
          mask: true
        });
      } else {
        wx.showToast({
          title: '上传中...',
          icon: 'loading',
          mask: true,
          duration: 10000
        });
      };
      app.http.postRequest(config.postHelp, {
        userId: userId,
        contacts: contacts,
        content: content,
        imgs: imgs
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          wx.showToast({
            title: '上传成功',
            duration:app.globalData.duration
          });
          this.setData({
            fileIds: [],
            contacts: '请输入联系手机/微信',
            content: '请详细表述在使用中遇到的问题及截图',
            inputValue: '',
            imgs:[]
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration:app.globalData.duration
          })
        }
      })
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