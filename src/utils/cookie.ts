import Cookies from 'js-cookie'
export default {
  setCookies(key, value, expiresTime) {
    let seconds = expiresTime
    let expires = new Date(seconds * 1000 + 1 * new Date())
    return Cookies.set(key, value, { expires: expires })
  },
  getCookies(key) {
    return Cookies.get(key)
  },
  removeCookies(key) {
    return Cookies.remove(key)
  },
}
