import React, { Component } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState,ContentState,convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class Rich_text extends Component {
  state={
    editorState:EditorState.createEmpty()//构建一个初始化状态的编辑器和状态
  }
  onEditorStateChange = (editorState)=>{
    this.setState({
      editorState
    })
  }
  getRichText = ()=>{
    const {editorState} = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }
  setRichText = (data)=>{
    const contentBlock = htmlToDraft(data)
    if(contentBlock){
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({editorState})
    }
  }
  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          editorStyle={{
            border:'1px solid red',
            paddingLeft:'10px',
            lineHeight:'10px',
            minHeight:'200px'
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea disabled value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}/>
      </div>
    )
  }
}
