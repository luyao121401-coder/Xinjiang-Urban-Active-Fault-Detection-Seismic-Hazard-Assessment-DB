<template>
    <div style="background: red;height: 98vh;background: #F9F9F9;">
        <div>
            <HeaderMenu></HeaderMenu>
        </div>
        <div class="container">
            <div class="left">
                <div class="title">
                    <span>选择成果资料类型</span>
                </div>
                <div class="choices">
                    <div :class="page == 1? 'choice choice-select' : 'choice' " @click="changePage(1)" >
                        <span>文字报告</span>
                    </div>
                    <div :class="page == 2? 'choice choice-select' : 'choice' " @click="changePage(2)">
                        <span>成果图件</span>
                    </div>
                </div>
            </div>
            <div class="right">
                    <div class="right-top">
                        <div class="top-group">
                            <div class="top-group-right">
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
                                <el-select v-model="valuee" placeholder="请选择">
                                    <el-option
                                        v-for="item in optionss"
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
                                </el-dropdown>
                                <el-dropdown>
                                    <el-button>
                                        全部报告类型<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>类型1</el-dropdown-item>
                                        <el-dropdown-item>类型2</el-dropdown-item>
                                        <el-dropdown-item>类型3</el-dropdown-item>
                                        <el-dropdown-item>类型4</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown> -->
                            </div>
                        </div>
                    </div>
                    <div class="right-body">
                        <div class="table-list">
                            <el-table>
                                <el-table-column align="center" label="序号" type="index"></el-table-column>
                                <el-table-column align="center" label="报告名称"></el-table-column>
                                <el-table-column align="center" label="报告类型"></el-table-column>
                                <el-table-column align="center" label="项目名称"></el-table-column>
                                <el-table-column align="center" label="项目编号"></el-table-column>
                                <el-table-column align="center" label="提交单位"></el-table-column>
                                <el-table-column align="center" label="项目类型"></el-table-column>
                                <el-table-column align="center" label="城市"></el-table-column>
                                <el-table-column align="center" label="报告内容"></el-table-column>
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

export default{
    components: { HeaderMenu },
    data(){
        return{
           page: 1,
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
            optionss: [{
                value: '选项1',
                label: '全部报告类型'
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
            value: '选项1',
            valuee: '选项1'
        }
    },
    methods:{
        changePage(page){
            this.page = page
            // if(page == 1){

            // }
        }
    }
}
</script>
<style scoped>
.container{
    height: calc(100% - 86px);
    width: 100%;
    display: flex;
    /* background: #F9F9F9; */
    margin-top: 18px
}
.left{
    height: 148px;
    background: #FFFFFF;
    border-radius: 6px;
    width: 233px;
    /* background: blue */
}
.left .title{
    margin-top: 16px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    margin-left: 10px
}
.left .choices{
    margin-left: 10px;
}
.left .choice{
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 16px;
    color: #195392;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    width: 200px;
    height: 36px;
    border-radius: 6px;
    margin-top: 10px;
    padding-left: 10px;
    align-items: center;
    display: flex;
    cursor: pointer

}
.left .choice-select{
    background: #ECF6FF;
}
.right{
    width: calc(100% - 249px);
    margin-left: 16px;
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
    margin-left: 20px;
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
    margin-left: 20px
}
.table-list{
    height: 100%;
}
.right-body{
    margin-top: 16px;
    height: calc(100% - 56px);
    background: blue
}
.el-table{
    height: 100%;
}
</style>

