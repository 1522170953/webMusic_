<template>
  <div class="back">
    <el-row class="boxPlay" v-if="musicInfo.al">
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <div class="imgBox">
            <img :src="musicInfo.al.picUrl" :alt="musicInfo.name" />
          </div></div
      ></el-col>
      <el-col :span="16" v-if="musicInfo.name"
        ><div class="grid-content bg-purple-light">
          <div class="MusicName">
            <p>{{ musicInfo.name || " " }}</p>
          </div>
          <div class="singer">
            <span>歌手: {{ musicInfo.ar[0].name || " " }}</span>
          </div>
          <div class="lyrics">
            <ul class="lyric" v-show="lyric" ref="lyric">
              <li
                :class="{ each: true, choose: index == lyricIndex }"
                v-for="(item, key, index) in lyric"
                :key="key"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div></el-col
      >
      <div class="PlayBox">
        <div class="PlayBtn">
          <el-button
            icon="el-icon-arrow-left"
            style="font-size: 20px"
            circle
            @click="previous"
          ></el-button>
          <el-button
            :icon="
              playState === true ? 'el-icon-video-pause' : 'el-icon-video-play'
            "
            style="font-size: 20px"
            circle
            @click="audioStart()"
          ></el-button>
          <el-button
            icon="el-icon-arrow-right"
            style="font-size: 20px"
            circle
            @click="next"
          ></el-button>
        </div>
        <div class="PlayImg">
          <el-image
            style="width: 60px; height: 60px"
            :src="musicInfo.al.picUrl"
            fit="fill"
          ></el-image>
        </div>
        <div class="PlayTimer">
          <div class="TxtTimer">
            <div class="PlayTxt">
              <p>{{ musicInfo.name }}</p>
            </div>
            <div class="timer">
              <p>{{ timerIn }} /{{ timer }}</p>
            </div>
          </div>
          <div class="PlayProgress">
            <el-progress
              :text-inside="true"
              :show-text="false"
              :stroke-width="5"
              :percentage="plan"
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
      </div>
    </el-row>
    <audio ref="audio" preload="true" autoplay :src="musicUrl"></audio>
  </div>
</template>

<script>
// 网络请求
import { getMusicInfoAPI, getMusiclyricAPI, getMusicUrlAPI } from "@/api/index";

