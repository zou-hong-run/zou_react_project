import React, { Component } from 'react'
import { Card, Button, Form, Select, message,Input } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import {reqCategory,reqAddProduct,reqProductList,reqUpdateProduct} from '../../api/index';
import {connect} from 'react-redux';
import PictureWall from './picture_wall';
import RichText from './rich_text';
const { Option } = Select;
@connect(
  state=>(
    {categoryList:state.categoryList,
     productList:state.productList
    }
  ),
  {}
)
class Add_update extends Component {
  formRef = React.createRef();
  state = {
    categoryList:[],//商品分类列表
    operaType:'add',
    categoryId:'',
    pCategoryId:'', 
    name:'',        
    desc:'',        
    price:'',       
    detail:'',     
    imgs:[],
    _id:''     
  }
  componentDidMount(){
    const {id} = this.props.match.params
    if(id){
      this.setState({
        operaType:'update'
      })
      if(this.props.productList.length){
        let result = this.props.productList.find((item)=>{
          return item._id === id
        })
        this.setState({...result},()=>{
          this.formRef.current.resetFields()//重置表单
        })
        this.picWall.setFileList(result.imgs)
        this.richText.setRichText(result.detail)
        
      }else{
        //发送请求获取商品列表
        this.getProducList(id)
      }
    }

    if(this.props.categoryList.length){
      this.setState({
        categoryList:this.props.categoryList
      })
    }else{
      //由于redux刷新之后没有了，所以需要重新发送请求获取数据
      this.getCategoryList(id)
    }
  }
  layout = {
    labelCol: {
      span: 24,
      offset:0
    },
    wrapperCol: {
      span: 10,
      offset:3
    },
  };
  tailLayout = {
    wrapperCol: {
      offset: 7,
      span: 10,
    },
  };
  //获取商品列表
  getProducList = async (id)=>{
    let result = await reqProductList(100,1)
    const {status,data} = result
    if(status === 0){
      let result = data.list.find((item)=>{
        return item._id === id
      })
      this.setState({...result})
      this.picWall.setFileList(result.imgs)
      this.richText.setRichText(result.detail)
      this.formRef.current.resetFields()//重置表单
    }else{
      message.error('获取商品列表失败')
    }
  }
  //获取商品分类
  getCategoryList = async ()=>{
      let result = await reqCategory()
      const {status,data,msg} = result
      if(status===0){
        this.setState({
          categoryList:data
        })
      }else{
        message.error(msg)
      }
  }
  onFinish = async (values) => {
    const {operaType,_id} = this.state
    //从上传组件中获取已经上传的图片数组
    let imgs = this.picWall.getImgArr()
    //从富文本中获取用户输入的文字转换为富文本的字符串
    let detail = this.richText.getRichText()
    // console.log('Success:', {...values,imgs,detail});
    //发送请求添加商品
    let result
    if(operaType==='add'){
      result = await reqAddProduct({...values,imgs,detail,pCategoryId:'0'})
    }else{
      result = await reqUpdateProduct({...values,imgs,detail,pCategoryId:'0',_id})
    }
    const {status} = result
    if(status === 0){
      // console.log(data)
      message.success('操作成功')
      this.props.history.replace('/admin/prod_about/product')
    }else{
      message.error('操作失败')
    }

  };

  onFinishFailed = (errorInfo) => {
    message.error('请填写完整内容')
  };
  render() {
    return (
      <Card
        title={
          <div>
            <Button type="link" onClick={() => { this.props.history.goBack() }}>
              <ArrowLeftOutlined />
              <span style={{ fontSize: '16px', margin: '0 5px' }}>
                {this.state.operaType==='add' ? '商品添加' : '商品修改'}
              </span>
            </Button>
          </div>
        }
        style={{ height: "100%", overflow: 'auto' }}
      >
        <Form
          {...this.layout}
          ref={this.formRef}
          name="basic"
          initialValues={{
            categoryId:this.state.categoryId||'',
            pCategoryId:this.state.pCategoryId||'',
            desc:this.state.desc||'',
            detail:this.state.detail||'',
            imgs:this.state.imgs||'',
            name:this.state.name||'',
            price:this.state.price||'',
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入内容!',
              },
            ]}
          >
            <Input placeholder="商品名称"/>
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="desc"
            rules={[
              {
                required: true,
                message: '请输入内容!',
              },
            ]}
          >
            <Input placeholder="商品描述"/>
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="price"
            rules={[
              {
                required: true,
                message: '请输入内容!',
              },
            ]}
          >
            <Input type='number' addonAfter="￥" addonBefore="RMB" />
          </Form.Item>
          <Form.Item
            label="商品分类"
            name="categoryId"
            rules={[
              {
                required: true,
                message: '请输入内容!',
              },
            ]}
          >
            <Select>
              <Option value="">请选择分类</Option>
              {
                this.state.categoryList.map((item)=>{
                  return <Option key={item._id} value={item._id}>{item.name}</Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset:3,
              span: 20,
            }}
            label="商品图片"
            // name="imgs"
            rules={[
              {
                required: true,
                message: '请输入内容!',
              },
            ]}
          >
            <PictureWall ref={picWall=>this.picWall = picWall}/>
          </Form.Item>
          <Form.Item
            label="商品详情"
            // name="detail"
            rules={[
              {
                required: true,
                message: '请输入内容!',
              },
            ]}
          >
            <RichText ref={r=>{this.richText = r}}/>
          </Form.Item>
          <Form.Item {...this.tailLayout}>
            <Button type="primary" style={{width:'100%'}} htmlType="submit">
              添加商品
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
export default Add_update
