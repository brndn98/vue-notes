<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

button {
  cursor: pointer;
  outline: none;
}
</style>
