import {connect} from "react-redux";
import Counter from "../components/counter";
import {increment,decrement,asyncIncrement} from '../redux/actions/count_action_creator'
// function mapStateToProps(state) {
//   return {count:state}
// }
// function mapDispatchToProps(dispatch) {
//   return{
//     // increment:(value)=>{dispatch(increment(value))},
//     // decrement:(value)=>{dispatch(decrement(value))},
//   }
// }
export default connect(
  state=>({count:state.countReducer}),
  {
    increment:increment,
    decrement:decrement,
    asyncIncrement:asyncIncrement
  }
  )(Counter)
