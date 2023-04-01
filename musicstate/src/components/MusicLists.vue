<template>
  <div>
    <el-row class="H_mainTop">
      <el-col :span="4"><div class="grid-content bg-purple">歌曲</div></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple">&nbsp;</div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple-light">歌手/乐队</div></el-col
      >
      <el-col :span="4"><div class="grid-content bg-purple">&nbsp;</div></el-col>
    </el-row>
    <el-row
      @mouseover.native="revel = item.id"
      @mouseout.native="revel = 0"
      :class="revel === item.id ? 'H_mainMusic action' : 'H_mainMusic'"
      v-for="(item,index) in musicInfo"
      :key="item.id"
    >
      <el-col :span="4"
        ><div class="grid-content bg-purple txtClass">{{ item.name }}</div></el-col
      >
      <el-col :span="8"
        ><div class="grid-content bg-purple" style="padding-left: 25px;">{{item.al.name}}</div></el-col
      >
      <el-col :span="4"
        ><div class="grid-content bg-purple-light" >
          <span>&nbsp;</span
          ></div
      ></el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple-light txtClass">{{ item.ar[0].name}}</div></el-col
      >
      <el-col :span="4"><div class="grid-content bg-purple"> <i
              class="el-icon-video-play"
              style="font-size: 28px"
              @click="goMusicPlay(index+1)"
            ></i
          ></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MusicLists",
  props:['musicInfo'],
  data() {
    return {
      revel: 0, //播放按钮控件’
    };
  },
  methods: {
    H_mo(value) {
      console.log(value);
    },

    // 跳转
    goMusicPlay(index) {
      let ids =new Array();
      ids[0]="ID";
      this.musicInfo.forEach(item => {
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
    },
  },
};
</script>

<style scoped>
/* 灰色背景 */

.H_mainTop {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 15px;
}
.H_mainMusic {
  font-size: 16px;
  height: 44px;
  line-height: 22px;
  font-weight: 300;
  padding: 10px 0;
}
.action {
  color: #83b164;
  background-color: white;
}
.txtClass{
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
