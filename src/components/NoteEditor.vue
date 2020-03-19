<template>
  <div class="editor">
    <div class="editor-header">
      <input
        type="text"
        v-model="title"
        placeholder="title..."
        class="editor-title"
        spellcheck="false"
      />
      <button @click="closeNote">
        close
        <i class="fas fa-times"></i>
      </button>
    </div>
    <editor-menu-bar v-bind:editor="editor" v-slot="{ commands, isActive }">
      <div class="menu-bar">
        <button
          @click="commands.paragraph"
          class="menu-feature"
          v-bind:class="{ 'menu-feature-active': isActive.paragraph() }"
          title="paragraph"
        >
          <i class="fas fa-paragraph"></i>
        </button>
        <button
          @click="commands.bold"
          class="menu-feature"
          v-bind:class="{ 'menu-feature-active': isActive.bold() }"
          title="bold"
        >
          <i class="fas fa-bold"></i>
        </button>
        <button
          @click="commands.italic"
          class="menu-feature"
          v-bind:class="{ 'menu-feature-active': isActive.italic() }"
          title="italic"
        >
          <i class="fas fa-italic"></i>
        </button>
        <button
          @click="commands.underline"
          class="menu-feature"
          v-bind:class="{ 'menu-feature-active': isActive.underline() }"
          title="underline"
        >
          <i class="fas fa-underline"></i>
        </button>
        <button
          @click="commands.heading({ level: 1 })"
          class="menu-feature"
          v-bind:class="{
            'menu-feature-active': isActive.heading({ level: 1 })
          }"
          title="heading"
        >
          <i class="fas fa-heading"></i>
        </button>
        <!--<button @click="commands.heading({ level: 2 })" class="menu-feature">H2</button>
        <button @click="commands.heading({ level: 3 })" class="menu-feature">H3</button>-->
        <button
          @click="commands.bullet_list"
          class="menu-feature"
          v-bind:class="{ 'menu-feature-active': isActive.bullet_list() }"
          title="list"
        >
          <i class="fas fa-list-ul"></i>
        </button>
        <button
          @click="commands.code_block"
          class="menu-feature"
          v-bind:class="{ 'menu-feature-active': isActive.code_block() }"
          title="code block"
        >
          <i class="fas fa-code"></i>
        </button>
      </div>
    </editor-menu-bar>
    <editor-content v-bind:editor="editor" class="editor-content" spellcheck="false" />
    <button class="editor-save" @click="saveNote">save</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Bold,
  Italic,
  Underline,
  Heading,
  CodeBlock,
  BulletList,
  ListItem
} from "tiptap-extensions";

export default {
  name: "NoteEditor",
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      title: "",
      editor: null
    };
  },
  computed: {
    ...mapState(["currentNote", "writing"])
  },
  methods: {
    ...mapMutations(["addNote", "updateNote", "closeNote"]),
    saveNote() {
      if (this.title) {
        const content = this.editor.getJSON();
        if (this.currentNote) {
          const newNote = {
            id: this.currentNote.id,
            title: this.title,
            content: content,
            tags: this.currentNote.tags
          };
          this.updateNote(newNote);
        } else {
          const newNote = {
            title: this.title,
            content: content
          };
          this.addNote(newNote);
        }
      } else {
        alert("Write a title for the note!");
      }
    }
  },
  mounted() {
    let content = "<p>Write something here...</p>";
    if (this.currentNote) {
      this.title = this.currentNote.title;
      content = this.currentNote.content;
    }

    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new Underline(),
        new Heading({ levels: [1, 2, 3] }),
        new CodeBlock(),
        new BulletList(),
        new ListItem()
      ],
      content: content,
      autoFocus: true
    });
  },
  beforeDestroy() {
    this.editor.destroy;
  }
};
</script>

<style>
.editor {
  position: absolute;
  width: 50%;
  height: 75%;
  padding: 0 1%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 5px;
  background-color: #2c3e50;
  box-shadow: 0px 5px 10px #1c1c1c;
}
.editor button {
  cursor: pointer;
}

.editor-header {
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editor-title {
  width: 73%;
  height: 100%;
  padding: 0 2.5%;
  font-weight: 700;
  font-size: 1em;
  background-color: #34495e;
  color: #ededed;
  border: none;
  border-radius: 5px;
}
.editor-title:focus {
  outline: #41b883 solid 1px;
}
.editor-header > button {
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-weight: 700;
  font-size: 1em;
  background-color: #34495e;
  color: #41b883;
  border: none;
  outline: none;
  border-radius: 20px;
  transition: 0.2s;
}
.editor-header > button:focus,
.editor-header > button:hover {
  color: #ef5350;
}

.menu-bar {
  width: 95%;
  height: 8%;
  padding: 0 2.5%;
  display: flex;
  align-items: center;
  background-color: #34495e;
  border-radius: 5px;
}
.menu-feature {
  width: 5%;
  height: 70%;
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

.editor-content {
  width: 90%;
  height: 62%;
  padding: 2% 5%;
  /*display: flex;
  flex-flow: column nowrap;*/
  background-color: #34495e;
  color: #ededed;
  border-radius: 5px;
  overflow-y: auto;
}
.editor-content > * {
  padding: 0 0;
  outline: none;
}
.editor-content p {
  /*display: inline;*/
  margin: 0;
  font-size: 1em;
  color: #ededed;
}
.editor-content strong {
  color: #41b883;
}
.editor-content em {
  font-size: 0.8em;
}
.editor-content h1 {
  font-size: 1.5em;
  color: #41b883;
}
.editor-content ul {
  margin: 0.5em 0;
  padding-left: 30px;
}
.editor-content pre {
  padding: 5px 10px;
  border-radius: 0.5em;
  background-color: #1c1c1c;
}
.editor-content code {
  font-size: 0.9em;
  color: #ededed;
}

.editor-save {
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 1em;
  background-color: #41b883;
  color: #2c3e50;
  border: none;
  border-radius: 20px;
  transition: 0.2s;
}
.editor-save:focus,
.editor-save:hover {
  color: #ededed;
  border-radius: 5px;
}

::-webkit-scrollbar {
  width: 1%;
}
/*::-webkit-scrollbar-track {
  background-color: #202f3f;
  border-radius: 25px;
}*/
::-webkit-scrollbar-thumb {
  background-color: #41b883;
  border-radius: 25px;
}
</style>
