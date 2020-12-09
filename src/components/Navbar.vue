<template>
  <nav>
    <router-link to="/home">Home</router-link>
    <!--<router-link to="/notes/testing_param">Notes</router-link>-->
    <router-link to="/notes/all">Notes</router-link>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["activeNotes"])
  }
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