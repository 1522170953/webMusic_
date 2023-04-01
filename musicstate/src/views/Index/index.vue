<template>
    <div>
      <!-- 轮播 -->
      <Carousel></Carousel>
      <!-- 新歌发行 -->
      <NewMusic ></NewMusic>
      <!-- 热门歌单 -->
      <HotSong ></HotSong>
      <!-- 热门歌手 -->
      <HotSinger class="box"></HotSinger>
      <!-- 热门MV -->
      <HotMv></HotMv>
    </div>
  </template>
  
  <script>
  import Carousel from "@/views/Carousel";
  import NewMusic from "@/views/NewMusic";
  import HotSong from "@/views/HotSong";
  import HotSinger from "@/views/HotSinger";
  import HotMv from "@/views/HotMv";

  export default {
    name: "MusicIndex",
    components: {
      Carousel,
      NewMusic,
      HotSong,
      HotSinger,
      HotMv,
    },
    data() {
      return {
      };
    },
    async created(){
      

      

    }
  };
  </script>
  
  <style scoped>
.box{
  margin-top: 55px;
}
</style>
  