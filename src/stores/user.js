import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),

  actions: {
    // 登录时保存 token
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    // 退出时清除 token
    clearToken() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})