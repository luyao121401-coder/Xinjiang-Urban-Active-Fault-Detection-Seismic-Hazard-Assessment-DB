import TileLayer from 'ol/layer/Tile'
import NgacSue from '../source/ngac'

class NgacLyr extends TileLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let mapid = 
      options.mapid !== undefined ? options.mapid : 'qg20_20210401_FCnDDRJd'
    let maptk = 
      options.maptk!== undefined ? options.maptk : 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTI5MDNjOS1lYjZjLTQ5ZDEtYjQ0My00NWVjYjJhMGZlYTkifQ.h0ZXzs8PXcPLzL1229wpWumdDT4aKGOtIUAF7sFzgts'
    let source = 
      new NgacSue({mapid, maptk})
    let visible = 
      options.visible !== undefined ? options.visible : true
    super({
      source: source,
      visible:visible
    })
    this._mapid = mapid
  }
  get mapid() {
    return this._mapid
  }
}

export default NgacLyr