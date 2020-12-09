import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [],
    currentNote: null,
    tags: [{ id: 0, name: "note" }],
    writing: false,
    removing: false,
    noteToRemove: null,
    currentList: "all"
  },
  getters: {
    favoriteNotes: state => {
      return state.notes.filter(note => note.isFavorite);
    },
    activeNotes: state => {
      return state.notes.filter(note => note.isActive);
    },
    inactiveNotes: state => {
      return state.notes.filter(note => !note.isActive);
    }
  },
  mutations: {
    addNote(state, newNote) {
      const note = {
        id: uuidv4(),
        title: newNote.title,
        content: newNote.content,
        tags: state.tags[0].name,
        isFavorite: false,
        isActive: true
      };
      state.notes = [...state.notes, note];
      state.currentNote = note;
    },
    toggleFavoriteNote(state, id) {
      state.notes = state.notes.map(note => {
        if (note.id === id) note.isFavorite = !note.isFavorite;
        return note;
      });
    },
    toggleActiveNote(state, id) {
      state.notes = state.notes.map(note => {
        if (note.id === id) note.isActive = !note.isActive;
        return note;
      });
    },
    removeNote(state, id) {
      state.notes = state.notes.filter(note => note.id !== id);
      state.noteToRemove = null;
      state.removing = false;
    },
    createNote(state) {
      if (!state.writing) state.writing = true;
    },
    editNote(state, id) {
      if (!state.writing) {
        const filteredNote = state.notes.filter(note => note.id === id);
        state.currentNote = filteredNote[0];
        state.writing = true;
      }
    },
    closeNote(state) {
      if (state.writing) {
        state.currentNote = null;
        state.writing = false;
      }
    },
    updateNote(state, updatedNote) {
      state.notes = state.notes.map(note => {
        if (note.id === updatedNote.id) {
          note.title = updatedNote.title;
          note.content = updatedNote.content;
          note.tags = updatedNote.tags;
        }
        return note;
      });
    },
    setNotes(state) {
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    getNotes(state) {
      const localData = localStorage.getItem("notes");
      state.notes = localData ? JSON.parse(localData) : [];
    },
    handleWriting(state) {
      state.writing = !state.writing;
    },
    handleRemoving(state) {
      state.removing = !state.removing;
    },
    setNoteToRemove(state, noteId) {
      state.noteToRemove = noteId;
    },
    setCurrentList(state, typeOfList) {
      state.currentList = typeOfList;
    }
  },
  actions: {},
  modules: {}
});
