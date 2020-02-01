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
          <input
            type="email"
            v-model="loginDTO.emailAddress"
            class="input_box"
            placeholder="Email..."
          />
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
            v-model="loginDTO.password"
            class="input_box"
            placeholder="Password"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <button @click="loginUser" class="login_btn"><h2>Login</h2></button>
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
          <input
            type="text"
            v-model="userDTO.name"
            class="input_box"
            id="regester_username"
            placeholder="Username..."
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="2"></v-col>
        <v-col lg="1">
          <span class="mdi mdi-email icon_size"></span>
        </v-col>
        <v-col lg="1">
          <input
            type="text"
            v-model="userDTO.emailAddress"
            class="input_box"
            id="regester_email"
            placeholder="Email..."
          />
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
            v-model="userDTO.password"
            class="input_box"
            id="regester_pass"
            placeholder="Password"
          />
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

      <v-row>
        <v-col>
          <button class="login_btn" @click="registerUser">
            <h2>Register</h2>
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
      radioGroup: 1,
      userDTO: {
        name: null,
        emailAddress: null,
        password: null
      },
      loginDTO: {
        emailAddress: null,
        password: null,
        channel: "Quora"
      },
      basicProfileDTO: {
        userId: "018297ee-f17d-4281-afe6-f5f6cd58353d",
        name: "chirag1",
        emailAddress: "chirag11@gmail.com",
        password: "123456"
      }
    };
  },
  methods: {
    changeToRegistration: function() {
      this.forLogin = !this.forLogin;
    },
    loginUser: function() {
      fetch("http://172.16.20.121:8080/controller/login", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.loginDTO)
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.statusCode === 1000) {
            window.console.log("User Logged");
            localStorage.setItem("quora-token", res.data.accessToken);
            if (res.data.profile === "") {
              alert("Please select a profile");
              this.$router.push({ path: "/registration" });
            } else {
              this.$router.push({ path: "/user" });
            }
          } else {
            window.console.log("invalid credentials");
          }
        })
        .catch(err => {
          window.console.log("Error reg: " + err);
        });
    },
    registerUser: function() {
      let usernameInput = document.getElementById("regester_username");
      let emailInput = document.getElementById("regester_email");
      let passwordInput = document.getElementById("regester_pass");
      let cpasswordInput = document.getElementById("regester_cpass");

      window.console.log("fun called!!!");
      if (
        usernameInput.value.length === 0 ||
        emailInput.value.length === 0 ||
        passwordInput.value.length === 0 ||
        cpasswordInput.value.length === 0
      ) {
        alert("Please fill all fields");
        return;
      }
      if (passwordInput.value !== cpasswordInput.value) {
        alert("Password does not match");
        return;
      }
      // alert("selected count: " + numChecked);

      fetch("http://172.16.20.121:8080/controller/register", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.userDTO)
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.statusCode === 1000) {
            window.console.log("User registered");
            this.forLogin = !this.forLogin;
            this.basicProfileDTO = res.data;
            window.console.log("New user id: "+ res.data.userId)

            fetch("/backend/profile/basicDetails", {
              headers: {
                "Content-Type": "application/json"
              },
              method: "POST",
              body: JSON.stringify(this.basicProfileDTO)
            })
              .then(window.console.log("User registered in local"))
              .catch(err => {
                window.console.log("error registering to local: " + err);
              });
          } else {
            window.console.log("Error while registration");
            alert("Error in registration");
          }
        })
        .catch(err => {
          window.console.log("Error reg: " + err);
        });
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
