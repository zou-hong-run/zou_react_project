import React, { Component } from 'react'
import {connect} from 'react-redux';
import { Button, Card,List, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
// import InfiniteScroll from 'react-infinite-scroller';
import {reqProductList,reqCategory} from '../../api/index';

@connect(
  state=>({productList:state.productList,categoryList:state.categoryList}),
  {}
)
class Detail extends Component {
  state={
    categoryId:'',
    desc:'',
    detail:'',
    imgs:'',
    name:'',
    price:'',
  }
  componentDidMount(){
    let {id} = this.props.match.params
    let reduxProdList = this.props.productList
    let reduxCategoryList = this.props.categoryList
    if(reduxProdList){
      //通过id筛选单个商品信息出来
      let result = reduxProdList.find((item)=>{
        return item._id === id
      })
      // let {categoryId,desc,detail,imgs,name,price} = result
      // this.setState({categoryId,desc,detail,imgs,name,price,})
      this.categoryId = result.categoryId//setState是异步的，现存现取，拿不到任何东西，所以存在自身
      this.pCategoryId = result.pCategoryId
      this.setState({...result})
    }else{
      //刷新后redux里面没有东西，需要从新发送请求获取该页的商品详情
      this.getProdById(id)
    }
    if(reduxCategoryList){
      let result = reduxCategoryList.find((item)=>{
        if(this.pCategoryId==='0'){
          return item._id === this.categoryId
        }else{
          return item._id === this.pCategoryId
        }
      })
      this.setState({categoryId:result.name})
    }else{
      this.getCategoryList()
    }
  }
  getProdById = async (id)=>{
    // let result = await reqProdById(id)//。。。后端没写这个接口
    let result = await reqProductList(100,1)
    const {data,msg,status} = result
    if(status===0){
      let fdata = data.list.find((item)=>{
        return item._id = id
      })
      this.categoryId = fdata.categoryId//setState是异步的，现存现取，拿不到任何东西，所以存在自身
      this.pCategoryId = fdata.pCategoryId
      this.setState({...fdata})
    }else{
      message.error("根据id获取商品分类失败"+msg)
    }
  }
  getCategoryList = async ()=>{
    console.log('redux为空')
    let result = await reqCategory()
    const {status,data,msg} = result
    if(status === 0){
      let result = data.find((item)=>{
        if(this.pCategoryId==='0'){
          return item._id === this.categoryId
        }else{
          return item._id === this.pCategoryId
        }
      })
      this.setState({categoryId:result.name})
    }else message.error(msg)

  }
  render() {
    return (
      <Card 
      title={
        <div>
          <Button type="link" onClick={()=>{this.props.history.goBack()}}>
            <ArrowLeftOutlined />
            <span style={{ fontSize: '16px', margin: '0 5px' }}>
              商品详情
            </span>
          </Button>
        </div>
      } 
      style={{ height: "100%",overflow:'auto' }}>
        {/* <InfiniteScroll> */}
          <List size="large">
            <List.Item>
              <span>商品名称：</span><span>{this.state.name}</span>
            </List.Item>
            <List.Item>
              <span>商品描述：</span><span>{this.state.desc}</span>
            </List.Item>
            <List.Item>
              <span>商品价格：</span><span>{this.state.price}</span>
            </List.Item>
            <List.Item>
              <span>所属分类：</span><span>{this.state.categoryId}</span>
            </List.Item>
            <List.Item>
              <span>商品图片：</span><span style={{maxWidth:'200px'}}><img src={`/upload/${this.state.imgs}`} alt=""/></span>
            </List.Item>
            <List.Item>
              <span>商品详情：</span><span dangerouslySetInnerHTML={{__html:this.state.detail}}></span>
            </List.Item>
        </List>
        {/* </InfiniteScroll> */}
      </Card>
    )
  }
}
export default Detail