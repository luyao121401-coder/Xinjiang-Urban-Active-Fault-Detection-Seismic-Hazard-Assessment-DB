import Tile from 'ol/reproj/Tile';

import EventType from 'ol/events/EventType.js';
import TileState from 'ol/TileState.js';
import Triangulation from 'ol/reproj/Triangulation.js';
import {
  calculateSourceExtentResolution,
  render as renderReprojected,
} from '../reproj.js';
import {clamp} from 'ol/math.js';
import {getArea, getIntersection} from 'ol/extent.js';
import {listen, unlistenByKey} from 'ol/events.js';

class ReprojTiles extends Tile {
  constructor(
    sourceProj,
    sourceTileGrid,
    targetProj,
    targetTileGrid,
    tileCoord,
    wrappedTileCoord,
    pixelRatio,
    gutter,
    getTileFunction,
    opt_errorThreshold,
    opt_renderEdges,
    opt_interpolate
  ) {
    super(
      sourceProj,
      sourceTileGrid,
      targetProj,
      targetTileGrid,
      tileCoord,
      wrappedTileCoord,
      pixelRatio,
      gutter,
      getTileFunction,
      opt_errorThreshold,
      opt_renderEdges,
      opt_interpolate)
  }
}
ReprojTiles.prototype.reproject_ = function() {
  const sources = [];
  this.sourceTiles_.forEach(
    function (tile, i, arr) {
      if (tile && tile.getState() == TileState.LOADED) {
        sources.push({
          extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
          image: tile.getImage(),
        });
      }
    }.bind(this)
  );
  this.sourceTiles_.length = 0;

  if (sources.length === 0) {
    this.state = TileState.ERROR;
  } else {
    const z = this.wrappedTileCoord_[0];
    const size = this.targetTileGrid_.getTileSize(z);
    const width = typeof size === 'number' ? size : size[0];
    const height = typeof size === 'number' ? size : size[1];
    const targetResolution = this.targetTileGrid_.getResolution(z);
    const sourceResolution = this.sourceTileGrid_.getResolution(
      this.sourceZ_
    );

    const targetExtent = this.targetTileGrid_.getTileCoordExtent(
      this.wrappedTileCoord_
    );

    this.canvas_ = renderReprojected(
      width,
      height,
      this.pixelRatio_,
      sourceResolution,
      this.sourceTileGrid_.getExtent(),
      targetResolution,
      targetExtent,
      this.triangulation_,
      sources,
      this.gutter_,
      this.renderEdges_,
      this.interpolate
    );
    // console.log('width', width)
    // console.log('height', height)
    // console.log('this.pixelRatio_', this.pixelRatio_)
    // console.log('sourceResolution', sourceResolution)
    // console.log('this.sourceTileGrid_.getExtent()', this.sourceTileGrid_.getExtent())
    // console.log('targetResolution', targetResolution)
    // console.log('targetExtent', targetExtent)
    // console.log('this.triangulation_', this.triangulation_)
    // console.log('sources', sources)
    // console.log('this.gutter_', this.gutter_)
    // console.log('this.renderEdges_', this.renderEdges_)
    // console.log('this.interpolate', this.interpolate)

    this.state = TileState.LOADED;
  }
  this.changed();
}

ReprojTiles.prototype.load = function() {
  return new Promise(function(resolve, reject) {
    if (this.state == TileState.IDLE) {
      this.state = TileState.LOADING;
      this.changed();

      let leftToLoad = 0;

      this.sourcesListenerKeys_ = [];
      this.sourceTiles_.forEach(
        function (tile, i, arr) {
          const state = tile.getState();
          if (state == TileState.IDLE || state == TileState.LOADING) {
            leftToLoad++;

            const sourceListenKey = listen(
              tile,
              EventType.CHANGE,
              function (e) {
                const state = tile.getState();
                if (
                  state == TileState.LOADED ||
                  state == TileState.ERROR ||
                  state == TileState.EMPTY
                ) {
                  unlistenByKey(sourceListenKey);
                  leftToLoad--;
                  if (leftToLoad === 0) {
                    this.unlistenSources_();
                    this.reproject_();
                    console.log(1);
                    resolve();
                  }
                }
              },
              this
            );
            this.sourcesListenerKeys_.push(sourceListenKey);
          }
        }.bind(this)
      );

      if (leftToLoad === 0) {
        setTimeout(this.reproject_.bind(this), 0);
      } else {
        this.sourceTiles_.forEach(function (tile, i, arr) {
          const state = tile.getState();
          if (state == TileState.IDLE) {
            tile.load();
          }
        });
      }
    }
  }.bind(this));
}


export default ReprojTiles;