<template>
  <div class="S_SBox">
    <div class="main"  @click="goSinger(musicInfo.id)">
      <div class="S_img">
        <img
          :src="musicInfo.picUrl"
          alt=""
        />
      </div>
      <div class="S_right">
        <span class="S_name"><p>{{musicInfo.name}}</p></span>
        <span class="S_tit"><p>艺人百科</p></span>
        <div class="txt">&nbsp;&nbsp;&nbsp;&nbsp; {{info}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {singerInfoAPI} from '@/api/index';
export default {
  name: "SearchSinger",
  props: ["musicInfo"],
  data() {
    return {
        info:"",
    };
  },
  methods:{
    //获取歌手详细
    async getSingerInfo(id){
        const res = await singerInfoAPI(id);
        console.log("res:",res.data.data.artist.briefDesc);
        this.info= res.data.data.artist.briefDesc;
    },
    goSinger(id){
        this.$router.push({
        path:"/home/singer/singerinfo",
        query:{
          id:id
        }
      })
    }
  },
  mounted(){
    this.getSingerInfo(this.musicInfo.id);
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
p {
  margin: 0 0 10px 0;
}
.main {
  width: 100%;
  height: 200px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: start;
}

.S_img {
  width: 15%;
}
.S_right {
  width: 75%;
  padding-top: 0;
  padding-left: 25px;
}
.S_name {
  width: 95%;
  height: 20px;
  font-size: 18px;
}
.S_tit {
  font-size: 16px;
  font-weight: 700;
}
.txt {
    width: 95%;
    height: 140px;
  font-size: 14px;
  overflow: auto;
  text-overflow: ellipsis;
}
/* 滚动条隐藏 */
.txt::-webkit-scrollbar {display:none}
</style>
