<template>
  <div>
    <el-container>
      <el-header class="HotMusic">
        <h3>热门MV</h3>
        <router-link to="/home/mv">
        <a href="" class="more">更多 >>></a>
        </router-link>
      </el-header>
      <el-main>
        <template>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(lists,index) in mvItemList" :key="index">
              <ul class="MVLists">
                <li v-for="list in lists" :key="list.id" @click="goPlayMv(list.id)">
                  <div class="ListBox">
                    <a href="">
                      <img
                        :src="list.cover"
                        :alt="list.name"
                      />
                    </a>
                    <h3>{{list.name}}</h3>
                    <p>{{list.artistName}}</p>
                    <div>
                      <span>{{list.playCount}}</span>
                    </div>
                  </div>
                </li>
               
              </ul>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import {getRecMvAPI} from '@/api/index';
export default {
  name: "HotMv",
  data() {
    return {
      mvLists:[],//未处理（MV）
      mvItemList:[],//处理后
    };
  },
  methods:{
    /**
     * 
     * @param {*} arr 分割数组
     * @param {*} splitLen  分割长度
     */
      arrSplit(arr,splitLen){
        let index = 0;
        let newArr = [];
        while(index<arr.length){
          newArr.push(arr.slice(index,index += splitLen))
        }

        return newArr;
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
  async created(){
      const newMvRes = await getRecMvAPI(16);
      this.mvLists = newMvRes.data.data;

     this.mvItemList =  this.arrSplit(this.mvLists,4);

      console.log("newMvRes:",newMvRes);
  }
};
</script>

<style scoped>
p,h3{
  margin: 0 0;
}
li {
  list-style: none;
}
.HotMusic {
  padding: 0;
  overflow: visible;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.more {
  margin-right: 15px;
  padding-top: 20px;
  color: #ccc;
}
.MVLists {
    padding-left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.MVLists li {
  text-align: center;
  width: 25%;
}
img {
  width: 90%;
  height: 155px;
}
</style>
