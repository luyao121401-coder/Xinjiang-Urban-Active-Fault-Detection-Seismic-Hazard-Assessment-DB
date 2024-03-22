import KML from './KMLS'
import {get as getIconImage} from 'ol/style/IconImage';
import JSZip from "jszip";
import { lyrDB, existData, addData2DB, findData } from '../database/db'
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { Style} from 'ol/style'
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

let pics = []

KMZ.prototype.readFeatures = async function(file, opt_options) {
  this.dbkey = Date.now()
  let this_ = this;
  let fs = []
  var extZIP = new Promise(function(resolve, reject) {
    let zip = new JSZip()
      .loadAsync(file)
      .then(function(zip) {
        this_.zip = zip;
        var promises = [];
        var kml = zip.file("doc.kml");
        if (kml) {
          promises.push(kml.async("string"));
        }
        // console.log(zip);
        let files = zip.file().files
        for (let key in files) {
          // console.log(files[key]);
          if (files[key].name !== 'undefined' && !files[key].name.endsWith('.kml')) {
            // console.log(files[key]);
            let file = new Promise(function(resolve, reject) {
              files[key].async("base64").then((data) => {
                existData('files', 'data', data).then((exist) => {
                  if (!exist.bool) {
                    addData2DB('files', {path: files[key].name, data, key:this_.dbkey}).then(() => {
                      console.log("add data to db success");
                      resolve(data)
                    })
                  }
                })
              })
            })
            pics.push(files[key].name, this_.dbkey)
          }
          // console.log(pics);
        }
        return Promise.all(promises);
      })
      .then((contents) => {
        var kml = contents[0];
        if (kml) {
          resolve(kml);
        }
      })
      .then(e=>{
        console.log(1111, e);
      })
      .catch(function(err) {
        reject(err);
      });
  });
  await extZIP.then(
    (kml) => {
      kml = kml.substring(kml.indexOf('<'))
      var doc = parse(kml);
      this.readFeaturesFromDocument(doc, opt_options).forEach(f =>{
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
            // iconpath.lastIndexOf('.')
            findData('files', 'path', iconpath).then((data) => {
              if (data) {
                clonestyle.iconImage_ = getIconImage(
                  null,
                  `data:image/${iconpath.substring(iconpath.lastIndexOf('.'))};base64,` + data.data,
                  f.getStyle()(f).getImage().getSize(),
                  clonestyle.crossOrigin_,
                  0,
                  clonestyle.color_
                );
              }
            })
            
            console.log(f)
            fs.push(f)
          }
        }
        else {
          fs.push(f)
        }
      })
    },
    (err) => {
      console.log(err);
    }
  );
  return fs
}
// KMZ.prototype.readPlacemark_ = function (node, objectStack) {
//   console.log(node);
//   [...node.getElementsByTagName('href')].forEach(function(href) {
//     let href_ = href.textContent
//     console.log(href_);
//   })
//   return KML.prototype.readPlacemark_.call(this, node, objectStack);
// }
// KMZ.prototype.readSharedStyle_ = function (node, objectStack) {
//   console.log(node);
//   [...node.getElementsByTagName('href')].forEach(function(href) {
//     let href_ = href.textContent
//     console.log(href_);
//     if(href_.startsWith('files/')) {
//       href.textContent = 'database:' + href_
//     }
//   })
//   KML.prototype.readSharedStyle_.call(this, node, objectStack);
// }


// export function parse(xml) {
//   console.log(xml);
//   return new DOMParser().parseFromString(xml, 'application/xml');
// }
export default KMZ;
