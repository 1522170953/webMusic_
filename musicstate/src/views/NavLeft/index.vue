<template>
  <el-row class="tac">
    <el-col :span="24">
      <h5></h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <router-link to="/home/mymusic">
          <el-menu-item index="2"  :class=" $route.fullPath == '/home/mymusic' ? 'active' : ''"
          >
            <i class="el-icon-headset"></i>
            <span slot="title">我的音乐</span>
          </el-menu-item>
        </router-link>
        <router-link to="/home/mysongs">
          <el-menu-item index="3" :class=" $route.fullPath == '/home/mysongs' ? 'active' : ''"
          >
            <i class="el-icon-collection-tag"></i>
            <span slot="title">我的歌单</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "navLeft",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-item.is-active {
  color: black;
}
.el-menu-item:focus,
.el-menu-item:hover {
  background-color: #e6efe0;
}
.active{
  color: #83b164 !important;
}
</style>
