import VectorSource from "ol/source/Vector"
import {transform as Transform} from 'ol/proj'
import FeatureFormat from 'ol/format/Feature';
import Feature from 'ol/Feature'
import {Point, Polygon, LineString, MultiLineString} from 'ol/geom'
import {Style, Fill, Stroke, Text, Icon} from "ol/style";
import {Draw} from '../../js/api'

import {pointiconpath} from '../path'
import axios from "axios";


class Flat extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let loader = () => {
      let features = []
      axios.get('https://opensky-network.org/api/states/all?extended=true').then((e) => {
        e.data.states.forEach((k) => {

          let feature = this.getFeatureById(k[0])
          if(feature) {
            feature.setGeometry(new Point(Transform([k[5], k[6]], 'EPSG:4326', 'EPSG:3857')))
          } else{
            feature = new Feature({
              geometry: new Point(Transform([k[5], k[6]], 'EPSG:4326', 'EPSG:3857'))
            })
            feature.setId(k[0])
            feature.setStyle(new Style({
              image: new Icon({
                src: pointiconpath+ 'plane.png',
                scale: 0.1,
                rotation: 180-k[9]
              }),
              text: new Text({
                text: k[1],
                offsetY: 20,
                fill: new Fill({
                  color: '#fff'
                })
              })
            }))
          }
          features.push(feature)
        })
        this.addFeatures(features);
      })
    }
    setInterval(() => {
      loader()
    }, 5000);
    super({
      format:new FeatureFormat(),
      loader
    })
  }
}

export default Flat;