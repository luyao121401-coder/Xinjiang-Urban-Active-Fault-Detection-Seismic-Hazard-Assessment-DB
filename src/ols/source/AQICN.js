import VectorSource from "ol/source/Vector"
import GeoJSON from 'ol/format/GeoJSON'
import axios from "axios"
import {transform as Transform} from 'ol/proj'
import FeatureFormat from 'ol/format/Feature';
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import {Style, Fill, Stroke, Text, Circle, RegularShape, Icon} from "ol/style";
import Legend from 'ol-ext/legend/Legend'

class CEIC extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let loader = function() {
      let features = []
      let data = {
        'bounds': "70,10,140,60",
        'inc': "placeholders",
        'viewer': "webgl",
        'zoom': 15,
      }
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'https://api.waqi.info/map/bounds/?latlng=3.86,73.66,53.55,135.05&token=25287874d1d92ba88de02324423afce01d118b86')
      xhr.onload = ()=> {
        let data = JSON.parse(xhr.responseText)
        if (data.status === "ok") {
          data.data.forEach(p => {
            let coordinates = [p.lon,p.lat]
            let coordinate = Transform(coordinates,'EPSG:4326','EPSG:3857')
            let feature = this.getFeatureById(p.uid)
            if(feature) {
              feature.setGeometry(new Point(coordinate))
              feature.setId(p.uid)
            } else {
              feature = new Feature({
                geometry: new Point(coordinate)
              })
            }
            feature.setProperties({
              'aqi': p.aqi,
              'name': p.station.name,
              'date': p.station.time,
              'key': p.uid,
              // 'AAQI': null,
            })
            let color
            if (p.aqi <= 50) {
              color = '#00e400'
            } else if (p.aqi <= 100) {
              color = '#ffff00'
            } else if (p.aqi <= 150) {
              color = '#ff7e00'
            } else if (p.aqi <= 200) {
              color = '#ff0000'
            } else if (p.aqi <= 300) {
              color = '#8f3f97'
            } else {
              color = '#7e0023'
            }
            let style1 = new Style({
              fill: new Fill({
                color: 'rgba(0,255,0,0.5)'
              }),
              stroke: new Stroke({
                color: 'rgba(0,255,0,0.5)',
                width: 1
              }),
              image: new RegularShape({
                fill: new Fill({
                  color
                }),
                stroke: new Stroke({
                  color: '#000',
                  width: 3
                }),
                radius: 20 / Math.SQRT2,
                radius2: 20,
                points: 4,
                angle: 0,
              }),
              text: new Text({
                text: p.aqi.toString(),
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
            
            var img = Legend.getLegendImage({
              style: style1,
              typeGeom: 'Point',
            })
            let style = new Style({
              image: new Icon({
                img: img,
                imgSize: [img.width, img.height],
              })
            })
            feature.setStyle(style)
            features.push(feature)
          });
          this.addFeatures(features)
        }
      }
      xhr.send()

      setInterval(() => {
        this.refresh()
      }, 1000*60*5);
    }
    super({
      format:new FeatureFormat(),
      loader
    })
  }
}

export default CEIC;