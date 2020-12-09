<template>
  <div class="note-item">
    <h1>{{note.title}}</h1>
    <div v-if="note.isActive" class="note-menu">
      <div class="note-actions">
        <button v-if="note.isFavorite" class="note-favorite" @click="toggleFavoriteNote(note.id)">
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
    <div v-else class="note-menu">
      <div class="note-actions">
        <button class="note-restore" @click="toggleActiveNote(note.id)">
          restore
          <i class="fas fa-trash-restore"></i>
        </button>
      </div>
      <button class="note-remove" @click="triggerNoteToRemove(note.id)">remove note</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "NoteItem",
  props: ["note"],
  methods: {
    triggerNoteToRemove(id) {
      this.setNoteToRemove(id);
      this.handleRemoving();
    },
    ...mapMutations([
      "toggleActiveNote",
      "toggleFavoriteNote",
      "editNote",
      "handleRemoving",
      "setNoteToRemove"
    ])
  }
};
</script>

<style>
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
.note-menu {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
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
.note-edit,
.note-remove {
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
.note-remove:focus,
.note-remove:hover {
  color: #ef5350;
  border-radius: 5px;
  background-color: #2c3e50;
}
</style>