<template>
    <div class="container">
        <div style="cursor: pointer" class="get-back-button" @click="getBack">
            <i class="el-icon-arrow-left"></i>
            <span>返回</span>
        </div>
        <div class="compute-history">
            <div class="headerr">
                <span>地震灾害损失预评估区域计算记录</span>
            </div>
            <div class="main">
                <div class="top-tools">
                    <div class="search-group">
                        <i 
                        class="el-icon-search"
                        style="color: #000000;
                        width:16px;height:16px;
                        opacity:0.5;
                        margin-left: 17px"
                        ></i>
                        <el-input></el-input>
                        <el-divider direction="vertical"></el-divider>
                        <el-button style="margin: 0 20px 0 15px" type='text'>搜索</el-button>
                    </div>
                    <div class="clear">
                        <!-- <img></img> -->
                        <i class="el-icon-delete-solid"></i>
                        <span style="margin-left: 9px">清空记录</span>
                    </div>
                </div>
                <div class="tips">
                    <span>·共进行过2次地震灾害损失预评估批量计算</span>
                </div>
                <div class="main-body">
                    <div class="info-card">
                        <span  class="name">任务名称任务名称文本示例</span>
                        <div>
                            <span>任务时间：2024年1月23日2时15分</span>
                            <span>计算地震数据：3个</span>
                        </div>
                        <div class="tips">
                            <i class="el-icon-loading"></i>
                            <span>任务计算中，请耐心等待。</span>
                        </div>
                    </div>
                    <div class="info-card">
                        <span class="name">任务名称任务名称文本示例</span>
                        <div>
                            <span>任务时间：2024年1月23日2时15分</span>
                            <span>计算地震数据：5个</span>
                        </div>
                        <div style="display: flex">
                            <el-button style="background: #E6F0F9;color:#1F60A7">
                                <i style="color:#1F60A7" class="el-icon-download"></i>
                                下载结果</el-button>
                            <el-button>
                                <i style="color: #777" class="el-icon-delete-solid"></i>
                                删除记录</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"

export default{
    data(){
        return{

        }
    },
    computed: {
        ...mapGetters({
            picker7: "picker/picker7"
        })
    },
    methods:{
        ...mapActions({
            changepicker7: "picker/changepicker7"
        }),
        getBack(){
            this.changepicker7(0)
            console.log(this.picker7)
        }
    }
}
</script>
<style scoped>
.container{
    padding: 30px 24px;
    height: 812px
}
.compute-history{
    display: flex;
    flex-direction: column;
    /* padding: 30px 24px; */
    align-items: center
}
.compute-history .get-back-button{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    cursor: pointer
}
.compute-history .headerr{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 500;
    font-size: 32px;
    color: #181818;
    line-height: 48px;
    text-align: center;
    font-style: normal;
    margin-bottom: 60px
}
.compute-history .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 1040px;
}
.compute-history .main .top-tools{
    display: flex;
    justify-content: space-between;
    align-items: center
}
.compute-history .main .tips{
    margin: 15px 0
}
.compute-history .main .tips span{
    /* width: 260px; */
    height: 14px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    line-height: 21px;
    text-align: left;
    font-style: normal;
}
.compute-history .main .top-tools .clear span, .top-tools .clear i{
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 16px;
    color: #777777;
    line-height: 24px;
    text-align: left;
    font-style: normal;
}
.compute-history .main .top-tools .search-group{
    display: flex;
    align-items: center;
    width: 450px;
    height: 40px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
}
.compute-history .main .top-tools .el-button--text{
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 16px;
    color: #181818;
    line-height: 24px;
    letter-spacing: 1px;
    text-align: left;
    font-style: normal;
}
.compute-history .search-group /deep/.el-input__inner{
    background-color: #F9F9F9;
    border: none
}
.compute-history .main .main-body{
    display: flex;
    flex-direction: column
}
.compute-history .main .main-body .info-card{
    display: flex;
    flex-direction: column;
    width: 1040px;
    height: 118px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.1);
    border-radius: 6px;
    padding: 16px 19px;
    margin: 12px 0
} 
.compute-history .main .main-body .info-card .name{
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 500;
    font-size: 18px;
    color: #181818;
    line-height: 27px;
    text-align: left;
    font-style: normal;
    margin-bottom: 12px
} 
.compute-history .main .main-body .info-card .tips span,.info-card i{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #3B78FF;
    line-height: 20px;
    text-align: left;
    font-style: normal;
} 
.compute-history .main .main-body .info-card .el-button{
    width: 110px;
    height: 24px;
    /* background: #E6F0F9; */
    border-radius: 6px;
    display: flex;
    align-items: center;
    margin: 12px 16px 0 0
} 
</style>