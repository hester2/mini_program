var _self;

var app = getApp()
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    currentIndex: 0,
    filterHeight: 600,
    gender: ['请选择', '男', '女'],
    genderIndex: 0,
    marriage: ['请选择', '未婚', '已婚'],
    marriageIndex: 0,
    pl: ['请选择（非必填）', 'A型血', 'B型血', 'AB型血', 'O型血'],
    plIndex: 0,
    fer: ['请选择（非必填）', '', ''],
    ferIndex: 0,
    smoking: ['请选择（非必填）', '', ''],
    smokingIndex: 0,
    drinking: ['请选择（非必填）', '', ''],
    drinkingIndex: 0,
    myDevices: [],
    showUserList: false,
    idx: '',
    avatar: '',
    name: '',
    age: '',
    phone: '',
    certificationType: '',
    // 健康
    idj: '',
    height: '',
    weight: '',
    bmi: '',
    occupation: '',
    bloodType: '',
    pastMedicalHistory: '',
    allergicHistory: '',
    cases:[],
    prescription:[],
    familyId:'',
  },
  onLoad: function(options) {
    _self = this
    console.log(options.flag)
    var flags = options.flag
    if (flags == 1){
      let familyId = wx.getStorageSync("familyId")
      _self.setData({
        familyId: familyId
      })
    } else if (flags == 2){
      let familyIds = options.familyId
      _self.setData({
        familyId: familyIds
      })
    }
    console.log(_self.data.familyId)
    _self.setData({
      currentIndex: options.userId,
    })
    
    app.http.postRequest(config.getFamilyBaseInfo, {
      userId: app.globalData.userId,
      familyId: _self.data.familyId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          genderIndex: res.data.data.sex
        })

        this.setData({
          idx: res.data.data.id,
          avatar: res.data.data.avatar,
          name: res.data.data.name,
          sex: res.data.data.sex,
          age: res.data.data.age,
          phone: res.data.data.phone,
          certificationType: res.data.data.certificationType,
          maritalState: res.data.data.maritalState
        })
        if (res.data.data.certificationType == '1') {
          this.setData({
            certificationType: '已认证'
          })
        } else if (res.data.data.certificationType == '1') {
          this.setData({
            certificationType: '未认证'
          })
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    // 
    app.http.postRequest(config.getFamilyHealthInfo, {
      userId: app.globalData.userId,
      familyId: _self.data.familyId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          idx: res.data.data.id,
          idj: res.data.data.id,
          height: res.data.data.height,
          weight: res.data.data.weight,
          bmi: res.data.data.bmi,
          occupation: res.data.data.occupation,
          pastMedicalHistory: res.data.data.pastMedicalHistory,
          allergicHistory: res.data.data.allergicHistory,
          plIndex: res.data.data.bloodType,
          ferIndex: res.data.data.fertilityStatus, 
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getMyFamily, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        // console.log(res.data.data)
        this.setData({
          myDevices: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    // 病例
    app.http.postRequest(config.getMedicalRecord, {
      userId: app.globalData.userId,
      familyId: this.data.familyId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        this.setData({
          cases: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    // 处方
    app.http.postRequest(config.getPrescription, {
      userId: app.globalData.userId,
      familyId: this.data.familyId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        this.setData({
          prescription: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    // 婚姻
    app.http.postRequest(config.getSelectorParams, {
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        this.setData({
          marriage: res.data.data.maritalStatus,
          pl: res.data.data.bloodType,
          fer: res.data.data.fertilityStatus,
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
  onReady: function() {
    _self = this;
    wx.getSystemInfo({
      success: function(res) {
        var windowHeight = res.windowHeight;
        //获取头部标题高度
        wx.createSelectorQuery().select('#grace-filter-header').fields({
          size: true,
        }, function(res) {
          //计算得出滚动区域的高度
          var sHeight = (windowHeight - res.height);
          _self.setData({
            filterHeight: sHeight + 'px'
          });
          console.log(_self.data.filterHeight)
        }).exec();
      }
    });
  },
  handleDeviceAdd(){
    wx.navigateTo({
      url: '../health/scan/add/index',
    })
  },
  hanldleMy() {
    wx.navigateTo({
      url: 'my-evaluation/index',
    })
  },
  //swiper切换时会调用
  pagechange: function(e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function(e) {
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
    if (this.data.currentIndex == 0) {
      app.http.postRequest(config.postFamilyBaseInfo, {
        userId: app.globalData.userId,
        familyId: this.data.idx,
        baseInfo: {
          avatar: this.data.avatar,
          name: this.data.name,
          sex: this.data.genderIndex,
          age: this.data.age,
          phone: this.data.phone,
          certificationType: this.data.certificationType,
          maritalState: this.data.marriageIndex
        }
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          console.log(res.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    } else if (this.data.currentIndex == 1) {
      app.http.postRequest(config.postFamilyHealthInfo, {
        userId: app.globalData.userId,
        familyId: this.data.idx,
        healthInfo: {
          height: this.data.height,
          weight: this.data.weight,
          bmi: this.data.bmi,
          bloodType: this.data.pl[this.data.plIndex],
          occupation: this.data.occupation,
          pastMedicalHistory: this.data.pastMedicalHistory,
          allergicHistory: this.data.allergicHistory,
          ferIndex: this.data.ferIndex,
        }
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          console.log(res.data)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    }
  },
  hanldeClick() {
    wx.navigateTo({
      url: 'evaluation/index',
    })
  },
  handleGo() {
    wx.navigateBack({
      delta: 1
    })
  },
  handlePicker: function(e) {
    this.setData({
      genderIndex: e.detail.value
    });
  },
  handleMarriage: function(e) {
    this.setData({
      marriageIndex: e.detail.value
    });
  },
  handleCation() {
    wx.navigateTo({
      url: 'certification/index',
    })
  },
  handlePl: function(e) {
    this.setData({
      plIndex: e.detail.value
    });
  },
  handleFer: function(e) {
    this.setData({
      ferIndex: e.detail.value
    });
  },
  handleSmoking: function(e) {
    this.setData({
      smokingIndex: e.detail.value
    });
  },
  handleDrinking: function(e) {
    this.setData({
      drinkingIndex: e.detail.value
    });
  },
  // 隐藏列表
  onClickHide: function() {
    this.setData({
      showUserList: false
    })
  },
  handleDeviceCode: function() {
    this.setData({
      showUserList: true
    })

  },
  // 获取该账号我的家人列表，用于切换设备
  getMyFamily: function() {
    let that = this
    that.setData({
      showUserList: false
    });
  },
  // 切换绑定的设备，获取该设备健康数据
  onClickChangeDevice: function(e) {
    let that = this
    this.setData({
      idx: e.currentTarget.dataset.id
    })
    console.log(this.data.idx)
    that.onClickHide()
  },
  // 切换我关注的设备，获取该设备健康数据
  onClickChangeWatch: function(e) {
    let that = this
    that.onClickHide()
  },
  handleHistory() {
    wx.navigateTo({
      url: 'history/index',
    })
  },
  handleClick(e) {
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'cases-detail/index?daId=' +id,
    })
  },
  handlePresc(e) {
    var id = e.currentTarget.dataset.id
    var idx = e.currentTarget.dataset.idx
    wx.navigateTo({
      url: 'presc-detail/index?daId=' + id +'&idx=' +idx,
    })
  }
})