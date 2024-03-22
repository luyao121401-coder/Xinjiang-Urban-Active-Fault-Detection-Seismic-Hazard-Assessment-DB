import ol_Overlay from 'ol/Overlay'
import ol_Feature from 'ol/Feature'
import ol_ext_element from 'ol-ext/util/element'
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';
import axios from 'axios';
// import Profile from 'ol-ext/control/Profile'
import KML from 'ol/format/KML';

import Track from '../layer/Track';
// import { lyrDB } from '../database/db';
// import * as echarts from 'echarts';
// import {getLength} from 'ol/sphere';
// import { LineString } from 'ol/geom';
// import { GPX } from 'ol/format';



class ol_Overlay_Popup extends ol_Overlay {
  constructor(options) {
    options = options || {};
    
    // Popup div
    var element = document.createElement("div");
    //element.classList.add('ol-overlaycontainer-stopevent');
    options.element = element;
    super(options);
    this.set('canFix', options.canFix)
    this.set('closeBox', options.closeBox)
    this.set('showImage', options.showImage)
    this.set('maxChar', options.maxChar||50)
    this.set('keepSelection', options.keepSelection)
    this.set('popupClass', options.popupClass)
    this.set('minibar', options.minibar)
    this.set('buttons', options.buttons)
    if (options.select && (typeof options.select.on ==='function')) {
      this._select = options.select;
      options.select.on('select', (e) =>{
        if (!this._noselect) {
          if (e.selected[0]) {
            this.show(e.selected[0].getGeometry().getClosestPoint(e.mapBrowserEvent.coordinate), options.select.getFeatures().getArray(), e.selected[0]);
          } else {
            this.hide();
          }
        }
      });
    }
  
    if (typeof(options.offsetBox)==='number') this.offsetBox = [options.offsetBox,options.offsetBox,options.offsetBox,options.offsetBox];
    else this.offsetBox = options.offsetBox;

    // Closebox
    this.closeBox = options.closeBox;
    this.onclose = options.onclose?options.onclose: function(){
      this._select.getFeatures().clear()
    }.bind(this);
    this.onshow = options.onshow;
    // Anchor div
    if (options.anchor!==false) {
      ol_ext_element.create('DIV', {
        className: 'anchor',
        parent: element
      })
    }
    this.profile = null

    // Content
    this.content = ol_ext_element.create('DIV', { 
      html: options.html || '',
      className: "ol-popup-content",
      parent: element
    });

    // Stop event
    if (options.stopEvent) {
      element.addEventListener("mousedown", function(e){ e.stopPropagation(); });
      element.addEventListener("touchstart", function(e){ e.stopPropagation(); });
    }

    // ol_Overlay.call(this, options);
    this._elt = element;

    // call setPositioning first in constructor so getClassPositioning is called only once
    this.setPositioning(options.positioning || 'auto');
    this.setPopupClass(options.popupClass || options.className || 'default');
    if (options.anim) this.addPopupClass('anim');

    // Show popup on timeout (for animation purposes)
    // if (options.position) {
    //   setTimeout(function(){ this.show(options.position); }.bind(this));
    // }
  }
};
// ol_ext_inherits(ol_Overlay_Popup, ol_Overlay);

/**
 * Get CSS class of the popup according to its positioning.
 * @private
 */
// ol_Overlay_Popup.prototype.getClassPositioning = function () {
//   var c = "";
//   var pos = this.getPositioning();
//   if (/bottom/.test(pos)) c += "ol-popup-bottom ";
//   if (/top/.test(pos)) c += "ol-popup-top ";
//   if (/left/.test(pos)) c += "ol-popup-left ";
//   if (/right/.test(pos)) c += "ol-popup-right ";
//   if (/^center/.test(pos)) c += "ol-popup-middle ";
//   if (/center$/.test(pos)) c += "ol-popup-center ";
//   return c;
// };

// /**
//  * Set a close box to the popup.
//  * @param {bool} b
//  * @api stable
//  */
// // ol_Overlay_Popup.prototype.setClosebox = function (b) {
// //   this.closeBox = b;
// //   if (b) this.element.classList.add("hasclosebox");
// //   else this.element.classList.remove("hasclosebox");
// // };

// /**
//  * Set the CSS class of the popup.
//  * @param {string} c class name.
//  * @api stable
//  */
// ol_Overlay_Popup.prototype.setPopupClass = function (c) {
//   var classes = ["ol-popup"];
//   if (this.getVisible()) classes.push('visible');
//   this.element.className = "";
//   var classesPositioning = this.getClassPositioning().split(' ')
//     .filter(function(className) {
//       return className.length > 0;
//     });
//   if (c) {
//     c.split(' ').filter(function(className) {
//       return className.length > 0;
//     })
//     .forEach(function(className) {
//       classes.push(className);
//     });
//   } else {
//     classes.push("default");
//   }
//   classesPositioning.forEach(function(className) {
//     classes.push(className);
//   });
//   // if (this.closeBox) {
//   //   classes.push("hasclosebox");
//   // }
//   this.element.classList.add.apply(this.element.classList, classes);
// };

