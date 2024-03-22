import XYZ from 'ol/source/XYZ'

class TDTSue extends XYZ {
  constructor(opt_options) {
    const options = opt_options || {}

    let attributions =
    '&#169; ' +
    '<a href="https://www.tianditu.gov.cn/" target="_blank">天地图</a> ' +
    'contributors.'

    const crossOrigin =
      options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

    let type =
      options.type !== undefined ? options.type : 'vec'
    
    let tk 
    if (options.tk !== undefined) tk = options.tk
    else  throw 'You need to provide a token'
    
    const url =
      options.url !== undefined
        ? options.url
        : `http://t{0-7}.tianditu.com/DataServer?T=${type}_w&x={x}&y={y}&l={z}&tk=${tk}`;
    super({
      attributions: attributions,
      projection: 'EPSG:3857',
      crossOrigin: crossOrigin,
      maxZoom: 18,
      url: url,
    });
    this._type = type
    this._tk = tk
  }
  get type() {
      return this._type
  }
  set type(v) {
    if (['vec', 'img', 'ter', 'cva', 'cia', 'cta', 'ibo'].includes(v)) {
      this._type = v
      this.setUrl(`http://t{0-7}.tianditu.com/DataServer?T=${this._type}_w&x={x}&y={y}&l={z}&tk=${this._tk}`)
    } else {
      throw 'TDTmapType invalid!'
    }
  }
}
export default TDTSue