<template>
  <div id="map" :class="ind == 5 && tab != 2 && pos == 1 ? 'mapp' : ( ind == 5 && tab != 2 && pos == 0 ? 'mappp' : 'map' ) " ref="rootmap">
    <div id="zoomin" class="zoom" v-if="isShowZoomView">
      <!-- <img src="../../assets/images/max.png" alt="" />
      <img src="../../assets/images/min.png" alt="" /> -->
    </div>
    <div id="rotate" class="rotate" v-if="isShowRotateView"></div>
    <div id="fullscreen" v-if="isShowFullscreen"></div>
    <div id="overview" v-if="isShowOverview"></div>
    <div
      v-show="page0 == 1"
      id="map-capture"
      class="map-capture"
      @click="mapCapture('ok')"
      title="截图"
    >
      <img src="../../assets/icon/截图.png" alt />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import {
  Zoom,
  Rotate,
  FullScreen,
  OverviewMap,
  defaults as defaultControls,
} from "ol/control";
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from "ol/interaction";
import { Group as LayerGroup, Tile as TileLayer } from "ol/layer";

import Collection from "ol/Collection";
import XYZ from "ol/source/XYZ";
import {
  transform as Transform,
  addProjection,
  addCoordinateTransforms,
} from "ol/proj";
import EventConst, { OMEvent } from "./js/OMapEvent";
import { gcjMecator, projts } from "./js/gcj02";
// import PopupFeature from "ol-ext/overlay/PopupFeature";
import "ol-ext/dist/ol-ext.css";
import Select from "ol/interaction/Select";
import html2canvas from "html2canvas";

import Popup from "../../ols/overlay/popups2";
import "../../ols/overlay/Popup.css";

import QiuSuo1 from "@/ols/layer/qiusuo1";
import { mapActions, mapGetters } from "vuex";


