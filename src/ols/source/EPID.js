import VectorSource from "ol/source/Vector"
import axios from "axios"
import {transform as Transform} from 'ol/proj'
import FeatureFormat from 'ol/format/Feature';
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {Style, Fill, Stroke, Text, Circle, RegularShape, Icon} from "ol/style";

class EPID extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let loader = function() {
      let features = []
      axios.get('/api/cube/ncp/boundsearch?bottom_left_point=10851043.161922429%2C4725401.202717092&top_right_point=13076836.836347803%2C4941813.753087759&zoom=15')
        .then((e) => {
          console.log(e.data);
          if (e.data.message === "success") {
            e.data.result.poi_list.forEach(p => {
              let coo = p.point.split(",")
              let coordinates = coo
              let coordinate = Transform(coordinates,'BD09','EPSG:3857')
              let feature = this.getFeatureById(p.uid)
              if(feature) {
                feature.setGeometry(new Point(coordinate))
                feature.setId(p.uid)
              } else {
                feature = new Feature({
                  geometry: new Point(coordinate)
                })
              }
              let style = new Style({
                image: new Icon({
                  // crossOrigin: 'anonymous',
                  src: p.icon_risk_day <=14 ?'https://ugc.map.baidu.com/static/cube-v2/copy/poi-icon.png':'https://ugc.map.baidu.com/static/cube-v2/copy/poi-icon-low-risk.png',
                  anchor: [0.5, 0.8],
                  scale: 0.5,
                  // color: p.icon ==1 ? 'yellow' : 'red'
                })
              })
              feature.setProperties({
                'date': p.icon_risk_day,
                'key': p.uid,
                '_style_': style
              })
              feature.setStyle(style)
              features.push(feature)
            });
            this.addFeatures(features)
          }
        })
    }
    super({
      format:new FeatureFormat(),
      loader
    })
  }
}

export default EPID;