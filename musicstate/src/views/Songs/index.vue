<template>
  <div>
    <el-container>
      <el-header class="SongsBox">
        <AlbumNav :lists="list"></AlbumNav>
      </el-header>
      <el-main class="songMain">
        <div class="songTitle">
          <h3>{{title}}歌单</h3>
        </div>
        <div class="SongMatter">
          <ul>
            <li v-for="lis in sums" :key="lis.id"  @click="goSongMusci(lis.id)">
                <div class="SongImg">
                  <img
                    :src="lis.coverImgUrl"
                    :alt="lis.name"
                  />
                </div>
                <p class="title">{{lis.name}}</p>
                <p class="author">{{lis.creator.nickname}}</p>
                <span class="sum">播放量：{{parseInt(lis.playCount / 10000)}}万</span>
            </li>
          </ul>
          <el-pagination
            :page-size="30"
            :pager-count="5"
            layout="prev, pager, next"
            :total="150"
            @current-change="fn"
          >
          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AlbumNav from "@/components/AlbumNav";

// 网络请求
import {getMusicListsAPI} from '@/api/index';
export default {
  name: "SongsTop",
  components: {
    AlbumNav,
  },
  data() {
    return {
      list: [
        {name:"推荐",type:"0"},
        {name:"摇滚",type:"1"},
        {name:"华语",type:"2"},
        {name:"综艺",type:"3"},
        {name:"轻音乐",type:"4"},
        {name:"民谣",type:"5"},
        {name:"电子",type:"6"},
        {name:"另类",type:"7"},
        {name:"ACG",type:"8"},
        {name:"流行",type:"9"},
      ],
      title:"推荐",
      sums: [],
    };
  },
  methods:{
    goSongMusci(id){
      console.log("id:",id);
      this.$router.push({
        path:"/home/songs/musicdetails",
        query:{
          id:id
        }
      })
    },
    
    async getMusicLists(type){
      const info = await getMusicListsAPI(type);
      this.sums = info.data.playlists
      console.log(info);
    }
  },
  mounted(){
    this.$bus.$on('type',(data)=>{
      this.getMusicLists(data.name);
      this.title=data.name
    })
  },
  created(){
    this.getMusicLists("推荐")
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
h3,
ul,
p {
  margin: auto !important;
}
.SongsBox {
  padding: 0 0;
}
.songMain {
  padding: 20px 0 0 40px;
}
.songTitle {
  width: 100%;
}
.songTitle > h3 {
  font-weight: 400;
  font-size: 24px;
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
