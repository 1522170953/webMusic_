import request from '@/utils/requet';


// 获取账号信息
export const accountInfo = (cookie) => request({
    url:`/user/account?cookie=${cookie}`,
    method:"GET"
});

// 获取用户歌单
export const getUserSong = (id) =>request ({
    url:`/user/playlist?uid=${id}`,
    method:"GET"
});

// 获取用户信息
export const getUserInfo = (id,cookie) =>request ({
    url:`/user/detail?uid=${id}cookie=${cookie}`,
    method:"GET"
})



