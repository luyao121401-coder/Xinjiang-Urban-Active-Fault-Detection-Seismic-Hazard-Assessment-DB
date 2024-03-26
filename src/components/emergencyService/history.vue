<template>
  <div class="m-page">
    <div @click="goback" class="goback">
      <i style="margin-right: 5px;" class="el-icon-arrow-left"></i>
      返回
    </div>
    <div class="downlodeBox">
      <img src="@/assets/img/通用清单下载.png" alt="">
      通用清单下载
    </div>
    <h1>震后12小时应急服务响应清单历史记录</h1>
    <div class="search_box">
      <el-input
        class="input_div"
        style="width:350px;margin-right: 20px;"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input2">
        <!-- <div style="color: #181818;background-color: #EEEEEE;width: 100%;height: 100%;" slot="append">搜索</div> -->
        <div class="search_btn" slot="suffix">搜索</div>
      </el-input>
      <el-select class="input_div" v-model="value" placeholder="全部响应等级">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select style="margin-left: 20px;" class="input_div" v-model="value" placeholder="全部地震">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="inventorytext">
        <div></div>
        <span>共生成过16次震后应急服务响应行动清单</span>
      </div>
    </div>
    <div class="inventoryList">
      <div v-for="item in [1,2,4,3,2,1,4]" :key="item" class="quakeList">
        <img class="quakeImg" src="@/assets/img/地形图.jpg" alt="">
        <div class="quake_describe">
          <h3>新疆克孜勒苏州阿合奇县4.5级地震</h3>
          <span>发震时刻：2024年1月23日2时32分</span>
          <span>震中位置：78.43°E，41.07°N</span>
          <span>震源深度：23千米</span>
          <div class="quake_btnbox">
            <div @click="quakeDetail()" class="detail_btn">
              <i class="el-icon-picture"></i>
              详情
            </div>
            <div class="delete_btn">
              <i class="el-icon-delete-solid"></i>
              删除
            </div>
          </div>
        </div>
        <img v-if="item == 1" class="grade_img" src="@/assets/img/一级应急响应.png" alt="">
        <img v-if="item == 2" class="grade_img" src="@/assets/img/二级应急响应.png" alt="">
        <img v-if="item == 3" class="grade_img" src="@/assets/img/三级应急响应.png" alt="">
        <img v-if="item == 4" class="grade_img" src="@/assets/img/四级应急响应.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data(){
      return{
         
      }
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    quakeDetail(){
      this.$router.push({path: 'quakeDetail'})
    }
  }
}
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
}
.downlodeBox {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #303030;
  margin-left: 20px;
  cursor: pointer;
}
.downlodeBox > img{
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.goback{
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777777;
  margin-left: 20px;
  cursor: pointer;
}
.search_btn{
  position: relative;
  display: block;
  width: 66px;
  text-align: center;
  font-size: 16px;
  color: #181818;
  cursor: pointer;
  top: -14px;
}
.search_btn::before{
  content: '|';
  font-size: 16px;
  left: -18px;
  color: #181818;
  opacity: 0.15;
  line-height: 68px;
  position: relative;
}
.input_div >>> .el-input__inner{
  background-color: #EEEEEE !important;
}
h1{
  font-size: 32px;
  text-align: center;
  margin: 50px;
}
.search_box{
  width: 1040px;
  margin: 0 auto;
}
.inventorytext{
  display: flex;
  align-items: center;
  margin: 16px 0 22px 0;
  font-size: 14px;
  color: #777777;
}
.inventorytext > div{
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #B0D3F2;
  margin: 8px;
}
.inventoryList{
  width: 100%;
  max-height: 570px;
  overflow: auto;
  padding-top: 16px;
}
/* // 滚动条宽度 */
.inventoryList::-webkit-scrollbar {
  width: 6px;
}
/* // 滚动条轨道 */
.inventoryList::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
}
/* // 小滑块 */
.inventoryList::-webkit-scrollbar-thumb {
  background: #BCBCBC;
  border-radius: 3px;
}
.quakeList{
  width: 1040px;
  height: 132px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background: #FFFFFF;
  box-shadow: 0px 1px 4px 0px rgba(0,0,0,0.1);
  border-radius: 6px;
  padding-left: 16px;
  margin-bottom: 17px;
}
.quakeImg{
  width: 140px;
  height: 100px;
  margin-right: 20px;
}
.quake_describe > h3{
  font-size: 18px;
  color: #181818;
  font-weight: 550;
  margin-bottom: 10px;
}
.quake_describe > span{
  font-size: 14px;
  color: #777777;
  margin-right: 30px;
}
.quake_btnbox{
  display: flex;
  margin-top: 16px;
}
.detail_btn, .delete_btn{
  width: 80px;
  height: 24px;
  display: flex;
  align-items: center;
  
  border-radius: 6px;
  justify-content: center;
  cursor: pointer;
}
.detail_btn{
  background-color: #E6F0F9;
  color: #1F60A7;
}
.delete_btn{
  background-color: #F2F2F2;
  color: #303030;
  margin-left: 13px;
}
.grade_img{
  width: 150px;
  height: 43px;
  position: relative;
  right: -115px;
  top: -50px;
}
</style>

