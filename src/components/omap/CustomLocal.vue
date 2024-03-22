<template>
  <div class="customlayerpicker">
    <div v-if="customshow" class="customlayercon">
      <div class="customlayertitle">
        <span>添加自定义图层</span>
        <img
          @click="customformclose"
          src="../../assets/img/关闭@2x.png"
          alt=""
        />
      </div>
      <div class="customlayercenter">
        <div class="items">
          <span class="names">图源名称:</span>
          <el-input v-model="layername" placeholder="请输入图源名称"></el-input>
        </div>
        <div class="items">
          <span class="names">投影类型:</span>
          <el-select v-model="projection" placeholder="请选择字段类型">
            <el-option value="摩卡托投影"> 摩卡托投影 </el-option>
            <el-option value="经纬度投影"> 经纬度投影 </el-option>
          </el-select>
        </div>
        <div class="items">
          <span class="names">坐标类型:</span>
          <el-select v-model="coordinate" placeholder="请选择字段类型">
            <el-option value="GCJ-02"> GCJ-02 </el-option>
            <el-option value="WGS84"> WGS84 </el-option>
            <el-option value="CGCS2000"> CGCS2000 </el-option>
          </el-select>
        </div>
        <div class="items">
          <span class="names">瓦片大小:</span>
          <el-select v-model="imageSize" placeholder="请选择字段类型">
            <el-option :value="256"> 256 </el-option>
            <el-option :value="512"> 512 </el-option>
            <el-option :value="1024"> 1024 </el-option>
          </el-select>
        </div>
        <div class="items">
          <span class="names">图源层级:</span>
          <div class="items_select">
            <el-select
              style="width: 268px"
              v-model="minLevel"
              placeholder="请选择最小层级"
            >
              <el-option :value="1"> 1 </el-option>
              <el-option :value="2"> 2 </el-option>
              <el-option :value="3"> 3 </el-option>
              <el-option :value="4"> 4 </el-option>
              <el-option :value="5"> 5 </el-option>
              <el-option :value="6"> 6 </el-option>
              <el-option :value="7"> 7 </el-option>
              <el-option :value="8"> 8 </el-option>
              <el-option :value="9"> 9 </el-option>
              <el-option :value="10"> 10 </el-option>
              <el-option :value="11"> 11 </el-option>
              <el-option :value="12"> 12 </el-option>
              <el-option :value="13"> 13 </el-option>
              <el-option :value="14"> 14 </el-option>
              <el-option :value="15"> 15 </el-option>
              <el-option :value="16"> 16 </el-option>
              <el-option :value="17"> 17 </el-option>
              <el-option :value="18"> 18 </el-option>
              <el-option :value="19"> 19 </el-option>
              <el-option :value="20"> 20 </el-option>
              <el-option :value="21"> 21 </el-option>
              <el-option :value="22"> 22 </el-option>
              <el-option :value="23"> 23 </el-option>
              <el-option :value="24"> 24 </el-option>
            </el-select>
            <span>—</span>
            <el-select
              style="width: 268px"
              v-model="maxLevel"
              placeholder="请选择最大层级"
            >
              <el-option :value="1"> 1 </el-option>
              <el-option :value="2"> 2 </el-option>
              <el-option :value="3"> 3 </el-option>
              <el-option :value="4"> 4 </el-option>
              <el-option :value="5"> 5 </el-option>
              <el-option :value="6"> 6 </el-option>
              <el-option :value="7"> 7 </el-option>
              <el-option :value="8"> 8 </el-option>
              <el-option :value="9"> 9 </el-option>
              <el-option :value="10"> 10 </el-option>
              <el-option :value="11"> 11 </el-option>
              <el-option :value="12"> 12 </el-option>
              <el-option :value="13"> 13 </el-option>
              <el-option :value="14"> 14 </el-option>
              <el-option :value="15"> 15 </el-option>
              <el-option :value="16"> 16 </el-option>
              <el-option :value="17"> 17 </el-option>
              <el-option :value="18"> 18 </el-option>
              <el-option :value="19"> 19 </el-option>
              <el-option :value="20"> 20 </el-option>
              <el-option :value="21"> 21 </el-option>
              <el-option :value="22"> 22 </el-option>
              <el-option :value="23"> 23 </el-option>
              <el-option :value="24"> 24 </el-option>
            </el-select>
          </div>
        </div>
        <!-- <div class="items">
              <span class="names">主机编号（选填）:</span>
              <el-input
                v-model="subDomains"
                placeholder="请输入主机编号，用英文逗号隔开。例：t1,t2,t3"
              ></el-input>
            </div> -->
        <div class="items">
          <span class="names">瓦片下载地址:</span>
          <el-input
            type="textarea"
            v-model="url"
            :auto-size="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入瓦片下载模板地址  例如:http://tile.openstreetmap.org/{z}/{x}/{y}.png"
          ></el-input>
        </div>
      </div>

      <div class="layerbtn">
        <span @click="customformclose" class="btnquxiao">取消</span>
        <span @click="customformenter" class="btnqueding">确定</span>
      </div>
    </div>
    <div v-if="localshow" class="customlayercon">
      <div class="customlayertitle">
        <span>添加本地图层</span>
        <img @click="closecustom" src="../../assets/img/关闭@2x.png" alt="" />
      </div>
      <div class="items">
        <span class="names">投影类型:</span>
        <el-select v-model="localprojection" placeholder="请选择字段类型">
          <el-option value="EPSG:4326">WGS84 - 地理坐标系</el-option>
          <el-option value="EPSG:4326">CGCS2000 - 地理坐标系</el-option>
          <el-option value="gcj-02-4326">GCJ02 - 地理坐标系</el-option>
          <el-option value="EPSG:3857">WGS84 - 墨卡托投影坐标系</el-option>
          <el-option value="EPSG:3857">CGCS2000 - 墨卡托投影坐标系</el-option>
          <el-option value="gcj-02">GCJ02 - 墨卡托投影坐标系</el-option>
        </el-select>
      </div>
      <div class="items">
        <span class="names">文件格式:</span>
        <el-radio-group @change="changelocalradio" v-model="localradio">
          <el-radio :label="3">SHP</el-radio>
          <el-radio :label="6">KML</el-radio>
          <el-radio :label="9">KMZ</el-radio>
          <!-- <el-radio :label="12">TAB</el-radio> -->
        </el-radio-group>
      </div>
      <div class="fileName">{{ this.selectFileName }}</div>
      <el-upload
        :before-upload="fileselect"
        class="upload-demo"
        drag
        action="#"
        multiple
        :accept="accept"
      >
        <div class="el-upload__text">
          <p>直接拖拽文件到此，或者点击此区域导入</p>
          <p style="color: #ccc; font-size: 14px">支持SHP、KML、KMZ格式</p>
        </div>
      </el-upload>
      <div class="layerbtn">
        <span @click="closecustom" class="btnquxiao">取消</span>
        <span @click="successcustom" class="btnqueding">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { OMEvent } from "./js/OMapEvent";