export default {
  name: "omap",
  props: {
    //是否显示全屏
    isShowFullscreen: {
      type: Boolean,
      default: false,
    },
    //是否显示截屏
    isShowCapture: {
      type: Boolean,
      default: false,
    },
    //是否显放大缩小按钮
    isShowZoomView: {
      type: Boolean,
      default: true,
    },

    //是否显示旋转按钮
    isShowRotateView: {
      type: Boolean,
      default: true,
    },
    //是否显示鹰眼图
    isShowOverview: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      map: null,
      omEvent: {},
      overviewMapLayer: null,
      //底图个张图层 底图 国界线 标注层
      baselayer0: null,
      baselayer1: null,
      baselayer2: null,
      //默认图层原
      source0: null,
      source1: null,
      source2: null,

      select: null,
      popup: null,
    };
  },
  components: {},
  computed: {
      ...mapGetters({
          ind: "map/ind",
          tab: "map/tab",
          pos: "map/pos",
          page0: "page/page0"
          
      }),
  },
  // watch:{
  //   ind:{
  //     handler(v){
  //       if( v == 5){
  //         this.initMap()
  //         this.initBaseLayer1();
  //       }
  //     }
  //   }
  // },
  mounted() {
    this.omEvent = new OMEvent(this);
    console.log(this.omEvent);
    //投影变换 浩洋
    addProjection(gcjMecator());
    addCoordinateTransforms(
      "EPSG:4326",
      gcjMecator(),
      projts().ll2gmerc,
      projts().gmerc2ll
    );
    addCoordinateTransforms(
      "EPSG:3857",
      gcjMecator(),
      projts().smerc2gmerc,
      projts().gmerc2smerc
    );

    this.initMap();
    this.initBaseLayer();

    this.initTools();

    //对外报漏接口
    this.omEvent.on(EventConst.SWITCH_BASE_LAYER, this.switchBaseLayer);
    this.omEvent.on(EventConst.LU_WU_VISIBLE, this.lwLayerVisible);
    // const mapElement = this.$refs.rootmap;

    // if (this.ind === 5) {
    //   mapElement.style.zIndex = "9999";

    // }
  },
  methods: {
    initMap() {
      let map = new Map({
        target: "map",
        interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
        controls: defaultControls({
          attribution: false,
          zoom: false,
          rotate: false,
        }),
        view: new View({
          center: new Transform([98.89, 40.18], "EPSG:4326", "EPSG:3857"),
          zoom: 4,
          minZoom: 1,
          maxZoom: 18,
          projection: "EPSG:3857",
        }),
      });
      // HistoricalEQParameter-历史地震震源参数-点
      // RegionalPropagationPathDurationModel-区域传播路径持时模型-面
      // RegionalQualityFactor-区域品质因子-面
      // SourceRuptureModel-震源破裂模型-面
      // StationAndSiteAmplificationCoefficient-强震动台站及场地放大系数-点
      // let layer  = new QiuSuo1({
      //   layerName: 'SourceRuptureModel'
      // });
      // layer.setZIndex(100);
      // map.addLayer(layer);
      // layer.getSource().on("featuresloadend", function (e) {
      //   map.getView().fit(layer.getSource().getExtent(), {
      //     padding: [50, 50, 50, 300],
      //   });
      // });
      this.map = map;
      this.omEvent.setMap(map);
    },
    //初始化底图图层 三层
    initBaseLayer() {
      this.source0 = new XYZ({
        crossOrigin: "anonymous",
        url: "http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee",
      });
      this.source1 = new XYZ({
        crossOrigin: "anonymous",
        url: "http://t{0-7}.tianditu.com/DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee",
      });
      this.source2 = new XYZ({
        crossOrigin: "anonymous",
        // url: `http://t{0-7}.tianditu.com/DataServer?T=${this.$i18n.locale=='zh-CN'? 'c': 'e'}ia_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee`,
        // url:'http://t{0-7}.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=d21000f516e20e56b2a2b50596ecc1ee',
      });
      let baselayerGroup = new LayerGroup({
        minZoom: 1,
        maxZoom: 18,
      });

      this.baselayer0 = new TileLayer();
      this.baselayer1 = new TileLayer();
      this.baselayer2 = new TileLayer();

      let collection = new Collection();
      collection.push(this.baselayer0);
      collection.push(this.baselayer1);
      collection.push(this.baselayer2);
      baselayerGroup.setLayers(collection);
      this.baselayer0.setSource(this.source0);
      this.baselayer1.setSource(this.source1);
      this.baselayer2.setSource(this.source2);
    

      this.omEvent.addLayer(baselayerGroup);
    },

    //初始化地图上小工具
    initTools() {
      //放大缩小图片
      let zoom = new Zoom({
        target: "zoomin",
        zoomInTipLabel: "放大",
        zoomOutTipLabel: "缩小",
      });

      //指北针
      let rotateIcon = document.createElement("img");
      rotateIcon.src = "compass.png";
      rotateIcon.setAttribute("style", "width:30px;height:30px");
      let rotate = new Rotate({
        autoHide: false,
        label: rotateIcon,
        target: "rotate",
        tipLabel: "指北针",
      });
      //全屏
      let screen = new FullScreen({
        target: "fullscreen",
        tipLabel: "全屏",
        source: "map",
        // label:<img src='../assets/icon/full.png'/>
      });
      // 鹰眼图
      this.overviewMapLayer = new TileLayer();
      this.overviewMapLayer.setSource(this.source0);
      let overviewMapControl = new OverviewMap({
        className: "ol-overviewmap ol-custom-overviewmap",
        layers: [this.overviewMapLayer],
        collapseLabel: "\u00BB",
        label: "\u00AB",
        collapsed: false,
        rotateWithView: true,
        target: "overview",
        view: new View({
          projection: "EPSG:3857",
          maxZoom: 18,
          minZoom: 1,
        }),
      });

      if (this.isShowOverview) this.map.addControl(overviewMapControl);
      if (this.isShowFullscreen) this.map.addControl(screen);
      if (this.isShowZoomView) this.map.addControl(zoom);
      if (this.isShowRotateView) this.map.addControl(rotate);

      
      // // 添加删除判断
      // if (this.isShowOverview && this.ind !== 5) {
      //   this.map.addControl(overviewMapControl);
      // }
      // if (this.isShowFullscreen && this.ind !== 5) {
      //   this.map.addControl(screen);
      // }
      // if (this.isShowZoomView && this.ind !== 5) {
      //   this.map.addControl(zoom);
      // }
      // if (this.isShowRotateView && this.ind !== 5) {
      //   this.map.addControl(rotate);
      // }


      this.select = new Select({
        condition: function (mapBrowserEvent) {
          return (
            mapBrowserEvent.type == "singleclick" &&
            JSON.parse(localStorage.getItem("user"))
          );
        },
        hitTolerance: 5,
      });
      this.map.addInteraction(this.select);
      this.omEvent.setMapSelect(this.select);
      //属性弹窗
      let popup = new Popup({
        className: "ol-popup",
        select: this.select,
        showImage: true,
        canFix: true,
        closeBox: true,
        minibar: true,
        i18n: this.$i18n,
      });
      this.popup = popup;
      // this.popup.set('translateTitle', false);
      
      this.map.addOverlay(popup);
    },

    /**
     * 底图切换
     */
    switchBaseLayer(data) {
      let sources = data.sources;
      if (sources == null || sources == undefined || sources.length == 0)
        return;
      this.overviewMapLayer.setSource(sources[0]);
      this.baselayer0.setSource(sources[0]);

      if (sources[1] != undefined && sources[1] != null) {
        this.baselayer1.setSource(sources[1]);
        if (sources[1].opacity) {
          this.baselayer1.setOpacity(sources[1].opacity);
        }
      } else {
        this.baselayer1.setSource();
      }
      if (sources[2] != undefined && sources[2] != null) {
        this.baselayer2.setSource(sources[2]);
      } else {
        this.baselayer2.setSource();
      }
    },

    /**
     * 路网开关
     */
    lwLayerVisible(visible) {
      this.baselayer1.setVisible(visible);
      this.baselayer2.setVisible(visible);
    },

    // 截图功能隐藏
    // ignoreElementIds 截图时排除某个元素
    mapCapture(ignoreElementIds) {
      let canvasID = this.$refs.rootmap;
      let that = this;
      let imgText = 1;
      let a = document.createElement("a");
      html2canvas(canvasID, {
        ignoreElements: (element) => {
          if (
            element.id == "fullscreen" ||
            element.id == "overview" ||
            element.id == "map-capture"
          ) {
            return true;
          }
          if (ignoreElementIds.indexOf(element.id) != -1) return true;
        },
      }).then((canvas) => {
        let dom = document.body.appendChild(canvas);
        dom.style.display = "none";
        a.style.display = "none";
        document.body.removeChild(dom);
        // return
        let blob = that.dataURLToBlob(dom.toDataURL("image/png", 1));
        a.setAttribute("href", URL.createObjectURL(blob));
        //这块是保存图片操作  可以设置保存的图片的信息
        a.setAttribute("download", imgText + ".png");
        imgText += 1;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(blob);
        document.body.removeChild(a);
      });
    },
    //图片格式转换方法
    dataURLToBlob(dataurl) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },

    /**
     * 添加图层
     * isLocation 加载完是否跳转到图层位置
     */
    addLayer(layer, isLocation = true) {
      this.omEvent.addLayer(layer);
      if (isLocation) {
        this.locationLayer(layer);
      }
    },

    //删除某个图层
    removeLayer(layer) {
      this.omEvent.removeLayer(layer);
    },

    /**
     * 定位到某个图层
     */
    locationLayer(layer) {
      this.map.getView().fit(layer.getSource().getExtent());
      this.map
        .getView()
        .animate({ resolution: this.map.getView().getResolution() * 1.1 });
    },

    /**
     * 放大
     */
    zoomIn() {
      const zoom = this.map.getView().getZoom();
      this.map.getView().animate({
        zoom: zoom + 1,
        duration: 200,
      });
    },

    /**
     * 缩小
     */
    zoomOut() {
      const zoom = this.map.getView().getZoom();
      this.map.getView().animate({
        zoom: zoom - 1,
        duration: 200,
      });
    },

    /**
     * 旋转回正
     */
    rotateReset() {
      this.map.getView().animate({
        rotation: 0,
        duration: 200,
      });
    },
    /**
     * 返回map对象
     */
    getMap() {
      return this.map;
    },

    getMapSelect() {
      return this.select;
    },
  },
};
</script>

