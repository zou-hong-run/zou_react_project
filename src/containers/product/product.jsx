import React, { Component } from 'react'
import {connect} from 'react-redux';
import {createSaveProductAction} from '../../redux/actions/product_action';
import {Table,Button,Card,Select,Input,message} from 'antd';
import {PlusSquareOutlined,FileSearchOutlined} from '@ant-design/icons';


import {PAGE_SIZE} from '../../config/index'
import {reqProductList,reqUpdateProductStatus,reqProductSearch} from '../../api/index';
const {Option} = Select
@connect(
  state=>({}),
  {
    saveProduct:createSaveProductAction
  }
)
class Product extends Component {
  state = {
    productList:[],//商品列表数据
    total:'',//商品总条数
    current:1,//显示第几页
    keyWord:'',//搜索关键字
    searchType:'productName'//搜索类型
  }
  componentDidMount(){
    this.getProductList()
  }
  //得到商品列表
  getProductList = async (current=1)=>{
    let result
    if(this.isSearch){
      const {searchType,keyWord} = this.state
      result = await reqProductSearch(PAGE_SIZE,1,searchType,keyWord)
    }else{
      result = await reqProductList(PAGE_SIZE,current)//每页多少条数据，当前为第几页
    }
    const {status,data,msg} = result
    if(status===0){
      this.setState({
        productList:data.list,
        total:data.total,
        current:current
      })
      //把获取到的商品列表存放到redux里面，方便后面获取单项商品信息，而不用再次发送请求
      this.props.saveProduct(data.list)
    }else{
      message.error(msg)
    }
  }
  //发起搜索请求
  search = async ()=>{
    this.isSearch = true
    this.getProductList()
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
        // dataIndex: 'opera',
        key: 'opera',
        width:'25%',
        render:(opera)=>{
          return(
            <div>
              <Button type='link' size='small' onClick={()=>{this.props.history.push('/admin/prod_about/product/detail/'+opera._id)}}>详情</Button>
              <Button type='link' size='small' onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update/123')}}>修改</Button>
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
            <Select defaultValue="productName" onChange={
              (value)=>{
                this.setState({
                  searchType:value
                })
              }
            }>
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input 
              onChange={(event)=>{
                this.setState({
                  keyWord:event.target.value
                })
              }} 
              placeholder="请输入商品关键字...." 
              allowClear='true' 
              style={{width:250,margin:'0 10px'}} 
            />
            <Button type='primary' onClick={this.search}><FileSearchOutlined />搜索</Button>
          </>
        } 
        extra={<Button type='primary' onClick={()=>{this.props.history.push('/admin/prod_about/product/add_update')}}><PlusSquareOutlined/>添加商品</Button>} 
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
export default Product