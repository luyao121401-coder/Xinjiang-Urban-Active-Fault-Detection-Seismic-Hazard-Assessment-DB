<template>
    <div>
        <el-dialog class="advanced-search" :visible.sync="dialogShow1" @close="closeDialog1()" :close-on-click-modal="false">
            <div slot="title" class="title">
                <span>高级检索</span>
            </div>
            <div class="body">
                <div class='item'>
                    <span>传感器</span>
                    <el-input placeholder="请输入传感器"></el-input>
                </div>
                <div class='item'>
                    <span>数据格式</span>
                    <el-select placeholder="请选择数据格式"></el-select>
                </div>
                <div class='item'>
                    <span>波段信息</span>
                    <el-input placeholder="请输入波段信息"></el-input>
                </div>
                <div class='item'>
                    <span>项目编号</span>
                    <el-select placeholder="请选择项目编号"></el-select>
                </div>
                <div class='item'>
                    <span>提交单位</span>
                    <el-input placeholder="请输入提交单位"></el-input>
                </div>
                <div class='item'>
                    <span>项目名称</span>
                    <el-select placeholder="请选择项目名称"></el-select>
                </div>
                <div class='item-date'>
                    <span>时相</span>
                    <div class="date">
                        <el-date-picker v-model="startDate" placeholder="开始日期时间"></el-date-picker>
                        <span style="
                            width: 14px;
                            font-size: 14px;
                            color: #181818;
                            text-align: left;
                            font-style: normal;
                            margin: 0 12px">至</span>
                        <el-date-picker v-model="endDate" placeholder="结束日期时间"></el-date-picker>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div>
                    <el-button>重置条件</el-button>
                    <el-button type="primary">开始检索</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"

export default{
    data(){
        return{
            startDate: '',
            endDate: '',
            dialogShow1: true
        }
    },
    mounted(){
        // if(this.picke1 == 1){
        //     this.dialogShow1 = true
        // }else{
        //     this.dialogShow1 = false
        // }
    },
    computed: {
        ...mapGetters({
            picker1: "picker/picker1"
        })
    },
    // watch:{
    //     picker1:{
    //         handle(v){
    //             if(v == 1){
    //                 this.dialogShow1 = true
    //             }else{
    //                 this.dialogShow1 = false
    //             }
    //         }
    //     }
    // },
    methods:{
        ...mapActions({
            changepicker1: "picker/changepicker1"
        }),
        closeDialog1(){
            this.changepicker1(0)
        }
    }
}
</script>
<style scoped>
/* /deep/.el-dialog{
    width: 698px;
    height: 608px;
    background: #FFFFFF;
    border-radius: 6px;
}
.el-dialog .title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24px;
    color: #181818;
    line-height: 33px;
    text-align: center;
    font-style: normal;
}
.body{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.body .item,.body .item-date{
    display: flex;
    align-items: center;
    margin: 5px 0;
    justify-content: space-between;
}
.el-dialog .body .item span, .item-date span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #181818;
    line-height: 25px;
    text-align: right;
    font-style: normal;
    width: 100px;
    margin-right: 12px
}
.el-dialog__body{
    width: 100%
}
.body .item /deep/.el-select{
    width: 478px;
    
} 
/deep/.el-input__inner{
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
    width: 478px;
    height: 40px;
}
.date{
    width: 100%
}
.date span{
    margin: 0 5px
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: calc(50% - 18px)!important;
}
.bottom{
    text-align: center;
    align-items: center;
    margin: 10px auto 0;
}
.bottom .el-button--default{
    width: 200px;
    height: 48px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 2px solid #97BBD8;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
    text-align: center;
    font-style: normal;
}
.bottom .el-button--primary{
    width: 200px;
    height: 48px;
    background: #0054A0;
    border-radius: 6px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #FFFFFF;
    text-align: center;
    font-style: normal;
} */
/deep/.el-dialog{
    width: 698px;
    height: 608px;
    background: #FFFFFF;
    border-radius: 6px;
}
.el-dialog .title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24px;
    color: #181818;
    line-height: 33px;
    text-align: center;
    font-style: normal;
}
/deep/.el-dialog .body{
    display: flex;
    flex-direction: column;
    width: 562px;
    justify-content: center;
    margin: auto
}
.el-dialog .body .item{
    margin-bottom: 16px
}
.el-dialog .body .item span, .item-date span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #181818;
    line-height: 25px;
    text-align: right;
    font-style: normal;
    width: 100px;
    margin-right: 12px
}
.el-dialog .body .item, .body .item-date{
    display: flex;
    justify-content: space-between
}
/deep/.el-dialog .item .el-input__inner{
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
    width: 478px;
    height: 40px;
}
/deep/.el-dialog .item-date .date{
    display: flex;
    justify-content: center
}
/deep/.el-dialog .item-date .el-input__inner{
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
    height: 40px;
}
.bottom{
    text-align: center;
    align-items: center;
    margin: 10px auto 0;
    margin-top: 48px
}
.bottom .el-button--default{
    width: 200px;
    height: 48px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 2px solid #97BBD8;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #000000;
    text-align: center;
    font-style: normal;
}
.bottom .el-button--primary{
    width: 200px;
    height: 48px;
    background: #0054A0;
    border-radius: 6px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #FFFFFF;
    text-align: center;
    font-style: normal;
} 
</style>