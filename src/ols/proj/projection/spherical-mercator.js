import {forEachPoint} from '../util';

var RADIUS = 6378137;
var MAX_LATITUDE = 85.0511287798;
var RAD_PER_DEG = Math.PI / 180;

let forward = forEachPoint(function(input, output, offset) {
  var lat = Math.max(Math.min(MAX_LATITUDE, input[offset + 1]), -MAX_LATITUDE);
  var sin = Math.sin(lat * RAD_PER_DEG);

  output[offset] = RADIUS * input[offset] * RAD_PER_DEG;
  output[offset + 1] = RADIUS * Math.log((1 + sin) / (1 - sin)) / 2;
});

let inverse = forEachPoint(function(input, output, offset) {
  output[offset] = input[offset] / RADIUS / RAD_PER_DEG;
  output[offset + 1] = (2 * Math.atan(Math.exp(input[offset + 1] / RADIUS)) - (Math.PI / 2)) / RAD_PER_DEG;
});

export default {
  forward: forward,
  inverse: inverse
};
