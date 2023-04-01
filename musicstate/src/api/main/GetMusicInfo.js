import request from '@/utils/requet';

// 获取歌曲信息、歌词
export const getMusiclyric = (id) => request({
    url:`/lyric?id=${id}`,
    method:"GET"
});

export const  getMusicInfo= (id) => request({
    url:`/song/detail?ids=${id}`,
    method:"GET"
})