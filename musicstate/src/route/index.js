import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 登录
import Login from '@/views/Loging';

// 导入页面
import Home from '@/views/Home';//主体
import Index from '@/views/Index';//首页
import MV from '@/views/MV';//MV
import Singer from '@/views/Singer';//歌手
import Songs from '@/views/Songs';//歌单
import List from '@/views/List';//榜单
import Album from '@/views/Album';//专辑
// import HotSong from '@/views/HotSong';//热门专辑
// import HotMv from '@/views/HotMv';//热门MV

import MyMusic from '@/views/MyMusic';//我的音乐
import MySongs from '@/views/MySongs';//我的歌单

// 子页面
import MusicDetails from '@/views/MusicDetails';
import SingerInfo from '@/views/SingerInfo';
import AlbumList from '@/views/AlbumList';
// 搜索
import Seach from '@/views/Seach';


// 播放页
import Play from '@/views/Play';
import PlayMv from '@/views/PlayMv';



const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/",
        // component:Home
        redirect: "/home"
    },

    {
        path: "/home",
        component: Home,
        redirect: "/home/index",
        children: [
            {
                path: "/home/index",
                component: Index,
                meta: {
                    title: "首页",
                    ifChoice: true
                },
            },
            {
                path: "/home/list",
                component: List,
                meta: {
                    title: "榜单",
                    ifChoice: true

                }
            },

            {
                path: "/home/singer",
                component: Singer,
                meta: {
                    title: "歌手",
                    ifChoice: true

                }
            },
            {
                path: "/home/album",
                component: Album,
                meta: {
                    title: "专辑",
                    ifChoice: true

                },

            },
            {
                path: "/home/songs",
                component: Songs,
                meta: {
                    title: "歌单",
                    ifChoice: true

                }
            },
            {
                path: "/home/mv",
                component: MV,
                meta: {
                    title: "MV",
                    ifChoice: true

                }
            },
            {
                path: "/home/mymusic",
                component: MyMusic,
                meta: {
                    title: "我的音乐",

                }
            },
            {
                path: "/home/mysongs",
                component: MySongs,
                meta: {
                    title: "我的歌单"
                }
            },
            {
                path: "/home/album/musicdetails",
                component: AlbumList,
                meta: {
                    title: "专辑详情",
                    ifChoice: true

                },
            },
            {
                path: "/home/songs/musicdetails",
                component: MusicDetails,
                meta: {
                    title: "歌单详情",
                    ifChoice: true

                },
            },
            {
                path: "/home/play",
                component: Play,
                meta: {
                    title: "播放",
                    ifChoice: true

                },
            },
            {
                path: "/home/playmv",
                component: PlayMv,
                meta: {
                    title: "Mv播放",
                    ifChoice: true
                },
            },
            {
                path: "/home/search",
                component: Seach,
                meta: {
                    title: "搜索",
                    ifChoice: true
                }
            },
            {
                path: "/home/singer/singerinfo",
                component: SingerInfo,
                meta: {
                    title: "歌手信息",
                    ifChoice: true
                }
            }

        ]
    }
]

const router = new VueRouter({
    routes
})


// 全局路由守卫
router.beforeEach((to, from, next) => {
    to.meta.ifChoice = true;
    if (localStorage.getItem("Ucookie") || to.fullPath == "/login") {
        next()
    } else {
        router.push({ path: "/login" })
        next()

    }
});

router.afterEach((to, from) => {
    // this.meta.ifChoice = false
    // console.log("to:",to);
    // console.log("from:",from);
    from.meta.ifChoice = false;

})

export default router


