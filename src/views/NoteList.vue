<template>
  <div class="note-list">
    <h1 class="container-heading">{{heading}}</h1>
    <div v-if="$route.params.list === 'all'" class="container-notes">
      <NoteItem v-for="note in activeNotes" :note="note" :key="note.id" />
    </div>
    <div v-else-if="$route.params.list === 'favorite'" class="container-notes">
      <NoteItem v-for="note in favoriteNotes" :note="note" :key="note.id" />
    </div>
    <div v-else-if="$route.params.list === 'removed'" class="container-notes">
      <NoteItem v-for="note in inactiveNotes" :note="note" :key="note.id" />
    </div>
  </div>
</template>

<script>
import NoteItem from "@/components/NoteItem.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "NoteList",
  data() {
    return {
      heading: "",
      list: []
    };
  },
  components: {
    NoteItem
  },
  computed: {
    ...mapGetters(["activeNotes", "favoriteNotes", "inactiveNotes"])
  },
  methods: {
    updateData(route) {
      const params = route.params.list;
      this.heading =
        params === "all"
          ? "Active Notes"
          : params === "favorite"
          ? "Favorite Notes"
          : "Removed Notes";
    }
  },
  mounted() {
    this.updateData(this.$route);
    console.log("mounted");
  },
  updated() {
    console.log("updated");
  },
  beforeRouteUpdate(to, from, next) {
    this.updateData(to);
    next();
  }
};
</script>

<style>
.note-list {
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
</style>