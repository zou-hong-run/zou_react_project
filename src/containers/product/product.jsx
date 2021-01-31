import React, { Component } from 'react'
import {Table,Button,Card,Select,Input,message} from 'antd';
import {PlusSquareOutlined,FileSearchOutlined} from '@ant-design/icons';
import {PAGE_SIZE} from '../../config/index'
import {reqProductList,reqUpdateProductStatus} from '../../api/index';
const {Option} = Select
export default class Product extends Component {
  state = {
    productList:[],//商品列表数据
    total:'',//商品总条数
    current:1//显示第几页
  }
  componentDidMount(){
    this.getProductList()
  }
  //select选择器
  handleChange = (value)=>{
    console.log(`selected ${value}`);
  }
  //得到商品列表
  getProductList = async (current=1)=>{
    let result = await reqProductList(PAGE_SIZE,current)//每页多少条数据，当前为第几页
    const {status,data,msg} = result
    // console.log(data)
    if(status===0){
      this.setState({
        productList:data.list,
        total:data.total,
        current:current
      })
    }else{
      message.error(msg)
    }
  }
  //更新商品上架状态
  updateProductStatus = async ({_id,status})=>{
    let productList = [...this.state.productList]
    //获取原来的状态然后取反
    if(status===1) status = 2
    else status = 1
    //得到id发起更改状态请求
    const result = await reqUpdateProductStatus(_id,status)
    if(result.status===0){
      message.success('更改商品状态成功')
      productList = productList.map((item)=>{
        if(item._id === _id){
          item.status = status
        }
        return item
      })
      this.setState({
        productList:productList
      })
    }else{
      message.error('更改商品状态失败')
    }
  }
  render() {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width:'15%',
        align:'left'
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        align:'left'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width:'15%',
        render:(price)=>{
          return "￥"+price
        },
        align:'center'
      },
      {
        title: '状态',
        // dataIndex: 'status',
        key: 'status',
        width:'25%',
        render:(item)=>{
          return(
            <div>
              <Button type="text" size='small'>{item.status===1?"已在售":"已下架"}</Button>
              <Button 
                type={item.status===1?"danger":"primary"} 
                size='small'
                onClick={()=>{this.updateProductStatus(item)}}
              >
                {item.status===1?"点击商品下架":"点击商品上架"}
              </Button>
            </div>
          )
        },
        align:'center'
      },
      {
        title: '操作',
        dataIndex: 'opera',
        key: 'opera',
        width:'25%',
        render:(opera)=>{
          return(
            <div>
              <Button type='link' size='small'>详情</Button>
              <Button type='link' size='small'>修改</Button>
            </div>
          )
        },
        align:'center'
      },
    ];
    
    return (
      <Card 
        title={
          <>
            <Select defaultValue="name" onChange={this.handleChange}>
              <Option value="name">按名称搜索</Option>
              <Option value="desc">按描述搜索</Option>
            </Select>
            <Input placeholder="请输入商品关键字...." allowClear='true' style={{width:250,margin:'0 10px'}} />
            <Button type='primary'><FileSearchOutlined />搜索</Button>
          </>
        } 
        extra={<Button type='primary'><PlusSquareOutlined/>添加商品</Button>} 
        style={{height:"100%"}}
      
      >
        <Table 
          dataSource={this.state.productList} 
          columns={columns} 
          bordered={true} 
          pagination={{
            pageSize:PAGE_SIZE,
            total:this.state.total,
            current:this.state.current,
            onChange:this.getProductList
          }}
          size="middle"
          rowKey="_id"
        />
      </Card>
    )
  }
}
