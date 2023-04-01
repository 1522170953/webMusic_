import request from '@/utils/requet';

// 搜索
export const search = (keywords,type) => request ({
    url:`/cloudsearch?keywords=${keywords}&type=${type}`,
    method:"GET"
});