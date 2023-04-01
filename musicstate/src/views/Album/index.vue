<template>
  <div>
    <AlbumNav :lists="list"></AlbumNav>
    <!-- main -->
    <div class="albumBox">
      <ul class="ulBox">
        <li
          @mouseover="isAction = item.albumId"
          @mouseout="isAction = false"
          v-for="item in items"
          :key="item.albumId"
          @click="goMusicdetails(item.albumId)"
        >
            <div class="albumImg">
              <img
                :src="item.coverUrl"
                :alt="item.artistName"
              />
            </div>
            <p class="albumName p_H" v-bind:class="{ action: isAction === item.albumId }">
              {{item.albumName}}
            </p>
            <p class="albumAuthor p_H" v-bind:class="{ action: isAction === item.albumId }">
              {{item.artistName}}
            </p>
        </li>
      </ul>
      <el-pagination
            :page-size="30"
            :pager-count="5"
            layout="prev, pager, next"
            :total="150"
            @current-change="fn"
          >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import AlbumNav from "@/components/AlbumNav";

// 网络请求
import {getSongsAPI} from '@/api/index';
export default {
  name: "AibumTop",
  components: {
    AlbumNav,
  },
  data() {
    return {
      list:[
        {name:"华语",type:"Z_H"},  
        {name:"欧美",type:"E_A"},  
        {name:"韩国",type:"KR"},  
        {name:"日本",type:"JP"},  
      ],
      isAction: 0, //选择
      items: [],
      type:"",
    };
  },
  methods:{

    async getSongLists(area,offset){
      const songLists = await getSongsAPI(area,offset);
      this.items=songLists.data.albumProducts
      console.log("songLists:",songLists);

    },


    fn(e){
      this.getSongLists(this.type,e*30-30)
    },

    // 跳转
    goMusicdetails(id){
      console.log("id:",id);
      this.$router.push({
        path:"/home/album/musicdetails",
        query:{
          id:id
        }
      })
    }
  },
  mounted(){
    this.$bus.$on('type',(data)=>{
      this.type = data.type;
      this.getSongLists(data.type,0)
    })
  },
  async created(){
    this.getSongLists("Z_H",0)
  }
};
</script>

<style scoped>
p {
  margin: 0px 0px;
}
img {
  width: 100%;
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
.p_H{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
