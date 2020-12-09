<template>
  <div class="note-list">
    <h1 class="container-heading">{{heading}}</h1>
    <div class="container-notes">
      <NoteItem v-for="note in list" :note="note" :key="note.id" />
    </div>
    <NoteWarning v-if="removing" />
  </div>
</template>

<script>
import NoteItem from "./NoteItem.vue";
import NoteWarning from "./NoteWarning.vue";
import { mapState } from "vuex";

export default {
  name: "NoteList",
  props: ["heading", "list"],
  components: {
    NoteItem,
    NoteWarning
  },
  computed: {
    ...mapState(["removing"])
  }
};
</script>

<style>
.note-list {
  width: 90%;
  height: 85%;
  /*background-color: #4a5e72;*/
  display: flex;
  position: relative;
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
</style>