// /**
//  * Add a CSS class to the popup.
//  * @param {string} c class name.
//  * @api stable
//  */
// ol_Overlay_Popup.prototype.addPopupClass = function (c) {
//   this.element.classList.add(c);
// };

// /**
//  * Remove a CSS class to the popup.
//  * @param {string} c class name.
//  * @api stable
//  */
// ol_Overlay_Popup.prototype.removePopupClass = function (c) {
//   this.element.classList.remove(c);
// };

// /**
//  * Set positionning of the popup
//  * @param {ol.OverlayPositioning | string | undefined} pos an ol.OverlayPositioning 
//  * 		or 'auto' to var the popup choose the best position
//  * @api stable
//  */
// ol_Overlay_Popup.prototype.setPositioning = function (pos) {
//   if (pos === undefined)
//     return;
//   if (/auto/.test(pos)) {
//     this.autoPositioning = pos.split('-');
//     if (this.autoPositioning.length==1) this.autoPositioning[1]="auto";
//   } else {
//     this.autoPositioning = false;
//   }
//   pos = pos.replace(/auto/g,"center");
//   if (pos=="center") pos = "bottom-center";
//   this.setPositioning_(pos);
// };

// /** @private
//  * @param {ol.OverlayPositioning | string | undefined} pos
//  */
// ol_Overlay_Popup.prototype.setPositioning_ = function (pos) {
//   if (this.element) {
//     ol_Overlay.prototype.setPositioning.call(this, pos);
//     this.element.classList.remove("ol-popup-top", "ol-popup-bottom", "ol-popup-left", "ol-popup-right", "ol-popup-center", "ol-popup-middle");
//     var classes = this.getClassPositioning().split(' ')
//       .filter(function(className) {
//         return className.length > 0;
//       });
//     this.element.classList.add.apply(this.element.classList, classes);
//   }
// };

// /** Check if popup is visible
// * @return {boolean}
// */
// ol_Overlay_Popup.prototype.getVisible = function () {
//   return this.element.classList.contains("visible");
// };


// /**
//  * Set the position and the content of the popup.
//  * @param {ol.Coordinate|string} coordinate the coordinate of the popup or the HTML content.
//  * @param {string|undefined} html the HTML content (undefined = previous content).
//  * @example
// var popup = new ol_Overlay_Popup();
// // Show popup
// popup.show([166000, 5992000], "Hello world!");
// // Move popup at coord with the same info
// popup.show([167000, 5990000]);
// // set new info
// popup.show("New informations");
// * @api stable
// */
// ol_Overlay_Popup.prototype._show = function (coordinate, html) {
//   if (!html && typeof(coordinate)=='string') {
//     html = coordinate; 
//     coordinate = null;
//   }
//   if (coordinate===true) {
//     coordinate = this.getPosition();
//   }
  
//   var self = this;
//   var map = this.getMap();
//   if (!map) return;
  
//   if (html && html !== this.prevHTML) {
//     // Prevent flickering effect
//     this.prevHTML = html;
//     this.content.innerHTML = '';
//     if (html instanceof Element) {
//       this.content.appendChild(html);
//     } else {
//       ol_ext_element.create('DIV', {
//         html: html,
//         parent: this.content
//       })
//     }
//     // Refresh when loaded (img)
//     Array.prototype.slice.call(this.content.querySelectorAll('img'))
//       .forEach(function(image) {
//         image.addEventListener('load', function() {
//           try { map.renderSync(); } catch(e) { /* ok */ }
//           self.content.dispatchEvent(new Event('scroll'));
//         });
//       });
//   }

//   if (coordinate) {
//     // Auto positionning
//     if (this.autoPositioning) {
//       var p = map.getPixelFromCoordinate(coordinate);
//       var s = map.getSize();
//       var pos=[];
//       if (this.autoPositioning[0]=='auto') {
//         pos[0] = (p[1]<s[1]/3) ? "top" : "bottom";
//       }
//       else pos[0] = this.autoPositioning[0];
//       pos[1] = (p[0]<2*s[0]/3) ? "left" : "right";
//       this.setPositioning_(pos[0]+"-"+pos[1]);
//       if (this.offsetBox) {
//         this.setOffset([this.offsetBox[pos[1]=="left"?2:0], this.offsetBox[pos[0]=="top"?3:1] ]);
//       }
//     } else {
//       if (this.offsetBox){
//         this.setOffset(this.offsetBox);
//       }
//     }
//     // Show
//     this.setPosition(coordinate);
//     // Set visible class (wait to compute the size/position first)
//     this.element.parentElement.style.display = '';
//     if (typeof (this.onshow) == 'function') this.onshow();
//     this.dispatchEvent({ type: 'show' })
//     this._tout = setTimeout (function() {
//       self.element.classList.add('visible'); 
//     }, 0);
//   }
// };

