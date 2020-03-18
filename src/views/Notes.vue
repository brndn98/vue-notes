<template>
  <div class="notes-container">
    <div class="notes-sidebar">
      <div class="sidebar-actions-placeholder">
        <button class="sidebar-all" @click="setCurrentList('all')">
          all notes
          <i class="fas fa-list-ul"></i>
        </button>
        <button class="sidebar-favorites" @click="setCurrentList('favorite')">
          favorite notes
          <i class="fas fa-star"></i>
        </button>
        <button class="sidebar-removed" @click="setCurrentList('inactive')">
          removed notes
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
    <NoteList />
  </div>
</template>

<script>
import NoteList from "@/components/NoteList.vue";
//import NoteEditor from "@/components/NoteEditor.vue";
import { mapMutations } from "vuex";

export default {
  name: "Notes",
  components: {
    NoteList
  },
  methods: {
    ...mapMutations(["getNotes", "setCurrentList"])
  },
  mounted() {
    this.getNotes();
  }
};
</script>

<style>
.notes-container {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
}
.notes-sidebar {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #34495e;
}
.sidebar-actions-placeholder {
  width: 80%;
  margin-top: 10%;
}
.sidebar-actions-placeholder > button {
  width: 100%;
  height: 8%;
  padding: 0 15%;
  margin-bottom: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: 1em;
  background-color: #41b883;
  color: #2c3e50;
  border: none;
  border-radius: 25px;
  transition: 0.2s;
}
.sidebar-actions-placeholder > button:focus,
.sidebar-actions-placeholder > button:hover {
  color: #ededed;
  border-radius: 10px;
}
</style>