import CustomTile from "../../ols/layer/customTile";
import {
  createKmlLayer,
  createShapeLayer,
} from "@/components/omap/js/FileLayerFactory";
export default {
  data() {
    return {
      layername: "",
      projection: "",
      coordinate: "",
      imageSize: "",
      minLevel: "",
      maxLevel: "",
      subDomains: "",
      url: "",
      localprojection: "EPSG:4326",
      localradio: 3,
      accept: ".zip",
      omEvent: null,
      map: null,
      selectFile: null,
      selectFileName: "",
    };
  },

  computed: {
    ...mapGetters({
      customshow: "custom/customshow",
      localshow: "custom/localshow",
      customlayer: "custom/customlayer",
      locallayer: "custom/locallayer",
    }),
  },
  methods: {
    ...mapActions({
      changepickershow: "custom/changepickershow",
      changecustomshow: "custom/changecustomshow",
      changelocalshow: "custom/changelocalshow",
    }),
    // 自定义表单取消事件
    customformclose() {
      this.emptycustomform();
    },
    // 自定义表单确定事件
    customformenter() {
      let projection;
      if (this.projection == "摩卡托投影" && this.coordinate == "WGS84") {
        projection = "EPSG:3857";
      } else {
        projection = "EPSG:4326";
      }
      // return;
      let params = {
        url: this.url,
        tileSize: this.imageSize,
        maxZoom: this.maxLevel,
        minZoom: this.minLevel,
        projection: projection,
        name: this.layername
      };
      let layer = new CustomTile(params);
      this.map.addLayer(layer);
      let obj = {
        layer: layer,
        status: true,
        name: this.layername,
      };
      this.customlayer.push(obj);
      
      let lineTileData = localStorage.getItem("lineTileData");
      let lineParamArr = []
      if(lineTileData){
          lineParamArr = JSON.parse(lineTileData);
      }
      lineParamArr.push(params)
      localStorage.setItem("lineTileData", JSON.stringify(lineParamArr))

      this.emptycustomform();
    },
    emptycustomform() {
      this.layername = "";
      this.projection = "";
      this.coordinate = "";
      this.imageSize = "";
      this.minLevel = "";
      this.maxLevel = "";
      this.url = "";
      this.changepickershow(false);
      this.changecustomshow(false);
    },

    // 本地图层
    // 取消
    closecustom() {
      this.changepickershow(false);
      this.changelocalshow(false);
      this.selectFile = null;
      this.selectFileName = "";
    },
    // 确定
    successcustom() {
      switch (this.localradio) {
        case 3:
          this.loadShp(this.selectFile);
          break;
        case 6:
          this.loadKmlAndKmz(this.selectFile);
          break;
        case 9:
          this.loadKmlAndKmz(this.selectFile);
          break;
        // case 12:
        //   tabupload(e, this.map, this.locallayer);
        //   break;
      }

      this.changepickershow(false);
      this.changelocalshow(false);
      this.selectFile = null;
      this.selectFileName = "";
    },
    // 选择文件类型
    changelocalradio() {
      switch (this.localradio) {
        case 3:
          this.accept = ".zip";
          break;
        case 6:
          this.accept = ".kml";
          break;
        case 9:
          this.accept = ".kmz";
          break;
        case 12:
          this.accept = ".zip";
          break;
      }
    },
    // 文件导入
    fileselect(e) {
      this.selectFile = e;
      this.selectFileName = e.name;
    },

    loadKmlAndKmz(file) {
      let name = file.name.slice(0, -4);
      createKmlLayer(file, name, (layer) => {
        this.map.addLayer(layer);
        let obj = {
          layer: layer,
          name: file.name.slice(0, -4),
          status: true,
        };
        this.locallayer.push(obj);
        this.omEvent.locationLayer(layer);
      });
    },

    loadShp(file) {
      let name = file.name.slice(0, -4);
      createShapeLayer(file, name, null, (layer) => {
        this.map.addLayer(layer);
        let obj = {
          layer: layer,
          name: file.name.slice(0, -4),
          status: true,
        };
        this.locallayer.push(obj);
        this.omEvent.locationLayer(layer);
      });
    },
  },
  mounted() {
    this.omEvent = new OMEvent(this);
    this.map = this.omEvent.getMap();
  },
};
</script>

