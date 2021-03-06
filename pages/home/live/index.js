// pages/home/live/index.js
var _self;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    currentIndex: 0,
    filterHeight: 600,
  },
  onLoad: function (options) {
    _self = this
    _self.setData({
      currentIndex: options.userId
    })
  },
  onReady: function () {
    _self = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowHeight = res.windowHeight;
        //获取头部标题高度
        wx.createSelectorQuery().select('#grace-filter-header').fields({
          size: true,
        }, function (res) {
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
  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  handleMake(){
    wx.navigateTo({
      url: 'make/index',
    })
  },
  handleList(){
    wx.navigateTo({
      url: 'make-list/index',
    })
  },
  handleClick(){
    wx.navigateTo({
      url: 'live-detail/index',
    })
  }
})