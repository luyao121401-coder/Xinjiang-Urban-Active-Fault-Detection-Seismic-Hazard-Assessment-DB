<template>
  <div class="draw-container">
    <div class="draw-menu">
      <menu-item-btn
          @click.native="drawShape('Point')"
          :select="drawMode == 'Point'"
          :icon="icons.point"
          text="标绘"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="drawShape('LineString')"
          :select="drawMode == 'LineString'"
          :icon="icons.line"
          text="折线"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="drawShape('Box')"
          :select="drawMode == 'Box'"
          :icon="icons.square"
          text="矩形"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="drawShape('Circle')"
          :select="drawMode == 'Circle'"
          :icon="icons.circle"
          text="圆"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="drawShape('Polygon')"
          :select="drawMode == 'Polygon'"
          :icon="icons.polygon"
          text="多边形"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="clearPre()"
          :icon="icons.clearPre"
          text="删除上一个"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="clearDraw()"
          :icon="icons.clear"
          text="清空"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="closeDraw()"
          :icon="icons.close"
          text="关闭"
      ></menu-item-btn>
    </div>
  </div>
</template>

<script>
// 使用 @ 别名导入图片，确保路径解析最稳定
import pointIcon from "@/assets/img/draw_point_icon.png";
import lineIcon from "@/assets/img/draw_line_icon.png";
import squareIcon from "@/assets/img/draw_square_icon.png";
import circleIcon from "@/assets/img/draw_circle_icon.png";
import polygonIcon from "@/assets/img/draw_qpol_icon.png";
import clearPreIcon from "@/assets/img/draw_clear_pre_icon.png";
import toolClearIcon from "@/assets/img/tool_clear_icon.png";
import toolCloseIcon from "@/assets/img/tool_close_icon.png";

import EventConst, { OMEvent } from "./js/OMapEvent";
import { LineString, Polygon, Circle, Point } from "ol/geom";
import { fromCircle } from "ol/geom/Polygon";
import { getArea, getLength } from "ol/sphere";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style.js";
import { unByKey } from "ol/Observable";
import { transform as Transform } from "ol/proj";
import { DrawTool } from "./js/DrawTool";
import MenuItemBtn from "../Map/MenuItemBtn.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      icons: {
        point: pointIcon,
        line: lineIcon,
        square: squareIcon,
        circle: circleIcon,
        polygon: polygonIcon,
        clearPre: clearPreIcon,
        clear: toolClearIcon,
        close: toolCloseIcon,
      },
      omEvent: {},
      isPopOpen: false,
      isShowDrawEndPanel: false,
      isDrawClose: false,
      drawMode: "",
      ZDraw: null,
      popupSelect: null,
      drawEndResult: null,
      length: "",
      area: "",
      radius: "",
      latlon: "",
      drawTool: null,
      geomChangeListener: null,
    };
  },
  components: {
    MenuItemBtn,
  },
  computed: {
    ...mapGetters({
      ind: "map/ind",
    }),
  },
  mounted() {
    this.omEvent = new OMEvent(this);
    this.omEvent.on(EventConst.SWITCH_CHANGE_TOOL, (res) => {
      if (res != "draw" && this.isDrawClose) {
        this.isPopOpen = false;
        this.isShowDrawEndPanel = false;
        if (this.popupSelect) this.popupSelect.values_.active = true;
        this.drawTool.stopDraw();
        if (this.geomChangeListener) {
          unByKey(this.geomChangeListener);
          this.geomChangeListener = null;
        }
        this.drawMode = "";
        this.isDrawClose = "";
      }
    });

    this.omEvent.on("styleChange", this.changStyle);
    setTimeout(() => {
      this.drawTool = new DrawTool(this.omEvent.getMap());
      this.drawTool.setClearPrevious(false);
      this.popupSelect = this.omEvent.getMapSelect();
    }, 100);
  },
  methods: {
    drawShape(item) {
      this.$parent.$parent.drawStyle = true;
      this.drawMode = item;
      let type = item;
      let freehand = false;
      if (item.indexOf("freehand") == 0) {
        let arr = item.split(" ");
        type = arr[1];
        freehand = true;
      }
      this.drawTool.startDraw({
        type: type,
        isFreehand: freehand,
        resultCallback: (res) => {
          let geom = res.feature.getGeometry();
          this.measure(geom);
          let that = this;
          this.geomChangeListener = res.feature.getGeometry().on("change", function (evt) {
            that.measure(evt.target);
          });
          this.drawEndResult = res;
          this.isShowDrawEndPanel = true;
          this.isPopOpen = false;
        },
      });
      if (this.popupSelect) this.popupSelect.values_.active = false;
      this.omEvent.emit("drawShapeChange", this.drawMode);
    },
    changStyle(style) {
      let newStyle;
      if (this.drawMode == "Point") {
        newStyle = new Style({
          zIndex: 1,
          image: new Icon({
            src: style.image,
            scale: 0.5,
            color: style.imageColor,
          }),
        });
      } else {
        newStyle = new Style({
          zIndex: 1,
          fill: new Fill({color: style.fillColor}),
          stroke: new Stroke({color: style.strokeColor, width: style.lineSize}),
        });
      }
      this.drawTool.setStyle(newStyle);
    },
    measure(geom) {
      if (geom instanceof Polygon) {
        this.area = this.measureArea(geom);
      } else if (geom instanceof LineString) {
        this.length = this.measureLength(geom);
      }
    },
    measureLength(line) {
      let sourceProj = this.omEvent.getMap().getView().getProjection();
      let length = getLength(line, {projection: sourceProj});
      return length > 100 ? Math.round((length / 1000) * 100) / 100 + " km" : Math.round(length * 100) / 100 + " m";
    },
    measureArea(polygon) {
      let sourceProj = this.omEvent.getMap().getView().getProjection();
      let area = getArea(polygon, {projection: sourceProj});
      return area > 10000 ? Math.round((area / 1000000) * 100) / 100 + " km²" : Math.round(area * 100) / 100 + " m²";
    },
    clearDraw() {
      this.drawTool.drawClear();
    },
    clearPre() {
      this.drawTool.clearPreFeature();
    },
    closeDraw() {
      this.$parent.$parent.drawStyle = false;
      this.isShowDrawEndPanel = false;
      if (this.popupSelect) this.popupSelect.values_.active = true;
      this.drawTool.stopDraw();
      this.drawMode = "";
      this.$emit("close");
    }
  },
};
</script>

<style scoped>
.draw-container {
  position: absolute;
  z-index: 10;
}

.draw-menu {
  background-color: #000000;
  opacity: 0.85;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  padding: 8px;
  height: 52px;
  width: auto;
  align-items: center;
}

/* 强力修复：彻底覆盖 MenuItemBtn 的内部干扰样式 */
::v-deep .menu-item .img {
  position: relative !important; /* 强制改回相对定位，防止 left: -20px 生效 */
  left: 0 !important;
  width: 20px !important;
  height: 20px !important;
  border: none !important;
  display: block !important;
  /* 强制变白：如果图片是黑色的，反转它；如果是彩色的，也会变色但至少能看见 */
  filter: brightness(0) invert(1) !important;
  -webkit-filter: brightness(0) invert(1) !important;
}

/* 选中状态的特殊处理：既然父组件强行变白了，选中时我们让它变蓝 */
::v-deep .menu-item .imgSelect {
  filter: none !important;
  -webkit-filter: drop-shadow(rgb(76, 150, 247) 0 0) !important;
}

/* 确保容器不裁剪 */
::v-deep .icon-wrapper {
  overflow: visible !important;
  width: 20px !important;
  height: 20px !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>