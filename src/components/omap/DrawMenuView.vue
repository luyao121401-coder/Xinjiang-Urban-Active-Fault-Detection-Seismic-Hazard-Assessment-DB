<template>
  <div class="draw-container">
    <div class="draw-menu">
      <menu-item-btn
        @click.native="drawShape('Point')"
        :select="this.drawMode == 'Point'"
        :icon="require('../../assets/img/draw_point_icon.png')"
        text="标绘"
      ></menu-item-btn>
      <menu-item-btn
        @click.native="drawShape('LineString')"
        :select="this.drawMode == 'LineString'"
        :icon="require('../../assets/img/draw_line_icon.png')"
        text="折线"
      ></menu-item-btn>
      <menu-item-btn
        @click.native="drawShape('Box')"
        :select="this.drawMode == 'Box'"
        :icon="require('../../assets/img/draw_square_icon.png')"
        text="矩形"
      ></menu-item-btn>
      <menu-item-btn
        @click.native="drawShape('Circle')"
        :select="this.drawMode == 'Circle'"
        :icon="require('../../assets/img/draw_circle_icon.png')"
        text="圆"
      ></menu-item-btn>
      <menu-item-btn
        @click.native="drawShape('Polygon')"
        :select="this.drawMode == 'Polygon'"
        :icon="require('../../assets/img/draw_qpol_icon.png')"
        text="多边形"
      ></menu-item-btn>
      <menu-item-btn
        @click.native="clearPre()"
        :icon="require('../../assets/img/draw_clear_pre_icon.png')"
        text="删除上一个"
      ></menu-item-btn>
      <menu-item-btn
        @click.native="clearDraw()"
        :icon="require('../../assets/img/tool_clear_icon.png')"
        text="清空"
      ></menu-item-btn>
      <menu-item-btn
        @click.native="closeDraw()"
        :icon="require('../../assets/img/tool_close_icon.png')"
        text="关闭"
      ></menu-item-btn>
    </div>
  </div>
</template>

