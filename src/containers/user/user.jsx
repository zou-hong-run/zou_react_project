import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Form,
  Input,
  Select
} from 'antd'
import dayjs from 'dayjs'
import {reqUserList,reqAddUser} from '../../api/index'

const { Option } = Select;
export default class User extends Component {
  formRef = React.createRef();
  state = {
    isShowAdd:false,
    isShowUpdate:false,
    userList:[],//用户列表
    roleList:[]//角色列表
  }
  layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };
  onFinish = async (values) =>{
    //请求添加用户
    let result = await reqAddUser(values)
    const {data,status,msg} = result
    let userList = [...this.state.userList]
    if(status===0){
      userList.unshift(data)
      this.setState({
        isShowAdd:false,
        userList
      })
      message.success("添加用户成功")
    }else{
      message.error("添加用户失败"+msg)
    }
    this.formRef.current.resetFields()//重置表单
    
  }
  //表单验证失败
  onFinishFailed = (errorInfo)=>{
    message.error(errorInfo.errorFields[0].errors)
  }
  //新增用户确定按钮
  handleOk =()=>{
    this.formRef.current.submit()
  }
  getUserList = async ()=>{
    let result = await reqUserList()
    const {data,status} = result
    if(status===0){
      this.setState({
        userList:data.users.reverse(),
        roleList:data.roles
      })
    }else{
      message.error("请求用户列表失败")
    }
  }
  componentDidMount () {
    this.getUserList()
  }


  render() {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render:(time)=>{
          return dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')
        }
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => {
            const {roleList} = this.state
            let result = roleList.find((item)=>{
              return item._id === role_id
            })
            return result.name
        }
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <Button onClick={() => this.showUpdate(user)}>修改</Button>
            <Button onClick={() => this.deleteUser(user)}>删除</Button>
          </span>
        )
      },
  ]
    const title = <Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}}>创建用户</Button>

    return (
      <Form
        style={{height:'100%'}}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        ref={this.formRef}
        name='checkRole'
        {...this.layout}
      >
        <Card title={title}>
          <Table
            bordered
            rowKey='_id'
            dataSource={this.state.userList}
            columns={columns}
            pagination={{defaultPageSize: 5}}
          />

          <Modal
            title={false ? '修改用户' : '添加用户'}
            visible={this.state.isShowAdd}
            onOk={this.handleOk}
            onCancel={() => {
              this.setState({
                isShowAdd:false
              },()=>{
                this.formRef.current.resetFields()
              })
            }}
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
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                {required: true,message: '请输入手机号!'},
                {max: 11,message: '用户名最长11位!'},
                {min: 6,message: '用户名最短4位!'},
                {pattern: /^[0-9]+$/,message: '只能使用数字!'},
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {required: true,message: '请输入邮箱!'}
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="角色"
              name="role_id"
              rules={[
                {required:true,message:'请选择角色'}
              ]}
            >
              <Select>
                <Option value="">请选择一个角色</Option>
                {
                  this.state.roleList.map((item)=>{
                    return <Option key={item._id} value={item._id}>{item.name}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Modal>
        </Card>
      </Form>
    )
  }
}