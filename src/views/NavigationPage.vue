<template>
  <div class="container">
    <!-- 插入高质量地质背景 -->
    <div class="background-wrapper"></div>
    <!-- 优化蒙层：使用深色渐变消除“雾感”，提升清晰度 -->
    <div class="background-overlay"></div>

    <div class="header">
      <div class="user">
        <el-divider direction="vertical"></el-divider>
        <img class="touxiang" src="@/assets/img/地形图.jpg">
      </div>
    </div>

    <div class="body">
      <div class="title">
        <img src="@/assets/logos/logo.png">
        <span class="text">城市活动断层探测与地震危险性评价信息系统</span>
      </div>
      <div class="content">
        <div class="line">
          <div class="card" @click="jumpTo(1)">
            <div class="pic">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zm6-3v15m6-15v15" />
              </svg>
            </div>
            <span class="text">城市活动断层探测与地震危险性评价</span>
          </div>
          <div class="card" @click="jumpTo(2)">
            <div class="pic">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" />
              </svg>
            </div>
            <span class="text">地震灾害损失预评估</span>
          </div>
          <div class="card" @click="jumpTo(3)">
            <div class="pic">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span class="text">地震灾害风险普查</span>
          </div>
          <div class="card" @click="jumpTo(4)">
            <div class="pic">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
            </div>
            <span class="text">专题制图</span>
          </div>
        </div>
        <div class="line">
          <div class="card" @click="jumpTo(5)">
            <div class="pic">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <span class="text">地震信息与应急产出</span>
          </div>
          <div class="card" @click="jumpTo(6)">
            <div class="pic">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <span class="text">震后12小时应急服务响应清单</span>
          </div>
          <div class="card">
            <div class="pic">
              <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </div>
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

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      page0: "page/page0"
    })
  },
  methods: {
    ...mapActions({
      changepage0: "page/changepage0"
    }),
    jumpTo(num) {
      switch (num) {
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
        case 4:
          this.$router.push({ path: '/thematicCharting' });
          break;
        case 5:
          this.$router.push('/outPut');
          break;
        case 6:
          this.$router.push({ path: '/emergencyService' });
          break;
      }
    }
  }
}
</script>

<style scoped>
/* 还原后的 Container 逻辑 */
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 强制禁止滚动条 */
  position: relative;
}

/* 背景层 */
.background-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000') no-repeat center center;
  background-size: cover;
  z-index: -2;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 深色深邃渐变，增加画面对比度 */
  background: linear-gradient(135deg, rgba(0, 15, 40, 0.75) 0%, rgba(0, 30, 60, 0.4) 100%);
  z-index: -1;
}

/* 还原 Header 尺寸 */
.header {
  height: 62px;
  flex-shrink: 0;
}

.header .el-divider {
  width: 2px;
  height: 21px;
  background: #4CAF50;
  margin: 1px 10px 0 0;
}

.header .user {
  display: flex;
  float: right;
  padding: 10px;
  align-items: center;
}

.touxiang {
  width: 36px;
  height: 36px;
  border-radius: 40px;
  margin-left: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* 还原 Body 布局 */
.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}

.title {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

.title img {
  height: 72px;
  width: 72px;
}

.title .text {
  width: 1080px;
  height: 75px;
  overflow-wrap: break-word;
  color: #ffffff;
  font-size: 54px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
  line-height: 75px;
  margin: 20px 0 20px 22px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.content {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.content .line {
  display: flex;
  margin: auto;
  margin-top: 24px;
}

/* 还原 Card 尺寸和原始背景 */
.content .line .card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: 240px;
  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng13fdec929bc8c404a654977d5f6cab5b514e16e67dca1d9d4ef6442374c23242) 100% no-repeat;
  background-size: 100% 100%;
  margin-left: 50px;
  cursor: pointer;
  transition: all 0.3s;
}

.content .line .card:hover {
  transform: translateY(-8px);
  filter: brightness(1.1);
}

.content .line .card:first-child {
  margin-left: 0;
}

/* 优化图标容器：白框效果 */
.content .line .card .pic {
  background-color: #ffffff;
  width: 88px;
  height: 88px;
  border-radius: 12px;
  margin: 48px auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.icon-svg {
  width: 44px;
  height: 44px;
  color: #195392; /* 深蓝色图标 */
}

.content .line .card .text {
  height: 40px;
  font-weight: 600;
  font-size: 17px;
  color: #ffffff;
  text-align: center;
  padding: 0 10px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* 页脚 */
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;
  flex-shrink: 0;
  background: rgba(0, 0, 0, 0.3);
}

.footer span {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 28px;
}

.footer span:first-child {
  margin-left: 0;
}

.footer .el-divider {
  width: 2px;
  height: 16px;
  background: rgba(255, 255, 255, 0.2);
  margin-left: 27px;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>