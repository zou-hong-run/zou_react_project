import React, { Component } from 'react'
import { Button, Card,Table,message,Modal,Form,Input } from 'antd';
import {PlusSquareOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {createSaveCategoryAction} from '../../redux/actions/category_action';
import {reqCategory,reqAddCatetory,reqUpdateCatetory} from '../../api/index';
import {PAGE_SIZE} from '../../config/index';
@connect(
  state=>({}),
  {
    saveCategoryList:createSaveCategoryAction
  }
)
class Category extends Component {
  formRef = React.createRef();
  state = {
    list:[],//商品分类列表
    visible:false,//控制弹窗的展示或隐藏
    operType:'',//操作类型（新增还是修改）
    modalCurrentInfo:'',//模态框具体显示的值
  }
  componentDidMount(){
    this.getList()
  }
  //获取分类列表
  getList = async ()=>{
    let result = await reqCategory()
    const {status,data,msg} = result
    if(status===0) {
      //将获取到的data存入redux
      this.props.saveCategoryList(data)
      this.setState({list:data.reverse()})
    }
    else message.error(msg)
  }
  //展示添加弹窗
  showAdd = () => {
    this.setState({
      visible:true,
      operType:'add'
    })
  }
  //展示修改弹窗
  showUpdate = (e) => {
    this.setState({
      visible:true,
      operType:'update',
      modalCurrentInfo:e,
    },()=>{
      this.formRef.current.resetFields()//重置表单
    })
  }
  //点击确认
  handleOk = () => {
    const {operType} = this.state
    if(operType==='add'){
      this.formRef.current.submit()
    }
    if(operType==='update'){
      this.formRef.current.submit()
    }
  }
  //点击取消
  handleCancel = () => {
    this.setState({
      visible:false
    })
  }
  //表单验证成功
  onFinish = async (values) =>{
    if(this.state.operType==='add'){
        //发送添加分类请求
      let result = await reqAddCatetory(values.categoryName)
      const {status,data,msg} = result
      if(status === 0){
        message.success('新增成功')
        const list = [...this.state.list]
        list.unshift(data)
        this.setState({
          list
        })
      }else{
        message.error(msg)
      }
    }
    if(this.state.operType==='update'){
      const {_id} = this.state.modalCurrentInfo
      //发送更新分类请求
      let result = await reqUpdateCatetory(_id,values.categoryName)
      const {status,msg} = result
      if(status===0){
        message.success('更改分类成功')
        this.getList()
      }else{
        message.error(msg)
      }
    }
    //如果没有错误才关闭弹窗
    this.setState({
      visible:false
    })
    this.formRef.current.resetFields()//重置表单
  }
  //表单验证失败
  onFinishFailed = (errorInfo)=>{
    message.error(errorInfo.errorFields[0].errors)
    this.formRef.current.resetFields()//重置表单
  }
  render() {
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        // dataIndex: 'name',//这边写啥，render传啥,不写，传递数组
        render:(e)=>{
          return (<Button type='link' onClick={()=>{this.showUpdate(e)}}>修改分类</Button>)
        },
        key: '_id',
        width:'25%',
        align:'center'
      }
    ];
    return (
      <Form
            {...this.layout}
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            className='form'
            ref={this.formRef}
            initialValues={{
              categoryName:this.state.modalCurrentInfo.name
            }}
            style={{height:'100%'}}
      >
        <Card 
        title="" 
        extra={<Button type='primary' onClick={()=>{this.showAdd()}} ><PlusSquareOutlined />添加</Button>}
        style={{height:'100%'}}
        >
          <Table 
            dataSource={this.state.list} 
            columns={columns} 
            bordered={true} 
            rowKey='_id' 
            pagination={{pageSize:PAGE_SIZE}}
            size='small'
          />
        </Card>
        <Modal 
          title= {this.state.operType==='add'?'添加分类':'修改分类'}
          visible={this.state.visible} 
          onOk={this.handleOk} 
          onCancel={this.handleCancel}
          okText='确定'
          cancelText='取消'
        >
          <Form.Item
            // label="用户名"
            name='categoryName'
            rules={[
              {required: true,message: '请输入分类内容!'}
            ]}
            // initialValue={this.state.modalCurrentValue}
          >
            <Input placeholder='请输入分类名' />
          </Form.Item>
        </Modal>
      </Form>
    )
  }
}
export default Category