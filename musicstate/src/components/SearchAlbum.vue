<template>
  <div class="albumBox">
    <ul class="ulBox">
      <li
        @mouseover="isAction = item.id"
        @mouseout="isAction = false"
        v-for="item in musicInfo"
        :key="item.id"
        @click="goMusicdetails(item.id)"
      >
        <div class="albumImg">
          <img :src="item.blurPicUrl" :alt="item.id" />
        </div>
        <p
          class="albumName p_H"
          v-bind:class="{ action: isAction === item.id }"
        >
          {{ item.name }}
        </p>
        <p
          class="albumAuthor p_H"
          v-bind:class="{ action: isAction === item.id }"
        >
          {{ item.artists[0].name }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchAlbum",
  props: ["musicInfo"],
  data() {
    return {
      isAction: 0, //选择
    };
  },
  methods: {
    goMusicdetails(id) {
      console.log("id:", id);
      this.$router.push({
        path: "/home/album/musicdetails",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
p {
  margin: 0px 0px;
}
img {
  width: 100%;
  height: 200px;
}
.albumBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.ulBox {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.ulBox li {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 20%;
  margin-bottom: 15px;
}

.albumImg {
  width: 200px;
  height: 200px;
}
.ulBox li p {
  width: 200px;
}
.albumName {
  font-size: 16px;
  padding-bottom: 5px;
  padding-top: 5px;
  color: black;
}
.albumAuthor {
  font-size: 14px;
  color: #c6c0c4;
}
.action {
  color: #83b164;
}
.p_H {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
