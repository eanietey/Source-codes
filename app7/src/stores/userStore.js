import { defineStore } from "pinia";
import {reactive, ref} from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user = reactive({
    username: localStorage.getItem('username') || ''
  })
  
  const selectedFriend = ref(null)

  return {user, selectedFriend}
})
