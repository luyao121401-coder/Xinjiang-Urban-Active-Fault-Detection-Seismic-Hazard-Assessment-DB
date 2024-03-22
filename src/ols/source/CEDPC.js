import VectorSource from "ol/source/Vector";
import {createXYZ} from 'ol/tilegrid'
import {tile as tileStrategy} from 'ol/loadingstrategy'
import GeoJSON from 'ol/format/GeoJSON'
import axios from "axios";


class CEDPC extends VectorSource {
  constructor(opt_options) {
    let agecode  = {
      'preq': '前第四纪断层',
      'emp': '早中更新世断层',
      'lp': '晚更新世断层',
      'h': '全新世断层',
    }
    const options = opt_options || {};
    let age = options.age = options.age || 'preq';

    let url =  'http://www.activefault-datacenter.cn/arcgis/rest/services/全国断层服务器发布图层/MapServer/0/query/?' + 
      `f=geojson&outSR=102100&geometryType=esriGeometryEnvelope&inSR=102100&outFields=FID,活动时代,断层长度,断层走向,断层性质,断层名称,断层倾向&maxRecordCountFactor=3&where=(活动时代 like '${agecode[age]}')`;
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
      'preq': '前第四纪断层',
      'emp': '早中更新世断层',
      'lp': '晚更新世断层',
      'h': '全新世断层',
    }
    this._url = this._url.replace(/活动时代 like '.*'/, `活动时代 like '${agecode[this._age]}'`)
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

export default CEDPC;