// /** Show the popup on the map
//  * @param {ol.coordinate|undefined} coordinate Position of the popup
//  * @param {ol.Feature|Array<ol.Feature>} features The features on the popup
//  * @param {ol.Feature} current The current feature if keepSelection = true, otherwise get the first feature
//  */
// ol_Overlay_Popup.prototype.show = function(coordinate, features, current) {
//   if (coordinate instanceof ol_Feature 
//     || (coordinate instanceof Array && coordinate[0] instanceof ol_Feature)) {
//     features = coordinate;
//     coordinate = null;
//   }
//   if (!(features instanceof Array)) features = [features];
//   this._features = features.slice();
//   if (!this._count) this._count = 1;

//   // Calculate html upon feaures attributes
//   this._count = 1;
//   var f = this.get('keepSelection') ? current || features[0] : features[0];
//   var html = this._getHtml(f);
//   if (html) {
//     // if (!this.element.classList.contains('ol-fixed')) this.hide();
//     if (!coordinate || features[0].getGeometry().getType()==='Point') {
//       coordinate = features[0].getGeometry().getFirstCoordinate();
//     }
//     ol_Overlay_Popup.prototype._show.call(this, coordinate, html);
//   } else {
//     this.hide();
//   }
// };

// /**
//  * Hide the popup
//  * @api stable
//  */
// ol_Overlay_Popup.prototype.hide = function () {
//   if (this.profile) this.getMap().removeControl(this.profile);
//   if (this.getPosition() == undefined) return;
//   if (typeof (this.onclose) == 'function') this.onclose();
//   this.setPosition(undefined);
//   if (this._tout) clearTimeout(this._tout);
//   this.element.classList.remove("visible");
//   this.dispatchEvent({ type: 'hide' });
// };
// ol_Overlay_Popup.prototype.hidepopup = function () {
//   // if (this.getPosition() == undefined) return;
//   // if (typeof (this.onclose) == 'function') this.onclose();
//   this.setPosition(undefined);
// };

// /** Set the template
//  * @param {Template} template A template with a list of properties to use in the popup
//  */
//  ol_Overlay_Popup.prototype.setTemplate = function(template) {
//   this._template = template;
//   this._attributeObject(this._template);
// }

// /**
//  * @private
//  */
// ol_Overlay_Popup.prototype._attributeObject = function (temp) {
//   if(temp.attributes_) {
//     return temp.attributes_;
//   }
//   if (temp && temp.attributes instanceof Array) {
//     var att = {};
//     temp.attributes.forEach(function (a) {
//       att[a] = true;
//     });
//     temp.attributes = att;
//   }
//   return temp.attributes;
// };

// function replaceSrc(arr) {
//   return new Promise(function(resolve, reject) {
//     let promises = []
//     arr.forEach(function(img) {
//       if(img.src.indexOf('database:') === 0) { 
//         let name = img.src.replace('database:', '')
//         let promise = new Promise(function(resolve, reject) {
//           lyrDB.files.where("path").equals(name).toArray()
//             .then(function(data) {
//               resolve([img, data]);
//             })
//         })
//         promises.push(promise)
//       }
//     })
//     Promise.all(promises).then(function(results) {
//       console.log(results);
//       results.forEach(function(r) {
//         let img = r[0];
//         let data = r[1];
//         img.src = 'data:image/png;base64,' + data[0].data;
//       })
//       resolve()
//     })
//   })
// }

// /**
//  * @private
//  */
// ol_Overlay_Popup.prototype._getHtml = function(feature) {
//   if (!feature) return '';
//   var html = ol_ext_element.create('DIV', { className: 'popup-feature' });

//   // HeaderDIV setting
//   var headerDIV = ol_ext_element.create('DIV', { className: 'popup-header', parent: html });
//   // Display title
//   let headerTitleDIV
//   let titlehtml
//   headerTitleDIV = ol_ext_element.create('DIV', { 
//     // html:`<h3>${titlehtml}</h3>`,
//     parent: headerDIV, 
//     className: 'popup-header-title',
//   });
//   headerTitleDIV.addEventListener('click', function() {
//     bodyDIV.style.display = bodyDIV.style.display ? '' : 'none';
//   });

