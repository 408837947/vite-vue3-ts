import { MenuList } from "./type";
/**
 * @description: 所有的接口列表
 * @param {*} 无参数
 * @return {*} 无返回值
 * ```js
 * key表示url路径缩写
 * value表示真实请求的路径
 * ```
 */
 const apiList = {
  'getMenu': '/api/main/home',
  'logOut':'/login/logout'
}
/**
 * @description: 所有的接口列表类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export type apiKeyType = keyof typeof apiList;
/**
 * @description: 接口对应的数据返回值类型
 * @param {*} 无参数
 * @return {*} 无返回值
 */
export interface apiKeyDataType {
  'getMenu': {
    code?: number|string;
    status?: number|string;
    data: {
      userName: string;
      role:string;
      list:Array<MenuList>
    },
    msg:string
  },
  'logOut':{
    code?:number|string
    status?:number|string
    data:Object
    msg:string
  }
}

export default apiList;
