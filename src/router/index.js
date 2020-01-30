import Vue from "vue";
import VueRouter from "vue-router";
import GuestFeed from "../views/GuestFeed.vue";
import UserFeed from '../views/UserFeed.vue';
import QuestionPage from '../views/QuestionPage.vue';
import UserProfile from '../views/UserProfile.vue';
import MyProfile from '../views/MyProfile.vue';
import CategoryPage from '../views/CategoryPage.vue';
import SearchResult from '../views/SearchResult.vue' 
import Login from '../views/Login.vue';
import Notifications from '../views/Notifications.vue'

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
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/question/:id",
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
  },
  {
    path: "/search",
    name: "search",
    component: SearchResult
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
