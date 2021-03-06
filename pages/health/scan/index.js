var app = getApp()
const config = require('../../../utils/config.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    idx: 0,
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
    array: ['女', '男'],
    objectArray: [{
        id: 1,
      name: '女'
      },
      {
        id: 2,
        name: '男'
      }
    ],
    index: 0,
    imei: '',
    toMemberName: '',
    toMemberSex: '性别',
    toMemberPhone: '',
    relation: '',
    userId: app.globalData.userId,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 获取到扫码页面传过来的设备号
  onLoad: function(options) {
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
    this.setData({
      imei: options.imei
    })
  },
  goIndex(e) {
    let index = e.currentTarget.dataset.index;
    // console.log('每个index',index)
    this.setData({
      idx: index
    })
  },
  enterToMemberName: function(e) {
    this.setData({
      toMemberName: e.detail.value
    })
  },
  enterToMemberPhone: function(e) {
    let length = this.data.toMemberPhone.length
    this.setData({
      toMemberPhone: e.detail.value
    })
  },
  //获取性别
  bindPickerChange: function(e) {
    let index = e.detail.value
    let toMemberSex = this.data.array[index]
    this.setData({
      index: index,
      toMemberSex: toMemberSex
    })
  },
  // 获取用户输入的关系
  enterRelation: function(e) {
    let length = this.data.relation.length
    if (length > 5) {
      wx.showToast({
        title: '最多只能输入6个字符！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      this.setData({
        relation: e.detail.value
      })
    }
  },
  /**
   * 提交绑定设备表单
   */
  onClickBindDevice: function() {
    // if (this.data.toMemberName === '') {
    //   // wx.showToast({
    //   //   title: '请输入佩戴者姓名',
    //   //   icon: 'none',
    //   //   duration: app.globalData.duration
    //   // })
    // } else {
    //   if (this.data.toMemberSex === '性别') {
    //     wx.showToast({
    //       title: '请输入佩戴者性别',
    //       icon: 'none',
    //       duration: app.globalData.duration
    //     })

    //   } else {
    //     if (this.data.toMemberPhone.length < 11) {
    //       wx.showToast({
    //         title: '请输入正确手机号',
    //         icon: 'none',
    //         duration: app.globalData.duration
    //       })
    //     } else {
    //       if (this.data.relation === '') {
    //         wx.showToast({
    //           title: '请输入您与佩戴者关系',
    //           icon: 'none',
    //           duration: app.globalData.duration
    //         })
    //       } else {
    //         if (wx.showLoading) {
    //           wx.showLoading({
    //             title: '加载中...',
    //             mask: true
    //           });
    //         } else {
    //           wx.showToast({
    //             title: '加载中...',
    //             icon: 'loading',
    //             mask: true,
    //             duration: 10000
    //           });
    //         };
    //         app.http.postRequest(config.postBindingUrl, {
    //           userId: app.globalData.userId,
    //           // name: this.data.toMemberName,
    //           // sex: this.data.index,
    //           // toMemberPhone: this.data.toMemberPhone,
    //           relation: this.data.relation,
    //           imei: this.data.imei
    //         }).then(res => {
    //           if (wx.hideLoading) {
    //             wx.hideLoading();
    //           } else {
    //             wx.hideToast();
    //           }
    //           if (res.data.code === 'GN00000') {
    //             wx.showToast({
    //               title: '绑定成功！',
    //               duration: app.globalData.duration
    //             })
    //             setTimeout(function() {
    //               wx.navigateBack({
    //                 delta: 2
    //               })
    //             }, 1000)
    //           } else {
    //             wx.showToast({
    //               title: res.data.msg,
    //               icon: 'none',
    //               duration: app.globalData.duration
    //             })
    //           }
    //         })
    //       }

    //     }
    //   }
    // }
    // 
    if (this.data.relation === '') {
      wx.showToast({
        title: '请输入您与佩戴者关系',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
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
      app.http.postRequest(config.postBindingNew, {
        userId: app.globalData.userId,
        // name: this.data.toMemberName,
        // sex: this.data.index,
        // toMemberPhone: this.data.toMemberPhone,
        relation: this.data.relation,
        imei: this.data.imei,
        index: this.data.idx
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          wx.showToast({
            title: '绑定成功！',
            duration: app.globalData.duration
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 2
            })
          }, 1000)
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
  handleAdd(){
    wx.navigateTo({
      url: 'add/index',
    })
  }
})