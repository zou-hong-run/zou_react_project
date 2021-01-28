import React, { Component } from 'react'
import { Modal, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {connect} from 'react-redux'
import {FullscreenOutlined,FullscreenExitOutlined} from '@ant-design/icons';
import screenfull from 'screenfull';
import dayjs from 'dayjs';//转换时间戳的一个库

import {createDeleteUserInfoAction} from '../../../redux/actions/login_action'
import {reqWeather} from '../../../api/index';
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
    date:Date.now(),
    weather:{}
  }
  componentDidMount(){
    //监听用户是否点击全屏按钮                                      
    screenfull.on('change', () => {
      this.setState({
        isFull:!this.state.isFull
      })
    })
    //刷新显示时间
    this.timer = setInterval(()=>{
      this.setState({
        date:dayjs().format('YYYY年 MM月 DD日 HH:mm:ss A') // 展示时间
      })
    },1000)
    //页面挂载后，获取天气(次数有限谨慎使用哈哈哈)
    // this.getWeather()
  }
  componentWillUnmount(){
    clearInterval(this.timer)
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
  //获取天气
  getWeather = async ()=>{
    let result = await reqWeather()
    let weather = result.showapi_res_body.dayList[0]
    this.setState({weather})
  }
  render() {
    let {isFull} = this.state
    let {user} = this.props.userInfo
    let APM = dayjs().format('A').toLowerCase()
    let {night_weather_pic,day_weather_pic,day_weather,night_weather,day_air_temperature,night_air_temperature} = this.state.weather
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
            <img src={APM==='pm'?night_weather_pic:day_weather_pic} alt="tianqi"/>
            {APM==='pm'?night_weather:day_weather} 温度：{APM==='pm'?night_air_temperature:day_air_temperature}
          </div>
        </div>
      </header>
    )
  }
}
export default Header
