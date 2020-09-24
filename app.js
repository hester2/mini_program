import Http from './utils/http.js'

App({
  showModal: function() {
    wx.showModal({
      title: '提示',
      content: '功能开发中，敬请期待！',
    })
  },
  onLaunch: function () {
    wx.login({
      success: res => {
        console.log(res.code)
        this.globalData.code = res.code
      }
    })
  },
  globalData: {
    imei:'',
    show:false,
    duration: 2000,
    uploadHost: 'https://health-mini.xmgoldnet.com',
    login: false,
    userId: '',
    openId: '',
    unionId: '',
    sessionKey: '',
    code:'',
    phone:'',
    token: '',
    imgServer: 'https://health-mini-1255700284.cos.ap-chengdu.myqcloud.com/',
    imgPath:'https://health-mini-1255700284.cos.ap-chengdu.myqcloud.com/consultation/assets/'
  },
  http: new Http()
})