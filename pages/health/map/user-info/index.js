var app = getApp()
const config = require('../../../../utils/config.js')


Page({
  data: {
    userInfo: [],
    toMemberId: '',
    deviceInfos: [],
    membersInfo: [],
    showAvatarModalStatus: false,
    showNameModalStatus: false,
    showCertificationMoadlstatus: false,
    infoType: '',
    phone: '',
    newValue: '',
    smsCode: '',
    toMemberPhone: '',
    imei: '',
    currentTab: '0',
    imgTime: app.globalData.imgServer + 'more/icon/time.png',
    imgWatch: app.globalData.imgServer + 'more/icon/watch-small.png',
    imgBattery: app.globalData.imgServer + 'more/icon/battery.png',
    imgWatchBig: app.globalData.imgServer + 'more/family/about-device/device.png',
    imgPerson: app.globalData.imgServer + 'more/icon/person.png',
    imgPhone: app.globalData.imgServer + 'more/icon/phone.png',
    imgClock: app.globalData.imgServer + 'more/icon/clock.png',
    imgSetting: app.globalData.imgServer + 'more/icon/setting.png',
    imgAdd: app.globalData.imgServer + 'more/icon/add.png',
    imgRight: app.globalData.imgServer + 'more/icon/right.png',
    imgDots: app.globalData.imgServer + 'more/icon/dots.png',
    myWatch: '',
    toMemberName:''
  },
  // 点击获取设备信息
  doGetDeviceInfo: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    let userId = app.globalData.userId
    let imei = this.data.imei
    let toMemberPhone = this.data.toMemberPhone
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
    app.http.postRequest(config.postGetDeviceInfo, {
      userId: userId,
      imei: imei,
      toMemberPhone: toMemberPhone
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          deviceInfos: res.data.data
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

  //获取成员管理信息
  doGetDeviceFollower: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    if (this.data.myWatch == 1) {
      let that = this
      let userId = app.globalData.userId
      let imei = that.data.imei
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
      app.http.postRequest(config.postGetDeviceFollower, {
        userId: userId,
        imei: imei
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          that.setData({
            membersInfo: res.data.data.members
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    } else {
      wx.showToast({
        title: '该设备不是您绑定的设备，暂无权限查看成员！',
        icon: 'none'
      })
    }


  },

  // 解绑成员
  doDeleteMember: function(e) {
    let that = this
    let index = e.currentTarget.dataset.id
    let imei = that.data.imei
    let fromMemberId = that.data.membersInfo[index].fromMemberId
    let toMemberPhone = that.data.membersInfo[index].toMemberPhone
    wx.showModal({
      title: '提示',
      content: '确定取消关注？',
      success(res) {
        if (res.confirm) {
          app.http.postRequest(config.postUnbinding, {
            imei: imei,
            // userId: userId,
            fromMemberId: fromMemberId,
            toMemberPhone: toMemberPhone,
          }).then(res => {
            if (res.data.code === 'GN00000') {
              wx.showToast({
                title: '取消关注成功！',
                duration: app.globalData.duration
              });
              that.getFollower(imei)
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: app.globalData.duration
              })
            }
          })
        } else if (res.cancel) {

        }
      }
    })

  },

  // 点击跳转到添加成员页面
  clickToAddMember: function() {
    if (this.data.myWatch === '1') {
      wx.navigateTo({
        url: '../../../more/family/info/about-equipment/add-member/index?imei=' + this.data.imei + '&toMemberPhone=' + this.data.toMemberPhone + '&toMemberId=' + this.data.toMemberId + '&toMemberName=' + this.data.toMemberName,
      })
    } else {
      wx.showToast({
        title: '该设备不是您绑定的设备，暂无权限添加成员！',
        icon: 'none'
      })
    }
  },
  doGetuserInfo: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    let toMemberId = this.data.toMemberId
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
      userId: toMemberId,
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
      title: '暂不支持更换头像！',
      icon: 'none',
      duration: app.globalData.duration
    })
  },
  // 调用相机接口
  usingCamera: function() {
    let that = this
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: function(res) {
        var tempFilesSize = res.tempFiles[0].size;
        if (tempFilesSize <= 5000000) {
          var filePath = res.tempFilePaths[0];
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
  },
  // 调用相册换头像
  usingAlbum: function() {
    let that = this
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: function(res) {
        var tempFilesSize = res.tempFiles[0].size;
        if (tempFilesSize <= 5000000) {
          var filePath = res.tempFilePaths[0];
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
  },
  uploadImg: function(filePath) {
    var that = this
    wx.uploadFile({
      url: app.globalData.uploadHost + '/health/file/upload',
      filePath: filePath,
      name: 'file',
      success(res) {
        var json = JSON.parse(res.data)
        var newValue = json.data
        var userId = app.globalData.userId
        var infoType = that.data.infoType
        app.http.postRequest(config.postMyInfo, {
          userId: app.globalData.userId,
          infoType: infoType,
          newValue: newValue
        }).then(res => {
          if (res.data.code === 'GN00000') {
            that.setData({
              showAvatarModalStatus: false
            })
            app.http.postRequest(config.postGetSimpleInfo, {
              userId: userId
            }).then(res => {
              if (res.data.code === 'GN00000') {
                that.setData({
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
          } else(wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          }))

        })
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
  onClickChangeAvatar: function() {
    let userId = app.globalData.userId
    let infoType = this.data.infoType
    let newValue = this.data.newValue
    app.http.postRequest(config.postMyInfo, {
      userId: userId,
      infoType: infoType,
      newValue: newValue
    }).then(res => {
      // 收到响应后重新请求个人信息页数据
      // 成功后将 modal 隐藏
      this.setData({
        showNameModalStatus: false
      })
      let userId = app.globalData.userId
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
    })
  },

  // 关闭或者展示身份认证 modal
  hideCertificationMoadl: function() {
    this.setData({
      showCertificationMoadlstatus: false
    })
  },
  showCertificationMoadl: function() {
    this.setData({
      showCertificationMoadlstatus: true
    })
  },
  // 点击获得验证码
  onClickGetSms: function() {
    let phone = this.data.userInfo.phone
    app.http.postRequest(config.postSms, {
      phone: phone
    }).then(res => {
      if (res.data.code === 'GN00000') {
        wx.showToast({
          title: '发送成功！',
          duration: app.globalData.duration
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
  // 获取用户输入的验证码
  toGetUserSms: function(e) {
    this.setData({
      smsCode: e.detail.value
    })
  },
  // 点击进行身份认证，跳转到上传身份证正反面页面
  doCertification: function() {
    this.setData({
      showCertificationMoadlstatus: false
    })
    let msgCode = this.data.smsCode
    wx.navigateTo({
      url: 'user-info-identification/index?msgCode=' + msgCode,
    })
  },
  // 跳转到个人信息明细页面
  gonToInfoDetail: function() {
    wx.navigateTo({
      url: '../../../more/user-info/user-info-detail/index?toMemberId=' + this.data.toMemberId,
    })
  },


  onLoad: function(options) {
    this.setData({
      imei: options.imei,
      currentTab: options.currentTab,
      toMemberPhone: options.toMemberPhone,
      toMemberId: options.toMemberId,
      myWatch: options.myWatch,
      toMemberName: options.toMemberName
    })
    if (options.currentTab == '0') {
      let userId = app.globalData.userId
      let imei = options.imei
      let toMemberPhone = options.toMemberPhone
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
      app.http.postRequest(config.postGetDeviceInfo, {
        userId: userId,
        imei: imei,
        toMemberPhone: toMemberPhone
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          this.setData({
            deviceInfos: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }

      })
    } else if (options.currentTab == '1') {
      let imei = options.imei
      this.getFollower(imei)
    }
  },
  getFollower: function (imei,){
    let userId = app.globalData.userId
    app.http.postRequest(config.postGetDeviceFollower, {
      userId: userId,
      imei: imei
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          membersInfo: res.data.data.members
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
})