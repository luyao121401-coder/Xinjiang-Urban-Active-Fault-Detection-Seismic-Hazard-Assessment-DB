<!-- 地震灾害损失评估批量计算 -->

<template>
    <div class="container">
        <!-- <div>
            <HeaderMenu></HeaderMenu>
        </div> -->
        <SmallPicker v-if="picker2 == 1 || picker3 == 1 || picker4 == 1"></SmallPicker>
        <compute-history v-if="picker5 == 1"></compute-history>
        <div v-else class="main">
            <div class="batch-compute">
                <div class="headerr">
                    <span>地震灾害损失预评估批量计算</span>
                    <div class="right" @click="showHistory()">
                        <!-- <img></img> -->
                        <img style="margin-right: 10px" src="@/assets/img/计算记录.png"></img>
                        <span>计算记录</span>
                    </div>
                </div>
                <div class="title-s">
                    <img src="@/assets/icon/地震目录@2x.png"></img>
                    <span>地震目录</span>
                </div>
                <div class="table-container" style="margin-bottom: 20px">
                    <el-table :data="tableData" stripe height="100%" style="width:100%" :header-cell-style="{ backgroundColor: '#D9E2ED', color: '#000000', height: '40px' }">
                        <el-table-column align="center" width="50px" label="序号" type="index"></el-table-column>
                        <el-table-column align="center" width="80px" label="震中经度" prop="longitude"></el-table-column>
                        <el-table-column align="center" width="80px" label="震中纬度" prop="latitude"></el-table-column>
                        <el-table-column align="center" width="150px" label="发震时刻" prop="earthquaketime"></el-table-column>
                        <el-table-column align="center" width="60px" label="震级" prop="magnitude"></el-table-column>
                        <el-table-column align="center" width="100px" label="深度(km)" prop="depth"></el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                        <div style="display: flex;justify-content:center">
                                            <div class="cell-inside">
                                                <img 
                                                src="@/assets/icon/清空地震目录@2x.png"
                                                @click="handleClear(scope.row)"
                                                style="height:20px;width:20px;margin-right:4px"
                                                ></img>
                                                </el-button>
                                            </div>
                                        </div>
                                    </template>
                        </el-table-column>
                    </el-table>
                    <div class="buttons">
                        <div class="left">
                            <div class="add" @click="openDialog2">
                                <img style="height:18px;width:18px" src="@/assets/icon/添加地震@2x.png"></img>
                                <span>添加地震</span>
                            </div>
                            <div class="batch-add" @click="openDialog4">
                                <img style="height:18px;width:18px" src="@/assets/icon/批量添加地震@2x.png"></img>
                                <span>批量添加地震</span>
                            </div>   
                        </div>  
                        <div class="right" @click="handleClear(1)">
                            <img style="height:18px;width:18px" :src="tableData.length === 0 ? require('@/assets/icon/清空地震目录-禁用@2x.png') : require('@/assets/icon/清空地震目录@2x.png')"></img>
                            <span>清空地震目录</span>
                        </div>       
                    </div>
                </div>
                <div style="display:flex;flex-direction: column">
                    <div class="title-s">
                        <img src="@/assets/icon/计算模型@2x.png"></img>
                        <span>计算模型</span>
                    </div>
                    <div class="select-model">
                        <span>地震烈度衰减关系模型</span>
                        <el-select placeholder="选择地震烈度衰减关系模型"></el-select>
                    </div>
                </div>
                <div class="compute">
                    <el-button @click="openDialog3">开始计算</el-button>
                </div>
            </div>
            <!-- <div>
                <mapview class="mapview" ref="mapview">
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
                    <draw-style-panel 
                        class="drawStylePanel"
                        v-show="this.drawStyle == true"
                    ></draw-style-panel>
                </mapview>
            </div> -->
        </div>
    </div>
</template>
<script>
 import HeaderMenu from "./HeaderMenu.vue"
 import mapview from "../omap/mapview.vue"
import footinfo from "../omap/footinfo.vue";
import SwitchMap from "../omap/SwitchMap.vue";
import SmallPicker from "./SmallPicker.vue"
import { mapGetters, mapActions } from "vuex"
import ComputeHistory from "./ComputeHistory.vue"


