import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home";
import Lights from "./views/Lights";
import Schedules from "./views/Schedules";
import RouterPage from "./views/Router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/lights",
      name: "lights",
      component: Lights
    },
    {
      path: "/schedules",
      name: "schedules",
      component: Schedules
    },
    {
      path: "/router",
      name: "router",
      component: RouterPage
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
