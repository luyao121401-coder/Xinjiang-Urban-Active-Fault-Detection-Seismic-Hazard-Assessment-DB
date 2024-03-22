import VectorSource from "ol/source/Vector"
import {transform as Transform} from 'ol/proj'
import FeatureFormat from 'ol/format/Feature';
import Feature from 'ol/Feature'
import {Point, Polygon, LineString, MultiLineString, MultiPolygon, LinearRing} from 'ol/geom'
import {Style, Fill, Stroke, Text, Icon} from "ol/style";
import axios from "axios";
import { linearRing } from "ol/src/geom/flat/area";


class GB18306 extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let xh1 = (coor, newarr, code) => {
      coor.forEach((k) => {
        let nextarr = []
        if (k[0] instanceof Array) {
          xh1(k, nextarr, code)
          newarr.push(nextarr)
        } else {
          newarr.push(Transform(k,'EPSG:' + code,'EPSG:3857'))
        }
      })
    }

    let url =  'http://www.gb18306.net/iserver/services/map-earth/rest/maps/EPA/queryResults.json?returnPostAction=true&getMethodForm=true&returnContent=true';
    let data = {"queryMode":"SqlQuery", "bounds":{"leftBottom":{"x":0, "y":0}, "rightTop":{"x":100, "y":100}}, "distance":1, "queryParameters":{"queryParams":[{"attributeFilter":"SMID &gt; 0", "name":"EPA20150609R@earthdb"}], "startRecord":0, "expectCount":2000, "networkType":"LINE", "queryOption":"ATTRIBUTEANDGEOMETRY"}, "keywords":"", "spatialQueryMode":"INTERSECT"}
    let loader = function (extent, resolution, projection, success, failure) {
      axios.post(url, data).then((response) => {
        let recordsets = response.data.recordsets[0].features.slice(0, 6)
        let features=[]
        recordsets.forEach(e => {
          let coors = []
          
          let geometry = new MultiPolygon([])
          let points = e.geometry.points
          let polygon
          let polygons = []
          e.geometry.parts.forEach((k,i) => {
            let _points = points.slice(0, k)
            points = points.splice(k)
            let coor = []
            _points.forEach(j => {
              coor.push([j.x, j.y])
            })
            if (e.geometry.partTopo[i] == "1") {
              polygon = new Polygon([coor])
              polygons.push(polygon)
            } else {
              polygon.appendLinearRing(new LinearRing(coor))
            }
            // coors.push(coor)
          })
          polygons.forEach(e => {
            geometry.appendPolygon(e)
          })
          geometry.transform('EPSG:4326', 'EPSG:3857')
          let feature = new Feature({
            geometry: geometry
          })
          feature.setId(e.ID)
          feature.setProperties({
            data: e.fieldValues[11]
          })
          let color = {
            '0.05': 'rgba(250, 236, 224, 0.9)',
            '0.1':  'rgba(250, 227, 211, 0.9)',
            '0.15': 'rgba(250, 220, 207, 0.9)',
            '0.2': 'rgba(250, 202, 119, 0.9)',
            '0.3': 'rgba(250, 178, 151, 0.9)',
            '0.4': 'rgba(218, 122, 119, 0.9)',
          }
          feature.setStyle(new Style({
            fill: new Fill({
              color: color[e.fieldValues[11]]
            }),
            stroke: new Stroke({
              color: '#ccc',
              width: 1
            })
          }))
          features.push(feature)
        })
        this.addFeatures(features)
        // success(features)
      })
    }
    super({
      // format:new GeoJSON(),
      loader,
      // strategy: tileStrategy(
      //   createXYZ({
      //     tileSize: 128,
      //   })
      // ),
      wrapX: false
    })
  }
}

export default GB18306;