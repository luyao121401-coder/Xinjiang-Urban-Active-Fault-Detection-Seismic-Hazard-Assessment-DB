<template>
    <div class="header">
        <div class="left">
            <img src="@/assets/logos/logo.png"></span>
            <span class="title">城市活动断层探测与地震危险性评价信息系统</span>
        </div>
        <div class="right">
            <div class="menu" @click="jumpTo(1)">
                <img src="@/assets/img/系统导航.png"></img>
                <span>返回主页</span>
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
.right{
    display: flex;
    align-items: center
}
/* .right .menu{
    margin: 40px;
    cursor: pointer

} */
.right .menu{
    /* margin: 40px; */
    padding:20px;
    cursor: pointer;
    width: 180px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center
}
.right .menu:hover{
    background: #195392;
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
.right .menu img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.el-divider{
    width: 2px;
    height: 21px;
    background: rgba(255,255,255,0.1);
}
</style>
