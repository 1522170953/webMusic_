<template>
    <div>
        <ul class="mvUl"  >
          <li  v-for="item in  searchIfo.result.mvs" :key="item.id">
            <div class="mvMain">
              <div class="mvImg">
                <div class="back"><i class="el-icon-video-play"></i></div>
                <img
                  :src="item.cover"
                  :alt="item.artistName"
                />
              </div>
              <div>
                <div class="mvName"><span>{{item.name}}</span></div>
                <div class="author"><span>作者:{{item.artistName}}</span></div>
                <div class="playCount"><span>播放量:{{Math.floor(item.playCount/10000)<1 ? item.playCount : `${Math.floor(item.playCount/10000)}万`}}</span></div>

              </div>
            </div>
          </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:"MvView",
        props:["searchIfo"],
        data() {
            return {
                
            }
        },
    }
</script>

<style scoped>
img {
  width: 90%;
  height: 224px !important;
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