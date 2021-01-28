import axios from "axios";
import qs from 'querystring';
import {message} from 'antd';
import NProgress from 'nprogress';
import store from '../redux/store';

import 'nprogress/nprogress.css'
//使用拦截器
//实例axios对象，设置请求参数
const instance = axios.create({
  timeout: 4000,
  // headers: {'X-Auth-Token': 'your token'},
});
//请求拦截器
instance.interceptors.request.use((config)=>{
  NProgress.start()
  //从redux中获取之前的token
  const {token} = store.getState().userInfo
  if(token){
    //添加请求头部内容验证是否有token，验证身份
    console.log('token_'+token)
    config.headers['Authorization'] = 'token_'+token
  }
  const {method,data} = config
  if(method.toLowerCase==='post'){
    //是post并且传递过来的参数是对象（json)格式就转化为string
    if(data instanceof Object){
      config.data = qs.stringify(data)
    }
  }
  return config;
}, (error)=> {
  // Do something with request error
  return Promise.reject(error);
});
//响应拦截器
instance.interceptors.response.use((response)=>{
  NProgress.done()
  //响应成功
  return response.data;
},(error)=>{
  NProgress.done()
  //服务器响应失败
  // return Promise.reject(error);//阻断,把错误丢给catch()
  message.error(error.message+"服务器连接错误")
  return new Promise(()=>{})//彻底中断，啥也不给外界
});
export default instance