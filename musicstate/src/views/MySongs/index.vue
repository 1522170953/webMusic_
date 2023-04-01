<template>
  <div class="Box">
    <el-row class="Header_top">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="header_title"><span>创建的歌单</span></div>
          <div class="main" v-for="item in uFoundSong" :key="item.id" @click="goSongList(item.id)">
            <div class="img">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="right_txt">
              <div class="songTitle">
                <span>{{ item.name }}</span>
              </div>
              <div class="songAuthor">
                <span>作者: {{ item.creator.nickname }}</span>
              </div>
              <div class="songCount">
                <span>{{ item.trackCount }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"
        ><div class="grid-content bg-purple-dark">
          <div class="header_title"><span>收藏的歌单</span></div>
          <div class="main" v-for="item in restSongs" :key="item.id" @click="goSongList(item.id)">
            <div class="img">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="right_txt">
              <div class="songTitle">
                <span>{{ item.name }}</span>
              </div>
              <div class="songAuthor">
                <span>作者: {{ item.creator.nickname }}</span>
              </div>
              <div class="songCount">
                <span>{{ item.trackCount }}</span>
              </div>
            </div>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import { getUserSongAPI } from "@/api/index";
export default {
  name: "MySongs",
  data() {
    return {
      uId: JSON.parse(localStorage.getItem("userInfo")).userId, //用户ID
      uFoundSong: [], //用户创建的歌单
      restSongs: [], //用户收藏的歌单
    };
  },
  methods: {
    async getUserSongs(id) {
      const songLis = await getUserSongAPI(id);
      console.log("songLis:", songLis);
      songLis.data.playlist.forEach((item) => {
        if (item.userId === this.uId) {
          this.uFoundSong.push(item);
        } else {
          this.restSongs.push(item);
        }
      });
    },

    // 点击跳转
    goSongList(id){
        this.$router.push({
            path:"/home/songs/musicdetails",
            query:{
                id:id
            }
        })
    }
  },
  created() {
    this.getUserSongs(this.uId);
  },
};
</script>

<style scoped>
p {
  margin: 0 0;
}
img {
  width: 100%;
}
.Box {
  padding-left: 25px;
  padding-top: 15px;
}
.Header_top {
  margin-bottom: 15px;
}
.header_title {
  font-size: 24px;
  color: #ccc;
}
.main {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.img {
  width: 10%;
  /* height: 120px; */
}
.right_txt {
  padding-left: 15px;
  position: relative;
}
.songTitle {
  position: absolute;
  top: 0;
  font-size: 18px;
  width: 250px;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songAuthor {
  position: absolute;
  width: 160px;
  top: 25px;
  font-size: 16px;
  color: #848484;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.songCount {
  position: absolute;
  font-size: 14px;
  color: #ccc;
  top: 100px;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main:hover {
  background-color: #e0f8f7;
}
</style>
