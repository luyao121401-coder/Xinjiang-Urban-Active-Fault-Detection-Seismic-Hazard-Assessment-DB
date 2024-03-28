<template>
    <div class="pagination-content">
        <el-pagination
            v-model="current_page"
            layout="  prev, pager, next,slot, jumper"
            prev-text="上一页"
            next-text="下一页"
            :total="total"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            @prev-click="prevPage"
            @next-click="nextPage"
        >
        <div class="div">共{{ Math.ceil(total / pageSize) }}页</div>
        </el-pagination>
        <el-pagination layout=" slot" :total="400">
          <div class="ent-btn">确定</div>
        </el-pagination>
    </div>
</template>
<script>
export default {
    props: {
        currentPage: Number,
        total: Number,
        pageSize: {
            type: Number,
            default: 16
        }
    },
    data() {
        return {
            current_page: 1
        }
    },
    methods: {
        handleCurrentChange(currentPage) {
            this.$parent.paginationRequestPage(currentPage)
        },
        // 上一页
        prevPage() {
            this.$parent.paginationRequestPage(this.currentPage - 1)
        },
        // 下一页
        nextPage() {
            this.$parent.paginationRequestPage(this.currentPage + 1)
        }
    },
}
</script>
<style scoped>
.pagination-content {
    /* position: absolute;
    bottom: 20px; */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 28px 0 31px 0
}
.pagination-content /deep/ .btn-prev,
.pagination-content /deep/ .btn-next {
    width: 48px;
    height: 22px;
    border-radius: 4px;
    border: 1px solid #434b5f;
    /* background: none; */
    padding: 0;
    /* background-color: transparent;
    border: 1px solid #434b5f;
    border-radius: 4px;
    color: red; */
}
.pagination-content /deep/ .el-pagination button:disabled {
    border: 1px solid rgba(0, 0, 0, 0.3);
}
.pagination-content /deep/ .el-pagination button {
    border: 1px solid #005BA3;
}
.pagination-content /deep/ .btn-prev span,
.pagination-content /deep/ .btn-next span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 400;
    height: 22px;
    width: 48px;
    padding: none;
    /* color: #ffffff; */
    /* opacity: 0.5; */
}
.pagination-content /deep/ .el-pagination .el-pager li {
    min-width: 22px;
    height: 22px;
    border: 1px solid #005BA3;
    margin: 0 6px;
    padding: 0;
    font-size: 12px;
    line-height: 22px;
}
.pagination-content /deep/ .el-pagination .el-pager li.active {
    color: white;
    background: #005BA3;
    border-radius: 4px;
}
.pagination-content /deep/ .el-pagination .el-pagination__total {
    height: 22px;
    font-size: 12px;
    margin: 0 12px;
    line-height: 22px;
}
.pagination-content /deep/ .el-pagination .el-pagination__jump {
    margin: 0;
    padding: 0;
    font-size: 12px;
    height: 22px;
    line-height: 22px;
}
.pagination-content /deep/ .el-pagination .el-pagination__jump .el-pagination__editor {
    height: 22px;
    line-height: 22px;
}
.pagination-content /deep/ .el-pagination .el-pagination__jump .el-pagination__editor input {
    height: 22px;
    border: 1px solid #005BA3;
}
.pagination-content /deep/ .ent-btn {
  width: 48px;
  height: 22px;
  border-radius: 4px;
  background: #004286;
  font-size: 12px;
  color: #fff;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;
}   
.pagination-content /deep/ .div {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  line-height: 20px;
  margin: 0 16px;
}
.el-pagination {
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/.el-pagination__editor{
    width: 34px
}
</style>