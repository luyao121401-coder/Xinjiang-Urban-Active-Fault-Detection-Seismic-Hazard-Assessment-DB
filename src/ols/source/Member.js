import VectorSource from "ol/source/Vector"
import {transform as Transform} from 'ol/proj'
import FeatureFormat from 'ol/format/Feature';
import Feature from 'ol/Feature'
import {Point, Polygon, LineString, MultiLineString} from 'ol/geom'
import {Style, Fill, Stroke, Text, Icon} from "ol/style";

import {Project} from '../../js/api'
import CircleStyle from "ol/style/Circle";


class Member extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let loader = () => {
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

      let getFeatures = (arr) => {
        let features = []
        arr.forEach((k) => {
          if(k.showLocation) {
            let geometryInfo = JSON.parse(k.geometry)
            let wkid = geometryInfo.spatialReference.wkid
            let geometry = new Point(Transform([geometryInfo.x, geometryInfo.y],'EPSG:' + wkid,'EPSG:3857'))

            let feature = this.getFeatureById(k.id)
            if(feature) {
              feature.setGeometry(geometry)
            } else {
              feature = new Feature({geometry})
              feature.setId(k.id)
            }
            feature.setStyle([
              new Style({
                image: new CircleStyle({
                  radius: 24,
                  fill: new Fill({
                    color: colorchg(k.color)
                  }),
                })
              }),
              new Style({
                image: new Icon({
                  src: k.avatarCircle.startsWith('http://apiv3') ? k.avatarCircle : k.avatarCircle + '?x-oss-process=image/resize,m_fill,h_200,w_200/circle,r_100/format,png',
                  scale: k.avatarCircle.endsWith('default.png')?0.134: 0.2,
                  crossOrigin: 'anonymous'
                }),
                text: new Text({
                  text: k.name,
                  fill: new Fill({
                    color: '#000'
                  }),
                  stroke: new Stroke({
                    color: '#fff',
                    width: 2
                  }),
                  scale: 1.3,
                  offsetY: -30,
                })
              })
            ])
            features.push(feature)
          }
        })
        return features
      }
      
      Project.getProjMember(options.getID).then(e=>{
        this.addFeatures(getFeatures(e))
      })

    }
    super({
      format:new FeatureFormat(),
      loader
    })
    this.timing = (sec) => {
      let time = sec?sec:60
      return setInterval(() => {
        loader()
      }, time*1000);
    }
  }
}

export default Member;