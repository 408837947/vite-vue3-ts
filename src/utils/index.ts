const modules = import.meta.globEager('/public/assets/**/*.*')
export const getImageUrl = (url: string) => {
  const path = `/public/assets/${url}`
  return modules[path].default
  // return new URL(`../assets/${url}`, import.meta.url).href
}
// 跳转登录页
export const userLogin = () => {
  const host = window.location.href.split('index.html')[0]
  // window.location.href =
  //   'http://172.20.62.122:7000/operator/index.html#/login?url=' +
  //   encodeURIComponent(host)
}
