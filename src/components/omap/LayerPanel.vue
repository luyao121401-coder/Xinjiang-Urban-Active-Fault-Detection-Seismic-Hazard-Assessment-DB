<template>
  <div class="layer-container">
    <div class="layer-tab">
      <div class="tab">
        <div
          @click="selectTab(1)"
          :class="{ tabItemSelect: tabActive == 1, tabItem: tabActive != 1 }"
        >
          专题数据
        </div>
        <div
          @click="selectTab(2)"
          :class="{ tabItemSelect: tabActive == 2, tabItem: tabActive != 2 }"
        >
          在线图层
        </div>
        <div
          @click="selectTab(3)"
          :class="{ tabItemSelect: tabActive == 3, tabItem: tabActive != 3 }"
        >
          本地数据
        </div>
        <div @click="close()" class="close">x</div>
      </div>
      <div v-show="tabActive == 1" class="layer-zt">
        <el-tree
          :data="ztData"
          :indent="10"
          ref="tree"
          show-checkbox
          :check-strictly="true"
          node-key="name"
          @node-click="handleTreeClick"
          @check-change="treeCheckedChange"
          :render-content="renderContent"
        >
        </el-tree>
      </div>
      <div v-show="tabActive == 2" class="layer-line">
        <ul class="layer-line-list">
          <li v-for="item in customlayer" :key="item.layer.ol_uid">
            <div class="line-li-div">
              <el-checkbox @change="changecheck(item)" v-model="item.status">{{
                item.name
              }}</el-checkbox>
              <img
                class="img"
                src="../../assets/img/draw_clear_pre_icon.png"
                alt
                @click="deleteLineItem(item)"
              />
            </div>
          </li>
        </ul>

        <div @click="addLineLayer()" class="addBtn">点击添加自定义图层</div>
      </div>

      <div v-show="tabActive == 3" class="layer-local">
        <ul class="layer-local-list">
          <li v-for="item in locallayer" :key="item.layer.ol_uid">
            <el-checkbox @change="changecheck(item)" v-model="item.status">{{
              item.name
            }}</el-checkbox>
          </li>
        </ul>

        <div @click="addLocalLayer()" class="addBtn">点击添加本地图层</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { OMEvent } from "./js/OMapEvent";
import { getLayerData } from "@/http/api/api-lhy";
import CustomTile from "../../ols/layer/customTile";

