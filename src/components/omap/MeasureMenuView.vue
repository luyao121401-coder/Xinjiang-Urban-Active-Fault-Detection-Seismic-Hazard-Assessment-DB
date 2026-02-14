<template>
  <div class="measure-container">
    <div class='measure-menu'>
      <menu-item-btn
          @click.native="dist()"
          :select="this.measureMode == 'distance'"
          :icon='icons.distance'
          text="距离"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="area()"
          :select="this.measureMode == 'area'"
          :icon='icons.area'
          text="面积"
      ></menu-item-btn>
      <menu-item-btn
          @click.native="clear()"
          :icon='icons.clear'
          text="清空"
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
// 1. 静态导入图标，确保路径解析最稳
import distanceIcon from "../../assets/img/measure_distance_icon.png";
import areaIcon from "../../assets/img/mensure_area_icon.png";
import toolClearIcon from "../../assets/img/tool_clear_icon.png";
import toolCloseIcon from "../../assets/img/tool_close_icon.png";

import { OMEvent } from "./js/OMapEvent";
import { MeasureTool } from "./js/MeasureTool";
import MenuItemBtn from '../Map/MenuItemBtn.vue';
import { mapGetters } from "vuex"

export default {
  components: { MenuItemBtn },
  data() {
    return {
      // 2. 将图标存入 data
      icons: {
        distance: distanceIcon,
        area: areaIcon,
        clear: toolClearIcon,
        close: toolCloseIcon
      },
      omEvent: {},
      measureMode: "",
      measureTool: null
    };
  },
  computed: {
    ...mapGetters({
      ind: "map/ind"
    })
  },
  mounted() {
    this.omEvent = new OMEvent(this);
  },
  methods: {
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
    closeDraw() {
      this.measureMode = "";
      if (this.measureTool) this.measureTool.measureClose();
      this.omEvent.getMapSelect().values_.active = true;
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.measure-container {
  position: absolute;
  z-index: 100;
}

.measure-menu {
  background-color: #000000;
  opacity: 0.85;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  padding: 6px;
}

/* --- 核心修复逻辑 --- */
/* 1. 修复位置偏移：拉回可能存在的 left: -20px */
::v-deep .menu-item .img {
  position: relative !important;
  left: 0 !important;
  width: 20px !important;
  height: 20px !important;
  border: none !important;
  display: block !important;
  /* 2. 强制转白：解决黑背景下看不见黑图标的问题 */
  filter: brightness(0) invert(1) !important;
  -webkit-filter: brightness(0) invert(1) !important;
  object-fit: contain;
}

/* 选中状态保留原有的投影逻辑，或者强制取消滤镜 */
::v-deep .menu-item .imgSelect {
  filter: none !important;
  -webkit-filter: drop-shadow(rgb(76, 150, 247) 0 0) !important;
}

/* 确保容器不裁剪图标 */
::v-deep .icon-wrapper {
  overflow: visible !important;
  width: 20px !important;
  height: 20px !important;
}

.el-button {
  margin: 0px;
  padding: 0px;
  border-color: #ffffff;
}
</style>