//   // Display Button
//   let headerBtnDIV = ol_ext_element.create('DIV', {
//     parent: headerDIV, 
//     className: 'popup-header-btn',
//   });
  
//   if (this.get('canFix')) {
//     let fix = ol_ext_element.create('DIV', { 
//       title: '固定窗口',
//       className:'popup-header-fix', 
//       parent: headerBtnDIV,
//       // click: function(){
//       //   this.element.classList.toggle('ol-fixed');
//       // }.bind(this)
//     });
//     let img = ol_ext_element.create('IMG', {
//       className:'ol-btn-icon',
//       parent: fix,
//       src: '/icon/dock1_b.png'
//     })
//     fix.addEventListener('click', function() {
//       this.element.classList.toggle('ol-fixed');
//       if(this.element.classList.contains('ol-fixed')) {
//         fix.title = '取消固定窗口';
//         img.src = '/icon/dock0_b.png'
//       } else {
//         fix.title = '固定窗口';
//         img.src = '/icon/dock1_b.png'
//       }
//       // img.src = img.src.replace('1', '0');
//     }.bind(this))
    

//   }
//   if (this.get('closeBox')) {
//     let cls = ol_ext_element.create('DIV', {
//       title: '关闭',
//       className: 'popup-header-cls',
//       // type: 'button',
//       click: function() {
//         this.hide();
//       }.bind(this),
//       parent: headerBtnDIV
//     });
    
//     ol_ext_element.create('IMG', {
//       className:'ol-btn-icon',
//       parent: cls,
//       src: '/icon/close.png'
//     })
//   }
//   var bodyDIV = ol_ext_element.create('DIV', { parent: html, className: 'popup-body' });
//   if(this._select.getLayer(feature).getSource().getFormat() instanceof KML) {
//     titlehtml = feature.get('name')
//     headerTitleDIV.innerHTML = `<h3>${titlehtml}</h3>`
//     if (this.get('minibar')) {
//       ol_ext_element.scrollDiv(bodyDIV, {
//         vertical: true,
//         horizontal: true,
//         mousewheel: true,
//         minibar: true
//       });
//     }
//     var content = ol_ext_element.create('DIV', { parent: bodyDIV, className: 'popup-body-kml' });
//     let dom = new DOMParser().parseFromString(feature.get('description'), 'text/html');
//     let KMLimg = dom.getElementsByTagName('img')
//     async function replace () {
//       let arr = [...KMLimg]
//       await replaceSrc(arr)
//       dom.body.childNodes.forEach(e => {
//         if (e.nodeName=='#text') {
//           content.innerHTML += e.textContent;
//         } 
//         else { 
//           content.innerHTML += e.outerHTML;
//         }
//       });
//       let viewer = new Viewer(content, {})
//       let imgs = [...content.getElementsByTagName('img')]
//       imgs.forEach(function(img) {
//         img.addEventListener('click', function() {
//           viewer.show(img);
//         })
//       })
//     }
//     replace()
//   }
//   else if (this._select.getLayer(feature) instanceof Track) {
//     var template = this._select.getLayer(feature).popupTemplate;
//     titlehtml = template.title
//     headerTitleDIV.innerHTML = `<h3>${titlehtml}</h3>`
//     if (this.get('minibar')) {
//       ol_ext_element.scrollDiv(bodyDIV, {
//         vertical: true,
//         horizontal: true,
//         mousewheel: true,
//         minibar: true
//       });
//     }
//     var tr, table = ol_ext_element.create('TABLE', { parent: bodyDIV });
//     for (let key in template.data) {
//       tr = ol_ext_element.create('TR', { parent: table, className: 'popup-tr' });
//       ol_ext_element.create('TD', { 
//         html: key, 
//         parent: tr, 
//         className: 'popup-td-key' 
//       });
//       ol_ext_element.create('TD', {
//         html: template.data[key],
//         parent: tr,
//         className: 'popup-td-value'
//       })
//     }
//   }
//   else {
//     var template
//     if (this._select.getLayer(feature).popupTemplate)
//       template = this._select.getLayer(feature).popupTemplate;
//     else {
//       template = this._template
//     }
//     // calculate template
//     if (typeof(template) === 'function') {
//       template = template(feature, this._count, this._features.length);
//     } else if (!template || !template.attributes) {
//       template = template || {};
//       template.attributes = {};
//       template.attributes_ = [];
//       for (var i in feature.getProperties()) if (i!='geometry') {
//         template.attributes[i] = i;
//         template.attributes_.push({
//           key: i,
//         })
//       }
//     }

