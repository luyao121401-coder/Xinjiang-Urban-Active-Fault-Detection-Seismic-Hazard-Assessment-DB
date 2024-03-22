import TileLayer from 'ol/layer/Tile'
import CustomTileSue from '../source/CustomTile'



class CustomTile extends TileLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let source = 
      new CustomTileSue({
        url: options.url,
        tileSize: options.tileSize,
        maxZoom: options.maxZoom,
        minZoom: options.minZoom,
        projection: options.projection,
      })
    let visible = 
      options.visible !== undefined ? options.visible : true
    super({
      source: source,
      visible:visible
    })
  }
}

export default CustomTile