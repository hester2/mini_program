// pages/home/live/liveDetail/index.js
var app = getApp()
Page({
  data: {
    imgServer: app.globalData.imgPath,
    isShow: true,
    videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',  // 视频
    videoCoverImg: 'http://img5.imgtn.bdimg.com/it/u=1672477765,2527992874&fm=26&gp=0.jpg',  // 视频封面图
    videoPlayIcon: 'http://39.105.134.221:8080/test/source1.png', // 视频播放icon
    videoLockIcon: app.globalData.imgPath+'icon-liveD_7.png',  // 视频播放锁
    videoCollIcon: app.globalData.imgPath+'icon-liveD_5.png',
    videoCollsIcon: app.globalData.imgPath+'icon-liveD_6.png',
    solid: 1,
  },
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  handleSolid(){
    console.log(this.data.solid)
    if (this.data.solid == 1) {
      this.setData({
        solid : 2
      })
    } else {
      this.setData({
        solid: 1
      })
    }
  },
  // 点击封面自定义播放按钮时触发
  bindplay() {
    this.setData({
      isShow: false
    })
    this.videoContext.play();
    console.log('play')
  },
  // 监听播放到末尾时触发
  bindended() {
    console.log('bindended')
    this.setData({
      isShow: true
    })
    this.videoContext.ended();
  },
  // 监听暂停播放时触发
  bindpause() {
    console.log('pause')
  }
})