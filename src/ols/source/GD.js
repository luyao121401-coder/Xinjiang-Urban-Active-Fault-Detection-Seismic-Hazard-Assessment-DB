import XYZ from 'ol/source/XYZ'
import { addProjection, addCoordinateTransforms } from "ol/proj";
import { gcjMecator, projts } from "../gcj02";


class TDTSue extends XYZ {
  constructor(opt_options) {
    const options = opt_options || {}

    let attributions =
    '&#169; ' +
    '<a href="https://www.amap.com/" target="_blank">高德地图</a> ' +
    'contributors.'

    const crossOrigin =
      options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

    let type =
      options.type !== undefined ? options.type : 'vec'

    let code = {
      'img': 6,
      'vec': 7,
      'cia': 8
    }
    
    const url =
      options.url !== undefined
        ? options.url
        : `http://webst0{1-4}.is.autonavi.com/appmaptile?style=${code[type]}&x={x}&y={y}&z={z}`
    addProjection(gcjMecator());
    addCoordinateTransforms(
        "EPSG:4326",
        gcjMecator(),
        projts().ll2gmerc,
        projts().gmerc2ll
    );
    addCoordinateTransforms(
        "EPSG:3857",
        gcjMecator(),
        projts().smerc2gmerc,
        projts().gmerc2smerc
    )
    super({
      attributions: attributions,
      projection: 'EPSG:3857',
      crossOrigin: crossOrigin,
      maxZoom: 18,
      url: url,
      projection: 'GCJ-02'
    });
    this._type = type
  }
  get type() {
      return this._type
  }
  set type(v) {
    if (['vec', 'img', 'cia'].includes(v)) {
      let code = {
        'img': 6,
        'vec': 7,
        'cia': 8
      }
      this._type = v
      this.setUrl(`http://webst0{1-4}.is.autonavi.com/appmaptile?style=${code[v]}&x={x}&y={y}&z={z}`)
    } else {
      throw 'GDmapType invalid!'
    }
  }
}
export default TDTSue