<template>
  <div class="m-page">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-left">
        <el-breadcrumb-item :to="{ name: $route.params.name }">{{$route.params.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>制图记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
        :data="tableData"
        height="650"
        border
        header-cell-style="background-color: rgba(31,96,167,0.15); color: #000000"
        cell-style="background-color: #F9F9F9;"
        style="width: 100%; margin-top: 10px;background-color: #F9F9F9;box-shadow: 1px 8px 5px #EDEDED;">
        <el-table-column
          prop="xh"
          label="序号"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="图件名称"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="type"
          width="100"
          label="图件类型">
        </el-table-column>
        <el-table-column
          width="300"
          label="制图范围">
          <template slot-scope="scope">
            <div class="scopebox">
              <span>喀什市</span>
              <div @click="openUplode(scope.$index, scope.row)">查看范围</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit"
          label="制图单位">
        </el-table-column>
        <el-table-column
          prop="imgpeople"
          width="150"
          label="出图人">
        </el-table-column>
        <el-table-column
          prop="time"
          label="制图时间"
          sortable>
        </el-table-column>
        <el-table-column
          label="出图状态"
          width="100">
          <template slot-scope="scope">
            <div class="chartingbox">
              <span v-if="scope.row.num == 2"><img src="@/assets/img/制图中.png" alt="">制图中</span>
              <span v-if="scope.row.num == 1"><img src="@/assets/img/已完成.png" alt="">已完成</span>
              <span v-if="scope.row.num == 3"><img src="@/assets/img/失败.png" alt="">失败</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div class="btnbox">
              <el-link v-if="scope.row.num == 2" :underline="false" disabled>
                <span  class="operation"><img src="@/assets/img/下载图件禁用.png" alt="">下载图片</span>
              </el-link>
              <el-link v-if="scope.row.num == 2" :underline="false" disabled>
                <span  class="operation"><img src="@/assets/img/删除禁用.png" alt="">删除</span>
              </el-link>
              <el-link v-if="scope.row.num == 3" :underline="false" disabled>
                <span  class="operation"><img src="@/assets/img/下载图件出图失败.png" alt="">下载图片</span>
              </el-link>
              <el-link  v-if="scope.row.num == 1" @click="handleEdit(scope.$index, scope.row)" :underline="false" type="primary">
                <span  class="operation"><img src="@/assets/img/下载图件.png" alt="">下载图片</span>
              </el-link>
              <el-link  v-if="scope.row.num == 1 || scope.num == 3"  @click="openUplode(scope.$index, scope.row)" :underline="false" type="danger">
                <span  class="operation"><img src="@/assets/img/删除.png" alt="">删除</span>
              </el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <span>共计产出 4 次 城市活动断层探测成果图</span>
      <el-pagination
        background
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default{
  data(){
      return{
         form: {},
         tableData: [
          {xh: '1', name: '喀什市地震构造图', type: '地震构造图', unit: '新疆维吾尔自治区地震局', imgpeople: '嘉东（示例）', time: '2024-02-09 14:30', num: 1},
          {xh: '2', name: '喀什市地震构造图', type: '地震构造图', unit: '新疆维吾尔自治区地震局', imgpeople: '嘉东（示例）', time: '2024-02-09 14:30', num: 2},
          {xh: '3', name: '喀什市地震构造图', type: '地震构造图', unit: '新疆维吾尔自治区地震局', imgpeople: '嘉东（示例）', time: '2024-02-09 14:30', num: 3},
          {xh: '4', name: '喀什市地震构造图', type: '地震构造图', unit: '新疆维吾尔自治区地震局', imgpeople: '嘉东（示例）', time: '2024-02-09 14:30', num: 1},
          {xh: '5', name: '喀什市地震构造图', type: '地震构造图', unit: '新疆维吾尔自治区地震局', imgpeople: '嘉东（示例）', time: '2024-02-09 14:30', num: 3},
         ]
      }
  },
  created() {
    
  },
  mounted() {
  },
  methods:{
  }
}
</script>
<style scoped>
.m-page{
  z-index: 1;
  position: absolute;
  width: 100%;
  min-width: 800px;
  min-height: calc(100% - 68px);
  padding: 20px;
  top: 68px;
}
.scopebox{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.scopebox > div{
  width: 60px;
  height: 24px;
  font-size: 12px;
  color: #0054A0;
  background-color: #EEF4FF;
  text-align: center;
  line-height: 24px;
}
.chartingbox{
  font-size: 14px;
  color: #000000;
}
.chartingbox > span{
  display: flex;
  align-items: center;
}
.chartingbox > span > img{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.btnbox{
  display: flex;
}
.operation{
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.operation > img{
  width: 20px;
  height: 20px;
  margin-right: 8x;
}
.pagination{
  display: flex;
  position: relative;
  bottom: -40px;
}
</style>
<style>
.el-table__body tr:hover > td{
  background: rgba(0,84,160,0.06) !important;
}

.el-pagination{
  margin-left: 30%;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #005BA3 !important;
}
</style>

