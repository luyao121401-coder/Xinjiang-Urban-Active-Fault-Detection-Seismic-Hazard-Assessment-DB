<template>
    <div class="header">
        <div class="left">
            <!-- <img src=""></img> -->
            <img src="@/assets/logos/logo.png"></span>
            <span class="title">城市活动断层探测与地震危险性评价信息系统</span>
        </div>
        <div class="right">
            <div :class=" page4 == 1 ? 'menu chengeit' : 'menu'" @click="jumpTo(1)">
                <span class="text">项目浏览</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div :class=" page5 == 1 ? 'menu chengeit' : 'menu'" @click="jumpTo(2)">
                <span >专题浏览</span>
            </div>
            <el-divider direction="verical"></el-divider>
            <div :class=" page6 == 1 ? 'menu chengeit' : 'menu'" @click="jumpTo(3)">
                <span>资料服务</span>
            </div>
            <el-divider direction="verical"></el-divider>
            <div class="menu" @click="jumpTo(4)">
                <!-- <img src=""></img> -->
                <img src="@/assets/img/系统导航.png" alt="">
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
import { mapActions, mapGetters } from "vuex"


export default{
    data(){
        return{
            num: null
        }
    },
    computed: {
        ...mapGetters({
            page4: "page/page4",
            page5: "page/page5",
            page6: "page/page6",
        })
    },
    methods:{
        ...mapActions({
            changepage4: "page/changepage4",
            changepage5: "page/changepage5",
            changepage6: "page/changepage6"
        }),
        jumpTo(num){
            switch(num){
                case 1: 
                    this.changepage4(1)
                    this.changepage5(0)
                    this.changepage6(0)
                // console.log(num)
                    // this.$router.push('/projectBrowse');
                    // this.num = num
                    break;
                case 2:
                    this.changepage4(0)
                    this.changepage5(1)
                    this.changepage6(0)
                    // this.$router.push('/thematicBrowse');
                    // this.num = num
                    break;
                case 3:
                    this.changepage4(0)
                    this.changepage5(0)
                    this.changepage6(1)
                    break;
                case 4:
                    this.$router.push('/');
                    this.num = num
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
    /* margin: 40px; */
    padding:20px;
    cursor: pointer;
    width: 180px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center
}
.right .menu img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.chengeit{
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
.right .menu:hover{
    background: #195392;
}
.el-divider{
    width: 2px;
    height: 21px;
    background: rgba(255,255,255,0.1);
    margin: 0
}
</style>
