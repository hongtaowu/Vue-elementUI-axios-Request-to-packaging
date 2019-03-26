import axios from 'axios'
import router from '../router/index'
import Cookies from 'js-cookie';
import { Message } from 'element-ui';

let host = process.env.HOST;
if (host === 'qa') {
    axios.defaults.baseURL = '';
} else if (host === 'stg') {
    axios.defaults.baseURL = '';
} else if (host === 'prd') {
    axios.defaults.baseURL = '';
} else {
    axios.defaults.baseURL = '';
}

// 请求拦截器
axios.interceptors.request.use(config => {
    //判断Cookies中是否存在authToken
    if (Cookies.get("authToken")) {
        //  存在将authToken写入 request header
        config.headers = {
            'Authorization' : `${Cookies.get("authToken")}`,
        };
    };
    if (config.method === "get") {
        config.params = {
            _t: new Date().getTime(),
            ...config.params
        }
    }
    return config;
}, err => {
    Message.error("加载超时！")
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response){
        switch(error.response.status){
            case 400: 
                Message.error("请求错误");
            break;
            case 401:
                Message.error("未授权，请重新登录")
                router.push({
                    name: 'login'
                })
            break;
            case 403:
                Message.error("拒绝访问")
            break;
            case 404: 
                Message.error("请求出错")
            break;
            case 408: 
                Message.error("请求超时")
            break;
            case 500: 
                Message.error("服务器错误") 
            break;
            case 501: 
                Message.error("服务未实现")
            break;
            case 502: 
                Message.error("网络错误") 
            break;
            case 503: 
                Message.error("服务不可用")
            break;
            case 504: 
                Message.error("网络超时")
            break;
            case 505: 
                Message.error("HTTP版本不受支持")
            break;
            default:
                Message.error("连接出错")
        }
    }
    return Promise.reject(error.response.data)
});

function checkSuccess (resolve,response) {
    const data = response.data;
    // 如果http状态码正常，则直接返回数据
    if (data.status) {
        return resolve(data.data)
    }
    // 异常状态下，把错误信息返回去
    return Message.error(data.msg);
}

function checkErr (res) {
    // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
    if (res.status === 401) {
        Message.error("请求出错")
    }
    if (res.data && (!res.data.success)) {
        Message.error(res.data.msg)
    }
}
// 请求方式的配置
export default {
    post (url, data) {  //  post
        return new Promise((resolve, reject) => { 
            axios({
                method: 'post',
                url:url,
                data: JSON.parse(data),
            }).then(
                (response) => {
                    return checkSuccess(resolve,response)
                }
            ).catch(
                (res) => {
                    checkErr(res)
                    return reject(res)
                }
            )
        })
    },
    get (url, params) {  // get
        return new Promise((resolve, reject) => { 
            axios({
                method: 'get',
                url:url,
                params, // get 请求时带的参数
                headers: { 
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json;charset=utf-8'
                },
                timeout: 5000
            }).then(
                (response) => {
                    return checkSuccess(resolve,response)
                }
            ).catch(
                (res) => {
                    checkErr(res)
                    return reject(res)
                }
            )
        })
    },
    delete (url, params) {  // delete
        return new Promise((resolve, reject) => { 
            axios({
                method: 'delete',
                url:url,
                params:JSON.stringify(params), // get 请求时带的参数
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 5000
            }).then(
                (response) => {
                    return checkSuccess(resolve,response)
                }
            ).catch(
                (res) => {
                    checkErr(res)
                    return reject(res)
                }
            )
        })
    },
}