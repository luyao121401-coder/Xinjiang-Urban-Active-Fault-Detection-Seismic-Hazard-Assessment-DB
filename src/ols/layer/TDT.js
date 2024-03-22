import TileLayer from 'ol/layer/Tile'
import TDTSue from '../source/TDT'

class TDTLyr extends TileLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let type = 
      options.type !== undefined ? options.type : 'vec'
    let tk = 
      options.tk !== undefined ? options.tk : 'd21000f516e20e56b2a2b50596ecc1ee'
    let source = 
      new TDTSue({type: type, tk: tk})
    let visible = 
      options.visible !== undefined ? options.visible : true
    super({
      source: source,
      visible:visible
    })
    this._type = type
  }
  get type() {
    return this._type
  }
  set type(v) {
    this._type = v
    this.getSource().type = v
  }
}

export default TDTLyr