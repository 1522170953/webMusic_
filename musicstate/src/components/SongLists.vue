<template>
    <div>
      <el-container v-if="userSongInfo.creator">
        <el-header style="height: auto">
          <div class="headerBOx">
            <div class="headerImg">
              <img
                :src="userSongInfo.coverImgUrl"
                alt=""
              />
            </div>
            <div class="headerTitle">
              <p class="H_headerTxt">{{userSongInfo.name}}</p>
              <div class="headerAction">
                <i class="el-icon-user"></i>&nbsp;&nbsp;
                <p>{{userSongInfo.creator.nickname}}</p>
              </div>
              <p class="issueTimer">发行时间：2022-12-23</p>
              <div class="H_btn">
                <ul>
                  <li class="H_action" @click="playAll">
                    <i class="el-icon-video-play"></i>播放全部
                  </li>
                  <li><i class="el-icon-chat-dot-square"></i>评论</li>
                </ul>
              </div>
            </div>
          </div>
        </el-header>
        <el-main class="H_back">
          <MusicLists :musicInfo="musicLists"></MusicLists>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script>
  import MusicLists from '@/components/MusicLists';
  export default {
    name: "SongLists",
    props:['musicLists',"userSongInfo"],
    components:{
      MusicLists
    },
    data() {
      return {
        musicListID:[],//歌单音乐列ID
      };
    },
    methods:{
      // 播放全部
      playAll(){
        this.musicLists.forEach(item => {
          this.musicListID.push(item.id)
        });
        this.goPlay(0);
      },

      // 跳转
      goPlay(index){
        let ids = [];
        this.musicLists.forEach(item => {
          ids.push(item.id)
        });
        let routeData =  this.$router.resolve({
        path:"/home/play",
        query:{
          musicId:ids,
          index:index
        }
      });

      window.open(routeData.href,'_blank')
      }
    }
  };
  </script>
  
  <style scoped>
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
  