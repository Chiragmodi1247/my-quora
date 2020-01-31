<template>
  <v-card class="my-form">
    <div class="Login-title">
      <h1 v-if="forLogin">Login</h1>
      <h1 v-if="!forLogin">Register</h1>
    </div>
    <div>
      <v-row>
        <v-col>
          <p>Select Profile Type <span style="color: red">*</span></p>
          <label>
            <input id="rd1" type="radio" name="profiletype" value="private" />
            Private
          </label>
          <label>
            <input id="rd2" type="radio" name="profiletype" value="public" />
            Public
          </label>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <button class="login_btn" @click="registerUser">
            <h2>Register</h2>
          </button>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    changeToRegistration: function() {
      this.forLogin = !this.forLogin;
    },
    registerUser: function() {
      let rd1 = document.getElementById("rd1");
      let rd2 = document.getElementById("rd2");

      if (rd1.checked == true)
        window.console.log("Selected value: " + rd1.value);
      else if (rd2.checked == true)
        window.console.log("Selected value: " + rd2.value);
      else {
          alert("None selected");
          return;
      }
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped>
.icon_size {
  font-size: 18pt;
}
.login_btn {
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 10px;
  background: rgb(192, 0, 0);
}
.input_box {
  border-bottom: 1px solid black;
  font-size: 18pt;
}
.Login-title {
  background: rgb(192, 0, 0);
  text-align: center;
  color: white;
}
.my-form {
  text-align: center;
  margin: 20vh auto;
  width: 40%;
}
</style>