//     if (template.title) {
//       if (typeof template.title === 'function') {
//         titlehtml = template.title(feature);
//       } else {
//         titlehtml = feature.get(template.title);
//       }
//     } else {
//       titlehtml = feature.get('title') || feature.get('name') || feature.get('id') || feature.get('label') || feature.get('text') || ''
//     }
//     headerTitleDIV.innerHTML = `<h3>${titlehtml}</h3>`
  
//     // BodyDIV setting
//     if (this.get('minibar')) {
//       ol_ext_element.scrollDiv(bodyDIV, {
//         vertical: true,
//         mousewheel: true,
//         minibar: true
//       });
//     }
//     // Display properties in a table
  
//     if (template.attributes) {
//       var tr, table = ol_ext_element.create('TABLE', { parent: bodyDIV });
//       var atts = this._attributeObject(template);
//       var featureAtts = {}
//       let addFeatureAtts = (featureAtts) => {
//         if (atts instanceof Array) {
//           atts.forEach( att => {
//             if( att.key !== 'styleUrl') {
//               var a = att
//               var content, val = featureAtts[att.key];
//               // Get calculated value
//               if (typeof(a.format)==='function') {
//                 val = a.format(val, feature);
//               }

//               // Is entry visible?
//               var visible = true;
//               if (typeof(a.visible)==='boolean') {
//                 visible = a.visible;
//               } else if (typeof(a.visible)==='function') {
//                 visible = a.visible(val, feature);
//               }
//               if (visible) {
//                 tr = ol_ext_element.create('TR', { parent: table, className: 'popup-tr' });
//                 ol_ext_element.create('TD', { html:  (typeof(a.title)==='function')?a.title(val, feature):a.title  || att.key, parent: tr, className: 'popup-td-key' });
//                 if(val) {
//                   // Show image or content
//                   if (this.get('showImage') && a.type == 'image') {
//                     content = ol_ext_element.create('DIV', { parent: tr, className: 'popup-td-value' });
//                     let imgdivs = ol_ext_element.create('DIV', { parent: content, className: 'popup-td-value-imgdivs'});
  
//                     let relval = JSON.parse(val)
//                     relval.forEach(e => {
//                       let imgdiv1 = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
//                       ol_ext_element.create('IMG', { src: e.url, parent: imgdiv1 });
//                     })
//                     let viewer = new Viewer(content, {})
//                     content.addEventListener('click', function(){
//                       viewer.show();
//                     });
//                     content.style.cursor = 'pointer';
//                     content.style.maxHeight = '50px';
//                     content.title = '点击浏览图片';
//                   }
//                   else if (this.get('showImage') && val && typeof val == 'string' && (val.match(/^http.*\.(png|jpg|jpeg|gif)$/)|| val.match(/^data:image/))) {
//                     content = ol_ext_element.create('DIV', { parent: tr, className: 'popup-td-value' });
//                     let imgdivs = ol_ext_element.create('DIV', { parent: content, className: 'popup-td-value-imgdivs'});
//                     let imgdiv = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
//                     ol_ext_element.create('IMG', { src: val, parent: imgdiv });
//                     let viewer = new Viewer(content, {})
//                     content.addEventListener('click', function(){
//                       viewer.show();
//                     });
//                     content.style.cursor = 'pointer';
//                     content.style.maxHeight = '50px';
//                     content.title = '点击浏览图片';
//                   }
//                   // 正则以<开头，以>结尾
//                   else if (this.get('showImage') && val && typeof val == 'string' && val.match(/^<.*>$/)) {
//                     content = (a.before||'') + val + (a.after||'')
//                   }
//                   // 正则为url
//                   else if (val && typeof val == 'string' && val.match(/^http.*$/)) { 
//                     content = ol_ext_element.create('A',{
//                       href: val,
//                       html: val.length>=maxc?val.substr(0,maxc)+'...':val,
//                       target: '_blank',
//                       title:  '点击打开链接'
//                     })
//                   }
//                   else {
//                     content = (a.before||'') + val + (a.after||'');
//                     var maxc = this.get('maxChar') || 200;
//                     if (typeof(content) === 'string' && content.length>maxc) content = content.substr(0,maxc)+'[...]';
//                   }
//                 } else content = ''
  
//                 // Add value
//                 ol_ext_element.create('TD', {
//                   html: content,
//                   parent: tr,
//                   title: val,
//                   className: 'popup-td-value'
//                 });
//               }
//             }
//           })
//         } else {
//           for (var att in atts) {
//             if (att!=='styleUrl') {
//               var a = atts[att];
//               var content, val = featureAtts[att];
//               // Get calculated value
//               if (typeof(a.format)==='function') {
//                 val = a.format(val, feature);
//               }

