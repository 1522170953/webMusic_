<template>
  <div class="Box">
    <SongLists :musicLists="musicList" :userSongInfo="userSongInfo"></SongLists>
    <el-pagination
      :page-size="30"
      :pager-count="11"
      layout="prev, pager, next"
      :total="listLen"
      @current-change="getPageInfo"
    >
    </el-pagination>
  </div>
</template>

<script>
import SongLists from "@/components/SongLists";
// 网络请求

import { getUserSongAPI, getSongMusicListsAPI } from "@/api/index";
export default {
  name: "MyMusic",
  components: {
    SongLists,
  },
  data() {
    return {
      Uid: "", //用户ID
      Mid:"",
      musicList: [], //歌单歌曲
      userSongInfo: {}, //歌单信息
      listLen:0,//歌曲长度
    };
  },
  methods: {
    // 获取用户g歌单
    async getUserSong(uid) {
      const userSongRes = await getUserSongAPI(uid);
      console.log("userSongRes:", userSongRes);
      this.userSongInfo = userSongRes.data.playlist[0];
      this.listLen  = userSongRes.data.playlist[0].trackCount;
      this.Mid = userSongRes.data.playlist[0].id;
      this.getSongMusic(userSongRes.data.playlist[0].id,30,0);
    },

    // 获取歌单中的歌曲
    async getSongMusic(sID,limit,offset) {
      const musicLists = await getSongMusicListsAPI(
        sID,
        limit,
        offset,
        localStorage.getItem("Ucookie")
      );
      this.musicList = musicLists.data.songs;
      console.log("musicLists:", musicLists);
    },

    // 获取用户ID - cookie
    getUserID() {
      const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      const userID = userInfo.userId;
      this.Uid = userID;
      // 传入请求
      this.getUserSong(userID);
    },
    
    // 页面切换-- 数据跟新
    getPageInfo(e){
        console.log("页面：",e);
        this.getSongMusic(this.Mid,30,e*30-30)
    }
  },
  created() {
    this.getUserID();
  },
};
</script>

<style scoped>
.Box {
  padding-left: 25px;
  padding-top: 20px;
}
</style>
