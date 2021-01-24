import { Switch } from "react-router-dom";

export default function operaCount(preState,action) {
  let {type,data} = action
  switch (type) {
    case 'increment':
      return preState+data
     
  
    default:
      return preState
  }
}