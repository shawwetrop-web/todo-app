<script setup>
import { config } from '../config'
const baseURL = config.baseURL
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const router = useRouter()
const loginForm = ref({ username: '', password: '' })

// 🔥 关键修复：进入登录页强制清空脏数据，永不空白
onMounted(() => {
  try {
    userStore.clearToken()
    localStorage.clear()
    sessionStorage.clear()
  } catch (e) {}
})

const login = async () => {
  try {
    const res = await axios.post(`${baseURL}/login`, loginForm.value)
    userStore.setToken(res.data.access_token)
    alert('登录成功')
    router.push('/todo')
  } catch (err) {
    const msg = err.response?.data?.detail || '登录失败'
    alert(msg)
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h2>欢迎回来</h2>
      <p>登录你的待办清单账户</p>

      <input v-model="loginForm.username" placeholder="请输入用户名" />
      <input v-model="loginForm.password" type="password" placeholder="请输入密码" />

      <button class="btn-primary" @click="login">登录</button>
      <button class="btn-second" @click="router.push('/register')">没有账号？去注册</button>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 40px 32px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-card h2 {
  margin: 0;
  font-size: 24px;
  color: #1d2129;
}

.login-card p {
  margin: 0 0 8px 0;
  color: #4e5969;
  font-size: 14px;
}

input {
  padding: 14px 16px;
  border: 1px solid #e5e6eb;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: #409eff;
}

.btn-primary {
  padding: 14px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-primary:hover {
  background: #338eff;
}

.btn-second {
  padding: 14px;
  background: #f7f8fa;
  color: #4e5969;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
}

.btn-second:hover {
  background: #e5e6eb;
}
</style>