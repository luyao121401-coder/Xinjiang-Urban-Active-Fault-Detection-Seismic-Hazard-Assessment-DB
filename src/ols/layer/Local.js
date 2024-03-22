import VectorLayer from 'ol/layer/Vector'
import LocalSuc from '../source/Local'
import Feature from 'ol/Feature'
import {Point, Circle} from 'ol/geom'
import KML from '../format/KMLS'
import {saveAs} from 'file-saver'
import JSZip from "jszip";

class Local extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}

    let source = new LocalSuc({
      type: options.type,
      file: options.file,
      proj: options.proj,
    })

    super({
      source,
    })
  }
}

Local.prototype.export = function(name) {
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
    let features = this.getSource().getFeatures()
    features = features.map(item=>{
      let newf
      if(item.getGeometry() instanceof Circle){
        let circlePolygon = fromCircle(item.getGeometry().clone())
        newf == new Feature({
          geometry: circlePolygon,
        })
      }
      
      newf = item.clone()
      // let des = '<html xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:msxsl="urn:schemas-microsoft-com:xslt"><head><META http-equiv="Content-Type" content="text/html"><meta http-equiv="content-type" content="text/html; charset=UTF-8"></head><body style="margin:0px 0px 0px 0px;overflow:auto;background:#FFFFFF;"><table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-collapse:collapse;padding:3px 3px 3px 3px"><tr style="text-align:center;font-weight:bold;background:#9CBCE2"><td>${name}</td></tr><tr><td><table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-spacing:0px; padding:3px 3px 3px 3px">${content}</table></td></tr></table></body></html>'
      // let name = item.get('name')
      // let content
      // let nametr = '<tr><td>名称</td><td>val</td></tr>'.replace('val', item.get('name'))
      // let desctr = '<tr bgcolor="#D4E4F3"><td>描述</td><td>val</td></tr>'.replace('val', item.get('desc'))
      // content = nametr + desctr
      // if (newf.getGeometry() instanceof Point) {
      //   let src = newf.getStyle().getImage().getSrc()
      //   promises.push(savePic(src))
      // }
      
      // des = des.replace('${name}', name).replace('${content}', content)
      // let op = newf.getProperties()
      // for (let key in op) {
      //   if (key !== 'geometry') newf.unset(key)
      // }
      // newf.set('description', des)
      return newf
    })
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
          featureProjection: 'EPSG:3857'
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
}

export default Local