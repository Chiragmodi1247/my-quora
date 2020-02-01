<template>
  <div>
    <v-row>
      <v-col lg="1"></v-col>
      <v-col lg="2">
        <v-avatar class="my-avatar" size="200px">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-col>
      <v-col lg="7" style="color: white">
        <br /><br /><br />
        <v-row>
          <h1>{{profile.name}}</h1>
        </v-row>
        <v-row>
          My some basic description here
        </v-row>
        <v-row>
          <v-col lg="4">
            Followers: 10k
          </v-col>
          <v-col lg="4">
            Following: 20
          </v-col>
          <v-col lg="4">
            Level: {{profile.level}}
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="2">
        <br /><br /><br />
        <button id="edit_profile" @click="openModal" class="btn_send">
          Edit Profile <span class="mdi mdi-account-plus"></span>
        </button>
      </v-col>
    </v-row>

    <div id="simpleModal" class="modal">
      <v-card class="modal-content">
        <span id="closeBtn" @click="closeModal">&times; </span>
        <v-row>
          <h1>Name:</h1>
          <input type="text" class="input_box" />
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
// let closeBtn = document.getElementById("closeBtn")
export default {
  methods: {
    openModal() {
      // let modalBtn = document.getElementById("edit_profile");

      let modal = document.getElementById("simpleModal");
      modal.style.display = "block";
      window.console.log("123");
    },
    closeModal() {
      let modal = document.getElementById("simpleModal");
      modal.style.display = "none";
    }
  },
  props: {
    profile: Object
  }
};
</script>

<style scoped>
.btn_send {
  background: rgb(255, 255, 255);
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
.input_box {
  font-size: 20pt;
  border: 1px solid black;
  border-radius: 5px;
}
.modal {
    display: none;
  position: fixed;
  z-index: 2;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
#closeBtn {
  float: right;
  font-size: 24pt;
}
#closeBtn:hover,
#closeBtn:focus {
  text-decoration: none;
  cursor: pointer;
}
.modal-content {
  margin: 20% auto;
  width: 70%;
  padding: 20px;
}
</style>
