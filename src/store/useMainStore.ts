import { defineStore } from 'pinia'
import cookie from '@/utils/cookie'
import axios from '@/api/axios'
import { asyncRoute } from '@/router'
import i18n from '@/language/i18n'
interface MenuList {
  path: string
  children: MenuList[]
  meta: {
    title: string
    icon?: string
  }
}
interface MainState {
  language: string
  name: string
  menuList: MenuList[]
}

const useMainStore = defineStore('main', {
  state: (): MainState => {
    return {
      language: cookie.getCookies('language') || 'zh',
      name: '',
      menuList: [],
    }
  },
  getters: {},
  actions: {
    setLanguages(lang: string) {
      this.language = lang
      i18n.global.locale.value = lang
      cookie.setCookies('language', lang, 'Session')
    },
    async getSystemMenu() {
      const res = await axios({
        url: 'getMenu',
        method: 'POST',
        responseType: 'json',
      })
      if (res.status === 0) {
        const fn = (arr1, arr2) => {
          let list: MenuList[] = []
          arr1.map((item) => {
            arr2.map((ele) => {
              if (ele.meta.title === item.name) {
                if (item.itemList && ele.children) {
                  ele.children = fn(item.itemList, ele.children)
                }
                list.push(ele)
              }
            })
          })
          return list
        }
        this.menuList = fn(res.data.list, asyncRoute)
        this.name = res.data.userName
      }
    },
    async logOut (){
      const res = await axios({
        url:'logOut',
        method:'POST',
        responseType: 'json',
      })
      console.log(res);
    }
  },
})

export default useMainStore
