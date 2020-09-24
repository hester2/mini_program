var app = getApp()
Page({

  data: {

    tempFilePaths: [app.globalData.imgPath + 'icon-archives_3.png', app.globalData.imgPath+'icon-archives_4.png'],

  },

  //选择图片

  ChooseImg: function () {

    let that = this;

    wx.chooseImage({

      count: 2, // 默认最多9张图片，可自行更改

      success: res => {

        wx.showToast({

          title: '正在上传...',

          icon: 'loading',

          mask: true,

          duration: 1000

        })

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        let tempFilePath = res.tempFilePaths;

        that.setData({

          tempFilePaths: tempFilePath

        })

      }

    })

  },

  //预览图片

  PreviewImg: function (e) {

    let index = e.target.dataset.index;

    let that = this;

    wx.previewImage({

      current: that.data.tempFilePaths[index],

      urls: that.data.tempFilePaths,

    })

  },

  //长按删除图片

  DeleteImg: function (e) {

    var that = this;

    var tempFilePaths = that.data.tempFilePaths;

    var index = e.currentTarget.dataset.index;//获取当前长按图片下标

    wx.showModal({

      title: '提示',

      content: '确定要删除此图片吗？',

      success: function (res) {

        if (res.confirm) {

          //console.log('点击确定了');

          tempFilePaths.splice(index, 1);

        } else if (res.cancel) {

          //console.log('点击取消了');

          return false;

        }

        that.setData({

          tempFilePaths

        });

      }

    })

  },

})
