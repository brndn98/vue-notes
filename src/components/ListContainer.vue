<template>
  <div class="list-container">
    <NoteEditor v-if="writing" />
    <div class="list-menu">
      <button class="list-add" @click="createNote" title="Create a new note">
        new note
        <i class="fas fa-plus"></i>
      </button>
      <button
        class="list-clear"
        @click="clearLocalStorage"
        title="This will erase all your notes data"
      >
        clear local storage
        <i class="fas fa-archive"></i>
      </button>
    </div>
    <NoteList v-if="currentList === 'all'" :listHeading="'Active Notes'" :notesList="activeNotes" />
    <NoteList
      v-else-if="currentList === 'favorite'"
      :listHeading="'Favorite Notes'"
      :notesList="favoriteNotes"
    />
    <NoteList
      v-else-if="currentList === 'inactive'"
      :listHeading="'Removed Notes'"
      :notesList="inactiveNotes"
    />
  </div>
</template>

<script>
import NoteEditor from "./NoteEditor.vue";
import NoteList from "./NoteList.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "ListContainer",
  components: {
    NoteEditor,
    NoteList
  },
  computed: {
    ...mapGetters(["activeNotes", "inactiveNotes", "favoriteNotes"]),
    ...mapState(["writing", "currentList"])
  },
  methods: {
    clearLocalStorage() {
      localStorage.removeItem("notes");
    },
    ...mapMutations(["setNotes", "createNote"])
  },
  updated() {
    this.setNotes();
  }
};
</script>

<style>
.list-container {
  width: 80%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
}

.list-menu {
  width: 90%;
  height: 10%;
  display: flex;
  align-items: center;
}
.list-add,
.list-clear {
  height: 80%;
  margin-right: 2%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-weight: 700;
  font-size: 1em;
  background-color: #41b883;
  color: #2c3e50;
  border: none;
  border-radius: 25px;
  transition: 0.2s;
}
.list-add {
  width: 15%;
}
.list-add:focus,
.list-add:hover {
  color: #ededed;
  border-radius: 5px;
}
.list-clear {
  width: 20%;
}
.list-clear:focus,
.list-clear:hover {
  background-color: #34495e;
  color: #ef5350;
  border-radius: 5px;
}

.placeholder-text-class {
  color: #ededed;
}
</style>
