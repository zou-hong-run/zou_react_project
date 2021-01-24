import {createStore,applyMiddleware} from 'redux'//创建核心store对象
import {composeWithDevTools}  from 'redux-devtools-extension'
import thunk  from 'redux-thunk'
import reducer from './reducers'
let store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
  )
export default store
