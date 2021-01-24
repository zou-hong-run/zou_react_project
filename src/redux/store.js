import {createStore} from 'redux'//创建核心store对象
import reducer from './reducer'
let store = createStore(reducer)
export default store