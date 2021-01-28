import React, { Component } from 'react'
import { Modal, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {connect} from 'react-redux'
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import screenfull from 'screenfull';
import dayjs from 'dayjs';//转换时间戳的一个库

import {createDeleteUserInfoAction} from '../../../redux/actions/login_action'
import './css/header.less'

const { confirm } = Modal;
@connect(
  state=>({userInfo:state.userInfo}),
  {
    deleteUser:createDeleteUserInfoAction
  }
)
class Header extends Component {
  state = {
    isFull:false,
    date:Date.now()
  }
  componentDidMount(){
    //监听用户是否点击全屏按钮                                      
    screenfull.on('change', () => {
      this.setState({
        isFull:!this.state.isFull
      })
    })
    setInterval(()=>{
      this.setState({
        date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss A') // 展示时间
      })
    },1000)
  }
  //切换全屏按钮的回调
  fullScreen = ()=>{
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
  //退出登陆
  logout = ()=> {
    confirm({
      title: '确认你退出?',
      icon: <ExclamationCircleOutlined />,
      content: '退出后需要重新登陆，确保您还记得密码',
      cancelText:'取消',
      okText:'确定',
      onOk:() =>{
          this.props.deleteUser()
          //也可以先取出函数然后在调用
      },
      onCancel() {
        console.log('取消退出');
      },
    });
  }
  render() {
    let {isFull} = this.state
    let {user} = this.props.userInfo
    return (
      <header className='header'>
        <div className="header-top">
          <Button size='small' onClick={this.fullScreen}>
          {isFull?<FullscreenExitOutlined />:<FullscreenOutlined />
          }</Button>
          <span className='username'>欢迎：{user.username}</span>
          <Button className='logout' type='link' size='small' onClick={this.logout}>退出登陆</Button>
        </div>
        <div className="header-bottom">
          <div className='header-bottom-left'>
            柱状图
          </div>
          <div className='header-bottom-right'>
            {this.state.date}
            <img src='http://app1.showapi.com/weather/icon/day/00.png' alt="tianqi"/>
            晴 温度：2~5
          </div>
        </div>
      </header>
    )
  }
}
export default Header
