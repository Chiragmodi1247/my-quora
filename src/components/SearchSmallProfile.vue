<template>
  <v-card rounded outlined style="margin-bottom:10px;padding:10px">
    <v-row>
      <v-col lg="1">
        <v-avatar class="my-avatar" size="50px">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
      </v-col>
      <v-col lg="8">
        <router-link :to="{ path: '/profile/' + mydata.profileId }">
          <h3>{{ mydata.profileValue }}</h3>
        </router-link>
      </v-col>
      <v-col lg="2">
        <button :disabled="isFollowing" @click="sendRequest" class="btn_send">
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
  data: function() {
    return {
      isFollowing: false
    };
  },
  methods: {
    my_card() {
      alert("You clicked icon");
    },
    sendRequest() {
      fetch("/backend/profile/addFollower/" + this.mydata.profileId, {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "PUT"
      })
        .then(
          window.console.log("Following now!")
        )

          this.isFollowing = true;


    }
  },
  props: {
    mydata: Object
  },
  created() {
    let that = this;
    fetch("/backend/profile/isFollowing/" + this.mydata.profileId, {
      headers: {
        token: localStorage.getItem("quora-token"),
        "Content-Type": "application/json"
      },
      method: "GET"
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        window.console.log("Res in isFollowing: " + result.isFollowing);
        if (result.isFollowing === "true") {
          that.isFollowing = true;
          window.console.log("Isfol called");
        }
      });
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
.btn_send:disabled {
  background: rgb(192, 192, 192);
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
}
</style>
