import { createRouter, createWebHistory } from "vue-router";

//DefaultPanel
import Home from "../views/Home.vue";
import AboutMe from "../views/AboutMe.vue";
import Tools from "../views/Tools.vue";
import Projects from "../views/Projects.vue";
import Contact from "../views/Contact.vue";
import SignIn from "../views/SignIn.vue";
import Page404 from "../views/Page404.vue";
import SingleProject from "../views/SingleProject.vue"

//Vuex
import store from "../storage/index.js";

//Admin Panel
import AdminHome from "../views/admin/AdminHome.vue";
import AdminAboutMe from "../views/admin/AdminAboutMe.vue";
import AdminTools from "../views/admin/AdminTools.vue";
import AdminProjects from "../views/admin/AdminProjects.vue";
import AdminContact from '../views/admin/AdminContact.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "pass",
      path: "/",
      component: Home,
    },
    {
      name: "home",
      path: "/home",
      component: Home,
    },
    {
      name: "aboutme",
      path: "/aboutme",
      component: AboutMe,
    },
    {
      name: "tools",
      path: "/tools",
      component: Tools,
    },
    {
      name: "projects",
      path: "/projects",
      component: Projects,
    },
    {
      name: "contact",
      path: "/contact",
      component: Contact,
    },
    {
      name: "signin",
      path: "/signin",
      component: SignIn,
    },
    {
      name: "singleproject",
      path: '/projects/project/:id',
      component: SingleProject
    },
    {
      name: "adminhome",
      path: "/admin_home",
      component: AdminHome,
      meta: { auth: true },
    },
    {
      name: "adminaboutme",
      path: "/admin_aboutme",
      component: AdminAboutMe,
      meta: { auth: true },
    },
    {
      name: "admintools",
      path: "/admin_tools",
      component: AdminTools,
      meta: { auth: true },
    },
    {
      name: "adminprojects",
      path: "/adminprojects",
      component: AdminProjects,
      meta: { auth: true },
    },
    {
      name: 'admincontact',
      path:'/admincontact',
      component: AdminContact,
      meta: {auth: true}
    },
    {
      name: "not-found",
      path: "/:pathMatch(.*)*",
      component: Page404,
    },
  ],
  linkActiveClass: "active-link",
  linkExactActiveClass: "exact-active-link",
});

router.beforeEach((to, from, next) => {
  const options = store.getters["auth/optionsTokens"];

  if (
    to.meta.auth &&
    options.id_user === null &&
    options.type === null &&
    options.access_token === null &&
    options.refresh_token === null
  ) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
