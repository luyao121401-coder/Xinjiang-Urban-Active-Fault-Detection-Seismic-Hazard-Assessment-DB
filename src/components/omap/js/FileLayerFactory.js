import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import GPX from 'ol/format/GPX';
import KML from 'ol/format/KML';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import shpjs from 'shpjs';
import JSZip from 'jszip'


let defaultCircle = new CircleStyle({
    fill: new Fill({
        color: 'rgba(255,255,0,0.4)',
    }),
    radius: 5,
    stroke: new Stroke({
        color: '#ff0',
        width: 1,
    }),
})

let defaultStyle = {
    'Point': new Style({
        image: defaultCircle,
    }),
    'LineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1,
        }),
    }),
    'MultiLineString': new Style({
        stroke: new Stroke({
            color: 'green',
            width: 1,
        }),
    }),
    'MultiPoint': new Style({
        image: defaultCircle,
    }),
    'MultiPolygon': new Style({
        stroke: new Stroke({
            color: 'yellow',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 0, 0.1)',
        }),
    }),
    'Polygon': new Style({
        stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3,
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
        }),
    }),
    'GeometryCollection': new Style({
        stroke: new Stroke({
            color: 'magenta',
            width: 2,
        }),
        fill: new Fill({
            color: 'magenta',
        }),
        image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: 'magenta',
            }),
        }),
    }),
    'Circle': new Style({
        stroke: new Stroke({
            color: 'red',
            width: 2,
        }),
        fill: new Fill({
            color: 'rgba(255,0,0,0.2)',
        }),
    }),
};


var buildDefaultLayer = function (style) {
    if (style == null || style == undefined)
        style = defaultStyle;
    let source = new VectorSource()
    let layer = new VectorLayer({
        source: source,
        style: function (feature) {
            return style[feature.getGeometry().getType()];
        },
    });
    return layer;
}

/**
 * 创建shapelayer图层
 * @param {*} file 
 * @param {*} layerName 
 * @param {*} style 
 * @param {*} callback 
 */
var createGeojsonLayer = function (file, layerName, style, callback) {
    let layer = buildDefaultLayer(style)
    layer.name = layerName
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function () {
        let data = this.result
        let features = new GeoJSON().readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
        layer.getSource().addFeatures(features)
        callback(layer)
    }
}

/**
 * 创建shapelayer图层
 * @param {*} file 
 * @param {*} layerName 
 * @param {*} style 
 * @param {*} callback 
 */
var createShapeLayer = function (file, layerName, style, callback) {
    const layer = buildDefaultLayer(style)
    layer.name = layerName
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = function () {
        let arrayBuffer = this.result
        shpjs(arrayBuffer).then(geojson => {
            let features = new GeoJSON().readFeatures(geojson, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
            features.map((item) => {
                item.set(
                    "style_",
                    new Style({
                        fill: new Fill({
                            color: "rgba(0, 0, 0, 0.2)",
                        }),
                        stroke: new Stroke({
                            color: "blue",
                            width: 3,
                        }),
                    })
                );
                item.setStyle(function (feature) {
                    return feature.get("style_");
                });
            });
            layer.getSource().addFeatures(features)
            callback(layer)
        })
    }
}

/**
 * 创建一个gpx图层
 * @param {*} file 
 * @param {*} layerName 
 * @param {*} style 
 * @param {*} callback 
 */
var createGpxLayer = function (file, layerName, style, callback) {
    const layer = buildDefaultLayer(style)
    layer.name = layerName
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function () {
        let data = this.result
        let features = new GPX().readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
        layer.getSource().addFeatures(features)
        callback(layer)
    }
}

/**
 * 创建kml/kmz图层
 * @param {*} file 
 * @param {*} layerName 
 * @param {*} callback 
 */
var createKmlLayer = function (file, layerName, callback) {
    let kml = null;
    if (file.name.substring(file.name.length - 3, file.name.length) == 'kmz') {
        kml = new KMZ({
            extractStyles: true,
            crossOrigin: "*",
        })
    } else if (file.name.substring(file.name.length - 3, file.name.length) == 'kml') {
        kml = new KML({
            extractStyles: true,
            crossOrigin: "*",
            iconUrlFunction: getKMLImage
        })
    }
    if (kml === null || kml == undefined) {
        callback(null)
        return
    }
    var reader = new FileReader()
    let source = new VectorSource()
    const layer = new VectorLayer({
        source: source
    });
    layer.name = layerName
    reader.readAsText(file)
    reader.onload = function () {
        let data = this.result
        let features = kml.readFeatures(data, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
        source.addFeatures(features)
        callback(layer)
    }
}


//-------------------------kmz-------------------
const zip = new JSZip();

class KMZ extends KML {
    constructor(opt_options) {
        const options = opt_options || {};
        options.iconUrlFunction = getKMLImage;
        super(options);
    }

    getType() {
        return 'arraybuffer';
    }

    readFeature(source, options) {
        const kmlData = getKMLData(source);
        return super.readFeature(kmlData, options);
    }

    readFeatures(source, options) {
        const kmlData = getKMLData(source);
        return super.readFeatures(kmlData, options);
    }
}


function getKMLData(buffer) {
    let kmlData;
    zip.load(buffer);
    const kmlFile = zip.file(/.kml$/i)[0];
    if (kmlFile) {
        kmlData = kmlFile.asText();
    }
    return kmlData;
}

function getKMLImage(href) {
    let url = href;
    let path = window.location.href;
    path = path.slice(0, path.lastIndexOf('/') + 1);
    if (href.indexOf(path) === 0) {
        const regexp = new RegExp(href.replace(path, '') + '$', 'i');
        const kmlFile = zip.file(regexp)[0];
        if (kmlFile) {
            url = URL.createObjectURL(new Blob([kmlFile.asArrayBuffer()]));
        }
    }
    //google 图标访问不到，转到本地图标
    if (url.toLowerCase().startsWith("http") && url.toLowerCase().indexOf("maps.google.com") != -1) {
        var imageName = url.substring(url.lastIndexOf("/") + 1)
        url = "./icon/" + imageName.toLowerCase()
    }
    console.log(url)
    return url;
}


export {createKmlLayer, createGeojsonLayer, createShapeLayer, createGpxLayer} ;