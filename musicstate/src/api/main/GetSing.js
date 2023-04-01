import request from '@/utils/requet';

// 获取歌手
export const getSinger = (type,area,offset) => request ({
    url:`/artist/list?type=${type}&area=${area}&limit=30&offset=${offset}`,
    method:"GET"
})