<script setup>
import { useRouter } from 'vue-router'
import { useMessageStore } from '../stores/messageStore.js'

const router = useRouter()
const store = useMessageStore()

const users = []
const seen = new Set()
for (const msg of store.messages) {
  if (!seen.has(msg.username)) {
    seen.add(msg.username)
    users.push({ username: msg.username, firstName: msg.firstName, lastName: msg.lastName })
  }
}

function login(user) {
  localStorage.setItem('currentUser', JSON.stringify(user))
  router.push('/messenger')
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Log in</h1>
      <p class="subtitle">Select your account to continue</p>

      <div class="user-options">
        <button v-for="user in users" :key="user.username" class="user-option" @click="login(user)">
          <span class="user-info">
            <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
            <span class="user-handle">@{{ user.username }}</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
  background: #fff;
  border-radius: 20px;
  padding: 48px 40px;
  width: 380px;
  text-align: center;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition:
    transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.login-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.2),
    0 12px 30px rgba(0, 0, 0, 0.15);
}

h1 {
  margin: 0 0 4px;
  font-size: 28px;
  color: #2d3748;
  font-weight: 700;
}

.subtitle {
  color: #718096;
  font-size: 14px;
  margin: 0 0 32px;
}

.user-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-option {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  background: #f7fafc;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.15s,
    box-shadow 0.2s;
  text-align: left;
}

.user-option:hover {
  border-color: #667eea;
  background: #eef2ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

/* .user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
} */

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 15px;
  font-weight: 600;
  color: #2d3748;
}

.user-handle {
  font-size: 12px;
  color: #a0aec0;
}
</style>
