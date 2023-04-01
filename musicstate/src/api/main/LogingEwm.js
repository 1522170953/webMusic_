// 请求工具
import request from '@/utils/requet';

// 请求
// 生成二维码 KEY
export const getLoginEwmKey = () => request({
    url:`/login/qr/key?timestamp=${Date.now()}`,
    method:"GET"
});

// 获取二维码
export const getLoginEwmUrl = (key) => request({
    url:`/login/qr/create?key=${key}&qrimg=true&timestamp=${Date.now()}`,
    method:"POST",
});

// 检测二维码
export const getLoginEwmCheckInfo = (key) => request({
    url:`/login/qr/check?key=${key}&timestamp=${Date.now()}`,
    method:"POST"
});

// 登录状态
export const getLoginStatus = (cookie) => request({
    url:`/login/status?timestamp=${Date.now()}`,
    data:{
        cookie,
    },
    method:"POST"
})

