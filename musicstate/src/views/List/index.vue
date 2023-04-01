<template>
  <div>
    <el-row >
      <el-col :span="12" v-for="list in Lists" :key="list.id"><div class="grid-content bg-purple box" >
        <h3 class="ListBack">{{list.name}}</h3>
        <Ranking :listId="list.id"></Ranking>
        </div>
    </el-col>
    </el-row>
  </div>
</template>

<script>

// 组件
import Ranking from '@/components/Ranking';

// 网络请求
import {getToplistAPI} from '@/api/index';

export default {
  name: "ListTop",
  components:{
    Ranking
  },
  data() {
    return {
      Lists:[],
    };
  },
  async created(){
    // 获取所有榜单
    const listTopRes = await getToplistAPI();
    this.Lists  = listTopRes.data.list;
    console.log("listTopRes:",listTopRes);
  }
};
</script>

<style scoped>
.box{
  height: 429px;
  padding-left: 30px;
}
.ListBack{
    display: block;
    width: 80%;
    color: white;
    height: 50px;
    border-radius: 5px;
    line-height: 50px;
    padding-left: 10px;
    background-color: #83b164;
}
</style>
