<template>
    <area-history v-if="picker7 == 1"></area-history>
    <div v-else class="area-retrieval">
        <div class="title">
            <span>地震灾害损失评估区域查询检索与计算</span>
            <div class="history" @click="showHistory()">
                <img style="margin-right: 10px" src="@/assets/img/计算记录.png"></img>
                <span style="font-size:16px">计算记录</span>
            </div>
        </div>
        <div class="title-s">
            <img src="@/assets/icon/检索方式@2x.png"></img>
            <span>检索方式</span>
        </div>
        <div class="groups">
            <el-radio v-model="radio">缓冲区</el-radio>
            <div class="group">
                <div class="group-a">
                    <div class="a-item" style="margin-right: 20px" @click="changeHcq(1)">
                        <img :src="hcq == 1 ? require('@/assets/icon/点缓冲区选中状态@2x.png') : require('@/assets/icon/点缓冲区未选中状态@2x.png')"></img>
                        <span :style=" hcq == 1 ? 'color: #0054A0' : 'color: #181818;'">点缓冲区</span>
                    </div>
                    <div class="a-item" @click="changeHcq(2)">
                        <img :src="hcq == 2 ? require('@/assets/icon/线缓冲区选中状态@2x.png') : require('@/assets/icon/线缓冲区未选中状态@2x.png')"></img>
                        <span :style=" hcq == 2 ? 'color: #0054A0' : 'color: #181818;'">线缓冲区</span>
                    </div>
                </div>
                <div class="group-b">
                    <div class="b-item">
                        <!-- <div style="display: flex;justify-content: space-between;align-items: center"> -->
                            <span>查询点坐标</span>
                            <!-- <span style="margin-right: 10px;color: #0344D2;font-size: 14px;cursor: pointer">示例</span> -->
                        <!-- </div> -->
                        <el-input style="margin: 10px 10px 16px 0" placeholder="输入经纬度，示例 0.00,000"></el-input>
                    </div>
                    <div class="b-item">
                        <span>缓冲区距离（千米）</span>
                        <el-input style="margin: 10px 0 16px" placeholder="输入缓冲区距离"></el-input>
                    </div>
                </div>
                <div class="group-c">
                    <el-radio-group v-model="radioo">
                        <el-radio :label="1">行政区划</el-radio>
                        <el-radio :label="2">自定义区域</el-radio>
                        <el-radio :label="3">影响场</el-radio>
                    </el-radio-group>
                </div>
            </div>
        </div>
        <div class="title-s">
            <img src="@/assets/icon/检索内容@2x.png"></img>
            <span>检索内容</span>
        </div>
        <el-checkbox-group v-model="checkList">
            <el-checkbox label="人口数据"></el-checkbox>
            <el-checkbox label="经济数据"></el-checkbox>
            <el-checkbox label="建筑物数据"></el-checkbox>
        </el-checkbox-group>
        <div class="buttons">
            <el-button>查询检索</el-button>
            <el-button>查询检索并计算</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import AreaHistory from "./AreaHistory.vue"


export default{
    components: { AreaHistory },
    data(){
        return{
            radio: 1,
            radioo: null,
            checkList: [],
            hcq: 1,
        }
    },
    computed: {
        ...mapGetters({
            picker7: "picker/picker7",
            
        })
    },
    methods:{
        ...mapActions({
            changepicker7: "picker/changepicker7",
        }),
        showHistory(){
            console.log(666666)
            this.changepicker7(1)
            console.log(this.picker7)
            // this.historyShow = true
        },
        changeHcq(hcq){
            this.hcq = hcq
        }
    }
}
</script>
<style scoped>
.area-retrieval{
    display: flex;
    flex-direction: column;
    padding: 12px 16px 0 8px;
    width: 100%
}
.area-retrieval .title{
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20px;
    color: #000000;
    line-height: 28px;
    text-align: left;
    font-style: normal;
    margin-bottom: 25px
}
.area-retrieval .title .history{
    display: flex;
    align-items: center;
    cursor: pointer
}
.area-retrieval .title .history img,.area-retrieval .title-s img{
    width: 24px;
    height: 24px;
}
.area-retrieval .title-s{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #181818;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
    margin-bottom: 18px
}
.area-retrieval .groups{
    display: flex;
    flex-direction: column
}
.area-retrieval .groups .group{
    display: flex;
    flex-direction: column;
    margin-top: 6px
}
.area-retrieval .groups .group-a, .group-b{
    margin-left: 24px
}
.area-retrieval .groups .group .group-a{
    display: flex;
    margin-bottom: 14px
    
}
.area-retrieval .groups .group .a-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer
}
.area-retrieval .groups .group .group-a img{
    height: 24px;
    width: 24px;
    margin-bottom: 8px
}
.area-retrieval .groups .group .group-b{
    display: flex;
    justify-content: center
}
.area-retrieval .groups .group .group-b /deep/.el-input__inner{
    width: 274px;
    height: 40px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 1px solid #CCCCCC;
}
.area-retrieval .groups .group-c .el-radio-group{
    display: flex;
    flex-direction: column
}
.area-retrieval .buttons{
    display: flex;
    justify-content: center
}
.area-retrieval .buttons .el-button{
    width: 240px;
    height: 40px;
    background: #ECECEC;
    border-radius: 6px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #CCCCCC;
    text-align: center;
    font-style: normal;
    border: none
}
/* checkbox */
.area-retrieval .el-checkbox-group {
    display: flex;
    flex-direction: column
}
.area-retrieval .el-checkbox {
    margin-bottom: 20px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 16px;
    color: #181818;
    text-align: left;
    font-style: normal;
}
/* .area-retrieval /deep/.el-checkbox__inner /deep/.is_checked{
    background: #0054A0;
    border: 2px solid #0054A0;
} */
/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #0054A0!important;
    border-color: #0054A0!important;
}
/deep/.el-checkbox__input.is-checked+.el-checkbox__label {
    color: #0054A0
}
/* radio */
.el-radio{
    color: #606266;
    font-weight: 500;
    /* line-height: 1; */
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
    margin-right: 30px; 
    margin-bottom: 16px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #181818;
    line-height: 22px;
    text-align: left;
    font-style: normal;
}
/deep/.el-radio__input.is-checked .el-radio__inner {
    border-color: #0054A0!important;
    background: #0054A0!important;
}
/deep/.el-radio__input.is-checked+.el-radio__label {
    color: #0054A0
}
</style>