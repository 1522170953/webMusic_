<template>
  <div>
    <ul class="box">
      <li class="lis" v-for="list in songList" :key="list.id" @click="goSingerInfo(list.id)">
        <div class="img_box">
          <img
            :src="list.picUrl"
            :alt="list.name"
          />
        </div>
        <p>{{list.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HotSinger",
  props:['songList'],
  data() {
    return {};
  },
  methods:{
    // 跳转到歌手信息
    goSingerInfo(id){
      this.$router.push({
        path:"/home/singer/singerinfo",
        query:{
          id:id
        }
      })
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}
img {
  width: 100%;
  height: 100%;
}
ul li {
  width: 20%;
  display: inline-block;
}
.box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.lis {
  text-align: center;
  font-size: 16px;
}
.img_box {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
}
</style>
