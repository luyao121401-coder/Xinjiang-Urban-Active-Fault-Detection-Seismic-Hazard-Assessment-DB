<template>
    <area-history v-if="picker7 == 1"></area-history>
    <div v-else class="area-retrieval">
        <div class="title">
            <span>地震灾害损失评估区域查询检索与计算</span>
            <div class="history" @click="showHistory()">
                <img src="@/assets/icon/检索方式@2x.png"></img>
                <span>计算记录</span>
            </div>
        </div>
        <div class="title-s">
            <img src="@/assets/icon/检索方式@2x.png"></img>
            <span>检索方式</span>
        </div>
        <div class="groups">
            <el-radio>缓冲区</el-radio>
            <div class="group">
                <div  class="group-a">
                    <div class="a-item">
                        <img src="@/assets/icon/点缓冲区选中状态@2x.png"></img>
                        <span>点缓冲区</span>
                    </div>
                    <div class="a-item">
                        <img src="@/assets/icon/线缓冲区未选中状态@2x.png"></img>
                        <span>线缓冲区</span>
                    </div>
                </div>
                <div class="group-b">
                    <div class="b-item">
                        <span>查询点坐标</span>
                        <el-input placeholder="输入经纬度，示例 0.00,000"></el-input>
                    </div>
                    <div class="b-item">
                        <span>缓冲区距离（千米）</span>
                        <el-input placeholder="输入缓冲区距离"></el-input>
                    </div>
                </div>
                <div class="group-c">
                    <el-radio-group>
                        <el-radio>行政区划</el-radio>
                        <el-radio>自定义区域</el-radio>
                        <el-radio>影响场</el-radio>
                    </el-radio-group>
                </div>
            </div>
        </div>
        <div class="title-s">
            <img src="@/assets/icon/检索内容@2x.png"></img>
            <span>检索内容</span>
        </div>
        <!-- <el-checkbox-group>
            <el-checkbox label="人口数据"></el-checkbox>
            <el-checkbox label="经济数据"></el-checkbox>
            <el-checkbox label="建筑物数据"></el-checkbox>
        </el-checkbox-group> -->
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
    }
}
</script>
<style scoped>
.area-retrieval{
    display: flex;
    flex-direction: column;
    padding: 12px 16px 0 0;
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
}
.area-retrieval .groups .group .group-a{
    display: flex;
    
}
.area-retrieval .groups .group .a-item{
    display: flex;
    flex-direction: column;
    align-items: center
}
.area-retrieval .groups .group .group-a img{
    height: 24px;
    width: 24px
}
.area-retrieval .groups .group .group-b{
    display: flex;
    justify-content: center
}
.area-retrieval .groups .group-c .el-radio-group{
    display: flex;
    flex-direction: column
}
.area-retrieval .buttons{
    display: flex;
    justify-content: center
}
</style>