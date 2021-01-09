<template>
  <div class="notes-sidebar">
    <div class="sidebar-actions">
      <router-link class="sidebar-all" to="/notes/all">
        all notes
        <i class="fas fa-list-ul" />
      </router-link>
      <router-link class="sidebar-favorites" to="/notes/favorite">
        favorite notes
        <i class="fas fa-star" />
      </router-link>
      <router-link class="sidebar-removed" to="/notes/removed">
        erased notes
        <i class="fas fa-trash" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "SideBar",
  methods: {
    ...mapMutations(["setCurrentList"])
  }
};
</script>

<style>
.notes-sidebar {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #34495e;
}
.sidebar-actions {
  width: 80%;
  margin-top: 10%;
}
.sidebar-actions > a {
  width: 70%;
  height: 8%;
  padding: 0 15%;
  margin-bottom: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 1em;
  background-color: #41b883;
  border: 1px solid #41b883;
  color: #2c3e50;
  text-decoration: none;
  border-radius: 25px;
  transition: 0.2s;
}
/*.sidebar-actions > a:focus,*/
.sidebar-actions > a:hover {
  color: #ededed;
  border-radius: 10px;
}
.sidebar-actions > a.router-link-exact-active {
  background-color: #2c3e50;
  border-radius: 10px;
  color: #41b883;
}
</style>