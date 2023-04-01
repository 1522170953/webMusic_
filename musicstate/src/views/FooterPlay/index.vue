<template>
  <div class="PlayBox">
    <div class="PlayBtn">
      <el-button icon="el-icon-arrow-left" circle></el-button>
      <el-button icon="el-icon-video-pause" circle></el-button>
      <el-button icon="el-icon-arrow-right" circle></el-button>
    </div>
    <div class="PlayImg">
      <el-image
        style="width: 60px; height: 60px"
        :src="url"
        fit="fill"
      ></el-image>
    </div>
    <div class="PlayTimer">
      <div class="TxtTimer">
        <div class="PlayTxt">
          <p>歌名</p>
        </div>
        <div class="timer"><p>02:52/03:29</p></div>
      </div>
      <div class="PlayProgress">
        <el-progress
          :text-inside="true"
          :show-text="false"
          :stroke-width="5"
          :percentage="80"
          color="#f4f4f4"
          define-back-color="#8fdb8a"
          status="success"
        ></el-progress>
      </div>
    </div>
    <div class="PlayCollect">
      <i class="el-icon-star-off"></i>
      <!-- el-icon-star-on 收藏 -->
      <!-- el-icon-star-off 未收藏 -->
    </div>
    <audio
      ref="audio"
      preload="true"
      :src="`https://music.163.com/song/media/outer/url?id=${PlayMusicID}.mp3`"
    ></audio>
  </div>
</template>

<script>
export default {
  name: "FooterPlay",
  data() {
    return {
      url: "https://y.qq.com/music/photo_new/T015R640x360M101003swc4k2ypR1k.jpg?max_age=2592000",
      PlayMusicID:"",
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },

    showLyric() {
      // 监听播放audio进度, 切换歌词显示
      this.$refs.audio.addEventListener('timeupdate', () => {
        // let curTime = Math.floor(this.$refs.audio.currentTime)
        // 避免空白出现
        // if (this.lyric[curTime]) {
        //   this.curLyric = this.lyric[curTime]
        //   this.lastLy = this.curLyric
        // } else {
        //   this.curLyric = this.lastLy
        // }
      })
    }
  },
  mounted(){
    this.$bus.$on("playMusicID",(data)=>{
      this.PlayMusicID = data
      console.log("播放组件收到全局事件总线data:",data);
    })
  }
};

</script>

<style scoped>
.PlayBox {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  background-color: #83b164;
  margin-bottom: 0px;
  z-index: 99999;
}
.PlayBtn {
  width: 15%;
  padding: 20px;
}
.PlayBtn button {
  margin-left: 20px;
}
.PlayImg {
  width: 8%;
  margin: auto;
  text-align: center;
  margin: auto 0;
}
.PlayTimer {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.TxtTimer {
  height: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.PlayTxt {
  /* margin-left: px; */
  font-size: 16px;
}
.timer {
  padding: 10px;
  font-size: 12px;
  margin-right: 10px;
}
.PlayProgress {
  padding-top: 10px;
  height: 60%;
}
.PlayCollect {
  width: 10%;
  font-size: 24px;
  color: white;
  margin-left: 50px;
  padding-top: 25px;
}
</style>
