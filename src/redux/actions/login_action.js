import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

export const saveUserInfoAction = (value)=> {
  value.token = '伪造token'
  localStorage.setItem('user',JSON.stringify(value))
  localStorage.setItem('token',value.token)
  return {type:SAVE_USER_INFO,data:value}
}

export const createDeleteUserInfoAction = ()=> {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {type:DELETE_USER_INFO}
}