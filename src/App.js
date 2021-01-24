import React, { Component } from 'react'
import { increment,decrement } from "./redux/action_creators";
export default class App extends Component {
  increment = ()=>{
    let {value} = this.refs.selectNumber
    this.props.store.dispatch(increment(value))
  }
  decrement = ()=>{
    let {value} = this.refs.selectNumber
    this.props.store.dispatch(decrement(value))
  }
  oddIncrement= ()=>{
    let {value} = this.refs.selectNumber
    let count = this.props.store.getState()
    if(count%2===1){
      this.props.store.dispatch(increment(value))
    }
  }
  asyncIncrement= ()=>{
    let {value} = this.refs.selectNumber
    setTimeout(() => { 
      this.props.store.dispatch(increment(value))
    },1000);
  }
  render() {
    let count = this.props.store.getState()
    return (
      <div>
        <h3>当前计数为：{count}</h3>
        <select name="" id="" ref="selectNumber">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.oddIncrement}>odd+</button>
        <button onClick={this.asyncIncrement}>async</button>
      </div>
    )
  }
  componentDidMount(){
    console.log(this.props.store);
  }
}
