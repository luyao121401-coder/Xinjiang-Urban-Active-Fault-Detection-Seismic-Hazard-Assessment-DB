<template>
  <div class="m-page">
    <div class="urban_activity">
      <div class="urban_header">
        <h2>地震灾害损失预评估成果图</h2>
        <div @click="gomapsRecords()"><img src="@/assets/img/计算记录.png" alt="">制图记录</div>
      </div>
      <div class="type_title"><img src="@/assets/img/类型配置.png" alt="">类型配置</div>
      <label>图件类型</label>
      <el-select style="width: 100%;" v-model="form.region" placeholder="选择图件类型">
        <el-option label="致死性分布图" value="shanghai"></el-option>
        <el-option label="活断层分布图" value="beijing"></el-option>
        <el-option label="危险区预判人员死亡程度分布图" value="3"></el-option>
      </el-select>
      <div class="type_title"><img src="@/assets/img/制图范围.png" alt="">制图范围</div>
      <el-radio v-model="radio" label="1">
        自定义范围
        <div v-if="radio == 1" style="width: 100%;">
          <div style="width: 100%;">
            <el-input style="width: 220px; margin: 10px auto; display: block;" v-model="form.name" placeholder="输入顶部纬度，0.00">
              <img style="margin-top: 50%;" slot="prefix" src="@/assets/img/纬度.png" alt="">
            </el-input>
          </div>
          <div class="therebox">
            <el-input style="width: 220px;" v-model="form.name" placeholder="输入左侧经度，0.00">
              <img style="margin-top: 50%;" slot="prefix" src="@/assets/img/经度.png" alt="">
            </el-input>
            <el-button style="width: 80px; margin: 0 10px;" :disabled="whetherDisabled" :type="btnType">调整</el-button>
            <el-input style="width: 220px;" v-model="form.name" placeholder="输入右侧经度，0.00">
              <img style="margin-top: 50%;" slot="prefix" src="@/assets/img/经度.png" alt="">
            </el-input>
          </div>
          <div>
            <el-input style="width: 220px; margin: 10px auto; display: block;" v-model="form.name" placeholder="输入底部纬度，0.00">
              <img style="margin-top: 50%;" slot="prefix" src="@/assets/img/纬度.png" alt="">
            </el-input>
          </div>
        </div>
        
      </el-radio>
      <el-radio v-model="radio" label="2">
        行政区划范围
        <el-row v-if="radio == 2" :gutter="20" style="margin-top: 10px;">
          <el-col :span="12">
            <el-select style="width: 100%;" v-model="form.region" placeholder="新疆维吾尔自治区">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select style="width: 100%;" v-model="form.region" placeholder="选择城市">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-radio>
      <div class="type_title"><img src="@/assets/img/图面信息.png" alt="">图面信息</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <label>图件名称</label>
          <el-input v-model="form.name" placeholder="输入图件名称"></el-input>
        </el-col>
        <el-col :span="12">
          <label>制图日期</label>
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <label>制图单位</label>
          <el-input v-model="form.name" placeholder="输入图件名称"></el-input>
        </el-col>
        <el-col :span="12">
          <label>制图人</label>
          <el-input v-model="form.name" placeholder="输入制图人"></el-input>
        </el-col>
      </el-row>
      <el-button class="disabledbtn" :disabled="whetherDisabled" :type="btnType">开始制图</el-button>
    </div>
    <mapview class="mapview" :isShowCapture="false" ref="mapview">
      <SwitchMap id="swtichMap" ref="switchMap"></SwitchMap>
      <footinfo  class='footinfo'></footinfo>
    </mapview>
  </div>
</template>
<script>
import mapview from "../omap/mapview.vue"
import SwitchMap from "../omap/SwitchMap.vue";
import footinfo from "../omap/footinfo.vue";
export default{
  components: { 
      mapview, SwitchMap, footinfo
  },
  data(){
    return{
      radio: '1',
      form: {},
      whetherDisabled: true,
      btnType: 'info'
    }
  },
  created() {
    
  },
  mounted() {
    this.$refs.switchMap.clickItem("tdtdt","天地图") 
  },
  methods:{
    gomapsRecords(){
      this.$router.push({name: "mapsRecords", params:{name: '地震灾害损失预评估成果图'}})
    }
  }
}
</script>
<style scoped>
.urban_activity{
  width: 30%;
  height: calc(100vh - 68px);
  background-color: white;
  padding: 16px;
}
#swtichMap {
    position: absolute;
    right: 16px;
    bottom: 142px;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    /* background: #ffffff; */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
}
.mapview {
  height: calc(100vh - 68px);
  width:70%;
  /* background: red; */
}
.footinfo {
  height: 30px;
  background: #ffffff;
  border-radius: 6px;
  /* opacity: 0.6; */
}
.m-page{
  z-index: 1;
  position: absolute;
  width: 100%;
  min-width: 800px;
  min-height: calc(100% - 68px);
  /* padding: 20px; */
  top: 68px;
  display: flex;
}
.urban_header{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.urban_header > h2{
  font-size: 20px;
  color: #000000;
  font-weight: 550;
}
.urban_header > div{
  display: flex;
  align-items: center;
  font-weight: 550;
  font-size: 16px;
  color: #303030;
  cursor: pointer;
}
.urban_header > div > img{
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.type_title{
  margin-top: 25px;
  display: flex;
  align-items: center;
  font-weight: 550;
  font-size: 18px;
  color: #181818;
}
.type_title > img{
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
label{
  display: block;
  font-size: 16px;
  color: #181818;
  margin: 16px 0 10px 0;
}
.disabledbtn{
  width: 240px;
  height: 38px;
  display: block;
  margin: 40px auto;
  /* margin-left: 500px; */
}
.therebox{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
<style>
.el-input__inner {
  background-color: #f9f9f9 !important; 
  /* border: none !important; */
}
.el-button--primary{
  background-color: #1F60A7 !important;
}
.el-button--info{
  color: #bab9b9 !important;
  border: none;
  background-color: #EEEEEE !important;
}
</style>

