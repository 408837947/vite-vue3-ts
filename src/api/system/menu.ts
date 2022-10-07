import http from '@/utils/http/http'

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
  const res = http.post('/api/main/home', params)
  return http.post('/api/main/home', params)
}
