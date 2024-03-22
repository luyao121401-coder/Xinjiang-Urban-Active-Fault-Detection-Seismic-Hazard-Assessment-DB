<template>
    <div style="background:#F9F9F9;width: 100%;">
        <div>
            <HeaderMenu></HeaderMenu>
        </div>
        <div :class="picker5 == 1 ? '' :'main'">
            <div class="left" id="assess-results" v-if="page1 == 1">
                <div class="headerr">
                    <span class="title">地震灾害损失预评估</span>
                    <span>文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字
                        文字文字文字文字文字文字文字
                    </span>
                </div>
                <div class="item">
                    <span class="title">评估方法</span>
                    <span>文字文字文字文字文字文字文字</span>
                </div>
                <div class="item">
                    <span class="title">评估结果</span>
                    <span>文字文字文字文字文字文字文字</span>
                </div>
                <div class="item">
                    <span class="title">建议措施</span>
                    <span>文字文字文字文字文字文字文字</span>
                </div>
                <div class="item">
                    <span class="title">专题图件</span>
                    <span>图片图片图片图片图片图片图片图片图片图片图片图片图片图片</span>
                </div>
                <div class="item">
                    <span class="title">评估报告</span>
                    <span>地震风险调查评估报告.pdf</span>
                </div>
            </div>
            <BatchCompute v-if="page2 == 1"></BatchCompute>
            <div v-show="picker5 != 1">
                <mapview class="mapview" ref="mapview">
                    <SwitchMap id="swtichMap"></SwitchMap>
                    <footinfo class='footinfo'></footinfo>
                    <!-- <draw-menu-view
                        ref="drawView"
                        v-show="this.isUseDraw == true"
                        class="measure"
                        @close="drawClose()"
                    ></draw-menu-view> -->
                    <!-- <MeasureMenuView
                        ref="measureView"
                        v-if="this.isUseMeasure == true"
                        class="measure"
                        @close="measureClose()"
                    ></MeasureMenuView>
                    <draw-style-panel 
                        class="drawStylePanel"
                        v-show="this.drawStyle == true"
                    ></draw-style-panel> -->
                </mapview>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderMenu from "./HeaderMenu.vue"
import mapview from "../omap/mapview.vue"
import footinfo from "../omap/footinfo.vue";
import DrawStylePanel from "../omap/DrawStylePanel.vue";
import DrawMenuView from "../omap/DrawMenuView.vue";
import MeasureMenuView from "../omap/MeasureMenuView.vue";
import SwitchMap from "../omap/SwitchMap.vue";
// import BatchCompute from "./BatchCompute.vue"
import { mapActions, mapGetters } from "vuex"
import BatchCompute from "./BatchCompute.vue"





export default{
    components: { 
        HeaderMenu, 
        mapview, 
        footinfo, 
        // DrawStylePanel,
        // DrawMenuView,
        // MeasureMenuView,
        SwitchMap,
        BatchCompute
    },
    data(){
        return{
            drawStyle: false,
            isUseDraw: false,
            isUseMeasure: false,
            isUseQuery: false,
            isPopOpen: false
        }
    },
    computed: {
        ...mapGetters({
            page2: "page/page2",
            page3: "page/page3",
            page1: "page/page1",
            picker5: "picker/picker5"
        })
    },
    mounted() {
        this.$nextTick(() => {
            this.map = this.$refs.mapview.getMap();
        })
    },
    watch: {
        radio: {
            handler(val) {
                // 删除之前的底图
                if (this.map && this.map.getLayers().getLength() > 0) {
                    // this.map.getLayers().clear();
                    const tianditu = this.map.getLayers().item(0)
                    this.map.removeLayer(tianditu)
                    
                    console.log(this.map.getLayers())
                }
                // 添加新的底图
                this.addTianditu(val);
                this.initOverView(val)
            },
            deep: true
        }
    },
    methods:{
        ...mapActions({
            changepage2: "page/changepage2",
            changepage3: "page/changepage3",
            changepage1: "page/changepage1"
        }),
        //控制切换底图div
        showSwitchPop() {
          if (this.isPopOpen == false){
            this.isPopOpen = true
          }else{
            this.isPopOpen = false
          }
        },
        hideDiv() {
          // 在点击事件触发时，将元素隐藏
          this.isPopOpen = false
        },
        // 标绘工具
        draw() {
            this.isUseDraw = !this.isUseDraw;
            if (!this.isUseDraw) {
                this.$refs.drawView.closeDraw();
            }
            if (this.isUseMeasure) {
                this.isUseMeasure = false;
                this.$refs.measureView.closeDraw();
            }

            if (this.isUseQuery) {
                this.isUseQuery = false;
                this.$refs.queryMenuView.closeDraw();
            }
        },
        // 关闭标绘工具
        drawClose() {
            this.isUseDraw = false;
        },
        // 测量工具
        measure() {
            this.isUseMeasure = !this.isUseMeasure;
            if (!this.isUseMeasure) {
                this.$refs.measureView.closeDraw();
            }
            if (this.isUseDraw) {
                this.isUseDraw = false;
                this.$refs.drawView.closeDraw();
            }
            if (this.isUseQuery) {
                this.isUseQuery = false;
                this.$refs.queryMenuView.closeDraw();
            }
        },
        // 关闭测量工具
        measureClose() {
            this.isUseMeasure = false;
        },
        // 打开空间查询工具
        queryDraw() {
            this.isUseQuery = !this.isUseQuery;
            if (!this.isUseQuery) {
                this.$refs.queryMenuView.closeDraw();
            }
            if (this.isUseMeasure) {
                this.isUseMeasure = false;
                this.$refs.measureView.closeDraw();
            }
            if (this.isUseDraw) {
                this.isUseDraw = false;
                this.$refs.drawView.closeDraw();
            }
        },
        // 关闭空间查询工具
        queryDrawClose() {
            this.isUseQuery = false;
        },
    }
}
</script>
<style scoped>
.main{
    display: flex;
    justify-content: space-between;
    margin: 16px 16px 0;
}
.left{
    /* margin-top:16px; */
    height: calc(100% - 84px);
    max-width: calc(100% - 1276px);
    min-width: 600px;
    margin-right: 16px;
    /* margin-left: 16px; */
}
.left .headerr{
    margin-top: 12px
}
.left .item, .headerr{
    display: flex;
    flex-direction: column
}
.left .headerr span{
    margin: 24px 0;
}
.left .item span, .headerr span{
    margin: 12px 0;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 28px;
    text-align: justify;
    font-style: normal;
}
.left .headerr .title{
    font-family: PingFangSC, PingFang SCQ;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    line-height: 28px;
    text-align: left;
    font-style: normal;
}
.left .item .title{
    font-family: PingFangSC, PingFang SCQ;
    font-weight: 500;
    font-size: 18px;
    color: #000000;
    line-height: 28px;
    text-align: left;
    font-style: normal;
}
.mapview {
  height: 873px;
  width: 1260px;
  /* top: 16px; */
  border-radius: 6px
  /* width:100vw; */
  /* background: red; */
}
.ol-viewport canvas {
    border-radius: 6px;
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
.footinfo {
  height: 30px;
  background: #ffffff;
  border-radius: 6px;
  /* opacity: 0.6; */
}
.drawStylePanel {
  right: 0;
  top: 16px;
  margin-right: 80px;
  position: absolute;
}
.map-tool {
  position: absolute;
  z-index: 10;
  right: 16px;
  top: 16px;
}
.tool-button {
  width: 40px;
  height: 40px;
  color: #2c2c2c;
  background-color: #ffffff;
  border-radius: 5px;
  display: flex; 
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}
.measure {
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
