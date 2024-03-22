import VectorSource from "ol/source/Vector"
import GeoJSON from 'ol/format/GeoJSON'


class USGS extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    super({
      format:new GeoJSON(),
      url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson'
    })
  }
}

export default USGS;