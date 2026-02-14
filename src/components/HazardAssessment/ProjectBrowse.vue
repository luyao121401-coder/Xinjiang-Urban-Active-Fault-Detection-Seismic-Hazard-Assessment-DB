<template>
    <div style="height: calc(100% - 16px);">
        <div>
            <HeaderMenu></HeaderMenu>
        </div>
        <DataServe v-if="page6 == 1"></DataServe>
        <ThematicBrowse v-if="page5 == 1"></ThematicBrowse>
        <div v-if="page4 == 1" style="display: flex;justify-content: space-between">
            <side-bar class="side-bar" @layer-toggle="handleLayerToggle" />
            <div>
                <mapview class="mapview" ref="mapview">
                    <div class='map-tool'>
                        <div @click="draw()" class="tool-button" title="标绘">
                        <img
                            :src=" isUseDraw ? require('@/assets/images/绘制.png') : require('@/assets/images/tool_draw_icon.png')"
                            alt
                            width="28px"
                            height="28px"
                        />
                        </div>
                        <div
                        @click="measure()"
                        class="tool-button"
                        title="测量工具"
                        >
                        <img
                            :src=" isUseMeasure ? require('@/assets/images/测量.png') : require('@/assets/images/tool_measure_icon.png')"
                            alt
                            width="28px"
                            height="28px"
                        />
                        </div>
                        <div
                        @click="queryDraw()"
                        class="tool-button"
                        :class="{ toolButtonPress: isUseQuery }"
                        title="空间查询"
                        >
                        <img
                            :src="require('@/assets/icon/空间查询@2x.png')"
                            alt
                            width="28px"
                            height="28px"
                        />
                        </div>
                    </div>
                    <SwitchMap id="swtichMap"></SwitchMap>
                    <footinfo class='footinfo'></footinfo>
                    <draw-menu-view
                        ref="drawView"
                        v-show="this.isUseDraw == true"
                        class="measure"
                        @close="drawClose()"
                    ></draw-menu-view>
                    <MeasureMenuView
                        ref="measureView"
                        v-if="this.isUseMeasure == true"
                        class="measure"
                        @close="measureClose()"
                    ></MeasureMenuView>
                    <QueryMenuView
                        ref="queryMenuView"
                        v-if="this.isUseQuery == true"
                        class="query"
                        @close="queryDrawClose()"
                    ></QueryMenuView>
                    <draw-style-panel 
                        class="drawStylePanel"
                        v-show="this.drawStyle == true"
                    ></draw-style-panel>
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
import QueryMenuView from "../omap/QueryMenuView.vue";
import SideBar from "./SideBar.vue"
import { mapActions, mapGetters } from "vuex"
import DataServe from "./DataServe.vue"
import ThematicBrowse from "./ThematicBrowse.vue"






export default{
    components: { 
        HeaderMenu, 
        mapview, 
        footinfo, 
        DrawStylePanel,
        DrawMenuView,
        QueryMenuView,
        MeasureMenuView,
        SwitchMap,
        SideBar,
        DataServe,
        ThematicBrowse
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
            page4: "page/page4",
            page5: "page/page5",
            page6: "page/page6",

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
            changepage4: "page/changepage4",
            changepage5: "page/changepage5",
            changepage6: "page/changepage6"
        }),

        //侧边栏监听事件
        handleLayerToggle(payload) {
          if (this.$refs.mapview) {
              this.$refs.mapview.updateLayerVisibility(payload);
          }
        },

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
::v-deep .el-input__icon{
    height: 100%;
    width: 25px;
    text-align: center;
    transition: all .3s;
    line-height: 0px;
}
.side-bar{
    /* position: absolute; */
    /* z-index: 999; */
}
.mapview {
  height: calc(100vh - 68px);
  width: calc(100vw - 308px);
  /* width:100vw; */
  /* background: red; */
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
.query {
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