//               // Is entry visible?
//               var visible = true;
//               if (typeof(a.visible)==='boolean') {
//                 visible = a.visible;
//               } else if (typeof(a.visible)==='function') {
//                 visible = a.visible(val, feature);
//               }
              

//               if (visible) {
//                 tr = ol_ext_element.create('TR', { parent: table, className: 'popup-tr' });
//                 ol_ext_element.create('TD', { html:  (typeof(a.title)==='function')?a.title(val, feature):a.title  || att, parent: tr, className: 'popup-td-key' });
//                 if(val) {
//                   // Show image or content
//                   if (this.get('showImage') && a.type == 'image') {
//                     content = ol_ext_element.create('DIV', { parent: tr, className: 'popup-td-value' });
//                     let imgdivs = ol_ext_element.create('DIV', { parent: content, className: 'popup-td-value-imgdivs'});

//                     let relval = JSON.parse(val)
//                     relval.forEach(e => {
//                       let imgdiv1 = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
//                       ol_ext_element.create('IMG', { src: e.url, parent: imgdiv1 });
//                     })
//                     let viewer = new Viewer(content, {})
//                     content.addEventListener('click', function(){
//                       viewer.show();
//                     });
//                     content.style.cursor = 'pointer';
//                     content.style.maxHeight = '50px';
//                     content.title = '点击浏览图片';
//                   }
//                   else if (this.get('showImage') && val && typeof val == 'string' && (val.match(/^http.*\.(png|jpg|jpeg|gif)$/)|| val.match(/^data:image/))) {
//                     content = ol_ext_element.create('DIV', { parent: tr, className: 'popup-td-value' });
//                     let imgdivs = ol_ext_element.create('DIV', { parent: content, className: 'popup-td-value-imgdivs'});
//                     let imgdiv = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
//                     ol_ext_element.create('IMG', { src: val, parent: imgdiv });
//                     let viewer = new Viewer(content, {})
//                     content.addEventListener('click', function(){
//                       viewer.show();
//                     });
//                     content.style.cursor = 'pointer';
//                     content.style.maxHeight = '50px';
//                     content.title = '点击浏览图片';
//                   }
//                   // 正则以<开头，以>结尾
//                   else if (this.get('showImage') && val && typeof val == 'string' && val.match(/^<.*>$/)) {
//                     content = (a.before||'') + val + (a.after||'')
//                   }
//                   // 正则为url
//                   else if (val && typeof val == 'string' && val.match(/^http.*$/)) { 
//                     content = ol_ext_element.create('A',{
//                       href: val,
//                       html: val.length>=maxc?val.substr(0,maxc)+'...':val,
//                       target: '_blank',
//                       title:  '点击打开链接'
//                     })
//                   }
//                   else {
//                     content = (a.before||'') + val + (a.after||'');
//                     var maxc = this.get('maxChar') || 200;
//                     if (typeof(content) === 'string' && content.length>maxc) content = content.substr(0,maxc)+'[...]';
//                   }
//                 } else content = ''

//                 // Add value
//                 ol_ext_element.create('TD', {
//                   html: content,
//                   parent: tr,
//                   title: val,
//                   className: 'popup-td-value'
//                 });
//               }
//             }
//           }
//         }
//       }
//       if (template.secRes) {
//         let url = template.secRes.url.replace('{key}', feature.get('key'));
  
//         let getFatt = new Promise(function(resolve, reject) {
//           let featureAtts = {}
//           axios.get(url).then(res => {
//             for(let key in template.attributes) {
//               let val
//               let data = res.data
//               if (template.attributes[key].pos) {
//                 template.attributes[key].pos.forEach(pos => {
//                   if ( typeof(data) == 'object'  &&data.hasOwnProperty(pos.key)) {
//                     data = data[pos.key]
//                   }
//                   else {
//                     data = undefined
//                   }
//                 })
//                 val = data
//                 if (data !== undefined) {
//                   featureAtts[key] = val
//                 }
//               } else {
//                 val = feature.get(key)
//                 featureAtts[key] = val
//               }
//             }
//             resolve(featureAtts)
//           }).catch(err => {
//             reject(err)
//           })
//         })
//         getFatt.then((featureAtts) => {
//           addFeatureAtts(featureAtts)
//         })
        
//       } else {
//         featureAtts = feature.getProperties();
//         addFeatureAtts(featureAtts)
//       }
//     }
//   }
//   // if (this._select.getLayer(feature) instanceof Track || this._select.getLayer(feature).getSource().getFormat() instanceof GPX) {
    
