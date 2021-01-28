import myAxios from "./myAxios";
import {BASE_URL,SHOWAPI_APPID,SHOWAPI_SIGN,CITY} from '../config';
//axios返回promise对象
//登陆请求
export const reqLogin = (username,password)=>myAxios.post(BASE_URL+'/login',{username,password})
// 获取商品列表
export const reqCategory = ()=>myAxios.get(BASE_URL+'/manage/category/list')
//获取天气信息(收费接口【易源】)
export const reqWeather = ()=>myAxios.post('https://route.showapi.com/9-9',{
  showapi_appid:SHOWAPI_APPID,
  showapi_sign:SHOWAPI_SIGN,
  area:CITY
})
