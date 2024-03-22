import VectorLayer from 'ol/layer/Vector'
import TrackSuc from '../source/Track'
import {Stroke, Style, Circle as CircleStyle, Fill, Icon} from 'ol/style';
import { Point } from 'ol/geom';
import Profile from 'ol-ext/control/Profile'

class Track extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let popupTemplate = 
      options.popupTemplate !== undefined ? options.popupTemplate : {
        title: '轨迹-' + options.data.name,
        data: {
          '名称': options.data.name,
          '描述': options.data.desc,
          '类型': options.data.traceType,
          '起点': options.data.startAddress,
          '终点': options.data.endAddress,
          '长度': options.data.distance.toFixed(2) + "米",
          '最大速度': options.data.maxSpeed.toFixed(2) + "km/h",
          '最高海拔': options.data.maxAltitude.toFixed(2) + "米",
        }
      }
    let source = new TrackSuc({
      url: options.data.file
    })
    let styleInfo = JSON.parse(options.data.style)
    let colorchg = (c) => {
      if (c.length == 7) {
        return colorchg('#FF' + c.substring(1,7))
      }else {
        let red = parseInt(c.substring(3,5), 16).toString(10)
        let green = parseInt(c.substring(5,7), 16).toString(10)
        let blue = parseInt(c.substring(7,9), 16).toString(10)
        let alp = parseInt(c.substring(1,3), 16).toString(10)/255
        return `rgba(${red},${green},${blue},${alp})`
      }
    }

    let style = (feature) => {
      const geometry = feature.getGeometry();
      const styles = [
        new Style({
          stroke: new Stroke({
            color: colorchg(styleInfo.color),
            width: styleInfo.width
          })
        }),
      ]
      geometry.getFirstCoordinate()
      
      styles.push(
        new Style({
          geometry: new Point(geometry.getFirstCoordinate()),
          image: new Icon({
            src: 'pointicon/first.png',
            anchor: [0.5, 0.9],
            scale:0.5
          }),
        })
      );
      styles.push(
        new Style({
          geometry: new Point(geometry.getLastCoordinate()),
          image: new Icon({
            src: 'pointicon/last.png',
            anchor: [0.5, 0.9],
            scale:0.5
          }),
        })
      );
    
      return styles;
      return new Style({
        stroke: new Stroke({
          color: colorchg(styleInfo.color),
          width: styleInfo.width
        })
      })
    }


    super({
      source,
      style,
    })
    this._popupTemplate = popupTemplate
    this._url = options.data.file
  }
  get popupTemplate() {
    return this._popupTemplate
  }
  get url(){
    return this._url
  }
}
Track.prototype.export = function(name) {
  return new Promise((resolve, reject)=>{
    var a = document.createElement('a');
    // var url = window.URL.createObjectURL(blob);
    var filename = (name?name:'未命名') + '.gpx';
    a.href = this.url;
    a.download = filename;
    resolve({
      state: 'succ'
    })
    a.click();
    // window.URL.revokeObjectURL(url);
  })
}

export default Track