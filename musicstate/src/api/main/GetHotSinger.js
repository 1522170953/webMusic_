import request from '@/utils/requet';

// 请求
export const getHotSinger= (offset,limit) => request({
    url:`/top/artists?offset=${offset}&limit=${limit}`,
    method:"GET"
})