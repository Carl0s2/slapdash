import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName:"home" */ "../views/Home.Vue"),
    },
    {
      path: "/game/:id",
      name: "game",
      component: () =>
        import(/* webpackChunkName:"game" */ "../views/Game.vue"),
    },
    {
      path: "/finish",
      name: "finish",
      component: () =>
        import(/* webpackChunkName:"finish" */ "../views/Finish.vue"),
    },
  ],
});

export default router;
