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
import SongLists from '@/components/SongLists';
import { getSongDetailsAPI,getSongMusicListsAPI } from "@/api/index";
export default {
  name: "MusicDetails",
  components:{
    SongLists
  },
  data() {
    return {
      Sid:this.$route.query.id,
      musicList:[],
      userSongInfo:[],
      listLen:0,
      uCookie:localStorage.getItem('Ucookie'),//cookie
    };
  },
  methods:{
    // 获取用户g歌单
    async getSongInfo(id,cookie) {
      let res =await getSongDetailsAPI(id,cookie);
      console.log("歌单详情:",res);
      this.listLen = res.data.playlist.trackCount;
      this.userSongInfo = res.data.playlist;
      this.getSongMusic(id,30,0,this.uCookie);
    },

    // 获取歌单中的歌曲
    async getSongMusic(sID,limit,offset,cookie) {
      console.log("cookiesss：",cookie);
      const musicLists = await getSongMusicListsAPI(
        sID,
        limit,
        offset,
        cookie
      );
      this.musicList = musicLists.data.songs;
      console.log("musicLists:", musicLists);
    },

    // 页面切换-- 数据跟新
    getPageInfo(e){
        console.log("页面：",e);
        this.getSongMusic(this.Sid,30,e*30-30,this.uCookie)
    }
  },
  created(){
    this.getSongInfo(this.Sid,this.uCookie);
  }
};
</script>

<style scoped>
.Box {
  padding-left: 25px;
  padding-top: 20px;
}
p {
  margin: 0 0;
}
ul {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 0 0;
}
img {
  width: 240px;
  height: 100%;
}
.headerBOx {
  width: 100%;
  height: 240px;
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.headerImg {
  width: 20%;
  padding: 0px 60px 0px 0px;
}
.headerTitle {
  width: 80%;
}
.H_headerTxt {
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.headerAction {
  display: flex;
  flex-direction: row;
  justify-content: start;
  color: #aeadae;
  margin-bottom: 10px;
}
.issueTimer {
  font-size: 12px;
  color: #ccc;
}
.H_btn {
  margin-top: 80px;
}
.H_btn ul li {
  width: 120px;
  height: 40px;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
  margin-right: 10px;
  border: 1px solid #ccc;
}

.H_action {
  color: white;
  background-color: #83b164;
}
.H_back{
    margin-top: 25px;
    background-color: aliceblue;
}
</style>
