import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import {
  Style,
  Fill,
  Stroke,
  Icon,
  Circle,
  RegularShape,
  Text
} from "ol/style";
import FillPattern from 'ol-ext/style/FillPattern'
import * as echarts from 'echarts';
import icon from "../icon/pic2.png"
import icondown from "../icon/down2.png"
import ol_ext_element from 'ol-ext/util/element'
import {Heatmap as HeatmapLayer} from 'ol/layer.js';
import { Feature } from "ol";
import { Point } from "ol/geom";

import Legend from "ol-ext/legend/Legend";

import {
  getLayerData
} from '@/http/api/api-lhy'

import {
  saveAs
} from 'file-saver'
import { transform } from "ol/proj";

class QiuSuo1 extends VectorLayer {
  constructor(opt_options) {
    const options = opt_options || {};
    let layerName = options.layerName || 'HistoricalEQParameter'

    // HistoricalEQParameter-历史地震震源参数-点
    // RegionalPropagationPathDurationModel-区域传播路径持时模型-面
    // RegionalQualityFactor-区域品质因子-面
    // SourceRuptureModel-震源破裂模型-面
    // StationAndSiteAmplificationCoefficient-强震动台站及场地放大系数-点
    let source = new VectorSource({
      loader: function (extent, resolution, projection) {
        let config = {
          layerName: layerName,
          hasGeom: true,
        }
        getLayerData(config).then(e => {
          console.log(e);
          if(e.data && e.data.type != null){
            let features = new GeoJSON().readFeatures(e.data, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            });
            this.addFeatures(features);
            this.dispatchEvent('featuresloadend')
          }

        })
      }
    })
    super({
      source,
      style: function (f) {
        return setStyle(layerName, f)
      }
    })
    this._popupTemplate = setPopup(layerName)
    this.name = layerName
    this.i18n = options.i18n
  }
  get popupTemplate() {
    return this._popupTemplate
  }
  get legend() {
    return getLegend(this.name, this.i18n)
  }
}
var setPopup = (type) => {
  switch (type) {
    case 'HistoricalEQParameter':
      return {
        attributes: {
          // 'ID': {
          //   title: '编号',
          // },
          'OriginTime': {
            title: '发震时刻',
          },
          'Lon': {
            title: '经度',
            format: function (e, f) {
              return e.toFixed(2) + (e>0?'°E': '°W')
            }
          },
          'Lat': {
            title: '纬度',
            format: function (e, f) {
              return  e.toFixed(2) + (e>0?'°N': '°S')
            }
          },
          'Ms': {
            title: '面波震级',
          },
          'Mw': {
            title: '矩震级',
            format: function (e, f) {
              return e.toFixed(1)
            }
          },
          'Depth': {
            title: '震源深度',
          },
          'f0': {
            title: '震源拐角频率',
          },
          'BruneStressDrop': {
            title: '应力降（MPa）',
            format: function (e, f) {
              return parseFloat(e).toFixed(1)
            }
          },
          'M0': {
            title: '地震矩（Nm）',
            format: function (e, f) {
              return parseFloat(e).toExponential(2)
            }
          },
          'Mech': {
            title: '震源机制',
          },
          'Document': {
            title: '参考文献',
          },
          'CommentInfo': {
            title: '备注',
          }
        }
      }
      case 'RegionalPropagationPathDurationModel':
        return {
          attributes: {
              // 'ID': {
              //   title: '编号',
              // },
              'Region': {
                title: '有效区域',
              },
              'Document': {
                title: '参考文献',
              },
              'CommentInfo': {
                title: '备注',
              }
            },
            buttons: [{
              name: "查看持时模型",
              icon: icon,
              condition: (e) => {
                return e.get('HasTable') && JSON.parse(localStorage.getItem('user')).fileReview
              },
              click: (feature, that) => {
                let div = document.getElementById('ech')
                let span = document.getElementById('echtitle')
                span.innerHTML = '持时模型'
                div.style.display = 'block'
                let chartDom = document.getElementById('statistics')
                chartDom.childNodes.forEach(element => {
                  chartDom.removeChild(element)
                })
                let tablevalue = feature.get('table')
                let tablediv = ol_ext_element.create('table', {
                  className: 'table',
                  style: {
                    width: '100%',
                    margin: '0px',
                    borderCollapse: 'collapse'
                  }
                })
                let tr = ol_ext_element.create('tr', {
                  className: 'tr',


                })
                let td = ol_ext_element.create('td', {
                  className: 'td',
                  style: {
                    width: '40%',
                    height: '30px',
                    textAlign: "center",
                    border: "1px solid #bfbfbf"
                  }
                })
                td.innerHTML = 'Rrup'
                tr.appendChild(td)
                td = ol_ext_element.create('td', {
                  className: 'td',
                  style: {
                    width: '60%',
                    height: '30px',
                    textAlign: "center",
                    border: "1px solid #bfbfbf"
                  }
                })
                td.innerHTML = 'Duration'
                tr.appendChild(td)
                tablediv.appendChild(tr)
                tablevalue.forEach(element => {
                  tr = ol_ext_element.create('tr', {
                    className: 'tr',

                  })
                  td = ol_ext_element.create('td', {
                    className: 'td',
                    style: {
                      width: '40%',
                      height: '30px',
                      textAlign: "center",
                      border: "1px solid #bfbfbf"
                    }
                  })
                  td.innerHTML = element.rrup
                  tr.appendChild(td)
                  td = ol_ext_element.create('td', {
                    className: 'td',
                    style: {
                      width: '60%',
                      height: '30px',
                      textAlign: "center",
                      border: "1px solid #bfbfbf"
                    }
                  })
                  td.innerHTML = element.duration
                  tr.appendChild(td)
                  tablediv.appendChild(tr)
                })
                let odiv = ol_ext_element.create('div', {
                  className: "odiv",
                  style: {
                    width: "100%",
                    marginTop: "20px",
                    height: "calc(100% - 30px)",
                    overflow: "auto",
                    borderTop: '1px solid #bfbfbf',
                    borderBottom: '1px solid #bfbfbf',
                  }
                })
                odiv.appendChild(tablediv)
                chartDom.appendChild(odiv)
                div.children[0].style.height = tablediv.clientHeight + 'px'
                let title = `区域传播路径持时模型`
                div.children[0].children[0].innerHTML = title
              },
            }, {
              name: "下载附件",
              icon: icondown,
              condition: (e) => {
                return e.get('HasTable') && JSON.parse(localStorage.getItem('user')).download
              },
              click: (feature, that) => {
                let str = 'rrup  duration'
                feature.get('table').forEach(element => {
                  str += `\n${element.rrup}  ${element.duration}`
                })
                let blob = new Blob([str], {
                  type: "text/plain;charset=utf-8"
                });
                saveAs(blob, "区域传播路径持时模型 - " + feature.get('Region') + ".txt");
              },
            }]
        }
        case 'RegionalQualityFactor':
          return {
            attributes: {
              // 'ID': {
              //   title: '编号',
              // },
              'Q0': {
                title: '1Hz处的品质因子',
              },
              'Alpha': {
                title: '品质因子模型的指数项',
              },
              'Freqrange': {
                title: '有效频率范围',
              },
              'Document': {
                title: '参考文献',
              },
              'CommentInfo': {
                title: '备注',
              },
              ID1: {
                title: '公式',
                format: (e, f) => {
                  return `Q(f)=${f.get('Q0')}^${f.get('Alpha')}, Freq range:[${f.get('Freqrange').replace('-', ',')}]Hz`
                }
              }
            }
          }
          case 'SourceRuptureModel':
            return {
              attributes: {
                  // 'ID': {
                  //   title: '编号',
                  // },
                  'Name': {
                    title: '名称',
                  },
                  'Lon': {
                    title: '震中经度',
                    format: function (e, f) {
                      return e.toFixed(2) + (e>0?'°E': '°W')
                    }
                  },
                  'Lat': {
                    title: '震中纬度',
                    format: function (e, f) {
                      return e.toFixed(2) + (e>0?'°N': '°S')
                    }
                  },
                  'Depth': {
                    title: '深度',
                  },
                  'Document': {
                    title: '参考文献',
                  },
                  'CommentInfo': {
                    title: '备注',
                  }
                },
                buttons: [
                  {
                  name: "查看震源时间函数图",
                  icon: icon,
                  condition: (e) => {
                    return e.get('HasTable') && JSON.parse(localStorage.getItem('user')).fileReview
                  },
                  click: (feature, that) => {
                    let div = document.getElementById('ech')
                    let span = document.getElementById('echtitle')
                    span.innerHTML = '震源时间函数图'
                    div.style.display = 'block'
                    let chartDom = document.getElementById('statistics')
                    echarts.dispose(chartDom)
                    var myChart = echarts.init(chartDom);
                    var option;
                    let seriesdata = []
                    let allstf = []
                    let srate
                    feature.get('table').forEach(element => {
                      srate = element.srate
                      let data = element.stf.split(',')
                      if (allstf.length == 0) {
                        allstf = data
                      } else {
                        allstf = allstf.map((e, i) => {
                          return Number(e) + Number(data[i])
                        })
                      }
                    });

                    allstf.forEach((e, i) => {
                      seriesdata.push([i * (1 / srate), e / 10 ** 18])
                    })

                    option = {
                      xAxis: {
                        name: 'Time（s）',
                        nameLocation: 'middle',
                        nameGap: 30,
                        type: 'value',
                      },
                      yAxis: {
                        name: 'Seismic moment rate （10^18 Nm/s）',
                        nameLocation: 'middle',
                        nameGap: 30,
                        type: 'value'
                      },
                      series: [{
                        data: seriesdata,
                        type: 'line',
                        symbol: "none"
                      }]
                    };

                    option && myChart.setOption(option);
                  },
                },{
                  name: "破裂滑动分布图",
                  icon: icon,
                  condition: (e) => {
                    return e.get('HasTable') && JSON.parse(localStorage.getItem('user')).fileReview
                  },
                  click: (feature, that) => {
                    let div = document.getElementById('ech')
                    let span = document.getElementById('echtitle')
                    span.innerHTML = '破裂滑动分布图'
                    div.style.display = 'block'
                    let chartDom = document.getElementById('statistics')
                    echarts.dispose(chartDom)
                    var myChart = echarts.init(chartDom);
                    var option;
                    let table = feature.get('table')
                    //table排序
                    table.sort((a, b) => {
                      return parseInt(a.orderID) - parseInt(b.orderID)
                    })
                    //查看table中depth的数量
                    let depth = []
                    let sub_width = feature.get('table')[0].sub_width
                    let sub_len = feature.get('table')[0].sub_len
                    let xv = []
                    let yv = []
                    let zv = []
                    let kv = []
                    let max = 0
                    let min = 0
                    let qk = [feature.get('Lon'), feature.get('Lat')]
                    let distable = []
                    let nearvalue

                    table.forEach(e => {
                      if (!depth.includes(e.depth)) {
                        depth.push(e.depth)
                      }
                      max = Math.max(max, parseFloat(e.slip))
                      min = Math.min(min, parseFloat(e.slip))
                      distable.push(Math.sqrt((e.lon - qk[0]) ** 2 + (e.lat - qk[1]) ** 2))
                    });
                    nearvalue = Math.min(...distable)
                    let nearvalueindex = distable.indexOf(nearvalue)
                    let width = table.length / depth.length
                    let length = depth.length
                    for (let i = 0; i < width; i++) {
                      xv.push(i * sub_width)
                    }
                    for (let i = 0; i < length; i++) {
                      yv.push((length - 1 - i) * sub_len)
                    }
                    table.forEach((e,i) => {
                      zv.push([i % width, length-1 - Math.floor(i / width), parseFloat(e.slip), e.rake])
                      if (i == nearvalueindex) {
                        kv.push([i % width, length-1 - Math.floor(i / width), parseFloat(e.slip), e.rake])
                      }
                    })
                    xv = xv.map(e => {
                      return e - sub_width * (nearvalueindex % width)
                    })

                    option = {
                      // title: {
                      //   text: `走向${feature.get('table')[0].strike}°/倾角${feature.get('table')[0].dip}°`,
                      //   left: 'center'
                      // },
                      tooltip: {
                        position: 'top'
                      },
                      grid: {
                        height: '50%',
                        top: '10%',
                        show: true
                      },
                      xAxis: [{
                        name: '沿走向距离（Km）',
                        nameLocation: 'middle',
                        nameGap: 30,
                        type: 'category',
                        data: xv,
                        splitArea: {
                          show: true
                        },
                        axisLine: {
                          show: true
                        }
                      },{
                        name: `走向${feature.get('table')[0].strike}°/倾角${feature.get('table')[0].dip}°`,
                        nameLocation: 'middle',
                        nameGap: 30,
                        type: 'category',
                        data: xv,
                        splitArea: {
                          show: true
                        },
                        axisLine: {
                          show: true
                        }
                      }],
                      yAxis: [{
                        name: '沿倾向距离（Km）',
                        nameLocation: 'middle',
                        nameGap: 30,
                        type: 'category',
                        data: yv,
                        splitArea: {
                          show: true
                        },
                        axisLine: {
                          show: true
                        }
                      },{
                        type: 'category',
                        data: yv,
                        splitArea: {
                          show: true
                        },
                        axisLine: {
                          show: true
                        }
                      }],
                      visualMap: [{
                        min,
                        max,
                        calculable: true,
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '15%',
                        precision: 2,
                        inRange: {
                          color: ['#ffffff', '#fdfb00', '#fd5a02', '#4a0005'],
                          // symbolSize: [30, 100]
                        },
                        dimension: 2,
                        seriesIndex: [0],
                        text: ['Slip（m）', ''],
                      }],
                      series: [
                        {
                          name: 'Punch Card1',
                          type: 'heatmap',
                          data: zv,
                          label: {
                            show: false
                          },
                          emphasis: {
                            itemStyle: {
                              shadowBlur: 10,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                          },
                          zlevel:10,
                          tooltip: {
                            show: false
                          }
                        },
                        {
                          name: 'Punch Card2',
                          type: 'scatter',
                          data: zv,
                          zlevel:30,
                          symbol: 'image://data:image/svg+xml;utf8,%3Csvg%20class%3D%22icon%22%20style%3D%22width%3A%201em%3Bheight%3A%201em%3Bvertical-align%3A%20middle%3Bfill%3A%20currentColor%3Boverflow%3A%20hidden%3B%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h1024v1024H0z%22%20fill%3D%22%23202425%22%20opacity%3D%22.01%22%20%2F%3E%3Cpath%20d%3D%22M487.867733%20146.5344a34.133333%2034.133333%200%200%201%2048.264534%200l307.2%20307.2a34.133333%2034.133333%200%200%201-48.264534%2048.264533L546.133333%20253.064533V853.333333a34.133333%2034.133333%200%201%201-68.266666%200V253.064533l-248.9344%20248.9344a34.133333%2034.133333%200%200%201-48.264534-48.264533l307.2-307.2z%22%20fill%3D%22%23202425%22%20%2F%3E%3C%2Fsvg%3E',
                          symbolSize: (val) => {
                            return val[2]/max*20
                          },
                          symbolRotate: (val) => {
                            return val[3]
                          },
                          tooltip: {
                            show: false
                          }
                        },
                        {
                          name: 'Punch Card3',
                          type: 'scatter',
                          data: kv,
                          zlevel:20,
                          symbolSize: 20,
                          tooltip: {
                            show: false
                          },
                          symbol: 'image://data:image/svg+xml;utf8,%3Csvg%20class%3D%22icon%22%20style%3D%22width%3A%201em%3Bheight%3A%201em%3Bvertical-align%3A%20middle%3Bfill%3A%20currentColor%3Boverflow%3A%20hidden%3B%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M920.32%20426.666667A70.826667%2070.826667%200%200%200%20853.333333%20375.466667h-209.066666l-64.426667-197.973334a71.253333%2071.253333%200%200%200-135.68%200L379.733333%20375.466667H170.666667a71.253333%2071.253333%200%200%200-42.666667%20128l170.666667%20123.306666-64%20198.4a71.253333%2071.253333%200%200%200%20109.653333%2079.786667L512%20782.506667l170.666667%20122.453333a72.106667%2072.106667%200%200%200%2042.666666%2013.653333%2073.386667%2073.386667%200%200%200%2042.666667-13.653333%2071.253333%2071.253333%200%200%200%2025.6-79.786667L725.333333%20626.773333l170.666667-122.026666a71.68%2071.68%200%200%200%2024.32-78.08z%22%20fill%3D%22%23FE9517%22%20%2F%3E%3Cpath%20d%3D%22M722.346667%20918.613333a72.106667%2072.106667%200%200%201-42.666667-13.653333L512%20782.506667l-168.533333%20122.453333a71.253333%2071.253333%200%200%201-109.653334-79.786667L298.666667%20626.773333l-170.666667-122.026666a71.253333%2071.253333%200%200%201%2042.666667-128h209.066666l64.426667-197.973334a71.253333%2071.253333%200%200%201%20135.68%200L644.266667%20375.466667H853.333333a70.826667%2070.826667%200%200%201%2066.986667%2051.2%2071.68%2071.68%200%200%201-25.6%2080.213333L725.333333%20626.773333l64%20198.4a71.253333%2071.253333%200%200%201-25.6%2079.786667%2073.386667%2073.386667%200%200%201-41.386666%2013.653333zM512%20693.76a72.106667%2072.106667%200%200%201%2042.666667%2013.653333L695.893333%20810.666667%20640%20643.84a71.68%2071.68%200%200%201%2026.026667-80.213333L810.666667%20460.8h-176.64a72.106667%2072.106667%200%200%201-67.84-49.066667L512%20244.48l-54.186667%20166.826667a71.68%2071.68%200%200%201-67.84%2049.493333H213.333333l142.08%20103.253333A70.826667%2070.826667%200%200%201%20384%20643.84L328.106667%20810.666667%20469.333333%20707.413333a72.106667%2072.106667%200%200%201%2042.666667-13.653333z%20m341.333333-232.96z%20m-353.706666-256z%22%20fill%3D%22%23486675%22%20%2F%3E%3C%2Fsvg%3E'
                        }
                      ],
                      legend:[
                        {
                          show: false,
                          data: ['Punch Card1']
                        },
                        {
                          show: false,
                          data: ['Punch Card2'],
                          itemStyle: {
                            decal: {
                              symbol: 'rect',
                              symbolSize: 1,
                              symbolRotate: 45,
                              symbolPosition: 'end',
                              symbolOffset: [0, 0],
                              color: 'red'
                            }
                          }
                        }
                      ]
                    };

                    option && myChart.setOption(option);
                  },
                }, {
                  name: "下载附件",
                  icon: icondown,
                  condition: (e) => {
                    return e.get('HasTable') && JSON.parse(localStorage.getItem('user')).download
                  },
                  click: (feature, that) => {
                    let str = 'lat  lon  dep  sub_len  sub_width  strike  dip  rake  slip  srate  stf'
                    
                    let table = feature.get('table')
                    //table排序
                    table.sort((a, b) => {
                      return parseInt(a.orderID) - parseInt(b.orderID)
                    })
                    table.forEach(element => {
                      str += `\n${element.lat}  ${element.lon}  ${element.depth}  ${element.sub_len}  ${element.sub_width}  ${element.strike}  ${element.dip}  ${element.rake}  ${element.slip}  ${element.srate}  ${element.stf.replace(/,/g, ' ')}`
                    })
                    let blob = new Blob([str], {
                      type: "text/plain;charset=utf-8"
                    });
                    saveAs(blob, "历史地震震源破裂模型 - " + feature.get('Name') + ".txt");
                  },
                }
              ]
            }
            case 'StationAndSiteAmplificationCoefficient':
              return {
                attributes: {
                    // 'ID': {
                    //   title: '编号',
                    // },
                    // 'StationCode': {
                    //   title: '台站编号',
                    // },
                    'StationName': {
                      title: '台站名称',
                    },
                    'Lon': {
                      title: '经度',
                      format: function (e, f) {
                        return e.toFixed(1) + (e>0?'°E': '°W')
                      }
                    },
                    'Lat': {
                      title: '纬度',
                      format: function (e, f) {
                        return e.toFixed(1) + (e>0?'°N': '°S')
                      }
                    },
                    'VS20': {
                      title: '地表以下20m的平均剪切波速度（m/s）',
                      format: function (e, f) {
                        return e.toFixed(2)
                      }
                    },
                    'VS30': {
                      title: '地表以下30m的平均剪切波速度（m/s）',
                      format: function (e, f) {
                        return e.toFixed(2)
                      }
                    },
                    'VSe': {
                      title: '等效剪切波速度（m/s）',
                      format: function (e, f) {
                        return e.toFixed(2)
                      }
                    },
                    'ChineseSiteClass': {
                      title: '场地类型（中国抗震设计规范）',
                    },
                    'NehrpSiteClass': {
                      title: 'NEHRP场地类型',
                    },
                    'Kappa0': {
                      title: '高频衰减参数（s）',
                    },
                    'Document': {
                      title: '参考文献',
                    },
                    'CommentInfo': {
                      title: '备注',
                    }
                  },
                  buttons: [{
                    name: "查看场地放大系数图",
                    icon: icon,
                    condition: (e) => {
                      return e.get('HasTable') && JSON.parse(localStorage.getItem('user')).fileReview
                    },
                    click: (feature, that) => {
                      let oDiv = document.getElementById('ech')
                      let span = document.getElementById('echtitle')
                      span.innerHTML = '场地放大系数图'
                      oDiv.style.display = 'block'
                      let chartDom = document.getElementById('statistics')
                      
                      // chartDom.childNodes.forEach(element => {
                      //   chartDom.removeChild(element)
                      // })
                      chartDom.style.height = '500px'
                      chartDom.style.width = '600px'
                      // document.body.append(chartDom)
                      
                      echarts.dispose(chartDom)
                      var myChart = echarts.init(chartDom);
                      var option;

                      let seriesdata1 = []
                      let table = feature.get('table')
                      //table排序
                      table.sort((a, b) => {
                        return parseInt(a.orderID) - parseInt(b.orderID)
                      })
                      table.forEach(element => {
                        seriesdata1.push([element.freq, element.amplificationCoefficient])
                      });

                      option = {
                        xAxis: {
                          name: 'Frequency（Hz）',
                          nameGap: 30,
                          nameLocation: 'middle',
                          type: 'log',
                          logBase: 10,
                          min: 0.1,
                          max: 30,
                          minorTick: {
                            show: true,
                            splitNumber: 9
                          },
                          minorSplitLine: {
                            show: true,
                          }
                        },
                        yAxis: {
                          name: 'Amplification',
                          nameGap: 30,
                          nameLocation: 'middle',
                          type: 'log',
                          logBase: 10,
                          min: 0.1,
                          max: 50,
                          minorTick: {
                            show: true,
                            splitNumber: 9,
                          },
                          minorSplitLine: {
                            show: true,
                          }
                        },
                        series: [{
                          data: seriesdata1,
                          type: 'line',
                          symbol: "none"
                        }]
                      };
                      option && myChart.setOption(option);
                    },
                  }, {
                    name: "下载附件",
                    icon: icondown,
                    condition: (e) => {
                      return e.get('HasTable') && JSON.parse(localStorage.getItem('user')).download
                    },
                    click: (feature, that) => {
                      let str = 'Freq  amplificationCoefficient'
                      let table = feature.get('table')
                      table.sort((a, b) => {
                        return parseInt(a.orderID) - parseInt(b.orderID)
                      })
                      table.forEach(element => {
                        str += `\n${element.freq}  ${element.amplificationCoefficient}`
                      })
                      let blob = new Blob([str], {
                        type: "text/plain;charset=utf-8"
                      });
                      saveAs(blob, "强震动台站场地放大系数  - " + feature.get('StationCode') + ".txt");
                    },
                  }]
              }
  }
}
var setStyle = (type, f) => {
  let colors = {
    3: {
        color:'rgb(56, 168, 0)',
        width: 6,
        title: '3-3.9级地震'
    },
    4: {
        color:'rgb(176, 224, 0)',
        width: 8,
        title: '4-4.9级地震'
    },
    5: {
        color:'rgb(255, 170, 0)',
        width: 10,
        title: '5-5.9级地震'
    },
    6: {
        color:'rgb(255, 0, 0)',
        width: 12,
        title: '6-6.9级地震'
    }
    
  }
  switch (type) {
    case 'HistoricalEQParameter':
      return new Style({
        image: new Circle({
          radius: f.get('Ms')? colors[Math.floor(f.get('Ms'))].width *1.5 : 6,
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0)'
          }),
          stroke: new Stroke({
            color: f.get('Ms')? colors[Math.floor(f.get('Ms'))].color : 'red',
            width: 1.5
          })
        })
      })
    case 'RegionalPropagationPathDurationModel':
      return new Style({
        // fill: new FillPattern({
        //   pattern: 'hatch',
        //   color: '#ffbebe',
        //   fill: new Fill({
        //     color: 'rgba(255, 255, 255, 0)'
        //   }),
        //   size: 2,
        //   scale: 1,
        //   angle: 45,
        //   spacing: 10,
        // }),
        fill: new Fill({
          color: 'rgba(255, 190, 190, 0.5)'
        }),
        stroke: new Stroke({
          color: '#a0a0a0',
          width: 1
        }),
      })
    case 'RegionalQualityFactor':
      return new Style({
        // fill: new FillPattern({
        //   pattern: 'hatch',
        //   color: '#4065eb',
        //   fill: new Fill({
        //     color: 'rgba(255, 255, 255, 0)'
        //   }),
        //   size: 2,
        //   scale: 1,
        //   angle: -45,
        //   spacing: 10,
        // }),
        fill: new Fill({
          color: 'rgba(64, 101, 235, 0.5)'
        }),
        stroke: new Stroke({
          color: '#4065eb',
          width: 1
        }),
      })
    case 'SourceRuptureModel':
      return new Style({
        // fill: new FillPattern({
        //   pattern: 'hatch',
        //   color: 'rgb(255,192,0)',
        //   fill: new Fill({
        //     color: 'rgba(255, 255, 255, 0)'
        //   }),
        //   size: 2,
        //   scale: 1,
        //   angle: 90,
        //   spacing: 10,
        // }),
        fill: new Fill({
          color: 'rgba(255,192,0, 0.5)'
        }),
        stroke: new Stroke({
          color: 'rgb(255,192,0)',
          width: 1
        }),
      })
    case 'StationAndSiteAmplificationCoefficient':
      var color
      var solid = f.get('HasTable') ? 1 : 0
      // 空   40,146,199
      // I0   140,184,164
      // I1   215,227,125
      // II    252,207,81
      // III   247,122,45
      // IV   232,21,21
      switch (f.get('ChineseSiteClass')){
        case 'I0':
          color = '24, 144, 255'
          break;
        case 'I1':
          color = '82, 196, 26'
          break;
        case 'II':
          color = '250, 219, 20'
          break;
        case 'III':
          color = '250, 140, 22'
          break;
        case 'IV':
          color = '245, 34, 45'
          break;
        default:
          color = '89, 89, 89'
      }
        
      return new Style({
        image: new RegularShape({
          fill: new Fill({
            color: `rgba(${color}, ${solid})`
          }),
          stroke: new Stroke({
            color: `rgb(${color})`,
            width: 1.5
          }),
          points: 3,
          radius: 10,
          angle: 0,
        })
      })
  }
}

