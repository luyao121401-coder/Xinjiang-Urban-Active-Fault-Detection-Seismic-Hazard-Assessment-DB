<template>
  <div class="draw-container">
    <div class="draw-menu">
      <menu-item-btn
          @click.native="drawShape('Point')"
          :select="this.drawMode == 'Point'"
          :icon='icons.point'
          text="点缓冲区"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="drawShape('LineString')"
          :select="this.drawMode == 'LineString'"
          :icon='icons.line'
          text="线缓冲区"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="drawShape('Polygon')"
          :select="this.drawMode == 'Polygon'"
          :icon='icons.polygon'
          text="面缓冲区"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="closeDraw()"
          :icon='icons.close'
          text="关闭"
      ></menu-item-btn>
    </div>
  </div>
</template>

<script>
// 1. 静态导入图标，确保 Webpack 路径解析最稳
import queryPointIcon from "../../assets/img/query_point_icon.png";
import queryLineIcon from "../../assets/img/query_line_icon.png";
import queryPolygonIcon from "../../assets/img/query_polygon_icon.png";
import toolCloseIcon from "../../assets/img/tool_close_icon.png";

import EventConst,{OMEvent} from './js/OMapEvent'
import {LineString, Polygon, Circle, Point, LinearRing} from 'ol/geom';
import { fromCircle } from "ol/geom/Polygon"
import {getArea, getLength} from 'ol/sphere';
import { Circle as CircleStyle, Fill, Stroke, Style , Icon} from 'ol/style.js';
import {unByKey} from 'ol/Observable';
import { DrawTool } from "./js/DrawTool";
import MenuItemBtn from '../Map/MenuItemBtn.vue';

// 尝试引入 jsts
let jsts;
try {
  jsts = require("jsts");
} catch (e) {
  // 如果没有安装 jsts 库，缓冲区功能可能受限
  console.warn("请确保已安装 jsts 库: npm install jsts");
}

