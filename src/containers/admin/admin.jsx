import React, { Component } from 'react'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

import {reqCategory} from '../../api/index';
import {createDeleteUserInfoAction} from '../../redux/actions/login_action';

@connect(
  state=>({
    userInfo:state.userInfo
  }),
  {
    deleteUserInfo:createDeleteUserInfoAction
  }
)
class admin extends Component {
  logout = ()=>{
    this.props.deleteUserInfo()
  }
  getList = async ()=>{
    let result = await reqCategory()
    console.log(result)
  }
  //在render里，若想实现跳转，最好用<Redirect></Redirect>
  render() {
    const {user,isLogin} = this.props.userInfo
    if(!isLogin){
      return <Redirect to='/login'/>
    }else{
      return (
        <div>
          我是admin组件，你的用户名是{user.username}
          <button onClick={this.logout}>退出登陆</button>
          <button onClick={this.getList}>faqiqingqiu</button>
        </div>
      )
    }
    
  }
}
export default admin