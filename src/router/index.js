import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Notes from "../views/Notes.vue";
import ListContainer from "../views/ListContainer.vue";
//import NoteList from "../views/NoteList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/",
    name: "Notes",
    component: Notes,
    children: [
      {
        path: "notes/:list",
        name: "List",
        component: ListContainer
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
