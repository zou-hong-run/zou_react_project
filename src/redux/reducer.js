import {INCREMENT,DECREMENT} from "./action_types";
let initState = 0//设置初始化状态
export default function operaCount(preState=initState,action) {
  console.log(action);
  let {type,data} = action
  let newState
  switch (type) {
    case INCREMENT:
      newState = preState+data*1
      console.log(newState);
      return newState
    case DECREMENT:
      newState = preState-data*1
      console.log(newState);
      return newState
    default:
      return preState
  }
}