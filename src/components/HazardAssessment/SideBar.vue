<template>
    <div class="side-bar">
        <div class="bar-top">
            <span>图层目录</span>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="bar-body">
            <div>
                <!-- <el-tree
                :props="props"
                :load="loadNode"
                lazy
                :render-content="renderContent"
                @check-change="handleCheckChange"
                ref="tree">
                </el-tree> -->
                <el-tree
                :props="props"
                :load="loadNode"
                show-checkbox
                lazy
                @check-change="handleCheckChange"
                ref="tree">
                </el-tree>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            node: '',
            props:{
                label: 'name',
                children: 'zones'
            },
            checkedIconUrl: require('@/assets/icon/full-selected.png'), // 替换成你的已准备好的图片路径
            halfcheckedIconUrl: require('@/assets/icon/part-selected.png'), // 替换成你的已准备好的图片路径
            uncheckedIconUrl: require('@/assets/icon/unselected.png'), // 替换成你的已准备好的图片路径
            count: 1,
            value: '选项1',
            options: [{
                value: '选项1',
                label: '按项目'
            }, {
                value: '选项2',
                label: '按专题'
            }],
        }
        
    },
    computed:{
        nodeCheckedStatus() {
            return (node) =>{
                if(node && node.checked != undefined){
                    if(node.checked){
                        if(node.indeterminate){
                            return this.halfcheckedIconUrl
                        }else{
                            return this.checkedIconUrl
                        }
                    }else{
                        return this.uncheckedIconUrl
                    }
                }
            }
        }
    },
    methods:{
        renderContent(data, node){
            console.log("node")
            console.log(node)
            // console.log(this.nodeCheckedStatus(node))
            const h = this.$createElement
            if (!node || !node.data ) return null; // 针对node为undefined的情况进行处理
            return h('span', { class: 'tree-node-content'},[
                h('span', { class: 'custom-checkbox'},[
                    h('img', {
                        attrs:{
                            src: this.nodeCheckedStatus(node.node),
                        }
                    })
                ]),
                h('span', node.data.name)
            ])
        },
        handleCheckChange(data, checked, indeterminate){
            console.log(data, checked, indeterminate)
        },
        handleNodeClick(data){
            console.log(data)
        },
        loadNode(node, resolve){
            this.node = node
            console.log(node)
            if (node.level === 0){
                return resolve([ 
                    { name: '喀什市城市活动断层探测项目' }, 
                    { name: '阿图什市城市活动断层探测项目' },
                    { name: '库车市城市活动断层探测项目' },
                    { name: '伽师县城市活动断层探测项目' },
                    { name: '乌恰县城市活动断层探测项目' },
                    { name: '新源县城市活动断层探测项目' },
                    { name: '特克斯县城市活动断层探测项目' },
                ])
            }
            if (node.level > 3) return resolve([])

            var hasChild
            if (node.data.name === '喀什市城市活动断层探测项目'){
                hasChild = false
            }else if (node.data.name === '阿图什市城市活动断层探测项目'){
                hasChild = false
            }else if (node.data.name === '库车市城市活动断层探测项目'){
                hasChild = false
            }else if (node.data.name === '伽师县城市活动断层探测项目'){
                hasChild = false
            }else if (node.data.name === '乌恰县城市活动断层探测项目'){
                hasChild = true
            }else if (node.data.name === '新源县城市活动断层探测项目'){
                hasChild = false
            }else if (node.data.name === '特克斯县城市活动断层探测项目'){
                hasChild = false
            }else{
                hasChild = Math.random > 0.5
            }

            setTimeout(() =>{
                var data
                if (hasChild) {
                    data = [{
                        name: '遥感'
                    },{
                        name: '微地貌'
                    }]
                }else{
                    data = []
                }
                
                resolve(data)
            }, 500)
        }
    }
}
</script>
<style scoped>
.side-bar{
    height: calc(100% - 68px);
    background: #FFF;
    padding: 14px 16px 11px;
    width: 308px
}
.side-bar .bar-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px
}
.side-bar .bar-top span{
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 600;
    font-size: 18px;
    color: #000000;
    line-height: 27px;
    text-align: left;
    font-style: normal;
}
.side-bar .bar-top .el-select{
    width: 120px;
    height: 32px;
    background: #F9F9F9;
    border-radius: 6px;
    /* border: 2px solid #CCCCCC; */
}
.side-bar .bar-top .el-select /deep/.el-input__inner{
    width: 120px;
    height: 32px;
    background: #F9F9F9;
    border-radius: 6px;
    border: 2px solid #CCCCCC;
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 400;
    font-size: 14px;
    color: #000000;
    line-height: 21px;
    text-align: left;
    font-style: normal;
}
.side-bar /deep/.el-tree-node__label{
    font-family: SourceHanSansCN, SourceHanSansCN;
    font-weight: 500;
    font-size: 16px;
    color: #181818;
    line-height: 24px;
    text-align: left;
    font-style: normal;
}
.side-bar /deep/.el-tree-node__content{
    height: 40px;
}
.side-bar /deep/.el-tree-node__expand-icon {
    width: 5px;
    height: 9px;
    color: #000000;
    opacity: 0.5;
    padding: 5px 8px;
    margin-right: 7px
}
.side-bar /deep/.el-checkbox__input.is-checked .el-checkbox__inner, /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #777777;
    border: 2px solid #777777;
}
.side-bar[data-v-7a4ef831] /deep/.el-checkbox__input.is-checked .el-checkbox__inner, [data-v-7a4ef831] .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #181818;
    border: 2px solid #181818;
}
.side-bar .el-checkbox__inner::after {
    height: 5px;
    left: 3px;
    top: 0
}
.custom-checkbox img {
  width: 16px; /* 设置图片宽度 */
  height: 16px; /* 设置图片高度 */
  vertical-align: middle; /* 垂直居中 */
}
</style>