<template>
  <div class="app">
    <!-- 路由入口 -->
    <router-view></router-view>
    <Footer v-show="!$route.path=='/login'"></Footer>
  </div>
</template>

<script>
import Footer from "@/views/Footer";
export default {
  name: "App",
  components: {
    Footer,
  },
};
</script>

<style scoped>
a {
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000; /* 去除默认的颜色和点击后变化的颜色 */
}
.app {
  overflow: hidden;
}
</style>
