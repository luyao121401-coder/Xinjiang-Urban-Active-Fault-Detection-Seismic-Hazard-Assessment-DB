import TileLayer from 'ol/layer/Tile'
import GDSue from '../source/GD'

class GDLyr extends TileLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let type = 
      options.type !== undefined ? options.type : 'vec'

    let source = 
      new GDSue({type: type})

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

export default GDLyr