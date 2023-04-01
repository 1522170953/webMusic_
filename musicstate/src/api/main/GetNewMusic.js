// 请求工具
import request from '@/utils/requet';

// 请求
export const gerNewMusic = (id) => request({
    url:`/top/song?type=${id}`,
    method:"GET"
})