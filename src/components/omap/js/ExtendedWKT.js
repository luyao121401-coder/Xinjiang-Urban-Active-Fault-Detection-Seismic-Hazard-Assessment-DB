import WKT from 'ol/format/WKT';
/**
 * 支持圆形Circle导出序列化
 */
export class ExtendedWKT extends WKT {
    /**
   * @param {import("../geom/Geometry.js").default} geometry Geometry.
   * @param {import("./Feature.js").WriteOptions} [opt_options] Write options.
   * @protected
   * @return {string} Text.
   */
  writeGeometryText(geometry, opt_options) {
      if(geometry.getType() == 'Circle'){
          return "CIRCLE("+geometry.getCenter().join(' ')+")";
      } else {
          super.writeGeometryText(geometry, opt_options)
      }
  }
}