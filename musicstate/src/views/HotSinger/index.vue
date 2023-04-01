<template>
  <el-container>
    <el-header class="HotMusic HotTop">
      <h3>热门歌手</h3>
      <router-link to="/home/singer">
        <a href="" class="more">更多 >>></a>
      </router-link>
    </el-header>
    <el-main class="HotMusic">
      <HotSingerView :songList="songsLists"></HotSingerView>
    </el-main>
  </el-container>
</template>

<script>
import HotSingerView from "@/components/HotSinger";

import { getHotSingerAPI } from "@/api/index";
export default {
  name: "HotSinger",
  components: {
    HotSingerView,
  },
  data() {
    return {
      songsLists: [],
    };
  },
  async created() {
    const getHotSingerRes = await getHotSingerAPI(0, 5);
    this.songsLists = getHotSingerRes.data.artists;
  },
};
</script>

<style scoped>
.HotMusic {
  padding: 0;
  overflow: visible;
}
.HotTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.more {
  margin-right: 15px;
  padding-top: 20px;
  color: #ccc;
}
</style>
