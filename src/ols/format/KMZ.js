import KML from './KMLS'
import {get as getIconImage} from 'ol/style/IconImage';
import JSZip from "jszip";
import { lyrDB, existData, addData2DB, findData } from '../database/db'
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { Style, Icon} from 'ol/style'
import { getXMLSerializer, isDocument, parse } from 'ol/xml';


function getKMLImage(href) {
  let url = href;
  if(url.startsWith(window.location.href)) {
    console.log(url);
    url = 'https://openlayers.org/en/latest/examples/resources/logo-70x70.png'
  }
  return url;
}

class KMZ extends KML {
  constructor(opt_options) {
    const options = opt_options || {};
    // options.iconUrlFunction = getKMLImage;
    super(options);
    this.zip = null
  }
}


KMZ.prototype.readFeatures = async function(file, opt_options) {
  this.dbkey = Date.now()
  let this_ = this
  return new Promise(function(resolve, reject) {
    new JSZip()
      .loadAsync(file)
      .then(function(zip) {
        this_.zip = zip;
        var promises = [];
        var kml = zip.file("doc.kml");
        if (kml) {
          promises.push(kml.async("string"));
        }
        let files = zip.file().files
        for (let key in files) {
          if (files[key].name !== 'undefined' && !files[key].name.endsWith('.kml')) {
            promises.push(new Promise(function(resolve, reject) {
              files[key].async("base64").then((data) => {
                existData('files', 'data', data).then((exist) => {
                  if (!exist.bool) {
                    addData2DB('files', {path: files[key].name, data, key:this_.dbkey}).then(() => {
                      console.log("add data to db success");
                      resolve(data)
                    })
                  }
                  resolve(data)
                })
              })
            }))
          }
        }
        return Promise.all(promises);
      })
      .then((contents) => {
        let promises = []
        var kml = contents[0];
        if (kml) {
          kml = kml.substring(kml.indexOf('<'))
          var doc = parse(kml);
          this_.readFeaturesFromDocument(doc, opt_options).forEach(f =>{
            promises.push(new Promise(function(resolve, reject) {
              let dom = new DOMParser().parseFromString(f.get('description'), 'text/html')
              let imgs = [...dom.getElementsByTagName('img')]
              let orgpaths = []
              imgs.forEach(img => {
                orgpaths.push(img.src.replace(img.baseURI, ''))
              })
              orgpaths.forEach(orgpath => {
                f.set('description', f.get('description').replace(orgpath, 'database:' + orgpath))
              })
              let orgstyle = f.getStyle()(f)
              if(orgstyle instanceof Array) {
                orgstyle = orgstyle[0]
              }
              let clonestyle = orgstyle.getImage()
              if(clonestyle) {
                let iconsrc = clonestyle.getSrc()
                if (iconsrc) {
                  let iconpath = iconsrc.replace(window.location.href, '')
                  findData('files', 'path', iconpath).then((data) => {
                    if (data) {
                      f.setStyle(
                        new Style({
                          image: new Icon({
                            src: `data:image/${iconpath.substring(iconpath.lastIndexOf('.') + 1)};base64,` + data.data,
                            anchorOrigin: clonestyle.anchorOrigin_,
                            anchorXUnits: clonestyle.anchorXUnits_,
                            anchorYUnits: clonestyle.anchorYUnits_,
                            anchor: clonestyle.anchor_,
                            color: clonestyle.color_?clonestyle.color_:'rgba(255,255,255,1)',
                            crossOrigin: clonestyle.crossOrigin_,
                            offsetOrigin: clonestyle.offsetOrigin_,
                            offset: clonestyle.offset_,
                            size: clonestyle.size_,
                            scale: clonestyle.scale_,
                          }),
                          text: f.getStyle()(f).getText()
                        })
                      )
                      // resolve(f)
                    }
                    resolve(f)
                  })
                  resolve(f)
                } else {
                  resolve(f)
                }
              }
              else {
                resolve(f)
              }
            }))
          })
        }
        return Promise.all(promises)
      })
      .then(function(features) {
        resolve(features)
      })
  })

}

KMZ.prototype.readPlacemark_ = function (node, objectStack) {
  return KML.prototype.readPlacemark_.call(this, node, objectStack)
}
export default KMZ;
