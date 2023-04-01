import axios from 'axios';


const ajax = axios.create({
    baseURL: "http://106.52.50.175:3000/"//服务器地址
})

export default ajax;