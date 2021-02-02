import React, { Component } from 'react'
import {connect} from "react-redux";
import {Redirect,Route,Switch} from 'react-router-dom';
import {Layout} from 'antd';

import Header from './header/header';
import './css/admin.less';
import Leftnav from './left_nav/left_nav';

import Home from '../../components/home/home'
import Category from '../category/category';
import Product from '../product/product';
import AddUpdate from '../product/add_update'
import Detail from '../product/detail';


import User from '../user/user';
import Role from '../role/role';
import Bar from '../bar/bar';
import Line from '../line/line';
import Pie from '../pie/pie';

const { Footer, Sider, Content } = Layout;

@connect(
  state=>({
    userInfo:state.userInfo
  }),
  {}
)
class admin extends Component {
  //在render里，若想实现跳转，最好用<Redirect></Redirect>
  render() {
    const {isLogin} = this.props.userInfo
    if(!isLogin){
      return <Redirect to='/login'/>
    }else{
      return (
        <Layout className='admin'>
          <Sider className='sider'>
            <Leftnav/>
          </Sider>
          <Layout>
            <Header className='header'>Header</Header>
            <Content className='content'>
              <Switch>
                <Route path='/admin/home' component={Home}/>
                <Route path='/admin/prod_about/category' component={Category}/>
                <Route path='/admin/prod_about/product' exact component={Product}/>
                <Route path='/admin/prod_about/product/detail/:id' component={Detail}/>
                <Route path='/admin/prod_about/product/add_update' exact component={AddUpdate}/>
                <Route path='/admin/prod_about/product/add_update/:id' component={AddUpdate}/>
                <Route path='/admin/user' component={User}/>
                <Route path='/admin/role' component={Role}/>
                <Route path='/admin/charts/bar' component={Bar}/>
                <Route path='/admin/charts/line' component={Line}/>
                <Route path='/admin/charts/pie' component={Pie}/>
                <Redirect to='/admin/home'/>
                {/* 重定向会从app开始重新匹配 */}
              </Switch>
            </Content>
            <Footer>俺们推荐您使用谷歌浏览器，以便获取最佳体验</Footer>
          </Layout>
        </Layout>
      )
    }
    
  }
}
export default admin