<template>
    <div class="trigger-history">
        <div class="left">
            <div class="top" @click=getBack()>
                <i class="el-icon-arrow-left"></i>
                <span>返回</span>
            </div>
            <div class="main">
                <div class="main-top">
                    <span>地震信息与应急产出触发记录</span>
                </div>
                <div class="main-search">
                    <div class="search-group">
                        <i></i>
                        <el-input placeholder="输入地震名称查询"></el-input>
                        <el-divider direction="vertical"></el-divider>
                        <el-button type="text">搜索</el-button>
                    </div>
                    <div>
                        <el-select v-model="earthquake">
                            <el-option
                              v-for="item in earthquake_options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                    <div>
                        <el-date-picker
                        v-model="time"
                        type="daterange"
                        range-separator="至"
                        unlink-panels
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        ></el-date-picker>
                    </div>
                </div>
            </div>
            <div class="tips">
                <span>·共触发过4次地震应急产出</span>
            </div>
            <div class="main-body">
                <div :class="num == 1 ? 'info-card card-active' : 'info-card'" @click="changeCard(1)">
                    <div class="card-left">
                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                    </div>
                    <div class="card-right">
                        <span style="font-size: 18px;font-weight: 600">新疆克孜勒苏州乌恰县3.8级测试地震</span>
                        <div>
                            <span style="font-size: 14px">发震时刻：2024-1-23 02:09:34</span>
                            <span style="font-size: 14px;font-weight: 400;margin-left: 40px">震源深度：10km</span>
                        </div>
                        <span style="font-size: 14px;font-weight: 400">触发状态：触发成功</span>
                    </div>
                </div>
                <div :class="num == 2 ? 'info-card card-active' : 'info-card'" @click="changeCard(2)">
                    <div class="card-left">
                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                    </div>
                    <div class="card-right">
                        <span style="font-size: 18px;font-weight: 600">新疆克孜勒苏州乌恰县3.8级测试地震</span>
                        <div>
                            <span style="font-size: 14px">发震时刻：2024-1-23 02:09:34</span>
                            <span style="font-size: 14px;font-weight: 400;margin-left: 40px">震源深度：10km</span>
                        </div>
                        <span style="font-size: 14px;font-weight: 400">触发状态：触发成功</span>
                    </div>
                </div>
                <div :class="num == 3 ? 'info-card card-active' : 'info-card'" @click="changeCard(3)">
                    <div class="card-left">
                        <img class="img" src="@/assets/img/地形图.jpg"></img>
                    </div>
                    <div class="card-right">
                        <span style="font-size: 18px;font-weight: 600">新疆克孜勒苏州乌恰县3.8级测试地震</span>
                        <div>
                            <span style="font-size: 14px">发震时刻：2024-1-23 02:09:34</span>
                            <span style="font-size: 14px;font-weight: 400;margin-left: 40px">震源深度：10km</span>
                        </div>
                        <span style="font-size: 14px;font-weight: 400">触发状态：触发成功</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- <el-divider direction="vertical"></el-divider> -->
        <div class="right">
            <TriggerDetails></TriggerDetails>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import TriggerDetails from "./TriggerDetails.vue";
import moment from 'moment'; 



export default{
    components: { TriggerDetails },
    data(){
        return{
            num: 1,
            earthquake_options: [{
                value: '选项1',
                label: '全部地震'
                },{
                value: '选项2',
                label: '测试地震'
                },{
                value: '选项3',
                label: '正式地震'
                }
            ],
            earthquake: '',
            // earthquake: this.earthquake_options[0].value,
            time: '',
            pickerOptions: {
                disabledDate(time) {
                    return moment(time).isAfter(moment()); // 禁止选择当前时间之后的时间
                }
            }

        }
    },
    methods:{
        ...mapActions({
            changepicker6: "picker/changepicker6"
        }),
        getBack(){
            this.changepicker6(0)
        },
        changeCard(num){
            this.num = num
        }
    }
}
</script>
<style scoped>
.trigger-history{
    /* padding: 16px; */
    display: flex;
}
.top{
    cursor: pointer;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    margin-bottom: 26px
}
.trigger-history .left{
    display: flex;
    flex-direction: column;
    width: 804px;
    padding: 32px 24px 0
}
.trigger-history .right{
    display: flex;
    flex-direction: column;
    width: calc(100% - 804px);
    background: #F9F9F9;
    padding: 16px 16px 16px 48px
}
.trigger-history .left .main-top span{
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 600;
    font-size: 24px;
    color: #181818;
    line-height: 36px;
    text-align: left;
    font-style: normal;
}
.trigger-history .left .main-search{
    margin: 24px 0 15px 0;
    display: flex
}
.trigger-history .left .main-search .el-date-editor{
    width: 240px;
    height: 44px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
}
.el-date-editor /deep/.el-range__icon{
    padding-top: 3px;
}
.el-date-editor /deep/.el-range-separator{
    padding: 5px 3px 3px 0;
    font-size: 12px
}
.trigger-history .left .main-search .el-date-editor /deep/.el-range-input{
    font-size: 16px;
    color: #181818;
    background: #F9F9F9;
    /* background: #EEEEEE; */
    border-radius: 6px;
    border: none;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ABABAB;
    line-height: 20px;
    text-align: center;
    font-style: normal;
    font-size: 12px
}
.trigger-history .left .main-search .search-group{
    display: flex;
    align-items: center;
    /* width: 380px;
    height: 40px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC; */
    width: 380px;
    /* height: 40px; */
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
}
.trigger-history .left .main-search .el-select{
    width: 120px;
    /* height: 40px; */
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
    margin: 0 8px
}
.trigger-history .left .main-search .el-select /deep/.el-input__inner{
    font-size: 16px;
    color: #181818;
    background: #F9F9F9;
    /* background: #EEEEEE; */
    border-radius: 6px;
    border: none;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ABABAB;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
.trigger-history .left .main-search .search-group .el-button{
    padding: 0 15px 0 8px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #181818;
    letter-spacing: 1px;
    font-style: normal;
}
.trigger-history .left .main-search .search-group /deep/.el-input__inner {
    font-size: 16px;
    color: #181818;
    background: #F9F9F9;
    /* background: #EEEEEE; */
    border-radius: 6px;
    border: none;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #ABABAB;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
.trigger-history .left .tips span{
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    line-height: 21px;
    text-align: left;
    font-style: normal;
}
.trigger-history .left .main-body .info-card .img{
    width: 120px;
    height: 88px;
    margin-right: 16px;
    background: #F2F2F2;
    border-radius: 6px;
    border: 1px solid #D8D8D8;
}
.trigger-history .left .main-body .info-card{
    margin-top: 30px;
    padding: 16px;
    display: flex;
    align-items: center;
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    text-align: left;
    font-style: normal;
    width: 724px;
    height: 96px;
    background: #FFFFFF;
    border-radius: 6px;
    cursor: pointer
}
.trigger-history .left .main-body .card-active {
    color: #195392;
    box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.1);

}
</style>