<template>
  <div>
    <el-container>
      <el-header class="HotMusic">
        <h3>热门歌单</h3>
        <router-link to="/home/songs">
          <a href="" class="more">更多 >>></a>
        </router-link>
      </el-header>
      <el-main class="HotMusic" v-if="songs[0] && songLists[0]">
        <el-row :gutter="16">
          <el-col :span="8">
              <div class="grid-content bg-purple" @click="goSongMusci(songs[0].id)">
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                      <el-image
                        style="width: 100%; height: 100%; border-radius: 8px"
                        :src="songs[0].coverImgUrl || ' '"
                        fit="fill"
                      ></el-image>
                      <p style="margin: 0">{{ songs[0].name }}</p>
                    </div></el-col
                  >
                </el-row>
              </div>
          </el-col>
          <el-col :span="16" class="nowarp"
            ><div class="grid-content bg-purple-light">
              <el-row :gutter="18" style="width: 100%;" class="nowarp">
                <el-col :span="6" v-for="item in songLists" :key="item.id">
                  <!-- <router-link to="/home/songs/musicdetails"> -->
                    <div class="grid-content bg-purple" @click="goSongMusci(item.id)">
                      <el-image
                        style="width: 95%; height: 95%; border-radius: 8px"
                        :src="item.coverImgUrl"
                        fit="fill"
                      ></el-image>
                      <p style="margin: 0" class="txt_P">{{ item.name }}</p>
                    </div>
                  <!-- </router-link> -->
                </el-col>
              </el-row>
            </div></el-col
          >
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// 请求
import { getHotSongAPI } from "@/api/index";

export default {
  name: "HotSong",
  data() {
    return {
      songs: [], //歌单lists
      songLists: [],
    };
  },
  methods:{
    goSongMusci(id){
      this.$router.push({
        path:"/home/songs/musicdetails",
        query:{
          id:id
        }
      })
    }
  },
  async created() {
    const hotSong = await getHotSongAPI();
    this.songs = hotSong.data.playlists;
    hotSong.data.playlists.forEach((item, index) => {
      if (index != 0) {
        this.songLists.push(item);
      }
    });
    console.log("hotSong:", hotSong);
  },
};
</script>

<style scoped>
.HotMusic {
  padding: 0;
  width: 100%;
  height: 434px;
  overflow: visible;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.txt_P {
  font-size: 14px;
  width: 180px;
  margin-bottom: 10px !important;
  padding: 0 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.nowarp {
  white-space: nowrap;
  padding: 0 0;
}
.layout {
  margin-top: 18px;
}
.more {
  margin-right: 15px;
  padding-top: 20px;
  color: #ccc;
}
</style>
