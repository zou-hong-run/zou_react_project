import React, { Component } from 'react'
import { Form, Input, Button,message} from 'antd';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

import {saveUserInfoAction} from "../../redux/actions/login_action";
import {reqLogin} from "../../api";

import './login.less'
import logo from '../../static/imgs/logo.jpg' 

@connect(
  state=>({isLogin:state.userInfo.isLogin}),//映射redux中的总状态到props中
  {
    saveUserInfo:saveUserInfoAction
  }
)
class Login extends Component {
  layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };
  tailLayout = {
    wrapperCol: {
      offset: 5,
      span: 16,
    },
  };
  //终极表单成功验证
  onFinish = async (values) => {
    let {username,password} = values
    let result = await reqLogin(username,password)
    const {status,msg,data} = result
    if(status===0){
      message.info('登陆成功')
      //1.把数据交给redux给后面的组件共用
      this.props.saveUserInfo(data)
      //2.跳转页面
      this.props.history.replace('/admin')
    }else{
      message.warning(msg)
    }
    //表单项验证成功，发送ajax请求
    // reqLogin(username,password)
    // .then((result)=>{
    //   console.log(result)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })
  };
  //表单失败验证
  onFinishFailed = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors)
  };
  render() {
    const {isLogin} = this.props
    if(isLogin){//如果已经登陆了，直接去admin页面
      return <Redirect to='/admin'/>
    }
    return (
      <div className='login'>
        <header>
          <img src={logo} alt=""/>
          <h1>小红商品后台管理系统</h1>
        </header>
        <section>
          <h1>机密核心人员登陆页面{this.props.test}</h1>
          <Form
            {...this.layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            className='form'
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {required: true,message: '请输入用户名!'},
                {max: 12,message: '用户名最长12位!'},
                {min: 4,message: '用户名最短4位!'},
                {max: 12,message: '用户名最长12位!'},
                {pattern: /^[a-zA-Z0-9_]+$/,message: '只能使用字母数字下划线!'},
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {required: true,message: '请输入密码!'},
                {max: 12,message: '密码最长12位!'},
                {min: 4,message: '密码最短4位!'},
                {max: 12,message: '密码最长12位!'},
                {pattern: /^[a-zA-Z0-9_]+$/,message: '只能使用字母数字下划线!'},    
                // {
                //   validator: (_, value) =>
                //     value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                // }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...this.tailLayout}>
              <Button type="primary" htmlType="submit" className='form-button'>
                登陆
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
export default Login