<style scoped>
.map {
  /* 不能用百分比 openlayer在窗口变化的时候会闪烁，不断加载切片 */
  min-height: 100%;
  /* height: 100vh; */
  position: relative;
  /* z-index: 9999;
  height: 863px;
  width: 771px;
  padding-top: 70px;
  margin-left: 1119px */
}
.mapp{
  position: relative;
  z-index: 999;
  height: 863px;
  width: 771px;
  padding-top: 70px;
  margin-left: 1119px
}
.mappp{
  position: relative;
  z-index: 999;
  height: 863px;
  width: 1013px;
  padding-top: 70px;
  margin-left: 877px
}
/deep/.ol-control{
    padding: 4px;
    background: rgba(255,255,255,0.8);
}
#zoomin {
  width: 40px;
  height: 82px;
  position: absolute;
  bottom: 198px;
  right: 16px;
  z-index: 888;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
}
#zoomin >>> .ol-control button {
  width: 40px;
  height: 40px;
  font-size: 28px;
  color: black;
  background: #fff;
  line-height: 20px
}
#zoomin >>> .ol-control {
  background-color: transparent;
  top: 0;
  left: 0;
  padding: 0;
}
#zoomin >>> .ol-zoom .ol-zoom-in {
  border-radius: 5px 5px 0 0;
}
#zoomin >>> .ol-zoom .ol-zoom-out {
  border-radius: 0 0 5px 5px;
}

