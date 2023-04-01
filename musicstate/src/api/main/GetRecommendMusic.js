// 请求工具
import request from '@/utils/requet';

// 
export const getRecommendMusic = (cookie) => request({
    url:`/recommend/songs?cookie=${cookie}&limit=${4}`
})