export default {
  data(){
    return {
      // 2. 将图标存入 data
      icons: {
        point: queryPointIcon,
        line: queryLineIcon,
        polygon: queryPolygonIcon,
        close: toolCloseIcon
      },
      omEvent: {},
      isPopOpen: false,
      isShowDrawEndPanel: false,
      isDrawClose: false,
      drawMode: '',
      ZDraw: null,
      popupSelect: null,
      drawEndResult: null,
      length: '',
      area: '',
      radius: '',
      latlon: '',
      drawTool: null,
      geomChangeListener: null,
      bufferDistance: 100,
      bufferUnit: "km",
      queryfeature: null,
      feature_clone: null
    }
  },
  components: {
    MenuItemBtn
  },
  mounted() {
    this.omEvent = new OMEvent(this)
    this.omEvent.on(EventConst.SWITCH_CHANGE_TOOL, (res) => {
      if (res != 'draw' && this.isDrawClose) {
        this.isPopOpen = false
        this.isShowDrawEndPanel = false
        this.popupSelect.values_.active = true
        this.drawTool.stopDraw()
        if (this.geomChangeListener) {
          unByKey(this.geomChangeListener)
          this.geomChangeListener = null
        }
        this.drawMode = ''
        this.isDrawClose = ''
      }
    })
    this.omEvent.on("bufferDistanceChange", this.bufferDistanceChange)
    this.omEvent.on("queryFeatureClose", this.close)
    setTimeout(() => {
      this.drawTool = new DrawTool(this.omEvent.getMap())
      this.popupSelect = this.omEvent.getMapSelect()
    }, 100);
  },
  methods: {
    drawShape(item) {
      this.radius = ''
      this.area = ''
      this.length = ''
      this.latlon = ''
      this.drawMode = item
      let type = item
      let freehand = false
      if (item.indexOf('freehand') == 0) {
        let arr = item.split(' ')
        type = arr[1]
        freehand = true
      }
      let drawStyle = new Style({
        fill: new Fill({color: 'rgba(255, 255, 255, 0.6)'}),
        stroke: new Stroke({color: '#66b1ff', width: 2}),
        image: new CircleStyle({radius: 7, fill: new Fill({color: '#ffcc33'})})
      });
      this.drawTool.startDraw({
        layerName: "空间查询临时图层",
        type: type,
        isFreehand: freehand,
        style: drawStyle,
        resultCallback: (res) => {
          this.queryfeature = res.feature;
          let bufferDistanceResult = this.bufferUnit == "km" ? this.bufferDistance * 1000 : this.bufferDistance;
          this.feature_clone = this.queryfeature.clone();
          this.queryfeature.setGeometry(this.buffer(this.feature_clone, bufferDistanceResult));
          this.omEvent.emit("queryFeatureChange", this.queryfeature)
        }
      })
      this.popupSelect.values_.active = false
      this.omEvent.emit("drawShapeChange", this.drawMode)
    },
    buffer(feature, length) {
      if (!jsts) return feature.getGeometry();
      const parser = new jsts.io.OL3Parser();
      parser.inject(Point, LineString, LinearRing, Polygon);
      let jstsgeom = parser.read(feature.getGeometry());
      let buffered = jstsgeom.buffer(length);
      return parser.write(buffered);
    },
    bufferDistanceChange(data) {
      this.bufferDistance = data.distance;
      this.bufferUnit = data.unit;
      let bufferDistanceResult = this.bufferUnit == "km" ? this.bufferDistance * 1000 : this.bufferDistance;
      this.queryfeature.setGeometry(this.buffer(this.feature_clone, bufferDistanceResult));
    },
    close() {
      this.isShowDrawEndPanel = false
      this.popupSelect.values_.active = true
      this.drawTool.stopDraw()
      if (this.geomChangeListener) {
        unByKey(this.geomChangeListener)
        this.geomChangeListener = null
      }
      this.drawMode = ''
      this.isDrawClose = ''
      this.drawTool.drawClear();
      this.$emit("close");
      this.omEvent.emit("queryFeatureChange", null)
    },
    closeDraw() {
      this.omEvent.emit("queryFeatureClose", "")
    }
  },
}
</script>

<style scoped>
.draw-container {
  position: absolute;
  z-index: 100;
  /* 确保容器宽度随内容变化，让 ProjectBrowse 的 left:50% 能精准对齐 */
  width: auto !important;
}

.draw-menu {
  background-color: #000000;
  opacity: 0.85;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  padding: 6px 12px; /* 增加左右间距增加美感 */
  height: 52px;
  /* 核心修复：确保内部元素水平和垂直轴线完全重合 */
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}

/* --- 强力修复逻辑：位置偏移 + 强制超亮白 --- */
/* 修复位置：强制重置偏移量，将图标拉回到组件中心 */
::v-deep .menu-item .img {
  position: relative !important;
  left: 0 !important;
  top: 0 !important;
  width: 20px !important;
  height: 20px !important;
  border: none !important;
  display: block !important;
  margin: 0 auto !important;
  /* 强制转白方案 */
  filter: brightness(0) invert(1) contrast(3) brightness(1.5) !important;
  -webkit-filter: brightness(0) invert(1) contrast(3) brightness(1.5) !important;
  object-fit: contain;
}

/* 选中状态逻辑 */
::v-deep .menu-item .imgSelect {
  filter: none !important;
  -webkit-filter: drop-shadow(rgb(76, 150, 247) 0 0) !important;
}

/* 确保图标包裹容器也是居中的 flex 容器 */
::v-deep .icon-wrapper {
  overflow: visible !important;
  width: 20px !important;
  height: 20px !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2px auto !important; /* 与文字保持等距并居中 */
}

/* 确保文字也是居中的 */
::v-deep .menu-item div {
  text-align: center !important;
  width: 100% !important;
}
</style>