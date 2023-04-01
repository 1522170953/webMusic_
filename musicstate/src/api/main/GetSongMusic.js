import request from '@/utils/requet';

// 请求  获取歌单所有歌曲
export const getSongMusicLists= (id,limit,offset,cookie) => request({
    url:`/playlist/track/all?id=${id}&limit=${limit}&offset=${offset}&cookie=${cookie}`,
    method:"GET"
})