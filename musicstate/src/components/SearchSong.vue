<template>
  <div class="SongMatter">
    <ul>
      <li v-for="lis in musicInfo" :key="lis.id" @click="goSongMusci(lis.id)">
        <div class="SongImg">
          <img :src="lis.coverImgUrl" :alt="lis.name" />
        </div>
        <p class="title">{{ lis.name }}</p>
        <p class="author">{{ lis.creator.nickname }}</p>
        <span class="sum">播放量：{{ parseInt(lis.playCount / 10000) }}万</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchSong",
  props: ["musicInfo"],
  data() {
    return {};
  },
  methods: {
    goSongMusci(id) {
      console.log("id:", id);
      this.$router.push({
        path: "/home/songs/musicdetails",
        query: {
          id: id,
        },
      });
    },
  },
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
