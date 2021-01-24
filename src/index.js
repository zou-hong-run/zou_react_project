import React from 'react'
import ReactDom from 'react-dom'
import store from './redux/store'
import App from './App'
ReactDom.render(
  <App store={store}/>,document.querySelector('#root')
)
store.subscribe(()=>{
  ReactDom.render(
    <App store={store}/>,document.querySelector('#root')
  )
})