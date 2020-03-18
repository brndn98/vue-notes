<template>
  <div class="editor">
    <div class="menu">
      <button
        class="menu-feature"
        :class="{ 'menu-feature-active': activeElement === 'p' }"
        @click="setActiveElement('p')"
      >
        <i class="fas fa-paragraph"></i>
      </button>
      <button
        class="menu-feature"
        :class="{ 'menu-feature-active': activeElement === 'b' }"
        @click="setActiveElement('b')"
      >
        <i class="fas fa-bold"></i>
      </button>
      <button
        class="menu-feature"
        :class="{ 'menu-feature-active': activeElement === 'i' }"
        @click="setActiveElement('i')"
      >
        <i class="fas fa-italic"></i>
      </button>
      <button
        class="menu-feature"
        :class="{ 'menu-feature-active': activeElement === 'u' }"
        @click="setActiveElement('u')"
      >
        <i class="fas fa-underline"></i>
      </button>
      <button
        class="menu-feature"
        :class="{ 'menu-feature-active': activeElement === 'h1' }"
        @click="setActiveElement('h1')"
      >
        <i class="fas fa-heading"></i>
      </button>
    </div>
    <!--<div class="container" ref="note" contenteditable="true" @keyup.enter="appendText">-->
    <div
      class="container"
      ref="note"
      contenteditable="true"
      @keyup.prevent="writeElement"
    >
      ...
      <NoteElement v-bind:tag="'p'">{{ currentText }}</NoteElement>
      <!--<input
        type="text"
        ref="text"
        v-model="noteText"
        autocomplete="off"
        autofocus
        @keyup.enter="appendText"
      />-->
      <!--<NoteElement v-bind:tag="'h1'">Hello World</NoteElement>-->
    </div>
    <button class="editor-save">save</button>
  </div>
</template>

<script>
import Vue from "vue";
import NoteElement from "@/components/NoteElement.vue";
/*const NoteElementInstance = new NoteElementClass({
    propsData: {}
});
NoteElementInstance.$mount();*/

export default {
  name: "NoteList",
  data() {
    return {
      noteText: "",
      activeElement: "p",
      currentText: ""
    };
  },
  methods: {
    appendText() {
      const note = this.$refs.note;
      const newText = note.firstChild.data;

      const NoteElementClass = Vue.extend(NoteElement);
      const NoteElementInstance = new NoteElementClass({
        propsData: {
          tag: "br"
        }
      });
      //NoteElementInstance.$slots.default = [newText];
      NoteElementInstance.$mount();
      note.removeChild(note.lastElementChild);
      //note.removeChild(note.lastChild);
      note.appendChild(NoteElementInstance.$el);
      /*NoteElementInstance.$el = this.$refs.note.insertBefore(
        NoteElementInstance.$el,
        this.$refs.text
      );*/
      //NoteElementInstance.$el.scrollIntoView({ behavior: "smooth" });
      //this.noteText = "";
      //this.$refs.text.scrollIntoView({ behavior: "smooth" });
    },
    writeElement(event) {
      //const newText = event.target.firstChild.data;
      //this.currentText += event.key;
      console.log(event.target.firstChild.data);
      this.currentText = event.target.firstChild.data;
    },
    setActiveElement(element) {
      this.activeElement = element;
      this.$refs.note.focus();
    }
  },
  components: {
    NoteElement
  },
  mounted() {
    this.$refs.note.focus();
  }
};
</script>

<style>
.editor {
  width: 50%;
  height: 60%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
}

.menu {
  width: 95%;
  height: 10%;
  padding: 0 2.5%;
  display: flex;
  align-items: center;
  background-color: #34495e;
}
.menu-feature {
  width: 5%;
  height: 80%;
  margin: 0 2px;
  /*padding: 0 10px;*/
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
  border: none;
  outline: none;
  border-radius: 5px;
}
.menu-feature > .fas {
  color: #41b883;
  transition: 0.2s;
}
.menu-feature:hover > .fas {
  color: #ededed;
}
.menu-feature-active {
  background-color: #41b883;
}
.menu-feature-active > .fas {
  color: #2c3e50;
}

.container {
  width: 90%;
  height: 70%;
  padding: 2% 5%;
  display: flex;
  flex-flow: column nowrap;
  background-color: #34495e;
  color: #ededed;
  overflow-y: auto;
}
.container > p {
  margin: 0;
}
input[type="text"] {
  width: 100%;
  border: none;
  outline: none;
  font-family: Roboto;
  font-weight: 400;
  font-size: 1em;
  color: #ededed;
  background-color: #2c3e50;
}

.editor-save {
  width: 100%;
  height: 10%;
  border: none;
  border-radius: 10px;
  background-color: #41b883;
  font-family: Roboto;
  font-weight: 700;
  color: #2c3e50;
}
</style>
