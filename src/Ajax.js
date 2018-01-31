import axios from 'axios'
import Qs from 'qs'
// ajax对象基本设置
const Ajax = axios
axios.defaults.timeout = 10000,
axios.defaults.responseType = 'json',
axios.defaults.method = 'post'
// cookie跨域
// if(process.env.NODE_ENV === 'development') {
//   axios.defaults.withCredentials = true
// }
axios.defaults.transformRequest = [function (data,header) {
  if(typeof data === 'object') {
    header['Content-Type'] = 'application/x-www-form-urlencoded'
    data =Qs.stringify(data)
  }else{
    header['Content-Type'] = 'application/json'
  }
  return data
}]
export default Ajax
