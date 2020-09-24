var app = getApp()
const config = require('../../../../../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: '',
    currentImg: '',
    inputValue: '',
    imei: '',
    recordType: '',
    toMemberId: '',
    toMemberPhone: '',
    title: '',
    date: '请选择日期：',
    color:false,
    content: '',
    fileIds: [],
    imgs: [],
    currentTab: '',
    imgCamera: app.globalData.imgServer + 'more/icon/camera.png'
  },
  // 获取用户输入的title
  doGetTitle: function(e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 获取用户输入的日期
  doGetDate: function(e) {
    this.setData({
      date: e.detail.value,
      color:true
    })
  },
  // 获取用户输入的内容
  doGetContent: function(e) {
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
        duration: app.globalData.duration
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
  uploadImg: function(filePath) {
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
  showImgs: function(e) {
    wx.previewImage({
      current: this.data.currentImg, // 当前显示图片的http链接
      urls: this.data.imgs // 需要预览的图片http链接列表
    })
  },
  doImgWay: function() {
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
  mytouchstart: function(e) {
    let that = this;
    that.setData({
      touch_start: e.timeStamp,
      currentImg: e.target.dataset.imgsrc,
      index: e.target.dataset.id
    })
  },
  //按下事件结束
  mytouchend: function(e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  },
  //删除图片
  deleteImg: function(e) {
    let that = this
    let index = that.data.index
    let currentImg = that.data.currentImg
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
            imgs: imgs
          })
        } else if (res.cancel) {

        }
      }
    })
  },

  // 切换到其他模块
  goOtherPart: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id,
      recordType: e.currentTarget.dataset.id,
      date: '请选择日期：',
      fileIds: [],
      imgs: [],
      color: false,
      content: '',
      title: '',
      inputValue:''
    })
  },

  // 添加医疗记录
  doAddMedicalRecord: function() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定添加该记录？',
      success(res) {
        if (res.confirm) {
          that.addMedicalRecord()
        } else if (res.cancel) {

        }
      }
    })
  },
  addMedicalRecord: function() {
    let userId = app.globalData.userId
    let imei = this.data.imei
    let recordType = this.data.recordType
    let toMemberId = this.data.toMemberId
    let toMemberPhone = this.data.toMemberPhone
    let title = this.data.title
    let date = this.data.date
    if (date === '请选择日期：') {
      date = ''
    }
    let content = this.data.content
    let fileIds = this.data.fileIds
    app.http.postRequest(config.postAddMedicalRecord, {
      userId: userId,
      imei: imei,
      recordType: recordType,
      title: title,
      date: date,
      content: content,
      toMemberPhone: toMemberPhone,
      fileIds: fileIds
    }).then(res => {
      if (res.data.code == 'GN00000') {
        wx.showToast({
          title: '添加成功！',
          duration: app.globalData.duration
        });
        this.setData({
          inputValue: '',
          date: '请选择日期：',
          fileIds: [],
          imgs: [],
          color: false
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
  onLoad: function(options) {
    this.setData({
      imei: options.imei,
      recordType: options.recordType,
      toMemberId: options.toMemberId,
      toMemberPhone: options.toMemberPhone,
      currentTab: options.recordType
    })
  }
})