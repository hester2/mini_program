var app = getApp()
const config = require('../../../../../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    toMemberName: '',
    toMemberId: '',
    imei: '',
    toMemberPhone: '',
    followerPhone: '',
    relationShip: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imei: options.imei,
      toMemberId: options.toMemberId,
      toMemberPhone: options.toMemberPhone,
      toMemberName: options.toMemberName
    })
  },


  // 获取用户输入的手机号
  toGetFollowerPhone: function(e) {
    this.setData({
      followerPhone: e.detail.value
    })
  },

  // 获取关系
  toGetFollowerRelationShip: function(e) {
    var index = e.currentTarget.dataset.id
    var relationShipChoosen = this.data.relationShips[index]
    this.setData({
      relationShip: relationShipChoosen,
      showRelationShipsModalStatus: false

    })
  },
  // 获取用户输入的关系
  enterRelation: function(e) {
    let length = this.data.relation
    if (length > 5) {
      wx.showToast({
        title: '最多只能输入6个字符！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      this.setData({
        relationShip: e.detail.value,
        showRelationShipsModalStatus: false
      })
    }
  },
  // 点击添加成员
  doAddFollower: function(e) {
    var userId = app.globalData.userId
    var followerPhone = this.data.followerPhone
    var imei = this.data.imei
    var relationShip = this.data.relationShip
    var toMemberId = this.data.toMemberId
    var toMemberPhone = this.data.toMemberPhone
    var toMemberName = this.data.toMemberName
    if (followerPhone.length < 11) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      if (relationShip === '') {
        wx.showToast({
          title: '请输入您与佩戴者关系',
          icon: 'none',
          duration: app.globalData.duration
        })
      } else {
        app.http.postRequest(config.postAddFollower, {
          userId: userId,
          followerPhone: followerPhone,
          imei: imei,
          relation: relationShip,
          toMemberId: toMemberId,
          toMemberPhone: toMemberPhone,
          toMemberName: toMemberName
        }).then(res => {
          if (res.data.code === 'GN00000') {
            wx.showToast({
              title: '关注设备成功!',
              duration:app.globalData.duration
            });
            setTimeout(function(){
              wx.navigateBack({
                delta: 1
              })
            },500)
          } else if (res.data.code === 'GN60011') {
            wx.showToast({
              title: '已关联该设备!',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: '关注设备失败，请稍后重试!',
              icon: 'none'
            })
          }
        })
      }
    }
  }
})