<style scoped>
.customlayerpicker {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.customlayercon {
  width: 520px;
  height: 600px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.customlayertitle {
  width: 100%;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.customlayertitle span {
  display: flex;
  height: 33px;
  font-size: 24px;
  font-weight: 500;
  color: #181818;
  line-height: 33px;
  margin-left: 52px;
}
.customlayertitle img {
  width: 24px;
  height: 24px;
  margin-right: 22px;
}
.customlayercenter {
  width: 100%;
  height: calc(100% - 172px);
  overflow: auto;
}
.customlayercenter .items,
.customlayercon .items {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 20px;
}
.customlayercenter .items .names,
.customlayercon .items .names {
  display: flex;
  height: 25px;
  font-size: 18px;
  font-weight: 500;
  color: #181818;
  line-height: 25px;
  margin-bottom: 16px;
}
.customlayercenter /deep/ .el-input__inner,
.customlayercon /deep/ .el-input__inner {
  border: none;
  outline: none;
  background: #f9f9f9;
  border-radius: 10px;
  border: 2px solid #cccccc;
}

.customlayercenter /deep/ .el-textarea__inner {
  border: none;
  outline: none;
  width: 100%;
  height: 87px;
  background: #f9f9f9;
  border-radius: 10px;
  border: 2px solid #cccccc;
}
.customlayercenter /deep/ .el-select .el-input.is-focus .el-input__inner {
  border-color: #ccc;
}
.customlayercenter /deep/.el-select .el-input__inner:focus {
  border-color: #ccc;
}
.customlayercon /deep/ .el-select .el-input.is-focus .el-input__inner {
  border-color: #ccc;
}
.customlayercon /deep/.el-select .el-input__inner:focus {
  border-color: #ccc;
}
.items_select {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-radio-group {
  margin-top: 15px;
  margin-bottom: 15px;
}

.customlayercon /deep/.el-upload-list {
  margin-left: 52px;
  width: 100%;
}
.layerbtn {
  width: 520px;
  height: 104px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.btnquxiao {
  width: 200px;
  height: 48px;
  background: #ecf3ff;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 400;
  color: #181818;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 52px;
  cursor: pointer;
}
.btnqueding {
  width: 200px;
  height: 48px;
  background: linear-gradient(180deg, #39a0f9 0%, #1866f0 100%);
  border-radius: 30px;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 52px;
  cursor: pointer;
}

.customlayercon /deep/ .upload-demo {
  width: 100%;
}
.customlayercon /deep/ .el-upload {
  width: 80%;
  margin-left: 10%;
}
.customlayercon /deep/.el-upload-dragger {
  width: 100%;
  height: 126px;
  background: #f9f9f9;
  border-radius: 10px;
  border: 2px dashed #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.fileName {
  margin-left: 50px;
}


</style>
