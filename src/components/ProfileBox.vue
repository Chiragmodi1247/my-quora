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
          <h1>Someone's Public name here</h1>
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
            Level: Gold
          </v-col>
        </v-row>
      </v-col>
      <v-col lg="2">
        <br /><br /><br />
        <button class="btn_send" @click="send_request">
          Follow <span class="mdi mdi-account-plus"></span>
        </button>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    send_request: function() {
      alert("Request to user send, wait to reply")
    }
  }
};
</script>

<style scoped>
.btn_send {
  background: rgb(255, 255, 255);
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
</style>
