import VectorLayer from 'ol/layer/Vector'
import EPIDS from '../source/EPID'
import {Style, Fill, Stroke, Text, Circle, RegularShape, Icon} from "ol/style";
import axios from 'axios';
import { scale } from 'ol/size';
import Legend from 'ol-ext/legend/Legend'

class EPID extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let source = new EPIDS()
    let visible = 
      options.visible !== undefined ? options.visible : true
    let popupTemplate =
      options.popupTemplate !== undefined ? options.popupTemplate : {
        // title: function(f) {
        //   return f.get('name') + '-' + f.get('aqi')
        // },
        attributes: {
          'name': {
            title: '名称',
            pos: [
              {
                key:'result'
              },
              {
                key: 'poi_name'
              }
            ],
          },
          'date': {
            title: '已发现天数',
          },
          'hot_around_string':{
            title: '人流聚集地',
            pos: [
              {
                key:'result'
              },
              {
                key: 'hot_around_string'
              }
            ]
          },
          'address': {
            title: '地址',
            pos: [
              {
                key:'result'
              },
              {
                key: 'address'
              }
            ],
          },
          'source': {
            title: '数据来源',
            pos: [
              {
                key:'result'
              },
              {
                key: 'source'
              }
            ],
          },
        },
        secRes: {
          url: '/api/cube/ncp/areaInfo?poi_uid={key}',
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

export default EPID