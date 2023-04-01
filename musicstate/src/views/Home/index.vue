<template>
  <div>
    <el-container class="box">
      <el-header class="header_back header_box">
        <Header></Header>
      </el-header>

      <el-container>
        <el-aside width="250px" style="overflow: visible">
          <NavLeft></NavLeft>
        </el-aside>
        <el-container>
          <el-main class="HomeMain">
           <!-- <Main></Main> -->
           <router-view></router-view>
          </el-main>
          <!-- <el-footer>
            <Footer></Footer>
          </el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 组件
import Header from "@/views/Header";
import NavLeft from "@/views/NavLeft";
// import Index from '@/views/Index';
// import Footer from "@/views/Footer";

export default {
  name: "HomeBox",
  components: {
    Header,
    // Footer,
    NavLeft,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.header_box {
  width: 100%;
  padding: 10px 0px;
  border-bottom: 1px solid #ccc;
}
.HomeMain{
  padding: 10px 0 20px  0;
  overflow: hidden;
}
</style>
