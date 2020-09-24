import * as echarts from '../ec-canvas/echarts.js';
var option = {
  backgroundColor: '#ffffff',
  color: ['#ffffff'],
  series: {
    type: 'pie',
    radius: ['89%', '100%'],
    avoidLabelOverlap: false,
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
        value: 100,
        name: '',
        label: {
          show: true,
          position: 'center',
          formatter: [
            '{a|{d}%}',
            '{b|目标步数{b}}'
          ].join('\n\n'),
          rich: {
            a: {
              color: '#4d4d4d',
              fontSize: 24
            },
            b: {
              color: '#808080',
              fontSize: 12
            }
          }
        },
        itemStyle: {
          color: '#49a0ff',
        }
      },
      {
        value: 0,
        name: '',
        itemStyle: {
          color: '#a6d6fc',
        }
      },
      {
        value: 0,
        name: ''
      }
    ]
  }

};

module.exports = {
  option: option
}