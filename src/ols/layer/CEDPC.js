import VectorLayer from 'ol/layer/Vector'
import CedpcSue from '../source/CEDPC'
import {Style, Fill, Stroke, Text} from "ol/style";
import KML from '../format/KMLS'
import JSZip from "jszip";

class CedpcLyr extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let age = 
      options.age !== undefined ? options.age : 'preq'
    let source = 
      new CedpcSue({age})
    let visible = 
      options.visible !== undefined ? options.visible : true
    let styleFunction = (age) =>{
      let style 
      switch (age) {
        case 'preq':
          style =  new Style({
            stroke: new Stroke({
              color: 'black',
              width: 1,
              lineDash: [15, 5]
            })
          })
          break;
        case 'emp':
          style =  new Style({
            stroke: new Stroke({
              color: 'green',
              width: 2,
              lineDash: [1, 5, 5]
            })
          })
            break;
          case 'lp':
            style =  new Style({
              stroke: new Stroke({
                color: 'rgb(197, 0, 255)',
                width: 2,
                lineDash: [1, 3]
              })
            })
              break;
            case 'h':
              style =  new Style({
                stroke: new Stroke({
                  color: 'red',
                  width: 3,
                })
              })
                break;
        default:
          style =  new Style({
            stroke: new Stroke({
              color: 'black',
              width: 1,
            })
          })
          break;
      }
      return style
    }
    let popupTemplate =
      options.popupTemplate !== undefined ? options.popupTemplate : {
        title: function(f) {
          return f.get('断层名称')
        },
      }

    super({
      source,
      visible,
      style: styleFunction(age),
    })
    this._age = age
    this._styleFunction = styleFunction
    this._popupTemplate = popupTemplate
  }
  get age() {
    return this._age
  }
  set age(v) {
    this._age = v
    this.setStyle(this._styleFunction(v))
    this.getSource().age = v
  }
  get popupTemplate() {
    return this._popupTemplate
  }
}

CedpcLyr.prototype.export = function(name) {
  return new Promise((resolve, reject)=>{
    let zip = new JSZip()
    let promises = []
    let savePic = function(src) {
      return new Promise((resolve, reject) => {
        let img = document.createElement('img');
        img.src = src
        img.crossOrigin= 'anonymous'
        img.onload =function() {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);
          var dataURL = canvas.toDataURL("image/png");
          resolve([dataURL, src])
        }
      })
    }
    this.once('prerender', () => {
      let features = this.getSource().getFeatures()
      // features = features.map(item=>{
      //   let newf
      //   // if(item.getGeometry() instanceof Circle){
      //   //   let circlePolygon = fromCircle(item.getGeometry().clone())
      //   //   newf == new Feature({
      //   //     geometry: circlePolygon,
      //   //   })
      //   // }
        
      //   newf = item.clone()
      //   let des = '<html xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:msxsl="urn:schemas-microsoft-com:xslt"><head><META http-equiv="Content-Type" content="text/html"><meta http-equiv="content-type" content="text/html; charset=UTF-8"></head><body style="margin:0px 0px 0px 0px;overflow:auto;background:#FFFFFF;"><table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-collapse:collapse;padding:3px 3px 3px 3px"><tr style="text-align:center;font-weight:bold;background:#9CBCE2"><td>${name}</td></tr><tr><td><table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-spacing:0px; padding:3px 3px 3px 3px">${content}</table></td></tr></table></body></html>'
      //   let name = item.get('Name')
      //   let content = ''
      //   let num = 0
      //   this.templateInfo.form.forEach((filed, index) => {
      //     // if (filed.type !== "image") {
      //       num = num + 1
      //       let tr = '<tr style><td>key</td><td>val</td></tr>'
      //       tr = tr.replace('key', filed.label).replace('val', item.get(filed.submitKey)).replace('style', num%2 == 0? 'bgcolor="#D4E4F3"': '')
      //       content = content + tr
      //     // }
      //   })
      //   if (newf.getGeometry() instanceof Point) {
      //     let src = newf.getStyle().getImage().getSrc()
      //     promises.push(savePic(src))
      //   }
        
      //   des = des.replace('${name}', name).replace('${content}', content)
      //   let op = newf.getProperties()
      //   for (let key in op) {
      //     if (key !== 'geometry') newf.unset(key)
      //   }
      //   newf.set('Name', item.get('Name'))
      //   newf.set('description', des)
      //   console.log(newf);
      //   return newf
      // })
      Promise.all(promises).then(e=>{
        e.forEach(d=>{
          zip.file(d[1], d[0].replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), {base64: true})
        })


        let fmtkml = new KML({
          writeStyles: true,
          crossOrigin:"*"
        })
        let kmltxt = fmtkml.writeFeatures(
          features,
          {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857',
            writeStyles: true,
          }
        )
        zip.file("doc.kml", kmltxt)
        zip.generateAsync({type:"blob"})
        .then(function(content) {
          resolve({
            state: 'succ'
          })
          saveAs(content, (name? name:"未命名") + ".kmz");
        })
      })
    })
  })
}

export default CedpcLyr