import VectorLayer from 'ol/layer/Vector'
import NgacvSue from '../source/ngacv'
import {Stroke, Style, Circle as CircleStyle, Fill, Text} from 'ol/style';

class NGACV extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let popupTemplate = 
      options.popupTemplate !== undefined ? options.popupTemplate : {
        title: function(f) {
          return f.get('NAME');
        },
        attributes: {
          'NAME': {
            title: '图幅名',
          },
          'CODE': {
            title: '图幅号'
          },
          'NCODE': {
            title: '新图幅号'
          },
          'servname1': {
            title: '图幅详情1',
            format: (v, f) => {
              if (v) {
                return `<a href='http://www.ngac.org.cn/Map/Document?guid=${f.get('guid1')}' target='_blank'>${v}</a>`
              }
              else {
                return ''
              }
            },
            visible: (v, f) => {
              return v == ''? false : true
            }
          },
          'servname2': {
            title: '图幅详情2',
            format: (v, f) => {
              if (v) {
                return `<a href='http://www.ngac.org.cn/Map/Document?guid=${f.get('guid2')}' target='_blank'>${v}</a>`
              }
              else {
                return ''
              }
            },
            visible: (v, f) => {
              return v == ''? false : true
            }
          },
          'servname3': {
            title: '图幅详情3',
            format: (v, f) => {
              if (v) {
                return `<a href='http://www.ngac.org.cn/Map/Document?guid=${f.get('guid3')}' target='_blank'>${v}</a>`
              }
              else {
                return ''
              }
            },
            visible: (v, f) => {
              return v == ''? false : true
            }
          }
        }
      }
    let source = 
      new NgacvSue({prop: options.prop})
    let colorCode = {
      '25ws': 'rgba(30, 144, 255, 0.5)',
      '20w': 'rgba(0, 255, 0, 0.5)',
      '5ws': 'rgba(255, 215, 0, 0.5)',
    }

    let style = (f) => {
      return new Style({
        fill: new Fill({
          color: f.get('hasmap')?colorCode[options.prop]: 'rgba(255, 255, 255, 0)'
        }),
        stroke: new Stroke({
          color: '#ccc',
          width: 1
        }),
        text: new Text({
          text: f.get('CODE'),
          fill: new Fill({
            color: '#000'
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 1
          }),
          scale: 1.5
        })
      })
      }
    super({
      source,
      style,
    })
    this._popupTemplate = popupTemplate
  }
  get popupTemplate() {
    return this._popupTemplate
  }
}

export default NGACV