var app = getApp()
const config = require('../../../../../utils/config.js')

Page({
  data: {
    isOpen: [false, true],
    addContactModalStatus: false,
    toMemberPhone: '',
    currentTab: '',
    commonOrSos: '',
    imei: '',
    clockType: '',
    contacts: [],
    clocks: [],
    linkInfo: [],
    updateContactModalStatus: false,
    updateSosModalStatus: false,
    deleteContactModalStatus: false,
    imgAdd: app.globalData.imgServer + 'more/icon/add.png',
    imgClock: app.globalData.imgServer + 'more/icon/clock.png',
    imgPerson: app.globalData.imgServer + 'more/icon/person.png',
    imgPhone: app.globalData.imgServer + 'more/icon/phone.png',
    touchStart: '',
    touchEnd: '',
    deleteDistanceClockStatus:false,
    id:'',
    level:''
  },

  // 初始加载远程设备页面，联系人模块
  onLoad: function(options) {
    this.setData({
      imei: options.imei,
      toMemberPhone: options.toMemberPhone,
      commonOrSos: '1',
      currentTab: '0'
    })
    var imei = options.imei
    var commonOrSos = '1'
    var toMemberPhone = options.toMemberPhone
    this.getContactInfo(imei, commonOrSos, toMemberPhone)
  },
  // 通讯录变化展示
  onChange(event) {

  },
  onShow: function() {
    var imei = this.data.imei
    var commonOrSos = this.data.commonOrSos
    var toMemberPhone = this.data.toMemberPhone
    if (this.data.currentTab === '0') {} else if (this.data.currentTab === '2') {} else {
      var clockType = this.data.clockType
      this.getClockInfo(clockType)
    }
  },
  //进入SOS或联系人模块
  goToSOSLinkman: function(e) {
    this.setData({
      commonOrSos: e.currentTarget.dataset.current,
      currentTab: e.currentTarget.dataset.id
    })
    let imei = this.data.imei
    let commonOrSos = e.currentTarget.dataset.current
    let toMemberPhone = this.data.toMemberPhone
    this.getContactInfo(imei, commonOrSos, toMemberPhone)
  },
  //进入定时模块
  goToDistanceClock: function(e) {
    this.setData({
      clockType: e.currentTarget.dataset.current,
      currentTab: e.currentTarget.dataset.id,
      clocks: []
    })
    this.getClockInfo(e.currentTarget.dataset.current)
  },
  //获取提醒或定时信息
  getClockInfo: function(clockType) {
    let userId = app.globalData.userId
    let imei = this.data.imei
    let toMemberPhone = this.data.toMemberPhone
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
    app.http.postRequest(config.postGetDistanceClock, {
      userId: userId,
      imei: imei,
      clockType: clockType,
      toMemberPhone: toMemberPhone
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          clocks: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        });
        this.setData({
          clocks: []
        })
      }

    })
  },
  // 切换开关状态
  changeSwitch: function(e) {
    var that = this
    var index = e.currentTarget.dataset.id
    var date = that.data.clocks[index].repetitionType
    let onOff = that.data.clocks[index].onOff
    if (onOff === 1) {
      onOff = 0
    } else if (onOff === 0) {
      onOff = 1
    }
    app.http.postRequest(config.postModClock, {
      userId: app.globalData.userId,
      imei: that.data.imei,
      clockType: that.data.clockType,
      id: that.data.clocks[index].id,
      title: that.data.clocks[index].title,
      content: that.data.clocks[index].content,
      nextDatetime: that.data.clocks[index].nextDatetime,
      onOff: onOff,
      week: that.data.clocks[index].week,
      endDatetime: that.data.clocks[index].endDatetime
    }).then(res => {
      if (res.data.code === 'GN00000') {
        let clockType = that.data.clockType
        that.getClockInfo(clockType)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  //操作定时模块
  doChangeDistanceClock: function(e) {
    let that = this
    let index = e.currentTarget.dataset.id
    let touchTime = that.data.touchEnd - that.data.touchStart;
    if (touchTime > 350) {
      that.setData({
        deleteDistanceClockStatus: true,
        id: that.data.clocks[index].id
      })
    } else {
      that.doUpdateDistanceClock(index)
    }
  },
  //删除定时模块
  doDeleteDistanceClock: function() {
    let that = this
    that.hideUpdatecontactModal()
    app.http.postRequest(config.postDeleteClock, {
      userId: app.globalData.userId,
      imei: that.data.imei,
      clockType: that.data.clockType,
      id: that.data.id
    }).then(res => {
      if (res.data.code === 'GN00000') {
        that.getClockInfo(that.data.clockType)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  //修改定时模块
  doUpdateDistanceClock: function (index) {
    let imei = this.data.imei
    let id = this.data.clocks[index].id
    let contentType = ''
    if(this.data.clockType == 1){
      wx.navigateTo({
        url: 'change/index?imei=' + imei + "&id=" + id + "&contentType=" + contentType,
      })
    }else if(this.data.clockType == 2){
      wx.navigateTo({
        url: 'changes/index?imei=' + imei + "&id=" + id + "&contentType=" + contentType,
      })
    }
 
  },
  // 跳转添加定时模块页面
  goToAddTiming: function(e) {
    let imei = this.data.imei
    if(this.data.clockType == 1){
      wx.navigateTo({
        url: 'newTiming-reminder/index?imei=' + imei,
      })
    }else if(this.data.clockType == 2){
      wx.navigateTo({
        url: 'newTiming-reminders/index?imei=' + imei,
      })
    }

  },
  //按下事件开始
  mytouchstart: function(e) {
    let that = this;
    that.setData({
      touchStart: e.timeStamp
    })
  },
  //按下事件结束
  mytouchend: function(e) {
    let that = this;
    that.setData({
      touchEnd: e.timeStamp
    })
  },
  // 进入修改和删除联系人模块
  dochangeContact: function(e) {
    let that = this;
    let index = e.currentTarget.dataset.id
    let listIndex = e.currentTarget.dataset.current
      //触摸时间距离页面打开的毫秒数
      let touchTime = that.data.touchEnd - that.data.touchStart;
      if (touchTime > 350) {
        that.setData({
          deleteContactModalStatus: true,
        })
        if (this.data.currentTab === '0') {
        that.setData({
          recordId: that.data.contacts[index].list[listIndex].recordId,
          level: '0'
        })}else{
          that.setData({
            recordId: that.data.contacts[index].id,
            level: that.data.contacts[index].sosLevel
          }) 
        }
      } else {
        that.doChange(index, listIndex)
      }
  },
  doChange: function(index, listIndex) {
    if (this.data.currentTab === '0') {
      this.setData({
        ["linkInfo.name"]: this.data.contacts[index].list[listIndex].name,
        ["linkInfo.phone"]: this.data.contacts[index].list[listIndex].number,
        ["linkInfo.recordId"]: this.data.contacts[index].list[listIndex].recordId,
        ["linkInfo.level"]: '0',
        updateContactModalStatus: true,
      });
    } else {
      if (this.data.contacts[index].id) {
        this.setData({
          ["linkInfo.name"]: this.data.contacts[index].nickname,
          ["linkInfo.phone"]: this.data.contacts[index].phone,
          ["linkInfo.recordId"]: this.data.contacts[index].id,
          ["linkInfo.level"]: this.data.contacts[index].sosLevel,
          updateSosModalStatus: true,
        })
      } else {
        this.setData({
          ["linkInfo.name"]: '姓名',
          ["linkInfo.phone"]: '手机',
          ["linkInfo.level"]: this.data.contacts[index].sosLevel,
          updateSosModalStatus: true,
        });
      }
    }
  },
  doDelete: function() {
    var that = this
    var userId = app.globalData.userId
    var imei = that.data.imei
    var recordId = that.data.recordId
    var level = that.data.level
    var toMemberPhone = that.data.toMemberPhone
    var commonOrSos = that.data.commonOrSos
    app.http.postRequest(config.postDeleteLinkman, {
      userId: userId,
      imei: imei,
      level: level,
      recordId: recordId,
      toMemberPhone: toMemberPhone
    }).then(res => {
      if (res.data.code === 'GN00000') {
        that.getContactInfo(imei, commonOrSos, toMemberPhone)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
      that.hideUpdatecontactModal();
      that.setData({
        linkInfo: []
      })
    })
  },
  // 获取输入的联系人信息
  enterName: function(e) {
    this.setData({
      ["linkInfo.name"]: e.detail.value
    })
  },
  enterPhone: function(e) {
    this.setData({
      ["linkInfo.phone"]: e.detail.value
    })
  },
  //Sos联系人操作
  doSosContact: function() {
    if (this.data.linkInfo.recordId) {
      this.doUpdateContact()
    } else {
      this.toAddcontact()
    }
  },
  //修改联系人信息
  doUpdateContact: function() {
    var that = this
    var userId = app.globalData.userId
    var imei = that.data.imei
    var recordId = that.data.linkInfo.recordId
    var name = that.data.linkInfo.name
    var phone = that.data.linkInfo.phone
    var level = that.data.linkInfo.level
    var commonOrSos = that.data.commonOrSos
    var toMemberPhone = that.data.toMemberPhone
    app.http.postRequest(config.postModLinkman, {
      userId: userId,
      imei: imei,
      level: level,
      recordId: recordId,
      name: name,
      phone: phone,
    }).then(res => {
      if (res.data.code === 'GN00000') {
        that.getContactInfo(imei, commonOrSos, toMemberPhone)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
      that.hideUpdatecontactModal();
      that.setData({
        linkInfo: []
      })
    })
  },

  // 隐藏modal
  hideUpdatecontactModal: function() {
    this.setData({
      updateContactModalStatus: false,
      updateSosModalStatus: false,
      deleteContactModalStatus: false,
      deleteDistanceClockStatus:false
    })

  },

  // 展示 添加modal
  openAddcontactModal: function() {
    this.setData({
      addContactModalStatus: true,
      ["linkInfo.level"]: '0',
    })
  },
  // 添加联系人
  toAddcontact: function() {
    let that = this
    let userId = app.globalData.userId
    let imei = that.data.imei
    let name = that.data.linkInfo.name
    let phone = that.data.linkInfo.phone
    let level = that.data.linkInfo.level
    let commonOrSos = that.data.commonOrSos
    let toMemberPhone = that.data.toMemberPhone
    app.http.postRequest(config.postAddLinkman, {
      userId: userId,
      imei: imei,
      name: name,
      phone: phone,
      level: level
    }).then(res => {
      if (res.data.code === 'GN00000') {
        that.getContactInfo(imei, commonOrSos, toMemberPhone)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
      that.hideAddcontactModal();
      that.setData({
        linkInfo: []
      })
    })
  },
  // 隐藏 添加modal
  hideAddcontactModal: function() {
    this.setData({
      addContactModalStatus: false,
      updateSosModalStatus: false
    })

  },
  //获取联系人信息并初始化通讯录
  getContactInfo: function(imei, commonOrSos, toMemberPhone) {
    var userId = app.globalData.userId
    var that = this
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
    app.http.postRequest(config.postGetDistanceLinkman, {
      userId: userId,
      imei: imei,
      commonOrSos: commonOrSos,
      toMemberPhone: toMemberPhone
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        var contacts = res.data.data
        that.setData({
          contacts: res.data.data
        })
        if (commonOrSos == '1') {
          that.showContact(contacts)
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        });
        if (commonOrSos == '1') {
          let contacts = []
          that.showContact(contacts)
        }
      }

    });
  },
  showContact: function(contacts) {
    var storeContact = new Array(26);
    const words = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    words.forEach((item, index) => {
      storeContact[index] = {
        key: item,
        list: []
      }
    })
    contacts.forEach((item) => {
      let firstName = item.namePinyin.substring(0, 1);
      let index = words.indexOf(firstName);
      storeContact[index].list.push({
        name: item.nickname,
        avatar: item.avatarUrl,
        number: item.phone,
        key: firstName,
        recordId: item.id
      });
    })
    var nowContacts = storeContact;
    this.setData({
      contacts: nowContacts
    })
  },
});