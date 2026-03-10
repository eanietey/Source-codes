<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore.js'
import ToggleSwitch from '../components/ToggleSwitch.vue'

const checkUsername = (value) => {
  const errors = []
  if (value.length < 5) errors.push('Must have at least 5 characters')

  // if (!(value[0] >= 'a' && value[0] <= 'z') &&
  //   !(value[0] >= 'A' && value[0] <= 'Z')) {
  // errors.push('Must begin with a letter')
  // }

  if (!/^[a-zA-Z]/.test(value)) {
    errors.push('Must begin with a letter')
  }

  for (let w of value) {
    if (!((w >= 'a' && w <= 'z') ||
          (w >= 'A' && w <= 'Z') ||
          (w >= '0' && w <= '9'))) {
      errors.push('Can only contain letters and numbers')
      break
    }
  }

  return errors
}

const checkPassword = (value) => {
  const errors = []
  const v = value ? value.trim() : ''
  if (v.length < 8) errors.push('Must have at least 8 characters')
  if (v.length > 64) errors.push('Cannot have more than 64 characters')
  if (!v.match(/[A-Z]/)) errors.push('Must have 1 uppercase character')
  if (!v.match(/[a-z]/)) errors.push('Must have 1 lowercase character')
  if (!v.match(/[0-9]/)) errors.push('Must have 1 number')
  if (!v.match(/[!@#$%^&*(),.?":{}|<>]/)) errors.push('Must have 1 special character')
  return errors
}

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const password = ref('')

const passwordInput = ref(null)

const usernameErrors = computed(() => checkUsername(username.value))
const passwordErrors = computed(() => checkPassword(password.value))
const hasErrors = computed(() => usernameErrors.value.length > 0 || passwordErrors.value.length > 0)

const logInInfo = computed(() =>
  userStore.user.username ? 'Login with another account' : 'Enter your credentials',
)

function togglePasswordVisibility(event) {
  if (passwordInput.value) {
    passwordInput.value.type = event.target.checked ? 'text' : 'password'
  }
}

function login() {
  if (!hasErrors.value) {
    localStorage.setItem('username', username.value)
    userStore.user.username = username.value
    router.push('/home')
  }
}
</script>

<template>
  <div class="login-tab">
    <div class="login-content">

      <div class="login-form">
        <h1>Let's Go!</h1>
        <h3>{{ logInInfo }}</h3>

        <div>

          <div class="form-item">
            <label for="usernameInput">Username</label>
            <input id="usernameInput" v-model="username" type="text" />
          </div>


          <div class="form-item">
            <label for="passwordInput">Password</label>
            <ToggleSwitch class="position-toggle" @change="togglePasswordVisibility" />
            <input
              id="passwordInput"
              ref="passwordInput"
              v-model="password"
              type="password"
              @keyup.enter="login"
            />
          </div>
        </div>

        <button @click="login">Log in</button>
      </div>


      <div :class="['error-messages', { 'no-width': !hasErrors }]">

        <div v-show="usernameErrors.length > 0">
          <span>Username</span>
          <ul>
            <li v-for="err in usernameErrors" :key="err">
              <span>{{ err }}</span>
            </li>
          </ul>
        </div>


        <div v-show="passwordErrors.length > 0">
          <span>Password</span>
          <ul>
            <li v-for="err in passwordErrors" :key="err">
              <span>{{ err }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-tab {
  flex: 1;
  background-color: #efeded;
  opacity: 97%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-content {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.login-form {
  background-color: #f8f8f8;
  box-sizing: border-box;
  padding: 20px;
  font-size: small;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 200px;
}

.login-form h1 {
  margin: 0;
}

.login-form h3 {
  text-align: center;
}

.form-item {
  box-sizing: border-box;
  width: 160px;
  margin-bottom: 5px;
}

.form-item > label {
  display: inline-block;
  margin-bottom: 5px;
}

.form-item > input {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 5px;
}

.position-toggle {
  float: right;
}

.error-messages {
  align-self: center;
  color: #c70d0d;
  font-size: 12px;
  width: 200px;
  transition: width 1s linear;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.no-width {
  width: 0;
}

ul {
  padding-left: 15px;
  margin: 3px 0 10px;
}

.error-messages span {
  display: inline-block;
  min-width: max-content;
  white-space: nowrap;
}

.login-form > button {
  font-size: medium;
  color: #f8f8f8;
  background-color: #000;
  border-radius: 999px;
  padding: 5px 10px;
  border: 0;
  cursor: pointer;
}

.login-form > button:active {
  transform: scale(97%);
}
</style>
