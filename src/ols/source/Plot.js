import VectorSource from "ol/source/Vector"
import {transform as Transform} from 'ol/proj'
import FeatureFormat from 'ol/format/Feature';
import Feature from 'ol/Feature'
import {Point, Polygon, LineString, MultiLineString} from 'ol/geom'
import {Style, Fill, Stroke, Text, Icon} from "ol/style";
import {Draw} from '../../js/api'

import {pointiconpath} from '../path'


class Plot extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let loader = function() {
      let features = []
      Draw.getDrawByID(options.getID).then((e) => {
        e.forEach((k) => {
          let colorchg = (c) => {
            if (!c.startsWith('#')) {
              c = '#' + c
            }
            if (c.length == 7) {
              return colorchg('#FF' + c.substring(1,7))
            }else {
              let red = parseInt(c.substring(3,5), 16).toString(10)
              let green = parseInt(c.substring(5,7), 16).toString(10)
              let blue = parseInt(c.substring(7,9), 16).toString(10)
              let alp = parseInt(c.substring(1,3), 16).toString(10)/255
              return `rgba(${red},${green},${blue},${alp})`
            }
          }
          let geometryInfo = k.geometry instanceof Object ? k.geometry : JSON.parse(k.geometry)
          let styleInfo = k.style instanceof Object ? k.style : JSON.parse(k.style)
          let geometry
          let style
          let xh1 = (coor, newarr) => {
            coor.forEach((k) => {
              let nextarr = []
              if (k[0] instanceof Array) {
                xh1(k, nextarr)
                newarr.push(nextarr)
              } else {
                newarr.push(Transform(k,'EPSG:4326','EPSG:3857'))
              }
            })
          }
          if(k.shape == "POLYLINE") {
            let coordinates = []
            xh1(geometryInfo.paths, coordinates)
            geometry = new MultiLineString(coordinates)
            style = new Style({
              stroke: new Stroke({
                color: colorchg(styleInfo.color),
                width: styleInfo.width
              })
            })
          } 
          else if(k.shape == "POLYGON") {
            let coordinates = []
            xh1(geometryInfo.rings, coordinates)
            geometry = new Polygon(coordinates)
            style = new Style({
              stroke: new Stroke({
                color: colorchg(styleInfo.color),
                width: styleInfo.width
              }),
              fill: new Fill({
                color: colorchg(styleInfo.fillColor)
              })
            })
          }
          else if(k.shape == "POINT") {
            geometry = new Point(Transform([geometryInfo.x, geometryInfo.y],'EPSG:4326','EPSG:3857'))
            console.log(colorchg(styleInfo.color));
            style = new Style({
              image: new Icon({
                src: pointiconpath + styleInfo.icon,
                scale: 0.25 * styleInfo.width,
                color: colorchg(styleInfo.color),
              }),
              text: new Text({
                offsetY: 20,
                text: k.name,
                font: 'bold 13px sans-serif',
                textBaseline: 'end',
                textAlign: 'center',
                fill: new Fill({
                  color:'#ffffff'
                }),
                stroke: new Stroke({
                  color: '#000000',
                  width: 1
                })
              })
            })
          }
          
          let feature = this.getFeatureById(k.id)?this.getFeatureById(k.id):new Feature()
          feature.setGeometry(geometry)
          feature.setId(k.id)
          // if (feature) {
          //   feature.setGeometry(geometry)
          // } else {
          //   feature = new Feature({
          //     geometry: geometry
          //   })
          //   feature.setId(k.id)
          // }
          // let style = new Style({
          //   stroke: new Stroke({
          //     color: styleInfo.color,
          //     width: styleInfo.width
          //   }),
          //   fill: new Fill({
          //     color: styleInfo.fillColor
          //   }),
          //   image: new Icon({
          //     src: pointiconpath + styleInfo.icon,
          //     scale: 0.25 * styleInfo.width,
          //     color: styleInfo.color,
          //   }),
          //   text: new Text({
          //     offsetY: 20,
          //     text: k.name,
          //     font: 'bold 16px sans-serif',
          //     textBaseline: 'end',
          //     textAlign: 'center',
          //     fill: new Fill({
          //       color:'#ffffff'
          //     }),
          //     stroke: new Stroke({
          //       color: '#000000',
          //       width: 0.5
          //     })
          //   })
          // })
          feature.setProperties({
            name: k.name,
            desc: k.desc,
            length: k.length,
            area: k.area,
            lon: k.geometry.x,
            lat: k.geometry.y,
            '_style_': style,
          })
          feature.setStyle(style)
          feature.set('_edit_', true)
          features.push(feature)
        })
        this.addFeatures(features);
      })
    }
    setTimeout(() => {
      this.refreshs()
    }, 1000*10);
    super({
      format:new FeatureFormat(),
      loader
    })
    this._getID = options.getID
  }
  get getID() {
    return this._getID
  }
}

