<template>
    <div class="header">
        <div class="left">
            <!-- <img src=""></img> -->
            <img src="@/assets/logos/logo.png"></span>
            <span class="title">城市活动断层探测与地震危险性评价信息系统</span>
        </div>
        <div class="right">
            <div class="menu" @click="jumpTo(1)">
                <span class="text">项目浏览</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="menu" @click="jumpTo(2)">
                <span >专题浏览</span>
            </div>
            <el-divider direction="verical"></el-divider>
            <div class="menu" @click="jumpTo(3)">
                <span>资料服务</span>
            </div>
            <el-divider direction="verical"></el-divider>
            <div class="menu" @click="jumpTo(4)">
                <!-- <img src=""></img> -->
                <span class="pic">图片</span>
                <span>系统导航</span>
            </div>
            <el-divider direction="verical"></el-divider>
            <div class="user">
                <img src="@/assets/logos/logo.png"></img>
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
        jumpTo(num){
            switch(num){
                case 1: 
                    this.$router.push('/projectBrowse');
                    break;
                case 2:
                    this.$router.push('/thematicBrowse');
                    break;
                case 3:
                    this.$router.push('/dataServe');
                    break;
                case 4:
                    this.$router.push('/');
                    break;

                
            }
        }
    }
}
</script>
<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 68px;
    background: #1F60A7;
}
.left{
    display: flex;
    align-items: center
}
.header .left img{
    height: 32px;
    width: 32px;
    margin: 0 12px 0 18px
}
.left .title{
    width: 440px;
    height: 30px;
    font-size: 22px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 30px;
}
.header .right .user img{
    height: 32px;
    width: 32px;
    margin: auto 20px;
}
.header .right .user{
    display: flex;
    align-items: center
}
.right{
    display: flex;
    align-items: center
}
.right .menu{
    margin: 40px;
    cursor: pointer;

}
.right .menu span{ 
    width: 72px;
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 25px;
}
.el-divider{
    width: 2px;
    height: 21px;
    background: rgba(255,255,255,0.1);
}
</style>
