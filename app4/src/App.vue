<script setup>
import Preview from './components/Preview.vue';
import Form from './components/Form.vue';
import { ref } from 'vue'

const formData = ref({
  title: '',
  author: '',
  type: '',
  datePublished: '',
  description: ''
})

const isValid = ref(false)

</script>

<template>
  <main>
      <Form v-model="formData" @validation="isValid = $event">
        <template #bookRecord></template>
      </Form>

      <Preview v-model="formData" :isValid="isValid">
        <template #preview></template>
      </Preview>
  </main>
</template>

<style scoped>
*{
  box-sizing: border-box;
}

html, body, #app4{
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

main{
  background-color: #2d3250;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
}


</style>
