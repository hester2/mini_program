// pages/home/visits/index.js

var app = getApp()
const config = require('../../../utils/config.js')
var _self;
Page({
  data: {
    imgServer: app.globalData.imgPath,
    priceOrder: 1,
    priceOrder1: 1,
    priceOrder2: 1,
    priceOrder3: 1,
    pay: ['10-20', '20-30', '30-50', '50以上'],
    title_names: ['主任医师', '主治医师', '主治医师'],
    menu1Show: false,
    menu1Top: 44,
    //被展示的菜单
    showingIndex: 0,
    //第二个选项相关
    cateIndex: 0,
    cateList: ['请选择', '综合排序', '按问诊量', '按好评量', '按价格升序', '按价格降序'],
    department: '科室',
    departmentIndex: 0,
    dateValue: "请选择",
    departindex: 0,
    departid: null,
    subdepartindex: 0,
    subdepartid: null,
    sname: '',
    idx: 0,
    idxs: 0,
    starIndex4: 4,
    hiddenName: true,
    hide: true,
    hiden: false,
    hiddenHo: false,
    // 省市区
    current: 0,
    province: ['1', '1', '1'],
    city: ['2', '2', '2'],
    region: ['3', '3', '3'],
    town: ['4', '4', '4'],
    areaSelectedStr: '全国',
    maskVisual: 'hidden',
    provinceName: '请选择',
    cityName:'请选择',
    regionName:'请选择',
    townName:'请选择',
    regionCode:'',
    regionCodes_s:'',
    regionCodes_q: '',
    doctor: []
  },
  onLoad: function(options) { //加载数据渲染页面
    _self = this
    _self.fetchTestData();
    _self.fetchFilterData();
    app.http.postRequest(config.getDoctorList, {
      userId: app.globalData.userId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        this.setData({
          doctor: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    // 省市区
    app.http.postRequest(config.getRegionJson, {
      level: this.data.current + 1
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data)
        this.setData({
          province: res.data.data
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
  provinceTapped: function(e) {
    // 标识当前点击省份，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.id;
    var province = e.currentTarget.dataset.name
    var regionCodes = e.currentTarget.dataset.code
    // current为1，使得页面向左滑动一页至市级列表
    // provinceIndex是市区数据的标识
    this.setData({
      provinceName: province,
      regionCode: regionCodes,
      provinceIndex: index,
      cityIndex: -1,
      regionIndex: -1,
      townIndex: -1,
      current:1
    });
    var that = this;
    var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName
    this.setData({
      areaSelectedStr: areaSelectedStr
    });
  },
  cityTapped: function(e) {
    // 标识当前点击县级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.id;
    var city = e.currentTarget.dataset.name
    var regionCodes = e.currentTarget.dataset.code
    console.log(e.currentTarget.dataset.code)
    // current为1，使得页面向左滑动一页至市级列表
    // cityIndex是市区数据的标识
    this.setData({
      regionCodes_s: regionCodes,
      cityIndex: index,
      regionIndex: -1,
      townIndex: -1,
      cityName: city,
      current:2
    });
    var that = this;
    var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName
    this.setData({
      areaSelectedStr: areaSelectedStr
    });
  },
  regionTapped: function(e) {
    // 标识当前点击镇级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.id;
    var region = e.currentTarget.dataset.name
    var regionCodes = e.currentTarget.dataset.code
    // current为1，使得页面向左滑动一页至市级列表
    // regionIndex是县级数据的标识
    this.setData({
      regionIndex: index,
      townIndex: -1,
      regionName: region,
      regionCodes_q: regionCodes,
      current:3
    });
    var that = this;
    var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName
    this.setData({
      areaSelectedStr: areaSelectedStr
    });
  },
  townTapped: function(e) {
    // 标识当前点击镇级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.id;
    var town = e.currentTarget.dataset.name
    // townIndex是镇级数据的标识
    this.setData({
      townIndex: index,
      townName: town
    });
    var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName + this.data.townName;
    this.setData({
      areaSelectedStr: areaSelectedStr
    });
  },
  currentChanged: function(e) {
    // swiper滚动使得current值被动变化，用于高亮标记
    var current = e.detail.current;
    this.setData({
      current: current
    });
    console.log(this.data.regionCode)
    var that=this
    if (e.detail.current==0){
      app.http.postRequest(config.getRegionJson, {
        level: this.data.current + 1
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          this.setData({
            province: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    } else if (e.detail.current==1){
      app.http.postRequest(config.getRegionJson, {
        supRegionCode:this.data.regionCode,
        level: this.data.current+1
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          this.setData({
            city: res.data.data[0].city
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    } else if (e.detail.current==2){
      app.http.postRequest(config.getRegionJson, {
        supRegionCode: that.data.regionCodes_s,
        level: that.data.current + 1
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          console.log(res.data.data)
          this.setData({
            region: res.data.data[0].city[0].district
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    } else if (e.detail.current == 3){
      app.http.postRequest(config.getRegionJson, {
        supRegionCode: that.data.regionCodes_q,
        level: that.data.current + 1
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          console.log(res.data.data)
          this.setData({
            town: res.data.data[0].city[0].district[0].street
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
  changeCurrent: function(e) {
    // 记录点击的标题所在的区级级别
    var current = e.currentTarget.dataset.current;
    this.setData({
      current: current
    });
  },
  // 搜索
  handleCancle() {
    this.setData({
      hiddenName: true,
      hide: true,
      hiden: false,
      hiddenHo: false,
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: '../../chat/doctor-home/index?daId=' + e.currentTarget.dataset.id,
    })
  },
  handleChange(e) {
    var name = e.currentTarget.dataset.name.name
    if (name == '图文问诊') {
      wx.navigateTo({
        url: '../../chat/doctor-home/figure-visits/index',
      })
    } else if (name == '电话问诊') {
      wx.navigateTo({
        url: '../../chat/doctor-home/phone-visits/index',
      })
    }
  },
  inputFocus() {
    this.setData({
      hiddenName: false,
      hide: false,
      hiden: true,
      hiddenHo: true,
    })
  },
  searchNow() {
    this.setData({
      hiddenName: true,
      hide: true,
      hiden: false,
      hiddenHo: false,
    })
  },
  clearKey: function() {
    console.log('fff')
    this.setData({
      hiddenName: true
    })
    this.setData({
      searchClose: false,
      searchKey: ""
    });
  },
  // 筛选
  goIndex(e) {
    let index = e.currentTarget.dataset.index;
    // console.log('每个index',index)
    this.setData({
      idx: index
    })
  },
  goIndex_name(e) {
    let index = e.currentTarget.dataset.index;
    // console.log('每个index',index)
    this.setData({
      idxs: index
    })
  },
  fetchFilterData: function() { //获取筛选条件
    // 科室
    app.http.postRequest(config.getSection, {}).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        this.setData({
          filterdata: res.data.data
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
  fetchTestData: function() { //获取科室列表
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
  },
  setdepartIndex: function(e) { //科室一级索引
    const d = this.data;
    console.log(e)
    const dataset = e.currentTarget.dataset;
    this.setData({
      departindex: dataset.departindex,
      departid: dataset.departid,
      department: dataset.name,
      subdepartindex: d.departindex == dataset.departindex ? d.subdepartindex : 0
    })
    console.log('所在地区：一级id__' + this.data.departid + ',二级id__' + this.data.subdepartid);
  },
  setSubdepartIndex: function(e) { //科室二级索引
    console.log(e)
    const dataset = e.currentTarget.dataset;
    this.setData({
      subdepartindex: dataset.subdepartindex,
      subdepartid: dataset.subdepartid,
      sname: dataset.name,
    })
    console.log('所在地区：一级id__' + this.data.departid + ',二级id__' + this.data.subdepartid);
  },
  goback: function() {
    wx.navigateBack({});
  },
  changeOrder: function(e) {
    var tapIndex = e.target.dataset.itemid;
    this.setData({
      orderIndex: tapIndex
    });
    this.setData({
      showingIndex: 0
    });
    this.getList();
  },
  showOptions0: function() {
    if (this.data.priceOrder == 1) {
      this.setData({
        priceOrder: 2
      });
    } else {
      this.setData({
        priceOrder: 1
      });
    }
    if (this.data.showingIndex != 0) {
      this.setData({
        showingIndex: 0
      });
      return;
    }
    this.setData({
      showingIndex: 3
    });
  },
  showOptions1: function() {
    if (this.data.priceOrder1 == 1) {
      this.setData({
        priceOrder1: 2
      });
    } else {
      this.setData({
        priceOrder1: 1
      });
    }
    if (this.data.showingIndex != 0) {
      this.setData({
        showingIndex: 0
      });
      return;
    }
    this.setData({
      showingIndex: 1
    });
  },

  showOptions2: function() {
    if (this.data.priceOrder3 == 1) {
      this.setData({
        priceOrder3: 2
      });
    } else {
      this.setData({
        priceOrder3: 1
      });
    }
    if (this.data.showingIndex != 0) {
      this.setData({
        showingIndex: 0
      });
      return;
    }
    this.setData({
      showingIndex: 2
    });
  },
  showOptions99: function() {
    if (this.data.priceOrder2 == 1) {
      this.setData({
        priceOrder2: 2
      });
    } else {
      this.setData({
        priceOrder2: 1
      });
    }
    if (this.data.showingIndex != 0) {
      this.setData({
        showingIndex: 0
      });
      return;
    }
    this.setData({
      showingIndex: 99
    });
  },
  changeCate: function(e) {
    var tapIndex = e.target.dataset.itemid;
    this.setData({
      cateIndex: tapIndex
    });
    this.getList();
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
          var sHeight = (windowHeight - res.height) - 50;
          _self.setData({
            filterHeight: sHeight + 'px'
          });
        }).exec();
      }
    });
  },

  //提交条件
  formsubmit: function(e) {
    wx.showModal({
      title: '请观察控制台',
      content: '条件以表单形式提交 ^_^'
    });
    _self.setData({
      showingIndex: 0
    });
    this.getList();
    console.log(e)
  },
  //重置表单
  formReset: function() {
    this.getList();
    _self.setData({
      genderIndex: 0
    })
    console.log(_self.data.genderIndex)
  },


  //条件更新后执行统一函数（如重新读取数据等）
  getList: function() {
    console.log("orderIndex : " + this.data.orderIndex);
    console.log("cateIndex : " + this.data.cateIndex);
    console.log("priceOrder : " + this.data.priceOrder);
    console.log('条件更新后执行统一函数（如重新读取数据等）');
  },
  closeAll: function() {
    this.setData({
      showingIndex: 0
    });
  },
  nomove: function() {},
  showDate1: function() {
    this.setData({
      show1: true
    });
  },
})