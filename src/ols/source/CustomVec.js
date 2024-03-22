import VecSource from 'ol/source/Vector'
import { KML, GeoJSON, GPX } from 'ol/format'
import KMLS from '../format/KMLS'

class CustomVec extends VecSource{
  constructor(opt_options) {
    const options = opt_options || {}
    let format
    switch (options.format) {
      case 'kml':
        format = new KMLS({
          extractStyles: true,
          extractAttributes: true
        })
        break;
      case 'geojson':
        format = new GeoJSON()
        break;
      case 'gpx':
        format = new GPX()
        break;
      default:
        format = new KML()
        break;
    }

    let url =  options.url
    super({
      format: format,
      url: url
    })
  }
}

export default CustomVec