<template>
  <div>
    <el-container>
      <el-header>
        <h4>个人信息</h4>
      </el-header>
      <el-main>
        <el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple">用户名称</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">用户账号</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">用户ID</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">用户头像</div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">性别</div></el-col>
</el-row>

      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  data() {
    return {};
  },
};
</script>

<style scoped></style>
