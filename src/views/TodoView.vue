<script setup>
import { config } from '../config'
const baseURL = config.baseURL
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const todoList = ref([])
const newContent = ref('')

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const getTodoList = async () => {
  try {
    const res = await axios.get(`${baseURL}/todo/list`)
    todoList.value = res.data
  } catch (err) {
    alert('请先登录')
    router.push('/login')
  }
}

const addTodo = async () => {
  if (!newContent.value) return
  await axios.post(`${baseURL}/api/todo/add`, { content: newContent.value })
  getTodoList()
  newContent.value = ''
}

const deleteTodo = async (id) => {
  await axios.delete(`${baseURL}/api/todo/delete/${id}`)
  getTodoList()
}

const updateStatus = async (id) => {
  await axios.put(`${baseURL}/api/todo/update/${id}`)
  getTodoList()
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(() => getTodoList())
</script>

<template>
  <div class="todo-page">
    <div class="todo-container">
      <div class="todo-header">
        <h1>我的待办</h1>
        <button class="logout-btn" @click="logout">退出登录</button>
      </div>

      <div class="add-box">
        <input v-model="newContent" placeholder="输入新的待办事项..." />
        <button class="add-btn" @click="addTodo">添加</button>
      </div>

      <div class="todo-list">
        <div class="todo-item" v-for="item in todoList" :key="item.id">
          <input type="checkbox" :checked="item.done" @click="updateStatus(item.id)" />
          <span :class="{ done: item.done }">{{ item.content }}</span>
          <button class="del-btn" @click="deleteTodo(item.id)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%);
  padding: 60px 20px;
}

.todo-container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.todo-header h1 {
  margin: 0;
  font-size: 26px;
  color: #1d2129;
}

.logout-btn {
  padding: 10px 16px;
  background: #f7f8fa;
  color: #4e5969;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.add-box {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.add-box input {
  flex: 1;
  padding: 16px;
  border: 1px solid #e5e6eb;
  border-radius: 12px;
  font-size: 15px;
  outline: none;
}

.add-box input:focus {
  border-color: #409eff;
}

.add-btn {
  padding: 0 20px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  white-space: nowrap;
  cursor: pointer;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 12px;
}

.todo-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  transform: scale(1.1);
}

.todo-item span {
  flex: 1;
  font-size: 15px;
  color: #1d2129;
}

.todo-item span.done {
  text-decoration: line-through;
  color: #86909c;
}

.del-btn {
  padding: 8px 12px;
  background: #ff7875;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}
</style>