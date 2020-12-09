<template>
  <div class="notes-container">
    <SideBar />
    <router-view />
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import ListContainer from "@/components/ListContainer.vue";
//import NoteEditor from "@/components/NoteEditor.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "Notes",
  components: {
    SideBar,
    ListContainer
  },
  computed: {
    ...mapGetters(["activeNotes"])
  },
  methods: {
    ...mapMutations(["getNotes"])
  },
  mounted() {
    this.getNotes();
    this.$router.push({
      name: "List",
      params: { list: "all" }
    });
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
</style>
