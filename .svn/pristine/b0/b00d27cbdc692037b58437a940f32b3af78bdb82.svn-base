import * as echarts from '../ec-canvas/echarts.js';
var option = {
  legend: {
    data: []
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
    },
    position: [140, 0],
    backgroundColor: 'rgba(50,50,50,0.6)'
  },
  grid: {
    // show: false
    left: 0,
    top: 42,
    right: 0,
    bottom: 8,
    // right: 15,
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
    name: '',
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
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '#808080'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 1,
        color: '#f2f2f2'
      }
    },
    type: 'value',
    minInterval: 1
  },
  series: [{
    name: '',
    type: 'line',
    symbolSize: 8, //折线点的大小
    itemStyle: {
      normal: {
        color: '#ffffff', //改变折线点的颜色
        borderColor: '#bf46ff',
        borderWidth: 1,
        rich: {},
        lineStyle: {
          width: 1,
          color: '#bf46ff' //改变折线颜色
        }
      }
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [{
              offset: 0,
              color: '#bf64ff'
            },
            {
              offset: 0.4,
              color: 'rgba(250,250,250,0)'
            }
          ]
        )
      }
    },
    data: []
  }]
}
module.exports = {
  option: option
}