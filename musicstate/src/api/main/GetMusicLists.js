import request from '@/utils/requet';

// 歌单
export const getMusicLists = (cat) => request ({
    url:`/top/playlist?limit=30&cat=${cat}`,
    method:"GET"
})