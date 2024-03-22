import XYZ from 'ol/source/XYZ'
import { gcjMecator, projts } from "../gcj02";
import { addProjection, addCoordinateTransforms } from "ol/proj";


class CustomTile extends XYZ {
  constructor(opt_options) {
    const options = opt_options || {}

    const attributions = options.attributions

    const crossOrigin =
      options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
    
    const projection =
      options.projection !== undefined ? options.projection : 'EPSG:3857';
    
    const maxZoom =
      options.maxZoom !== undefined ? options.maxZoom : 18;
    
    const minZoom =
      options.minZoom !== undefined ? options.minZoom : 0;
    
    const tileSize =
      options.tileSize !== undefined ? options.tileSize : 256;
    
    const url = options.url
    let tileUrlFunction = function(TileCoord) {
      let _url = url.replace('{level}', '{z}').replace('{col}', '{x}').replace('{row}', '{y}')
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
      attributions,
      projection,
      crossOrigin,
      maxZoom,
      minZoom,
      tileSize,
      tileUrlFunction,
    });
  }
}

export default CustomTile