<script setup>
import { defineProps } from 'vue';
import { ref, reactive, watch, toRefs } from 'vue'


const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      title: '',
      author: '',
      type: '',
      datePublished: '',
      description: '',
    })
  }
})

const emit = defineEmits(['update:modelValue', 'validation'])

const form = reactive({...props.modelValue})

const errors = reactive({
  title: '',
  author: '',
  type: '',
  datePublished: '',
  description: ''
})

watch(
  form,
  (newInput) => emit('update:modelValue', newInput),
  { deep: true }
)

const validation = () => {
  let valid = true
  Object.keys(form).forEach(key => {
    if (!form[key]) {
      errors[key] = '*Required*'
      valid = false
    } else {
      errors[key] = ''
      console.log("good")
    }
  })

  emit('validation', valid)
  return valid
}

const submitForm = (e) => {
  e.preventDefault()
  if (validation()) {
    alert('Form submitted!')
  }
}

</script>

<template>
  <div class="form-tab">
    <slot name="bookRecord"></slot>

    <h3>Book Record</h3>

    <form @submit.prevent="submitForm">
      <div id="firstColumn">
        <div class="box">
          <label for="title" class="heading" >Title</label><br>
          <input type="text" placeholder="Enter title..." class="inputBox" v-model="form.title"/>
          <span class="error" v-if="errors.type">{{ errors.title }}</span>
        </div><br><br>

        <div class="box">
          <label for="author" class="heading">Author</label><br>
          <input type="text" placeholder="Enter name of author..." class="inputBox" v-model="form.author"/><br>
          <span class="error" v-if="errors.type">{{ errors.author }}</span>
        </div><br><br>

        <div class="box">
          <label for="type" class="heading" id="option">Type</label><br>
          <select id="bookType" class="inputBox" v-model="form.type">
            <option value="" disabled selected>Select type</option>
            <option value="fiction">Fiction, dystopian</option>
            <option value="non-fiction">Non-Fiction</option>
            <option value="biography">Biography</option>
            <option value="science">Science</option>
            <option value="other">Other</option>
          </select>
          <span class="error" v-if="errors.type">{{ errors.type }}</span>
        </div>
      </div>

      <div id="secondColumn">
        <div class="box">
          <label for="type" class="heading">Date Published</label><br>
          <input type="date" class="inputBox" v-model="form.datePublished"/><br><br>
          <span class="error" v-if="errors.datePublished">{{ errors.datePublished }}</span>
        </div><br><br>

        <div class="box"  id="des">
          <label for="type" class="heading">Description</label><br>
          <textarea placeholder="Write your description..." class="inputBox" id="des1" v-model="form.description"></textarea><br>
          <span class="error" v-if="errors.description">{{ errors.description }}</span>
        </div><br><br>

      </div>
    </form><br>
    <button type="button" id="validate" @click="validation">Validate</button>
  </div>
</template>

<style scoped>
.form-tab{
  width: 700px;
  height: 600px;
  background-color: #424769;
  border-radius: 14px;
  overflow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h3{
  text-align: center;
}

form{
  margin-left: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

#firstColumn{
  display: flex;
  flex-direction: column;
}

#firstColumn .error{
  margin-top: 6px;
}

#secondColumn{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputBox{
  padding: 8px;
  border-radius: 3px;
  border: none;
  width: 230px;
  outline: none;
  /* background: #505991; */
  background: #676f9d;
  color: white;
}

.inputBox::placeholder{
  color: #ccc;
}

textarea.inputBox {
  resize: none;
  width: 230px;
  height: auto;
}

.box{
  background: #676f9d;
  border-radius: 3px;
  width: 280px;
  padding: 10px;
   /* height:50px; */
  /* border-left: 6px solid #f9b17a; */
  transition: box-shadow 0.2s;
}

.box:focus {
  outline: none;
  box-shadow: 0 0 0 2px #f9b17a;
}

button{
  padding: 17px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size:medium;
  background-color: #f9b17a;
}

button:active{
  background: #cdab91;
}

#des{
  height: 90px;
}

#des1{
  margin-top: 5px;
}

.error{
  color: gray
}
/* .box:focus{
  border-color: red;
} */

</style>
