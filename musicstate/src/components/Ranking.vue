<template>
  <el-container>
    <el-header class="listHeader">
      <el-row>
        <el-col :span="8"
          ><div class="grid-content bg-purple">歌曲</div></el-col
        >
        <el-col :span="8"
          ><div class="grid-content bg-purple-light">歌手</div></el-col
        >
      </el-row>
    </el-header>
    <el-main>
      <el-row
        class="ListBox"
        v-for="(list, index) in listInfo"
        :key="list.id"
        :musicID="list.id"
      >
        <el-col :span="1"
          ><div class="grid-content bg-purple">
            <div
              :class="
                listTop + index + 1 === 1
                  ? 'rank rank1'
                  : listTop + index + 1 === 2
                  ? 'rank rank2'
                  : listTop + index + 1 === 3
                  ? 'rank rank3'
                  : 'rank'
              "
            >
              {{ listTop + index + 1 }}
            </div>
          </div></el-col
        >
        <el-col :span="8" class="H_name"
          >{{ list.name }}
          <div class="grid-content bg-purple-light"></div
        ></el-col>
        <el-col :span="8"
          ><div class="grid-content bg-purple H_name">
            {{ list.ar[0].name }}
          </div></el-col
        >
        <el-col :span="3"
          ><div class="grid-content bg-purple">
            <i class="el-icon-video-play btn_list" @click="goMusicPlay(index)"></i></div
        ></el-col>
      </el-row>
    </el-main>
    <el-pagination
      :page-size="8"
      :pager-count="9"
      layout="prev, pager, next"
      :total="listPage"
      @prev-click="prevClick"
      @next-click="nextClick"
      @current-change="currentChange"
    >
    </el-pagination>
  </el-container>
</template>

<script>
import { getSongDetailsAPI, getSongMusicListsAPI } from "@/api/index";

export default {
  name: "RankingList",
  props: ["listId"],
  data() {
    return {
      listInfo: [], //歌曲信息
      listPage: 0, //数据量
      listTop: 0,
    };
  },
  methods: {
    // 上一页
    prevClick() {
      alert("asda");
      console.log("上一页");
    },
    // 下一页
    nextClick() {
      console.log("下一页");
    },
    // 当页码发生变化
    currentChange(e) {

      this.getMusciInfo(this.listId, 8, e * 8 - 8);
    },
    // 请求
    async getMusciInfo(id, limit, offset) {
      const listsRes = await getSongMusicListsAPI(id, limit, offset);
      this.listInfo = listsRes.data.songs;
      this.listTop = offset;

    },

     // 跳转
     goMusicPlay(index){
      let ids = [];
      this.listInfo.forEach(item => {
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
  },
  async created() {
    this.getMusciInfo(this.listId, 8, 0);

    // 获取长度
    const lesiage = await getSongDetailsAPI(this.listId);
    this.listPage = lesiage.data.privileges.length;
  },
};
</script>

<style scoped>
/* 排行外围 */
.ListBox {
  margin-bottom: 10px;
  line-height: 19px;
}
.ListBox:hover {
  color: #83b164;
}
.listHeader {
  height: auto !important;
  padding-left: 50px;
}
.rank {
  width: 100%;
  /* height: 100%; */
  color: #ccc;
  font-size: 16px;
  font-weight: 600;
}
.rank1 {
  color: #e53d55 !important;
}
.rank2 {
  color: #ff8400 !important;
}

.rank3 {
  color: #eac910 !important;
}
.btn_list {
  font-size: 20px;
}
.H_name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
