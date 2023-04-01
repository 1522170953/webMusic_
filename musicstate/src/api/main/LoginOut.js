import request from '@/utils/requet';

// 退出登录
export const out = (cookie) => request({
    url:`/logout?cookie=${cookie}`,
    method:"POST"
});