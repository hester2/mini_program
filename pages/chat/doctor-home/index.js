// pages/chat/doctor-home/index.js
var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    starIndex4: 4,
    starIndext: 4,
    isFold: true,
    showModalStatus: false,
    animationData: '',
    login: true,
    doctor:[],
    doctorInfo:[],
    organization:[],
    solid:1,
    common:[],
    total:'',
    actives:'1',
    doctorId:'',
    consult:[],
    list:{}
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    this.setData({
      doctorId: options.daId
    })
    app.http.postRequest(config.getDoctorInfo, {
      userId: app.globalData.userId,
      doctorId: this.data.doctorId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          doctor: res.data.data,
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getDoctorComment, {
      userId: app.globalData.userId,
      doctorId: options.daId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data)
        this.setData({
          common: res.data.data.comments,
          total: res.data.data.total
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    // 获取医生问诊价格
    app.http.postRequest(config.getDoctorService, {
      userId: app.globalData.userId,
      doctorId: this.data.doctorId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        let datar = res.data.data;
        let listdata = [];
        let list = {};
        datar.forEach((v,i,arr)=>{
          let obj ={
            imgs: v.imgs, 
            title:v.title,
            priceMarket: v.priceMarket + v.unit,
            serviceId:v.serviceId,
            children: v
          }
          if (v.serviceId == "1") {
            list = v
          }
          
         
          listdata.push(obj)
        })

        console.log(listdata)
        

        this.setData({
          list: list,
          consult: listdata
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
  handleTub(){
   wx.showToast({
     title: '商品已下架',
     icon:'none'
   })
  },
  handleSolid(){
    if (this.data.solid == 1) {
      this.setData({
        solid: 2
      })
    } else {
      this.setData({
        solid: 1
      })
    }
  },
  //点击切换问诊事件
  handleTu(e) {
    console.log(e)
    let consult = this.data.consult;
    let id = e.currentTarget.dataset.id
    let list = {};
    consult.forEach((v,i,a)=>{
      if (v.children.serviceId == id){
        list = v.children
      }
    })
    console.log(list)
    this.setData({
      login: true,
      list: list,
      actives: id
    });
  },
  handlePh() {
    this.setData({
      login: false
    });
  },
  showAll: function(e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },
  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease-in-out",
      delay: 0
    })
    this.animation = animation
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 100)
  },
  hideModal: function() {
    this.setData({
      showModalStatus: false,
    })

  },
  handleTuSubmit(o) {
    console.log(o)
    var priceMarket = o.currentTarget.dataset.name.priceMarket
    var title = o.currentTarget.dataset.name.title
    var doctorId = this.data.doctorId
    if (title == '图文问诊') {
      wx.navigateTo({
        url: 'figure-visits/index?daId=' + doctorId + '&priceMarket=' + priceMarket,
      })
    } else if (title == '电话问诊') {
      wx.navigateTo({
        url: 'phone-visits/index?daId=' + doctorId + '&priceMarket=' + priceMarket,
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