export default {
  name: "PlayView",
  data() {
    return {
      musicID: this.$route.query.musicId[this.$route.query.index], //音乐ID
      musicInfo: {}, //歌曲信息
      timer: "", //时间线
      timer_M: "", //秒数
      lyric: {}, //处理后的歌词
      curLyric: "", // 当前显示哪句歌词
      lastLy: "", // 记录当前播放歌词
      url: "https://p1.music.126.net/-Ln0njfjMFC5LRPwekrSbA==/109951168239745858.jpg",
      musicUrl: "",
      timerIn: "", //计时
      playState: true, //播放图标
      plan: 0, //进度条百分比
      lyricIndex: 0, //
      value: 0, //
      musicListId: this.$route.query.musicId, //音乐列表ID
      musicListId_index:Number( this.$route.query.index), //index
    };
  },
  watch: {
    // 使用watch监听当前歌曲进度value的变化处理歌词位置
    value() {
      let i = 0;
      // 循环歌词对象
      for (let key in this.lyric) {
        // key表示歌词对象中的时间，如果key等于歌曲进度value，改变当前歌词进度		lyricIndex
        if (+key == this.value) {
          this.lyricIndex = i;
          // 当歌词进度大于5，即播放到了第5句歌词，开始滚动
          if (i > 5) {
            this.$refs.lyric.scrollTop = 30 * (i - 5);
          }
        }
        i++;
      }
    },
    timerIn() {
      if (this.timerIn == this.timer && this.plan >= 100) {
        this.playState = false;
        // 发起下一首请求
        this.getMusicInfo(this.musicListId[this.musicListId_index+1],this.musicListId_index+1);
      }
    },
       
  },
  methods: {
    // 获取歌曲信息
    async getMusicInfo(id,index) {
      this.playState = true;
      this.plan = 0;
      this.timerIn = '';
      this.lyricIndex = 0;
      this.value = 0 ;
      this.musicListId_index = index;
      const res = await getMusicInfoAPI(id);
      this.musicInfo = res.data.songs[0];
      this.getMusicLyrics(res.data.songs[0].id);
      this.getMusicURL(res.data.songs[0].id);
      this.curLyric = this.lyric[0];
    },
    // 获取歌词
    async getMusicLyrics(id) {
      const res = await getMusiclyricAPI(id);
      // this
      this.lyric = this.handelLyrics(res.data.lrc.lyric);
      return true;
    },

    handelTimer(time) {
      console.log("time:",time);
      let reg2 = new RegExp(/\[|\]/, "g");
      let res = time.replace(reg2, "");
      let timer2 = res.split(":");
      console.log("timer2:",timer2);
      let ss = Math.floor(Number(timer2[1]));
      // 时间换秒
      this.timer_M = Number(timer2[0] * 60 + ss);

      return timer2[0] + ":" + ss;
    },
    // 处理歌词
    handelLyrics(data) {
      console.log(data);

      let reg = /\[.+?]/g;
      let timerArr = data.match(reg);
      // 处理时间 start
      this.timer = this.handelTimer(timerArr[timerArr.length - 1]);
      // 处理时间 end
      let contentArr = data.split(/\[.+?\]/).slice(1); //将未处理的歌词按照[],进行分割
      let lyricObj = {}; //用于保存歌词数据数组==》key为时间 value 为歌词
      timerArr.forEach((item, index) => {
        let ms = item.split(":")[0].split("")[2] * 60;
        let ss =
          item.split(":")[1].split(".")[0].split("")[0] === "0"
            ? item.split(":")[1].split(".")[0].split("")[1]
            : item.split(":")[1].split(".")[0];
        lyricObj[ms + Number(ss)] = contentArr[index];
      });
      return lyricObj;
    },

    //获取歌曲RUL
    async getMusicURL(id) {
      const musicUrlRes = await getMusicUrlAPI(
        id,
        localStorage.getItem("Ucookie")
      );
      this.musicUrl = musicUrlRes.data.data[0].url;
    },

    audioStart() {
      // 播放按钮 - 点击事件
      if (!this.playState) {
        // 如果状态为false
        this.$refs.audio.play(); // 调用audio标签的内置方法play可以继续播放声音
      } else {
        this.$refs.audio.pause(); // 暂停audio的播放
      }
      this.playState = !this.playState; // 点击设置对立状态
    },
    showLyric() {
      console.log("saddad",this.$refs);
      // 监听播放audio进度, 切换歌词显示
      this.$refs.audio.addEventListener("timeupdate", () => {
        let curTime = Math.floor(this.$refs.audio.currentTime);
        this.value = Math.floor(this.$refs.audio.currentTime);
        this.timerIn =
          this.singTimer(Number(curTime)) >= this.timer
            ? this.timer
            : this.singTimer(Number(curTime));
        this.plan =
          (curTime / this.timer_M) * 100 >= 100
            ? 100
            : (curTime / this.timer_M) * 100;
        // 避免空白出现
        if (this.lyric[curTime]) {
          this.curLyric = this.lyric[curTime];
          this.lastLy = this.curLyric;
        } else {
          this.curLyric = this.lastLy;
        }
      });
    },
    // 播放时间
    singTimer(time) {
      let mm;
      let ss;
      if (time >= 60) {
        mm = Math.floor(time / 60);
        ss = time - mm * 60;
      } else {
        mm = 0;
        ss = time;
      }
      let m = mm < 10 ? `0${mm}` : mm;
      let s = ss < 10 ? `0${ss}` : ss;

      return m + ":" + s;
    },
    // 上一首
    previous(){
      if(this.musicListId_index==0){
        this.getMusicInfo(this.musicListId[this.musicListId.length-1],this.musicListId.length-1);
      }else{
        this.getMusicInfo(this.musicListId[this.musicListId_index-1],this.musicListId_index-1);
      }
    },
    // 下一首
    next(){
      this.getMusicInfo(this.musicListId[this.musicListId_index+1],this.musicListId_index+1);

    }
  },
  mounted() {
    this.getMusicInfo(this.musicID,this.musicListId_index);
    this.showLyric();
  },
  created(){
    console.log("检测:",this.$route.query.musicId.length);
  }
};
</script>

<style scoped>
p {
  padding: 0 0;
  margin: 0 0;
}
img {
  width: 100%;
}
.back {
  width: 100%;
  height: 100%;
}
.boxPlay {
  padding-left: 25px;
  padding-top: 15px;
}
.imgBox {
  width: 400px;
  height: 400px;
}
.MusicName {
  font-size: 24px;
  font-weight: 700;
}
.singer {
  margin-top: 15px;
  font-size: 14px;
}
.lyrics {
  width: 100%;
  padding: 20px;
  text-align: center;
}
.action {
  font-size: 22px;
  color: #83b164;
  opacity: 1;
}
.PlayBox {
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
  width: 20%;
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
  padding-top: 15px;
  color: white;
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
.lyric {
  width: 100%;
  height: 300px;
  overflow: auto;
  font-size: 16px;
  font-weight: normal;
  padding: 5px 10px;
  border-left: none;
}
.each {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.choose {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  color: #83b164;
}
</style>
