<template>
  <v-app>
    <v-app-bar v-if="isLogged" app color="mywhite">
      <v-row>
        <v-col lg="1"> </v-col>
        <v-col lg="1">
          <router-link to="/">
            <button>
              <h2 style="color: rgb(192, 0, 0);">Quora</h2>
            </button>
          </router-link>
        </v-col>
        <v-col lg="6">
          <input type="text" class="input-box" />
        </v-col>
        <v-col lg="3"> </v-col>
        <v-col lg="1">
          <router-link to="/myprofile">
            <button class="login-btn">
              <h2>Login</h2>
            </button>
          </router-link>
        </v-col>
      </v-row>

      <!-- <h2 style="color: rgb(192, 0, 0);">Quora</h2>
      <v-spacer></v-spacer>
<div>
  <input type="text" class="input-box" >
</div>
<v-btn color="secondary">Search</v-btn>
      <v-spacer></v-spacer>
<v-btn color="secondary">LogOut</v-btn> -->
    </v-app-bar>

    <!-- <v-app-bar v-if="!isLogged" app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-content class="my-content">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: "App",

  components: {
    // HelloWorld,
  },

  data: () => ({
    isLogged: true
  })
};
</script>

<style scoped>
.input-box {
  font-size: 20pt;
  border: 1px solid black;
  border-radius: 10px;
  width: 50vw;
  color: black;
}
.my-content {
  background: rgb(224, 224, 224);
}
.login-btn {
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  background: rgb(223, 45, 0);
}
</style>
