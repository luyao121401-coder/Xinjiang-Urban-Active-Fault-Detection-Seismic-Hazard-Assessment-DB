import VectorLayer from 'ol/layer/Vector'
import Prjform from '../source/Prjform'
import Feature from 'ol/Feature'
import {Point, Circle} from 'ol/geom'
import {unByKey} from 'ol/Observable'
import KML from '../format/KMLS'
import JSZip from "jszip";


class Prjfrom extends VectorLayer{
  constructor(opt_options) {
    const options = opt_options || {}
    let popupTemplate = 
      options.popupTemplate !== undefined ? options.popupTemplate : {
        title: function(f) {
          return options.name + '-' + f.get('Name') +  (f.get('_member_')?'-' + f.get('_member_'):'');
        },
        attributes:{},
        attributes_: []
      }
    let templateInfo = options.template
    if (options.isJoint) {
      popupTemplate.attributes['_member_'] = {title: '记录人'}
      popupTemplate.attributes_.push({
        key: '_member_',
        title: '记录人',
      })
    }
    templateInfo.form.forEach(function(item){
      if(item.type == 'image'){
        popupTemplate.attributes[item.submitKey] = {title: item.label, type: 'image'}
        popupTemplate.attributes_.push({
          key: item.submitKey,
          title: item.label,
          type: 'image'
        })
      } else {
        popupTemplate.attributes[item.submitKey] = {title: item.label}
        popupTemplate.attributes_.push({
          key: item.submitKey,
          title: item.label
        })
      }
    })
    let anno = options.anno || 'Name'
    

    let isJoint = options.isJoint?options.isJoint:false
    let jointId = options.jointId?options.jointId:''
    let timing
    let source = new Prjform({
      getID: options.getID,
      isJoint: isJoint,
      jointId: jointId,
      templateInfo,
      anno: anno,
    })

    super({
      source,
    })
    if(isJoint) {
      this.on('propertychange', e => {
        if(e.key == 'map' && e.oldValue) {
          clearInterval(timing)
        }
        else if(e.key == 'map' && !e.oldValue) {
          timing = source.timing(10, this)
        }
      })
    }else {
      this.on('propertychange', e => {
        if(e.key == 'map' && e.oldValue) {
          clearInterval(timing)
        }
        else if(e.key == 'map' && !e.oldValue) {
          timing = source.timing(10, this)
        }
      })
    }

    this._popupTemplate = popupTemplate
    this._templateInfo = templateInfo
    this._anno = anno
  }
  get popupTemplate() {
    return this._popupTemplate
  }
  get templateInfo() {
    return this._templateInfo
  }
  get anno() {
    return this._anno
  }
  set anno(value) {
    console.log(this.templateInfo)
    let bool = this.templateInfo.form.find(item => {
      if(item.submitKey == value) {
        return true
      }
    })
    if(bool) {
      this._anno = value
      this.getSource().anno = value
    } else {
      throw new Error('anno not exist')
    }
  }

}

Prjfrom.prototype.export = function(name) {
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
      features = features.map(item=>{
        let newf
        if(item.getGeometry() instanceof Circle){
          let circlePolygon = fromCircle(item.getGeometry().clone())
          newf == new Feature({
            geometry: circlePolygon,
          })
        }
        
        newf = item.clone()
        let des = '<html xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:msxsl="urn:schemas-microsoft-com:xslt"><head><META http-equiv="Content-Type" content="text/html"><meta http-equiv="content-type" content="text/html; charset=UTF-8"></head><body style="margin:0px 0px 0px 0px;overflow:auto;background:#FFFFFF;"><table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-collapse:collapse;padding:3px 3px 3px 3px"><tr style="text-align:center;font-weight:bold;background:#9CBCE2"><td>${name}</td></tr><tr><td><table style="font-family:Arial,Verdana,Times;font-size:12px;text-align:left;width:100%;border-spacing:0px; padding:3px 3px 3px 3px">${content}</table></td></tr></table></body></html>'
        let name = item.get('Name')
        let content = ''
        let num = 0
        this.templateInfo.form.forEach((filed, index) => {
          // if (filed.type !== "image") {
            num = num + 1
            let tr = '<tr style><td>key</td><td>val</td></tr>'
            tr = tr.replace('key', filed.label).replace('val', item.get(filed.submitKey)).replace('style', num%2 == 0? 'bgcolor="#D4E4F3"': '')
            content = content + tr
          // }
        })
        if (newf.getGeometry() instanceof Point) {
          let src = newf.getStyle().getImage().getSrc()
          promises.push(savePic(src))
        }
        
        des = des.replace('${name}', name).replace('${content}', content)
        let op = newf.getProperties()
        for (let key in op) {
          if (key !== 'geometry') newf.unset(key)
        }
        newf.set('Name', item.get('Name'))
        newf.set('description', des)
        console.log(newf);
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
  })
}

export default Prjfrom