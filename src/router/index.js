import Vue from "vue";
import VueRouter from "vue-router";
import GuestFeed from "../views/GuestFeed.vue";
import UserFeed from '../views/UserFeed.vue';
import QuestionPage from '../views/QuestionPage.vue';
import UserProfile from '../views/UserProfile.vue';
import MyProfile from '../views/MyProfile.vue'
import CategoryPage from '../views/CategoryPage.vue' 

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: GuestFeed
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/user",
    name: "user",
    component: UserFeed
  },
  {
    path: "/question",
    name: "question",
    component: QuestionPage
  },
  {
    path: "/profile",
    name: "profile",
    component: UserProfile
  },
  {
    path: "/myprofile",
    name: "myprofile",
    component: MyProfile
  },
  {
    path: "/categorypage/:name",
    name: "categorypage",
    component: CategoryPage
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
