var app = getApp()
const config = require('../../../utils/config.js')

Page({
  data: {
    disable: false,
    time: '获取验证码',
    userInfo: [],
    toMemberId: '',
    showAvatarModalStatus: false,
    showNameModalStatus: false,
    showCertificationMoadlstatus: false,
    infoType: '',
    newValue: '',
    smsCode: '',
    imgRight: app.globalData.imgServer + 'more/icon/right.png',
    imgDots: app.globalData.imgServer + 'more/icon/dots.png'
  },
  // 关闭切换头像 modal
  hideAvatarModal: function() {
    this.setData({
      showAvatarModalStatus: false
    })
  },
  // 点击头像,获取头像id，在发送换头像请求时使用
  onClickAvatar: function(e) {
    // this.setData({
    //   showAvatarModalStatus: true,
    //   infoType: e.currentTarget.dataset.id
    // })
    wx.showToast({
      title: '暂不支持更换头像',
      icon:'none',
      duration:app.globalData.duration
    })
  },
  // 调用相机接口
  usingCamera: function() {
    let that = this
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: function(res) {
        let tempFilesSize = res.tempFiles[0].size;
        if (tempFilesSize <= 5000000) {
          let filePath = res.tempFilePaths[0];
          that.uploadImg(filePath)
          that.setData({
            showAvatarModalStatus: false
          })
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
  // 调用相册换头像
  usingAlbum: function() {
    let that = this
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: function(res) {
        let tempFilesSize = res.tempFiles[0].size;
        if (tempFilesSize <= 5000000) {
          let filePath = res.tempFilePaths[0];
          that.uploadImg(filePath)
          that.setData({
            showAvatarModalStatus: false
          })
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
  uploadImg: function(filePath) {
    let that = this
    wx.uploadFile({
      url: app.globalData.uploadHost + '/health/file/upload',
      filePath: filePath,
      name: 'file',
      success(res) {
        let json = JSON.parse(res.data)
        let newValue = json.data
        let userId = app.globalData.userId
        let infoType = that.data.infoType
        that.updateInfo(userId, newValue, infoType)
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
  // 关闭换昵称 modal
  hideNameModal: function() {
    this.setData({
      showNameModalStatus: false
    })
  },
  // 点击昵称，获得昵称 id
  toGetNickNameId: function(e) {
    this.setData({
      showNameModalStatus: true,
      infoType: e.currentTarget.dataset.id
    })
  },
  // 获取用户输入的昵称
  toGetNewName: function(e) {
    this.setData({
      newValue: e.detail.value
    })
  },

  // 点击换昵称
  onClickChangeName: function() {
    let userId = this.data.toMemberId
    let infoType = this.data.infoType
    let newValue = this.data.newValue
    if(newValue === ''){
      newValue = this.data.userInfo.nickName
    }
    this.updateInfo(userId, newValue, infoType)
    this.setData({
      showNameModalStatus: false
    })
  },

  // 关闭或者展示身份认证 modal
  hideCertificationMoadl: function() {
    this.setData({
      showCertificationMoadlstatus: false
    })
  },
  doCertification: function() {
    if (this.data.userInfo.isCertification === '已认证') {
      this.setData({
        showCertificationMoadlstatus: true
      })
    } else {
      let msgCode = this.data.smsCode
      wx.navigateTo({
        url: 'user-info-identification/index?msgCode=' + msgCode,
      })
    }
  },
  // 请求验证码
  onClickGetSms: function() {
    let that = this
    app.http.postRequest(config.postSms, {
      phone: that.data.userInfo.phone
    }, {
      'Content-Type': 'application/json'
    }).then(res => {
      if (res.data.code == 'GN00000') {
        wx.showToast({
          title: '发送成功！',
        });
        that.setData({
          disable: true
        })
        let currentTime = 59
        let interval = setInterval(function() {
          that.setData({
            time: (currentTime - 1) + " " + '秒'
          })
          currentTime--;
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              time: '重新获取',
              currentTime: 60,
              disable: false
            })
          }
        }, 1000)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  // 获取用户输入的验证码
  toGetUserSms: function(e) {
    this.setData({
      smsCode: e.detail.value
    })
  },
  // 点击进行身份认证，跳转到上传身份证正反面页面
  goCertification: function() {
    if (!this.data.smsCode == '') {
      this.setData({
        showCertificationMoadlstatus: false
      })
      let msgCode = this.data.smsCode
      wx.navigateTo({
        url: 'user-info-identification/index?msgCode=' + msgCode,
      })
    } else {
      wx.showToast({
        title: '请输入验证码！',
        icon: 'none',
        duration: app.globalData.duration
      })
    }

  },
  // 跳转到个人信息明细页面
  gonToDetail: function() {
    wx.navigateTo({
      url: 'user-info-detail/index?toMemberId=' + this.data.toMemberId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userId = app.globalData.userId
    this.setData({
      toMemberId: userId
    });
    if (options.toMemberId) {
      userId = options.toMemberId
      this.setData({
        toMemberId: options.toMemberId
      });
    };
    this.getPageInfo(userId)
  },
  // 获取个人信息页面内容
  getPageInfo: function(userId) {
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
    app.http.postRequest(config.postGetSimpleInfo, {
      userId: userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          userInfo: res.data.data
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
  updateInfo: function(userId, newValue, infoType) {
    let that = this
    app.http.postRequest(config.postMyInfo, {
      userId: userId,
      infoType: infoType,
      newValue: newValue
    }).then(res => {
      if (res.data.code == 'GN00000') {
        wx.showToast({
          title: '修改成功！',
        });
        that.getPageInfo(userId)
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