import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import Admin from './containers/admin/admin'
import Login from './containers/login/login'
export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/admin' component={Admin}/>
      </Switch>
    )
  }
}
