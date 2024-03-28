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
                                    <el-input v-model="searchKeyword" v-if="page == 1" placeholder="输入项目名称、项目编号、城市、报告名称查询"></el-input>
                                    <el-input v-model="searchKeyword" v-else placeholder="输入项目名称、项目编号、城市、图件名称查询"></el-input>
                                    <el-divider direction="vertical"></el-divider>
                                    <el-button type="text" @click="handleSearch(searchKeyword)">搜索</el-button>
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
                                        v-for="item in (page === 1 ? optionss1 : optionss2)"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-show="page == 2" v-model="valueee" placeholder="请选择">
                                    <el-option
                                        v-for="item in optionsss"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="right-body">
                        <div class="table-list">
                            <el-table :data="searchData" style="width:100%" :header-cell-style="{ backgroundColor: '#D9E2ED', color: '#000000', height: '40px' }">
                                <el-table-column width="60px" align="center" label="序号" type="index"></el-table-column>
                                <el-table-column width="400px"prop="mc" align="center" :label="page == 2 ? '图件名称' : '报告名称'"></el-table-column>
                                <el-table-column width="150px" prop="lx" align="center" :label="page == 2 ? '图件类型' : '报告类型'"></el-table-column>
                                <el-table-column v-if="page == 2" width="120px" prop="blc" align="center" label="比例尺"></el-table-column>
                                <el-table-column width="180px" prop="xmmc" align="center" label="项目名称"></el-table-column>
                                <el-table-column width="100px" prop="xmbh" align="center" label="项目编号"></el-table-column>
                                <el-table-column width="120px" prop="tjdw" align="center" label="提交单位"></el-table-column>
                                <el-table-column width="180px" prop="xmlx" align="center" label="项目类型"></el-table-column>
                                <el-table-column prop="cs" align="center" label="城市"></el-table-column>
                                <el-table-column width="230px" prop="nr" align="center" :label="page == 2 ? '图件内容' : '报告内容'">
                                    <template slot-scope="scope">
                                        <div style="display: flex">
                                            <div class="cell-inside">
                                                <img 
                                                src="@/assets/icon/添加查看@2x.png"
                                                style="height:20px;width:20px;margin-right:4px"
                                                ></img>
                                                <el-button 
                                                @click="handleAddview(scope.row)" 
                                                type="text"
                                                >
                                                在线预览
                                                </el-button>
                                            </div>
                                            <div class="cell-inside" style="margin-left: 16px">
                                                <img 
                                                src="@/assets/icon/查看位置@2x.png"
                                                style="width:20px;height:20px;margin-right:4px"
                                                ></img>
                                                <el-button 
                                                @click="handleAddview(scope.row)" 
                                                type="text"
                                                >
                                                下载图件
                                                </el-button>
                                            </div>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="right-bottom">
                        <div class="total-tip">
                            共计 {{ total }} 条{{ categoryName }}
                        </div>
                        <pagination :currentPage="current" :total="total"></pagination>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
import HeaderMenu from "./HeaderMenu.vue"
import pagination from "./pagination.vue"

