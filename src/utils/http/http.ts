import axios, {
  Method,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosInterceptorManager,
  AxiosResponse,
} from 'axios'
import qs from 'qs'
import { apiKeyType, apiKeyDataType } from '../../api/api'
import cookie from '@/utils/cookie'
import { ElMessage } from 'element-plus'
import {userLogin} from '@/utils/index'
type ResultDataType = apiKeyDataType[apiKeyType]
/*
NewAxiosInstance接口得根据自己情况来定
  interceptors属性是必须要有，因为后续要用到拦截器
  至于<T = any>(config: AxiosRequestConfig): AxiosPromise<T>这一段代码，因为我后续二次封装axios时采用的是此类型，所以我这里
  声明的是这种数据类型
*/
interface NewAxiosInstance extends AxiosInstance {
  /*
  设置泛型T，默认为any，将请求后的结果返回变成AxiosPromise<T>
  */
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse<ResultDataType>>
  }
}

//基本的初始化设置
let http: NewAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string, //因为使用的是vite构建的项目，所以这里是这么获取代理名称的，根据自己情况修改
  timeout: 3 * 1000, // 超时时间
})

// 请求拦截器
const QS_METHOD: Method[] = ['POST', 'post', 'PUT', 'put']
const GET_METHOD: Method[] = ['GET', 'get', 'DELETE', 'delete']
http.interceptors.request.use(
  (response) => {
    if (response.method && QS_METHOD.includes(response.method)) {
      // 这里只处理post请求，根据自己情况修改
      response.data = qs.stringify(response.data)
    } else if (response.method && GET_METHOD.includes(response.method)) {
      //设置GET的请求参数
      response.params = qs.parse(response.data)
      response.data = undefined
    }
    const token = cookie.getCookies('token')
    if (token) {
      response.headers.token = token
    }
    let query = 'token=' + token

    if (response.url!.indexOf('?') == -1) {
      response.url += '?' + query
    } else {
      response.url += '&' + query
    }
    return response
  },
  (error) => {
    return error
  }
)

//响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.data.code === 0 || response.data.status === 0) {
      return Promise.resolve(response)
    } else {
      ElMessage({message:response.data.msg,type:'error'})
      if(response.data.code==='429'){
        userLogin()
      }
    }
  },
  (error) => {
    return error
  }
)

export default http
