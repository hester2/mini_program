var app = getApp()
const config = require('../../../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    userInfo: [],
    imei: '',
    toMemberId: '',
    fromMemberId: '',
    toMemberPhone: '',
    myWatch: '',
    familyId:'',
    imgMap: app.globalData.imgServer + 'more/icon/map.png',
    imgRecord: app.globalData.imgServer + 'more/icon/medical-record.png',
    imgRight: app.globalData.imgServer + 'more/icon/right.png',
    imgReport: app.globalData.imgServer + 'more/icon/report.png',
    imgHistory: app.globalData.imgServer + 'more/icon/medical-history.png',
    imgSetting: app.globalData.imgServer + 'more/icon/setting.png',
    imgMember: app.globalData.imgServer + 'more/icon/member.png',
    imgTelecontrol: app.globalData.imgServer + 'more/icon/telecontrol.png'
  },
  //跳转到信息详情
  goDetail: function() {
    wx.navigateTo({
      url: '../../user-info/index?toMemberId=' + this.data.toMemberId ,
    })
  },
  // 跳转到病历卡页面
  goToMedicalHistory: function(e) {
    let userId = app.globalData.userId
    let recordType = e.currentTarget.dataset.id
    let imei = this.data.imei
    let toMemberId = this.data.toMemberId
    let toMemberPhone = this.data.toMemberPhone
    wx.navigateTo({
      url: 'medical-record/index?recordType=' + recordType + "&imei=" + imei + "&toMemberId=" + toMemberId + '&toMemberPhone=' + toMemberPhone,
    })
  },
  // 档案管理
  goToMedicalDa(e){
    wx.navigateTo({
      url: '../../../archives/index?familyId=' + this.data.familyId +'&flag=' +2, 
    })
  },
  // 跳转到关于设备页面
  goToAboutEquiment: function() {
    let toMemberId = this.data.toMemberId
    let toMemberPhone = this.data.toMemberPhone
    let imei = this.data.imei
    let toMemberName = this.data.userInfo.name
    let myWatch = this.data.myWatch
    wx.navigateTo({
      url: 'about-equipment/index?imei=' + imei + "&currentTab=" + '0' + '&toMemberPhone=' + toMemberPhone + "&toMemberId=" + toMemberId + "&toMemberName=" + toMemberName + "&myWatch=" + myWatch,
    })
  },
  // 跳转到成员管理页面
  goToManage: function() {
    if (this.data.myWatch === '1'){
      let toMemberId = this.data.toMemberId
      let toMemberPhone = this.data.toMemberPhone
      let imei = this.data.imei
      let toMemberName = this.data.userInfo.name
      wx.navigateTo({
        url: 'about-equipment/index?imei=' + imei + "&currentTab=" + '1' + '&toMemberPhone=' + toMemberPhone + "&toMemberId=" + toMemberId + "&toMemberName=" + toMemberName + "&myWatch=" + this.data.myWatch,
      })
    }else{
      wx.showToast({
        title: '该设备为您关注的设备，暂无权限查看成员！',
        icon:'none'
      })
    }

  },
  // 跳转到远程设置页面
  goToTelecontrol: function() {
    let imei = this.data.imei
    wx.navigateTo({
      url: 'telecontrol/index?imei=' + imei + '&toMemberPhone=' + this.data.toMemberPhone,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      imei: options.imei,
      toMemberId: options.toMemberId,
      fromMemberId: options.fromMemberId,
      toMemberPhone: options.toMemberPhone,
      myWatch: options.myWatchOrMyDevice,
      familyId: options.familyId
    })
  },
  getPageInfo: function (imei, fromMemberId, toMemberId, toMemberPhone, myWatch){
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
    app.http.postRequest(config.postGetMyFamilyInfo, {
      fromMemberId: fromMemberId,
      toMemberId: toMemberId,
      toMemberPhone: toMemberPhone,
      imei: imei,
      myWatchOrMyDevice: myWatch
    }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if(res.data.code === 'GN00000'){
          this.setData({
            userInfo: res.data.data
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none',
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
    let fromMemberId = this.data.fromMemberId
    let toMemberId = this.data.toMemberId
    let toMemberPhone = this.data.toMemberPhone
    let imei = this.data.imei
    let myWatch = this.data.myWatch
    this.getPageInfo(imei, fromMemberId, toMemberId, toMemberPhone, myWatch)
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