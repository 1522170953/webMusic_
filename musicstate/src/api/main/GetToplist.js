import request from '@/utils/requet';

// 请求
export const getToplist = () => request({
    url:"/toplist",
    method:"GET"
})