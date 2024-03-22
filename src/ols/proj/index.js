
import projection from './projection/index';
import datum from './datum/index';

let smerc2bmerc = function(input, opt_output, opt_dimension) {
  var output = projection.sphericalMercator.inverse(input, opt_output, opt_dimension);
  output = datum.bd09.fromWGS84(output, output, opt_dimension);
  return projection.baiduMercator.forward(output, output, opt_dimension);
};

let bmerc2smerc = function(input, opt_output, opt_dimension) {
  var output = projection.baiduMercator.inverse(input, opt_output, opt_dimension);
  output = datum.bd09.toWGS84(output, output, opt_dimension);
  return projection.sphericalMercator.forward(output, output, opt_dimension);
};

let bmerc2ll = function(input, opt_output, opt_dimension) {
  var output = projection.baiduMercator.inverse(input, opt_output, opt_dimension);
  return datum.bd09.toWGS84(output, output, opt_dimension);
};

let ll2bmerc = function(input, opt_output, opt_dimension) {
  var output = datum.bd09.fromWGS84(input, opt_output, opt_dimension);
  return projection.baiduMercator.forward(output, output, opt_dimension);
};

let ll2smerc = projection.sphericalMercator.forward;
let smerc2ll = projection.sphericalMercator.inverse;
export default {
  smerc2bmerc,
  bmerc2smerc,
  bmerc2ll,
  ll2bmerc,
  ll2smerc,
  smerc2ll,
  datum,
  projection
}
