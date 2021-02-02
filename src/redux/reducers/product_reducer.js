import {SAVE_PROD_LIST} from '../action_types';
let initState=''
export default function demo(preState=initState,action){
  const {type,data} = action
  let newState
  switch (type) {
    case SAVE_PROD_LIST:
      newState = data
      return newState
    default:
      return preState
  }
}