#rotate >>> .ol-rotate {
  top: auto;
  bottom: 296px;
  right: 16px;
  z-index: 10;
  background: unset
}
#rotate >>> .ol-control button {
  width: 40px;
  height: 40px;
  margin: 0;
  color: #2c2c2c;
  /* background-color: #1b2544; */
  border-radius: 5px;
  /* border: 1px solid #1b2544; */
}
/* #rotate >>> .ol-control button:hover {
  width: 36px;
  height: 36px;
  margin: 0;
  color: #2c2c2c;
  background-color: #1b2544;
  border-radius: 5px;
  border: 1px solid rgb(76, 150, 247);
} */
#rotate >>> .ol-control {
  border-radius: 5px;
  padding: 0;
  z-index: 10;
}
/* 我新加入的 */
/deep/.ol-compass{
  display: -webkit-inline-box;
}
/deep/#rotate[data-v-0cfc450f] .ol-control button {
    border-radius: 20px;
}
/* 到上面结束 */

#fullscreen >>> .ol-control {
  padding: 0;
}
#fullscreen >>> .ol-full-screen {
  right: 26px;
  top: 300px;
  z-index: 10;
}
#fullscreen >>> .ol-control button {
  width: 36px;
  height: 36px;
  background-color: #fff;
  color: #181818;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
#fullscreen >>> .ol-control button:hover {
  width: 36px;
  height: 36px;
  background-color: #fff;
  color: #181818;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid rgb(76, 150, 247);
}
#fullscreen {
  padding: 0;
}
#overview >>> .ol-custom-overviewmap,
#overview >>> .ol-custom-overviewmap.ol-uncollapsible {
  bottom: 18px;
  left: auto;
  right: 18px;
  top: auto;
  z-index: 10;
}
#overview >>> .ol-custom-overviewmap:not(.ol-collapsed) {
  border: 1px solid #ffffff;
  border-radius: 10px;
  overflow: hidden
}
#overview >>> .ol-custom-overviewmap .ol-overviewmap-map {
  border: none;
  width: 148px;
  height: 97px;
}
#overview >>> .ol-custom-overviewmap .ol-overviewmap-box {
  border: 2px solid red;
}
#overview >>> .ol-custom-overviewmap:not(.ol-collapsed) button {
  bottom: 0;
  left: auto;
  right: 0px;
  top: auto;
  border-top: 15px solid transparent;
  border-left: 15px solid transparent;
  border-right: 15px solid #fff;
  border-bottom: 15px solid #fff;
  background: transparent;
  color: #2c2c2c;
}
#overview >>> .ol-control button {
  background-color: #fff;
  color: #2c2c2c;
}

#map >>> .ol-popup .ol-popup-content {
  min-width: 300px;
  max-width: 500px;
  font-size: 14px;
  color: #181818;
}

.map-capture {
  position: absolute;
  width: 36px;
  height: 36px;
  color: #2c2c2c;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  right: 26px;
  top: 120px;
  border: 1px solid #ccc;
}

/* .map-capture:hover {
  border: 1px solid rgb(76, 150, 247);
} */
.map-capture {
    width: 40px;
    height: 40px;
    right: 15px;
    top: 227px;
    border: none;
    cursor: pointer
}
/* .mapp{
  z-index: 999;
  height: 90vh
} */
</style>