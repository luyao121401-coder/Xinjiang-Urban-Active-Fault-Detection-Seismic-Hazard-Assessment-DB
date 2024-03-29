<!-- 地震灾害损失评估dialog -->
<template>
    <div>
        <!-- 添加地震dialog -->
        <el-dialog class="earthquake-add" :visible.sync="dialogShow2" @close="closeDialog2()" :close-on-click-modal="false">
            <div slot="title" class="title">
                <span>添加地震</span>
            </div>
            <div class="body">
                <div class="item">
                    <span>震中经度</span>
                    <el-input placeholder="请输入震中经度，如78.43"></el-input>
                    <span style="position: absolute;right: 9px;font-size:14px">度</span>
                </div>
                <div class="item">
                    <span>震中纬度</span>
                    <el-input placeholder="请输入震中经度，如41.07"></el-input>
                    <span style="position: absolute;right: 9px;font-size:14px">度</span>
                </div>
                <div class="item-date"style="position: relative">
                    <span style="margin-right: 15px">发震时刻</span>
                    <el-date-picker
                    v-model="value"
                    type="date"
                    placeholder="请选择发震日期"
                    >
                    </el-date-picker>
                    <i class="el-icon-date" style="position: absolute;right: 72px;top:13px;width:18px"></i>
                </div>
                <div class="item">
                    <span>地震震级</span>
                    <el-input placeholder="请输入地震震级"></el-input>
                </div>
                <div class="item">
                    <span>震源深度</span>
                    <el-input placeholder="请输入震源深度"></el-input>
                </div>
            </div>
            <div class="bottom">
                <el-button class="cancel" @click="closeDialog2">取消</el-button>
                <el-button class="confirm" type="primary">确定</el-button>
            </div>
        </el-dialog>
        <!-- 开始计算dialog -->
        <el-dialog class="batch-compute" :visible.sync="dialogShow3" @close="closeDialog3()" :close-on-click-modal="false">
            <div slot="title" class="title" style="width: 200px">
                <span>开始批量计算任务</span>
            </div>
            <div class="body">
                <div class="item">
                    <span>任务名称</span>
                    <div class="input-combine">
                        <el-input 
                        placeholder="请输入任务名称"
                        ></el-input>
                    </div>
                </div>
                <div class="tips">
                    <i class="el-icon-warning-outline" style="margin-right: 10px;margin-top: 2px"></i>
                    <span>任务名称为必填项，用于任务的区分</span>
                </div>
                <div class="item">
                        <span>备注说明</span>
                        <el-input 
                        type="textarea" 
                        placeholder="请输入备注说明"
                        maxlength="100"
                        show-word-limit
                        style="width: 478px"></el-input>
                </div>
            </div>
            <div class="bottom">
                <el-button @click="closeDialog3">取消</el-button>
                <el-button type="primary">开始</el-button>
            </div>
        </el-dialog>
        <!-- 批量添加地震dialog -->
        <el-dialog class="batch-add" :visible.sync="dialogShow4" @close="closeDialog4()" :close-on-click-modal="false">
            <div slot="title" class="title" style="width: 150px">
                <span>批量添加地震</span>
            </div>
            <div class="body">
                <div class="body-top">
                    <span class="left">上传地震目录</span>
                    <span class="right">下载模板</span>
                </div>
                <div class="body-main">
                    <el-upload
                    class='upload'
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">点击上传或将文件直接拖到此处上传</div>
                    <div class="el-upload__tip" slot="tip">
                        <i class="el-icon-warning-outline"></i>
                        请依据模板进行上传，支持excel、shp格式文件的上传</div>
                    </el-upload>
                </div>
            </div>
            <div class="bottom">
                <el-button @click="closeDialog4" class="cancel">取消</el-button>
                <el-button type="primary" class="confirm">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"

