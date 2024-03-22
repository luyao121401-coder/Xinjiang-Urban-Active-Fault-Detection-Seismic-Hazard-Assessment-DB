<template>
  <div class="draw-end-panel" @click="closecolor">
    <p class="draw-end-panel-title" style="margin-top: 10px">名称</p>
    <el-input
      class="draw-end-panel-input"
      v-model="name"
      placeholder="名称"
    ></el-input>

    <el-divider class="divider" />
    <div class="jihe">
      <div v-if="area != ''">
        <p class="draw-end-panel-title" style="margin-top: 10px">面积</p>
        <div>{{ area }}</div>
      </div>
      <div v-if="length != ''">
        <p class="draw-end-panel-title" style="margin-top: 10px">长度</p>
        <div>{{ length }}</div>
      </div>
      <div v-if="radius != ''">
        <p class="draw-end-panel-title" style="margin-top: 10px">半径</p>
        <div>{{ radius }}</div>
      </div>
      <div v-if="latlon != ''">
        <p class="draw-end-panel-title" style="margin-top: 10px">经纬度</p>
        <div>{{ latlon }}</div>
      </div>
    </div>
    <el-divider class="divider" />
    <div class="style">
      <div style="margin-bottom: 5px">外观</div>
      <div v-if="shapeType == 'Polygon' || shapeType == 'Point'">
        <span>填充</span>
        <div
          class="color_con"
          :style="{ background: fillColor }"
          @click="handleShowFillColor"
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
        <br />
      </div>

      <div style="margin-top: 10px">
        <span>描边</span>
        <div
          class="color_con"
          :style="{ background: strokeColor }"
          @click="handleShowStrokeColor"
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

      <div style="display: flex">
        <div style="margin-top: 10px; width: 296px">
          <span>大小</span>
          <el-select
            v-model="lineSizeValue"
            style="width: 70px"
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
        <div style="margin-top: 10px; width: 296px" v-if="shapeType != 'Point'">
          <span>线型</span>
          <el-select
            v-model="lineStyleDash"
            style="width: 70px"
            @change="handleChangeLineStyle"
            size="small"
          >
            <el-option value="1" label="虚"></el-option>
            <el-option value="3" label="实"></el-option>
          </el-select>
        </div>
      </div>
      <el-divider class="divider" />
    </div>
    <p class="draw-end-panel-title">描述</p>
    <el-input
      type="textarea"
      v-model="msg"
      placeholder="描述文字"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
    <el-divider class="divider" />
    <div class="draw-end-btn-group">
      <el-button style="margin-right: 10px" @click="handleCancel" size="small"
        >取消</el-button
      >
      <el-button type="primary" @click="handleOk" size="small">确定</el-button>
    </div>
  </div>
</template>

<script>
import { Sketch } from "vue-color";

export default {
  props: {
    type: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      default: "",
    },
    length: {
      type: String,
      default: "",
    },
    radius: {
      type: String,
      default: "",
    },
    latlon: {
      type: String,
      default: "",
    },
  },
  components: {
    "sketch-picker": Sketch,
  },
  data() {
    return {
      name: "未命名图形",
      msg: "",
      fillColor: "rgba(255, 255, 255, 0.8)",
      strokeColor: "#66b1ff",
      style: {
        fillColor: "rgba(255, 255, 255, 0.8)",
        strokeColor: "#66b1ff",
        lineSize: 2,
        lineDash: [2, 0],
      },
      lineSizeValue: 2,
      lineStyleDash: "3",
      isShowFillColorSketch: false,
      isShowStrokeColorSketch: false,
    };
  },
  methods: {
    handleShowFillColor() {
      this.isShowFillColorSketch = true;
    },
    handleShowStrokeColor() {
      this.isShowStrokeColorSketch = true;
    },
    handleChangeSize(value) {
      this.style.lineSize = parseInt(value);
      this.$parent.changStyle(this.style);
    },
    handleChangeLineStyle(value) {
      console.log(value);
      if (value == "1") {
        this.style.lineDash = [2, 10];
      } else if (value == "3") {
        this.style.lineDash = [2, 0];
      }
      this.$parent.changStyle(this.style);
    },
    closecolor() {
      // 关闭颜色选择器
      let fillColorDiv = document.getElementById("fillColor");
      let fillColorSketch = document.getElementById("fillColorSketch");
      if (fillColorDiv) {
        if (
          !fillColorDiv.contains(event.target) &&
          !fillColorSketch.contains(event.target)
        ) {
          this.isShowFillColorSketch = false;
        }
      }

      let strokeColorDiv = document.getElementById("strokeColor");
      let strokeColorSketch = document.getElementById("strokeColorSketch");
      if (strokeColorDiv) {
        if (
          !strokeColorDiv.contains(event.target) &&
          !strokeColorSketch.contains(event.target)
        ) {
          this.isShowStrokeColorSketch = false;
        }
      }
    },
    updateFillColorValue(val) {
      this.fillColor = val.hex;
      this.style.fillColor = val.hex;
      this.$parent.changStyle(this.style);
    },
    updateStrokeColorValue(val) {
      this.strokeColor = val.hex;
      this.style.strokeColor = val.hex;
      this.$parent.changStyle(this.style);
    },

    handleCancel() {
      this.$parent.closeDrawEndPanel();
    },

    handleOk() {
      let option = {
        style: this.style,
        name: this.name,
        msg: this.msg,
      };
      this.$parent.drawEndPanelClickOk(option);
    },
  },
  computed: {
    shapeType: function () {
      if (this.type.indexOf("LineString") != -1) {
        return "LineString";
      } else if (this.type == "Point") {
        return "Point";
      } else {
        return "Polygon";
      }
    },
  },
};
</script>

<style scoped>
.draw-end-panel {
  background-color: white;
  border-radius: 10px;
  width: 240px;
  /* height: 500px; */
  margin-top: -60px;
  margin-right: 10px;
  padding: 10px;
  text-align: left;
}

.draw-end-panel-title {
  margin-bottom: 4px;
}

.draw-end-btn-group {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 0px;
}
.color_con {
  display: inline-block;
  width: 39px;
  height: 19px;
  background: #0069e6;
  border-radius: 5px;
  margin-bottom: -5px;
  border: 1px solid black;
}
.divider {
  margin-top: 20px;
  margin-bottom: 15px;
}
.color_fill_sketch {
  position: absolute;
  z-index: 100;
}
</style>
