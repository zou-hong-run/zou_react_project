import React, { Component } from 'react'
export default class Counter extends Component {
  increment = ()=>{
    let {value} = this.refs.selectNumber
    this.props.increment(value)
  }
  decrement = ()=>{
    let {value} = this.refs.selectNumber
    this.props.decrement(value)
  }
  oddIncrement= ()=>{
    let {value} = this.refs.selectNumber
    let count = this.props.count
    if(count%2===1){
      this.props.increment(value)
    }
  }
  asyncIncrement= ()=>{
    let {value} = this.refs.selectNumber
    this.props.asyncIncrement(value,2000)
  }
  render() {
    // let count = this.props.store.getState()
    return (
      <div>
        <h3>当前计数为：{this.props.count}</h3>
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
    console.log(this.props);
  }
}
