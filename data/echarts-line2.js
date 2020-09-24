import * as echarts from '../ec-canvas/echarts.js';
var option = {
  legend: {
    data: []
  },
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'line',
    },
    position: [56, 0],
    backgroundColor: 'rgba(50,50,50,0.6)'
  },
  grid: {
    // show: false
    left: 0,
    top: 42,
    right: 0,
    bottom: 8,
    containLabel: true
  },
  xAxis: {
    // name: '',
    // nameLocation: 'center',
    // nameTextStyle: {
    //   color: '#49a0ff',
    //   fontSize: 14,
    // },
    // nameLocation: 'center',
    // nameGap: 42,
    type: 'time',
    axisLine: {
      lineStyle: {
        color: '#f2f2f2',
        width: 1
      }
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '#808080'
      }
    },
  },
  yAxis: {
    nameTextStyle: {
      color: '#808080',
      fontSize: 14
    },
    nameGap: 24,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#f2f2f2'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#808080'
      }
    },
    type: 'category',
    data: ['深睡', '浅睡', '醒/梦']
  },
  series: [{
    type: 'line',
    smooth: true,
    symbol: 'none',
    labelStyle: {
      normal: {
        fontSize: 14,
        rich: {}
      }
    },
    lineStyle: {
      color: '#49a0ff'
    },
    data: []
  }]

}
module.exports = {
  option: option
}