import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'
let user = JSON.parse(localStorage.getItem('user'))//需要先判断是否为空，然后再解析，这里懒；了
let token = localStorage.getItem('token')
let initState = {
  user:user||'',
  token:token||'',
  isLogin:user&&token?true:false
}
export default function test(preState = initState,action){
  const {type,data} = action
  let newState
  switch (type) {//no token
    case SAVE_USER_INFO:
      newState = {user:data,token:'伪造token',isLogin:true}
      return newState
    case DELETE_USER_INFO:
      return newState = {user:'',token:'',isLogin:false}
    default:
      return preState
  }
}