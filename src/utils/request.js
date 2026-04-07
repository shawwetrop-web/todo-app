import axios from 'axios'
import { useUserStore } from '../stores/user'

const service = axios.create({
  baseURL: 'https://todo-backend-production-e0b1.up.railway.app/api', 
  timeout: 5000 
})

// 请求拦截器
service.interceptors.request.use(config => {
  const userStore = useUserStore()
  // 从 Pinia 拿 token
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

service.interceptors.response.use(
  response => {
    // 成功拿到数据
    return response
  },
 error => {
  if (error.response?.status === 401) {
    const userStore = useUserStore()
    userStore.clearToken()
    window.location.href = '/login'
  }
  return Promise.reject(error)
}
)

export default service