<script>
import EventConst, { OMEvent } from "./js/OMapEvent";
import { LineString, Polygon, Circle, Point } from "ol/geom";
import { fromCircle } from "ol/geom/Polygon";
import { getArea, getLength } from "ol/sphere";
// import Select from "ol/interaction/Select";
// import DrawEndPanel from './DrawEndPanel'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style.js";
import { unByKey } from "ol/Observable";
import { transform as Transform } from "ol/proj";
import { DrawTool } from "./js/DrawTool";
import MenuItemBtn from "../Map/MenuItemBtn.vue";
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      omEvent: {},
      isPopOpen: false,
      isShowDrawEndPanel: false,
      //画图结束
      isDrawClose: false,
      drawMode: "",
      ZDraw: null,
      popupSelect: null,
      drawEndResult: null,
      //长度 面积 圆半径
      length: "",
      area: "",
      radius: "",
      latlon: "",
      drawTool: null,

      geomChangeListener: null,
    };
  },
  components: {
    //  DrawEndPanel,
    MenuItemBtn,
  },
  computed:{
    ...mapGetters({
      ind: "map/ind"
    })
  },
  mounted() {
    this.omEvent = new OMEvent(this);

    this.omEvent.on(EventConst.SWITCH_CHANGE_TOOL, (res) => {
      if (res != "draw" && this.isDrawClose) {
        this.isPopOpen = false;
        this.isShowDrawEndPanel = false;
        this.popupSelect.values_.active = true;
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
    showDrawPop() {
      this.isDrawClose = !this.isDrawClose;
      if (!this.isDrawClose) {
        this.isPopOpen = false;
        this.isShowDrawEndPanel = false;
        this.popupSelect.values_.active = true;
        this.drawTool.stopDraw();
        if (this.geomChangeListener) {
          unByKey(this.geomChangeListener);
          this.geomChangeListener = null;
        }
      } else {
        this.omEvent.emit(EventConst.SWITCH_CHANGE_TOOL, "draw");
        this.isPopOpen = true;
        this.popupSelect.values_.active = false;
      }

      if (!this.isPopOpen) {
        this.drawMode = "";
      }
    },

    clear() {
      this.drawMode = "";
    },

    drawShape(item) {
      console.log(this.$parent.$parent);
      this.$parent.$parent.drawStyle = true;
      this.radius = "";
      this.area = "";
      this.length = "";
      this.latlon = "";
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
          // this.drawTool.pauseDraw()
          let geom = res.feature.getGeometry();
          //点处理投影
          if (geom instanceof Point) {
            let sourceProj = this.omEvent.getMap().getView().getProjection();
            let point = null;
            if (sourceProj.getCode() == "EPSG:4326") {
              point = res.coordinate;
            } else {
              point = new Transform(
                res.coordinate,
                sourceProj.getCode(),
                "EPSG:4326"
              );
            }
            this.latlon = point[0].toFixed(5) + "," + point[1].toFixed(5);
          }

          this.measure(geom);

          let that = this;
          this.geomChangeListener = res.feature
            .getGeometry()
            .on("change", function (evt) {
              var geom = evt.target;
              that.measure(geom);
            });

          this.drawEndResult = res;
          this.isShowDrawEndPanel = true;
          this.isPopOpen = false;
        },
      });

      this.popupSelect.values_.active = false;
      this.omEvent.emit("drawShapeChange", this.drawMode);
    },

    changStyle(style) {
      let newStyle;
      if (this.drawMode == "Point") {
        newStyle = new Style({
          zIndex: 1,
          fill: new Fill({
            color: style.fillColor,
          }),
          stroke: new Stroke({
            color: style.strokeColor,
            width: style.lineSize,
            lineDash: style.lineDash,
          }),
          image: new Icon({
            src: style.image,
            scale: 0.5,
            color: style.imageColor,
          }),
        });
      } else {
        newStyle = new Style({
          zIndex: 1,
          fill: new Fill({
            color: style.fillColor,
          }),
          stroke: new Stroke({
            color: style.strokeColor,
            width: style.lineSize,
            lineDash: style.lineDash,
          }),
          image: new CircleStyle({
            radius: style.lineSize,
            fill: new Fill({
              color: style.fillColor,
            }),
            stroke: new Stroke({
              color: style.strokeColor,
            }),
          }),
        });
      }
      this.drawTool.setStyle(newStyle);
    },

    measure(geom) {
      if (geom instanceof Polygon) {
        this.area = this.measureArea(geom);
        this.length = this.measureLength(
          new LineString(geom.getLinearRing(0).getCoordinates())
        );
      } else if (geom instanceof LineString) {
        this.length = this.measureLength(geom);
      } else if (geom instanceof Circle) {
        // let circlePolygonFeature = res.feature.clone()
        let circlePolygon = fromCircle(geom.clone());
        this.area = this.measureArea(circlePolygon);
        let radiusNum = geom.getRadius();
        if (radiusNum > 100) {
          this.radius = Math.round((radiusNum / 1000) * 100) / 100 + " " + "km";
        } else {
          this.radius = Math.round(radiusNum * 100) / 100 + " " + "m";
        }
      }
    },

    measureLength(line) {
      let sourceProj = this.omEvent.getMap().getView().getProjection();
      let length = getLength(line, { projection: sourceProj });
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        output = Math.round(length * 100) / 100 + " " + "m";
      }
      return output;
    },

    measureArea(polygon) {
      let sourceProj = this.omEvent.getMap().getView().getProjection();
      let area = getArea(polygon, { projection: sourceProj });
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + " " + "km²";
      } else {
        output = Math.round(area * 100) / 100 + " " + "m²";
      }
      return output;
    },

    clearDraw() {
      this.drawTool.drawClear();
    },

    closeDraw() {
      this.$parent.$parent.drawStyle = false;
      this.isShowDrawEndPanel = false;
      this.popupSelect.values_.active = true;
      this.drawTool.stopDraw();
      if (this.geomChangeListener) {
        unByKey(this.geomChangeListener);
        this.geomChangeListener = null;
      }
      this.drawMode = "";
      this.isDrawClose = "";
      this.$emit("close");
    },

    clearPre() {
      this.drawTool.clearPreFeature();
    },
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
  opacity: 0.7;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  padding: 6px;
  /* height: 40px; */
  height: 52px;
  width: 100%;
  align-items: center;
}
.widden{
  width: 415px!important
}
.draw-button {
  width: 36px;
  height: 36px;
  color: #2c2c2c;
  background-color: #1b2544;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}

.draw-button:hover {
  width: 36px;
  height: 36px;
  color: #2c2c2c;
  background-color: #1b2544;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(76, 150, 247);
}

.img-btn {
  padding: 10px;
}
</style>