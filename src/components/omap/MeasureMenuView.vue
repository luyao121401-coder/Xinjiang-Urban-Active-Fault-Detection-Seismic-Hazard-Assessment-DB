<template>
  <div class="measure-container">
    <div class='measure-menu'>
        <menu-item-btn @click.native="dist()" :select="this.measureMode == 'distance'"  :icon='require("../../assets/img/measure_distance_icon.png")' text="距离"></menu-item-btn>
        <menu-item-btn @click.native="area()" :select="this.measureMode == 'area'" :icon='require("../../assets/img/mensure_area_icon.png")' text="面积"></menu-item-btn>
        <menu-item-btn @click.native="clear()" :icon='require("../../assets/img/tool_clear_icon.png")' text="清空"></menu-item-btn>
        <menu-item-btn @click.native="closeDraw()" :icon='require("../../assets/img/tool_close_icon.png")' text="关闭"></menu-item-btn>
    </div>
  </div>
</template>

<script>
import { OMEvent } from "./js/OMapEvent";
import { MeasureTool } from "./js/MeasureTool";
import MenuItemBtn from '../Map/MenuItemBtn.vue';
import { mapGetters } from "vuex"

export default {
  components: { MenuItemBtn },
  data() {
    return {
      omEvent: {},
      measureMode: "",
      measureTool: null
    };
  },
  computed:{
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

.el-button {
  margin: 0px;
  padding: 0px;
  border-color: #ffffff;
}

.menu-item {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    font-size: 10px;
    justify-items: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
}

.measure-menu {
  background-color: #000000;
  opacity: 0.7;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  padding: 6px;
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