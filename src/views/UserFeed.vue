<template>
  <div>
    <div class="left-div">
      <div class="my_nav">
        <button @click="openModal" class="login-btn">
          <h2>Ask Question</h2>
        </button>

        <ul>
          <li>
            <button @click="cat = false">
              <h2>Home</h2>
            </button>
          </li>

          <li>
            <button @click="cat = true">
              <h2>Categories</h2>
            </button>
          </li>
        </ul>
      </div>
<div class="ads" >
      <Ad v-for="(ad, index) in myAdds" :key="index" :myAd="ad" />
</div>
    </div>

    <div v-if="!cat" class="center-cont">
      <h1>Some popular stories for Specific user</h1>
      <UserPost
        v-for="(question, qindex) in questionList"
        v-bind:key="qindex"
        :question_prop="question"
      />
    </div>

    <div v-if="cat" class="center-cont">
      <h1>User specific Categories</h1>
      <v-row
        class="small-category"
        v-for="(category, index) in askCategoryList"
        v-bind:key="index"
      >
        <Category :category="category" />
      </v-row>
    </div>

    <div id="simpleModal" class="modal">
      <div class="modal-content">
        <span id="closeBtn" @click="closeModal">&times; </span>
        <v-row>
          <textarea
            id="asking_new_question"
            @input="enable_ask"
            v-on:keyup="ask_on_enter"
            class="asking_new_question_onprofile"
            placeholder="Ask a question"
          ></textarea>
        </v-row>
        <v-row>
          <v-col>
            <span style="color: red">Please Select a category: </span>
            <select
              v-model="selectedCat"
              @click="selected = true"
              id="ask_select_option"
              class="cat-select"
            >
              <option
                v-for="(cat, index) in askCategoryList"
                :key="index"
                :value="cat"
                >{{ cat }}</option
              >
            </select>
          </v-col>
          <v-col>
            <button
              :disabled="!selected || !txtInput"
              @click="askToProfile"
              class="btn_send"
            >
              Ask <span class="mdi mdi-send"></span>
            </button>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
