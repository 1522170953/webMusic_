<template>
  <div>
    <el-row>
      <el-col :span="4"
        ><div class="grid-content bg-purple">&nbsp;</div></el-col
      >
      <el-col :span="2"
        ><div class="grid-content bg-purple searchTXT">搜索:</div></el-col
      >
      <el-col :span="14"
        ><div class="grid-content bg-purple-light">
          <el-input 
          v-model="input" 
          placeholder="请输入内容"
          @keyup.enter.native="search()"
          ></el-input></div
      ></el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple">&nbsp;</div></el-col
      >
    </el-row>
    <el-row class="main">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="单曲" name="1">
            <MusicLists v-if="activeName=='1'" :musicInfo="searchIfo"></MusicLists>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="100">
          <div v-if="activeName=='100'">
            <Singer v-for="item in searchIfo.result.artists" :key="item.id" :musicInfo="item"></Singer>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="1000">
          <div v-if="activeName=='1000'">
            <SearchSong  :musicInfo="searchIfo.result.playlists"></SearchSong>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="1004">
            <!-- <MusicLists :musicInfo="searchIfo"></MusicLists> -->
            <MvView v-if="activeName=='1004'" :searchIfo="searchIfo"></MvView>
            
        </el-tab-pane>
        <el-tab-pane label="专辑" name="10">
          <div v-if="activeName=='10'">
            <SearchAlbum  :musicInfo="searchIfo.result.albums"></SearchAlbum>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import { searchAPI } from "@/api/index";
// 组件
import MusicLists from '@/components/MusicLists';
import Singer from '@/components/Singer';
import SearchSong from '@/components/SearchSong';
import MvView from '@/components/MvView';
import SearchAlbum from '@/components/SearchAlbum';

export default {
  name: "seachView",
  components:{
    MusicLists,
    MvView,
    Singer,
    SearchSong,
    SearchAlbum
  },
  data() {
    return {
      input: "", //用户输入
      activeName: '1',
      searchIfo:{},//搜索结果
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      let type = tab.name;
      if(type=="1"){
        this.searchAPI(this.input,1)
      }else if(type=="100"){
        this.searchAPI(this.input,100)

      }else if(type=="1000"){
        this.searchAPI(this.input,1000)
      }else if(type=="1004"){
        this.searchAPI(this.input,1004)
      }else{
        this.searchAPI(this.input,10)
      }
    },

    // 搜索
    search(){
        this.searchAPI(this.input,this.activeName)
    },
    // 搜索请求
    async searchAPI(value,type){
        const searchInfo = await searchAPI(value,type);
       
        if(type=="1"){
          this.searchIfo = searchInfo.data.result.songs;
      }else if(type=="100"){
        this.searchIfo = searchInfo.data;

      }else if(type=="1000"){
        this.searchIfo = searchInfo.data;
      }else if(type=="1004"){
        this.searchIfo = searchInfo.data;
      }else{
        this.searchIfo = searchInfo.data;
      }
        console.log("searchInfo:",searchInfo);
    }
  },
  created(){
   
  }
};
</script>

<style scoped>
.searchTXT {
  font-size: 24px;
  line-height: 40px;
  padding-left: 40px;
}
.main {
  margin-top: 20px;
  padding-left: 15px;
}
</style>
