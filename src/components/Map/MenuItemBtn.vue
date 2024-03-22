<template>
  <!-- 绘制测量的按钮 -->
  <div class="menu-item">
    <div class="icon-wrapper">
      <img class="img" :class="{ imgSelect: isSelect }" :src="icon" alt />
    </div>
    <div :class="{ textSelect: isSelect }">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "MenuItemBtn",
  props: {
    //是否选中
    select: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isSelect: this.select,
    };
  },
  watch: {
    select() {
      this.isSelect = this.select;
    },
  },
};
</script>

<style scoped>
.menu-item {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    font-size: 10px;
    justify-items: center;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
}

.icon-wrapper {
    display: inline-block;
    width: 20px;
    height: 20px;
    overflow: hidden;
    position: relative;
}

.imgSelect {
    width: 100%;
    height: 100%;
    position: absolute;
    left: -20px;
    display: inline-block;
    border-right: 20px solid transparent;
    -webkit-filter: drop-shadow(rgb(76, 150, 247) 20px 0);
    filter: drop-shadow(rgb(76, 150, 247) 20px 0);
}

.img {
    width: 100%;
    height: 100%;
    position: absolute;
    display: inline-block;
    border-right: 20px solid transparent;
}

.textSelect {
    color: rgb(76, 150, 247);
}
</style>