export default{
    data(){
        return{
            dialogShow2: false,
            dialogShow3: false,
            dialogShow4: false,
        }
    },
    mounted(){
        if(this.picker2 == 1){
            this.dialogShow2 = true
        }else{
            this.dialogShow2 = false
        }
        if(this.picker3 == 1){
            this.dialogShow3 = true
        }else{
            this.dialogShow3 = false 
        }
        if(this.picker4 == 1){
            this.dialogShow4 = true
        }else{
            this.dialogShow4 = false 
        }
    },
    computed: {
        ...mapGetters({
            picker2: "picker/picker2",
            picker3: "picker/picker3",
            picker4: "picker/picker4",
        })
    },
    watch:{
        picker2:{
            handler(v){
                this.dialogShow2 = !this.dialogShow2
            }
        },
        picker3:{
            handler(v){
                this.dialogShow3 = !this.dialogShow3
            }
        },
        picker4:{
            handler(v){
                this.dialogShow4 = !this.dialogShow4
            }
        },
    },
    methods:{
        ...mapActions({
            changepicker2: "picker/changepicker2",
            changepicker3: "picker/changepicker3",
            changepicker4: "picker/changepicker4"
        }),
        closeDialog2(){
            this.changepicker2(0)
        },
        closeDialog3(){
            this.changepicker3(0)
        },
        closeDialog4(){
            this.changepicker4(0)
        },
    }
}
</script>
<style scoped>
.earthquake-add{
    display: flex;
    flex-direction: column;
    align-items: center
}
.earthquake-add /deep/.el-dialog{
    width: 698px;
    height: 500px;
    background: #FFFFFF;
    border-radius: 6px;
}
.el-dialog .title{
    width: 96px;
    height: 33px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 24px;
    color: #181818;
    line-height: 33px;
    text-align: center;
    font-style: normal;
    margin: auto;
}
/deep/.el-dialog__header {
    padding: 20px 20px 2px;
}
.body{
    display: flex;
    flex-direction: column;
}

.body .item span,.body .item-date span{
    width: 90px;
    margin-right: 12px;
    font-size: 18px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    color: #181818;
    font-style: normal;
    /* text-align: right; */
    /* font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #181818;
    line-height: 25px;
    text-align: right;
    font-style: normal; */
}
.bottom{
    margin-top: 32px;
    display: flex;
    justify-content: center
}
.earthquake-add .body .item{
    display: flex;
    align-items: center;
    margin: 5px 0;
    justify-content: space-between;
    margin: 0 auto 16px
}
.body .item-date{
    /* display: flex; */
    /* align-items: center; */
    /* margin: 5px 0; */
    /* justify-content: space-between; */
    margin-bottom: 16px;
    margin-left: 40px
}
.body .item-date /deep/.el-input__inner{
    width: 478px;
    height: 40px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
    /* padding-left: 10px */
}
.body .item-date .el-input__icon{
    display: none
}
.body .item-date span{
    /* margin-right: 14px */
}
.body .item /deep/.el-input__inner{
    height: 40px;
    width: 478px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
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
/* 开始批量计算任务dialog */
.batch-compute /deep/.el-dialog{
    width: 698px;
    height: 464px;
    background: #FFFFFF;
    border-radius: 6px;
}
.batch-compute{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center
}
.batch-compute .body .item{
    display: flex;
    margin: 0 auto
    /* margin: 0 auto 16px */
    /* align-items: center; */
    /* margin: 5px 0; */
    /* justify-content: space-between; */
}
.batch-compute .tips{
    display:flex;
    align-items: center;
    text-align: center;
    margin:19px 0px 19px 147px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #F87A35;
    line-height: 21px;
    text-align: left;
    font-style: normal;
}
.batch-compute .bottom{
    margin-top: 55px
}
/deep/.el-textarea__inner{
    width: 478px;
    height: 128px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ABABAB;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
/* 批量添加地震 */
.batch-add /deep/.el-dialog{
    width: 698px;
    height: 500px;
    background: #FFFFFF;
    border-radius: 6px;
}
.batch-add .body{
    margin: 0 48px
}
.body-top{
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px
}
.batch-add .body-main{
    display: flex;
    flex-direction: column;
    align-items: center
}
.batch-add /deep/.el-upload-dragger{
    width: 562px;
    height: 168px;
    background: #ECF6FF;
    border-radius: 10px;
    border: 2px dotted #005BA3;
    opacity: 0.55;
}
.batch-add .body-top .left{
    width: 108px;
    height: 25px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #181818;
    line-height: 25px;
    text-align: left;
    font-style: normal;
}
.batch-add .body-top .right{
    width: 56px;
    height: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #005BA3;
    line-height: 20px;
    text-align: right;
    font-style: normal;
}
.batch-add .el-upload__tip{
    margin-top: 19px;
    width: 360px;
    height: 14px;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #F87A35;
    line-height: 21px;
    text-align: left;
    font-style: normal;
}
.batch-add .bottom{
    margin-top: 51px
}
</style>