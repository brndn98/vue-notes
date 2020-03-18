<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/notes">Notes</router-link>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style>
nav {
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #41b883;
}
nav a {
  padding: 5px 10px;
  font-weight: 700;
  color: #34495e;
}
nav a.router-link-exact-active {
  /*color: #2c3e50;*/
  color: #1c1c1c;
}
</style>