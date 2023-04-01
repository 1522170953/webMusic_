<template>
    <div class="A_Box">
        <div class="A_header">
            <div class="A_img">
                <img :src="albumInfo.blurPicUrl" alt="albumInfo.name">
            </div>
            <div class="A_aInfo">
                <div class="A_name"><span>{{albumInfo.name}}</span></div>
                <div class="A_author"><span>作者:{{albumInfo.artist.name}}</span></div>
                <div class="A_intro">
                    <div class="A_title">简介</div>
                    <div class="A_txt">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{albumInfo.description}}</div>
                </div>
            </div>
        </div>
        <div class="A_main">
            <MusicLists :musicInfo="A_music"></MusicLists>
        </div>
    </div>
</template>

<script>
import MusicLists from '@/components/MusicLists';
import {albumInfoAPI} from '@/api/index';
    export default {
        name:"AlbumView",
        components:{MusicLists},
        data() {
            return {
                A_id:this.$route.query.id,//专辑ID
                albumInfo:{},//歌单详情
                A_music:[],//
            }
        },
        methods:{

            // 获取专辑内容
            async getAlbumInfo(id){
                const res = await albumInfoAPI(id);
                this.albumInfo= res.data.album;
                this.A_music = res.data.songs;
                console.log("res:",res);
            }
        },
        created(){
            this.getAlbumInfo(this.A_id)
        }
    }
</script>

<style scoped>
img{
    width: 100%;
}
.A_Box{
    width:100%;
    display: flex;
    flex-direction: column;
}
.A_header{
    width:100%;
    padding-left: 15px;
    display: flex;
    flex-direction: row;
    justify-content: start;
}
.A_main{
    margin-top: 20px;
    width: 100%;
}
.A_img{
    width: 25%;
    padding: 10px;
}
.A_aInfo{
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 75%;
    padding: 10px;
}
.A_name{
    width: 100%;
    font-size: 32px;
}
.A_author{
    width: 100%;
    font-size: 24px;
    color: #ccc;
    margin-top: 15px;
}
.A_intro{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
}
.A_title{
    margin-top: 100px;
    font-size: 18px;
}
.A_txt{
    width: 90%;
    height: 140px;
    font-size: 12px;
    overflow: hidden;
  text-overflow: ellipsis;
}
</style>