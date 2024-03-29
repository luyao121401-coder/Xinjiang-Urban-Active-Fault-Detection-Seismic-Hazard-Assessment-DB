<!-- 地震信息与应急产出 -->
<template>
    <div>
        <div>
            <HeaderMenu></HeaderMenu>
        </div>
        <TriggerHistory v-if="picker6 == 1"></TriggerHistory>
        <div v-else class="output">
            <div class="top">
                <div style="display: flex;align-items: center;cursor: pointer" @click="jumpTo()">
                    <!-- <i class="el-icon-time"></i> -->
                    <img style="margin-right: 10px" src="@/assets/img/计算记录.png"></img>
                    <span>触发记录</span>
                </div>
            </div>
            <div class="main">
                <div class="title">
                    <span>地震信息与应急产出</span>
                </div>
                <div class="main-body">
                    <div class="info">
                        <div class="info-items">
                            <div class="info-item">
                                <span>地震名称</span>
                                <el-input v-model="name" placeholder="请输入地震名称"></el-input>
                            </div>
                            <div class="info-item right">
                                <span>地震类型</span>
                                <el-select v-model="type" placeholder="请输入地震类型">
                                    <el-option
                                        v-for="item in type_options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="info-items">
                            <div class="info-item">
                                <span>震中经度(°)</span>
                                <el-input v-model="longitude" placeholder="请输入经度，如：0.00"></el-input>
                            </div>
                            <div class="info-item right">
                                <span>震中纬度(°)</span>
                                <el-input v-model="latitude" placeholder="请输入纬度，如：0.00"></el-input>
                            </div>
                        </div>
                        <div class="info-items">
                            <div class="info-item">
                                <span>震级(M)</span>
                                <el-input v-model="magnitude" placeholder="请输入地震震级"></el-input>
                            </div>
                            <div class="info-item right">
                                <span>震源深度(千米)</span>
                                <el-input v-model="depth" placeholder="请输入震源深度"></el-input>
                            </div>
                        </div>
                        <div style="display: flex">
                            <div class="info-items" style="display:flex;flex-direction: column">
                                <div class="time"   style="display: flex;flex-direction: column">
                                    <span style="margin-bottom: 10px">发震时刻(UTC+8)</span>
                                    <!-- <el-input v-model="time" placeholder="发震时刻"></el-input> -->
                                    <el-date-picker
                                    v-model="time"
                                    type="datetime"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    placeholder="请选择发震时刻"
                                    >
                                    </el-date-picker>
                                </div>
                                <div class="tips">
                                    <i class="el-icon-warning-outline"></i>
                                    <span>仅可设定的当前时间之前的时间作为发震时刻。</span>
                                </div>
                            </div>
                            <div class="info-items" style="margin-left: 24px">
                                <div class="location"  style="display: flex;flex-direction: column">
                                    <span style="margin-bottom: 10px">参考位置</span>
                                    <el-input v-model="location" style="width: 420px" placeholder="请输入地震名称"></el-input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="results">
                        <div class="results-top">
                            <span class="mini-title">应急产出内容</span>
                            <div class="right">
                                <i class="el-icon-edit"></i>
                                <span>编辑产出内容</span>
                            </div>
                        </div>
                        <div class="results-pics">
                            <span class="mini-title">产出图件</span>
                        </div>
                        <div class="pics">
                            <div class="line" style="margin-top: 24px;">
                                <div style="display: flex;flex-direction: column;">
                                    <div class="pic-background" style="margin-left: 0;">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                            </div>
                            <div class="line">
                                <div style="display: flex;flex-direction: column;">
                                    <div class="pic-background" style="margin-left: 0;">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                            </div>
                            <div class="line">
                                <div style="display: flex;flex-direction: column;">
                                    <div class="pic-background" style="margin-left: 0;">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                                <div class="box">
                                    <div class="pic-background">
                                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                                    </div>
                                    <span style="margin-top: 8px">震区学校分布图</span>
                                </div>
                            </div>
                        </div>
                        <div class="results-report">
                            <span class="mini-title">产出报告</span>
                        </div>
                        <div class="line"  style="margin-top: 24px">
                            <div style="display: flex;flex-direction: column;">
                                <div class="pic-background" style="margin-left: 0;">
                                    <img class="img" src="@/assets/img/地形图.jpg"></img>
                                </div>
                                <span style="margin-top: 8px">震区学校分布图</span>
                            </div>
                        </div>
                        <div class="results-bottom">
                            <el-button :class=" trigger ? 'trigger el-button' : 'el-button'">产出触发</el-button>
                        </div> 
                        <!-- <div v-else class="btn-trigger">
                            <el-button>产出触发</el-button>
                        </div>  -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderMenu from "./HeaderMenu.vue"
