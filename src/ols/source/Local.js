import VecSource from 'ol/source/Vector'
import {GeoJSON, GPX } from 'ol/format'
import KML from '../format/KMLS'
import KMZ from '../format/KMZ'
// import shpjs from 'shpjs';

class Local extends VecSource{
  constructor(opt_options) {
    const options = opt_options || {}
    let format
    if(options.type == 'kml'||options.type == 'kmz') {
      format = new KML()
    } else if(options.type == 'gpx') {
      format = new GPX()
    }
    let proj = options.proj || 'EPSG:4326'
    let dataProjection
    let featureProjection
    if(proj == 'gcj-02-4326') {
      dataProjection = 'EPSG:4326'
      featureProjection = 'EPSG:3857'
    } else {
      dataProjection = proj
      featureProjection = "EPSG:3857"
    }
    let loader = function (extent, resolution, projection, success, failure) {
      if(options.type == 'kml') {
        var reader = new FileReader()
        reader.readAsText(options.file)
        let kmlformat = new KML({
          extractStyles: true,
          extractAttributes: true
        })
        reader.onload = (res) => {
          let features = kmlformat.readFeatures(res.target.result , {
            dataProjection,
            featureProjection
          })
          if(proj == 'gcj-02-4326') {
            features.forEach((k) => {
              k.getGeometry().transform('GCJ-02', 'EPSG:3857')
            })
          }
          // console.log(features);
          this.addFeatures(features)
        }
      } else if (options.type == 'kmz') {
        let kmzformat = new KMZ({
          extractStyles: true,
          extractAttributes: true
        })
        kmzformat.readFeatures(options.file, {
          dataProjection,
          featureProjection
        }).then(fs => {
          if(proj == 'gcj-02') {
            fs.forEach((k) => {
              k.getGeometry().transform('GCJ-02', 'EPSG:3857')
            })
          }
          this.addFeatures(fs);
        })
      } else if (options.type == 'shp') {
        var reader = new FileReader()
        reader.readAsArrayBuffer(options.file)
        reader.onload = function(){
          let arrayBuffer = this.result
          // shpjs(arrayBuffer).then(geojson=>{
          //   let features =  new GeoJSON().readFeatures(geojson, {
          //     dataProjection, 
          //     featureProjection
          //   })
          
          // if(proj == 'gcj-02') {
          //   features.forEach((k) => {
          //     k.getGeometry().transform('GCJ-02', 'EPSG:3857')
          //   })
          // }
          //   this.addFeatures(features)
          // })
        }
      } else if (options.type == 'gpx') {
        var reader = new FileReader()
        reader.readAsText(options.file)
        reader.onload = (res) => {
          let gpxformat = new GPX({
            extractStyles: true,
            extractAttributes: true
          })
          let features = gpxformat.readFeatures(res.target.result, {
            dataProjection,
            featureProjection
          })
          if(proj == 'gcj-02-4326') {
            features.forEach((k) => {
              k.getGeometry().transform('GCJ-02', 'EPSG:3857')
            })
          }
          // console.log(features);
          this.addFeatures(features)
        }
      }
    }
    super({
      format,
      loader
    })
  }
}

export default Local