// const axios = require('axios').default;
import UserPost from "../components/UserPost";
import Ad from "../components/ad";
import Category from "../components/Category";
export default {
  name: "home",
  components: {
    UserPost,
    Category,
    Ad
  },
  data: function() {
    return {
      selected: false,
      txtInput: false,
      cat: false,
      questionList: [],
      userCategoryList: [],
      askCategoryList: [],
      myCategoryList: [],
      selectedCat: null,
      myAdds: [],
      addQDTO: {
        questionValue: "",
        categoryId: "",
        categoryName: "",

        // askerProfileId: null,
        // askerProfileName: null,
        profileWhereAskedId: "",
        profileWhereAskedName: "",
        profileWhereAskedType: ""
      },
      categoryList: [
        {
          name: "Literature"
        },
        {
          name: "Lifestyle(Brands)"
        },
        {
          name: "Movies"
        },
        {
          name: "Coding"
        },
        {
          name: "Booze"
        },
        {
          name: "Cartoon"
        },
        {
          name: "Cricket"
        },
        {
          name: "Web/TV Series"
        },
        {
          name: "Politics"
        },
        {
          name: "Food"
        }
      ]
    };
  },
  created() {
    let that = this;
    fetch("/backend/profile/category/", {
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
        this.userCategoryList = result;
        window.console.log("My data 12345: " + result[1].interestName);
        setTimeout(that.fetchTags(), 1000);
        let customInterestList = new Array();
        for (var i = 0; i < this.userCategoryList.length; i++) {
          customInterestList.push(this.userCategoryList[i].interestId);
        }
        let sendingObject = new Object();
        sendingObject.categoryIdList = customInterestList;
        fetch("/backend/questions/getQuestionsOfSelectedCategories", {
          headers: {
            token: localStorage.getItem("quora-token"),
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(sendingObject)
        })
          .then(res => {
            return res.json();
          })
          .then(result => {
            this.questionList = result.content;
            window.console.log("My questions: " + result.content[0].questionValue);
          })
          .catch(window.console.log("error in fetching question!"));
      });

setTimeout(this.fetchTags, 1000)

    fetch(
      "http://172.16.20.83:8080/ads/getAds/" +
        localStorage.getItem("quora-token"),
      {
        method: "GET"
      }
    )
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.myAdds = result;
        this.myAdds.splice(2)
        window.console.log("Adds fetched" + result);
      })
      .catch(window.console.log("error fetching adds"));
  },

  methods: {
    fetchTags() {
      let that = this;
      fetch("http://172.16.20.83:8080/ads/tags")
        .then(res => {
          return res.json();
        })
        .then(result => {
        for (var i = 0; i < result.length; i++) {
          let cust = new Object;
          cust.interestName = result[i];
          that.askCategoryList.push(cust);
        }
          window.console.log("result: " + result);
          // window.console.log("My Tags: " + this.askCategoryList);
        })
        .catch(err => {
          window.console.log("Error getting tags: " + err);
        });
    },
    ask_on_enter() {
      window.console.log("Ask on enter called");
    },
    enable_ask() {
      let newQ = document.getElementById("asking_new_question");
      if (newQ.value.length === 0) return;
      this.txtInput = true;
    },
    openModal() {
      // let modalBtn = document.getElementById("edit_profile");

      let modal = document.getElementById("simpleModal");
      modal.style.display = "block";
      window.console.log("123");
    },
    closeModal() {
      let modal = document.getElementById("simpleModal");
      modal.style.display = "none";
    },
    askToProfile() {
      let newQ = document.getElementById("asking_new_question");

      this.addQDTO.questionValue = newQ.value;
      this.addQDTO.categoryId = this.selectedCat;
      this.addQDTO.categoryName = this.selectedCat;

      fetch("/backend/questions/addQuestion", {
        headers: {
          token: localStorage.getItem("quora-token"),
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.addQDTO)
      }).catch(window.console.log("error adding question"));
      // alert("Question: " + newQ.value + " on cat: " + this.selectedCat);
      let modal = document.getElementById("simpleModal");
      modal.style.display = "none";
    }
  }
};
</script>

<style scoped>
.cat-btn {
  padding: 22px;
}
.cat-select {
  border: 1px solid black;
}

.ads {
  left: 72%;
  position: fixed;
}
.asking_new_question_onprofile {
  background: rgb(233, 233, 233);
  width: 100%;
  border-radius: 20px;
  margin: 10px 0px 10px 0px;
  padding: 10px;
}
.btn_send {
  background: rgb(255, 94, 0);
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
  float: right;
}
.btn_send:disabled {
  background: rgb(209, 209, 209);
  color: white;
  padding: 5px 20px 5px 20px;
  border-radius: 5px;
  float: right;
}
.login-btn {
  padding: 5px 20px 5px 20px;
  color: white;
  border-radius: 5px;
  background: rgb(223, 45, 0);
}

.left-div {
  text-align: center;
  display: block;
  padding: 20px;
  width: 20%;
  margin-top: 30px;
  position: fixed;
  z-index: 1;
  overflow-x: hidden;
  left: 2%;
}
.center-cont {
  width: 50vw;
  left: 20%;
  position: relative;
  z-index: 1;
  overflow-x: hidden;
}

.input_box {
  font-size: 20pt;
  border: 1px solid black;
  border-radius: 5px;
}
.modal {
  display: none;
  position: fixed;
  z-index: 2;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}
#closeBtn {
  float: right;
  font-size: 24pt;
}
#closeBtn:hover,
#closeBtn:focus {
  text-decoration: none;
  cursor: pointer;
}
.modal-content {
  border-radius: 10px;
  background-color: azure;
  margin: 20% auto;
  width: 70%;
  padding: 20px;
}
</style>
