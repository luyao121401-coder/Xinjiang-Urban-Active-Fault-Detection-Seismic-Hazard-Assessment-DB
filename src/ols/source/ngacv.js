import VectorSource from "ol/source/Vector"
import GeoJSON from 'ol/format/GeoJSON'
import {Style, Fill, Stroke, Text, Circle, RegularShape, Icon} from "ol/style";


class NGACV extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let prop = options.prop
    super({
      format:new GeoJSON(),
      url: `http://dem.geoquater.com/geoserver/jitubiao/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=jitubiao:${prop}&maxFeatures=50000&outputFormat=application/json`
    })
  }
}

export default NGACV;