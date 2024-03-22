import VectorSource from "ol/source/Vector"
import GeoJSON from 'ol/format/GeoJSON'
import axios from "axios"
import {transform as Transform} from 'ol/proj'
import FeatureFormat from 'ol/format/Feature';
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'


class CEIC extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let loader = ()=> {
      let features = []
      axios.get('http://apiv2.geoquater.com/v1/public/taiwang/')
      .then((e) => {
        for(let key in e.data) {
          let coordinates = [parseFloat(e.data[key].EPI_LON) , parseFloat(e.data[key].EPI_LAT)]
          let coordinate = Transform(coordinates,'EPSG:4326','EPSG:3857')
          let feature = this.getFeatureById(e.data[key].id)
          if (feature) {
            feature.setGeometry(new Point(coordinate))
          } else {
            feature = new Feature({
              geometry: new Point(coordinate)
            })
            feature.setId(e.data[key].id)
            if (key < e.data.length - 1){
              feature.setProperties({
                'M': parseFloat(e.data[key].M),
                'date': e.data[key].O_TIME,
                'location': e.data[key].LOCATION_C,
                'Lat':e.data[key].EPI_LAT,
                'Lon':e.data[key].EPI_LON,
                'depth':e.data[key].EPI_DEPTH,
                'c': 0
              }) 
            }else {
              feature.setProperties({
                'M': parseFloat(e.data[key].M),
                'date': e.data[key].O_TIME,
                'location': e.data[key].LOCATION_C,
                'Lat':e.data[key].EPI_LAT,
                'Lon':e.data[key].EPI_LON,
                'depth':e.data[key].EPI_DEPTH,
                'c': 1
              }) 
            }
          }
          features.push(feature)
        }
        this.addFeatures(features)
        this.dispatchEvent({type: 'loadend'})
      })
    }
    setInterval(() => {
      loader()
    }, 1000*60*5);
    super({
      format:new FeatureFormat(),
      loader
    })
  }
}

export default CEIC;