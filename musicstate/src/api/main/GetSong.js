import request from '@/utils/requet';

// 专辑分类

export const getSongs = (area,offset) => request({
    url:`/album/list/style?area=${area}&offset=${offset}&limit=30`
});