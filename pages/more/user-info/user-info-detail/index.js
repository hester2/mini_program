var app = getApp()
const config = require('../../../../utils/config.js')

Page({
  data: {
    update: '',
    modalStatus: false,
    toMemberId: '',
    infoType: '',
    newValue: '',
    userInfo: [],
    sex:false,
    array: ['女', '男'],
    objectArray: [
      {
        id: 1,
        name: '女'
      },
      {
        id: 2,
        name: '男'
      }
    ],
    index: 1,
  },
  hideModal: function() {
    this.setData({
      modalStatus: false
    })
  },
  // 获取信息标签id
  doGetId: function(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      infoType: id,
      modalStatus: true
    });
    if (id === '1') {
      let changeInfo = this.data.userInfo.name
      this.setData({
        update: changeInfo
      })
    } else if (id === '2') {
      let changeInfo = this.data.userInfo.email
      this.setData({
        update: changeInfo
      })
    } else if (id === '3') {
      let changeInfo = this.data.userInfo.eduLevel
      this.setData({
        update: changeInfo
      })
    } else if (id === '4') {
      let changeInfo = this.data.userInfo.company
      this.setData({
        update: changeInfo
      })
    } else if (id === '5') {
      let changeInfo = this.data.userInfo.occupation
      this.setData({
        update: changeInfo
      })
    } else if (id === '6') {
      let changeInfo = this.data.userInfo.nativePlace
      this.setData({
        update: changeInfo
      })
    } else if (id === '7') {
      let changeInfo = this.data.userInfo.age
      this.setData({
        update: changeInfo
      })
    } else if (id === '8') {
      let changeInfo = this.data.userInfo.sex
      if(changeInfo === '男'){
        this.setData({
          index: 1,
          update: 1
        })
      }else if(changeInfo === '女'){
        this.setData({
          index: 0,
          update: 0
        })
      }
      this.setData({
        sex:true,
      })
    } else if (id === '9') {
      let changeInfo = this.data.userInfo.stature
      this.setData({
        update: changeInfo
      })
    } else if (id === '10') {
      let changeInfo = this.data.userInfo.weight
      this.setData({
        update: changeInfo
      })
    } else if (id === '11') {
      let changeInfo = this.data.userInfo.bloodType
      this.setData({
        update: changeInfo
      })
    } else if (id === '12') {
      let changeInfo = this.data.userInfo.sosPhone
      this.setData({
        update: changeInfo
      })
    } else if (id === '13') {
      let changeInfo = this.data.userInfo.remark
      this.setData({
        update: changeInfo
      })
    }
  },
  //获取修改后的信息、
  doGetNewInfo: function(e) {
    this.setData({
      newValue: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    let newValue = e.detail.value
    this.setData({
      index: newValue,
      newValue: newValue
    })
  },

  // 修改个人信息
  doChangeInfo: function() {
    let that = this
    let newValue = that.data.newValue
    if (newValue === '') {
      newValue = that.data.update
    };
    if (that.data.infoType === '2') {
      let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
      if (!regex.test(newValue)) {
        wx.showToast({
          title: '请输入正确的邮箱格式！',
          icon: 'none',
          duration: app.globalData.duration
        })
      }else{
        this.doChange(newValue)
      }
    }else if (that.data.infoType === '12') {
      if (newValue < 11) {
        wx.showToast({
          title: '格式错误！',
          icon: 'none',
          duration: app.globalData.duration
        })
      } else{
        this.doChange(newValue)
      }
    } else {
      this.doChange(newValue)
    }
  },
  //提交修改
  doChange: function(newValue) {
    let that = this
    let userId = that.data.toMemberId
    app.http.postRequest(config.postMyInfo, {
      userId: userId,
      infoType: that.data.infoType,
      newValue: newValue
    }).then(res => {
      that.setData({
        modalStatus: false
      });
      if (res.data.code === 'GN00000') {
        wx.showToast({
          title: '修改成功',
          duration: app.globalData.duration
        });
        that.getPageInfo(userId)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      };
      this.setData({
        newValue: '',
        update: '',
        sex:false
      })
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showToast({
      title: '到底了...',
      icon: 'success',
      duration: 2000
    })
  },
  onShow: function() {
    let userId = this.data.toMemberId
    this.getPageInfo(userId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取信息明细页面内容
  onLoad: function(options) {
    if (options.toMemberId) {
      this.setData({
        toMemberId: options.toMemberId
      })
    } else {
      this.setData({
        toMemberId: app.globalData.userId
      })
    }
  },
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
    app.http.postRequest(config.postGetPersonalDetailData, {
      userId: userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          userInfo: res.data.data.userInfo
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