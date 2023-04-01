<template>
  <el-row :gutter="20">
    <el-col :span="3"><div class="grid-content bg-purple">&nbsp;</div></el-col>
    <el-col :span="2"
      ><div class="grid-content bg-purple img">
        <img src="@/assets/LOGO.png" alt="" width="100%" />
      </div>
    </el-col>
    <el-col :span="12"
      ><div class="grid-content bg-purple hearderLists">
        <el-row>
          <router-link to="/home/index">
            <el-col
              :span="4"
              :class="$route.fullPath == '/home/index' ? 'choice' : ''"
              ><div class="grid-content bg-purple hearder_index">
                首页
              </div></el-col
            >
          </router-link>
          <router-link to="/home/list">
            <el-col
              :span="4"
              :class="$route.fullPath == '/home/list' ? 'choice' : ''"
              ><div class="grid-content bg-purple-light">榜单</div></el-col
            ></router-link
          >
          <router-link to="/home/singer">
            <el-col
              :span="4"
              :class="$route.fullPath == '/home/singer' ? 'choice' : ''"
              ><div class="grid-content bg-purple">歌手</div></el-col
            ></router-link
          >
          <router-link to="/home/album">
            <el-col
              :span="4"
              :class="
                $route.fullPath.indexOf('/home/album') != -1 ? 'choice' : ''
              "
              ><div class="grid-content bg-purple-light">专辑</div></el-col
            ></router-link
          >
          <router-link to="/home/songs">
            <el-col
              :span="4"
              :class="
                $route.fullPath.indexOf('/home/songs') != -1 ? 'choice' : ''
              "
              ><div class="grid-content bg-purple">歌单</div></el-col
            >
          </router-link>
          <router-link to="/home/mv">
            <el-col
              :span="4"
              :class="$route.fullPath == '/home/mv' ? 'choice' : ''"
              ><div class="grid-content bg-purple">MV</div></el-col
            ></router-link
          >
        </el-row>
      </div></el-col
    >
    <el-col :span="4"
      ><div class="grid-content bg-purple">
        <el-row v-show="$route.fullPath.indexOf('/home/search')">
          <el-col :span="6">
            <div class="grid-content bg-purple headerSearch" @click="goSearch">
              搜索
            </div></el-col
          >
        </el-row>
        &nbsp;
      </div></el-col
    >
    <el-col :span="3"
      ><div class="grid-content bg-purple">
        <div class="block">
          <div>
            <el-avatar :size="40" :src="userInfo.avatarUrl"></el-avatar>
          </div>
          <div class="userTxt">
            <div>{{ userInfo.nickname }}</div>
            <div class="out" @click="out">退出登录</div>
          </div>
        </div>
      </div></el-col
    >
  </el-row>
</template>

<script>
import { outAPI } from "@/api/index";
export default {
  name: "headerOne",
  data() {
    return {
      userInfo: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      options: [],
      list: [],
      loading: false,
      states: [], //搜索反馈
    };
  },
  mounted() {
    this.list = this.states.map((item) => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter((item) => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    // 搜索--》搜索
    goSearch() {
      this.$router.push({
        path: "/home/search",
      });
    },
    //退出登录
     out() {
      outAPI(localStorage.getItem("Ucookie"));
      localStorage.clear();
      sessionStorage.clear();
      this.$router.push({ path: "/login" });
    },
  },
  created() {
    // 用户信息
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  watch: {},
};
</script>

<style scoped>
.hearderLists {
  /* padding: 5px 0; */
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  padding-left: 45px;
}
.hearderLists div div {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.hearderLists div div:hover {
  background-color: #83b164;
  color: white;
  border-radius: 18px;
}
.headerSearch {
  font-size: 24px;
  font-weight: 500;
  line-height: 40px;
  color: #83b164;
}
.SearchInput {
  padding-left: 15px;
}
.img {
  /* padding-left: 20px; */
  width: 125px;
  height: 10vh;
  padding-top: 5px;
}
a {
  text-decoration: none; /* 去除默认的下划线 */
  outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
  color: #000; /* 去除默认的颜色和点击后变化的颜色 */
}
.choice {
  background-color: #83b164;
  color: white;
  border-radius: 18px;
}

.block {
  display: flex;
  flex-direction: row;
}
.userTxt {
  display: flex;
  width: 75px;
  flex-direction: column;
  font-size: 14px;
  overflow: hidden;
  margin-left: 20px;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.out {
  padding-top: 5px;
  color: #83b164;
}
</style>