//   //   let profilediv = ol_ext_element.create('DIV', { parent: bodyDIV, className: 'popup-body-profile' })
//   //   // window.document.body.appendChild(profilediv)
//   //   // console.log(window);
//   //   setTimeout(() => {    
//   //     var myChart = echarts.init(profilediv, {
//   //       renderer: 'canvas',
//   //       // width: '70%',
//   //       height: '50%'
//   //     })
//   //     var option1 = {
//   //       tooltip: {
//   //         trigger: 'axis',
//   //         axisPointer: {
//   //           type: 'cross',
//   //           label: {
//   //             backgroundColor: '#6a7985'
//   //           },
//   //           snap:true
//   //         }
//   //       },
//   //       xAxis: [
//   //         {
//   //         type: 'time',
//   //         minInterval: 3600 * 1,
//   //         splitNumber: 3,
//   //         name: '时间',
//   //         nameTextStyle: {
//   //           padding: 5
//   //         },
//   //         nameLocation: 'middle'
//   //       }],
//   //       yAxis: {
//   //         type: 'value',
//   //         axisLabel: {
//   //           formatter: function (value, index) {
//   //             return value + '米';
//   //           }
//   //         }
//   //       },
//   //       series: [
//   //         {
//   //           data: [],
//   //           type: 'line',
//   //           smooth: true,
//   //           symbol: 'none',
//   //         }
//   //       ]
//   //     }
//   //     let option2 = {
//   //       xAxis: [
//   //       {
//   //         type: 'value',
//   //         nameLocation: 'center',
//   //         nameTextStyle: {
//   //           padding: 5
//   //         },
//   //       }],
//   //       yAxis: {
//   //         type: 'value',
//   //         name: '海拔（米）',
//   //       },
//   //       series: [
//   //         {
//   //           data: [],
//   //           type: 'line',
//   //           smooth: true,
//   //           symbol: 'none',
//   //         }
//   //       ]
//   //     }
//   //     let maxH = feature.getGeometry().getFirstCoordinate()[2]
//   //     let minH = maxH
//   //     let length = 0
//   //     // let fea = feature.clone()
//   //     let coordinates = feature.getGeometry().simplify(1).getCoordinates()[0]
//   //     let allLength = getLength(feature.getGeometry())
//   //     coordinates.forEach( (coor1, index) => {
//   //       let coor = feature.getGeometry().getClosestPoint(coor1)
//   //       if(index>0) {
//   //         length += getLength(new LineString([coor, coordinates[index-1]]))
//   //       }
//   //       if (coor[2] > maxH) {
//   //         maxH = coor[2]
//   //       }
//   //       if (coor[2] < minH) {
//   //         minH = coor[2]
//   //       }
//   //       option1.series[0].data.push([coor[3]*1000, coor[2]])
//   //       option2.series[0].data.push([allLength>2000?length/1000:length, coor[2]])
//   //     })
//   //     option2.xAxis[0].name = allLength>2000?'距离（公里）':'距离（米）'
//   //     if ((maxH - minH) < 100) {
//   //       option1.yAxis.max = parseInt((maxH+100)/100)*100
//   //       option1.yAxis.min = parseInt(minH-20)
//   //       option2.yAxis.max = parseInt((maxH+100)/100)*100
//   //       option2.yAxis.min = parseInt(minH-20)
//   //     }
//   //     option2 && myChart.setOption(option2)
//   //     // myChart.on('click', function (params) {
//   //     //   console.log(111);
//   //     // })
//   //     let bt = ol_ext_element.create('DIV', { parent: profilediv, className: 'popup-body-profile-bt'})
//   //     let lcbt = ol_ext_element.create('IMG', { parent: bt, src: 'icon/lc1.png' })
//   //     lcbt.onclick = function () {
//   //       option2 && myChart.setOption(option2)
//   //       lcbt.src = 'icon/lc1.png'
//   //       tmbt.src = 'icon/tm0.png'
//   //     }
//   //     let tmbt = ol_ext_element.create('IMG', { parent: bt, src: 'icon/tm0.png' })
//   //     tmbt.onclick = function () {
//   //       option1 && myChart.setOption(option1)
//   //       tmbt.src = 'icon/tm1.png'
//   //       lcbt.src = 'icon/lc0.png'
//   //     }
//   //     // let tmbt1 = ol_ext_element.create('BUTTON', { parent: bt, text: '里程' })
//   //     // let lcbt1 = ol_ext_element.create('BUTTON', { parent: bt, text: '时间' })

