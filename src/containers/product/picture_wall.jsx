import React,{Component} from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {BASE_URL} from '../../config/index';
import {reqDeletePicture} from '../../api/index';
//将图片转换为base64格式
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,//是否展示预览框
    previewImage: '',//预览图片的url或者base64地址
    previewTitle: '',//弹窗显示标题
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',//上传状态 uploading,done,removed,error
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
    ],
  };
  //从fileList中提取出所有该商品对应的图片名字，构建一个数组，供新增商品使用
  getImgArr = ()=>{
    let result = []
    this.state.fileList.forEach((item)=>{
      result.push(item.name)
    })
    return result
  }
  //回显数据
  setFileList = (imgArr)=>{
    let fileList = []
    imgArr.forEach((item,index)=>{
      fileList.push({uid:-index,name:item,url:BASE_URL+'/upload/'+item})
    })
    this.setState({fileList})
  }
  //关闭预览框
  handleCancel = () => this.setState({ previewVisible: false });
  //手动预览
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  //当用户上传图片，删除 得时候触发(图片状态发生改变)
  handleChange = async ({ fileList,file }) => {
    //文件上传成功
    if(file.status === 'done'){
      fileList[fileList.length-1].url = file.response.data.url//获取当前上传的图片信息（位于列表的最后一个）
      fileList[fileList.length-1].name = file.response.data.name
    }
    //文件删除
    if(file.status === 'removed'){
      let result = await reqDeletePicture(file.name)
      const {status} = result
      if(status === 0){
        message.success("删除图片成功")
      }else{
        message.error('删除图片失败')
      }
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}//默认发送方式为post
          name='image'//发到后台的文件参数名
          listType="picture-card"//上传图标显示样式
          fileList={fileList}//图片列表
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}