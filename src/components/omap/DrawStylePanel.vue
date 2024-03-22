<template>
  <div class="draw_sytle_container">
    <div :class=" ind == 5 ? 'draw_style_contentt' : 'draw_style_content'" @click.stop>
      <div class="draw-style-title">标绘样式设置</div>

      <div v-if="shapeType == 'Point'">
        <div class="style-child-title">图标</div>
        <div class="point_icon_layout">
          <div
            @click="selectIcon('gicon/wht-circle.png')"
            :class="{
              iconButtonSelect: style.image == 'gicon/wht-circle.png',
              iconButton: style.image != 'gicon/wht-circle.png',
            }"
          >
            <img src="gicon/wht-circle.png" alt width="20px" height="20px" />
          </div>
          <div
            @click="selectIcon('gicon/donut.png')"
            :class="{
              iconButtonSelect: style.image == 'gicon/donut.png',
              iconButton: style.image != 'gicon/donut.png',
            }"
          >
            <img src="gicon/donut.png" alt width="20px" height="20px" />
          </div>
          <div
            @click="selectIcon('gicon/triangle.png')"
            :class="{
              iconButtonSelect: style.image == 'gicon/triangle.png',
              iconButton: style.image != 'gicon/triangle.png',
            }"
          >
            <img src="gicon/triangle.png" alt width="20px" height="20px" />
          </div>
          <div
            @click="selectIcon('gicon/square.png')"
            :class="{
              iconButtonSelect: style.image == 'gicon/square.png',
              iconButton: style.image != 'gicon/square.png',
            }"
          >
            <img src="gicon/square.png" alt width="20px" height="20px" />
          </div>
          <div
            @click="selectIcon('gicon/wht-pushpin.png')"
            :class="{
              iconButtonSelect: style.image == 'gicon/wht-pushpin.png',
              iconButton: style.image != 'gicon/wht-pushpin.png',
            }"
          >
            <img src="gicon/wht-pushpin.png" alt width="20px" height="20px" />
          </div>
        </div>
      </div>

      <div v-if="shapeType == 'LineString'">
        <div class="style-child-title">线大小</div>
        <el-select
          v-model="lineSizeValue"
          @change="handleChangeSize"
          size="small"
        >
          <el-option value="2">2</el-option>
          <el-option value="4">4</el-option>
          <el-option value="6">6</el-option>
          <el-option value="8">8</el-option>
          <el-option value="10">10</el-option>
        </el-select>
      </div>
      <div v-if="shapeType == 'LineString'">
        <div class="style-child-title">线样式</div>

        <el-select
          v-model="lineStyleDash"
          @change="handleChangeLineStyle"
          size="small"
        >
          <el-option :value="1" label="虚"></el-option>
          <el-option :value="3" label="实"></el-option>
        </el-select>
      </div>

      <div
        v-if="
          shapeType == 'Polygon' ||
          shapeType == 'Box' ||
          shapeType == 'Circle' ||
          shapeType == 'Point'
        "
      >
        <div class="style-child-title">填充颜色</div>
        <div
          class="color_con"
          :style="{ background: fillColor }"
          @click.stop="handleShowFillColor"
          id="fillColor"
          ref="fillColor"
          style="margin-left: 5px"
        ></div>
        <div class="color_fill_sketch" v-show="isShowFillColorSketch">
          <sketch-picker
            id="fillColorSketch"
            v-model="fillColor"
            @input="updateFillColorValue"
          ></sketch-picker>
        </div>
      </div>
      <div
        v-if="
          shapeType == 'Polygon' ||
          shapeType == 'Box' ||
          shapeType == 'Circle' ||
          shapeType == 'LineString'
        "
      >
        <div class="style-child-title" ref="lineTile">
          {{ shapeType == "LineString" ? "线样式" : "描边颜色" }}
        </div>
        <div
          class="color_con"
          :style="{ background: strokeColor }"
          @click.stop="handleShowStrokeColor"
          id="strokeColor"
          ref="strokeColor"
          style="margin-left: 5px"
        ></div>
        <div class="color_fill_sketch" v-show="isShowStrokeColorSketch">
          <sketch-picker
            id="strokeColorSketch"
            v-model="strokeColor"
            @input="updateStrokeColorValue"
          ></sketch-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sketch } from "vue-color";
import { OMEvent } from "./js/OMapEvent";
import { mapGetters } from "vuex"

