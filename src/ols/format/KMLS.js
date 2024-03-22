import KML from 'ol/format/KML'
import { getAllTextContent, makeObjectPropertySetter, makeStructureNS, pushParseAndPop, makeArrayExtender, makeArrayPusher, } from 'ol/xml.js';
import { readBoolean, readDecimal, readString, writeBooleanTextNode, writeCDATASection, writeDecimalTextNode, writeStringTextNode, } from 'ol/format/xsd.js';
import {pointiconpath} from '../path.js'
import { getXMLSerializer, isDocument, parse, createElementNS} from 'ol/xml';


var NAMESPACE_URIS = [
  null,
  'http://earth.google.com/kml/2.0',
  'http://earth.google.com/kml/2.1',
  'http://earth.google.com/kml/2.2',
  'http://www.opengis.net/kml/2.2',
];

export function makeArrayPusher_(valueReader, opt_this, allnode) {
  return (
    /**
     * @param {Element} node Node.
     * @param {Array<*>} objectStack Object stack.
     */
    function (node, objectStack) {
      const value = valueReader.call(
        opt_this !== undefined ? opt_this : this,
        node,
        objectStack,
        allnode
      );
      if (value !== undefined) {
        const array = /** @type {Array<*>} */ (
          objectStack[objectStack.length - 1]
        );
        array.push(value);
      }
    }
  );
}

class KMLS extends KML {
  constructor(opt_options) {
    const options = opt_options || {}
    super(options)
    this.sharestylenode = []
  }
}

KMLS.prototype.readDocumentOrFolder_ = function (node, objectStack) {
  // FIXME use scope somehow
  var parsersNS = makeStructureNS(NAMESPACE_URIS, {
      'Document': makeArrayExtender(this.readDocumentOrFolder_, this),
      // 'Style': this.readSharedStyle_.bind(this),
      'Folder': makeArrayExtender(this.readDocumentOrFolder_, this),
      'Placemark': makeArrayPusher_(this.readPlacemark_, this),
      // 'StyleMap': this.readSharedStyleMap_.bind(this),
  });
  
  if(node.nodeName === 'Document') {
    var parsersNS2 = makeStructureNS(NAMESPACE_URIS, {
      'StyleMap': this._readSharedStyleMap_.bind(this),
    });
    this.styleMaps = pushParseAndPop({}, parsersNS2, node, [], this);
    var parsersNS3 = makeStructureNS(NAMESPACE_URIS, {
      'Style': this.readSharedStyle_.bind(this),
    });
    pushParseAndPop({}, parsersNS3, node, [], this);
  }
  /** @type {Array<Feature>} */
  // @ts-ignore
  var features = pushParseAndPop([], parsersNS, node, objectStack, this);
  if (features) {
      return features;
  }
  else {
      return undefined;
  }
}

KMLS.prototype.readFeaturesFromNode_ = function (node, objectStack) {
  return KML.prototype.readDocumentOrFolder(node, objectStack);
}

