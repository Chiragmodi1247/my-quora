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
          <span class="mdi mdi-email icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input type="email" class="input_box" placeholder="Email..." />
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
          <input type="text" class="input_box" id="regester_username" placeholder="Username..." />
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="1">
          <span class="mdi mdi-email icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input type="text" class="input_box" id="regester_email" placeholder="Email..." />
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="1">
          <span class="mdi mdi-lock icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input type="password" class="input_box" id="regester_pass" placeholder="Password" />
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="1">
          <span class="mdi mdi-lock icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input
            type="password"
            class="input_box"
            id="regester_cpass"
            placeholder="Confirm Password"
          />
        </v-col>
      </v-row>

      <h2>Please Choose minimum 2 categories:</h2>
      <input type="checkbox" name="cat1" class="my-checkbox" value="Bike" />
      Literature
      <input type="checkbox" name="cat2" class="my-checkbox" value="Car" />
      Lifestyle(Brands)
      <input type="checkbox" name="cat3" class="my-checkbox" value="Boat" />
      Movies <br />
      <input type="checkbox" name="cat4" class="my-checkbox" value="Bike" />
      Coding
      <input type="checkbox" name="cat5" class="my-checkbox" value="Car" />
      Booze
      <input type="checkbox" name="cat6" class="my-checkbox" value="Boat" />
      Cartoon <br />
      <input type="checkbox" name="cat7" class="my-checkbox" value="Bike" />
      Cricket
      <input type="checkbox" name="cat8" class="my-checkbox" value="Car" />
      Web/TV Series
      <input type="checkbox" name="cat9" class="my-checkbox" value="Boat" />
      Politics
      <input type="checkbox" name="cat10" class="my-checkbox" value="Boat" />
      Food

      <v-row>
        <v-col>
          <button class="login_btn" @click="registerUser">
            <h2>Proceed for Registeration</h2>
          </button>
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
      let inputList = document.getElementsByClassName("my-checkbox");
      let numChecked = 0;
      let usernameInput = document.getElementById("regester_username");
      let emailInput = document.getElementById("regester_email");
      let passwordInput = document.getElementById("regester_pass")
      let cpasswordInput = document.getElementById("regester_cpass")
      let selectedInterest = new Array();
      
      if(usernameInput.value.length === 0 || emailInput.value.length === 0 || passwordInput.value.length === 0 || cpasswordInput.value.length === 0){
        alert("Please fill all fields")
        return;
      }



      if(passwordInput.value !== cpasswordInput.value)
      {
        alert("Password does not match")
        return;
      }
      for (var i = 0; i < inputList.length; i++) {
        if (inputList[i].type == "checkbox" && inputList[i].checked) {
          numChecked = numChecked + 1;
          selectedInterest.push(inputList[i].value)
        }
      }

      if (numChecked < 2) {
        alert("Select minimum 2 categories");
        return;
      } 
      window.console.log("Selected: "+ JSON.stringify( selectedInterest))
      // alert("selected count: " + numChecked);

      this.$router.push({ path: "/registration" });
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
