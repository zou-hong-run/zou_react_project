import {INCREMENT,DECREMENT} from './action_types'
export const increment = value =>({type:INCREMENT,data:value})
export const decrement = value =>({type:DECREMENT,data:value})