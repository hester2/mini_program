import * as echarts from '../ec-canvas/echarts.js';
var option = {
  backgroundColor: '#ffffff',
  color: ['#ffffff'],
  series: {
    type: 'pie',
    radius: ['89%', '100%'],
    startAngle: 234,
    avoidLabelOverlap: false,
    legendHoverLink: false,
    hoverAnimation: false,
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [
      {
        value: 80,
        name: '',
        itemStyle: {
          normal: {
            color:'#49a0ff'
            // color: new echarts.graphic.LinearGradient(
            //   0, 0, 0, 1, [{
            //       offset: 0,
            //       color: '#bf64ff'
            //     },
            //     {
            //       offset: 0.4,
            //       color: '#8880ff'
            //     },
            //     {
            //       offset: 0.8,
            //       color: '#49a0ff'
            //     },
            //     {
            //       offset: 1,
            //       color: '#a6d6fc'
            //     }
            //   ]
            // )
          }
        },
        label: {
          show: true,
          position: 'center',
          formatter: [
            '{a|睡眠}',
            '{a|{b}}',
          ].join('\n\n'),
          rich: {
            a: {
              color: '#4d4d4d',
              fontSize: 24
            }
          }
        },
      },
      {
        value: 20,
        itemStyle: {
          color: '#ffffff',
        },
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