import axios from 'axios'
import { ElMessage } from 'element-plus';
import {start,stop} from './serviceHelp'
const request= axios.create({
    baseURL:'/api',
    timeout:5000
})
request.interceptors.request.use(function (config) {
      start()
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    stop()
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    let status = error.response.status;
    switch (status) {
          case 404:
                //错误提示信息
                ElMessage({
                      type: 'error',
                      message: '请求失败路径出现问题'
                })
                break;
          case 500 | 501 | 502 | 503 | 504 | 505:
                ElMessage({
                      type: 'error',
                      message: '服务器挂了'
                })
                break;
          case 401:
                ElMessage({
                      type: 'error',
                      message: '参数有误'
                })
                break;
    }
    return Promise.reject(new Error(error.message))
  });

export default request