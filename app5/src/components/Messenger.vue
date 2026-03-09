<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '../stores/messageStore.js'

const router = useRouter()
const store = useMessageStore()

const currentUser = JSON.parse(localStorage.getItem('currentUser'))

if (!currentUser) {
  router.push('/')
}

const newMessageText = ref('')

const userName = computed(() => (currentUser ? currentUser.firstName : ''))

function sendMessage() {
  const text = newMessageText.value.trim()
  if (text && currentUser) {
    store.addMessage(currentUser.username, currentUser.firstName, currentUser.lastName, text)
    newMessageText.value = ''
  }
}

function redact(index) {
  store.redactMessage(index)
}

function unredact(index) {
  store.unredactMessage(index)
}

function logout() {
  localStorage.removeItem('currentUser')
  router.push('/')
}

function isOwn(msg) {
  return currentUser && msg.username === currentUser.username
}
</script>

<template>
  <div class="messenger-page">
    <header class="messenger-header">
      <div class="header-left">
        <h2>CHAT</h2>
      </div>
      <div class="header-right">
        <span class="user-badge">{{ userName }}</span>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </header>

    <div class="messages-container">
      <div
        v-for="(msg, index) in store.messages"
        :key="index"
        class="message-row"
        :class="{ own: isOwn(msg), other: !isOwn(msg) }"
      >
        <div class="message-bubble">
          <div class="message-author">{{ msg.firstName }}</div>
          <div class="message-text">
            <template v-if="msg.redacted">
              <span class="redacted-text">message redacted</span>
            </template>
            <template v-else>
              {{ msg.message }}
            </template>
          </div>
          <div v-if="isOwn(msg)" class="message-actions">
            <button v-if="!msg.redacted" class="action-btn redact-btn" @click="redact(index)">
              Redact
            </button>
            <button v-else class="action-btn unredact-btn" @click="unredact(index)">
              Unredact
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="input-bar">
      <input
        v-model="newMessageText"
        type="text"
        placeholder="Type a message..."
        @keyup.enter="sendMessage"
      />
      <button class="send-btn" :disabled="!newMessageText.trim()" @click="sendMessage">
        Send
      </button>
    </div>
  </div>
</template>

<style scoped>
.messenger-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.messenger-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: transparent;
  color: white;
  box-shadow: none;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-left h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
}

.header-icon {
  font-size: 24px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.15s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-row {
  display: flex;
}

.message-row.own {
  justify-content: flex-end;
}

.message-row.other {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 65%;
  padding: 10px 16px;
  border-radius: 18px;
  position: relative;
  word-wrap: break-word;
}

.message-row.own .message-bubble {
  background: #4a6cf7;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-row.other .message-bubble {
  background: white;
  color: #2d3748;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.message-author {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  opacity: 0.7;
}

.message-text {
  font-size: 14px;
  line-height: 1.5;
}

.redacted-text {
  opacity: 0.5;
  letter-spacing: 2px;
}

.message-actions {
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
}

.action-btn {
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition:
    opacity 0.2s,
    transform 0.15s;
}

.action-btn:hover {
  transform: translateY(-1px);
}

.redact-btn {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

.unredact-btn {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

.input-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: #000;
  border-top: 1px solid #333;
}

.input-bar input {
  flex: 1;
  padding: 12px 18px;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.input-bar input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
}

.send-btn {
  padding: 12px 24px;
  background: #4a6cf7;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.15s;
}

.send-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
