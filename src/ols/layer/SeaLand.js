import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Fill, Stroke, Icon, Circle, RegularShape, Text } from "ol/style";
import FillPattern from "ol-ext/style/FillPattern";
import { Polygon, LineString, Point, MultiPoint } from "ol/geom";
import WebGLTile from 'ol/layer/WebGLTile';
import GeoTIFF from "ol/source/GeoTIFF";
import Group from "ol/layer/Group"
import { styleRules, templateRules } from "./SeaLandConfig"
import { unByKey } from 'ol/Observable';


class SeaLand extends Group {
  constructor(opt_options) {
    const options = opt_options || {};
    // let url = 'layers/' + options.layerType + '.geojson';
    let api = options.api;
    // let data  = options.data;
    let layerType = options.layerType || 'GeomorphyPoint';
    let vec = new VectorLayer({
      source: new VectorSource({
        // url: url,
        format: new GeoJSON(),
        loader: function (extent, resolution, projection) {
          api.then(e => {
            vec.getSource().addFeatures(vec.getSource().getFormat().readFeatures(e.data, {
              featureProjection: projection
            }));
          })
        }
      }),
    });
    vec.setZIndex(0)
    let img = new WebGLTile();
    img.setZIndex(1)
    // vec.img = img;

    let layers = [vec, img]
    super({
      layers
    })
    this.img_ = img;
    this.vec_ = vec;
    this.layerType_ = layerType;
    vec.setStyle((f, res) => {
      return getLStyle(f, res, layerType)
    })
    vec.popupTemplate = getTemplate(this.layerType, this.img)
  }
  get img() {
    return this.img_;
  }
  get vec() {
    return this.vec_;
  }
  get layerType() {
    return this.layerType_
  }
}
var getLStyle = (f, res, layerType) => {
  // if (layerType == 'Basin')
  FillPattern.addPattern(
    "linedash", {
    width: 7,
    height: 7,
    lines: [[2, 5, 5, 2]],
    stroke: 1
  });
  let styleRule = styleRules[layerType];
  let style;
  if (styleRule.type === 'point') {
    let field = styleRule.field;
    let rules = styleRule.rules;
    let value = (field || field !== '') ? f.get(field) : 'default'
    if (styleRule.condition) {
      let val = value;
      for (let key in rules) {
        let _script = 'if (' + key + ') {value = key}';
        eval(_script);
      }
    }
    if (styleRule.styletype == 'circle') {
      style = []
      let styles
      rules[value] instanceof Array ? styles = [...rules[value]] : styles = [rules[value]];
      styles.forEach(s => {
        let color = s.fillColor
        let radius = s.radius
        let width = s.width
        let strokeColor = s.strokeColor
        style.push(
          new Style({
            image: new Circle({
              radius: radius,
              fill: new Fill({
                color: color
              }),
              stroke: new Stroke({
                color: strokeColor,
                width: width
              })
            })
          })
        )
      })
    }
    else if (styleRule.styletype == 'image') {
      let image = rules[value].image || rules['default'].image;
      let scale = rules[value].scale || 1;
      let rotation
      if (rotation instanceof Number) {
        rotation = rules[value].rotation || 0;
      } else {
        eval(rules[value].rotation);
      }
      let color
      try {
        color = eval(rules[value].color)
      } catch (error) {
        color = rules[value].color
      }
      style = new Style({
        image: new Icon({
          src: image,
          scale,
          rotation,
          color
        })
      })
    } else if (styleRule.styletype == 'text') {
      let fillColor = rules[value].fillColor
      let text = rules[value].text
      let font = rules[value].font
      let rotation = rules[value].rotation
      style = new Style({
        text: new Text({
          text: text,
          font: font,
          fill: new Fill({
            color: fillColor
          }),
          rotation
        })
      })
    } else if (styleRule.styletype == 'regular') {
      style = []
      let styles
      rules[value] instanceof Array ? styles = [...rules[value]] : styles = [rules[value]];
      styles.forEach(s => {
        let fillColor = s.fillColor
        let radius1 = s.radius1
        let radius2 = s.radius2
        let width = s.width
        let strokeColor = s.strokeColor
        let points = s.points
        let angle = s.angle
        let scale = s.scale
        style.push(new Style({
          image: new RegularShape({
            fill: new Fill({
              color: fillColor
            }),
            stroke: new Stroke({
              color: strokeColor,
              width: width
            }),
            points: points,
            radius: radius1,
            radius2: radius2,
            angle: angle,
            scale: scale
          })
        }))
      })
    }
  } else if (styleRule.type === 'line') {
    let field = styleRule.field;
    let rules = styleRule.rules;
    let color
    let width
    let lineDash
    let double
    let value = (field || field !== '') ? f.get(field) : 'default'

    color = rules[value]? rules[value].color : rules['default'].color;
    width = rules[value]? rules[value].width : rules['default'].width;
    lineDash = rules[value]? rules[value].lineDash : rules['default'].lineDash;
    double = rules[value]? rules[value].double : rules['default'].double;

    style = new Style({
      stroke: new Stroke({
        color,
        width: width || 1,
        lineDash: lineDash
      })
    })
    if (double) {
      let doubleStyle = new Style({
        image:
          new Icon({
            src: double.image,
            scale: double.scale || 1
          })
      })
      if (double.type === 'point') {
        if (double.location === 'middle') {
          let lines
          let points = []
          if (f.getGeometry().getType() === 'LineString') {
            lines = [f.getGeometry()]
          } else {
            lines = f.getGeometry().getLineStrings()
          }
          lines.forEach(line => {
            points.push(line.getCoordinateAt(0.5))
          });
          doubleStyle.setGeometry(new MultiPoint(points));
        }
      }
      style = [style, doubleStyle]
    }
  } else if (styleRule.type === 'polygon') {
    let field = styleRule.field;

    let rules = styleRule.rules;
    let fill
    let stroke
    let width
    let lineDash
    let fillPattern
    let name

    let value = (field || field !== '') ? f.get(field) : 'default'
    fill = rules[value]? rules[value].fill  : rules['default'].fill
    stroke = rules[value]? rules[value].stroke : rules['default'].stroke
    width = rules[value]? rules[value].width : rules['default'].width
    lineDash = rules[value]? rules[value].lineDash : rules['default'].lineDash
    fillPattern = rules[value]? rules[value].fillPattern : rules['default'].fillPattern
    name =  rules[value]? rules[value].name : rules['default'].name
    style = new Style({
      stroke: new Stroke({
        color: stroke,
        width: width,
        lineDash: lineDash
      }),
      text: new Text({
        text: name,
        font: '12px Calibri,sans-serif',
      })
    })
    if (fillPattern) {
      style.setFill(
        new FillPattern({
          image: fillPattern.src ? new Icon({
            src: fillPattern.src || 'https://openlayers.org/en/latest/examples/data/icon.png',
          }) : null,
          pattern: fillPattern.pattern,
          color: fillPattern.color,
          fill: new Fill({
            color: fillPattern.background
          }),
          size: fillPattern.size,
          scale: fillPattern.scale,
          angle: fillPattern.angle,
          spacing: fillPattern.spacing,
        })
      )
    }
    else {
      style.setFill(new Fill({
        color: fill
      }))
    }


  }
  return style;
}
var getTemplate = (layerType, img) => {
  let template = templateRules[layerType]
  if (layerType.startsWith('MaterialPolygonLayer')) {
    template.buttons = [
      {
        name: "图件",
        icon: require('../icon/search_b.png'),
        condition:
          "(f) => { if (f.get('images')) { return f.get('images').filter((item) => { return item.endsWith('tif') }).length > 0? true: false } else { return false } }"
        ,
        click:
          (f, t) => {
            let url = f.get('images').filter((item) => {
              return item.endsWith('tif')
            })[0];
            let source = new GeoTIFF({ sources: [{ url: process.env.VUE_APP_BASE_URL + "/v1/lsplatform/file/?fileName=" + url.replace(new RegExp('/', 'g'), "@"), overviews: [process.env.VUE_APP_BASE_URL + "/v1/lsplatform/file/?fileName=" + url.replace(new RegExp('/', 'g'), "@") + '.ovr'] }] })
            // console.log(process.env.VUE_APP_BASE_URL + url + '.ovr');
            img.getSource() && img.getSource().key_ == process.env.VUE_APP_BASE_URL + "/v1/lsplatform/file/?fileName=" + url.replace(new RegExp('/', 'g'), "@") ? img.setSource(null) : img.setSource(source)
            let a = source.on('tileloadend', (e) => {
              unByKey(a)
              t.getMap().getView().fit(source.getTileGrid().getExtent(), { duration: 500, padding: [100, 100, 100, 100] })
            })
          }
      }
    ]

  }
  return templateRules[layerType]
}
// var getSource = ()=>{
//   return this.vec.getSource()
// }
SeaLand.prototype.getSource = function () {
  return this.vec.getSource()
}

export default SeaLand
