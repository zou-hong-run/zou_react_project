import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import menuRuducer from './menu_reducer';
export default combineReducers({
  userInfo:loginReducer,
  menuTitle:menuRuducer
})