export default {
  data() {
    return {
      tabActive: 1,
      treeClickCount: 0,
      treeClickNodeIds: [],
      ztData: [
        {
          name: "dqwl",
          label: "地球物理",
          children: [
            { name: "GravityField", label: "重力场" },
            { name: "AviationMagnetic", label: "航磁" },
            { name: "CrustLithospericStructure", label: "壳幔结构" },
            { name: "Station", label: "地震台站" },
            { name: "CrustIsoline", label: "地壳厚度" },
            { name: "GeophySvyLine", label: "地球物理测线" },
            { name: "GeophySvyPoint", label: "地球物理测点" },
            { name: "GeophySvyFaultPoint", label: "地球物理探测断点" },
            { name: "GNSSStation", label: "GNSSS" },
            { name: "HorizontalDeformation", label: "水平形变" },
            { name: "VerticalDeformation", label: "垂直形变" },
            { name: "RelocationISCatalog", label: "小震重新定位目录" },
            { name: "ISCatalog", label: "1970年以来地震目录" },
            {
              name: "StrongSeismicCatalog",
              label: "1970年前4 3_4以上强震目录",
            },
            { name: "Ug3DGridPoint", label: "三维地下结构模型层面构架点" },
            { name: "Ug3DMeshLattice", label: "3D地下结构离散化模型点" },
            { name: "MaterialPolygonLayer_G", label: "面状资料图层" },
            { name: "StressField", label: "应力场" },
          ],
        },
        {
          name: "zksj",
          label: "钻孔数据",
          children: [
            { name: "StraIsoline", label: "地层等厚线" },
            { name: "DrillHole", label: "钻孔" },
            { name: "DrillFaultPoint", label: "跨断层钻探断点" },
            { name: "DrillProfile", label: "跨断层钻探剖面" },
            { name: "CollectedDrillHole", label: "收集钻孔" },
            { name: "MaterialPolygonLayer_D", label: "面状资料图层" },
          ],
        },
        {
          name: "gzbj",
          label: "构造背景",
          children: [
            { name: "SeismicZone", label: "地震区" },
            { name: "SeismicBelt", label: "地震带" },
            { name: "PotentialSourceRegion", label: "潜在震源区分布" },
            { name: "IntensityRegion", label: "烈度区" },
            { name: "IsoseismalLine", label: "等震线" },
            { name: "Fault", label: "断裂" },
            { name: "FaultAttitude", label: "断层产状" },
            { name: "Fold", label: "褶皱" },
            { name: "FractureBelt", label: "避让带表" },
            { name: "EpiMechanismResult", label: "震源机制解数据" },
            { name: "GeomorphySvyPoint", label: "微地貌测量点" },
            { name: "GeomorphySvyLine", label: "微地貌测量线" },
            { name: "GeomorphySvyRegion", label: "微地貌测量面" },
            { name: "GeomorStation", label: "微地貌测量基站点" },
            { name: "MaterialPolygonLayer_S", label: "面状资料图层" },
          ],
        },
        {
          name: "jcdz",
          label: "基础地质",
          children: [
            { name: "MaterialPolygonLayer_B", label: "面状资料图层" },
            { name: "Stratigraphy", label: "地层" },
            { name: "StratigraphyLine", label: "地层线" },
            { name: "StraAttitude", label: "地层产状" },
            { name: "Rock", label: "岩体" },
            { name: "GeomorphySvyRegion_B", label: "微地貌测量面" },
            { name: "ImageIndexLayer", label: "影像索引表" },
            { name: "RSInterpretationLine", label: "航、卫片解译线" },
            { name: "RSInterpretationPolygon", label: "航、卫片解译面" },
            { name: "Geomorphy", label: "地貌面" },
            { name: "GeomorphyLine", label: "地貌线" },
            { name: "GeomorphyPoint", label: "地貌点" },
            { name: "Basin", label: "盆地" },
            { name: "StraIsoline_B", label: "地层等厚线" },
            { name: "RockLine", label: "岩体线" },
          ],
        },
      ],
      map: null,
    };
  },
  mounted() {
    this.omEvent = new OMEvent(this);
    this.map = this.omEvent.getMap();

    let lineTileData = localStorage.getItem("lineTileData");
    if (lineTileData) {
      let lineParamArr = JSON.parse(lineTileData);
      this.customlayer.splice(0, this.customlayer.length);
      for (var i = 0; i < lineParamArr.length; i++) {
        let layer = new CustomTile(lineParamArr[i]);
        layer.setVisible(false);
        this.map.addLayer(layer);
        let obj = {
          layer: layer,
          status: false,
          name: lineParamArr[i].name,
        };
        this.customlayer.push(obj);
      }
    }
  },
  computed: {
    ...mapGetters({
      locallayer: "custom/locallayer",
      customlayer: "custom/customlayer",
    }),
  },
  methods: {
    ...mapActions({
      changepickershow: "custom/changepickershow",
      changecustomshow: "custom/changecustomshow",
      changelocalshow: "custom/changelocalshow",
    }),
    handleTreeClick(node, event) {
      window.console.log(node, event);
      this.treeClickNodeIds[this.treeClickCount] = event;
      //记录点击次数
      this.treeClickCount++;
      //单次点击次数超过2次不作处理,直接返回,也可以拓展成多击事件
      if (this.treeClickCount >= 2) {
        return;
      }
      //计时器,计算300毫秒为单位,可自行修改
      this.timer = window.setTimeout(() => {
        if (this.treeClickCount == 1) {
          //把次数归零
          this.treeClickCount = 0;
          //单击事件处理
          window.console.log("单击事件,可在此处理对应逻辑");
          this.treeClickNodeIds = [];
        } else if (this.treeClickCount > 1) {
          //把次数归零
          this.treeClickCount = 0;
          //定位到图层
          if (this.treeClickNodeIds[0] == this.treeClickNodeIds[1]) {
            window.console.log("双击事件,可在此处理对应逻辑");
            this.omEvent.locationLayer(node.name);
          }
          this.treeClickNodeIds = [];
        }
      }, 300);
    },

    selectTab(index) {
      this.tabActive = index;
    },

    close() {
      this.$emit("close");
    },

    treeCheckedChange(node, isCheck) {
      window.console.log(node, isCheck);
      if (isCheck) {
        // getLayerData({layerName:node.name, hasGeom: true}).then((res) => {
        //   console.log(res);
        //   // this.omEvent.addLayer(node.name, res);
        // });
        this.omEvent.addSeaLandLayer(
          node.name,
          getLayerData({ layerName: node.name, hasGeom: true, 
          version: 5
          })
        );
      } else {
        this.omEvent.removeSeaLandLayer(node.name);
      }
    },

    addLocalLayer() {
      this.changepickershow(true);
      this.changelocalshow(true);
    },

    addLineLayer() {
      this.changepickershow(true);
      this.changecustomshow(true);
    },
    changecheck(item) {
      if (item.status == true) {
        item.layer.setVisible(true);
        setTimeout(() => {
          this.omEvent.locationLayer(item.layer);
        }, 20);
        return;
      } else {
        item.layer.setVisible(false);
      }
    },
    deleteLineItem(item) {
      window.console.log(item);
      for (var i = 0; i < this.customlayer.length; i++) {
        window.console.log(this.customlayer[i]);
        if (this.customlayer[i].layer == item.layer) {
          this.customlayer.splice(i, 1);
          this.map.removeLayer(item.layer);
          break;
        }
      }

      let lineTileData = localStorage.getItem("lineTileData");
      if (lineTileData) {
        let lineParamArr = JSON.parse(lineTileData);
        for (var j = 0; j < lineParamArr.length; j++) {
          if (lineParamArr[j].name == item.name) {
            lineParamArr.splice(j, 1);
            break;
          }
        }
        localStorage.setItem("lineTileData", JSON.stringify(lineParamArr));
      }
    },

    renderContent(h, { node }) {
      return (
        <span class="custom-tree-node">
          <span title={node.label}>{node.label}</span>
        </span>)
    }
  },
};
</script>

