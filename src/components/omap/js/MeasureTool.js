import 'ol/ol.css';
import {
    Circle as CircleStyle,
    Fill,
    RegularShape,
    Stroke,
    Style,
    Text,
} from 'ol/style';
import { Draw, Modify } from 'ol/interaction';
import { LineString, Point } from 'ol/geom';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { getArea, getLength } from 'ol/sphere';

const style = new Style({
    fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
    }),
    stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
    }),
    image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
    }),
});

const labelStyle = new Style({
    text: new Text({
        font: '14px Calibri,sans-serif',
        fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        padding: [3, 3, 3, 3],
        textBaseline: 'bottom',
        offsetY: -15,
    }),
    image: new RegularShape({
        radius: 8,
        points: 3,
        angle: Math.PI,
        displacement: [0, 10],
        fill: new Fill({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
    }),
});

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

const segmentStyle = new Style({
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
            color: 'rgba(0, 0, 0, 0.4)',
        }),
        padding: [2, 2, 2, 2],
        textBaseline: 'bottom',
        offsetY: -12,
    }),
    image: new RegularShape({
        radius: 6,
        points: 3,
        angle: Math.PI,
        displacement: [0, 8],
        fill: new Fill({
            color: 'rgba(0, 0, 0, 0.4)',
        }),
    }),
});

const segmentStyles = [segmentStyle];

export function MeasureTool(map) {
    //是否显示多段测量结果
    var showSegments = true
    //是否清除前次测量绘制
    var clearPrevious = true;
    //绘制类型
    var drawType = ""
    //提示点位置
    var tipPoint = null;
    
    var source = new VectorSource();
    var measureLayer = new VectorLayer({
        source: source,
        style: (feature) => {
            return styleFunction(feature, showSegments);
        },
    });

    var modify = new Modify({ source: source, style: modifyStyle });
    var draw = null;

    map.addLayer(measureLayer);
    map.addInteraction(modify);
    //判断测量图层是否已经添加到map中
    var layerIsAdd = true;

    /**
     * 测量长度
     */
    this.measureLength = function () {
        drawType = "LineString"
        source.clear()
        if (draw)
            map.removeInteraction(draw);
        if (!layerIsAdd) {
            map.addLayer(measureLayer);
            map.addInteraction(modify);
            layerIsAdd = true
        }
        addDrawInteraction()
    }

    /**
     * 测量面积
     */
    this.measureArea = function () {
        drawType = "Polygon"
        source.clear()
        if (draw)
            map.removeInteraction(draw);
        if (!layerIsAdd) {
            map.addLayer(measureLayer);
            map.addInteraction(modify);
            layerIsAdd = true
        }
        addDrawInteraction()
    }

    /**
     * 清除绘制的内容
     */
    this.measureClear = function () {
        source.clear();
    }

    /**
     * 关闭测量
     */
    this.measureClose = function () {
        if (draw)
            map.removeInteraction(draw);
        if (modify)
            map.removeInteraction(modify);
        if (measureLayer)
            map.removeLayer(measureLayer)
        layerIsAdd = false;
    }

    /**
     * 设置是否显示多段测量结果
     */
    this.setShowSegments = function (isShow) {
        showSegments = isShow
    }

    /**
     * 设置是否清除前次测量
     */
    this.setClearPrevious = function (isClear) {
        clearPrevious = isClear
    }

    var addDrawInteraction = function () {
        const activeTip = '双击结束测量';
        const idleTip = '点击开始测量';
        let tip = idleTip;
        draw = new Draw({
            source: source,
            type: drawType,
            style: (feature) => {
                return styleFunction(feature, showSegments, drawType, tip);
            },
        });
        draw.on('drawstart', function () {
            if (clearPrevious) {
                source.clear();
            }
            modify.setActive(false);
            tip = activeTip;
        });
        draw.on('drawend', function () {
            modifyStyle.setGeometry(tipPoint);
            modify.setActive(true);
            map.once('pointermove', function () {
                modifyStyle.setGeometry();
            });
            tip = idleTip;
        });
        modify.setActive(true);
        map.addInteraction(draw);
    }

    var styleFunction = function (feature, segments, drawType, tip) {
        const styles = [style];
        const geometry = feature.getGeometry();
        const type = geometry.getType();
        let point, label, line;
        if (!drawType || drawType === type) {
            if (type === 'Polygon') {
                point = geometry.getInteriorPoint();
                label = MeasureTool.formatArea(geometry);
                line = new LineString(geometry.getCoordinates()[0]);
            } else if (type === 'LineString') {
                point = new Point(geometry.getLastCoordinate());
                label = MeasureTool.formatLength(geometry);
                line = geometry;
            }
        }
        if (segments && line) {
            let count = 0;
            line.forEachSegment(function (a, b) {
                const segment = new LineString([a, b]);
                const label = MeasureTool.formatLength(segment);
                if (segmentStyles.length - 1 < count) {
                    segmentStyles.push(segmentStyle.clone());
                }
                const segmentPoint = new Point(segment.getCoordinateAt(0.5));
                segmentStyles[count].setGeometry(segmentPoint);
                segmentStyles[count].getText().setText(label);
                styles.push(segmentStyles[count]);
                count++;
            });
        }
        if (label) {
            labelStyle.setGeometry(point);
            labelStyle.getText().setText(label);
            styles.push(labelStyle);
        }
        if (
            tip &&
            type === 'Point' &&
            !modify.getOverlay().getSource().getFeatures().length
        ) {
            tipPoint = geometry;
            tipStyle.getText().setText(tip);
            styles.push(tipStyle);
        }
        return styles;
    }
}

/**
 * 测量距离并格式化
 */
MeasureTool.formatLength = function (line) {
    const length = getLength(line);
    let output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' km';
    } else {
        output = Math.round(length * 100) / 100 + ' m';
    }
    return output;
};

/**
 * 测量面积并格式化
 */
MeasureTool.formatArea = function (polygon) {
    const area = getArea(polygon);
    let output;
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' km\xB2';
    } else {
        output = Math.round(area * 100) / 100 + ' m\xB2';
    }
    return output;
};

