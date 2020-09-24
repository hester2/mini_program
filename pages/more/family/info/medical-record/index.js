var app = getApp()
const config = require('../../../../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfo: [],
    imei: '',
    toMemberId: '',
    toMemberPhone: '',
    currentTab: '',
    imgAdd: app.globalData.imgServer + 'more/icon/add.png',
    deleteModalStatus: false,
    id: ''
  },
  //查看图片
  showImgs: function(e) {
    let index = e.target.dataset.id
    let currentImg = e.target.dataset.imgsrc
    let urlLast = this.data.pageInfo[index].imgs
    let urls = []
    for (let i = 0; i < urlLast.length; i++) {
      let a = 'https://health-mini.xmgoldnet.com/health/file/download?filepath=' + urlLast[i]
      urls.push(a)
    }
    wx.previewImage({
      current: currentImg, // 当前显示图片的http链接
      urls: urls, // 需要预览的图片http链接列表
      fail(res) {
        wx.showToast({
          title: '预览失败，请稍后重试！',
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  // 展示报告单
  goMedicalRecord: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id
    })
    let recordType = e.currentTarget.dataset.id
    let userId = app.globalData.userId
    let imei = this.data.imei
    let toMemberId = this.data.toMemberId
    let toMemberPhone = this.data.toMemberPhone
    if (recordType === '1') {
      this.getRecord(recordType, imei, toMemberId, toMemberPhone)
    } else if (recordType === '2') {
      this.getRecord(recordType, imei, toMemberId, toMemberPhone)
    } else if (recordType === '3') {
      this.getHistory(recordType, imei, toMemberId, toMemberPhone)
    }
  },
  //删除病历卡
  hideDeleteModal: function() {
    this.setData({
      deleteModalStatus: false
    })
  },
  showDeleteModal: function(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      deleteModalStatus: true,
      id: id
    })
  },
  deleteMedicalRecord: function() {
    let that = this
    app.http.postRequest(config.postDeleteMedicalRecord, {
      id: that.data.id,
      recordType: that.data.currentTab,
    }).then(res => {
      if (res.data.code === 'GN00000') {
        that.hideDeleteModal()
        if (that.data.currentTab === '3') {
          that.getHistory(that.data.currentTab, that.data.imei, that.data.toMemberId, that.data.toMemberPhone)
        } else {
          that.getRecord(that.data.currentTab, that.data.imei, that.data.toMemberId, that.data.toMemberPhone)
        }
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:'none',
          duration:app.globalData.duration
        })
      }
    })
  },
  //点击添加医疗记录
  goToAddMedicalRecord: function() {
    let recordType = this.data.currentTab
    let imei = this.data.imei
    let toMemberId = this.data.toMemberId
    let toMemberPhone = this.data.toMemberPhone
    wx.navigateTo({
      url: 'add/index?recordType=' + recordType + "&imei=" + imei + "&toMemberId=" + toMemberId + "&toMemberPhone=" + toMemberPhone,
    })
  },
  // 进入病历卡页面获取的数据
  onLoad: function(options) {
    if (options.imei) {
      this.setData({
        imei: options.imei,
        toMemberId: options.toMemberId,
        toMemberPhone: options.toMemberPhone,
        currentTab: options.recordType
      })
    }
    this.setData({
      recordType: options.recordType,
      imei: options.imei,
      toMemberId: options.toMemberId,
      toMemberPhone: options.toMemberPhone
    })
  },
  onShow: function() {
    let recordType = this.data.currentTab
    let imei = this.data.imei
    let toMemberId = this.data.toMemberId
    let toMemberPhone = this.data.toMemberPhone
    if (recordType === '1') {
      this.getRecord(recordType, imei, toMemberId, toMemberPhone)
    } else if (recordType === '2') {
      this.getRecord(recordType, imei, toMemberId, toMemberPhone)
    } else if (recordType === '3') {
      this.getHistory(recordType, imei, toMemberId, toMemberPhone)
    }
  },
  //获取病历卡或报告单
  getRecord: function(recordType, imei, toMemberId, toMemberPhone) {
    let userId = app.globalData.userId
    let that = this
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
    app.http.postRequest(config.postGetMedicalRecord, {
      userId: userId,
      recordType: recordType,
      imei: imei,
      toMemberId: toMemberId,
      toMemberPhone: toMemberPhone
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        that.setData({
          pageInfo: res.data.data
        })
      } else {
        that.setData({
          pageInfo: []
        })
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }

    })
  },
  //获取既往病史
  getHistory: function(recordType, imei, toMemberId, toMemberPhone) {
    let userId = app.globalData.userId
    let that = this
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
    app.http.postRequest(config.postGetMedicalRecord, {
      userId: userId,
      recordType: recordType,
      imei: imei,
      toMemberId: toMemberId,
      toMemberPhone: toMemberPhone
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code == 'GN00000') {
        that.setData({
          pageInfo: res.data.data
        })
      } else {
        that.setData({
          pageInfo: []
        })
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  }
})