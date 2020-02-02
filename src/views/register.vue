<template>
  <v-card class="my-form">
    <div class="Login-title">
      <h1>Register</h1>
    </div>
    <div>
      <v-row>
        <v-col>
          <p>Select Profile Type <span style="color: red">*</span></p>
          <label>
            <input
              @click="selectPrivate"
              id="rd1"
              type="radio"
              name="profiletype"
              value="private"
            />
            Private
          </label>
          <label>
            <input
              @click="selectPublic"
              id="rd2"
              type="radio"
              name="profiletype"
              value="public"
            />
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

    <h2>Please Choose minimum 2 categories:</h2>
    <!-- <v-row>
      <v-col
        lg="3"
        v-for="(tag, index) in myTags"
        :key="index"
        class="my-checkbox"
        :value="tag"
      >
        <span class="aTag" @click="addToList">{{ tag }}</span>
      </v-col>
    </v-row> -->

    <v-row>
      <v-col lg="3" v-for="(tag, index) in myTags" :key="index">
        <input type="checkbox" class="my-checkbox" :value="tag" />{{ tag }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: function() {
    return {
      myTags: [
        "fiction",
        "non-fiction",
        "poetry",
        "short stories",
        "Bollywood",
        "Hollywood",
        "Tollywood",
        "Punjaabi",
        "Coding",
        "Android",
        "iOS",
        "NorthIndian",
        "SouthIndian",
        "Italian",
        "Chinese",
        "Clothing",
        "Footwear",
        "Watches",
        "Accessories",
        "Football",
        "Cricket",
        "Badminton",
        "Tennis"
      ],
      profileDTO: {
        profile: null,
        role: null,
        channel: "Quora"
      },
      interestDTO: {
        tag: null,
        channel: "Quora",
        action: "login"
      },
      extraDetails: {
        category: null,
        profile: null,
        channel: "Quora",
        role: null
      },
      smallInterest: {
        interestId: null,
        interestName: null
      }
    };
  },
  methods: {
    selectPublic: function() {
      this.profileDTO.profile = "Public";
      this.profileDTO.role = "Non Moderator";
      this.extraDetails.profile = "Public";
      this.extraDetails.role = "Non Moderator";
      window.console.log(
        "profileDTO: " + this.profileDTO.profile + " " + this.profileDTO.role
      );
    },
    selectPrivate: function() {
      this.profileDTO.profile = "Private";
      this.profileDTO.role = "Moderator";
      this.extraDetails.profile = "Private";
      this.extraDetails.role = "Moderator";
      window.console.log(
        "profileDTO: " + this.profileDTO.profile + " " + this.profileDTO.role
      );
    },
    registerUser: function() {
      let regSuccess = false;
      let catSuccess = false;
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

      let inputList = document.getElementsByClassName("my-checkbox");
      let numChecked = 0;
      let selectedInterest = new Array();
      let customInterestList = new Array();
      for (var i = 0; i < inputList.length; i++) {
        if (inputList[i].type == "checkbox" && inputList[i].checked) {
          numChecked = numChecked + 1;
          selectedInterest.push(inputList[i].value);
          let customInterest = new Object();
          customInterest.interestId = inputList[i].value;
          customInterest.interestName = inputList[i].value;
          customInterestList.push(customInterest);
        }
      }

      if (numChecked < 2) {
        alert("Select minimum 2 categories");
        return;
      }
      this.interestDTO.tag = selectedInterest;
      this.extraDetails.category = customInterestList;

      fetch("http://172.16.20.121:8080/roleController/userRole", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.profileDTO)
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.statusCode === 1000) {
            window.console.log("User roles updated");
            regSuccess = true;
          } else {
            window.console.log("Error while registration");
            alert("Error in registration");
          }
        })
        .catch(err => {
          window.console.log("Error reg: " + err);
        });

      fetch("http://172.16.20.160:8100/repo/addLogin", {
        headers: {
          accessToken: "Bearer " + localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.interestDTO)
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.statusCode === 1000) {
            window.console.log("pritesh hit");
            catSuccess = true;
          } else {
            window.console.log("Error whilehitting pritesh");
            alert("Error in registration");
          }
        })
        .catch(err => {
          window.console.log("Error reg: " + err);
        });

      fetch("/backend/profile/extraDetails", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.extraDetails)
      }).catch(err => {
        window.console.log("Error in role registration local: " + err);
      });

      window.console.log("Riya: " + regSuccess + " Pritesh: " + catSuccess);
      // window.console.log("Selected: " + JSON.stringify(selectedInterest));

      if (regSuccess && catSuccess) {
        this.$router.push({ path: "/user" });
      } else {
        alert("Regisration failed");
      }
      // this.$router.push({ path: "/login" });
    }
  },
  created() {
    fetch("http://172.16.20.83:8080/ads/tags")
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.myTags = result;
        window.console.log("result: " + result);
        window.console.log("My Tags: " + this.myTags);
      })
      .catch(err => {
        window.console.log("Error getting tags: " + err);
      });
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
.aTag {
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
}
.aTag:hover {
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  background: rgb(190, 223, 255);
  cursor: pointer;
}
</style>
