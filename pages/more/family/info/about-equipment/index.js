var app = getApp()
const config = require('../../../../../utils/config.js')


Page({
  data: {
    myWatch: '',
    toMemberName: '',
    toMemberPhone: '',
    toMemberId: '',
    imei: '',
    deviceInfos: [],
    membersInfo: [],
    currentTab: '',
    imgTime: app.globalData.imgServer + 'more/icon/time.png',
    imgWatch: app.globalData.imgServer + 'more/icon/watch-small.png',
    imgBattery: app.globalData.imgServer + 'more/icon/battery.png',
    imgWatchBig: app.globalData.imgServer + 'more/family/about-device/device.png',
    imgPerson: app.globalData.imgServer + 'more/icon/person.png',
    imgPhone: app.globalData.imgServer + 'more/icon/phone.png',
    imgClock: app.globalData.imgServer + 'more/icon/clock.png',
    imgSetting: app.globalData.imgServer + 'more/icon/setting.png',
    imgAdd: app.globalData.imgServer + 'more/icon/add.png'
  },
  // 点击获取设备信息
  doGetDeviceInfo: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    let userId = app.globalData.userId
    let imei = this.data.imei
    let toMemberPhone = this.data.toMemberPhone
    this.getDeviceInfo(imei, toMemberPhone)
  },

  //获取成员管理信息
  doGetDeviceFollower: function(e) {
    if (this.data.myWatch === '1') {
      this.setData({
        currentTab: e.currentTarget.dataset.id
      })
      let userId = app.globalData.userId
      let imei = this.data.imei
      this.getMemberInfo(imei)
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
            fromMemberId: fromMemberId,
            toMemberPhone: toMemberPhone,
          }).then(res => {
            if (res.data.code === 'GN00000') {
              wx.showToast({
                title: '取消关注成功！',
                duration: app.globalData.duration
              });
              that.getMemberInfo(imei)
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
      let imei = this.data.imei
      let toMemberPhone = this.data.toMemberPhone
      let toMemberId = this.data.toMemberId
      let toMemberName = this.data.toMemberName
      wx.navigateTo({
        url: 'add-member/index?imei=' + imei + '&toMemberPhone=' + toMemberPhone + '&toMemberId=' + toMemberId + '&toMemberName=' + toMemberName,
      })
    } else {
      wx.showToast({
        title: '该设备不是您绑定的设备，暂无权限添加成员！',
        icon: 'none'
      })
    }
  },
  onShow: function() {
    if (this.data.currentTab == '0') {
      let imei = this.data.imei
      let toMemberPhone = this.data.toMemberPhone
      this.getDeviceInfo(imei, toMemberPhone)
    } else if (this.data.currentTab == '1') {
      let imei = this.data.imei
      this.getMemberInfo(imei)
    }
  },
  //登录关于设备页面获取设备信息
  onLoad: function(options) {
    this.setData({
      imei: options.imei,
      currentTab: options.currentTab,
      toMemberPhone: options.toMemberPhone,
      toMemberId: options.toMemberId,
      toMemberName: options.toMemberName
    });
    if (options.myWatch) {
      this.setData({
        myWatch: options.myWatch
      })
    }
  },
  getDeviceInfo: function(imei, toMemberPhone) {
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
    let userId = app.globalData.userId
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
  getMemberInfo: function(imei) {
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
});