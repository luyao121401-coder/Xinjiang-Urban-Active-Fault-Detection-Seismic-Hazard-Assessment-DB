import 'ol/ol.css';
import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style,
    Text,
    Icon
} from 'ol/style';
import { Draw, Modify } from 'ol/interaction';
import { LineString, Point, Polygon, Circle } from 'ol/geom';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { createBox } from 'ol/interaction/Draw';
import { unByKey } from 'ol/Observable.js';
import WKT from 'ol/format/WKT';


var otherStyle = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
        color: '#66b1ff',//#ffcc33
        width: 2
    }),
    image: new CircleStyle({
        radius: 7,
        fill: new Fill({
            color: '#ffcc33'
        })
    })
});

var pointStyle = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.6)'
    }),
    stroke: new Stroke({
        color: '#66b1ff',//#ffcc33
        width: 2
    }),
    image: new Icon({
        src: "gicon/wht-circle.png",
        scale: 0.5
    })
});

var style = pointStyle;

const tipStyle = new Style({
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.4)',
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15,
    }),
});

const modifyStyle = new Style({
    image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 0, 0.4)',
        }),
    }),
    text: new Text({
        text: '拖动修改',
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15,
    }),
});

// 地图监听事件
let mapLinstener = null

export function DrawTool(map) {
    //是否清除前次绘制
    var clearPrevious = true;
    //绘制类型
    var drawType = ""
    //提示点位置
    var tipPoint = null;
    var tip = ""

    var drawPointCount = 0

    var source = new VectorSource();
    var drawLayer = new VectorLayer({
        source: source,
        style: (feature) => {
            return styleFunction(feature);
        },
    });

    var finalSource = new VectorSource();
    var finalLayer = new VectorLayer({
        source: finalSource,
    });

    var featursArray = []

    var modify = new Modify({ source: source, style: modifyStyle });
    var draw = null;

    map.addLayer(drawLayer);
    map.addLayer(finalLayer);
    map.addInteraction(modify);

    /**
     * 开始绘制
     * {
     *   type: 绘制类型 Point：代表是点，LineString代表线，Polygon代表多边形，Circle圆形，Box方形
     *   style：绘制的样式
     *   isFreehand：是否徒手绘制 针对LineString和Polygon
     *   resultCallback 绘制结束结果返回
     * }
     */
    this.startDraw = function (option) {
        if (!option.type) return
        drawType = option.type
        this.resetStyle()
        if (option.style) style = option.style
        if(option.layerName){
            drawLayer.name = "空间查询临时图层"
            finalLayer.name = "空间查询临时图层"
        }

        if (draw)
            map.removeInteraction(draw);
        //地图容器绑定鼠标移动事件，记录点击的点数量
        if (mapLinstener)
            unByKey(mapLinstener)
        mapLinstener = map.on('click', function () {
            // 绘制点的
            drawPointCount += 1
        })
        addDrawInteraction(option.type, option.isFreehand, option.resultCallback)
    }

    /**
     * 结束绘制
     */
    this.stopDraw = function () {
        if (mapLinstener)
            unByKey(mapLinstener)
        if (draw)
            map.removeInteraction(draw);
        modify.setActive(false)
        featursArray = []
        // source.clear()
    }

    /**
     * 暂停绘制
     */
    this.pauseDraw = function () {
        if (mapLinstener)
            unByKey(mapLinstener)
        if (draw)
            map.removeInteraction(draw);
    }

    /**
     * 清除绘制的内容
     */
    this.drawClear = function () {
        finalSource.clear();
        source.clear();
        featursArray = []
    }

    /**
     * 设置是否清除前次绘制
     */
    this.setClearPrevious = function (isClear) {
        clearPrevious = isClear
    }

    /**
     * 清除上一个feature
     */
    this.clearPreFeature = function(){
    //    let feautures = finalSource.getFeatures()
    //    if(feautures.length > 0){
    //      finalSource.removeFeature(feautures.pop())
    //    }
       if(featursArray.length > 0){
          finalSource.removeFeature(featursArray.pop())
       } 
    }

    this.setStyle = function(newStyle){
        // if(drawType == "Point"){
        //     pointStyle = newStyle
        // } else {
        //     otherStyle = newStyle
        // }
        style = newStyle
    }

    this.resetStyle = function(){
        if(drawType == "Point"){
            style = pointStyle
        } else {
            style = otherStyle
        }
    }

    var addDrawInteraction = function (type = "LineString", isFreehand = false, resultCallback) {
        const activeTip = '双击结束绘制';
        const idleTip = '点击开始绘制';
        tip = idleTip;
        let geometryFunction;

        if (type == 'Box') {
            type = 'Circle'
            geometryFunction = createBox()
        }
        draw = new Draw({
            source: source,
            type: type,
            freehand: isFreehand,
            geometryFunction: geometryFunction,
            style: (feature) => {
                return styleFunction(feature, isFreehand);
            },
        });
        draw.on('drawstart', function () {
            if (clearPrevious) {
                source.clear();
            }
            modify.setActive(false);
            tip = activeTip;
        });
        draw.on('drawend', function (event) {
            modifyStyle.setGeometry(tipPoint);
            modify.setActive(true);
            map.once('pointermove', function () {
                modifyStyle.setGeometry();
            });

            drawPointCount = 0
            if (mapLinstener)
                unByKey(mapLinstener)
            tip = idleTip;
            
            if (resultCallback) {
                if (geometryFunction == undefined && type == 'Circle') {
                    let centerLogLat = event.feature.getGeometry().getCenter()
                    let radius = event.feature.getGeometry().getRadius();

                    resultCallback({
                        feature: event.feature,
                        coordinate: event.feature.getGeometry().getCoordinates(),
                        radius: radius,
                        centerLogLat: centerLogLat
                    })  
                } else {
                    var format = new WKT();
                    resultCallback({
                        feature: event.feature,
                        coordinate: event.feature.getGeometry().getCoordinates(),
                        wkt: format.writeFeature(event.feature)
                    })
                }
                
            }

            if(!clearPrevious){
                setTimeout(()=>{
                    source.clear()
                    event.feature.setStyle(style)
                    let feature = event.feature.clone()
                    finalSource.addFeature(feature)
                    featursArray.push(feature)
                }, 10)
            }
        });
        modify.setActive(true);
        map.addInteraction(draw);
    }

    var styleFunction = function (feature, isFreehand) {
        const styles = [style];
        const geom = feature.getGeometry();
        const type = geom.getType();
        if (geom instanceof Polygon) {
            if (isFreehand) {
                tip = '松开结束绘制'
            } else if (drawPointCount >= 3) {
                tip = "单击继续绘制线,双击结束绘制"
            } else if (drawType == 'Box' && drawPointCount >= 1) {
                tip = '单击结束绘制'
            } else if (drawPointCount >= 1) {
                tip = '继续点击绘制多边形'
            }
        } else if (geom instanceof LineString) {
            if (drawPointCount >= 1) {
                if (isFreehand) {
                    tip = '松开结束绘制'
                } else {
                    tip = "点击继续绘制线,双击结束绘制"
                }
            }
        } else if (geom instanceof Point) {
            tip =""
        } else if (geom instanceof Circle) {
            if (drawPointCount >= 1) {
                tip = '单击结束绘制'
            }
        }
        if (tip && type === 'Point' && !modify.getOverlay().getSource().getFeatures().length) {
            tipPoint = geom;
            tipStyle.getText().setText(tip);
            styles.push(tipStyle);
        }
        return styles;
    }
}


