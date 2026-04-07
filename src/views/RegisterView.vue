<script setup>
import { config } from '../config'
const baseURL = config.baseURL
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { service } from '../utils/request'


const router = useRouter()
const form = ref({ username: '', password: '' })

const register = async () => {
  try {
    await service.post(`/register`, form.value)
    alert('注册成功！请登录')
    router.push('/login')
  } catch (err) {
    const msg = err.response?.data?.detail || '注册失败'
    alert(msg)
  }
}
</script>

<template>
  <div class="register-page">
    <div class="register-card">
      <h2>创建账户</h2>
      <p>快速注册你的待办清单账户</p>

      <input v-model="form.username" placeholder="用户名" />
      <input v-model="form.password" type="password" placeholder="密码" />

      <button class="btn-primary" @click="register">注册</button>
      <button class="btn-second" @click="router.push('/login')">已有账号？返回登录</button>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
}

.register-card {
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

.register-card h2 {
  margin: 0;
  font-size: 24px;
  color: #1d2129;
}

.register-card p {
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