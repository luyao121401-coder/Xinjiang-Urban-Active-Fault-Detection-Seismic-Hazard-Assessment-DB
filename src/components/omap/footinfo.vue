<template>
  <div class="info">
    <div>
      <!-- <span style="margin-left:10px">当前底图类型：{{type}}</span> -->
      <span style="margin-left: 20px">经度：{{ lon }},&nbsp;&nbsp;</span>
      <span style="">纬度：{{ lat }}</span>
      <span style="margin-left: 10px">版权单位：新疆维吾尔自治区地震局</span>
      <span style="margin-left: 10px">技术支持：第四纪数字地球(北京)科技有限公司</span>
      <!-- <span style="margin-left:50px">级别：{{level}}</span> -->
      <!-- <span style="margin-left: 20px">比例尺：{{ scasle }}</span>
      <span style="margin-left: 0px" id="scale"></span> -->
    </div>
  </div>
</template>

<script>
import { transform as Transform } from "ol/proj";
import EventConst, { OMEvent } from "./js/OMapEvent";
import { ScaleLine } from "ol/control";

export default {
  name: "footinfo",
  props: {
    copyright: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      type: "天地图",
      lat: "0.0000",
      lon: "0.0000",
      level: 0,
      scale: "",
      omEvent: {},
      map: Object,
      view: Object,
    };
  },
  mounted() {
    this.omEvent = new OMEvent(this);
    this.omEvent.on(EventConst.SWITCH_BASE_LAYER, this.switchBaseLayer);

    setTimeout(() => {
      this.map = this.omEvent.getMap();
      this.view = this.map.getView();
      // 底图类型在地图中
      // this.type = this.map.getLayers().array_[0].type
      // 缩放级别根据view的变化改变
      this.view.on("change", (evt) => {
        this.level = Math.floor(evt.target.getZoom());
      });
      // 经纬度跟随鼠标移动改变
      this.map.on("pointermove", (evt) => {
        let coo = new Transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
        var coo1, coo0;
        if (coo[1] >= 0) {
          coo1 = coo[1].toFixed(4) + "N";
        } else if (coo[1] < 0) {
          coo1 = Math.abs(coo[1].toFixed(4)) + "S";
        }
        if (coo[0] >= 0) {
          coo0 = coo[0].toFixed(4) + "E";
        } else if (coo[0] < 0) {
          coo0 = Math.abs(coo[0].toFixed(4)) + "W";
        }
        this.lat = coo1;
        this.lon = coo0;
      });

      let scaleControl = new ScaleLine({
        units: "metric",
        target: "scale",
        maxWidth: 125,
        minWidth: 120,
      });
      // this.map.addControl(scaleControl);
    }, 0);
  },

  methods: {
    switchBaseLayer(data) {
      this.type = data.name;
    },
  },
};
</script>

<style scoped>
.info {
  height: 28px;
  background: rgba(255, 255, 255, 0.9);
  color: black;
  font-size: 14px;
  line-height: 28px;
  position: absolute;
  z-index: 11;
  bottom: 0px;
  /* width: 700px; */
  /* margin-left: 326px; */
  right: 200px;
  margin-bottom: 16px;
  padding-right: 150px;
}
#scale {
  width: 200px;
  position: absolute;
  bottom: 0px;
}
#scale >>> .ol-scale-line {
  bottom: 7px;
  /* left: 75px; */
  /* padding-bottom: 10px; */
  background: transparent;
}
#scale >>> .ol-scale-line-inner {
  height: 12px;
  line-height: 10px;
  font-size: 14px;
  /* padding-bottom: 5px; */
  border: 1px solid #000;
  border-top: none;
  color: #000;
  margin: 0;
  width: 100px!important
}

</style>