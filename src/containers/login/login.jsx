import React, { Component } from 'react'
import { Form, Input, Button} from 'antd';
import {connect} from "react-redux";
import {createDemo1Action,createDemo2Action} from "../../redux/actions/test_action";
import {reqLogin} from "../../api";
import './login.less'
import logo from './imgs/logo.jpg'         
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
  onFinish = (values) => {
    // console.log('Success:', values);
    // let {username,password} = values
    reqLogin(values)
  };
  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  render() {
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
                {/*
                ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
                */}
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
export default connect(
  state =>({
    demo:state.test
  }),
  {
    demo1:createDemo1Action,
    demo2:createDemo2Action
  }
)(Login)