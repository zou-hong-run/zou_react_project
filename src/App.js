import React, { Component } from 'react'

export default class App extends Component {
  state={
    count:0
  }
  increment = ()=>{
    let {value} = this.refs.selectNumber
    let {count} = this.state
    this.setState({count:count+value*1})
  }
  decrement = ()=>{
    let {value} = this.refs.selectNumber
    let {count} = this.state
    this.setState({count:count-value*1})
  }
  oddIncrement= ()=>{
    let {value} = this.refs.selectNumber
    let {count} = this.state
    if(count%2!==0){
      this.setState({count:count+value*1})
    }
  }
  asyncIncrement= ()=>{
    let {value} = this.refs.selectNumber
    let {count} = this.state
    setTimeout(() => { 
      this.setState({count:count+value*1})
    },2000);
  }
  render() {
    let {count} = this.state
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
}
