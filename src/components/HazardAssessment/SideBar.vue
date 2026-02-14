<template>
  <div class="side-bar">
    <div class="bar-top">
      <span class="title">图层目录</span>
      <el-select v-model="viewType" placeholder="请选择" @change="handleViewChange" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="bar-body">
      <!--
        1. 绑定 :data。
        2. node-key 必须设置。
      -->
      <el-tree
        :data="treeData"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        :default-expanded-keys="['p1']"
        @check="handleCheck"
        ref="tree">
        <!-- 自定义内容：渲染图层颜色小圆点 -->
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <i v-if="data.type === 'layer'" class="dot" :style="{ backgroundColor: data.color }"></i>
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { PROJECTS_TREE } from '@/public/data/sidebardata.js';

export default {
  data() {
    return {
      viewType: '选项1', // 默认按项目展示
      options: [
        { value: '选项1', label: '按项目' },
        { value: '选项2', label: '按专题' }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [],
      rawProjectData: PROJECTS_TREE
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.treeData = JSON.parse(JSON.stringify(this.rawProjectData));
    },
    handleViewChange(val) {
      if (val === '选项1') {
        this.treeData = JSON.parse(JSON.stringify(this.rawProjectData));
      } else {
        this.treeData = this.rebuildByThematic();
      }
    },
    rebuildByThematic() {
      const thematicMap = {
        '遥感': [],
        '地震地质调查': [],
        '钻探': [],
        '微地貌': []
      };

      this.rawProjectData.forEach(project => {
        project.children.forEach(layer => {
          if (thematicMap[layer.label]) {
            thematicMap[layer.label].push({
              ...layer,
              label: `${project.label.substring(0,3)}... - ${layer.label}`
            });
          }
        });
      });

      return Object.keys(thematicMap).map(key => ({
        id: `group_${key}`,
        label: key,
        children: thematicMap[key]
      }));
    },

    //侧边栏数据上图
    handleCheck(currentData, checkedStatus) {
          // 1. 获取当前节点的操作状态
          const isChecked = checkedStatus.checkedKeys.includes(currentData.id);

          // 2. 情况 A：点击的是具体的“图层”
          if (currentData.type === 'layer') {
            this.$emit('layer-toggle', {
              id: currentData.id,
              visible: isChecked,
              data: currentData
            });
          }
          // 3. 情况 B：点击的是“项目”父节点（实现全选/取消全选）
          else if (currentData.type === 'project' && currentData.children) {
            currentData.children.forEach(layer => {
              this.$emit('layer-toggle', {
                id: layer.id,
                visible: isChecked,
                data: layer
              });
            });
          }

          // 更新选中的 ID 列表（可选）
          const { checkedNodes } = checkedStatus;
          const selectedLayerIds = checkedNodes.filter(n => n.type === 'layer').map(l => l.id);
          this.$emit('update-layers', selectedLayerIds);
    }


  }
};
</script>

<style scoped>
.side-bar {
  height: calc(100% - 68px);
  background: #FFF;
  padding: 14px 16px 11px;
  width: 308px;
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  overflow-y: auto;
  box-sizing: border-box;
}

/* 调整后的顶部栏布局 */
.side-bar .bar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid #EEEEEE;
  padding-bottom: 12px;
}

.side-bar .bar-top .title {
  font-family: SourceHanSansCN, sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  white-space: nowrap; /* 防止标题换行 */
}

/* 下拉框样式定制，匹配截图 image_2fd0c6.png */
.side-bar .bar-top /deep/ .el-input__inner {
  width: 110px;
  height: 32px;
  line-height: 32px;
  background: #F9F9F9;
  border-radius: 6px;
  border: 1px solid #CCCCCC;
  font-size: 14px;
  color: #333333;
  padding: 0 10px;
}

.side-bar .bar-top /deep/ .el-input__icon {
  line-height: 32px;
}

.bar-body {
  margin-top: 8px;
}

.custom-tree-node {
  display: flex;
  align-items: center;
  font-size: 15px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
  flex-shrink: 0;
}

/* 树节点样式微调 */
/deep/ .el-tree-node__content {
  height: 38px;
}
/deep/ .el-tree-node__label {
  color: #181818;
  font-weight: 500;
}
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #181818;
  border-color: #181818;
}
</style>