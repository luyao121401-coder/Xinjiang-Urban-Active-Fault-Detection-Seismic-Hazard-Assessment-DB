<template>
  <div class="m-page">
    <div class="downlodeBox">
      <span>
        <img src="@/assets/img/通用清单下载.png" alt="">
        通用清单下载
      </span>
      <span @click="gomergencyhistory()">
        <img src="@/assets/img/计算记录.png" alt="">
        历史记录
      </span>
    </div>
    <div class="formBox">
      <h1>震后12小时应急服务响应清单</h1>
      <el-form style="width: 860px; margin: 0 auto;" ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <label>地震名称</label>
            <el-input v-model="form.name" placeholder="请输入地震名称"></el-input>
          </el-col>
          <el-col :span="12">
            <label>地震类型</label>
            <el-select style="width: 100%;" v-model="form.region" placeholder="请选择地震类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <label>震中经度(°)</label>
            <el-input v-model="form.name" placeholder="请输入经度, 如: 0.00"></el-input>
          </el-col>
          <el-col :span="12">
            <label>震中纬度(°)</label>
            <el-input v-model="form.name" placeholder="请输入纬度, 如: 0.00"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <label>震级（M）</label>
            <el-input v-model="form.name" placeholder="请输入地震震级"></el-input>
          </el-col>
          <el-col :span="12">
            <label>震源深度(千米)</label>
            <el-input v-model="form.name" placeholder="请输入震源深度"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <label>发震时刻(UTC+8)</label>
            <el-input v-model="form.name" placeholder="请选择发震时刻"></el-input>
            <span style="color: #F87A35;font-size: 14px;">
              <i class="el-icon-warning-outline"></i>
              仅可设定的当前时间之前的时间作为发震时刻
            </span>
          </el-col>
          <el-col :span="12">
            <label>参考位置</label>
            <el-input v-model="form.name" placeholder="请输入参考位置"></el-input>
          </el-col>
        </el-row>
        <label>计算模型</label>
        <p style="margin: 10px 0; font-size: 16px;" >地震烈度衰减关系模型</p>
        <el-select style="width: 100%;" v-model="form.region" placeholder="选择地震烈度衰减关系模型">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form>
      <el-button class="disabledbtn" :disabled="whetherDisabled" :type="btnType">生成行动清单</el-button>
    </div>
  </div>
</template>
<script>
export default{
  data(){
      return{
         form: {},
         whetherDisabled: true,
         btnType: 'info',
        //  btnType: 'primary'
      }
  },
  methods:{
    gomergencyhistory(){
      this.$router.push({name: 'mergencyhistory'})
    }
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
  /* padding: 20px; */
  top: 68px;
}
.downlodeBox{
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
}
.downlodeBox > span{
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 18px;
  color: #303030;
  cursor: pointer;
}
.downlodeBox > span > img{
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.formBox{
  width: 100%;
}
.formBox > h1{
  font-size: 32px;
  color: #081E49;
  text-align: center;
  margin: 30px 0 20px 0;
}
.formBox label{
  font-size: 18px;
  color: #181818;
  line-height: 50px;
}
.el-row{
  margin-top: 16px;
}
.disabledbtn{
  width: 280px;
  height: 38px;
  display: block;
  margin: 40px auto;
  /* margin-left: 500px; */
}
</style>
<style>
.el-input__inner {
  background-color: #f9f9f9 !important; 
  /* border: none !important; */
}
.el-button--primary{
  background-color: #1F60A7 !important;
}
.el-button--info{
  color: #bab9b9 !important;
  border: none;
  background-color: #EEEEEE !important;
}
</style>

