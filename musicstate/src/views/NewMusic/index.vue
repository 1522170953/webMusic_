<template>
  <div>
    <el-row>
      <el-col :span="14"
        ><div class="grid-content bg-purple">
          <h3>新歌发行</h3>
          <el-row>
            <el-col
              :span="12"
              class="NewMusic"
              v-for="(list, index) in newMusicView"
              :key="list.id"
              ><div class="grid-content bg-purple">
                <el-row :gutter="20">
                  <el-col :span="6"
                    ><div class="grid-content bg-purple">
                      <el-image
                        style="width: 70px; height: 70px"
                        :src="list.imgUrl"
                        fit="fill"
                      ></el-image></div
                  ></el-col>
                  <el-col :span="12"
                    ><div class="grid-content bg-purple NewMusicBox">
                      <el-row class="NewMusicName" style="margin-left: auto">
                        <p>{{ list.name }}</p> </el-row
                      ><el-row class="NewMusicAuthor">
                        <p>{{ list.author }}</p>
                      </el-row>
                    </div></el-col
                  >
                  <el-col :span="6"
                    ><div class="grid-content bg-purple NewMusicIcon">
                      <i
                        class="el-icon-video-play"
                        @click="goMusicPlay(index,1)"
                      ></i></div
                  ></el-col>
                </el-row></div
            ></el-col>
          </el-row>
          <Paging
            :pageSize="8"
            :ListCount="newMusicLen"
            :pageFn="getPageing"
          ></Paging></div
      ></el-col>
      <el-col :span="10"
        ><div class="grid-content bg-purple-light">
          <h3>每日推荐</h3>
          <el-row>
            <el-col
              :span="24"
              class="NewMusic"
              v-for="(item, index) in recommendMusicView"
              :key="item.id"
              ><div class="grid-content bg-purple" style="margin-right: 5px">
                <el-row :gutter="20">
                  <el-col :span="6"
                    ><div class="grid-content bg-purple">
                      <el-image
                        style="width: 70px; height: 70px"
                        :src="item.al.picUrl"
                        fit="fill"
                      ></el-image></div
                  ></el-col>
                  <el-col :span="12"
                    ><div class="grid-content bg-purple NewMusicBox">
                      <el-row class="NewMusicName" style="margin-left: auto">
                        <p>{{ item.name }}</p> </el-row
                      ><el-row class="NewMusicAuthor">
                        <p>{{ item.ar[0].name }}</p>
                      </el-row>
                    </div></el-col
                  >
                  <el-col :span="6"
                    ><div class="grid-content bg-purple NewMusicIcon">
                      <i
                        class="el-icon-video-play"
                        @click="goMusicPlay(index,2)"
                      ></i></div
                  ></el-col>
                </el-row></div
            ></el-col>
          </el-row>
          <Paging
            :pageSize="4"
            :ListCount="recommendMusicLen"
            :pageFn="getPageing"
          ></Paging></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
// 分页组件
import Paging from "@/components/Paging";

import { gerNewMusicAPI, getRecommendMusicAPI } from "@/api";

export default {
  name: "NewMusic",
  components: {
    Paging,
  },
  data() {
    return {
      url: "https://imgessl.kugou.com/stdmusic/240/20230206/20230206170603106003.jpg",
      newMusicLen: 0, //New音乐长度
      recommendMusicLen: 0, //推荐音乐长度
      newMusic: [], //New音乐
      recommendMusics: [], //recommecdMusic音乐
      newMusicView: [],
      recommendMusicView: [],
    };
  },
  methods: {
    // 更新数据
    getPageing(type, page) {
      if (type == 4) {
        this.recommendMusicView = this.recommendMusics[page - 1];
      } else {
        this.newMusicView = this.newMusic[page - 1];
      }

      return true;
    },
    // 跳转
    goMusicPlay(index,type) {
      console.log(index);
      let ids = [];
      if(type===1){
        this.newMusicView.forEach((item) => {
        ids.push(item.id);
      });
      }else{
        this.recommendMusicView.forEach((item) => {
        ids.push(item.id);
      });
      }
      let routeData = this.$router.resolve({
        path: "/home/play",
        query: {
          musicId: ids,
          index: index,
        },
      });

      window.open(routeData.href, "_blank");
    },
  },
  computed: {},
  async created() {
    //获取新歌数据 start
    const info = await gerNewMusicAPI(0);
    this.newMusicLen = info.data.data.length;
    let sum = 0;
    let arr = [];
    info.data.data.forEach((item, index) => {
      sum++;
      let obj = {};
      obj.id = item.id;
      obj.imgUrl = item.album.blurPicUrl;
      obj.name = item.album.name;
      obj.author = item.album.artists[0].name;
      arr.push(obj);
      if (sum === 8 || index == info.data.data.length - 1) {
        this.newMusic.push(arr);
        sum = 0;
        arr = [];
      }
    });
    this.newMusicView = this.newMusic[0];

    // 获取新歌数据 end

    // 每日推荐 start
    const recommendMusic = await getRecommendMusicAPI(
      localStorage.getItem("Ucookie")
    );
    this.recommendMusicLen = recommendMusic.data.data.dailySongs.length;
    let musci = [];
    let arrState = [];
    let count = 0;
    recommendMusic.data.data.dailySongs.forEach((item, index) => {
      count++;
      arrState.push(item);
      if (
        count === 4 ||
        index == recommendMusic.data.data.dailySongs.length - 1
      ) {
        musci.push(arrState);
        count = 0;
        arrState = [];
      }
    });

    this.recommendMusics = musci;
    this.recommendMusicView = this.recommendMusics[0];

    // 每日推荐 end
  },
};
</script>

<style scoped>
.header_newMusic {
  padding: 0 0;
}
.homep_cm_item_st2_d1 {
  margin-left: 14px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.NewMusicBox {
  padding-top: 15px;
}
.NewMusicName {
  font-size: 18px;
  font-weight: 300;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.NewMusicAuthor {
  font-size: 14px;
  font-weight: 300;
  line-height: 35px;
  color: #b5b5b5;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.NewMusicIcon {
  text-align: center;
  line-height: 60px;
  font-size: 30px;
}

p {
  margin: auto;
}

.NewMusic:hover {
  color: #83b164 !important;
}
</style>
