<template>
  <v-app>
    <v-app-bar v-if="!isLogged" app color="mywhite">
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
          <input type="text" id="search_text" v-model="search_text" v-on:keyup="search" class="input-box" />
        </v-col>
        <v-col lg="3"> </v-col>
        <v-col lg="1">
          <router-link to="/login">
            <button class="login-btn">
              <h2>Login</h2>
            </button>
          </router-link>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-app-bar v-if="isLogged" app color="mywhite">
      <v-row>
        <v-col lg="1"> </v-col>
        <v-col lg="1">
          <router-link to="/user">
            <button>
              <h2 style="color: rgb(192, 0, 0);">Quora</h2>
            </button>
          </router-link>
        </v-col>
        <v-col lg="6">
          <input type="text" id="search_text" v-model="search_text" v-on:keyup="search" class="input-box" />
        </v-col>
        <v-col lg="2"> </v-col>
        <v-col lg="1" @click="openNotification">
          <span v-if="!haveNotification" class="mdi mdi-bell-outline icon_size"></span>
          <span v-if="haveNotification" class="mdi mdi-bell-outline red_icon_size">2</span>
          </v-col>
        <v-col lg="1">
          <router-link to="/login">
            <button class="login-btn">
              <h2>Logout</h2>
            </button>
          </router-link>
        </v-col>
      </v-row>
    </v-app-bar>

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
    isLogged: false,
    search_text: null,
    haveNotification: false,
  }),
  methods: {
    search: function(e) {
      let search_input = document.getElementById("search_text");
      if (e.keyCode === 13) {
        if (search_input.value.length === 0) alert("No input");
        else{
         window.console.log("Searched Query: " + this.search_text);
          this.$router.push({path: '/search' , query: { searchQuery : this.search_text }})
        }
      }
    },
    openNotification: function() {
      this.$router.push({path: '/notifications'})
    }
  },
  created() {
    if(localStorage.getItem("quora-token"))
    this.isLogged = true;
  }
};
</script>

<style scoped>
.red_icon_size {
  font-size: 24pt;
  cursor: pointer;
  color: red;
}
.icon_size {
  font-size: 24pt;
  cursor: pointer;
}
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
