<script setup>
import { defineProps } from 'vue'

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
  },
  isValid:{
    type: Boolean,
    default: false
  }
})

</script>

<template>
 <div class="preview-tab">
    <slot name="preview"></slot>

    <h3>Preview</h3>

    <div class="bars">
      <div class="showPreview">
        <label for="title" class="heading">Title: </label>
        <span>{{ props.modelValue.title || '...' }}</span><br><br>

        <label for="author" class="heading">Author: </label>
        <span>{{ props.modelValue.author || '...' }}</span><br><br>

        <label for="type" class="heading">Type: </label>
        <span>{{ props.modelValue.type || '...' }}</span><br><br>

        <label for="datePublished" class="heading">Date: </label>
        <span>{{ props.modelValue.datePublished || '...' }}</span><br><br>

        <label for="description" class="heading">Description: </label>
        <span>{{ props.modelValue.description || '...' }}</span><br><br>
      </div>

      <div id="division"></div>
      <div id="validation-section">
        <span id="check" v-if="isValid">✔</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preview-tab{
  width: 700px;
  height: 300px;
  background-color: #424769;
  border-radius: 14px;
}

h3{
  text-align: center;
}

.heading{
  margin-left: 70px;
}

.bars{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
  align-items: center;
  gap: 240px;
  position: relative;
}

#division{
  background-color: #f9b17a;
  height: 80%;
  width: 3px;
  position: absolute;
  margin-left: 450px;
}

#validation-section{
  height: 90px;
  width: 90px;
  background-color: aliceblue;
  position:absolute;
  margin-left: 530px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#check{
  font-size: 2.5em;
  color: darkgreen;
  line-height: 1;
  display: inline-block;
  font-weight: bold;
  animation: fadeInScale 0.5s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}


</style>
