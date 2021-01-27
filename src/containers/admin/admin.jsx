import React, { Component } from 'react'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

import {createDeleteUserInfoAction} from '../../redux/actions/login_action';

class admin extends Component {
  componentDidMount(){
    console.log(this.props.userInfo.user)
  }
  logout = ()=>{
    this.props.deleteUserInfo()
  }
  //在render里，若想实现跳转，最好用<Redirect></Redirect>
  render() {
    const {user,isLogin} = this.props.userInfo
    if(!isLogin){
      this.props.history.replace('/login')
      return <Redirect to='/login'/>
    }else{
      return (
        <div>
          我是admin组件，你的用户名是{user.username}
          <button onClick={this.logout}>退出登陆</button>
        </div>
      )
    }
    
  }
}
export default connect(
  state=>({
    userInfo:state.userInfo
  }),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)(admin)