import VectorSource from "ol/source/Vector";
import {createXYZ} from 'ol/tilegrid'
import {tile as tileStrategy} from 'ol/loadingstrategy'
import GeoJSON from 'ol/format/GeoJSON'
import axios from "axios";


class ESRI extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};

    let url = options.url + "/query/?f=geojson&outSR=102100&geometryType=esriGeometryEnvelope&inSR=102100&maxRecordCountFactor=3&where=1=1";
    console.log(url);
    let loader = function (extent, resolution, projection, success, failure) {
      var url_ = url + 
        '&geometry=' +
        encodeURIComponent(
          '{"xmin":' + extent[0] +
            ',"ymin":' + extent[1] +
            ',"xmax":' + extent[2] +
            ',"ymax":' +   extent[3] +
            ',"spatialReference":{"latestWkid":3857,"wkid":102100}}'
        )
      axios.get(url_)
      .then((response) => {
          this.addFeatures(new GeoJSON().readFeatures(response.data))
        })
    }
    super({
      format:new GeoJSON(),
      loader,
      strategy: tileStrategy(
        createXYZ({
          tileSize: 128,
        })
      ),
      wrapX: false
    })
  }
}

export default ESRI;