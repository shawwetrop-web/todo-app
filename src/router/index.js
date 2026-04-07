import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TodoView from '../views/TodoView.vue'

// 导入 Pinia
import { useUserStore } from '../stores/user'

const routes = [
  { path: '/', redirect: '/login' },   
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/todo', component: TodoView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from) => {
  // 从 Pinia 拿 token（标准写法）
  const userStore = useUserStore()
  const token = userStore.token

  // 白名单
  const whiteList = ['/login', '/register']

  // 没有 token 且 不在白名单 → 跳登录
  if (!token && !whiteList.includes(to.path)) {
    return '/login'
  }
})
export default router