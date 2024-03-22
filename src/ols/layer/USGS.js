import VectorLayer from 'ol/layer/Vector'
import UsgsSue from '../source/USGS'
import {Stroke, Style, Circle as CircleStyle, Fill} from 'ol/style';

class CedpcLyr extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let popupTemplate = 
      options.popupTemplate !== undefined ? options.popupTemplate : {
        title: function(f) {
          return f.get('title');
        },
      }
    let source = 
      new UsgsSue()
      
    var styleCache = {}
    let styleFunction = function (feature) {
      var mag =  Math.floor(feature.get('mag'))
      var colorm
      var time = feature.get('time')
      var timediff = (new Date() - time) / (3600 * 1000)
      var color = ''
      if ( timediff < 1) {
        color = 'rgb(255,0,0)'
      }
      if (1 <= timediff && timediff< 24) {
        color = 'rgb(255,153,0)'
      }
      if (24 <= timediff && timediff< 168) {
        color = 'rgb(255,255,0)'
      }
      if (timediff >= 168) {
        color = 'rgb(255,255,255)'
      }
      colorm = color + mag
      
      var style = styleCache[colorm];
      if (!style) {
        style = new Style({
          image: new CircleStyle({
            radius: mag * 1.8,
            fill: new Fill({
              color: color
            }),
            stroke: new Stroke({
              color: 'black',
            }),
          }),
        })
        styleCache[colorm] = style;
      }
      return style
    }


    super({
      source,
      style: styleFunction,
      renderOrder: function(a, b) {
        return a.get('time') - b.get('time')
      }
    })
    this._popupTemplate = popupTemplate
  }
  get popupTemplate() {
    return this._popupTemplate
  }
}

export default CedpcLyr