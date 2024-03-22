import VectorSource from "ol/source/Vector"
import {transform as Transform} from 'ol/proj'
import FeatureFormat from 'ol/format/Feature';
import Feature from 'ol/Feature'
import {Point, Polygon, LineString, MultiLineString} from 'ol/geom'
import {Style, Fill, Stroke, Text, Icon, Circle} from "ol/style";

import {Project} from '../../js/api'
import {pointiconpath} from '../path'


class Prjfrom extends VectorSource {
  constructor(opt_options) {
    const options = opt_options || {};
    let anno = options.anno || 'Name';
    let loader = () => {
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
      
      let xh1 = (coor, newarr, code) => {
        coor.forEach((k) => {
          let nextarr = []
          if (k[0] instanceof Array) {
            xh1(k, nextarr, code)
            newarr.push(nextarr)
          } else {
            newarr.push(Transform(k,'EPSG:' + code,'EPSG:3857'))
          }
        })
      }

      let member = []
      
      let getFeatures = (arr) => {
        this.getFeatures().forEach((f) => {
          let id = f.getId()
          if(!arr.find((k) => {
            return k.uniqueIdStr == id
          })) {
            this.removeFeature(f)
          }
        })
        let features = []
        arr.forEach((k) => {
          let geometryInfo = JSON.parse(k.geometry)
          let styleInfo = JSON.parse(k.style)
          let dataInfo = JSON.parse(k.data)
          let wkid = geometryInfo.spatialReference.wkid
          let geometry
          let style
          
          if((k.shape == "POLYLINE" || k.shape == "polyline") && geometryInfo.paths) {
            let coordinates = []
            xh1(geometryInfo.paths, coordinates, wkid)
            geometry = new MultiLineString(coordinates)
            style = new Style({
              stroke: new Stroke({
                color: colorchg(styleInfo.color),
                width: styleInfo.width
              }),
              text: new Text({
                offsetY: 20,
                text: dataInfo[this.anno],
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
          else if((k.shape == "POLYGON" || k.shape == "polygon") && geometryInfo.rings) {
            let coordinates = []
            xh1(geometryInfo.rings, coordinates, wkid)
            geometry = new Polygon(coordinates)
            style = new Style({
              stroke: new Stroke({
                color: colorchg(styleInfo.color),
                width: styleInfo.width
              }),
              fill: new Fill({
                color: colorchg(styleInfo.fillColor? styleInfo.fillColor: styleInfo.color)
              }),
              text: new Text({
                offsetY: 20,
                text: dataInfo[this.anno],
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
          else if(k.shape == "POINT" || k.shape == "point") {
            geometry = new Point(Transform([geometryInfo.x, geometryInfo.y],'EPSG:' + wkid,'EPSG:3857'))
            style = new Style({
              image: new Icon({
                src: pointiconpath + styleInfo.icon,
                scale: 0.25 * (styleInfo.width?styleInfo.width:2),
                color: colorchg(styleInfo.color),
              }),
              text: new Text({
                offsetY: 20,
                text: dataInfo[this.anno],
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
          else if(geometryInfo.x){
            geometry = new Point(Transform([geometryInfo.x, geometryInfo.y],'EPSG:' + wkid,'EPSG:3857'))
            style = new Style({
               image: new Circle({
                radius: 5,
                fill: new Fill({
                  color: 'blue'
                }),
                text: new Text({
                  offsetY: 20,
                  text: dataInfo[this.anno],
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
            })
          }
          else if(geometryInfo.paths) {
            let coordinates = []
            xh1(geometryInfo.paths, coordinates, wkid)
            geometry = new MultiLineString(coordinates)
            style = new Style({
              stroke: new Stroke({
                color: colorchg(styleInfo.color),
                width: styleInfo.width
              })
            })
          }
          let feature = this.getFeatureById(k.uniqueIdStr)? this.getFeatureById(k.uniqueIdStr) : new Feature()
          feature.setId(k.uniqueIdStr)
          feature.setGeometry(geometry)
          feature.setStyle(style)
          feature.setProperties(dataInfo)
          feature.set('_style_', style)
          feature.set('_styleInfo_', styleInfo)
          feature.set('_edit_', false)
          if(options.isJoint) {
            feature.set('_id_', k.id)
            feature.set('annotationCount', k.annotationCount)
          }
          member.forEach(p =>{
            if(p.uid == k.uid){
              feature.set('_member_', p.name)
            }
          })

          features.push(feature)
        })
        return features
      }

      let promises = options.isJoint?[Project.getPrjFormByID(options.getID), Project.getProjectByIDs(options.getID), Project.getProjMember(options.jointId)]:[Project.getPrjFormByID(options.getID)]
      
      Promise.all(promises).then(e=>{
        let data = (e) => {
          if (e.length == 3) {
            member = e[2]
            return [...e[0], ...e[1]]
          } else {
            return e[0]
          }
        }
        this.addFeatures(getFeatures(data(e)))
      })
    }
    super({
      format:new FeatureFormat(),
      loader
    })
    this.timing = (sec, lyr) => {
      let time = sec?sec:60
      return setInterval(() => {
        console.log();
        if(lyr.getVisible()) loader()
      }, time*1000*60);
    }
    this._anno = anno
  }
  get anno() {
    return this._anno
  }
  set anno(value) {
    this._anno = value
    this.refresh()
  }
}


export default Prjfrom;