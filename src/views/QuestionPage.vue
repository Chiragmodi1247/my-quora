<template>
  <div>
    <div class="left-div">
      <v-row>
        <button class="login-btn">
          <h2>Ask Question</h2>
        </button>
      </v-row>
      <v-row>
        <button>
          <h2>Categories</h2>
        </button>
      </v-row>
    </div>
    <div class="center-cont">
            <h1 style="color: black">How about answering this question?</h1>
      <UserQuestion />
      <UserQuestion />
      <UserQuestion />
    </div>
  </div>
</template>

<script>
import UserQuestion from "../components/UserQuestion";
export default {
  name: "home",
  components: {
    UserQuestion
  }
};
</script>

<style scoped>
.cat-btn {
  padding: 22px;
}
.login-btn {
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  background: rgb(223, 45, 0);
}

.left-div {
  text-align: center;
  padding: 20px;
  width: 20%;
  margin-top: 30px;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  left: 2%;
}
.center-cont {
  width: 60vw;
  left: 20%;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
}
</style>
