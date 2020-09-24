// pages/chat/doctor-home/figure-visits/index.js
var _self = this
var app = getApp()
const config = require('../../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    fileIds: [],
    imgs: [],
    familyId:1,
    ids: 0,
    idc: 0,
    idv: 0,
    date: '2016-09-01',
    list: [{
        'id': 0,
      'img': app.globalData.imgPath+'icon-figure_1.png',
        'name': '张天赐',
        'tex': '男',
        'age': '34'
      },
      {
        'id': 1,
        'img': app.globalData.imgPath+'icon-figure_2.png',
        'name': '刘海英',
        'tex': '女',
        'age': '34'
      },
    ],
    anwer: [{
        'id': 0,
        'name': '是',
      },
      {
        'id': 1,
        'name': '否',
      },
    ],
    anwers: [{
        'id': 0,
        'name': '有',
      },
      {
        'id': 1,
        'name': '无',
      },
    ],
    idx: '',
    hosIndex: 0,
    partIndex: 0,
    current: 0,
    max: 300,
    current1: 0,
    max1: 300,
    current2: 0,
    max2: 300,
    checked: false,
    hos: ['请选择', '美国', '中国', '巴西', '日本'],
    part: ['请选择', '美国', '中国', '巴西', '日本'],
    doctorId: '',
    priceMarket: '',
    text_y: '',
    text_k: '',
    value_s: '',
    value_h: '',
    value_m: '',
    filePath: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    _self = this
    _self.setData({
      familyId: wx.getStorageSync("familyId")
    })
    this.setData({
      doctorId: options.daId,
      priceMarket: options.priceMarket
    })
    app.http.postRequest(config.getMyFamily, {
      userId: app.globalData.userId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          list: res.data.data
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
  deleteImage(e) {
    var index = e.currentTarget.dataset.index
    var imgs = _self.data.imgs
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          imgs.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        _self.setData({
          previewImageArr: previewImageArrs
        });
      }
    })
  },
  handleAnimalChange({
    detail = {}
  }) {
    this.setData({
      checked: detail.current
    });
  },
  bindHosChange: function(e) {
    this.setData({
      hosIndex: e.detail.value
    })
  },
  bindPartChange(e) {
    this.setData({
      partIndex: e.detail.value
    })
  },
  goIndex(e) {
    let index = e.currentTarget.dataset.index;
    console.log(e)
    this.setData({
      familyId: e.currentTarget.dataset.id
    })
    // console.log('每个index',index)
    this.setData({
      idx: index
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  handleLimit: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    this.setData({
      value_s: value
    })
    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current: length
    });
  },
  handleLimit1: function(e) {
    var value = e.detail.value;
    this.setData({
      value_h: value
    })
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current1: length
    });
  },
  handleLimit2: function(e) {
    var value = e.detail.value;
    this.setData({
      value_m: value
    })
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current2: length
    });
  },
  handleYes(e) {
    var index = e.currentTarget.dataset.id
    this.setData({
      ids: index
    })
  },

  handleYes1(e) {
    var index = e.currentTarget.dataset.id
    this.setData({
      idc: index
    })
  },

  handleYes2(e) {
    var index = e.currentTarget.dataset.id
    this.setData({
      idv: index
    })
  },

  // handleUpload() {
  //   var _self = this;
  //   wx.chooseImage({
  //     count: 8,
  //     success(res) {
  //       var tempFilePaths = res.tempFilePaths;
  //       _self.setData({
  //         previewImageArr: tempFilePaths
  //       });
  //       _self.uploadImg()
  //     }
  //   })
  // },
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
        sourceType: ['album', 'camera'],
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
        console.log(JSON.parse(res.data))
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
  doImgWay: function(e) {
    var self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: _self.data.imgs
    })
  },
  handleAdd() {
    wx.navigateTo({
      url: '../add/index',
    })
  },
  handleInputy(e) {
    this.setData({
      text_y: e.detail.value
    })
  },
  handleInputs(e) {
    this.setData({
      text_k: e.detail.value
    })
  },

  formSubmit: function(e) {
    let that = this
    var treatmentType;
    if (that.data.ids == 0) {
      treatmentType = '是'
    } else {
      treatmentType = '否'
    }
    if (that.data.value_s == '') {
      wx.showToast({
        title: '请输入病情描述',
        icon: 'none'
      })
    }else if (that.data.checked == false) {
      wx.showToast({
        title: '请同意知情同意书',
        icon: 'none'
      })
    } else {
      app.http.postRequest(config.postInquiry, {
        userId: app.globalData.userId,
        doctorId: that.data.doctorId,
        familyId: that.data.familyId,
        medicalRecord: {
          diseaseDescription: that.data.value_s,
          imgs: that.data.fileIds,
          treatmentType: treatmentType,
          treatmentTime: that.data.date,
          treamentHospital: that.data.text_y,
          treatmentSection: that.data.text_k,
          pastMedicalRecord: that.data.value_h,
          allergicRecord: that.data.value_m
        }
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          wx.navigateTo({
            url: '../../pay-success/index',
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