export default{
    components: { HeaderMenu, pagination },
    data(){
        return{
            searchKeyword: '',    //查询关键字
            total: null,
            categoryName: '',
            current: 1,
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
            optionss1: [{
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
            optionss2: [{
                value: '选项1',
                label: '全部图件类型'
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
            optionsss: [{
                value: '选项1',
                label: '全部比例尺'
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
            valuee: '选项1',
            valueee: '选项1',
            tableData2: [{
                mc:'1万条带图',
                lx: '条带填图',
                blc: '10000',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'1万条带图',
                lx: '条带填图',
                blc: '10000',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'1万条带图',
                lx: '条带填图',
                blc: '10000',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'1万条带图',
                lx: '条带填图',
                blc: '10000',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'5万活断层分布图',
                lx: '断层分布图',
                blc: '10000',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'25万工作区地震构造图',
                lx: '地震构造图',
                blc: '50000',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            }],
            tableData1: [{
                mc:'喀什市城市活动断层探查项目成果报告',
                lx: '成果报告',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'阿图什市城市活动断层探查项目成果报告',
                lx: '成果报告',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'伽师县城市活动断层探查项目成果报告',
                lx: '成果报告',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'库车市城市活动断层探查项目成果报告',
                lx: '成果报告',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'乌恰县城市活动断层探查项目成果报告',
                lx: '成果报告',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'新源县城市活动断层探查项目成果报告',
                lx: '成果报告',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'特克斯县城市活动断层探查项目成果报告',
                lx: '成果报告',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },{
                mc:'巩留县城市活动断层探查项目成果报告',
                lx: '成果报告',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例',
                xmlx: '城市活动断层探测',
                cs: '示例城市名称',
            },]
        }
    },
    mounted(){
        this.changePage(1)
        this.total = this.tableData1.length
    },
    methods:{
        changePage(page){
            this.page = page
            if(page == 1){
                this.categoryName = "文字报告"
                this.searchData = this.tableData1 
                this.total = this.tableData1.length

            }else{
                this.categoryName = "成果图件"
                this.searchData = this.tableData2 
                this.total = this.tableData2.length
            }
        },
        //搜索逻辑
        handleSearch(keyword){
            this.current = 1
            this.searchData = []
            let tableData = []
            if (this.page == 1){
                tableData = this.tableData1
            }else{
                tableData = this.tableData2
            }
            this.searchData = tableData.filter(item => {
            for (const key in item) {
                if (item[key].toString().includes(keyword)) {
                    return true; // 返回true表示包含关键词，保留该数据
                }
            }
                return false; // 返回false表示不包含关键词，过滤掉该数据
            });   
            this.total = this.searchData.length
            console.log(this.searchData)
        },
        // 分页
        paginationRequestPage(page) {
            this.current = page
            // this.getUserData()
        },
    }
}
</script>
<style scoped>
.container{
    height: calc(100% - 86px);
    width: calc(100% - 36px);
    display: flex;
    /* background: #F9F9F9; */
    margin: 18px 18px 0
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
    height: calc(100% - 137px);
}
/* .right-body{
    margin-top: 16px;
    height: calc(100% - 137px);
} */
.el-table{
    height: 100%;
}
.table-list{
    height: 100%;
    /* border: 1px solid #FFF; */
}
/deep/.el-table .el-table__cell:first-child .cell {
    padding-left: 0px;
}
/deep/.el-table .cell {
    border: 1px solid #EDEDED;
}
.right .el-table /deep/tr{
    height: 40px;
    background: none;
    border: 1px solid #EDEDED;
}
.right-body{
    margin-top: 16px;
    height: calc(100% - 137px);
}
.right .right-body .table-list .cell-inside{
    display: flex;
    align-items:center;
}
.right .right-body .table-list .cell-inside .el-button{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
.el-table{
    height: 100%;
    background: #F9F9F9;
}
.table-list {
    width: 100%;
    height: 100%;
}
.table-list /deep/ .el-table td.el-table__cell,
.table-list /deep/.el-table th.el-table__cell.is-leaf {
    /* border: none; */
    border: 1px solid #EDEDED;
}
.table-list /deep/ .el-table th.el-table__cell > .cell {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.table-list /deep/ td,
.table-list /deep/ th {
    height: 40px;
    padding: 0;
    border: none;
    text-align: center;
}
.table-list /deep/ .cell {
    padding: 0;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    overflow: visible;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
.table-list{
    width: 100%;

}
.table-list /deep/ .el-table {
    height: calc(100%);
    border: none;
    background: #F9F9F9;
    overflow-x: auto;
}
.table-list /deep/ .el-table .el-table__body-wrapper{
    height: calc(100% - 40px);
    background: #F9F9F9;
    overflow-y: auto;
    /* overflow-y: none */
}
.total-tip{
    position: absolute;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #777777;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
</style>

