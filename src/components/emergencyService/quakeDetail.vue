<template>
  <div class="m-page">
    <div class="leftList">
      <div @click="goback" class="goback">
        <i style="margin-right: 5px;" class="el-icon-arrow-left"></i>
        返回
      </div>
      <el-timeline style="margin-top: 30px">
        <el-timeline-item timestamp="30分钟内" placement="top">
            <p>1. 启动应急指挥系统</p>
            <span>责任组：应急服务组</span>
            <p>2. 启动应急指挥系统</p>
            <span>责任组：应急服务组</span>
            <p>3. 启动应急指挥系统</p>
            <span>责任组：应急服务组</span>
            <p>4. 启动应急指挥系统</p>
            <span>责任组：应急服务组</span>
            <p>5. 启动应急指挥系统</p>
            <span>责任组：应急服务组</span>
            <p>6. 启动应急指挥系统</p>
            <span>责任组：应急服务组</span>
        </el-timeline-item>
        <el-timeline-item timestamp="30分钟 - 1小时" placement="top">
            <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-timeline-item>
        <el-timeline-item timestamp="1小时 - 2小时" placement="top">
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
    };
  },

  computed: {
  },
  created() {
  },
  methods: {
    goback(){
      this.$router.go(-1)
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
.m-page{
  z-index: 1;
  position: absolute;
  width: calc(100% - 40px);
  min-width: 800px;
  height: calc(100% - 108px);
  padding: 20px;
  top: 68px;
  background-color: #F9F9F9;
}
.leftList{
  width: 340px;
  padding: 20px 0 0 20px;
  background-color: white;
}
.goback{
  position: absolute;
  top: 30px;
  left: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777777;
  margin-left: 20px;
  cursor: pointer;
}
</style>
