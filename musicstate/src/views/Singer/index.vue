<template>
  <div>
    <AlbumNav :lists="choiceArea"></AlbumNav>
    <AlbumNav :lists="choiceType"></AlbumNav>
    <div class="divide"></div>
    <HotSinger :songList="singerInfos"></HotSinger>
    <el-pagination
            :page-size="30"
            :pager-count="5"
            layout="prev, pager, next"
            :total="150"
            @current-change="fn"
          >
          </el-pagination>
  </div>
</template>

<script>
import AlbumNav from "@/components/AlbumNav";
import HotSinger from "@/components/HotSinger";

// 网络请求
import { getSingerAPI } from "@/api/index";
export default {
  name: "SingerTop",
  components: {
    AlbumNav,
    HotSinger,
  },
  data() {
    return {
      choiceArea: [
        { name: "全部", type: "-10" },
        { name: "华语", type: "7" },
        { name: "欧美", type: "96" },
        { name: "日本", type: "8" },
        { name: "韩国", type: "16" },
        { name: "其他", type: "0" },
      ],

      choiceType: [
        { name: "全部", type: "-11" },
        { name: "男歌手", type: "1" },
        { name: "女歌手", type: "2" },
        { name: "乐队", type: "3" },
      ],
      actions:["-1","-1"],//分类关键字
      singerInfos:[],//歌手信息
    };
  },
  methods: {
    // 网络请求
    async getSingerInfo(type, area,offset) {
      const singerInfo = await getSingerAPI(type, area,offset);
      this.singerInfos = singerInfo.data.artists;
      console.log("singerInfo:", singerInfo);
    },

    // 切页
    fn(e){
      this.getSingerInfo(this.actions[0],this.actions[1],e*30-30);
    }
  },
  watch:{ 

  },
  mounted() {
    this.$bus.$on("type", (data) => {
      console.log("事件总线传的type:", data);
      if(data.type==="7" || data.type==="96" ||data.type==="8"  || data.type==="16" || data.type==="0"){
        this.actions[1]=data.type
      }else if(data.type==="1" || data.type==="2" ||data.type==="3"){
        this.actions[0]=data.type
      }else if(data.type==="-10"){
        this.actions[1]="-1";
      }else if(data.type==="-11"){
        this.actions[0]="-1";

      }
      this.getSingerInfo(this.actions[0],this.actions[1],0);
    });
  },
  async created() {
    this.getSingerInfo("-1","-1",0);
  },
};
</script>

<style scoped>
.divide {
  width: 100%;
  height: 25px;
}
</style>
