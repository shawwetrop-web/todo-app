import axios from 'axios'
import { useUserStore } from '@/stores/user'

const service = axios.create({
  baseURL: '/api', 
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
    return response.data
  },
  error => {
    // 统一处理错误
    return Promise.reject(error)
  }
)

export default service