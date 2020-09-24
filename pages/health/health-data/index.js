var app = getApp();
const config = require('../../../utils/config.js')
const util = require('../../../utils/util.js')
var echartsMutilLineOption = require('../../../data/echarts-mutil-line.js')
var echartsLineOption = require('../../../data/echarts-line.js')
var echartsLine2Option = require('../../../data/echarts-line2.js')
var echartsBarOption = require('../../../data/echarts-bar.js')
import * as echarts from '../../../ec-canvas/echarts.js';

Page({
  data: {
    dateRange: 1,
    toMemberPhone: '',
    date: '',
    imei: '',
    healthType: '1',
    showDates: false,
    healthDatas: [],
    healthComment: [],
    maskLeft: true,
    maskRight: false,
    dateStatus: [false, false, true],
    selectStatus: [false, false, true],
    calendarYear: [],
    calendarMonth: [],
    calendarDay: [],
    calendarDayList: [
      [
        ['一月', '二月', '三月', '四月'],
        ['五月', '六月', '七月', '八月'],
        ['九月', '十月', '十一月', '十二月']
      ], '', ''
    ],
    yearActive: ['无', '无', '无'],
    monthActive: ['无', '无', '无'],
    dateActive: ['无', '无', '无'],
    today: '',
    month: '',
    year: '',
    selectDate: [],
    echartXname: '',
    imgLeft: app.globalData.imgServer + 'health/icon/healthDataLeft.png',
    imgRight: app.globalData.imgServer + 'health/icon/healthDataRight.png',
    imgicon1: app.globalData.imgServer + 'health/icon/healthDataIcon1.png',
    imgicon2: app.globalData.imgServer + 'health/icon/healthDataIcon2.png',
    imgCal: app.globalData.imgServer + 'health/icon/healthDataCal.png',
    imgLine: app.globalData.imgServer + 'health/icon/healthDataLine.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 获取当前页面参数健康数据
  onLoad: function(options) {
    let time = util.formatTime(new Date());
    let timeArry = time.split('-')
    for (let i = 0; i < 3; i++) {
      timeArry[i] = Number(timeArry[i])
    }
    this.setData({
      imei: options.imei,
      healthType: options.healthType,
      toMemberPhone: options.toMemberPhone,
      date: time,
      year: timeArry[0],
      month: timeArry[1],
      today: timeArry[2]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      this.refreshEcharts(this.data.dateRange, this.data.date, this.data.healthType);
    }
  },
  refreshEcharts: function(dateRange, date, healthType) {
    let self = this;
    setTimeout(function() {
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
      app.http.postRequest(config.postGetHealthDetail, {
        userId: app.globalData.userId,
        imei: self.data.imei,
        healthType: healthType,
        date: date,
        toMemberPhone: self.data.toMemberPhone,
        dateRange: dateRange
      }).then(res => {
        if (res.data.code === 'GN00000') {
          let tmpDate = res.data.data.chart.dateRange.split('-');
          if (tmpDate.length > 3) {
            let _a = tmpDate[2];
            _a = _a.split('至');
            tmpDate[0] = parseInt(_a[1]);
            tmpDate[1] = parseInt(tmpDate[3]);
            tmpDate[2] = parseInt(tmpDate[4]);
          } else {
            tmpDate[0] = parseInt(tmpDate[0]);
            tmpDate[1] = parseInt(tmpDate[1]);
            tmpDate[2] = parseInt(tmpDate[2]);
          };
          let date;
          if (dateRange == 30) {
            date = new Date(tmpDate[0] + '/' + tmpDate[1] + '/' + '01').getTime();
          } else {
            date = new Date(tmpDate[0] + '/' + tmpDate[1] + '/' + tmpDate[2]).getTime();
          }
          self.setData({
            healthDatas: res.data.data.blocks,
            healthComment: res.data.data.comment,
            date: date,
            echartXname: res.data.data.chart.dateRange
          });
          for (let i = 0; i < 3; i++) {
            let yearActive = self.data.yearActive
            let monthActive = self.data.monthActive
            let calendarYear = self.data.calendarYear
            let calendarMonth = self.data.calendarMonth
            let calendarDay = self.data.calendarDay
            yearActive[i] = calendarYear[i] = tmpDate[0]
            monthActive[i] = calendarMonth[i] = tmpDate[1]
            calendarDay[i] = tmpDate[2]
            self.setData({
              calendarYear: calendarYear,
              calendarMonth: calendarMonth,
              calendarDay: calendarDay,
              yearActive: yearActive,
              monthActive: monthActive
            });
            let dateActive = self.data.dateActive
            if (self.data.dateStatus[i]) {
              if (i == 0) {
                let monthTmp = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                let index = monthActive[i] - 1
                dateActive[i] = monthTmp[index]
              } else {
                dateActive[i] = tmpDate[2]
              };
              let selectStatus = [false, false, false]
              selectStatus[i] = true
              self.setData({
                selectDate: [yearActive[i], monthActive[i], dateActive[i]],
                selectStatus: selectStatus
              })
            };
            self.setData({
              dateActive: dateActive
            })
          };
          let value = res.data.data.chart;
          let tmp = healthType.toString()
          let chartnode = '#mychart-dom-line-' + tmp
          let option
          if (healthType === '1') {
            option = echartsMutilLineOption
            // option.option.xAxis.name = value.dateRange;
            option.option.xAxis.data = value.x;
            option.option.yAxis.name = value.unit;
            if (value.x.length < 1) {
              option.option.grid.left = 28
            } else {
              option.option.grid.left = 0
            }
            option.option.series[0].name = value.series[0].legend;
            option.option.series[0].data = value.series[0].y;
            option.option.series[1].name = value.series[1].legend;
            option.option.series[1].data = value.series[1].y;
          } else if (healthType === "8") {
            if (dateRange === 7) {
              option = echartsBarOption
              option.option.legend.data = value.series[0].legend;
              // option.option.xAxis.name = value.dateRange;
              option.option.series[0].name = value.series[0].legend[0];
              option.option.series[0].data = value.series[0].deep;
              option.option.series[1].name = value.series[0].legend[1];
              option.option.series[1].data = value.series[0].light;
              option.option.series[2].name = value.series[0].legend[2];
              option.option.series[2].data = value.series[0].wake;
            } else {
              option = echartsLine2Option
              option.option.legend.data = [value.series[0].legend];
              // option.option.xAxis.name = value.dateRange;
              option.option.series[0].data = value.series[0].dots;
            }
          } else {
            option = echartsLineOption
            option.option.legend.data = [value.series[0].legend];
            // option.option.xAxis.name = value.dateRange;
            option.option.xAxis.data = value.x;
            option.option.yAxis.name = value.unit;
            if (value.x.length < 1) {
              option.option.grid.left = 28
            } else {
              option.option.grid.left = 0
            }
            option.option.series[0].name = value.series[0].legend;
            option.option.series[0].data = value.series[0].y;
          }
          self.selectComponent(chartnode).init((canvas, width, height) => {
            let lineChart = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            lineChart.clear();
            lineChart.setOption(option.option)
            canvas.setChart(lineChart);
            return lineChart;
          }, 500);
          self.setData({
            showDates: false
          });
          if (wx.hideLoading) {
            wx.hideLoading();
          } else {
            wx.hideToast();
          }
        } else {
          if (wx.hideLoading) {
            wx.hideLoading();
          } else {
            wx.hideToast();
          }
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    })
  },
  //tab条左右滚动
  touchRight: function() {
    this.setData({
      maskLeft: false,
      maskRight: true
    })
  },
  touchLeft: function() {
    this.setData({
      maskLeft: true,
      maskRight: false
    })
  },
  //切换健康数据
  onClickChangeData: function(e) {
    let id = e.currentTarget.dataset.id
    this.setData({
      healthType: id,
    })
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      this.refreshEcharts(this.data.dateRange, this.data.date, id);
    }
  },
  doHideDate: function() {
    this.setData({
      showDates: false
    })
  },
  //页面切换日期
  getLastDateData: function() {
    let dateTmp = this.data.echartXname.split('-')
    if (dateTmp.length > 3) {
      let _a = dateTmp[2]
      _a = _a.split('至')
      dateTmp[0] = parseInt(_a[1])
      dateTmp[1] = parseInt(dateTmp[3])
      dateTmp[2] = parseInt(dateTmp[4])
    } else {
      dateTmp[0] = parseInt(dateTmp[0]);
      dateTmp[1] = parseInt(dateTmp[1]);
      dateTmp[2] = parseInt(dateTmp[2]);
    };
    let date = new Date(dateTmp[0] + '/' + dateTmp[1] + '/' + dateTmp[2]).getTime()
    let _p
    if (this.data.dateRange == 1) {
      _p = 24 * 60 * 60 * 1000;
      dateTmp = new Date(dateTmp[0] + '/' + dateTmp[1] + '/' + dateTmp[2]).getTime()
    } else if ((this.data.dateRange == 7)) {
      _p = 7 * 24 * 60 * 60 * 1000;
      dateTmp = new Date(dateTmp[0] + '/' + dateTmp[1] + '/' + dateTmp[2]).getTime()
    } else if ((this.data.dateRange == 30)) {
      let count = new Date(dateTmp[0], dateTmp[1] - 1, 0).getDate()
      _p = count * 24 * 60 * 60 * 1000;
      dateTmp = new Date(dateTmp[0] + '/' + dateTmp[1] + '/' + '01').getTime()
    };
    dateTmp = dateTmp - _p;
    this.refreshEcharts(this.data.dateRange, dateTmp, this.data.healthType)
  },
  getNextDateData: function() {
    let dateTmp = this.data.echartXname.split('-')
    if (dateTmp.length > 3) {
      let _a = dateTmp[2]
      _a = _a.split('至')
      dateTmp[0] = parseInt(_a[1])
      dateTmp[1] = parseInt(dateTmp[3])
      dateTmp[2] = parseInt(dateTmp[4])
    } else {
      dateTmp[0] = parseInt(dateTmp[0]);
      dateTmp[1] = parseInt(dateTmp[1]);
      dateTmp[2] = parseInt(dateTmp[2]);
    };
    let _p

    if (this.data.dateRange == 1) {
      _p = 24 * 60 * 60 * 1000;
      dateTmp = new Date(dateTmp[0] + '/' + dateTmp[1] + '/' + dateTmp[2]).getTime()
    } else if ((this.data.dateRange == 7)) {
      _p = 7 * 24 * 60 * 60 * 1000;
      dateTmp = new Date(dateTmp[0] + '/' + dateTmp[1] + '/' + dateTmp[2]).getTime()
    } else if ((this.data.dateRange == 30)) {
      let count = new Date(dateTmp[0], dateTmp[1], 0).getDate()
      _p = count * 24 * 60 * 60 * 1000;
      dateTmp = new Date(dateTmp[0] + '/' + dateTmp[1] + '/' + '01').getTime()
    };
    dateTmp = dateTmp + _p;
    this.refreshEcharts(this.data.dateRange, dateTmp, this.data.healthType)
  },
  // 进入切换日期弹窗
  showDatesModal: function() {
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      this.setData({
        showDates: true
      });
      this.getCalendarList(this.data.dateStatus)
    };
  },
  //日历展示模块
  getCalendarList: function(dateStatus) {
    for (let _p = 0; _p < 3; _p++) {
      if (dateStatus[_p]) {
        let date = this.data.calendarYear[_p] + '/' + this.data.calendarMonth[_p] + '/1';
        //获取当前月第一天是周几，添加相对应空字符串到临时数组
        let weekArray = new Array("0", "1", "2", "3", "4", "5", "6");
        let weekIndex = weekArray[new Date(date).getDay()];
        weekIndex = Number(weekIndex);
        let calendarTmpDates = []
        for (let p = 0; p < weekIndex; p++) {
          calendarTmpDates.push('')
        };
        //获取当前月份天数，遍历生成日期数组
        let dayCount = new Date(this.data.calendarYear[_p], this.data.calendarMonth[_p], 0).getDate()
        for (let i = 1; i < dayCount + 1; i++) {
          calendarTmpDates.push(i)
        };
        //将日期数组按周分割（cover-view元素使用弹性布局自动分行无法实现，现方案为手动分割数组）
        let dates = []
        for (let q = 0; q < Math.ceil(dayCount / 7); q++) {
          let tmp = calendarTmpDates.slice(q * 7, q * 7 + 7)
          if (tmp.length < 7) {
            for (let _q = tmp.length + 1; _q < 8; _q++) {
              tmp.push('')
            }
          };
          dates.push(tmp)
        };
        let calendarDayList = this.data.calendarDayList
        if (_p == 0) {

        } else {
          calendarDayList[_p] = dates
        }
        this.setData({
          calendarDayList: calendarDayList
        })
      }
    }
  },
  //操作日期
  doChangeDateType: function(e) {
    let dateType = e.currentTarget.dataset.date;
    let tmpDateStatus = [false, false, false];
    tmpDateStatus[dateType] = true;
    this.setData({
      dateStatus: tmpDateStatus
    });
    this.getCalendarList(tmpDateStatus);
  },
  chooseDate: function(e) {
    for (let i = 0; i < 3; i++) {
      if (this.data.dateStatus[i]) {
        let currentDate = e.currentTarget.dataset.date;
        if (this.data.year < this.data.calendarYear[i]) {

        } else if (this.data.year == this.data.calendarYear[i] && this.data.month < this.data.calendarMonth[i]) {

        } else if (this.data.year == this.data.calendarYear[i] && this.data.month == this.data.calendarMonth[i] && this.data.today < currentDate) {

        } else {
          let yearActive = ['无', '无', '无']
          yearActive[i] = this.data.calendarYear[i]
          let monthActive = ['无', '无', '无']
          monthActive[i] = this.data.calendarMonth[i]
          let dateActive = ['无', '无', '无']
          dateActive[i] = currentDate
          let selectStatus = [false, false, false]
          selectStatus[i] = true
          this.setData({
            yearActive: yearActive,
            monthActive: monthActive,
            dateActive: dateActive,
            selectDate: [yearActive[i], monthActive[i], dateActive[i]],
            selectStatus: selectStatus
          });
        };
      };
    };

  },
  goLastMonth: function() {
    for (let i = 0; i < 3; i++) {
      if (this.data.dateStatus[i]) {
        let calendarMonth = this.data.calendarMonth
        let calendarYear = this.data.calendarYear
        if (i === 0) {
          calendarYear[i] = Number(calendarYear[i])
          calendarYear[i] = calendarYear[i] - 1
        } else {
          calendarMonth[i] = Number(calendarMonth[i])
          calendarYear[i] = Number(calendarYear[i])
          if (calendarMonth[i] > 1) {
            calendarMonth[i] = calendarMonth[i] - 1
          } else {
            calendarYear[i] = calendarYear[i] - 1
            calendarMonth[i] = 12
          };
        }
        this.setData({
          calendarYear: calendarYear,
          calendarMonth: calendarMonth
        });
        let dateActive = this.data.dateActive
        if (this.data.yearActive[i] == calendarYear[i] && this.data.monthActive[i] == calendarMonth[i]) {
          dateActive[i] = this.data.selectDate[2]
        } else {
          dateActive[i] = '无'
        };
        this.setData({
          dateActive: dateActive
        })
        this.getCalendarList(this.data.dateStatus)
      }
    }
  },
  goNextMonth: function() {
    for (let i = 0; i < 3; i++) {
      if (this.data.dateStatus[i]) {
        let calendarMonth = this.data.calendarMonth
        let calendarYear = this.data.calendarYear
        if (i === 0) {
          calendarYear[i] = Number(calendarYear[i])
          calendarYear[i] = calendarYear[i] + 1
        } else {
          calendarMonth[i] = Number(calendarMonth[i])
          calendarYear[i] = Number(calendarYear[i])
          if (calendarMonth[i] < 12) {
            calendarMonth[i] = calendarMonth[i] + 1
          } else {
            calendarYear[i] = calendarYear[i] + 1
            calendarMonth[i] = 1
          };
        }
        this.setData({
          calendarYear: calendarYear,
          calendarMonth: calendarMonth
        });
        let dateActive = this.data.dateActive
        if (this.data.yearActive[i] == calendarYear[i] && this.data.monthActive[i] == calendarMonth[i]) {
          dateActive[i] = this.data.selectDate[2]
        } else {
          dateActive[i] = '无'
        };
        this.setData({
          dateActive: dateActive
        })
        this.getCalendarList(this.data.dateStatus)
      }
    }
  },
  // 切换日期，获取血压等数据
  getNewHealthData: function(e) {
    let dateRange = e.currentTarget.dataset.daterange
    if (this.data.imei === '') {
      wx.showToast({
        title: '暂无绑定/关注的设备',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      this.setData({
        dateRange: dateRange
      });
      let dateRanges = [30, 7, 1]
      let date
      for (let i = 0; i < 3; i++) {
        if (dateRange == dateRanges[i]) {
          if (this.data.selectStatus[i] === this.data.dateStatus[i]) {
            let year = this.data.selectDate[0]
            let month = this.data.selectDate[1]
            let day = this.data.selectDate[2]
            if (i === 0) {
              let arry = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
              for (let _i = 0; _i < 12; _i++) {
                if (arry[_i] == day) {
                  month = _i + 1
                }
              };
              year = this.dateFull(year)
              month = this.dateFull(month)
              date = year + '-' + month + '-01';
            } else {
              year = this.dateFull(year)
              month = this.dateFull(month)
              day = this.dateFull(day)
              date = year + '-' + month + '-' + day;
            };
            this.refreshEcharts(dateRange, date, this.data.healthType);
          } else {
            wx.showToast({
              title: '请选择日期',
              icon: 'none',
              duration: app.globalData.duration
            });
          };
        };

      }
    }
  },
  //日期补零
  dateFull: function(fullDate) {
    if (fullDate < 10) {
      fullDate = String(fullDate)
      fullDate = '0' + fullDate
    };
    return fullDate
  }
});