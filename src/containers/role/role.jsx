import React, {Component} from 'react'
import {
  Card,
  Button,
  Table,
  Modal,
  message,
  Input,
  Form,
  Tree
} from 'antd'
import dayjs from 'dayjs';
import {reqRoleList,reqAddRole,reqRoleUpdate} from '../../api/index';
import { PlusOutlined } from '@ant-design/icons';
import {PAGE_SIZE} from '../../config/index'
import menuList from '../../config/menu_config';
import { connect } from 'react-redux';

@connect(
  state=>({username:state.userInfo.user.username}),
  {}
)
class Role extends Component {
  formRef = React.createRef();
  state = {
    isShowAdd: false, // 是否显示添加界面
    isShowAuth: false, // 是否显示设置权限界面
    roleList:[],
    menuList:[{
      title: '平台管理', // 菜单标题名称
      key: 'top', // 对应的 key
      children:[...menuList]
    }],
    checkedKeys:['home'],//选中的菜单
    // expandedKeys:['0-0-0', '0-0-1'],
    // selectedKeys:[],
    // autoExpandParent:true
    _id:''
  }
  //新增角色--确认按钮
  handleOk = ()=>{
    //提交表单
    this.formRef.current.submit()
  }
  //修改角色--确认按钮
  handleAuthOk = async ()=>{
    const {_id,checkedKeys} = this.state
    const {username} = this.props
    //提交表单
    let result = await reqRoleUpdate({_id,menus:checkedKeys,auth_name:username})
    const {data,status} = result
    if(status === 0 ){
      console.log(data)
      this.setState({isShowAuth:false})
      this.getRoleList()
    }else{
      message.error("更新用户权限失败")
    }
  }
  //获取角色列表
  getRoleList = async()=>{
    let result = await reqRoleList()
    const {data,status} = result
    if(status === 0){
      this.setState({
        roleList:data
      })
    }else{
      message.error("获取角色列表失败")
    }
  }
  //表单验证成功
  onFinish = async (values) =>{
    let result = await reqAddRole(values.RoleName)
    const {status} = result
    if(status===0){
      this.getRoleList()
    }else{
      message.error("添加角色失败")
    }

    // this.formRef.current.resetFields()//重置表单
  }
  //表单验证失败
  onFinishFailed = (errorInfo)=>{
    message.error(errorInfo.errorFields[0].errors)
  }

  // onExpand = (expandedKeys) => {
  //   console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
  //   // or, you can remove all expanded children keys.
  //   this.setState({
  //     expandedKeys,
  //     autoExpandParent:false
  //   })
  // };

  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
  }
  showAuth = (id)=>{
    const {roleList} = this.state
    let result = roleList.find((item)=>{
      return item._id === id
    })
    if(result){
      this.setState({
        checkedKeys:result.menus
      })
    }
    this.setState({isShowAuth:true,_id:id})
  }
  // onSelect = (selectedKeys, info) => {
  //   console.log('onSelect', info);
  //   this.setState({
  //     selectedKeys
  //   })
  // };

  componentDidMount () {
    //获取角色列表
    this.getRoleList()
  }

  render() {
    const {isShowAdd, isShowAuth} = this.state
    
    const columns = [
      {
        title:'角色名称',
        dataIndex:'name',
        key:'name'
      },
      {
        title:'创建时间',
        dataIndex:'create_time',
        key:'create_time',
        render:(time)=>{
          return(
            dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss')
          )
        }
      },
      {
        title:'授权时间',
        dataIndex:'auth_time',
        key:'auth_time',
        render:(time)=>{
          return(
            time?dayjs(time).format('YYYY年 MM月DD日 HH:mm:ss'):''
          )
        }
      },
      {
        title:'授权人',
        dataIndex:'auth_name',
        key:'auth_name'
      },
      {
        title:'操作',
        key:'option',
        render:(item)=>{
          return(
            <Button type='link' onClick={()=>{this.showAuth(item._id)}}>设置权限</Button>
          )
        }
      },
    ]
    const title = (
      <span>
        <Button type='primary' onClick={() =>{
          this.formRef.current.resetFields()
          this.setState({isShowAdd: true})
        }}>
          <PlusOutlined />
          创建角色
        </Button>
      </span>
    )
    return (
      <Form 
        style={{height:'100%'}}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        ref={this.formRef}
      >
        <Card title={title} >
          <Table
            bordered
            rowKey='_id'
            dataSource={this.state.roleList}
            columns={columns}
            size='small'
            pagination={{defaultPageSize: PAGE_SIZE}}
          />
          <Modal 
            title="添加角色"
            visible={isShowAdd}
            onOk={this.handleOk} 
            onCancel={()=>{
              this.setState({isShowAdd: false})
            }}
            okText='确定'
            cancelText='取消'
          >
            <Form.Item
              name='RoleName'
              rules={[
                {required: true,message: '请输入角色名称!'}
              ]}
            >
              <Input placeholder='请输入角色名称' />
            </Form.Item>
          </Modal>
          {/* 设置权限提示框 */}
          <Modal
            title="设置角色权限"
            visible={isShowAuth}
            onOk={this.handleAuthOk}
            onCancel={() => {
              this.setState({isShowAuth: false})
            }}
          >
            <Tree
              checkable
              // onExpand={this.onExpand}
              // expandedKeys={this.state.expandedKeys}
              // autoExpandParent={this.state.autoExpandParent}
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys}
              // onSelect={this.onSelect}
              // selectedKeys={this.state.selectedKeys}
              defaultExpandAll
              treeData={this.state.menuList}
            />
          </Modal>
        </Card>
      </Form>
    )
  }
}
export default Role