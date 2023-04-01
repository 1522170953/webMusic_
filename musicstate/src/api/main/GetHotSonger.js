import request from '@/utils/requet';

export const getHotSong = () => request({
    url:"/top/playlist?limit=9&order=hot",
    method:"GET"
})