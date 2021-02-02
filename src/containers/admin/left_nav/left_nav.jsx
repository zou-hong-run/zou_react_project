import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom';
import {Menu} from 'antd';
import {connect} from 'react-redux';
import {createSaveTitleAction} from '../../../redux/actions/menu_action';

import logo from '../../../static/imgs/logo.jpg';
import './left_nav.less';
import menuList from '../../../config/menu_config';//遍历输出侧边栏
const { SubMenu } = Menu;
@connect(
  state =>({}),
  {
    saveTitle:createSaveTitleAction
  }
)
@withRouter
class Left_nav extends Component {
  //遍历数组，分解菜单
  createMenu = (target)=>{
    return target.map((item)=>{
      if(!item.children){
        return (
          <Menu.Item key={item.key} icon={item.icon} onClick={()=>{this.save(item.title)}}>
            <Link to={item.path}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      }else{
        return(
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {
              this.createMenu(item.children)
            }
          </SubMenu>
        )
      }
    })
  }
  //保存标题到redux当中,负责保存
  save = (title)=>{
    //和redux通信
    this.props.saveTitle(title)
  }

  render() {
    let {pathname} = this.props.location
    let path = pathname.indexOf('product')!==-1 ? 'product' : pathname.split('/').reverse()[0]
    let pathArr = pathname.split('/').splice(2)
    return (
      <div>
        <header className="nav-header">
          <img src={logo} alt="logo"/>
          <h1>商品管理系统</h1>
        </header>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={pathArr}
          mode="inline"
          theme="dark"
          // inlineCollapsed={false}
        >
          {
            this.createMenu(menuList)
          }
        </Menu>
      </div>
    )
  }
}
export default Left_nav
