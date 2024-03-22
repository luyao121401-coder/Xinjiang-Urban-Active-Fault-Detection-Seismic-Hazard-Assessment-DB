import CustomVecSuc from "../source/CustomVec";
import ESRI from "../source/ESRI";
import VecLyr from 'ol/layer/Vector';

class CustomVec extends VecLyr {
  constructor(opt_options) {
    const options = opt_options || {};
    let format = opt_options.format || 'kml';

    let url = options.url;
    let source
    if(format == 'esri') {
      source = new ESRI({
        url: url
      })
    } else{
      source = new CustomVecSuc({
        format: format,
        url: url
      })
    }
    super({
      source: source
    });
  }
}

export default CustomVec;