var getLegend = (type) => {
  let toimg = (style, typeGeom) => {
    var img = Legend.getLegendImage({
      style: style,
      typeGeom,
      size: [32,32],
    })
    var dataURL = img.toDataURL('image/png');
    return dataURL
  }
//   56，168，0
// 176,224,0
// 255,170,0
// 255，0，0
  let colors = {
    3: {
        color:'rgb(56, 168, 0)',
        width: 6,
        title: '3级地震'
    },
    4: {
        color:'rgb(176, 224, 0)',
        width: 8,
        title: '4级地震'
    },
    5: {
        color:'rgb(255, 170, 0)',
        width: 10,
        title: '5级地震'
    },
    6: {
        color:'rgb(255, 0, 0)',
        width: 12,
        title: '6级地震'
    },
    // 7: {
    //     color:'rgb(255, 102, 0)',
    //     width: 12,
    //     title: '7-7.9级地震'
    // },
    // 8: {
    //     color:'rgb(255, 0, 0)',
    //     width: 14,
    //     title: '8-8.9级地震'
    // }
  }
  switch (type) {
    case 'HistoricalEQParameter':
      let len = []
      for (let i in colors) {
         let style = new Style({
          image: new Circle({
            radius: colors[i].width *1.5,
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0)'
            }),
            stroke: new Stroke({
              color: colors[i].color,
              width: 2
            })
          })
        })
        len.push({
          name: colors[i].title,
          img: toimg(style, 'Point')

        })
      }
      return len

    case 'RegionalPropagationPathDurationModel':
      var style = new Style({
        fill: new Fill({
          color: 'rgba(255, 190, 190, 0.5)'
        }),
        stroke: new Stroke({
          color: '#a0a0a0',
          width: 1
        }),
      })
      return [{
        name: 'RegionalPropagationPathDurationModel',
        img: toimg(style, 'Polygon')
      }]
    case 'RegionalQualityFactor':
      var style = new Style({
        fill: new Fill({
          color: 'rgba(64, 101, 235, 0.5)'
        }),
        stroke: new Stroke({
          color: '#4065eb',
          width: 1
        }),
      })
      return [{
        name: 'RegionalQualityFactor',
        img: toimg(style, 'Polygon')
      }]
    case 'SourceRuptureModel':
      var style  = new Style({
        fill: new Fill({
          color: 'rgba(255,192,0, 0.5)'
        }),
        stroke: new Stroke({
          color: 'rgb(255,192,0)',
          width: 1
        }),
      })
      return [{
        name: 'SourceRuptureModel',
        img: toimg(style, 'Polygon')
      }]
    case 'StationAndSiteAmplificationCoefficient':
      var gets = (ChineseSiteClass, HasTable) => {
        var color
        var solid = HasTable ? 1 : 0
        switch (ChineseSiteClass){
          case 'I0':
            color = '24, 144, 255'
            break;
          case 'I1':
            color = '82, 196, 26'
            break;
          case 'II':
            color = '250, 219, 20'
            break;
          case 'III':
            color = '250, 140, 22'
            break;
          case 'IV':
            color = '245, 34, 45'
            break;
          default:
            color = '89, 89, 89'
        }
          
        return new Style({
          image: new RegularShape({
            fill: new Fill({
              color: `rgba(${color}, ${solid})`
            }),
            stroke: new Stroke({
              color: `rgb(${color})`,
              width: 1.5
            }),
            points: 3,
            radius: 10,
            angle: 0,
          })
        })
      }
      var arr = [];
      [['I0', true, 'I₀类场地'], ['I1', true, 'I₁类场地'], ['II', true, 'II类场地'], ['III', true, 'III类场地'], ['IV', true, 'IV类场地'], ['', true, '未知场地']]
        .map((item) => {
          arr.push({
            name: item[2],
            img: toimg(gets(item[0], item[1]), 'Point')
          })
        })
      return arr
  }
}

export default QiuSuo1;