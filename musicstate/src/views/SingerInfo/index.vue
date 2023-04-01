<template>
  <div class="SingBOx">
    <div class="top">
      <div class="singerImg">
        <img :src="S_info.cover" :alt="S_info.name" />
      </div>
      <div class="singerInfo">
        <div class="singerName">
          <span class="C_name">{{ S_info.name }}</span>
          <span class="N_name" v-if="S_info.alias">{{ S_info.alias[0] }}</span>
        </div>
        <div class="fans">
          <span
            >{{
              Math.floor(S_fansCoumt / 10000) >= 1
                ? `${Math.floor(S_fansCoumt / 10000)}万`
                : S_fansCoumt
            }}粉丝</span
          >
        </div>
        <div class="info">
          <span class="title">艺人百科</span>
          <p class="txt">{{ S_info.briefDesc }}</p>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="singerMusic">
        <h4>歌曲</h4>
        <MusicLists :musicInfo="S_musincs"></MusicLists>
      </div>
      <div class="singerSong">
        <h4>专辑</h4>
        <div class="SongMatter">
          <ul>
            <li
              v-for="(lis) in s_songs"
              :key="lis.id"
              @click="goSongMusci(lis.id)"
            >
              <div class="SongImg">
                <img :src="lis.blurPicUrl" :alt="lis.name" />
              </div>
              <p class="title">{{ lis.name }}</p>
              <p class="author">{{ lis.artist.name }}</p>
            </li>
          </ul>
          <el-pagination
            :page-size="30"
            :pager-count="5"
            layout="prev, pager, next"
            :total="Count"
            @current-change="fn"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MusicLists from "@/components/MusicLists";

// 网络请求
import {
  singerInfoAPI,
  singerSongAPI,
  singerMusicAPI,
  singerCountAPI,
} from "@/api/index";

export default {
  name: "SingerInfo",
  components: { MusicLists },
  data() {
    return {
      Sid: this.$route.query.id, //歌手id
      S_info: {}, //歌手信息
      S_fansCoumt: 0,
      S_musincs: {}, //歌手单曲
      s_songs: {}, //歌手专辑
      Count: 0, //专辑总数
    };
  },
  methods: {
    // 获取歌手详情 -- 粉丝
    async getSingerInfo(id) {
      const singerRes = await singerInfoAPI(id);
      const singerSum = await singerCountAPI(id);
      this.S_info = singerRes.data.data.artist;
      this.S_fansCoumt = singerSum.data.data.fansCnt;
      console.log("singerRes:", singerRes);
      console.log("singerSum:", singerSum);
    },

    // 获取歌手单曲
    async getSingMusic(id) {
      const MusicRes = await singerMusicAPI(id);
      this.S_musincs = MusicRes.data.hotSongs;
      console.log("MusicRes:", MusicRes);
    },

    //获取歌手专辑
    async getSingSong(id, limit, offset) {
      const songRes = await singerSongAPI(id, limit, offset);
      this.Count = songRes.data.artist.albumSize;
      this.s_songs = songRes.data.hotAlbums;
      console.log("songRes:", songRes);
    },
    // 跳转
    goSongMusci(id) {
      console.log("id:", id);
      this.$router.push({
        path: "/home/album/musicdetails",
        query: {
          id: id,
        },
      });
    },

    //切页
    fn(e) {
      this.getSingSong(this.Sid, 30, e * 30 - 30);
    },
  },
  created() {
    this.getSingerInfo(this.Sid);
    this.getSingMusic(this.Sid);
    this.getSingSong(this.Sid, 30, 0);
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 260px;
}
.SingBOx {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.top {
  width: 100%;
  display: flex;
  padding: 15px;
  flex-direction: row;
  justify-content: start;
}
.main {
  width: 100%;
  padding: 15px;
}
.singerImg {
  width: 25%;
}
.singerInfo {
  width: 75%;
  padding-left: 25px;
}

.singerName {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.C_name {
  font-size: 34px;
}
.N_name {
  padding-top: 5px;
  padding-left: 10px;
  color: #ccc;
  font-size: 24px;
}
.fans {
  padding-top: 5px;
  font-size: 18px;
}
.info {
  width: 90%;
  padding-top: 20px;
}

.title {
  font-size: 16px;
}

.txt {
  font-size: 14px;
}

.singerMusic {
  width: 100%;
}
.singerSong {
  width: 100%;
}

.SongMatter {
  width: 100%;
}
.SongMatter ul {
  display: flex;
  flex-direction: row;
  padding: 0 0;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
}

.SongMatter ul li {
  width: 18%;
  padding: 10px 10px 10px 0;
}
.SongMatter ul li:hover {
  color: #83b164;
}
.SongImg {
  margin-bottom: 10px;
}
.title {
  font-size: 14px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-bottom: 5px;
}
.author {
  font-size: 13px;
  color: #ccc;
}
.sum {
  font-size: 12px;
  color: #dad8d9;
}
</style>
