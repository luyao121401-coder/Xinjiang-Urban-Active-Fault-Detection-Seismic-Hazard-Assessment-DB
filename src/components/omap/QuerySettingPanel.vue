<template>
  <div class="query-setting-container" v-if="isShowQuerySettingPanel">
    <div class="qurey-panel">
      <div class="layers">
        <div class="buffer-div">
          <div style="font-size: 16px">缓冲距离</div>
          <el-select
            size="small"
            v-model="bufferUnit"
            style="width: 88px; height: 28px"
            @change="onBufferUnitChange"
          >
            <el-option value="km">千米</el-option>
            <el-option value="m">米</el-option>
          </el-select>
        </div>
        <el-input
          placeholder="请输入距离"
          v-model="bufferDistance"
          style="height: 28px; margin-top: 10px"
          @change="onBufferDistanceChange"
        />
      </div>
      <div class="layers">
        <div style="margin-top: 20px; font-size: 16px; margin-bottom: 10px">
          查询图层
        </div>
        <el-select
          placeholder="请选择要查询的图层"
          v-model="layerValue"
          style="width: 240px; height: 36px"
          @change="onSelectLayerChange"
        >
          <el-option
            v-for="(layer, index) in layers"
            v-show="layer.values_.visible == true ? 1 : 0"
            :value="layer.name"
            :key="index"
          >
            {{ layer.name }}
          </el-option>
        </el-select>
      </div>
      <div class="btn">
        <span @click="cancel()" class="btnquxiao">取消</span>
        <span @click="query()" class="btnqueding">查询</span>
      </div>
    </div>
  </div>
</template>

<script>
import { OMEvent } from "./js/OMapEvent";
import GeoJSON from "ol/format/GeoJSON";
import intersects from "@turf/boolean-intersects";

export default {
  data() {
    return {
      omEvent: null,
      bufferDistance: 100,
      bufferUnit: "km",
      queryFeature: null,
      layerValue: null,
      isShowQuerySettingPanel: false,
      selectlayer: null,
    };
  },

  mounted() {
    this.omEvent = new OMEvent(this);
    this.omEvent.on("queryFeatureChange", this.queryFeatureChange);
  },

  computed: {
    layers: function () {
      let lyrs = [];
      if (this.omEvent != null) {
        let tempLayers = this.omEvent.getMap().getLayers().array_;
        lyrs = tempLayers.slice(3);
        for (let i = 0; i < lyrs.length; i++) {
          if (lyrs[i].name == "空间查询临时图层") {
            lyrs.splice(i, 1);
            i--;
          }
        }
      }
      window.console.log(lyrs);
      return lyrs;
    },
  },

  methods: {
    queryFeatureChange(feature) {
      this.queryFeature = feature;
      if (feature == null) {
        this.isShowQuerySettingPanel = false;
        this.bufferDistance = 100
        this.bufferUnit = "km";
        this.layerValue = null;
        this.selectlayer = null;
      } else {
        this.isShowQuerySettingPanel = true;
      }
    },

    onBufferUnitChange(value) {
      this.bufferUnit = value;
      this.omEvent.emit("bufferDistanceChange", {
        distance: this.bufferDistance,
        unit: this.bufferUnit,
      });
    },

    // 改变缓冲距离
    onBufferDistanceChange(val) {
      this.bufferDistance = val;
      this.omEvent.emit("bufferDistanceChange", {
        distance: this.bufferDistance,
        unit: this.bufferUnit,
      });
    },

    onSelectLayerChange(value) {
      this.layers.map((item) => {
        if (item.name == value) {
          this.selectlayer = item;
        }
      });
    },

    cancel() {
      this.selectlayer = null;
      this.isShowQuerySettingPanel = false;
      this.omEvent.emit("queryFeatureClose", "");
    },

    query() {
      if (this.selectlayer == null) {
        this.$message.info("请选择查询图层");
        return;
      }

      if (this.queryFeature == null) {
        this.$message.info("请绘制查询范围");
        return;
      }

      var format = new GeoJSON();
      let selfea = format.writeFeatureObject(this.queryFeature);
      let source = this.selectlayer.getSource();
      let arrs = [];
      source.forEachFeature((feature) => {
        let bsfea = format.writeFeatureObject(feature);
        let bool = intersects(selfea, bsfea);
        if (bool) {
          arrs.push(feature.values_);
        }
      });

      arrs.map((item) => {
        if (item.faultname) {
          let alias =
            this.selectlayer._popupTemplate.attributes.cfeature.format(
              item.cfeature
            );
          item["名称"] = item.faultname;
          item["性质"] = alias;
        }
      });

      let data = null;
      let columns = null;
      if (arrs[0]) {
        if (arrs[0].location) {
          arrs.map((item) => {
            item["震级"] = item.M;
            item["时间"] = item.date;
            item["地点"] = item.location;
            item["纬度"] = item.Lat;
            item["经度"] = item.Lon;
            item["深度"] = item.depth;
          });
          columns = Object.keys(arrs[0]);
        } else {
          columns = Object.keys(arrs[0]);
        }
      }
      if (arrs[0]._style_) {
        let datas = [];
        arrs.map((item) => {
          let obj = {};
          obj["名称"] = item.name;
          obj["描述"] = item.desc;
          datas.push(obj);
        });
        data = datas;
        columns = Object.keys(datas[0]);
      } else {
        data = arrs;
      }
      this.omEvent.emit("queryTable", {
        queryResultData: data,
        queryResultColumns: columns,
        queryLayerName: this.selectlayer.name,
      });
    },
  },
};
</script>

<style scoped>
.query-setting-container {
  position: absolute;
  z-index: 10;
}

.qurey-panel {
  font-size: 18px;
  color: #181818;
  font-weight: 400;
  background-color: white;
  border-radius: 10px;
  width: 240px;
  margin-right: 10px;
  padding-bottom: 15px;
  padding: 16px 16px 6px 16px;
}

.buffer-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 8px;
}

.btnquxiao {
  width: 110px;
  height: 32px;
  background: rgba(37, 55, 103, 0.1);
  border-radius: 30px;
  font-size: 14px;
  color: rgba(37, 55, 103, 1);
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.btnqueding {
  width: 110px;
  height: 32px;
  background: #1b2544;
  border-radius: 30px;
  font-size: 14px;
  color: #ffffff;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 20px;
}
</style>