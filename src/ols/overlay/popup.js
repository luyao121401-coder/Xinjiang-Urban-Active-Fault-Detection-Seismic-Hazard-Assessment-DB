/*	Copyright (c) 2016 Jean-Marc VIGLINO, 
  released under the CeCILL-B license (French BSD license)
  (http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/
import ol_Overlay from 'ol/Overlay'
import ol_Feature from 'ol/Feature'
import ol_ext_element from 'ol-ext/util/element'
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';
import axios from 'axios';

/**
 * @classdesc
 * A popup element to be displayed over the map and attached to a single map
 * location. The popup are customized using CSS.
 *
 * @example
var popup = new ol_Overlay_Popup();
map.addOverlay(popup);
popup.show(coordinate, "Hello!");
popup.hide();
*
* @constructor
* @extends {ol_Overlay}
* @fires show
* @fires hide
* @param {} options Extend Overlay options 
*	 @param {String} [options.popupClass] the a class of the overlay to style the popup.
*	 @param {boolean} [options.anim Animate=false] the popup the popup, default false.
*	 @param {bool} [options.closeBox=false] popup has a close box, default false.
*	 @param {function|undefined} [options.onclose] callback function when popup is closed
*	 @param {function|undefined} [options.onshow] callback function when popup is shown
*	 @param {Number|Array<number>} [options.offsetBox] an offset box
*	 @param {ol.OverlayPositioning | string | undefined} options.positioning 
*		the 'auto' positioning var the popup choose its positioning to stay on the map.
*	 @param {boolean} [options.minibar=false] add a mini vertical bar
* @api stable
*/
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
    if (options.select && (typeof options.select.on ==='function')) {
      this._select = options.select;
      options.select.on('select', (e) =>{
        if (!this._noselect) {
          if (e.selected[0]) {
            this.show(e.mapBrowserEvent.coordinate, options.select.getFeatures().getArray(), e.selected[0]);
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
ol_Overlay_Popup.prototype.getClassPositioning = function () {
  var c = "";
  var pos = this.getPositioning();
  if (/bottom/.test(pos)) c += "ol-popup-bottom ";
  if (/top/.test(pos)) c += "ol-popup-top ";
  if (/left/.test(pos)) c += "ol-popup-left ";
  if (/right/.test(pos)) c += "ol-popup-right ";
  if (/^center/.test(pos)) c += "ol-popup-middle ";
  if (/center$/.test(pos)) c += "ol-popup-center ";
  return c;
};

/**
 * Set a close box to the popup.
 * @param {bool} b
 * @api stable
 */
// ol_Overlay_Popup.prototype.setClosebox = function (b) {
//   this.closeBox = b;
//   if (b) this.element.classList.add("hasclosebox");
//   else this.element.classList.remove("hasclosebox");
// };

/**
 * Set the CSS class of the popup.
 * @param {string} c class name.
 * @api stable
 */
ol_Overlay_Popup.prototype.setPopupClass = function (c) {
  var classes = ["ol-popup"];
  if (this.getVisible()) classes.push('visible');
  this.element.className = "";
  var classesPositioning = this.getClassPositioning().split(' ')
    .filter(function(className) {
      return className.length > 0;
    });
  if (c) {
    c.split(' ').filter(function(className) {
      return className.length > 0;
    })
    .forEach(function(className) {
      classes.push(className);
    });
  } else {
    classes.push("default");
  }
  classesPositioning.forEach(function(className) {
    classes.push(className);
  });
  // if (this.closeBox) {
  //   classes.push("hasclosebox");
  // }
  this.element.classList.add.apply(this.element.classList, classes);
};

/**
 * Add a CSS class to the popup.
 * @param {string} c class name.
 * @api stable
 */
ol_Overlay_Popup.prototype.addPopupClass = function (c) {
  this.element.classList.add(c);
};

/**
 * Remove a CSS class to the popup.
 * @param {string} c class name.
 * @api stable
 */
ol_Overlay_Popup.prototype.removePopupClass = function (c) {
  this.element.classList.remove(c);
};

/**
 * Set positionning of the popup
 * @param {ol.OverlayPositioning | string | undefined} pos an ol.OverlayPositioning 
 * 		or 'auto' to var the popup choose the best position
 * @api stable
 */
ol_Overlay_Popup.prototype.setPositioning = function (pos) {
  if (pos === undefined)
    return;
  if (/auto/.test(pos)) {
    this.autoPositioning = pos.split('-');
    if (this.autoPositioning.length==1) this.autoPositioning[1]="auto";
  } else {
    this.autoPositioning = false;
  }
  pos = pos.replace(/auto/g,"center");
  if (pos=="center") pos = "bottom-center";
  this.setPositioning_(pos);
};

/** @private
 * @param {ol.OverlayPositioning | string | undefined} pos
 */
ol_Overlay_Popup.prototype.setPositioning_ = function (pos) {
  if (this.element) {
    ol_Overlay.prototype.setPositioning.call(this, pos);
    this.element.classList.remove("ol-popup-top", "ol-popup-bottom", "ol-popup-left", "ol-popup-right", "ol-popup-center", "ol-popup-middle");
    var classes = this.getClassPositioning().split(' ')
      .filter(function(className) {
        return className.length > 0;
      });
    this.element.classList.add.apply(this.element.classList, classes);
  }
};

/** Check if popup is visible
* @return {boolean}
*/
ol_Overlay_Popup.prototype.getVisible = function () {
  return this.element.classList.contains("visible");
};


/**
 * Set the position and the content of the popup.
 * @param {ol.Coordinate|string} coordinate the coordinate of the popup or the HTML content.
 * @param {string|undefined} html the HTML content (undefined = previous content).
 * @example
var popup = new ol_Overlay_Popup();
// Show popup
popup.show([166000, 5992000], "Hello world!");
// Move popup at coord with the same info
popup.show([167000, 5990000]);
// set new info
popup.show("New informations");
* @api stable
*/
ol_Overlay_Popup.prototype._show = function (coordinate, html) {
  if (!html && typeof(coordinate)=='string') {
    html = coordinate; 
    coordinate = null;
  }
  if (coordinate===true) {
    coordinate = this.getPosition();
  }
  
  var self = this;
  var map = this.getMap();
  if (!map) return;
  
  if (html && html !== this.prevHTML) {
    // Prevent flickering effect
    this.prevHTML = html;
    this.content.innerHTML = '';
    if (html instanceof Element) {
      this.content.appendChild(html);
    } else {
      ol_ext_element.create('DIV', {
        html: html,
        parent: this.content
      })
    }
    // Refresh when loaded (img)
    Array.prototype.slice.call(this.content.querySelectorAll('img'))
      .forEach(function(image) {
        image.addEventListener('load', function() {
          try { map.renderSync(); } catch(e) { /* ok */ }
          self.content.dispatchEvent(new Event('scroll'));
        });
      });
  }

  if (coordinate) {
    // Auto positionning
    if (this.autoPositioning) {
      var p = map.getPixelFromCoordinate(coordinate);
      var s = map.getSize();
      var pos=[];
      if (this.autoPositioning[0]=='auto') {
        pos[0] = (p[1]<s[1]/3) ? "top" : "bottom";
      }
      else pos[0] = this.autoPositioning[0];
      pos[1] = (p[0]<2*s[0]/3) ? "left" : "right";
      this.setPositioning_(pos[0]+"-"+pos[1]);
      if (this.offsetBox) {
        this.setOffset([this.offsetBox[pos[1]=="left"?2:0], this.offsetBox[pos[0]=="top"?3:1] ]);
      }
    } else {
      if (this.offsetBox){
        this.setOffset(this.offsetBox);
      }
    }
    // Show
    this.setPosition(coordinate);
    // Set visible class (wait to compute the size/position first)
    this.element.parentElement.style.display = '';
    if (typeof (this.onshow) == 'function') this.onshow();
    this.dispatchEvent({ type: 'show' })
    this._tout = setTimeout (function() {
      self.element.classList.add('visible'); 
    }, 0);
  }
};

/** Show the popup on the map
 * @param {ol.coordinate|undefined} coordinate Position of the popup
 * @param {ol.Feature|Array<ol.Feature>} features The features on the popup
 * @param {ol.Feature} current The current feature if keepSelection = true, otherwise get the first feature
 */
ol_Overlay_Popup.prototype.show = function(coordinate, features, current) {
  if (coordinate instanceof ol_Feature 
    || (coordinate instanceof Array && coordinate[0] instanceof ol_Feature)) {
    features = coordinate;
    coordinate = null;
  }
  if (!(features instanceof Array)) features = [features];
  this._features = features.slice();
  if (!this._count) this._count = 1;

  // Calculate html upon feaures attributes
  this._count = 1;
  var f = this.get('keepSelection') ? current || features[0] : features[0];
  var html = this._getHtml(f);
  if (html) {
    // if (!this.element.classList.contains('ol-fixed')) this.hide();
    if (!coordinate || features[0].getGeometry().getType()==='Point') {
      coordinate = features[0].getGeometry().getFirstCoordinate();
    }
    ol_Overlay_Popup.prototype._show.call(this, coordinate, html);
  } else {
    this.hide();
  }
};

/**
 * Hide the popup
 * @api stable
 */
ol_Overlay_Popup.prototype.hide = function () {
  if (this.getPosition() == undefined) return;
  if (typeof (this.onclose) == 'function') this.onclose();
  this.setPosition(undefined);
  if (this._tout) clearTimeout(this._tout);
  this.element.classList.remove("visible");
  this.dispatchEvent({ type: 'hide' });
};

/** Set the template
 * @param {Template} template A template with a list of properties to use in the popup
 */
 ol_Overlay_Popup.prototype.setTemplate = function(template) {
  this._template = template;
  this._attributeObject(this._template);
}

/**
 * @private
 */
ol_Overlay_Popup.prototype._attributeObject = function (temp) {
  if (temp && temp.attributes instanceof Array) {
    var att = {};
    temp.attributes.forEach(function (a) {
      att[a] = true;
    });
    temp.attributes = att;
  }
  return temp.attributes;
};

/**
 * @private
 */
ol_Overlay_Popup.prototype._getHtml = function(feature) {
  if (!feature) return '';
  var html = ol_ext_element.create('DIV', { className: 'popup-feature' });
  

  var template
  if (this._select.getLayer(feature).popupTemplate)
    template = this._select.getLayer(feature).popupTemplate;
  else {
    template = this._template
  }
  // calculate template
  if (typeof(template) === 'function') {
    template = template(feature, this._count, this._features.length);
  } else if (!template || !template.attributes) {
    template = template || {};
    template. attributes = {};
    for (var i in feature.getProperties()) if (i!='geometry') {
      template.attributes[i] = i;
    }
  }

  // HeaderDIV setting
  var headerDIV = ol_ext_element.create('DIV', { className: 'popup-header', parent: html });

  // Display title
  let headerTitleDIV
  let titlehtml
  if (template.title) {
    if (typeof template.title === 'function') {
      titlehtml = template.title(feature);
    } else {
      titlehtml = feature.get(template.title);
    }
  } else {
    titlehtml = feature.get('title') || feature.get('name') || feature.get('id') || feature.get('label') || feature.get('text') || ''
  }
  headerTitleDIV = ol_ext_element.create('DIV', { 
    html:`<h3>${titlehtml}</h3>`,
    parent: headerDIV, 
    className: 'popup-header-title',
  });
  headerTitleDIV.addEventListener('click', function() {
    bodyDIV.style.display = bodyDIV.style.display ? '' : 'none';
  });

  // Display Button
  let headerBtnDIV = ol_ext_element.create('DIV', {
    parent: headerDIV, 
    className: 'popup-header-btn',
  });
  
  if (this.get('canFix')) {
    let fix = ol_ext_element.create('DIV', { 
      className:'popup-header-fix', 
      parent: headerBtnDIV,
      click: function(){
        this.element.classList.toggle('ol-fixed');
      }.bind(this)
    });
  }
  if (this.get('closeBox')) {
    let cls = ol_ext_element.create('DIV', {
      className: 'popup-header-cls',
      // type: 'button',
      click: function() {
        this.hide();
      }.bind(this),
      parent: headerBtnDIV
    });
  }


  // BodyDIV setting
  var bodyDIV = ol_ext_element.create('DIV', { parent: html, className: 'popup-body' });
  if (this.get('minibar')) {
    ol_ext_element.scrollDiv(bodyDIV, {
      vertical: true,
      mousewheel: true,
      minibar: true
    });
  }
  // Display properties in a table

  if (template.attributes) {
    var tr, table = ol_ext_element.create('TABLE', { parent: bodyDIV });
    var atts = this._attributeObject(template);
    var featureAtts = {}
    let addFeatureAtts = (featureAtts) => {
      for (var att in atts) {
        if (featureAtts.hasOwnProperty(att) && att!=='styleUrl') {
          var a = atts[att];
          var content, val = featureAtts[att];
          // Get calculated value
          if (typeof(a.format)==='function') {
            val = a.format(val, feature);
          }

          // Is entry visible?
          var visible = true;
          if (typeof(a.visible)==='boolean') {
            visible = a.visible;
          } else if (typeof(a.visible)==='function') {
            visible = a.visible(feature, val);
          }

          if (visible) {
            tr = ol_ext_element.create('TR', { parent: table, className: 'popup-tr' });
            ol_ext_element.create('TD', { html: a.title || att, parent: tr, className: 'popup-td-key' });
            // Show image or content
            if (this.get('showImage') && val && typeof val == 'string' && (val.match(/^http.*\.(png|jpg|jpeg|gif)$/)|| val.match(/^data:image/))) {
              content = ol_ext_element.create('DIV', { parent: tr, className: 'popup-td-value' });
              let imgdivs = ol_ext_element.create('DIV', { parent: content, className: 'popup-td-value-imgdivs'});
              let imgdiv = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
              ol_ext_element.create('IMG', { src: val, parent: imgdiv });
              let imgdiv1 = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
              ol_ext_element.create('IMG', { src: 'https://shuicaimi.wyshuoshuo.com/c2020/12/09/0l5qdagaza1.jpg', parent: imgdiv1 });
              let imgdiv2 = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
              ol_ext_element.create('IMG', { src: 'https://shuicaimi.wyshuoshuo.com/c2020/12/09/0l5qdagaza1.jpg', parent: imgdiv2 });
              let imgdiv3 = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
              ol_ext_element.create('IMG', { src: 'https://shuicaimi.wyshuoshuo.com/c2020/12/09/0l5qdagaza1.jpg', parent: imgdiv3 });
              let imgdiv4 = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
              ol_ext_element.create('IMG', { src: 'https://shuicaimi.wyshuoshuo.com/c2020/12/09/0l5qdagaza1.jpg', parent: imgdiv4 });
              let imgdiv5 = ol_ext_element.create('DIV', { parent: imgdivs, className: 'popup-td-value-imgdiv' });
              ol_ext_element.create('IMG', { src: 'https://shuicaimi.wyshuoshuo.com/c2020/12/09/0l5qdagaza1.jpg', parent: imgdiv5 });
              // content = ol_ext_element.create('IMG',{
              //   src: val
              // });
              let viewer = new Viewer(content, {})
              content.addEventListener('click', function(){
                viewer.show();
              });
              content.style.cursor = 'pointer';
              content.style.maxHeight = '50px';
              content.title = '点击浏览图片';
            }
            // 正则以<开头，以>结尾
            else if (this.get('showImage') && val && typeof val == 'string' && val.match(/^<.*>$/)) {
              content = (a.before||'') + val + (a.after||'')
            }
            // 正则为url
            else if (val && typeof val == 'string' && val.match(/^http.*$/)) { 
              content = ol_ext_element.create('A',{
                href: val,
                html: val.length>=maxc?val.substr(0,maxc)+'...':val,
                target: '_blank',
                title:  '点击打开链接'
              })
            }
            else {
              content = (a.before||'') + val + (a.after||'');
              var maxc = this.get('maxChar') || 200;
              if (typeof(content) === 'string' && content.length>maxc) content = content.substr(0,maxc)+'[...]';
            }
            console.log(content);

            // Add value
            let aa = ol_ext_element.create('TD', {
              html: content,
              parent: tr,
              title: val,
              className: 'popup-td-value'
            });
            console.log(aa);
          }
        }
        // else if (atts[att].url) {
        //   var a = atts[att]
        //   let content
        //   let url = a.url.replace('{key}', feature.get('key'));
        //     axios.get(url).then(res => {
        //       let data = res.data
        //       console.log(data);
        //       a.pos.forEach(pos => {
        //         data = data[pos]
        //       })
        //       console.log(data);
        //       content = data
        //     })
        //   tr = ol_ext_element.create('TR', { parent: table, className: 'popup-tr' });
        //   ol_ext_element.create('TD', { html: a.title || att, parent: tr, className: 'popup-td-key' });
        //   ol_ext_element.create('TD', {
        //     html: content,
        //     parent: tr,
        //     title: val,
        //     className: 'popup-td-value'
        //   });
        // }
      }
    }
    if (template.secRes) {
      let url = template.secRes.url.replace('{key}', feature.get('key'));

      let getFatt = new Promise(function(resolve, reject) {
        let featureAtts = {}
        axios.get(url).then(res => {
          for(let key in template.attributes) {
            let val
            let data = res.data
            template.attributes[key].pos.forEach(pos => {
              if ( typeof(data) == 'object'  &&data.hasOwnProperty(pos.key)) {
                data = data[pos.key]
              }
              else {
                data = undefined
              }
            })
            val = data
            if (data !== undefined) {
              featureAtts[key] = val
            }
          }
          resolve(featureAtts)
        }).catch(err => {
          reject(err)
        })
      })
      getFatt.then((featureAtts) => {
        addFeatureAtts(featureAtts)
      })
      
    } else {
      featureAtts = feature.getProperties();
      addFeatureAtts(featureAtts)
    }
  }


  //FooterDIV setting
  let footerDIV = ol_ext_element.create('DIV', { parent: html, className: 'popup-footer' });
  // Zoom button
  ol_ext_element.create('BUTTON', { className: 'ol-zoombt', parent: footerDIV, title: '缩放至' })
    .addEventListener('click', function() {
      if (feature.getGeometry().getType()==='Point') {
        this.getMap().getView().animate({
          center: feature.getGeometry().getFirstCoordinate(),
          zoom:  Math.max(this.getMap().getView().getZoom(), 18)
        });
      } else  {
        var ext = feature.getGeometry().getExtent();
        this.getMap().getView().fit(ext, { duration:1000 });
      }
    }.bind(this));

  // Counter
  if (!this.get('keepSelection') && this._features.length > 1) {
    var div = ol_ext_element.create('DIV', { className: 'ol-count', parent: footerDIV });
    ol_ext_element.create('DIV', { 
      className: 'ol-prev', 
      parent: div,
      click: function() {
        this._count--;
        if (this._count<1) this._count = this._features.length;
        html = this._getHtml(this._features[this._count-1]);
        const position = this._features[this._count-1].getGeometry().getClosestPoint(this.getPosition());
        setTimeout(function() { 
          ol_Overlay_Popup.prototype._show.call(this, position, html); 
        }.bind(this), 350 );
      }.bind(this)
    });
    ol_ext_element.create('TEXT', { html:this._count+'/'+this._features.length, parent: div });
    ol_ext_element.create('DIV', { 
      className: 'ol-next', 
      parent: div,
      click: function() {
        this._count++;
        if (this._count>this._features.length) this._count = 1;
        html = this._getHtml(this._features[this._count-1]);
        const position = this._features[this._count-1].getGeometry().getClosestPoint(this.getPosition());
        setTimeout(function() { 
          ol_Overlay_Popup.prototype._show.call(this, position, html); 
        }.bind(this), 350 );
      }.bind(this)
    });
  }
  // Use select interaction
  if (this._select && !this.get('keepSelection')) {
    this._noselect = true;
    this._select.getFeatures().clear();
    this._select.getFeatures().push(feature);
    this._noselect = false;
  }
  this.dispatchEvent({ type: 'select', feature: feature, index: this._count })
  return html;
};

/** Fix the popup
 * @param {boolean} fix
 */
ol_Overlay_Popup.prototype.setFix = function (fix) {
  if (fix) this.element.classList.add('ol-fixed');
  else this.element.classList.remove('ol-fixed');
};

/** Is a popup fixed
 * @return {boolean} 
 */
ol_Overlay_Popup.prototype.getFix = function () {
  return this.element.classList.contains('ol-fixed');
};

export  default ol_Overlay_Popup
