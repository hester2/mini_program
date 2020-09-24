   import * as echarts from '../ec-canvas/echarts.js';
   var option = {
     backgroundColor: '#ffffff',
     color: ['#ffffff'],
     series: {
       type: 'pie',
       radius: ['89%', '100%'],
       labelLine: {
         normal: {
           show: false
         }
       },
       avoidLabelOverlap: false,
       hoverAnimation: false,
       silent: true,
       hoverOffset:0,
       selectedOffset:0,
       data: [{
           value: 80,
           label: {
             show: true,
             position: 'center',
             formatter: [
               '{a|{d}分}',
               '{b|健康评估}'
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
             color: '#bf64ff',
           }
         },
         {
           value: 20,
           itemStyle: {
             color: '#e0c0fc',
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