import TriggerHistory from "./TriggerHistory.vue"
import { mapGetters, mapActions } from "vuex"
import moment from 'moment'; 


export default{
    components: { HeaderMenu, TriggerHistory },
    data(){
        return{
            name: '',
            type: '',
            longitude: '',
            latitude: '',
            magnitude: '',
            depth: '',
            time: '',
            location: '',
            type_options: [{
                value: '选项1',
                label: '构造地震'
                },{
                value: '选项2',
                label: '火山地震'
                },{
                value: '选项3',
                label: '塌陷地震'
                },{
                value: '选项4',
                label: '诱发地震'
                },{
                value: '选项5',
                label: '人工地震'
                },
            ],
            count: 0,
            trigger: false,
            historyShow: false,
            pickerOptions: {
                disabledDate(time) {
                    return moment(time).isAfter(moment()); // 禁止选择当前时间之后的时间
                }
            }
            // pickerOptions: {
            //     disabledDate(time) {
            //         return time.getTime() > Date.now(); // 禁止选择当前时间之后的时间
            //     }
            // }
            // pickerOptions: {
            //     disabledDate(time) {
            //         const currentTime = new Date();
            //         const selectedTime = new Date(
            //             currentTime.getFullYear(),
            //             currentTime.getMonth(),
            //             currentTime.getDate(),
            //             time.getHours(),
            //             time.getMinutes(),
            //             time.getSeconds()
            //         );

            //         return selectedTime > currentTime; // 禁止选择当前时间之后的时间（包括时分秒）
            //     }
            // }
        }
    },
    watch:{
        name:{
            handler(v){
                console.log(this.count)
                if( v != ''){
                    this.count += 1
                }else{
                    this.count = this.count - 1
                }
            }
        },
        type:{
            handler(v){
                console.log(this.count)
                if( v != ''){
                    this.count += 1
                }else{
                    this.count = this.count - 1
                }
            }
        },
        longitude:{
            handler(v){
                if( v != ''){
                    this.count += 1
                }else{
                    this.count = this.count - 1
                }
            }
        },
        latitude:{
            handler(v){
                if( v != ''){
                    this.count += 1
                }else{
                    this.count = this.count - 1
                }
            }
        },
        magnitude:{
            handler(v){
                if( v != ''){
                    this.count += 1
                }else{
                    this.count = this.count - 1
                }
            }
        },
        depth:{
            handler(v){
                if( v != ''){
                    this.count += 1
                }else{
                    this.count = this.count - 1
                }
            }
        },
        time:{
            handler(v){
                if( v != ''){
                    this.count += 1
                }else{
                    this.count = this.count - 1
                }
            }
        },
        location:{
            handler(v){
                if( v != ''){
                    this.count += 1
                }else{
                    this.count = this.count - 1
                }
            }
        },
        count:{
            handler(v){
                if( v >= 8){
                    this.trigger = true
                }else{
                    this.trigger = false
                }
                console.log(this.trigger)
            }
        }
    },
    computed: {
        ...mapGetters({
            picker6: "picker/picker6"
        })
    },
    methods:{
        ...mapActions({
            changepicker6: "picker/changepicker6"
        }),
        jumpTo(){
            this.changepicker6(1)
        },
    }
}
</script>
<style scoped>
.output{
    display: flex;
    flex-direction: column;
    /* align-items: center */
    padding: 16px;
    overflow: auto;
}
.output .top{
    display: flex;
    justify-content: flex-end;
}
.el-icon-time{
    width: 16px;
    height: 16px;
    color: #1F60A7;
    margin-right: 12px
}
.output .top span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #303030;
    line-height: 25px;
    text-align: left;
    font-style: normal;
}
.output .main .title{
    width: 288px;
    height: 8px;   
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 500;
    font-size: 32px;
    color: #081E49;
    line-height: 48px;
    text-align: center;
    font-style: normal;
    margin-bottom: 36px;
    margin-top: 60px
}
.output .main, .main-body{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.output .main-body .info{
    display: flex;
    flex-direction: column
}
.output .main-body .info .info-items{
    display: flex;
    margin-top: 24px;
}
.output .main-body .info .info-item{
    display: flex;
    /* margin-top: 24px; */
    flex-direction: column
}
.output .main-body .info .right{
    margin-left: 20px
}
.output .main-body .info  /deep/.el-input__inner{
    width: 420px;
    height: 40px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
}
.output .main-body .info .info-item /deep/.el-input__inner{
    width: 420px;
}
.el-date-editor /deep/.el-range-input{
    width: 860px;
    background: #F9F9F9;
    /* border-radius: 6px; */
    /* border: 2px solid #CCCCCC; */
}
.el-range-editor.el-input__inner{
    width: 860px
}
.el-date-editor .el-range__icon{
    margin-left: 0px
}
output .main-body .info .location /deep/.el-input__inner{
    width: 860px;
}
.output .main-body .info .info-item span, .location,.time{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #181818;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    margin-bottom: 10px
}
.output .main-body .info .tips{
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #F87A35;
    line-height: 21px;
    text-align: left;
    font-style: normal;
}
.el-color-picker__icon, .el-input, .el-textarea{
    display: flex;
    width: 100%;
}
.output .results{
    width: 860px;
    display: flex;
    flex-direction: column
}
.output .results .results-top{
    display: flex;
    justify-content: space-between;
    width: 860px;
    margin-top: 36px;
    margin-bottom: 24px
}
.output .results .pics{
    display: flex;
    flex-direction: column
}
.output .results .line{
    display: flex;
    margin-bottom: 20px;
}
.output .results .line span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 12px;
    color: #000000;
    line-height: 17px;
    text-align: center;
    font-style: normal;
}
.output .results .box{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 29px;
}
.output .results .pic-background{
    width: 96px;
    height: 84px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid #E6E6E6;
    display: flex;
    align-items: center;
    text-align: center;
}
.output .results .img{
    width: 90px;
    height: 64px;
    margin: 0 auto;
}
.output .results .mini-title{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 18px;
    color: #181818;
    line-height: 25px;
    text-align: left;
    font-style: normal;
}
.output .results .results-top .right{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #0054A0;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
.output .results-bottom{
    display: flex;
    justify-content: center;
}
.output .results-bottom .el-button{
    width: 280px;
    height: 48px;
    background: #EEEEEE;
    border-radius: 6px;
    border: none;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #CCCCCC;
    line-height: 25px;
    text-align: center;
    font-style: normal;
}
.output .results-bottom .trigger{
    background: #0054A0;
    color: #FFF;
}
/* 修改垂直滚动条样式 */
div::-webkit-scrollbar {
  width: 4px;
}
/* 修改滚动条滑块样式 */
div::-webkit-scrollbar-thumb {
  /* border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  opacity: 0.2;
  background: fade(@primary-color, 60%); */
}
/* 修改滚动条滑轨样式 */
div::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2); */
  /* border-radius: 0; */
  /* background: fade(@primary-color, 30%); */
}
/* .output .btn-trigger{
    display: flex;
    justify-content: center;
}
.output .btn-trigger .el-button{
    background: #0054A0;
    color: #FFF;
    width: 280px;
    height: 48px;
    background: #EEEEEE;
    border-radius: 6px;
    border: none;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #CCCCCC;
    line-height: 25px;
    text-align: center;
    font-style: normal;
} */
</style>