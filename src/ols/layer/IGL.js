import VectorLayer from 'ol/layer/Vector'
import IglSue from '../source/IGL'
import {Style, Fill, Stroke, Text} from "ol/style";
import axios from 'axios';

class CedpcLyr extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let age = 
      options.age !== undefined ? options.age : 'preq'
    let source = 
      new IglSue({age})
    let visible = 
      options.visible !== undefined ? options.visible : true
    let alias
    axios.get('http://data.activetectonics.cn/arcserver/rest/services/AcriveFaultChinese/CEFS_MIPRO/MapServer/7?f=pjson')
    .then((res) => {
      alias = res.data.fields
    })
    let popupTemplate =
      options.popupTemplate !== undefined ? options.popupTemplate : {
        title: function(f) {
          return f.get('faultname')
        },
        attributes: {
          'faultname': {
            title: '名称',
          },
          'cfeature': { 
            title: '性质',
            format: v => {
              if (alias) {
                if (v) {
                  let FieldAlias = alias.find(a => a.name === 'cfeature')
                  console.log(FieldAlias, v);
                  let curAlias = FieldAlias.domain.codedValues.find(b => b.code == v)
                  console.log(curAlias)
                  return curAlias.name
                }
                else {
                  return ''
                }
              }
              else {
                return v
              }
            }
          },
        }
      }
    let styleFunction = (age) =>{
      let style 
      switch (age) {
        case 'preq':
          style =  new Style({
            stroke: new Stroke({
              color: 'black',
              width: 1,
            })
          })
          break;
        case 'emp':
          style =  new Style({
            stroke: new Stroke({
              color: 'rgb(197, 0, 255)',
              width: 2,
            })
          })
            break;
          case 'lp':
            style =  new Style({
              stroke: new Stroke({
                color: 'red',
                width: 2,
              })
            })
              break;
            case 'h':
              style =  new Style({
                stroke: new Stroke({
                  color: 'red',
                  width: 3,
                })
              })
                break;
        default:
          style =  new Style({
            stroke: new Stroke({
              color: 'black',
              width: 1,
            })
          })
          break;
      }
      return style
    }


    super({
      source,
      visible,
      style: styleFunction(age),
    })
    this._age = age
    this._styleFunction = styleFunction
    this._popupTemplate = popupTemplate
  }
  get age() {
    return this._age
  }
  set age(v) {
    this._age = v
    this.setStyle(this._styleFunction(v))
    this.getSource().age = v
  }
  get popupTemplate() {
    return this._popupTemplate
  }
}

export default CedpcLyr