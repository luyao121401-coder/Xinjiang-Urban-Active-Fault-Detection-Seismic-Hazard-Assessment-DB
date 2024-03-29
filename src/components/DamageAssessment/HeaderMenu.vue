<template>
    <div class="header">
        <div class="left">
            <!-- <img src=""></img> -->
            <img src="@/assets/logos/logo.png"></span>
            <span class="title">城市活动断层探测与地震危险性评价信息系统</span>
        </div>
        <div class="right">
            <div :class=" page1 == 1 ? 'menu chengeit' : 'menu'" @click="jumpTo(1)">
                <span class="text">评估成果</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div :class=" page2 == 1 ? 'menu chengeit' : 'menu'" @click="jumpTo(2)">
                <span >批量计算</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div :class=" page3 == 1 ? 'menu chengeit' : 'menu'" @click="jumpTo(4)">
                <span >区域检索与计算</span>
            </div>
            <el-divider direction="verical"></el-divider>
            <div class="menu" @click="jumpTo(3)" style="display: flex;align-items:center;">
                <img src="@/assets/img/系统导航.png" alt="">
                <span>系统导航</span>
            </div>
            <el-divider direction="verical"></el-divider>
            <div class="user">
                <img src="@/assets/logos/logo.png"></img>
                <!-- <span class="pic">头像</span> -->
            </div>
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
    computed: {
        ...mapGetters({
            page2: "page/page2",
            page3: "page/page3",
            page1: "page/page1",
        })
    },
    methods:{
        ...mapActions({
            changepage2: "page/changepage2",
            changepage3: "page/changepage3",
            changepage1: "page/changepage1"
        }),
        jumpTo(num){
            switch(num){
                case 1: 
                    this.changepage2(0)
                    this.changepage1(1)
                    this.changepage3(0)
                    // this.$router.push({ path: '/assessResults', hash: '#assess-result' });
                    break;
                case 2:
                    // this.$router.push({ path: '/batchCompute', hash: '#batch-compute' });
                    this.changepage2(1)
                    this.changepage1(0)
                    this.changepage3(0)
                    break;
                case 3:
                    this.$router.push('/');
                    break;     
                case 4:
                    this.changepage2(0)
                    this.changepage1(0)
                    this.changepage3(1)
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
.header .right .user img{
    height: 32px;
    width: 32px;
    margin: auto 20px;
}
.header .right .user{
    display: flex;
    align-items: center
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
.right{
    display: flex;
    align-items: center
}
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
.chengeit{
  background: #195392;
}
.right .menu img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.right .menu span{ 
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 25px;
    /* margin: auto */
}
.el-divider{
    width: 2px;
    height: 21px;
    background: rgba(255,255,255,0.1);
    margin: 0
}
</style>