<style lang="scss" scoped>
.layer-container {
  position: absolute;
  left: 350px;
  z-index: 100;
}

.layer-tab {
  background-color: #1b2544;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 6px;
  width: 200px;
  height: 400px;
}

.tab {
  display: flex;
}

.tabItemSelect {
  color: white;
  height: 20px;
  font-size: 10px;
  margin-left: 6px;
  margin-top: 5px;
  border-bottom: 2px solid #fff;
}

.tabItem {
  color: #ffffffdd;
  height: 20px;
  font-size: 10px;
  margin-left: 6px;
  margin-top: 5px;
}

.close {
  color: white;
  font-size: 12px;
  padding-left: 10px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.layer-zt {
  width: 200px;
  height: 365px;
  margin-top: 10px;
  display: block;
  overflow-y: scroll;
}

.layer-local {
  width: 200px;
  height: 365px;
  margin-top: 10px;
  display: block;
  overflow-y: scroll;
}

.addBtn {
  color: #253767;
  font-size: 12px;
  background-color: #c6deff;
  border-radius: 10px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
}

.layer-local-list {
  margin-left: 10px;
}

.layer-line-list {
  margin-left: 10px;
  margin-top: 10px;
}

::v-deep .el-tree-node {
  .is-leaf + .el-checkbox .el-checkbox__inner {
    display: inline-block;
  }

  .el-checkbox .el-checkbox__inner {
    display: none;
  }
}

::v-deep .el-tree {
  background-color: #1b2544;
  color: #fff;
}

::v-deep .el-tree-node:focus > .el-tree-node__content {
  background-color: #1b2544 !important;
}

::v-deep .el-tree-node__content:hover {
  background-color: #1b2544;
}

::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background-color: #1b2544;
}

.line-li-div {
  display: flex;
  justify-content: space-between;
}

.img {
  width: 20px;
  height: 20px;
  opacity: 0.7;
}
</style>