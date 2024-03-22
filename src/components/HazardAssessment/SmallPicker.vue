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
                <div class='item'>
                    <span>时相</span>
                    <div class="date">
                        <el-date-picker v-model="startDate" placeholder="开始日期时间"></el-date-picker>
                        <span>至</span>
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
            dialogShow1: false
        }
    },
    mounted(){
        console.log("这是smallpicker")
        if(this.picke1 == 1){
            this.dialogShow1 = true
        }else{
            this.dialogShow1 = false
        }
    },
    computed: {
        ...mapGetters({
            picker1: "picker/picker1"
        })
    },
    watch:{
        picker1:{
            handle(v){
                console.log("smallllllllllll")
                console.log(v)
                this.dialogShow1 = !this.dialogShow1
                console.log(this.dialogShow1)
            }
        }
    },
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
.el-dialog{
    width: 698px;
    height: 608px;
    background: #FFFFFF;
    border-radius: 6px;
}
.body{
    display: flex;
    flex-direction: column;
}
.body .item{
    display: flex;
    align-items: center;
    margin: 5px 0;
    justify-content: space-between;
}
.el-dialog__body{
    width: 100%
}
.body .item span{
    width: 70px;
    
}
.body .item /deep/.el-select{
    width: 100%;
    
}
.date{
    width: 100%
}
.date span{
    margin: 0 5px
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: calc(50% - 12px);
}
.bottom{
    /* display: flex; */
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
}
</style>