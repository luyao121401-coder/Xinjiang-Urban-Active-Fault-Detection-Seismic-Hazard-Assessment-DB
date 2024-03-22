import Projection from 'ol/proj/Projection'
import XYZ from 'ol/source/XYZ'

var BaseLayerSource = {}
var customSourceCache = {}

  var TDT_W_VEC = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous'
  })
  var TDT_W_CVA = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous',
  })
  var TDT_W_EVA = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=eva_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous',
  })
  
  var TDT_W_IMG = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous',
  })
  
  var TDT_W_CIA = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous',
  })
  var TDT_W_EIA = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=eia_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous',
  })
  
  var TDT_W_TER = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous',
  })
  
  var TDT_W_CTA = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous'
  })
  var TDT_W_ETA = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=eta_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous'
  })
  
  var TDT_W_IBO = new XYZ({
    url: 'http://t{0-7}.tianditu.com/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    crossOrigin: 'anonymous'
  })
  
  var GD_W_IMG = new XYZ({
    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    crossOrigin: 'anonymous',
    projection: new Projection({
      code: "GCJ-02",
      extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
      units: "m"
    })
  })
  
  var GD_W_VEC = new XYZ({
    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
    crossOrigin: 'anonymous',
    projection: new Projection({
      code: "GCJ-02",
      extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
      units: "m"
    })
  })
  
  var GD_W_IBO = new XYZ({
    url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
    projection: new Projection({
      code: "GCJ-02",
      extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244],
      units: "m"
    })
  })

  var EMPTY = new XYZ({
    url: '',
    crossOrigin: 'anonymous'
  })

  var BJ_DEM_HSD = new XYZ({
    // url: 'http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    url: 'http://localhost:8088/geoserver/gwc/service/wmts?layer=beijing:bj_dem&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}',
    crossOrigin: 'anonymous'
  })
  BJ_DEM_HSD.opacity = 0.3
  var BJ_DEM = new XYZ({
    // url: 'http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    url: 'http://localhost:8088/geoserver/gwc/service/wmts?layer=beijing:dem0&style=&tilematrixset=EPSG:900913&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix=EPSG:900913:{z}&TileCol={x}&TileRow={y}',
    crossOrigin: 'anonymous'
  })

  var OPEN_RAILWAY = new XYZ({
    // url: 'http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
    url: 'https://c.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
    crossOrigin: 'anonymous'
  })

  BaseLayerSource.tdtyx = [TDT_W_IMG,TDT_W_IBO,TDT_W_CIA]
  BaseLayerSource.tdtdt = [TDT_W_VEC,TDT_W_IBO,TDT_W_CVA]
  BaseLayerSource.tdtdx = [TDT_W_TER,TDT_W_IBO,TDT_W_CTA]
  BaseLayerSource.tdtyxe = [TDT_W_IMG,TDT_W_IBO,TDT_W_EIA]
  BaseLayerSource.tdtdte = [TDT_W_VEC,TDT_W_IBO,TDT_W_EVA]
  BaseLayerSource.tdtdxe = [TDT_W_TER,TDT_W_IBO,TDT_W_ETA]
  BaseLayerSource.gdyx = [GD_W_IMG,GD_W_IBO]
  BaseLayerSource.gddt = [GD_W_VEC]
  BaseLayerSource.dem = [BJ_DEM, BJ_DEM_HSD, TDT_W_CTA]

  /**
   * TODO url解析这里还有问题，需要修改
   * @param {*} key 
   * @param {*} purl 
   * @param {*} proj 
   * @param {*} start 
   * @param {*} end 
   * @param {*} maxZoom 
   * @param {*} minZoom 
   * @param {*} imageSize 
   * @returns 
   */
  export function createXYZSource(purl, proj, start, end, maxZoom, minZoom, imageSize){
     let xyz = customSourceCache[purl]
     if(xyz) return xyz;
     xyz = new XYZ({
          tileUrlFunction: function(TileCoord, number,  Projection) {
              var url = purl.replace(/{serverPort}/, '{' + start + '-' + end + '}')

              let regexyz = /{\d{0,9}[+-]{0,1}z[+-]{0,1}\d{0,9}}/
              let isXYZ = url.match(regexyz)
              if(isXYZ == null){
                  var url = purl.replace(/{serverPort}/, '{' + start + '-' + end + '}')
                  var regex_z = /{\d{0,9}[+-]{0,1}level[+-]{0,1}\d{0,9}}/
                  var regex_x = /{\d{0,9}[+-]{0,1}col[+-]{0,1}\d{0,9}}/
                  var regex_y = /{\d{0,9}[+-]{0,1}row[+-]{0,1}\d{0,9}}/
                  let z = url.match(regex_z)
                  let x = url.match(regex_x)
                  let y = url.match(regex_y)
                  let chengeCoord = (a)=>{
                    if (a.match(/\d{1,9}/g).length == 2) {
                      switch (a.match(/[+-]{1,2}/g)[0]) {
                        case '-':
                          return parseInt(a.match(/\d{1,9}/g)[0]) - parseInt(a.match(/\d{1,9}/g)[1])
                        case '+':
                          return parseInt(a.match(/\d{1,9}/g)[0]) + parseInt(a.match(/\d{1,9}/g)[1])
                        default:
                          break;
                      }
                    } else {
                      return a
                    }
                  }
                  z = chengeCoord(z[0].replace(/level/, TileCoord[0]).replace(/{/, '').replace(/}/, ''))
                  x = chengeCoord(x[0].replace(/col/, TileCoord[1]).replace(/{/, '').replace(/}/, ''))
                  y = chengeCoord(y[0].replace(/row/, TileCoord[2]).replace(/{/, '').replace(/}/, ''))
                  url = url.replace(regex_z, z).replace(regex_x, x).replace(regex_y, y)
                  return url
              }

              var regex_z = /{\d{0,9}[+-]{0,1}z[+-]{0,1}\d{0,9}}/
              var regex_x = /{\d{0,9}[+-]{0,1}x[+-]{0,1}\d{0,9}}/
              var regex_y = /{\d{0,9}[+-]{0,1}y[+-]{0,1}\d{0,9}}/
              let z = url.match(regex_z)
              let x = url.match(regex_x)
              let y = url.match(regex_y)

              let chengeCoord = (a)=>{
                if (a.match(/\d{1,9}/g).length == 2) {
                  switch (a.match(/[+-]{1,2}/g)[0]) {
                    case '-':
                      return parseInt(a.match(/\d{1,9}/g)[0]) - parseInt(a.match(/\d{1,9}/g)[1])
                    case '+':
                      return parseInt(a.match(/\d{1,9}/g)[0]) + parseInt(a.match(/\d{1,9}/g)[1])
                    default:
                      break;
                  }
                } else {
                  return a
                }
              }
              z = chengeCoord(z[0].replace(/z/, TileCoord[0]).replace(/{/, '').replace(/}/, ''))
              x = chengeCoord(x[0].replace(/x/, TileCoord[1]).replace(/{/, '').replace(/}/, ''))
              y = chengeCoord(y[0].replace(/y/, TileCoord[2]).replace(/{/, '').replace(/}/, ''))
              url = url.replace(regex_z, z).replace(regex_x, x).replace(regex_y, y)
              return url
          },
          projection: proj,
          maxZoom: maxZoom,
          minZoom: minZoom,
          tileSize: imageSize
    })
    customSourceCache[purl] = xyz
    return xyz;
  }

  export default BaseLayerSource;

