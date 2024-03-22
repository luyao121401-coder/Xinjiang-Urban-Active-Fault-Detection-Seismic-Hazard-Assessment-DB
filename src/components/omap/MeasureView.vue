<template>
  <div class="measure-container">
    <div class="measure-container2">
      <div v-show="isPopOpen" class="measure-menu">
        <div class="measure-pop-title">
          <div class="title">{{$t('m.MeasuringTools')}}</div>
          <div class="closeIcon">
            <!-- <a-icon type="close" @click="closedraw" /> -->
            <i class="el-icon-close" @click="closedraw"></i>
          </div>
        </div>
        <div style="margin-left:10px;margin-top:10px">
          <el-button type="default" @click="dist()" :title="$t('m.Distance')" >
            <img src="../../assets/icon/distance.png" alt v-show="this.measureMode != 'distance'" />
            <img
              src="../../assets/icon/distance1.png"
              alt
              style="margin-left:1px"
              v-show="this.measureMode == 'distance'"
            />
          </el-button>
          <el-button type="default" @click="area()" :title="$t('m.Area')" style="margin-left:10px" >
            <img src="../../assets/icon/polyon.png" alt v-show="this.measureMode != 'area'" />
            <img
              src="../../assets/icon/polyon1.png"
              alt
              style="margin-left:-1px"
              v-show="this.measureMode == 'area'"
            />
          </el-button>
          <el-button type="default" @click="clear()" :title="$t('m.DeleteAll')" style="margin-left:10px" >
            <img src="../../assets/icon/clear.png" alt />
          </el-button>
        </div>
      </div>
      <div class="measure-button" @click="showMeasurePop" :title="$t('m.Close')">
        <img src="../../assets/icon/measure.png" alt v-show="this.isPopOpen == false" />
        <img src="../../assets/icon/measureb.png" alt v-show="this.isPopOpen == true" /> 
      </div>
    </div>
  </div>
</template>

<script>
import EventConst, { OMEvent } from "./js/OMapEvent";
import { MeasureTool } from "./js/MeasureTool";

export default {
  data() {
    return {
      omEvent: {},
      isPopOpen: false,
      measureMode: "",
      measureTool: null
    };
  },
  mounted() {
    this.omEvent = new OMEvent(this);
    this.omEvent.on(EventConst.SWITCH_CHANGE_TOOL, res => {
      if (res != "measure" && this.isPopOpen) {
          this.closedraw()
      }
    });
  },
  methods: {
    showMeasurePop() {
      this.isPopOpen = !this.isPopOpen;
      if (!this.isPopOpen) {
        this.closedraw()
      } else {
        this.omEvent.emit(EventConst.SWITCH_CHANGE_TOOL, "measure");
      }
    },
    dist() {
      this.omEvent.getMapSelect().values_.active = false;
      this.measureMode = "distance";
      if (!this.measureTool)
        this.measureTool = new MeasureTool(this.omEvent.getMap());
      this.measureTool.measureLength();
    },
    area() {
      this.omEvent.getMapSelect().values_.active = false;
      this.measureMode = "area";
      if (!this.measureTool)
        this.measureTool = new MeasureTool(this.omEvent.getMap());
      this.measureTool.measureArea();
    },
    clear() {
      if (this.measureTool) this.measureTool.measureClear();
    },
    closedraw() {
      this.measureMode = "";
      if (this.measureTool) this.measureTool.measureClose();
      this.omEvent.getMapSelect().values_.active = true;
      this.isPopOpen = false;
    }
  }
};
</script>

<style scoped>
.el-button {
	margin: 0px;
  padding: 0px;
  border-color: #ffffff;
}
.measure-container {
  position: absolute;
  z-index: 10;
  right: 26px;
  top: 20px;
}
.measure-container2 {
  display: flex;
}
.measure-menu {
  width: 165px;
  height: 85px;
  margin-right: 10px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.measure-button {
  width: 36px;
  height: 36px;
  color: #2c2c2c;
  background-color: #1B2544;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
}

.measure-button:hover {
  width: 36px;
  height: 36px;
  color: #2c2c2c;
  background-color: #1B2544;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(76, 150, 247);
}

.measure-pop-title {
  display: flex;
  margin-left: 20px;
  margin-top: 15px;
}
.measure-container2 >>> .ant-btn {
  padding: 0 10px;
  height: auto;
  color: black;
  border-color: transparent;
}
.closeIcon {
  margin-left: 60px;
}
</style>