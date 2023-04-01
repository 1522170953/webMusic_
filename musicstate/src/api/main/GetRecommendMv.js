import request from '@/utils/requet';

// 请求
export const getRecMv = (limit) => request({
    url:`/mv/first?limit=${limit}`,
    method:"GET"
}) 