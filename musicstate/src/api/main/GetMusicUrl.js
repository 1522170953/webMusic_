import requers from '@/utils/requet';

// 获取音乐URL
export const getMusicUrl = (id,cookie) => requers({
    url:`/song/url/v1?id=${id}&level=lossless&cookie=${cookie}`,
    method:"GET"
})