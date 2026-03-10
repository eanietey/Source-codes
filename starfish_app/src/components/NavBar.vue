<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const isLoggedIn = computed(() => userStore.user.username !== null)
const showLogin = computed(() => !isLoggedIn.value && route.path !== '/login')
const showLogout = computed(() => isLoggedIn.value && route.path !== '/login')

function logout() {
  localStorage.removeItem('username')
  userStore.user.username = null
  router.push('/login')
}
</script>

<template>
  <nav>
    <div>
      <RouterLink :class="[{ hidden: !isLoggedIn }, 'link']" to="/home">Home</RouterLink>
    </div>
    <div>
      <RouterLink v-if="showLogin" to="/login" class="link">Log in</RouterLink>
      <RouterLink v-if="showLogout" to="/login" class="link">
        <span @click="logout">Log out</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
nav {
  background-color: #dcdcdc;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.link {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 999px;
  color: #000;
}

.hidden {
  visibility: hidden;
}

.router-link-active {
  background-color: gray;
  color: #fff;
  transition:
    background-color 0.25s ease-in,
    color 0s ease-in 0.25s;
}
</style>
