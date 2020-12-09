<template>
  <div class="note-warning">
    <div></div>
    <h1>Are you sure?</h1>
    <button class="warning-accept" @click="removeNote(noteToRemove)">remove</button>
    <button class="warning-cancel" @click="handleRemoving">cancel</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "NoteWarning",
  computed: {
    ...mapState(["noteToRemove"])
  },
  methods: {
    triggerRemoveNote(id) {
      this.removeNote(id);
      this.handleRemoving();
    },
    ...mapMutations(["removeNote", "handleRemoving"])
  }
};
</script>

<style>
.note-warning {
  width: 50%;
  height: 40%;
  margin-top: 10vh;
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  border-radius: 5px;
  background-color: #2c3e50;
  box-shadow: 0px 5px 10px #1c1c1c;
}
.note-warning > div {
  width: 100%;
  height: 20%;
  border-radius: 5px 5px 0 0;
  background-color: #41b883;
}
.note-warning > h1 {
  font-size: 2em;
  color: #ef5350;
}
.note-warning > button {
  width: 80%;
  height: 18%;
  font-weight: 700;
  font-size: 1.2em;
  border: none;
  border-radius: 25px;
  margin-bottom: 2%;
  transition: 0.2s;
}
.note-warning > button:hover {
  width: 85%;
  border-radius: 10px;
}
.warning-accept {
  background-color: #41b883;
  color: #2c3e50;
}
.warning-accept:hover {
  color: #ededed;
}
.warning-cancel {
  background-color: #34495e;
  color: #ededed;
}
.warning-cancel:hover {
  color: #41b883;
}
</style>