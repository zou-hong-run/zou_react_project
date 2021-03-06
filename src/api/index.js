import myAxios from "./myAxios";
import {BASE_URL,SHOWAPI_APPID,SHOWAPI_SIGN,CITY} from '../config';
//axios返回promise对象
//登陆请求
export const reqLogin = (username,password)=>myAxios.post(BASE_URL+'/login',{username,password})
// 获取商品种类列表
export const reqCategory = ()=>myAxios.get(BASE_URL+'/manage/category/list')
//获取天气信息(收费接口【易源】)
export const reqWeather = ()=>myAxios.post('https://route.showapi.com/9-9',{
  showapi_appid:SHOWAPI_APPID,
  showapi_sign:SHOWAPI_SIGN,
  area:CITY
})
//添加一个分类
export const reqAddCatetory = (categoryName)=>myAxios.post(BASE_URL+'/manage/category/add',{categoryName})
//更新分类
export const reqUpdateCatetory = (categoryId,categoryName) =>myAxios.post(BASE_URL+"/manage/category/update",{categoryId,categoryName})
//获取商品分页列表
export const reqProductList = (pageSize,pageNum) =>myAxios.get(BASE_URL+'/manage/product/list',{params:{pageSize,pageNum}})
//请求更新商品状态
export const reqUpdateProductStatus = (productId,status) =>myAxios.post(BASE_URL+'/manage/product/updateStatus',{productId,status})
//根据商品描述或者商品名得到商品页
export const reqProductSearch = (pageSize,pageNum,searchType,keyWord)=>{
  return myAxios.get(BASE_URL+'/manage/product/search?',{params:{pageSize,pageNum,[searchType]:keyWord}})
  // if(searchType==='name'){
  //   myAxios.get(BASE_URL+'/manage/product/search?',{params:{pageSize,pageNum,productName:keyWord}})
  // }else{
  //   myAxios.get(BASE_URL+'/manage/product/search?',{params:{pageSize,pageNum,productDesc:keyWord}})
  // }
}
//根据商品分类id获取商品信息(后端未写该接口)
// export const reqProdById = (categoryId)=>myAxios.get(BASE_URL+"/manage/product/info",{params:{categoryId}})
//请求根据图片名删除图片
export const reqDeletePicture = (name) =>myAxios.post(BASE_URL+'/manage/img/delete',{name})
//请求添加商品
export const reqAddProduct = (productObj) =>myAxios.post(BASE_URL+'/manage/product/add',{...productObj})
//请求更新商品
export const reqUpdateProduct = (productObj) =>myAxios.post(BASE_URL+'/manage/product/update',{...productObj})
//请求所有角色列表
export const reqRoleList = ()=>myAxios.get(BASE_URL+'/manage/role/list')
//请求添加角色
export const reqAddRole = (roleName)=>myAxios.post(BASE_URL+"/manage/role/add",{roleName})
//请求改变用户权限
export const reqRoleUpdate = (roleObj) =>myAxios.post(BASE_URL+'/manage/role/update',{...roleObj,auth_time:Date.now()})
//请求获取所有用户的列表(同时包含角色列表)
export const reqUserList = ()=>myAxios.get(BASE_URL+"/manage/user/list")
//请求添加用户
export const reqAddUser = (userObj)=>myAxios.post(BASE_URL+'/manage/user/add',{...userObj})