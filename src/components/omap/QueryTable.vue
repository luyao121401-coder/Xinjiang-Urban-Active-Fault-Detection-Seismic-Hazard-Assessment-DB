<template>
  <div v-if="this.isShowQueryResultTable == true" class="table">
    <div class="tabletitle">{{ layername }}</div>
    <div class="iconclose">
      <i
        class="el-icon-close"
        style="cursor: pointer; color: white"
        @click="closeTable"
      ></i>
    </div>
    <el-table
      border
      class="atable"
      :scroll="{ x: '100%', y: 250 }"
      style="width: calc(100vw - 700px); max-height: 204px"
      :data="querydata"
      height="204px"
    >
      <el-table-column
        v-for="(item, index) in columns"
        :key="index"
        :label="item"
        show-overflow-tooltip
        :prop="item"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { OMEvent } from "./js/OMapEvent";

export default {
  props: {},
  data() {
    return {
      omEvent: null,
      querydata: null,
      columns: null,
      layername: "",
      isShowQueryResultTable: false,
    };
  },
  mounted() {
    this.omEvent = new OMEvent(this);
    this.omEvent.on("queryTable", this.queryTable);
    this.omEvent.on("queryFeatureClose", this.closeTable);
  },
  methods: {
    closeTable() {
      this.isShowQueryResultTable = false;
      this.querydata = null;
      this.columns = null;
      this.layername = null;
    },

    queryTable(data) {
      this.querydata = data.queryResultData;
      this.columns = data.queryResultColumns;
      this.layername = data.queryLayerName;
      this.columns.map((item, index) => {
        if (item == "location") {
          this.columns.splice(0, 7);
        }
        if (item == "geometry") {
          this.columns.splice(index, 1);
        }
        if (item == "faultname") {
          this.columns.splice(0, 9);
        }
      });
      this.isShowQueryResultTable = true;
    },
  },
};
</script>

<style scoped>
.hidden {
  background: #181818;
  color: #fff;
}
/* 定义滚动条样式 */
.table /deep/ ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background: #fff;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(17, 16, 16, 0.5);
  border-radius: 10px;
  background-color: #f9f9f9;
}

/*定义滑块 内阴影+圆角*/
.table /deep/ ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(63, 61, 61, 0.5);
  /* background-color: rgba(85, 82, 82, 0.5); */
  background-color: #898080;
}
/* .el-table >>> .cell{
  height: 50px;
} */
.table {
  font-size: 16px;
  width: calc(100vw - 700px);
  /* height: 204px; */
  background: rgba(44, 60, 96, 0.7);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: 80px;
  left: 340px;
  z-index: 10;
  border-radius: 5px;
}
.tabletitle {
  margin-top: 10px;
  margin-left: 10px;
  height: 30px;
  /* text-align: center; */
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10px;
}
.atable {
  position: relative;
  bottom: 0px;
  left: 0px;
  max-height: 204px !important;
  overflow: auto;

  /* border: 1px solid #000; */
}
.table >>> .ant-table {
  max-height: 204px !important;
  overflow: auto;
}
.iconclose {
  display: inline-block;
  position: absolute;
  right: 12px;
  font-size: 20px;
  top: 0;
  margin-top: 10px;
}
.el-table::before {
  height: 0;
}

/* .table /deep/ .el-table__body-wrapper {
  background: rgba(44, 60, 96, 0.5);
} */

.table /deep/.el-table {
  /* background: rgba(44, 60, 96, 0);
  border-color: rgba(44, 60, 96, 0); */
  background: none;
  border-color: rgba(255, 255, 255, 0.4);
}

.table /deep/.el-table__empty-text {
  color: #fff;
}

/* .table /deep/.el-table__body-wrapper {
  background: red;
} */
.table /deep/ tr,
.table /deep/ td {
  background: none;
  color: #fff;
}

.table
  /deep/.el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td.el-table__cell {
  background: none;
}

.table /deep/.el-table th.el-table__cell {
  background: none;
}

.table /deep/ .el-table--border .el-table__cell,
.table /deep/.el-table td.el-table__cell {
  border-color: rgba(255, 255, 255, 0.4);
}

/* 表格鼠标悬浮时的样式（高亮） */
.table /deep/ .el-table--enable-row-hover .el-table__body tr:hover {
  background: #ccc;
  border: 1px solid #313463;
}
/*表格鼠标悬停的样式（背景颜色）*/
.table /deep/ .el-table tbody tr:hover > td {
  background-color: #ababab !important;
}
.table /deep/ .el-table--border::after {
  width: 0px;
}

.table /deep/ .el-table--border::after {
  width: 5px;
  z-index: -200;
  background: #fff;
}
</style>
