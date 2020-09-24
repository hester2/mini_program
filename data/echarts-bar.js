import * as echarts from '../ec-canvas/echarts.js';
var option = {
  color: ['#49a0ff', '#a6d6fc', '#ffb653'],
  legend: {
    data: [],
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
    // nameTextStyle: {
    //   color: '#49a0ff',
    //   fontSize: 14,
    // },
    // nameLocation: 'center',
    // nameGap: 42,
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#f2f2f2',
        width: 1
      }
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
    data: []
  },
  yAxis: {
    name: '（时）',
    nameTextStyle: {
      color: '#808080',
      fontSize: 14,
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
        width: 1,
        color: '#f2f2f2'
      }
    },
    type: 'value',
  },
  series: [{
      name: '',
      type: 'bar',
      barGap: 0,
      data: []
    },
    {
      name: '',
      type: 'bar',

      data: []
    },
    {
      name: '',
      type: 'bar',

      data: []
    }
  ]
}
module.exports = {
  option: option
}