<template>
  <div class="swtich-container">
    <div class="switch-container2">
      <div v-show="isPopOpen" class="swtich-panel">
        <!-- <div class="switch-title"> -->
          <!-- <span class="panel-title">切换底图</span> -->
          <div class="luwang">
            <el-checkbox 
              v-model="lwValue"
              @change="lwSwitchChange"
              :active-value = "1"
              :inactive-value= "0"
            >
            </el-checkbox>
            <div style="font-size: 8px; color: #777777">路网</div>
          </div>
        <!-- </div> -->
        <el-radio-group
          class="radio-group"
          v-model="radioValue"
          @change="mapChange"
        >
          <el-radio class="radio-item" :label="2">
                <img src="@/assets/logos/map2.png" style="width:36px;height:36px"></img>
            </el-radio>
            <el-radio class="radio-item" :label="3">
                <img src="@/assets/logos/map3.png" style="width:36px;height:36px"></img>
            </el-radio>
            <el-radio class="radio-item" :label="1">
                <img src="@/assets/logos/map1.png" style="width:36px;height:36px"></img>
            </el-radio>
        </el-radio-group>
      </div>
      <div>
        <div class="switch-button" @click="showSwitchPop" title="切换地图">
          <img
            src="@/assets/logos/map1.png"
            width="36px"
            height="36px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { OMEvent } from "./js/OMapEvent";

export default {
  data() {
    return {
      isPopOpen: false,
      lwValue: 1,
      radioValue: 1,
      OMEvent: {},
    };
  },
  mounted() {
    this.omEvent = new OMEvent(this);
    console.log(typeof(this.lwValue))
  },
  methods: {
    showSwitchPop() {
      this.isPopOpen = !this.isPopOpen;
    },

    clickItem(item, name) {
      this.omEvent.switchBaseLayer(item, name);
      // this.isPopOpen = false;
    },

    lwSwitchChange() {
      this.omEvent.emit("luwuvisible", this.lwValue == 1 ? true : false);
      console.log("是什么")
      console.log(typeof(this.lwValue))
    },

    mapChange() {
      let key = "";
      let name = "";
      if (this.radioValue == 1) {
        key = "tdtyx";
        name = "天地图-影像";
      } else if (this.radioValue == 2) {
        key = "tdtdx";
        name = "天地图-地形";
      } else if (this.radioValue == 3) {
        key = "tdtdt";
        name = "天地图";
      }
      console.log(key);
      this.omEvent.switchBaseLayer(key, name);
      this.isPopOpen = false;
    },
  },
};
</script>

<style scoped>
.el-switch__core {
  width: 15px !important;
  height: 10px !important;
}
.el-switch__core::after {
  width: 8px !important;
  height: 8px !important;
  margin-top: -1px;
}
.el-switch.is-checked .el-switch__core::after {
  margin-left: -8px !important;
}
</style>

<style scoped>
.swtich-container {
  position: absolute;
  z-index: 10;
  right: 16px;
  bottom: 142px;
}

.switch-container2 {
  display: flex;
  position: absolute;
  right: 0px;
  top: 0;
}

.switch-button {
  width: 40px;
  height: 40px;
  color: #2c2c2c;
  background-color: #fff; 
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #1b2544; */
}
/* 
.switch-button:hover {
  border: 1px solid rgb(76, 150, 247);
} */

.swtich-panel {
    width: 220px;
    margin-right: 5px;
    border-radius: 5px;
    background-color: white;
    display: flex;
    justify-content: center;
    margin-bottom: -110px;
    position: absolute;
    right: 45px;
    padding-top: 3px;
    bottom: 109px;
}
.luwang{
  display: flex;
  align-items: center
}
.map-item {
  flex: 1;
  text-align: center;
}

.radio-group {
  display: flex;
  color: #181818;
}
.el-radio{
  display: flex;
  align-items: center;
  margin-right: 0px
}
.el-radio__label {
    padding: 0 4px;
    /* padding-left: 10px; */
}
.add{
  margin-right: 30px
}
.panel-title {
  font-size: 12px;
  color: #777777;
  margin-top: 4px;
}
.switch-title {
  margin-bottom: 10px;
  margin-top: 5px;
  justify-content: space-between;
  display: flex;
  margin-right: 10px;
}
</style>