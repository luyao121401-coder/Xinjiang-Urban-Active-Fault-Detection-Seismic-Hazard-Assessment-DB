<template>
    <div style="background: red;height: 98vh;background: #F9F9F9;">
        <div class="view-list">
            <div style="margin: 12px 16px">
                <div class="header">
                    <span>批量查看列表（6）</span>
                    <el-button>查看</el-button>
                </div>
                <div class="items">
                    <span>探槽</span>
                    <div class="item">
                        <span class="number">1</span>
                        <span>探槽编号： #010Ab</span>
                    </div>
                    <div class="item">
                        <span class="number">2</span>
                        <span>探槽编号： #010Ab</span>
                    </div>
                </div>
                <div class="items">
                    <span>钻探·钻孔</span>
                    <div class="item">
                        <span class="number">3</span>
                        <span>钻孔编号： #010Ab</span>
                    </div>
                    <div class="item">
                        <span class="number">4</span>
                        <span>钻孔编号： #010Ab</span>
                    </div>
                    <div class="item">
                        <span class="number">5</span>
                        <span>钻孔编号： #010Ab</span>
                    </div>
                    <div class="item">
                        <span class="number">6</span>
                        <span>钻孔编号： #010Ab</span>
                    </div>
                </div>
                <el-divider></el-divider>
                <div class="items-bottom">
                    <span>清空列表</span>
                </div>
            </div>
        </div>
        <SmallPicker v-if="picker1 == 1"></SmallPicker>
        <div>
            <HeaderMenu></HeaderMenu>
        </div>
        <div class="container">
            <div class="left">
                <!-- <el-collapse>
                </el-collapse> -->
            </div>
            <div class="right">
                <div class="right-top">
                    <div class="top-group">
                        <div class='top-group-right'>
                            <div class="search-group">
                                <img></img>
                                <el-input placeholder="输入项目名称、项目编号、城市、索引面编号查询"></el-input>
                                <el-divider direction="vertical"></el-divider>
                                <el-button type="text">搜索</el-button>
                            </div>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <el-dropdown>
                                <el-button>
                                    全部项目类型<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>类型1</el-dropdown-item>
                                    <el-dropdown-item>类型2</el-dropdown-item>
                                    <el-dropdown-item>类型3</el-dropdown-item>
                                    <el-dropdown-item>类型4</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> -->
                            <el-button class="advanced-search" @click="openDialog">高级检索</el-button>
                        </div>
                        <div class="top-group-left">
                            <el-button>批量查看列表</el-button>
                        </div>
                    </div>
                </div>
                <div class="right-body">
                    <div class="table-list">
                        <el-table>
                            <el-table-column align="center" label="序号" type="index"></el-table-column>
                            <el-table-column align="center" label="索引面编号"></el-table-column>
                            <el-table-column align="center" label="传感器"></el-table-column>
                            <el-table-column align="center" label="时相"></el-table-column>
                            <el-table-column align="center" label="影像名称"></el-table-column>
                            <el-table-column align="center" label="数据格式"></el-table-column>
                            <el-table-column align="center" label="波段信息"></el-table-column>
                            <el-table-column align="center" label="处理过程"></el-table-column>
                            <el-table-column align="center" label="项目名称"></el-table-column>
                            <el-table-column align="center" label="项目编号"></el-table-column>
                            <el-table-column align="center" label="提交单位"></el-table-column>
                            <el-table-column align="center" label="项目类型"></el-table-column>
                            <el-table-column align="center" label="操作"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="right-bottom">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderMenu from "./HeaderMenu.vue"
import { mapActions, mapGetters } from "vuex"
import SmallPicker from "./SmallPicker.vue"

export default{
    components: { HeaderMenu,SmallPicker },
    data(){
        return{
            options: [{
                value: '选项1',
                label: '全部项目类型'
            }, {
                value: '选项2',
                label: '类型一'
            }, {
                value: '选项3',
                label: '类型二'
            }, {
                value: '选项4',
                label: '类型三'
            }, {
                value: '选项5',
                label: '类型四'
            }],
            value: '选项1'
        }
    },
    computed: {
        ...mapGetters({
            picker1: "picker/picker1"
        })
    },
    methods:{
        ...mapActions({
            changepicker1: "picker/changepicker1"
        }),
        openDialog(){
            this.changepicker1(1)
            console.log(this.picker1)
        }
    }
}
</script>
<style scoped>
.container{
    height: calc(100% - 86px);
    width: calc(100% - 36px);
    display: flex;
    /* background: #F9F9F9; */
    /* margin-top: 18px; */
    margin: 18px 18px 0
}
.left{
    height: 100%;
    width: 233px;
    background: #FFF
}
.right{
    width: calc(100% - 249px);
    margin-left: 16px;
    /* margin-right: 10px */
}
.top-group{
    display: flex;
    justify-content: space-between
}
.top-group-right{
    display: flex
}
.top-group-right /deep/.el-input__inner{
    background: #EEEEEE;
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
.top-group-right .search-group{
    display: flex;
    width: 450px;
    height: 40px;
    background: #EEEEEE;
    border-radius: 6px;
    align-items: center;
}
.top-group-right .advanced-search{
    width: 124px;
    height: 40px;
    background: #EEEEEE;
    border-radius: 6px;
    border: none;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #181818;
    font-style: normal;
}
.top-group-right .search-group .el-button{
    padding: 0 15px 0 8px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #181818;
    letter-spacing: 1px;
    font-style: normal;
}
.top-group-left /deep/.el-button{
    width: 172px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 6px;
    border: 1px solid #E3E3E3;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #1F60A7;
    font-style: normal;
}
/* .el-dropdown .el-button{
    margin: 0 20px;
    width: 200px;
    height: 40px;
    background: #EEEEEE;
    border-radius: 6px;
    border: none;
    text-align: left;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #181818;
    font-style: normal;
} */
.top-group-right .el-select /deep/.el-input__inner {
    font-size: 16px;
    color: #181818;
}
.el-select{
    margin: 0 20px
}
.table-list{
    height: 100%;
}
.right-body{
    margin-top: 16px;
    height: calc(100% - 56px);
}
.el-table{
    height: 100%;
    background: #F9F9F9;
}
.view-list{
    position: absolute;
    right: 27px;
    top: 140px;
    z-index: 10;
    width: 340px;
    height: 402px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.16);
    border-radius: 6px;
}
.view-list .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 19px

}
.view-list .header .el-button{
    display: flex;
    align-items: center;
    width: 71px;
    height: 28px;
    background: #0054A0;
    border-radius: 6px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #FFFFFF;
    /* line-height: 20px; */
    font-style: normal;
    
}
.view-list .header span{
    width: 155px;
    height: 25px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #000000;
    line-height: 25px;
    text-align: left;
    font-style: normal;
}
.view-list .item{
    margin: 15px 7px
}
.view-list .number{
    margin-right: 15px!important
}
.view-list .items span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #777777;
    line-height: 22px;
    text-align: left;
    font-style: normal;
}
.view-list .items .item span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    margin: 14px 0
}
.el-divider--horizontal {
    margin: 12px 0;
}
.view-list .items-bottom span{
    margin-left: 5px
}
</style>

