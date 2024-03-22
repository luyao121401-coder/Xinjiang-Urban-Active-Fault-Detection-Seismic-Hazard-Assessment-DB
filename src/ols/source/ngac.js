import XYZ from 'ol/source/XYZ'

class NGAC extends XYZ {
  constructor(opt_options) {
    const options = opt_options || {}

    let attributions =
    '&#169; ' +
    '<a href="https://www.ngac.cn/" target="_blank">全国地质资料馆</a> ' +
    'contributors.'

    const crossOrigin =
      options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';

    let mapid =
      options.mapid !== undefined ? options.mapid : 'qg20_20210401_FCnDDRJd'
    
    let maptk = options.maptk !== undefined ? options.maptk : 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMTEzZGZiMS02NWJlLTQ0NjAtYjk2My1iNGNhNDE0YWM5ZmUifQ.I4JDC-pQAO81Qd3FhAXJeKqUz1Vsk6ZWSkLfLERFQ8M'

    
    const url =
      options.url !== undefined
        ? options.url
        :  `https://igss.cgs.gov.cn:6160/igs/rest/ogc/${mapid}/WMTSServer/1.0.0/${mapid}/default/EPSG:4326_${mapid}_dpi96_GB/{z-1}/{y}/{x}.png?tk=${maptk}`
    
    let tileUrlFunction = function(TileCoord) {
      let _url = url
      var regex_z = /{\d{0,9}[+-]{0,1}z[+-]{0,1}\d{0,9}}/
      var regex_x = /{\d{0,9}[+-]{0,1}x[+-]{0,1}\d{0,9}}/
      var regex_y = /{\d{0,9}[+-]{0,1}y[+-]{0,1}\d{0,9}}/
      let z = _url.match(regex_z)
      let x = _url.match(regex_x)
      let y = _url.match(regex_y)
      let chengeCoord = (a)=>{
        if (a.match(/\d{1,9}/g).length == 2) {
          switch (a.match(/[+-]{1,2}/g)[0]) {
            case '-':
              return parseInt(a.match(/\d{1,9}/g)[0]) - parseInt(a.match(/\d{1,9}/g)[1])
            case '+':
              return parseInt(a.match(/\d{1,9}/g)[0]) + parseInt(a.match(/\d{1,9}/g)[1])
            default:
              break;
          }
        } else {
          return a
        }
      }
      z = chengeCoord(z[0].replace(/z/, TileCoord[0]).replace(/{/, '').replace(/}/, ''))
      x = chengeCoord(x[0].replace(/x/, TileCoord[1]).replace(/{/, '').replace(/}/, ''))
      y = chengeCoord(y[0].replace(/y/, TileCoord[2]).replace(/{/, '').replace(/}/, ''))
      _url = _url.replace(regex_z, z).replace(regex_x, x).replace(regex_y, y)
      return _url
    }
    super({
      attributions: attributions,
      projection: 'EPSG:4326',
      crossOrigin: crossOrigin,
      maxZoom: 18,
      tileUrlFunction: tileUrlFunction,
    });
    this._mapid = mapid
  }
  get mapid() {
    return this._mapid
  }
}

export default NGAC