import request from '@/utils/requet';

//获取歌单详情
export const getSongDetails = (id,cookie) => request({
    url:`/playlist/detail?id=${id}&cookie=${cookie}`,
    method:"GET"
})