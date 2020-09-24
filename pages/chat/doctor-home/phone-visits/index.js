// pages/chat/doctor-home/figure-visits/index.js
var dateTimePicker = require('../../../../utils/dateTimePicker.js');
var _self;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    previewImageArr: [],
    login: true,
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
    idx: 0,
    hosIndex: 0,
    current: 0,
    max: 300,
    checked: false,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    hos: ['请选择', '美国', '中国', '巴西', '日本'],
  },
  handleAnimalChange({ detail = {} }) {
    this.setData({
      checked: detail.current
    });
    console.log(detail)
  },
  bindHosChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      hosIndex: e.detail.value
    })
  },
  goIndex(e) {
    let index = e.currentTarget.dataset.index;
    // console.log('每个index',index)
    this.setData({
      idx: index
    })
  },
  handleLimit: function (e) {
    var value = e.detail.value;
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current: length
    });
  },
  handleYes() {
    this.setData({
      login: true
    });
  },
  handleNo() {
    this.setData({
      login: false
    });
  },
  handleUpload() {
    var self = this;
    wx.chooseImage({
      count: 8,
      success(res) {
        var tempFilePaths = res.tempFilePaths;
        self.setData({
          previewImageArr: tempFilePaths
        });
      }
    })
  },
  previewImg: function (e) {
    var self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: _self.data.previewImageArr
    })
  },
  deleteImage(e) {
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var previewImageArrs = _self.data.previewImageArr
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          previewImageArrs.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        _self.setData({
          previewImageArr: previewImageArrs
        });
      }
    })
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr
    });
  },
  handleAdd(){
    wx.navigateTo({
      url: '../add/index',
    })
  },
  formSubmit: function (e) {
    var uploadTask1 = wx.uploadFile({
      url: '',
      filePath: _self.data.idCard1,
      fileType: 'image',
      name: 'data',
      success: function (uploadFileRes) {
        // 上传成功后返回服务器端保存的路径
        console.log(uploadFileRes.data);
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _self = this;
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    });
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