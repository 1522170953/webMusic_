import request from '@/utils/requet';

// Mv网络请求

// 全部mv ===>调用可获全部MV
/**
 * 
 * @param {*} area  地区
 * @param {*} type  类型
 * @param {*} order 排序
 * @param {*} limit 取出数量
 * @param {*} offset 偏移量
 * @returns 
 */
export const getMvAll= (area,type,order,limit,offset) => request({
    url:`/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}&offset=${offset}`,
    method:'GET'
});


//网易出品
export const getWyMv = (limit,offset) => request({
    url:`/mv/exclusive/rcmd?limit=${limit}&offset=${offset}`,
    method:"GET"
});

// 最新mv

export const newMV = (area,limit) => request({
    url:`/mv/first?area=${area}&limit=${limit}`,
    method:"GET"
})

// 获取mv数据

export const getMvInfo = (mvid) => request({
    url:`/mv/detail?mvid=${mvid}`,
    method:"GET"
});

// mv地址
/**
 * 
 * @param {*} id mv id
 * @param {*} r  分辨率
 * @returns 
 */
export const getMvUrl = (id,r) => request({
    url:`/mv/url?id=${id}&r=${r}`,
    method:"GET"
});

