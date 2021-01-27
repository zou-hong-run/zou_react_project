import myAxios from "./myAxios";
import {BASE_URL} from '../config';
//axios返回promise对象
export const reqLogin = (username,password)=>myAxios.post(BASE_URL+'/login',{username,password})
