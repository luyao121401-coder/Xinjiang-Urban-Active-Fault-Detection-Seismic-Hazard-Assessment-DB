<template>
  <!-- 首页导航栏 -->
  <div>
    <div class="topNav">
      <div class="top_title">
        <img src="@/assets/logos/logo.png" alt="">
        <span>城市活动断层探测与地震危险性评价信息系统</span>
      </div>
      <div class="chek_title">
        <div class="guanli">
          <div  class="head_icon" @click="goAuthority('城市活动断层探测成果图')" :class="pageName=='城市活动断层探测成果图'? 'chengeit':''">
            <p>
              城市活动断层探测成果图
            </p>
          </div>
          <div  class="head_icon" @click="goAuthority('地震灾害损失预评估成果图')" :class="pageName=='地震灾害损失预评估成果图'? 'chengeit':''">
            <p>
              地震灾害损失预评估成果图
            </p>
          </div>
          <div  class="head_icon" @click="goAuthority('地震灾害风险普查成果图')" :class="pageName=='地震灾害风险普查成果图'? 'chengeit':''">
            <p>
              地震灾害风险普查成果图
            </p>
          </div>
          <div @click="goHomepage()" class="head_icon_img">
            <img src="@/assets/img/系统导航.png" alt="">
            <span>系统导航</span>
          </div>
        </div>
        <div class="head_img">
          <img src="@/assets/logos/logo.png" alt="">
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      pageName: "城市活动断层探测成果图",
    };
  },

  computed: {
  },
  watch: {
    $route() {
      this.activeIndex = this.$route.matched[1].name;
    }
  },
  created() {
    this.pageName = this.$route.matched[1].name;
  },
  methods: {
    goAuthority(val){
      this.$router.push({ name: val})
      this.pageName = val
    },
    goHomepage(){
      this.$router.push('/');
    }
  },
  mounted() {
  },
};
</script>

<style scoped>
.topNav{
  position: absolute;
  width: 100%;
  min-width: 1200px;
  height: 68px;
  background: #1F60A7;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  /* line-height: 68px; */
  color: white;
}
.top_title{
  height: 68px;
  line-height: 68px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
}
.top_title > span{
  font-size: 22px;
  font-weight: 500;
}
.top_title > img{
  width: 32px;
  height: 32px;
  margin: 0 18px;
}
.chek_title{
  height: 68px;
  display: flex;
  font-weight: 500;
  font-size: 18px;
  color: #FFFFFF;
}
.guanli{
  display: flex;
}
.guanli > div{
  /* width: 180px; */
  width: 260px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.head_icon > p{
  width: 260px;
  line-height: 68px;
  text-align: center;
}
.guanli > .head_icon::after{
  content: '|';
  font-size: 20px;
  color: rgba(255,255,255,0.1);
  line-height: 68px;
  position: relative;
  right: -3px;
}
.head_icon_img{
  width: 165px !important;
}
.head_icon_img::after{
  content: '|';
  font-size: 20px;
  color: rgba(255,255,255,0.1);
  line-height: 68px;
  position: relative;
  right: -30px;
}
.head_icon_img > img{
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.guanli > div:hover{
  cursor: pointer;
  background: #195392;
}
.chengeit{
  background: #195392;
}
.head_img{
  width: 70px;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.head_img > img{
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.head_img:hover{
  cursor: pointer;
}
</style>
