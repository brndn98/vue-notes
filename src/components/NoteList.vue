<template>
  <div class="notes-list">
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
    <div class="list-container" v-if="currentList === 'all'">
      <h1 class="container-heading">Active Notes</h1>
      <div class="container-notes">
        <div class="note-item" v-for="note in activeNotes" :key="note.id">
          <h1>{{note.title}}</h1>
          <div class="note-actions">
            <button
              v-if="note.isFavorite"
              class="note-favorite"
              @click="toggleFavoriteNote(note.id)"
            >
              unmark
              <i class="fas fa-star"></i>
            </button>
            <button v-else class="note-favorite" @click="toggleFavoriteNote(note.id)">
              favorite
              <i class="far fa-star"></i>
            </button>
            <button class="note-active" @click="toggleActiveNote(note.id)">
              erase
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <button class="note-edit" @click="editNote(note.id)">edit note</button>
        </div>
      </div>
    </div>
    <div class="list-container" v-if="currentList === 'favorite'">
      <h1 class="container-heading">Favorite Notes</h1>
      <div class="container-notes">
        <div class="note-item" v-for="note in favoriteNotes" :key="note.id">
          <h1>{{note.title}}</h1>
          <div class="note-actions">
            <button
              v-if="note.isFavorite"
              class="note-favorite"
              @click="toggleFavoriteNote(note.id)"
            >
              unmark
              <i class="fas fa-star"></i>
            </button>
            <button v-else class="note-favorite" @click="toggleFavoriteNote(note.id)">
              favorite
              <i class="far fa-star"></i>
            </button>
            <button class="note-active" @click="toggleActiveNote(note.id)">
              erase
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <button class="note-edit" @click="editNote(note.id)">edit note</button>
        </div>
      </div>
    </div>
    <div class="list-container" v-if="currentList === 'inactive'">
      <h1 class="container-heading">Removed Notes</h1>
      <div class="container-notes">
        <div class="note-item" v-for="note in inactiveNotes" :key="note.id">
          <h1>{{note.title}}</h1>
          <div class="note-actions">
            <button class="note-restore" @click="toggleActiveNote(note.id)">
              restore
              <i class="fas fa-trash-restore"></i>
            </button>
          </div>
          <button class="note-edit" @click="removeNote(note.id)">erase note</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapMutations } from "vuex";
import NoteEditor from "./NoteEditor.vue";

export default {
  name: "NoteList",
  components: {
    NoteEditor
  },
  computed: {
    ...mapGetters(["activeNotes", "inactiveNotes", "favoriteNotes"]),
    ...mapState(["writing", "currentList"])
  },
  methods: {
    clearLocalStorage() {
      localStorage.removeItem("notes");
    },
    ...mapMutations([
      "toggleFavoriteNote",
      "toggleActiveNote",
      "setNotes",
      "createNote",
      "editNote",
      "removeNote"
    ])
  },
  updated() {
    this.setNotes();
  }
};
</script>

<style>
.notes-list {
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

.list-container {
  width: 90%;
  height: 85%;
  /*background-color: #4a5e72;*/
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  overflow-y: auto;
}
.container-heading {
  width: 95%;
  height: 5%;
  font-size: 1.5em;
  color: #41b883;
}

.container-notes {
  width: 100%;
  /*height: 95%;*/
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.note-item {
  width: 16vw;
  /*height: 30vh;*/
  justify-self: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-bottom: 10%;
  padding-bottom: 2%;
  border-radius: 10px;
  background-color: #34495e;
}
.note-item > h1 {
  width: 90%;
  /*height: 5%;*/
  margin-bottom: none;
  padding-bottom: 0.5em;
  font-size: 1.2em;
  color: #41b883;
  border-bottom: 1px solid #4a5e72;
}
.note-item button {
  height: 10%;
  display: flex;
  align-items: center;
  height: 4vh;
  margin-bottom: 5%;
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
.note-actions {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.note-actions > button {
  background-color: #2c3e50;
  color: #41b883;
}
.note-favorite {
  width: 55%;
}
.note-favorite:focus,
.note-favorite:hover,
.note-restore:focus,
.note-restore:hover {
  color: #ededed;
  border-radius: 5px;
}
.note-active {
  width: 42%;
}
.note-active:focus,
.note-active:hover {
  color: #ef5350;
  border-radius: 5px;
}
.note-edit {
  width: 90%;
}
.note-edit:focus,
.note-edit:hover {
  color: #ededed;
  border-radius: 5px;
}
.note-restore {
  width: 100%;
  justify-content: space-between;
  padding: 0 20%;
}

.placeholder-text-class {
  color: #ededed;
}
</style>
