import countReducer  from './count_reducer'
import personReducer from './person_reducer'
import {combineReducers} from 'redux'
export default combineReducers({//接收一个对象作为参数，对象中的key就是保存的状态的key
  countReducer:countReducer,
  personReducer:personReducer
})