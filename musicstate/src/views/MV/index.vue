<template>
  <div>
    <el-container>
      <el-header style="height: auto">
        <AlbumNav :lists="listArea"></AlbumNav>
        <AlbumNav :lists="listOrder"></AlbumNav>
        <AlbumNav :lists="listType"></AlbumNav>
      </el-header>
      <el-main class="box">
        <ul class="mvUl" >
          <li v-for="item in MvLists" :key="item.id" @click="goPlayMv(item.id)">
            <div class="mvMain">
              <div class="mvImg">
                <div class="back"><i class="el-icon-video-play"></i></div>
                <img
                  :src="item.cover"
                  :alt="item.name"
                />
              </div>
              <div>
                <div class="mvName"><span>{{ item.name }}</span></div>
                <div class="author"><span>作者:{{item.artistName}}</span></div>
                <div class="playCount"><span>播放量:{{Math.floor(item.playCount/10000)<1 ? item.playCount : `${Math.floor(item.playCount/10000)}万`}}</span></div>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination
            :page-size="30"
            layout="prev, pager, next"
            :total="ListLen"
            @current-change="pageChange"
            >
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import AlbumNav from "@/components/AlbumNav";
// 网络请求
import {getMvAllAPI} from '@/api/index';
export default {
  name: "MvTop",
  components: {
    AlbumNav,
  },
  data() {
    return {
      listArea: [
        { name: "地区", type: "A_1" },
        { name: "内地", type: "A_2" },
        { name: "港台", type: "A_3" },
        { name: "欧美", type: "A_4" },
        { name: "日本", type: "A_5" },
        { name: "韩国", type: "A_6" },
      ],
      listOrder: [
        {
          name: "排序",
          type: "B_1",
        },
        {
          name: "最快",
          type: "B_2",
        },
        {
          name: "最热",
          type: "B_3",
        },
        {
          name: "最新",
          type: "B_4",
        },
      ],
      listType: [
        { name: "类型", type: "C_1" },
        { name: "官方版", type: "C_2" },
        { name: "原生", type: "C_3" },
        { name: "现场版", type: "C_4" },
        { name: "网易出品", type: "C_5" },
      ],
    //   
    area:"全部",//地区
    order:'最新',//排序方式
    type:'全部',//类型
    ListLen:0,//Mv集合长度
    MvLists:[],//mv集合
    };
  },
  mounted(){
    this.$bus.$on("type",(data)=>{
        if(data.type.indexOf("A") != -1){
            this.area=data.name=="地区" ? "全部" :data.name;
        }else if(data.type.indexOf("B") != -1){
            this.order=data.name=="排序" ? "最新" : data.name;
        }else if(data.type.indexOf("C") != -1){
            this.type=data.name== "类型" ? "全部" :data.name;
        }else{
            alert("参数出错！")
        }
        this.getMvs(this.area,this.type,this.order,32,0);
    })
  },
  methods:{
    // 获取全部Mv
    async getMvs(area,type,order,limit,offset){
        const mvRes = await getMvAllAPI(area,type,order,limit,offset);
        this.MvLists = mvRes.data.data;
        if(offset===0) this.ListLen = mvRes.data.count;
        console.log("gerMvs():",mvRes);
    },

    // 页面切换
    pageChange(e){
        console.log(e);
        this.getMvs(this.area,this.type,this.order,32,e*30-30);
    },
    // 页面跳转
    goPlayMv(id){
        let routeData =  this.$router.resolve({
        path:"/home/playmv",
        query:{
          MvId:id,
        }
      });

      window.open(routeData.href,'_blank')
    }
  },
  created(){
    this.getMvs(this.area,this.type,this.order,32,0);
  }
};
</script>

<style scoped>
img {
  width: 90%;
  height: 224px !important;
}
.box {
  overflow: hidden;
}
/* 前置背景 */
.mvUl {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 0 20px;
}

.mvUl li {
  position: relative;
  width: 25%;
  margin-bottom: 10px;
}

.back {
  width: 90%;
  height: 100%;
  text-align: center;
  line-height: 220px;
  position: absolute;
  font-size: 52px;
  color: aliceblue;
  background-color: black;
  opacity: 0;
}
.back:hover {
  opacity: 0.3;
}
.mvName {
    width: 276px;
  font-size: 18px;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.author {
  font-size: 16px;
  color: #6e6e6e;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.playCount {
  font-size: 14px;
  color: #ccc;
  overflow: hidden;
  word-break: break-all;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
