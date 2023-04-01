import request from '@/utils/requet';
// 获取歌手相关信息
 
// 获取歌手详情
export const singerInfo = (id) => request ({
    url:`/artist/detail?id=${id}`,
    method:"GET"
});

// 获取歌手专辑
/**
 * 
 * @param {*} id 歌手ID
 * @param {*} limit 数据量
 * @returns 
 */
export const singerSong = (id,limit,offset) => request({
    url:`/artist/album?id=${id}&limit=${limit}&offset=${offset}`,
    method:"GET"
})

// 获取歌手单曲
export const singerMusic = (id) => request({
    url:`/artists?id=${id}`,
    method:"GET"
})

// 获取歌手粉丝数量
export const singerCount = (id) => request({
    url:`/artist/follow/count?id=${id}`,
    method:"GET"
})


