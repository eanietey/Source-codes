<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()
const router = useRouter()

const nameOfUser = computed(() => {
  if (userStore.user.username) {
    const name = userStore.user.username
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
  return ''
})

function checkAuthenticated() {
  if (!userStore.user.username) {
    router.push('/login')
  }
}

onMounted(checkAuthenticated)
watch(() => userStore.user.username, checkAuthenticated)
</script>

<template>
  <div class="home">
    <h1>Welcome {{ nameOfUser }}!</h1>
  </div>
</template>

<style scoped>
.home{
  box-sizing: border-box;
  padding: 20px;
  background-color: #efeded;
  opacity: 97%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
