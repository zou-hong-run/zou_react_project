import React, { Component } from 'react'
import {connect} from "react-redux";
import {Redirect,Route,Switch} from 'react-router-dom';
import { Layout } from 'antd';

import {reqCategory} from '../../api/index';

import Header from './header/header';
import './css/admin.less';

import Home from '../../components/home/home'
import Category from '../category/category';
import Product from '../product/product';
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
  componentDidMount(){
    console.log(this.props)
  }
  getList = async ()=>{
    let result = await reqCategory()
    console.log(result)
  }
  //在render里，若想实现跳转，最好用<Redirect></Redirect>
  render() {
    const {isLogin} = this.props.userInfo
    if(!isLogin){
      return <Redirect to='/login'/>
    }else{
      return (
        <Layout className='admin'>
          <Sider className='sider'>Sider</Sider>
          <Layout>
            <Header className='header'>Header</Header>
            <Content className='content'>
              <Switch>
                <Route path='/admin/home' component={Home}/>
                <Route path='/admin/prod_about/category' component={Category}/>
                <Route path='/admin/prod_about/product' component={Product}/>
                <Route path='/admin/user' component={User}/>
                <Route path='/admin/role' component={Role}/>
                <Route path='/admin/charts/bar' component={Bar}/>
                <Route path='/admin/charts/line' component={Line}/>
                <Route path='/admin/charts/pie' component={Pie}/>
                <Redirect to='/admin/home'/>
              </Switch>
            </Content>
            <Footer>俺们推荐您使用谷歌浏览器，以便获取最佳体验<button onClick={this.getList}></button></Footer>
          </Layout>
        </Layout>
      )
    }
    
  }
}
export default admin