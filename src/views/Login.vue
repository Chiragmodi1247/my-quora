<template>
  <v-card class="my-form">
    <div class="Login-title">
      <h1 v-if="forLogin">Login</h1>
      <h1 v-if="!forLogin">Register</h1>
    </div>
    <div v-if="forLogin">
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="1">
          <span class="mdi mdi-account icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input type="text" class="input_box" placeholder="Email..." />
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="1">
          <span class="mdi mdi-lock icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input type="password" class="input_box" placeholder="Password" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <button class="login_btn"><h2>Login</h2></button>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>
            Don't have an account?
            <a @click="forLogin = false">Create Account</a>
          </p>
        </v-col>
      </v-row>
    </div>
    <div v-if="!forLogin">
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="1">
          <span class="mdi mdi-account icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input type="text" class="input_box" placeholder="Email..." />
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="1">
          <span class="mdi mdi-lock icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input type="password" class="input_box" placeholder="Password" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>Select Profile*</p>
          <label>
            <input id="rd1" type="radio" name="profiletype" value="private" /> Private 
          </label>
          <label>
            <input id="rd2" type="radio" name="profiletype" value="public" /> Public 
          </label>
          <label>
            <input id="rd3" type="radio" name="profiletype" value="org" /> Business 
          </label>
          <!-- <v-radio-group v-model="radioGroup">
            <v-radio label="Public" value="1"> </v-radio>
            <v-radio label="Private" value="2"> </v-radio>
            <v-radio label="Organization" value="3"> </v-radio>
          </v-radio-group> -->
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <button class="login_btn" @click="registerUser"><h2>Register</h2></button>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>
            Already have an account?
            <a @click="changeToRegistration">Log in</a>
          </p>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  data: function() {
    return {
      forLogin: true,
      radioGroup: 1
    };
  },
  methods: {
    changeToRegistration: function() {
      this.forLogin = !this.forLogin;
    },
    registerUser: function() {
        
        let rd1 = document.getElementById("rd1");
        let rd2 = document.getElementById("rd2");
        let rd3 = document.getElementById("rd3");

        if(rd1.checked == true)
        window.console.log("Selected value: "+ rd1.value)
        else if(rd2.checked == true)
        window.console.log("Selected value: "+ rd2.value)
        else if(rd3.checked == true)
        window.console.log("Selected value: "+ rd3.value)
        else
        alert("Not selected")
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
