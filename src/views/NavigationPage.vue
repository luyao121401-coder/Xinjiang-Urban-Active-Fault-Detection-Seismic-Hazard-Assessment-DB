<!-- 城市活动断层探测与地震危险性评价信息系统-----导航页面 -->
<template>
    <div class="container">
        <div class="header">
            <div class="user">
                <el-divider direction="vertical"></el-divider>
                <!-- <span>导航</span> -->
                <img class="touxiang" src="@/assets/img/地形图.jpg"></img>
            </div>
        </div>
        <div class="body">
            <div class="title">
                <img src="@/assets/logos/logo.png"></img>
                <span class="text">城市活动断层探测与地震危险性评价信息系统</span>
            </div>
            <div class="content">
                <div class="line">
                    <div class="card" @click="jumpTo(1)">
                        <!-- <img src=""></img> -->
                        <span class="pic">图片</span>
                        <span class="text">城市活动断层探测与地震危险性评价</span>
                    </div>
                    <div class="card" @click="jumpTo(2)">
                        <!-- <img src=""></img> -->
                        <span class="pic">图片</span>
                        <span class="text">地震灾害损失预评估</span>
                    </div>
                    <div class="card" @click="jumpTo(3)">
                        <!-- <img src=""></img> -->
                        <span class="pic">图片</span>
                        <span class="text">地震灾害风险普查</span>
                    </div>
                    <div class="card" @click="jumpTo(4)">
                        <!-- <img src=""></img> -->
                        <span class="pic">图片</span>
                        <span class="text">专题制图</span>
                    </div>
                </div>
                <div class="line">
                    <div class="card" @click="jumpTo(5)">
                        <!-- <img src=""></img> -->
                        <span class="pic">图片</span>
                        <span class="text">地震信息与应急产出</span>
                    </div>
                    <div class="card">
                        <!-- <img src=""></img> -->
                        <span class="pic">图片</span>
                        <span class="text">震后12小时应急服务响应清单</span>
                    </div>
                    <div class="card">
                        <!-- <img src=""></img> -->
                        <span class="pic">图片</span>
                        <span class="text">系统管理</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
                <span>网安备案号</span>
                <el-divider direction="vertical"></el-divider>
                <span>ICP备案号</span>
                <el-divider direction="vertical"></el-divider>
                <span>版权单位：新疆维吾尔自治区地震局</span>
                <el-divider direction="vertical"></el-divider>
                <span>技术支持：第四纪数字地球（北京）科技有限公司</span>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"

export default{
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters({
            page0: "page/page0"
        })
    },
    methods:{
        ...mapActions({
            changepage0:"page/changepage0"
        }),
        jumpTo(num){
            switch(num){
                case 1: 
                    this.$router.push('/projectBrowse');
                    this.changepage0(1)
                    break;
                case 2:
                    this.$router.push('/assessResults');
                    this.changepage0(0)
                    break;
                case 3:
                    this.$router.push('/riskSurvey');
                    this.changepage0(0)
                    break;
                case 5:
                    this.$router.push('/outPut')
            }
        }
    }
}
</script>
<style scoped>
.container{
    height: 98vh;
    display: flex;
    flex-direction: column;
    background-color: red
}
.header{
    height: 62px
}
.header .el-divider{
    width: 2px;
    height: 21px;
    background: rgba(255,255,255,0.1);
    background: green;
    margin: 1px 10px 0 0
}
.header .user{
    display: flex;
    float: right;
    padding: 10px;
    align-items: center
}
.touxiang{
    width: 36px;
    height: 36px;
    border-radius: 40px;
    margin-left: 10px
}
.body{
    /* display: flex;
    align-items: center */
    height: calc(100% - 149px)
}
.title{
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}
.title img{
    height: 72px;
    width: 72px
}
.title .text{
  width: 1080px;
  height: 75px;
  overflow-wrap: break-word;
  color: rgba(25, 83, 146, 1);
  font-size: 54px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 75px;
  margin: 20px 0 20px 22px
}
.content{
    display: flex;
    flex-direction: column;
    margin-top: 40px
}
.content .line{
    display: flex;
    margin: auto;
    margin-top: 54px
}
.content .line .card{
  /* background-color: rgba(255, 255, 255, 1);
  width: 96px;
  height: 96px;
  margin: 54px 0 0 122px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: 240px;
  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng13fdec929bc8c404a654977d5f6cab5b514e16e67dca1d9d4ef6442374c23242)
    100% no-repeat;
  background-size: 100% 100%;
  margin-left: 50px;
  cursor: pointer;
}
.content .line .card .pic{
  background-color: rgba(255, 255, 255, 1);
  width: 96px;
  height: 96px;
  /* margin: 54px 0 0 122px; */
  margin: auto;
  align-items: center;
  text-align: center
}
.content .line .card .text{
  height: 40px
}
.footer{
    display: flex;
    align-items: center;
    margin: auto;
    height: 72px;
    text-align: center;
    /* background: blue */
}
.footer span{
  /* width: 308px; */
  height: 14px;
  overflow-wrap: break-word;
  color: rgba(255, 255, 255, 0.85);
  font-size: 14px;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 21px;
  margin: 1px 0 0 28px;
}
.footer .el-divider{
  /* margin: 10px; */
  width: 2px;
  height: 16px;
  background: rgba(255,255,255,0.4);
  margin: 10px 0 0 27px
}
</style>
<style>
* {
    margin: 0;
    padding: 0;
}
</style>