Plot.prototype.refreshs = function() {
  let features = []
  Draw.getDrawByID(this._getID).then((e) => {
    this.getFeatures().forEach((f) => {
      let id = f.getId()
      if(!e.find((k) => {
        return k.id == id
      })) {
        this.removeFeature(f)
      }
    })
    this.dispatchEvent({ 
      type: 'refreshssucc'
    });
    e.forEach((k) => {
      let colorchg = (c) => {
        if (!c.startsWith('#')) {
          c = '#' + c
        }
        if (c.length == 7) {
          return colorchg('#FF' + c.substring(1,7))
        }else {
          let red = parseInt(c.substring(3,5), 16).toString(10)
          let green = parseInt(c.substring(5,7), 16).toString(10)
          let blue = parseInt(c.substring(7,9), 16).toString(10)
          let alp = parseInt(c.substring(1,3), 16).toString(10)/255
          return `rgba(${red},${green},${blue},${alp})`
        }
      }
      let geometryInfo = k.geometry instanceof Object ? k.geometry : JSON.parse(k.geometry)
      let styleInfo = k.style instanceof Object ? k.style : JSON.parse(k.style)
      let geometry
      let style
      let xh1 = (coor, newarr) => {
        coor.forEach((k) => {
          let nextarr = []
          if (k[0] instanceof Array) {
            xh1(k, nextarr)
            newarr.push(nextarr)
          } else {
            newarr.push(Transform(k,'EPSG:4326','EPSG:3857'))
          }
        })
      }
      if(k.shape == "POLYLINE") {
        let coordinates = []
        xh1(geometryInfo.paths, coordinates)
        geometry = new MultiLineString(coordinates)
        style = new Style({
          stroke: new Stroke({
            color: colorchg(styleInfo.color),
            width: styleInfo.width
          })
        })
      } 
      else if(k.shape == "POLYGON") {
        let coordinates = []
        xh1(geometryInfo.rings, coordinates)
        geometry = new Polygon(coordinates)
        style = new Style({
          stroke: new Stroke({
            color: colorchg(styleInfo.color),
            width: styleInfo.width
          }),
          fill: new Fill({
            color: colorchg(styleInfo.fillColor)
          })
        })
      }
      else if(k.shape == "POINT") {
        geometry = new Point(Transform([geometryInfo.x, geometryInfo.y],'EPSG:4326','EPSG:3857'))
        console.log(colorchg(styleInfo.color));
        style = new Style({
          image: new Icon({
            src: pointiconpath + styleInfo.icon,
            scale: 0.25 * styleInfo.width,
            color: colorchg(styleInfo.color),
          }),
          text: new Text({
            offsetY: 20,
            text: k.name,
            font: 'bold 13px sans-serif',
            textBaseline: 'end',
            textAlign: 'center',
            fill: new Fill({
              color:'#ffffff'
            }),
            stroke: new Stroke({
              color: '#000000',
              width: 1
            })
          })
        })
      }
      
      let feature = this.getFeatureById(k.id)?this.getFeatureById(k.id):new Feature()
      feature.setGeometry(geometry)
      feature.setId(k.id)
      // if (feature) {
      //   feature.setGeometry(geometry)
      // } else {
      //   feature = new Feature({
      //     geometry: geometry
      //   })
      //   feature.setId(k.id)
      // }
      // let style = new Style({
      //   stroke: new Stroke({
      //     color: styleInfo.color,
      //     width: styleInfo.width
      //   }),
      //   fill: new Fill({
      //     color: styleInfo.fillColor
      //   }),
      //   image: new Icon({
      //     src: pointiconpath + styleInfo.icon,
      //     scale: 0.25 * styleInfo.width,
      //     color: styleInfo.color,
      //   }),
      //   text: new Text({
      //     offsetY: 20,
      //     text: k.name,
      //     font: 'bold 16px sans-serif',
      //     textBaseline: 'end',
      //     textAlign: 'center',
      //     fill: new Fill({
      //       color:'#ffffff'
      //     }),
      //     stroke: new Stroke({
      //       color: '#000000',
      //       width: 0.5
      //     })
      //   })
      // })
      feature.setProperties({
        name: k.name,
        desc: k.desc,
        length: k.length,
        area: k.area,
        lon: k.geometry.x,
        lat: k.geometry.y,
        '_style_': style,
      })
      feature.setStyle(style)
      feature.set('_edit_', true)
      features.push(feature)
    })
    this.addFeatures(features);
  }).catch((e) => {
    this.dispatchEvent({ 
      type: 'refreshserr',
      msg: e
    });
  })
}

export default Plot;