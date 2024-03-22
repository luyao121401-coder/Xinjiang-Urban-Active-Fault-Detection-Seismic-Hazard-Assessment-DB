import VectorSource from "ol/source/Vector";
import {createXYZ} from 'ol/tilegrid'
import {tile as tileStrategy} from 'ol/loadingstrategy'
import GeoJSON from 'ol/format/GeoJSON'
import axios from "axios";


class IGL extends VectorSource {
  constructor(opt_options) {
    let agecode  = {
      'preq': '5',
      'emp': '6',
      'lp': '7',
      'h': '8',
    }
    const options = opt_options || {};
    let age = options.age = options.age || 'preq';

    let url =  `http://data.activetectonics.cn/arcserver/rest/services/AcriveFaultChinese/CEFS_MIPRO/MapServer/${agecode[age]}/query?` + 
      'f=geojson&outFields=*&outSR=102100&geometryType=esriGeometryEnvelope&inSR=102100&where=1=1'
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
    this._age = age;
    this._url = url;
  }
  get age() {
    return this._age
  }
  set age(v) {
    this._age = v
    let agecode  = {
      'preq': '5',
      'emp': '6',
      'lp': '7',
      'h': '8',
    }
    this._url = `http://data.activetectonics.cn/arcserver/rest/services/AcriveFaultChinese/CEFS_MIPRO/MapServer/${agecode[v]}/query?` +
      'f=geojson&outFields=*&outSR=102100&geometryType=esriGeometryEnvelope&inSR=102100&maxRecordCountFactor=3&where=1=1'
    let loader = function (extent, resolution, projection, success, failure) {
      var url_ = this._url + 
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
    this.setLoader(loader)
    this.refresh()
  }
}

export default IGL;