//   //     // tmbt1.onclick = function () {
//   //     //   option1 && myChart.setOption(option1)
//   //     //   tmbt1.className =  tmbt1.className + ' active'
//   //     //   lcbt1.className = ''
//   //     // }
//   //     // lcbt1.onclick = function () {
//   //     //   option2 && myChart.setOption(option2)
//   //     // }
//   //     // let bt1 = ol_ext_element.create('BUTTON', { parent: profilediv, text: '里程' })
//   //     // ol_ext_element.create('IMG', { parent: profilediv, src: 'icon/lc0.png' })
//   //     // let bt2 = ol_ext_element.create('BUTTON', { parent: profilediv, text: '时间' })
//   //     // ol_ext_element.create('IMG', { parent: profilediv, src: 'icon/tm1.png' })
//   //     // bt1.addEventListener('click', function () {
//   //     //   option2 && myChart.setOption(option2)
//   //     //   bt1.style.backgroundColor = '#6a7985'
//   //     //   bt2.style.backgroundColor = '#fff'
//   //     // })
//   //     // bt2.addEventListener('click', function () {
//   //     //   option1 && myChart.setOption(option1)
//   //     //   bt2.style.backgroundColor = '#6a7985'
//   //     //   bt1.style.backgroundColor = '#fff'
//   //     // })
//   //   }, 0)
//   // }


//   //FooterDIV setting
//   let footerDIV = ol_ext_element.create('DIV', { parent: html, className: 'popup-footer' });
//   // Zoom button
//   // ol_ext_element.create('BUTTON', { className: 'ol-zoombt', parent: footerDIV, title: '缩放至' })
//   //   .addEventListener('click', function() {
//   //     if (feature.getGeometry().getType()==='Point') {
//   //       this.getMap().getView().animate({
//   //         center: feature.getGeometry().getFirstCoordinate(),
//   //         zoom:  Math.max(this.getMap().getView().getZoom(), 18)
//   //       });
//   //     } else  {
//   //       var ext = feature.getGeometry().getExtent();
//   //       this.getMap().getView().fit(ext, { duration:1000 });
//   //     }&nbsp;
//   //   }.bind(this));

//   this.get('buttons').forEach(btn=>{
//     if(btn.condition && btn.condition(feature)){
//       let button = ol_ext_element.create('BUTTON', { className: 'ol-popup-btn', parent: footerDIV})
//       if(typeof(btn.name)==='string'){
//         button.title = btn.name
//       } else if(typeof(btn.name)==='function'){
//         button.title = btn.name(feature)
//       }
//       button.appendChild(ol_ext_element.create('IMG', { className: 'ol-btn-icon', src: btn.icon }))
//       button.addEventListener('click', ()=> {
//         btn.click(feature, this)
//       });
//       if(btn.mark){
//         button.appendChild(ol_ext_element.create('span', { className: 'ol-btn-icon-mark', text: btn.mark(feature) }))
//       }
//     }
//   })

//   // Counter
//   if (!this.get('keepSelection') && this._features.length > 1) {
//     var div = ol_ext_element.create('DIV', { className: 'ol-count', parent: footerDIV });
//     ol_ext_element.create('DIV', { 
//       className: 'ol-prev', 
//       parent: div,
//       click: function() {
//         this._count--;
//         if (this._count<1) this._count = this._features.length;
//         html = this._getHtml(this._features[this._count-1]);
//         const position = this._features[this._count-1].getGeometry().getClosestPoint(this.getPosition());
//         setTimeout(function() { 
//           ol_Overlay_Popup.prototype._show.call(this, position, html); 
//         }.bind(this), 350 );
//       }.bind(this)
//     });
//     ol_ext_element.create('TEXT', { html:this._count+'/'+this._features.length, parent: div });
//     ol_ext_element.create('DIV', { 
//       className: 'ol-next', 
//       parent: div,
//       click: function() {
//         this._count++;
//         if (this._count>this._features.length) this._count = 1;
//         html = this._getHtml(this._features[this._count-1]);
//         const position = this._features[this._count-1].getGeometry().getClosestPoint(this.getPosition());
//         setTimeout(function() { 
//           ol_Overlay_Popup.prototype._show.call(this, position, html); 
//         }.bind(this), 350 );
//       }.bind(this)
//     });
//   }
//   // Use select interaction
//   if (this._select && !this.get('keepSelection')) {
//     this._noselect = true;
//     this._select.getFeatures().clear();
//     this._select.getFeatures().push(feature);
//     this._noselect = false;
//   }
//   this.dispatchEvent({ type: 'select', feature: feature, index: this._count })
//   return html;
// };

// /** Fix the popup
//  * @param {boolean} fix
//  */
// ol_Overlay_Popup.prototype.setFix = function (fix) {
//   if (fix) this.element.classList.add('ol-fixed');
//   else this.element.classList.remove('ol-fixed');
// };

// /** Is a popup fixed
//  * @return {boolean} 
//  */
// ol_Overlay_Popup.prototype.getFix = function () {
//   return this.element.classList.contains('ol-fixed');
// };

export  default ol_Overlay_Popup
