<template>
  <div class="m-page">
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
         form: {},
      }
  },
  created() {
    
  },
  mounted() {
    this.$refs.switchMap.clickItem("tdtdt","天地图") 
  },
  methods:{
  }
}
</script>
<style scoped>
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
  width:100%;
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