export default {
  data() {
    return {
      shapeType: "Point",
      fillColor: "rgba(255, 255, 255, 0.8)",
      strokeColor: "#66b1ff",
      style: {
        fillColor: "rgba(255, 255, 255, 0.8)",
        strokeColor: "#66b1ff",
        lineSize: 2,
        lineDash: [2, 0],
        image: "gicon/wht-circle.png",
        imageColor: "#fff",
      },
      lineSizeValue: 2,
      lineStyleDash: "3",
      isShowFillColorSketch: false,
      isShowStrokeColorSketch: false,
    };
  },
  components: {
    "sketch-picker": Sketch,
  },
  computed:{
    ...mapGetters({
      ind: 'map/ind'
    })
  },
  mounted() {
    this.omEvent = new OMEvent(this);
    this.omEvent.on("drawShapeChange", this.drawShapeChange);

    document.body.addEventListener("click", () => {
      this.isShowFillColorSketch = false;
      this.isShowStrokeColorSketch = false;
    });
  },
  methods: {
    drawShapeChange(shape) {
      this.shapeType = shape;
      this.fillColor = "rgba(255, 255, 255, 0.8)";
      this.strokeColor = "#66b1ff";
      this.lineSizeValue = 2;
      this.lineStyleDash = 3;
      this.style = {
        fillColor: "rgba(255, 255, 255, 0.8)",
        strokeColor: "#66b1ff",
        lineSize: 2,
        lineDash: [2, 0],
        image: "gicon/wht-circle.png",
        imageColor: "#fff",
      };
    },

    handleShowFillColor() {
      this.isShowFillColorSketch = true;
    },
    handleShowStrokeColor() {
      this.isShowStrokeColorSketch = true;
    },
    handleChangeSize(value) {
      this.style.lineSize = parseInt(value);
      this.omEvent.emit("styleChange", this.style);
    },
    handleChangeLineStyle(value) {
      console.log(value);
      if (value == "1") {
        this.style.lineDash = [2, 10];
      } else if (value == "3") {
        this.style.lineDash = [2, 0];
      }
      this.omEvent.emit("styleChange", this.style);
    },
    updateFillColorValue(val) {
      this.fillColor = val.hex;
      if (this.shapeType == "Point") {
        this.style.imageColor = val.hex;
      } else {
        this.style.fillColor = val.hex;
      }
      this.omEvent.emit("styleChange", this.style);
    },
    updateStrokeColorValue(val) {
      this.strokeColor = val.hex;
      this.style.strokeColor = val.hex;
      this.omEvent.emit("styleChange", this.style);
    },
    closecolor() {
      this.isShowFillColorSketch = false;
      this.isShowStrokeColorSketch = false;
      //关闭颜色选择器
      // let fillColorDiv = document.getElementById("fillColor");
      // let fillColorSketch = document.getElementById("fillColorSketch");
      // if (fillColorDiv) {
      //     if (!fillColorDiv.contains(event.target) && !fillColorSketch.contains(event.target)) {
      //        this.isShowFillColorSketch = false;
      //     }
      // }

      // let strokeColorDiv = document.getElementById("strokeColor");
      // let strokeColorSketch = document.getElementById("strokeColorSketch");
      // if (strokeColorDiv) {
      //     if (!strokeColorDiv.contains(event.target) && !strokeColorSketch.contains(event.target)) {
      //        this.isShowStrokeColorSketch = false;
      //     }
      // }
    },

    selectIcon(path) {
      this.style.image = path;
      this.omEvent.emit("styleChange", this.style);
    },
  },
};
</script>

<style scoped>
.draw_sytle_container {
  position: absolute;
  z-index: 10;
}

.draw_style_content {
  width: 200px;
  height: 200px;
  border-radius: 6px;
  background-color: aliceblue;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: felx-end;
}
.draw_style_contentt{
  width: 200px;
  height: 200px;
  border-radius: 6px;
  background-color: aliceblue;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: felx-end;
  position: absolute;
  right: -65px;
  top: 180px
}
.draw-style-title {
  color: #777777;
  font-size: 12px;
}

.color_con {
  display: inline-block;
  width: 39px;
  height: 19px;
  background: #0069e6;
  border-radius: 5px;
  margin-bottom: -5px;
  border: 1px solid black;
  /* margin-left: -9px!important; */
  display: flex;
  margin-top: 7px;
}
.divider {
  margin-top: 20px;
  margin-bottom: 15px;
}
.color_fill_sketch {
  position: absolute;
  z-index: 800;
}

.style-child-title {
  font-size: 13px;
  color: #181818;
  margin-top: 8px;
  margin-left: 4px;
  margin-bottom: 2px;
  text-align: left;
}

.point_icon_layout {
  display: flex;
  flex-direction: row;
}

.iconButton {
  width: 30px;
  height: 30px;
  color: #2c2c2c;
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1b2544;
  margin-top: 14px;
  margin-left: 6px;
}

/* .iconButton:hover {
        width: 30px;
        height: 30px;
        color: #2c2c2c;
        background-color: #F9F9F9;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgb(76, 150, 247);
    } */

.iconButtonSelect {
  width: 30px;
  height: 30px;
  color: #2c2c2c;
  background-color: #f9f9f9;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgb(76, 150, 247);
  margin-top: 14px;
  margin-left: 6px;
}
</style>