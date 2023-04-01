<template>
  <div class="Box">
    <!-- <video width="100%" height="100%" controls autoplay > -->
      <!-- <source :src="mvUrl" type="video/mp4" /> -->
    <!-- </video> -->
    <video :src="mvUrl" width="90%" controls height="60%" type="video/mp4" autoplay></video>
    
  </div>
</template>

<script>
import {getMvInfoAPI,getMvUrlAPI} from '@/api/index';
export default {
  name: "PlayMv",
  data() {
    return {
        MId:this.$route.query.MvId,//mvID
        mvUrl:'',//mv地址
    }
  },
  methods:{
    // get MvInfo
    async getMvInfo(id){
        const mvInfo = await getMvInfoAPI(id);
        console.log("mvInfo:",mvInfo);
    },
    // 获取mv地址
    async getMvArea(id){
        const mvArea = await getMvUrlAPI(id,1080);
        this.mvUrl = mvArea.data.data.url
        console.log("mvArea:",mvArea);
    }
  },
  created(){
    this.getMvArea(this.MId);
  }
};
</script>

<style scoped>
.Box {
  padding: 15px 0 0 105px;
}
</style>
