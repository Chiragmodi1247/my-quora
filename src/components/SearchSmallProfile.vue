<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <v-row>
      <v-col lg="1">
        <v-avatar class="my-avatar" size="50px">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-col>
      <v-col lg="8">
        <h3>{{mydata.profileValue}}</h3>
      </v-col>
      <v-col lg="2">
        <button class="btn_send">
          Follow <span class="mdi mdi-account-plus"></span>
        </button>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "GuestPost",
  components: {},
  methods: {
    my_card() {
      alert("You clicked icon");
    }
  },
  props: {
    mydata: Object
  }
};
</script>

<style scoped>
.my-row {
  padding: 0;
}
.my-post-box {
  height: 20vh;
  border: 1px solid black;
  border-radius: 10px;
  margin: 10px;
  background: white;
}
.input-box {
  width: 50vw;
}
.btn_send {
  background: blue;
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
</style>
