import axios from 'axios'
import ElementUI from 'element-ui';

const request = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 5000
})

request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    if (user) {
        config.headers['token'] = user.token;

    }
    return config
}, error => {
    return Promise.reject(error)
});


// 接口响应后统一处理结果
request.interceptors.response.use(response => {
    let res = response.data;
    if (response.config.responseType == 'blob') {
        return res
    }
    if (typeof res === 'string') {
        res = res ? JSON.parse(res) : res
    }
    if (res.code === 401) {
        ElementUI.Message({
            message: res.message,
            type: 'warning'
        })
    } 
    return res;
}, error => {
    console.log('error' + error)
    return Promise.reject(error)
})

export default request