KMLS.prototype.readPlacemark_ = function (node, objectStack) {
  let newNode = node.cloneNode(true);
  //有style
  if (node.getElementsByTagName('Style').length > 0) {
    let readStyleURL_ = function readStyleURL(node) {
      var s = getAllTextContent(node, false)
        .trim()
        .replace(/^(?!.*#)/, '')
        .replace('#', '');
      return s;
    }
    let STYURL_PARSERS = makeStructureNS(NAMESPACE_URIS, {
      'styleUrl': makeObjectPropertySetter(readStyleURL_),
      'Style': this.readSharedStyle_.bind(this) //增加适配可能共享样式在要素中的情况前提是共享样式必须在前
   });
    let objectStyleUrl = pushParseAndPop([], STYURL_PARSERS, node, objectStack).styleUrl
    let normalNodeID
    if (this.styleMaps && this.styleMaps[objectStyleUrl]) {
      normalNodeID = this.styleMaps[objectStyleUrl].normal
    }
    let normalNode
    let BalloonStyle
    this.sharestylenode.forEach(function (item) {
      if (item.id == normalNodeID) {
        normalNode = item
        let BalloonStyleNode = item.getElementsByTagName('BalloonStyle')
        if (BalloonStyleNode.length > 0) {
          BalloonStyle = BalloonStyleNode[0].getElementsByTagName('text')[0].textContent
          newNode.getElementsByTagName('description')[0].textContent = BalloonStyle.replace('$[description]', node.getElementsByTagName('description')[0].textContent)
        }
      }
    })
    let allstyle = [
      'IconStyle',
      'LabelStyle',
      'LineStyle',
      'PolyStyle'
    ]
    if(normalNode){
      allstyle.forEach(function (item) {
        let nodes = normalNode.getElementsByTagName(item)
        if (nodes.length > 0) {
          nodes[0].childNodes.forEach(ele => {
            if (ele.nodeName !== '#text') {
              if (newNode.getElementsByTagName(item).length > 0) {
                newNode.getElementsByTagName(item)[0].appendChild(ele.cloneNode(true));
              } else {
                let newEle = newNode.ownerDocument.createElement(item);
                newEle.appendChild(ele.cloneNode(true));
                newNode.getElementsByTagName('Style')[0].appendChild(newEle);
              }
            }
          })
        }
      })
    }
  }
  //没有style但有styleurl
  else if(node.getElementsByTagName('styleUrl').length > 0 && node.getElementsByTagName('Style').length == 0){
    let readStyleURL_ = function readStyleURL(node) {
      var s = getAllTextContent(node, false)
        .trim()
        .replace(/^(?!.*#)/, '')
        .replace('#', '');
      return s;
    }
    let STYURL_PARSERS = makeStructureNS(NAMESPACE_URIS, { 'styleUrl': makeObjectPropertySetter(readStyleURL_) });
    let objectStyleUrl = pushParseAndPop([], STYURL_PARSERS, node, objectStack).styleUrl
    let normalNodeID
    if (this.styleMaps && this.styleMaps[objectStyleUrl]) {
      normalNodeID = this.styleMaps[objectStyleUrl].normal
    } 
    // 适配不存在stylemap，但跳过stylemap直接通过styleurl进行索引
    else {
      normalNodeID = objectStyleUrl
    }
    let normalNode
    let BalloonStyle
    this.sharestylenode.forEach(function (item) {
      if (item.id == normalNodeID) {
        normalNode = item
        let BalloonStyleNode = item.getElementsByTagName('BalloonStyle')
        if (BalloonStyleNode.length > 0 && BalloonStyleNode[0].children.length > 0) {
          BalloonStyle = BalloonStyleNode[0].getElementsByTagName('text')[0].textContent
          newNode.getElementsByTagName('description')[0].textContent = BalloonStyle.replace('$[description]', node.getElementsByTagName('description')[0].textContent)
        }
      }
    })
    if (normalNode) {
      newNode.appendChild(normalNode.cloneNode(true))
    }
  }
  //没有style也没有styleurl
  else if((!this.styleMaps || node.getElementsByTagName('styleUrl').length == 0) && node.getElementsByTagName('Style').length == 0){
    let sty = parse(`<Style><IconStyle><Icon><href>${pointiconpath}ylw-pushpin.png</href></Icon><hotSpot x="20" y="2" xunits="pixels" yunits="pixels"/></IconStyle></Style>`)
    newNode.appendChild(sty.children[0])
  }
  ['x', 'y', 'w', 'h'].forEach(function (item) {
    let nodeattr = newNode.getElementsByTagName(item)
    if (nodeattr.length > 0) {
      var addatt = createElementNS('http://www.google.com/kml/ext/2.2', 'gx:' + item)
      addatt.textContent = nodeattr[0].textContent
      nodeattr[0].parentNode.appendChild(addatt)
      nodeattr[0].parentNode.removeChild(nodeattr[0])
    }
  })
  return KML.prototype.readPlacemark_.call(this, newNode, objectStack);
}

function readStyleURL(node) {
  var s = getAllTextContent(node, false)
      .trim()
      .replace('#', '')
  return s
}

var PAIR_PARSERS = makeStructureNS(NAMESPACE_URIS, {
  'key': makeObjectPropertySetter(readString),
  'styleUrl': makeObjectPropertySetter(readStyleURL),
})

function pairDataParser(node, objectStack) {
  var pairObject = pushParseAndPop({}, PAIR_PARSERS, node, objectStack, this);
  if (!pairObject) {
      return;
  }
  var key = /** @type {string|undefined} */ (pairObject['key']);
  var styleUrl = /** @type {string|undefined} */ (pairObject['styleUrl']);
  if (styleUrl) {
      objectStack[objectStack.length - 1][key] = styleUrl;
  }
}

var STYLE_MAP_PARSERS = makeStructureNS(NAMESPACE_URIS, {
  'Pair': pairDataParser,
});

export function parseNode_(parsersNS, node, objectStack, opt_this) {
  let n;
  for (n = node.firstElementChild; n; n = n.nextElementSibling) {
    const parsers = parsersNS[n.namespaceURI];
    if (parsers !== undefined) {
      const parser = parsers[n.localName];
      if (parser !== undefined) {
        parser.call(opt_this, n, objectStack);
      }
    }
  }
}

KMLS.prototype._readSharedStyleMap_ = function (node, objectStack) {
  var id = node.getAttribute('id');
  if (id === null) {
      return;
  }
  let styleMap = {};
  styleMap = pushParseAndPop({}, STYLE_MAP_PARSERS, node, objectStack, this)
  objectStack[objectStack.length - 1][id] = styleMap;
};

var googleIcons = ['wht-pushpin.png','ylw-pushpin.png','ltblu-pushpin.png','pink-pushpin.png','red-pushpin.png',
'arrow-reverse.png','arrow.png','donut.png','forbidden.png','info.png',"open-diamond.png","placemark_circle.png",
"placemark_square.png","polygon.png","square.png","star.png","target.png","triangle.png","wht-blank.png",
"wht-circle.png","wht-diamond.png","wht-square.png","wht-stars.png","woman.png","man.png","a.png","b.png",
"c.png","d.png","e.png","f.png","g.png","h.png","i.png","j.png","k.png","l.png","m.png","n.png","o.png","p.png"
,"q.png","r.png","s.png","t.png","u.png","v.png","w.png","x.png","y.png","z.png","1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","shaded_dot.png"]

KMLS.prototype.readSharedStyle_ = function (node, objectStack) {
  if (node.getAttribute('id')) {  // 如果有id，则认为是style共享样式
    [...node.getElementsByTagName('href')].forEach(function (ele) {
      let href = ele.textContent
      let png = href.substring(href.lastIndexOf("/")+1)
      if(googleIcons.indexOf(png.toLowerCase()) != -1) {
        ele.textContent = pointiconpath + png
      }
    });
    this.sharestylenode.push(node)
  }
}

export default KMLS