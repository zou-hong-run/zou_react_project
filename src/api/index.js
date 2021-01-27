import axios from "axios";
export const reqLogin = (values)=>{
  axios.post('http://localhost:3000/login',values)
    .then((data)=>{
      console.log(data.data)
      if(data.data.status===0){
        
      }else{
        this.onFinishFailed(data.data.msg)
      }
    })
    .catch((err)=>{
      console.log("@",err)
    })
}