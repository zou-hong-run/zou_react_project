import React, { Component } from 'react'
import {Button} from 'antd'
import {FullscreenOutlined} from '@ant-design/icons';
import './css/header.less'
export default class Header extends Component {
  render() {
    return (
      <header className='header'>
        <div className="header-top">
          <Button size='small'><FullscreenOutlined /></Button>
          <span className='username'>欢迎：小邹</span>
          <Button className='logout' type='link' size='small'>退出登陆</Button>
        </div>
        <div className="header-bottom">
          <div className='header-bottom-left'>
            柱状图
          </div>
          <div className='header-bottom-right'>
            时间
            <img src='http://app1.showapi.com/weather/icon/day/00.png' alt="tianqi"/>
            晴 温度：2~5
          </div>
        </div>
      </header>
    )
  }
}
