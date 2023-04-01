import request from '@/utils/requet';

// 专辑内容
export const albumInfo = (id) => request({
    url:`/album?id=${id}`,
    method:"GET"
});

