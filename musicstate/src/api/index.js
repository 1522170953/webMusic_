// 统一出口
import { gerNewMusic } from '@/api/main/GetNewMusic';
// 二维码登录
import { getLoginEwmKey, getLoginEwmUrl, getLoginEwmCheckInfo, getLoginStatus } from '@/api/main/LogingEwm';

// 每日推荐
import { getRecommendMusic } from '@/api/main/GetRecommendMusic';

// 热门歌单
import { getHotSong } from '@/api/main/GetHotSonger';

// 热门歌手
import { getHotSinger } from '@/api/main/GetHotSinger';

// 最新MV

import { getRecMv } from '@/api/main/GetRecommendMv';

// 所有榜单
import { getToplist } from '@/api/main/GetToplist';
// 歌单详情===》榜单详情
import {getSongDetails} from '@/api/main/GetSongDetails';
// 获取歌单所有歌曲
import {getSongMusicLists} from '@/api/main/GetSongMusic';
// 获取歌手--》分类
import {getSinger} from '@/api/main/GetSing';
// 获取专辑
import {getSongs} from '@/api/main/GetSong';
// 获取歌单
import {getMusicLists} from '@/api/main/GetMusicLists';
// 获取歌词
import {getMusicInfo,getMusiclyric} from '@/api/main/GetMusicInfo';
// 获取歌曲URl
import {getMusicUrl} from '@/api/main/GetMusicUrl';
// 搜索
import {search} from '@/api/main/Search';
// 用户-账号信息
import {accountInfo,getUserSong,getUserInfo} from '@/api/main/GetUserInfo';
// MV相关请求
import {getMvAll,getWyMv,newMV,getMvInfo,getMvUrl} from '@/api/main/Mvs/index';
// 退出登录
import {out} from '@/api/main/LoginOut';






// 登录start

export const getLoginEwmKeyAPI = getLoginEwmKey;

export const getLoginEwmUrlAPI = getLoginEwmUrl;

export const getLoginEwmCheckInfoAPI = getLoginEwmCheckInfo;

export const getLoginStatusAPI = getLoginStatus;

// 登录 end

// 用户- 账号信息 start

// 获取账号信息
export const accountInfoAPI = accountInfo;
// 获取用户歌单
export const getUserSongAPI = getUserSong;
// 获取用户信息
export const getUserInfoAPI = getUserInfo;

// 退出登录
export const outAPI = out;


// 用户-账号信息 end

// 新歌发行
export const gerNewMusicAPI = gerNewMusic;
// 每日推荐 ==》新歌热榜
export const getRecommendMusicAPI = getRecommendMusic;
// 热门歌单
export const getHotSongAPI = getHotSong;
// 热门歌手
export const getHotSingerAPI = getHotSinger;
// 最新MV
export const getRecMvAPI = getRecMv;
// 所有榜单
export const getToplistAPI = getToplist;
// 获取歌单/榜单详情
export const getSongDetailsAPI = getSongDetails;
// 获取歌单所有歌曲
export const getSongMusicListsAPI = getSongMusicLists;
// 获取歌手--》分类
export const getSingerAPI = getSinger;
// 获取专辑-语种风格馆
export const getSongsAPI= getSongs;
// 获取歌单
export const getMusicListsAPI = getMusicLists;
// 获取歌曲信息
export const getMusicInfoAPI = getMusicInfo;
// 获取歌词
export const getMusiclyricAPI = getMusiclyric;
// 获取歌曲URL
export const getMusicUrlAPI = getMusicUrl;
// 搜索
export const searchAPI = search;

// 全部mv ===>调用可获全部MV mv getMvAll,getWyMv,newMV,getMvInfo,getMvUrl
export const getMvAllAPI = getMvAll;
// 网易出品
export const getWyMvAPI = getWyMv;
// 最新mv
export const newMVAPI = newMV;
// 获取mv数据
export const getMvInfoAPI = getMvInfo;
// mv地址
export const getMvUrlAPI = getMvUrl;


// 歌手信息 start

import {singerInfo,singerSong,singerMusic,singerCount} from '@/api/main/Singer/index';

// 获取歌手信息
export const singerInfoAPI =  singerInfo;

// 获取歌手专辑
export const singerSongAPI = singerSong;

// 获取歌手单曲
export const singerMusicAPI = singerMusic;

// 获取歌手粉丝数量
export const singerCountAPI = singerCount;

// 歌手信息 end


// 专辑 start
import {albumInfo} from '@/api/main/Album/index';

// 获取专辑内容
export const albumInfoAPI = albumInfo;

// 专辑 end 

