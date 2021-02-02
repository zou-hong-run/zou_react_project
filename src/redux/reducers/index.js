import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import menuRuducer from './menu_reducer';
import productReducer from './product_reducer';
import categoryReducer from './category_reducer'
export default combineReducers({
  userInfo:loginReducer,
  menuTitle:menuRuducer,
  productList:productReducer,
  categoryList:categoryReducer
})