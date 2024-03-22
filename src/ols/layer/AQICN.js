import VectorLayer from 'ol/layer/Vector'
import AQI from '../source/AQICN'
import {Style, Fill, Stroke, Text, Circle, RegularShape, Icon} from "ol/style";
import axios from 'axios';
import { scale } from 'ol/size';
import Legend from 'ol-ext/legend/Legend'

class AQICN extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let source = new AQI()
    let visible = 
      options.visible !== undefined ? options.visible : true
    let popupTemplate =
      options.popupTemplate !== undefined ? options.popupTemplate : {
        title: function(f) {
          return f.get('name') + '-' + f.get('aqi')
        },
        attributes: {
          'pm25': {
            title: 'pm2.5',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'pm25'
              }, 
              {
                key: 'v'
              }
            ],
          },
          'pm10': {
            title: 'pm10',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'pm10'
              }, 
              {
                key: 'v'
              }
            ],
          },
          'o3': {
            title: '臭氧',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'o3'
              }, 
              {
                key: 'v'
              }
            ],
          },
          'no2': {
            title: '二氧化氮',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'no2'
              }, 
              {
                key: 'v'
              }
            ],
          },
          'so2': {
            title: '二氧化硫',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'so2'
              }, 
              {
                key: 'v'
              }
            ],
          },
          'co': {
            title: '一氧化碳',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'co'
              }, 
              {
                key: 'v'
              }
            ],
          },
          't': {
            title: '温度',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 't'
              }, 
              {
                key: 'v'
              }
            ],
            after: '°C'
          },
          'p': {
            title: '气压',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'p'
              }, 
              {
                key: 'v'
              }
            ],
            after: 'hPa'
          },
          'h': {
            title: '湿度',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'h'
              }, 
              {
                key: 'v'
              }
            ],
            after: '%'
          },
          'w': {
            title: '风速',
            pos: [
              {
                key:'data'
              },
              {
                key: 'iaqi'
              }, 
              {
                key: 'w'
              }, 
              {
                key: 'v'
              }
            ],
            after: ' m/s'
          },
          'time': {
            title: '时间',
            pos: [
              {
                key:'data'
              },
              {
                key: 'time'
              }, 
              {
                key: 's'
              }
            ]
          }
        },
        secRes: {
          url: 'https://api.waqi.info/feed/@{key}/?token=25287874d1d92ba88de02324423afce01d118b86',
          key: 'idx'
        }
      }

    super({
      source,
      visible,
    })
    this._popupTemplate = popupTemplate
  }
 
  get popupTemplate() {
    return this._popupTemplate
  }
}

export default AQICN