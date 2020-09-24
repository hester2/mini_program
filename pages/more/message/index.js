// pages/more/message/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animal: '',
    checked: false,
    disabled: false,
    titles:'全选',
    current:false,
    checkeds: false,
    disableds: false,
    deletes:false,
    title:'',
    to_hide:true,
    to_fixed:false,
    id:0,
    message:[
      {
        'id':0,
        'img': app.globalData.imgPath+'icon-mess_1.png',
        'names':'会员特权提醒',
        'desc':'您还有未领取的会员特权哦，快来领取吧！',
        'time':'2019-08-20 16:36',

      },
      {
        'id': 1,
        'img': app.globalData.imgPath+'icon-mess_2.png',
        'names': '会员特权提醒',
        'desc': '您还有未领取的会员特权哦，快来领取吧！',
        'time': '2019-08-20 16:36',

      },
      {
        'id': 2,
        'img': app.globalData.imgPath+'icon-mess_3.png',
        'names': '会员特权提醒',
        'desc': '您还有未领取的会员特权哦，快来领取吧！',
        'time': '2019-08-20 16:36',

      },
      {
        'id': 3,
        'img': app.globalData.imgPath+'icon-mess_4.png',
        'names': '会员特权提醒',
        'desc': '您还有未领取的会员特权哦，快来领取吧！',
        'time': '2019-08-20 16:36',

      }
    ]
  },
  handleAnimalChanges({ detail = {} }) {
    var that = this
    that.setData({
      checkeds: detail.current
    })
    var current = that.data.current
    var messages = that.data.message
    var checkeds = this.data.checkeds
    for (var i in messages) {
      if (checkeds==true){
        messages[i].checked = true
      } else{
        messages[i].checked = false
      }
    }
    that.setData({
      message: messages,
      checkeds: checkeds
    })
    console.log(that.data.message)
  },
  handleEdit(){
    this.setData({
      deletes:true,
      to_hide: false,
      to_fixed:true,
      title:'完成'
    })
    
  },
  handleCle(){
    this.setData({
      deletes: false,
      to_hide: true,
      to_fixed: false,
      title: ''
    })
  },
  handleBack(){
    wx.navigateBack({
      delta:1
    })
  },
  handleDelete(){
    var that = this;
    var index = that.data.id;
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: function (sm) {
        if (sm.confirm) {
          wx.showToast({
            title: "已确认!",
            icon: "none"
          });
          // 用户点击了确定 可以调用删除方法了

          // list.splice(current, 1)

          // this.setData({
          //   list: list
          // })

        } else if (sm.cancel) { }
      }
    })
  },
  handleClick(e){
    wx.navigateTo({
      url: 'message-detail/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.message.map(item => {
      item.checked = false;
    });//向后台返回的对象中添加数值
    this.setData({
      message: this.data.message
    })
    console.log(this.data.message)
  },
  handleAnimalChange(e) {
    var that=this
    var id = e.currentTarget.dataset.index
    that.setData({
      id:id
    })
    var current = e.detail.current
    this.setData({
      current: current
    })
    var messages = that.data.message
    for (var i in messages) {
      if (id == messages[i].id) {
        messages[i].checked=current
      }
    }
    that.setData({
      message: messages
    })
    console.log(that.data.message)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})