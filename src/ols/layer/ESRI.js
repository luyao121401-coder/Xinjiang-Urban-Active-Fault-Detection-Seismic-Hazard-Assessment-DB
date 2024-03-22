import VectorLayer from 'ol/layer/Vector'
import ESRISue from '../source/ESRI'
import {Style, Fill, Stroke, Text} from "ol/style";

class ESRI extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let url = options.url
    let source = 
      new ESRISue({url})
    let visible = 
      options.visible !== undefined ? options.visible : true
    super({
      source,
      visible,
    })
  }
}

export default ESRI