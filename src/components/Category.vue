<template>
  <v-card class="my_card">
    <v-row>
      <v-col lg="1"></v-col>
      <v-col lg="8">
        <router-link :to="{ path: '/categorypage/' + category.interestName }">
          <h2 class="cat-name">{{ category.interestName }}</h2>
        </router-link>
      </v-col>
      <v-col lg="3">
        <button :disabled="isFollowing" @click="sendRequest" class="follow_btn">
          Follow <span class="mdi mdi-account-plus"></span>
        </button>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  methods: {
    follow_cat() {
      alert("Following: " + this.category.interestName);
    },
        sendRequest() {
      fetch("/backend/profile/addCategory/" + this.category.interestName, {
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
  data: function() {
    return {
      isFollowing: false
    }
  },
  props: {
    category: Object
  },
  created() {
    fetch("/backend/profile/isFollowingCategory/"+ this.category.interestName, {
      method: "GET",
      headers: {
        token: localStorage.getItem("quora-token")
      }
    })
      .then(res => {
        return res.json();
      })
      .then(result => {
        if (result.isFollowing === "true") {
          this.isFollowing = true;
          window.console.log("Isfol called");
        }
      });
  }
};
</script>

<style scoped>
.my_card {
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
}
.cat-name {
  color: black;
  text-decoration: none;
}
.follow_btn {
  border-radius: 10px;
  padding: 5px 20px 5px 20px;
  text-align: center;
  background: blue;
  color: white;
}
.follow_btn:disabled {
  padding: 5px 20px 5px 20px;
  border-radius: 10px;
  text-align: center;
  background: rgb(201, 201, 201);
}
</style>