export default{
    components: { 
        // HeaderMenu, 
        // mapview, 
        // footinfo, 
        // SwitchMap,
        SmallPicker,
        ComputeHistory
        // BatchCompute
    },
    data(){
        return{
            
            drawStyle: false,
            isUseDraw: false,
            isUseMeasure: false,
            isUseQuery: false,
            isPopOpen: false,
            historyShow: false,     //计算记录组件展示
            tableData: [
            {
                index:1,
                longitude: 78.43,
                latitude: 41.07,
                earthquaketime: "2024/1/23 0:00:00",
                magnitude: 4.5,
                depth: 10
            },{
                index:1,
                longitude: 78.43,
                latitude: 41.07,
                earthquaketime: "2024/1/23 0:00:00",
                magnitude: 4.5,
                depth: 10
            },{
                index:1,
                longitude: 78.43,
                latitude: 41.07,
                earthquaketime: "2024/1/23 0:00:00",
                magnitude: 4.5,
                depth: 10
            }]
        }
    },
    computed: {
        ...mapGetters({
            picker2: "picker/picker2",
            picker3: "picker/picker3",
            picker4: "picker/picker4",
            picker5: "picker/picker5"
            
        })
    },
    mounted() {
        // this.$nextTick(() => {
        //     this.map = this.$refs.mapview.getMap();
        // })
        console.log(this.tableData)
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
        },
        // picker5:{
        //     handler(v){
        //         if(v == 1){
        //             this.historyShow = true
        //         }else{
        //             this.historyShow = false
        //         }
        //     }
        // }
    },
    methods:{
        ...mapActions({
            changepicker2: "picker/changepicker2",
            changepicker3: "picker/changepicker3",
            changepicker4: "picker/changepicker4",
            changepicker5: "picker/changepicker5"
        }),
        // 清空地震目录
        handleClear(row) {
            if(row == 1){
                this.$confirm('确定要清空全部数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.tableData = []   //清空数据
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }else{
                this.$confirm('确定要清空该行数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const index = this.tableData.indexOf(row);
                    if (index !== -1) {
                        this.tableData.splice(index, 1);
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        });
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        showHistory(){
            this.changepicker5(1)
            console.log(this.picker5)
            // this.historyShow = true
        },
        // 打开添加地震的dialog
        openDialog2(){
            this.changepicker2(1)
            console.log(this.picker2)
        },
        openDialog3(){
            this.changepicker3(1)
            console.log(this.picker3)
        },
        openDialog4(){
            this.changepicker4(1)
            console.log(this.picker4)
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
.main{
    display: flex;
    /* height: 100%; */
}
.batch-compute{
    display: flex;
    flex-direction: column;
    height: calc(100% - 84px);
    /* max-width: calc(100% - 1276px); */
    /* margin: 16px 16px 0; */
    margin: 16px 16px 0 0;
    width:600px;
    /* min-width: 600px; */
    /* padding: 28px 24px */
}
.batch-compute .headerr{
    display: flex;
    justify-content: space-between;
    /* margin: 28px 24px */
}
.batch-compute .headerr span{
    width: 260px;
    height: 28px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    line-height: 28px;
    text-align: left;
    font-style: normal;
    /* margin-bottom: 25px */
}
.batch-compute .title-s{
    display: flex;
    align-items: center;
    margin-bottom: 17px
}
.batch-compute .title-s img{
    height: 24px;
    width: 24px
}
.batch-compute .headerr .right{
    display: flex;
    align-items: center;
    margin-bottom: 25px
}
.batch-compute .headerr .right span{
    text-align: center;
    width: 64px;
    height: 22px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #303030;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    cursor: pointer
}
.batch-compute .table-container{
    margin-bottom: 24px
}
.el-table .el-table__cell {
    padding: 0;
}
.table-container /deep/tr{
    height: 40px;
    background: none;
    border: 1px solid #EDEDED;
}
.batch-compute .buttons{
    display: flex;
    justify-content: space-between;
    margin: 12px 0 11px 0
}
.batch-compute .buttons .left{
    display: flex;
}
.batch-compute .buttons .left .add, .left .batch-add, .buttons .right{
    display:flex;
    align-items: center;
    margin-left: 16px;
    width: 70px;
    height: 14px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #014FD9;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    cursor: pointer;
    width: 100px 

}
.batch-compute .buttons .right span{
    width: 200px
}
.batch-compute .buttons .left .batch-add{
    margin-left: 27px;
    width: 84px;
    height: 14px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #303030;
    line-height: 21px;
    text-align: left;
    font-style: normal;
    cursor: pointer;
    width: 120px
}
.batch-compute .buttons .right{
    margin-right: 12px;
    width: 120px;
    height: 14px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #CCCCCC;
    line-height: 21px;
    text-align: left;
    font-style: normal;
}
.batch-compute .compute{
    margin: 24px auto 0px
}
.batch-compute .compute .el-button{
    width: 200px;
    /* height: 36px; */
    /* background: #E8E8E8;
    border-radius: 6px; */
    background: #0054A0;
    border-radius: 6px;
}
.batch-compute .compute /deep/.el-button span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #FFF;
    text-align: center;
    font-style: normal;
    margin: auto
}
.batch-compute .select-model{
    display: flex;
    flex-direction: column
}
.batch-compute .select-model span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #181818;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    margin-bottom: 10px
}
/* 地图 */
.mapview {
  /* height: 873px; */
  height: calc( 100vh - 100px);
  width: 1260px;
  top: 16px;
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



</style>