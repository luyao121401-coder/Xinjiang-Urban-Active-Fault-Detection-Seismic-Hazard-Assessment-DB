<template>
    <div style="background: red;height: 98vh;background: #F9F9F9;">
        <!-- <div class="view-list" v-show="listShow">
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
        </div> -->
        <div class="view-list" v-if="listShow">
            <div style="margin: 12px 16px">
                <div class="header">
                    <span>批量查看列表（6）</span>
                    <el-button>查看</el-button>
                </div>
            </div>
            <div v-for="(category, categoryName) in dataList" :key="categoryName">
                <h2>{{ categoryName }}</h2>
                <div class="items">
                    <div class="item" v-for="(item, index) in category" :key="index">
                        <img src="@/assets/icon/清空列表@2x.png"></img>
                        <span>{{ item }}</span>
                    </div>
                </div>
            </div>
            <!-- <div class="items">
                <span>探槽</span>
                <div class="item" v-for="(item, index) in items" :key="index">
                    <img src="@/assets/icon/清空列表@2x.png"></img>
                    <span class="number">{{ index }}</span>
                    <span>探槽编号：{{ item.tcbh }}</span>
                </div>
            </div> -->
        </div>
        <SmallPicker v-if="picker1 == 1"></SmallPicker>
        <div>
            <HeaderMenu></HeaderMenu>
        </div>
        <div class="container">
            <div class="left">
                <span>选择专题</span>
                <div>
                    <el-tree
                        :props="props"
                        :data="data"
                        @node-click="handleNodeClick"
                        ref="tree"
                        :node-key="nodeKey"
                        >
                    </el-tree>
                </div>
                <!-- <el-collapse>
                </el-collapse> -->
            </div>
            <div class="right">
                <div class="right-top">
                    <div class="top-group">
                        <div class='top-group-right'>
                            <div class="search-group">
                                <img 
                                src="@/assets/icon/查询@2x.png"
                                style="width: 18px;height: 18px;margin-left: 16px"
                                ></img>
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
                            <el-button class="advanced-search" @click="openDialog">
                                <div style="display: flex;align-items: center;width:24px">
                                    <img src="@/assets/icon/高级检索@2x.png"
                                        style="height: 18px;width: 18px;margin-right:2px">
                                    </img>
                                    <span>高级检索</span>
                                </div>
                            </el-button>    
                        </div>
                        <div class="top-group-left">
                            <el-button @click="showList">
                                <div style="display: flex;align-items: center;margin: 0 auto">
                                    <img src="@/assets/icon/批量位置查看@2x.png"
                                        style="height: 18px;width: 18px;margin-right:8px"
                                    ></img>
                                    <span>批量查看列表</span>
                                </div>
                            </el-button>
                        </div>
                    </div>
                </div>
                <div class="right-body">
                    <div class="table-list">
                        <el-table :data="tableData" style="width:100%" :header-cell-style="{ backgroundColor: '#D9E2ED', color: '#000000', height: '40px' }">
                            <el-table-column width="50" label="序号" type="index"></el-table-column>
                            <el-table-column width="120"  label="索引面编号" prop="bh"></el-table-column>
                            <el-table-column width="80"  label="传感器" prop="cgq"></el-table-column>
                            <el-table-column width="80"  label="时相" prop="sx"></el-table-column>
                            <el-table-column width="80"  label="影像名称" prop="yxmc"></el-table-column>
                            <el-table-column width="80"  label="数据格式" prop="sjgs"></el-table-column>
                            <el-table-column width="120"  label="波段信息" prop="bdxx"></el-table-column>
                            <el-table-column width="120"  label="处理过程" prop="clgc"></el-table-column>
                            <el-table-column width="150"  label="项目名称" prop="xmmc"></el-table-column>
                            <el-table-column width="100"  label="项目编号" prop="xmbh"></el-table-column>
                            <el-table-column width="160"  label="提交单位" prop="tjdw"></el-table-column>
                            <el-table-column width="160"  label="项目类型" prop="xmlx"></el-table-column>
                            <el-table-column label="操作">
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
                                            添加查看
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
                                            查看位置
                                            </el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
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
            nodeKey: 'id', // 设置节点标识键为 'id'
            categoryName: '',
            dataList: [],    //批量查看列表的数据
            listShow: false,    //批量查看列表
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
            value: '选项1',
            // 侧边栏数据
            data: [{
                    label: '遥感',
                },{
                    label: '地震地质调查',
                    children: [{
                        label: "地震地质调查 1-1",
                        children: [{
                            label: "地震地质调查 1-1-1"
                        }]
                    }]
                },{
                    label: '微地貌',
                },{
                    label: '探槽',
                },{
                    label: '钻探',
                    children: [{
                        label: "钻探 1-1",
                        children: [{
                            label: "钻探 1-1-1"
                        }]
                    }]
                },{
                    label: '样品',
                },{
                    label: '地球物理勘探',
                    children: [{
                        label: "地球物理勘探 1-1",
                        children: [{
                            label: "地球物理勘探 1-1-1"
                        }]
                    }]
                },{
                    label: '地球化学勘探',
                    children: [{
                        label: "地球化学勘探 1-1",
                        children: [{
                            label: "地球化学勘探 1-1-1"
                        }]
                    }]
                },{
                    label: '火山',
                },{
                    label: '原始数据',
            }],
            props: {
                children: 'children',
                label: 'label'
            },
            // table数据
            tableData: [{
                bh:'#010Ab0h01',
                cgq: '示例',
                sx: '示例',
                yxmc: '示例',
                sjgs: '示例',
                bdxx: '波段信息示例',
                clgc: '处理过程示例',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例提交单位名称',
                xmlx: '城市活动断层探测',
                cz: '操作'
            },{
                bh:'#010Ab0h02',
                cgq: '示例',
                sx: '示例',
                yxmc: '示例',
                sjgs: '示例',
                bdxx: '波段信息示例',
                clgc: '处理过程示例',
                xmmc: '城市项目名称01',
                xmbh: '-',
                tjdw: '示例提交单位名称',
                xmlx: '城市活动断层探测',
                cz: '操作'
            },
            
        ]
        }
    },
    computed: {
        ...mapGetters({
            picker1: "picker/picker1"
        })
    },
    mounted() {
        const tree = this.$refs.tree;
        this.$nextTick(() => {
        const firstNode = tree.root.childNodes[0];
        if (firstNode) {
            tree.setCurrentKey(firstNode.data.id); // 使用节点标识键调用 setCurrentKey 方法
            tree.$emit('node-click', firstNode);
        }
        });
    },
    methods:{
        ...mapActions({
            changepicker1: "picker/changepicker1"
        }),
        openDialog(){
            this.changepicker1(1)
            console.log(this.picker1)
        },
        showList(){
            this.listShow = !this.listShow
            console.log(this.dataList)
        },
        handleAddview(row){
            let foundMatch = false;
            let categoryName = this.categoryName
            if(!this.dataList[categoryName]) {
                this.$set(this.dataList, categoryName, []);
            }
            this.dataList[categoryName].forEach( item =>{
                if(item == row.bh){
                    foundMatch = true;
                }
            })
            if (!foundMatch) {
                this.dataList[categoryName].push(row.bh);
            }

            console.log("data", this.dataList)
        },
        handleNodeClick(data){
            this.categoryName = data.label
            console.log(data)
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
    /* height: 100%; */
    width: 233px;
    padding: 16px;
    height: 500px;
    background: #FFFFFF;
    border-radius: 6px;

}
.left span{
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #777777;
    line-height: 20px;
    text-align: left;
    font-style: normal;
}
.left /deep/.el-tree{
    margin-top: 8px
}
.left /deep/.el-tree-node__content {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 16px!important;
    color: #303030;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    height: 40px;
    margin: 8px 0
}
.left /deep/.el-tree-node__label{
    font-size: 16px
}
/* .left /deep/.el-tree-node__content:active{
    width: 210px;
    height: 36px;
    background: #ECF6FF;
    border-radius: 6px;
} */
/* .left /deep/.is-current{
    width: 210px;
    height: 36px;
    background: #ECF6FF;
    border-radius: 6px;
} */
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
.right .el-table /deep/tr{
    height: 40px;
}
.right-body{
    margin-top: 16px;
    height: calc(100% - 56px);
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
    border: none;
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
.table-list /deep/ .el-table {
    height: 100%;
    border: none;
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

