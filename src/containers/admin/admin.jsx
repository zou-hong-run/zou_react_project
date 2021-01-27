import React, { Component } from 'react'
import {connect} from "react-redux";
import {createDemo1Action} from "../../redux/actions/test_action";
class admin extends Component {
  render() {
    return (
      <div>
        admin
      </div>
    )
  }
}
export default connect(
  state=>({
    demo2:state.test
  }),
  {
    demo2:createDemo1Action
  }
)(admin)