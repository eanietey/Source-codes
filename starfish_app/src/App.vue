  <script setup>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div class="app">
    <NavBar />
    <RouterView class="view" />
    <FooterBar />
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.view {
  position: relative;
}

.view::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background-image: url('./starfish.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  filter: grayscale(100%);
  opacity: 0.05;
  z-index: -1;
}
</style>
