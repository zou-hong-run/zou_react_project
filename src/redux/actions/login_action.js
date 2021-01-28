import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_types'

export const saveUserInfoAction = (value)=> {
  value.token = 'faketoken'
  localStorage.setItem('user',JSON.stringify(value))
  localStorage.setItem('token',value.token)
  return {type:SAVE_USER_INFO,data:value}
}

export const createDeleteUserInfoAction = ()=> {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return {type:DELETE_USER_INFO}
}
// export const asyncIncrement = (value,delay)=>{
//   return (dispatch)=>{
//     setTimeout(() => {
//       dispatch(increment(value))
//     }, delay);
//   }
// }